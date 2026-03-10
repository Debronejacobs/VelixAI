import { createClient } from 'npm:@insforge/sdk';

export default async function(req: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const INSFORGE_URL = Deno.env.get('INSFORGE_URL') ?? '';
    const INSFORGE_API_KEY = Deno.env.get('INSFORGE_API_KEY') ?? '';

    const insforge = createClient({
      baseUrl: INSFORGE_URL,
      anonKey: INSFORGE_API_KEY
    });

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { email, visitorId } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!visitorId) {
      return new Response(JSON.stringify({ error: 'Security ID required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Fingerprint Anti-Spam Check
    const { count, error: countError } = await insforge.database
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('fingerprint', visitorId);

    if (countError) throw countError;

    if (count !== null && count >= 1) {
      return new Response(JSON.stringify({ error: 'This device is already registered.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Secure Insert (Fingerprint only)
    const { error: insertError } = await insforge.database
      .from('waitlist')
      .insert([{ 
        email, 
        fingerprint: visitorId 
      }]);

    if (insertError) {
      if (insertError.code === '23505') {
        return new Response(JSON.stringify({ success: true, warning: 'Already registered.' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      throw insertError;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Waitlist Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
