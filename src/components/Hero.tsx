import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { insforge } from '../lib/insforge';
import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');
    
    try {
      const visitorId = await getCurrentBrowserFingerPrint();

      const { data, error } = await insforge.functions.invoke('join-waitlist', {
        body: { email, visitorId }
      });

      if (error) {
        // The edge function returns `{"error":"This device is already registered."}`
        // InsForge might wrap this, or throw it as a raw stringified JSON, or an object. Let's serialize it safely to check the text.
        const errString = typeof error === 'string' ? error : JSON.stringify(error, Object.getOwnPropertyNames(error));
        
        // If they are already registered, just show success! No need to show a red error.
        if (
          errString.includes('already registered') || 
          errString.includes('Too Many Requests') ||
          (error as any).status === 429 ||
          (error as any).context?.status === 429
        ) {
          setStatus('success');
          setEmail('');
          return;
        }
        
        throw error;
      }
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center bg-transparent pointer-events-none">
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 h-full flex flex-col justify-center pointer-events-auto mt-16 md:mt-0">
        <div className="w-full md:w-[55%] flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-zinc-400 font-medium tracking-wide text-sm uppercase">Browser Native Agent</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-[6rem] leading-[0.9] font-['Space_Grotesk'] font-bold text-white tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let Velix do<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-400">the work.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-lg md:text-2xl text-zinc-300 font-light tracking-[0.02em] leading-relaxed max-w-lg"
          >
            The AI agent that  does   work for you . 
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 max-w-md w-full"
          >
            {status === 'success' ? (
              <div className="flex items-center gap-4 bg-zinc-200/10 border border-zinc-200/30 rounded-lg px-6 py-4 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
                   <Check className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-white font-medium">You're on the list.</p>
                  <p className="text-zinc-400 text-sm">Keep an eye on your inbox.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex w-full group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder={status === 'error' ? "Error. Try again." : "Enter email for early access"} 
                  className={`relative flex-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-l-lg px-6 py-4 text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-zinc-200 transition-colors disabled:opacity-50 ${status === 'error' ? 'border-red-500' : ''}`}
                  required
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="relative px-8 py-4 bg-zinc-200 text-black font-bold uppercase tracking-widest text-sm rounded-r-lg hover:bg-[#a1a1aa] transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Join'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {errorMessage || 'Connection failed. Please try again later.'}
              </motion.div>
            )}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
