import { useState } from 'react';
import { motion } from 'framer-motion';
import { insforge } from '../lib/insforge';
import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';

export default function Waitlist() {
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
        // InsForgeError usually wraps the payload or status in different properties depending on version
        const errObj = error as any;
        const errStatus = errObj.status || errObj.context?.status;
        const errMsg = errObj.message || errObj.context?.message || 'Rate limit reached.';
        
        if (errStatus === 429 || errMsg.includes('already registered') || errMsg.includes('Too Many Requests')) {
          setErrorMessage('This device is already registered.');
        } else {
          setErrorMessage(errMsg || 'Error connecting to system.');
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
    <section className="relative w-full h-[80vh] flex flex-col items-center justify-center bg-transparent overflow-hidden z-10">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "0px" }}
        transition={{ duration: 1 }}
        className="text-center w-full max-w-xl px-6 relative z-10 mt-20"
      >
        <h2 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-white mb-4 drop-shadow-2xl">
          Wake Up.
        </h2>
        <p className="text-zinc-400 text-lg mb-12">
          Your digital clone is waiting for its first task.
        </p>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 border border-[#ff6a00]/30 bg-[#ff6a00]/10 rounded-lg backdrop-blur-md inline-block"
          >
            <p className="text-[#ff6a00] font-mono font-bold tracking-widest text-lg">SYSTEM_INITIALIZED</p>
            <p className="text-zinc-300 mt-2 text-sm">We've added your email to the queue. Stand by.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col md:flex-row w-full gap-6 items-end">
            <div className="flex-1 w-full relative">
              <span className="absolute left-0 bottom-3 text-[#ff6a00] font-mono font-bold text-lg">{'>_'}</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                placeholder="Enter email to initialize Velix_" 
                className="w-full bg-transparent border-0 border-b-2 border-zinc-700 pl-8 pr-4 py-3 text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-[#ff6a00] focus:ring-0 transition-colors disabled:opacity-50"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="px-8 py-3 bg-transparent border border-[#ff6a00] text-[#ff6a00] font-['Space_Grotesk'] font-bold tracking-widest uppercase transition-all hover:bg-[#ff6a00] hover:text-black hover:shadow-[0_0_30px_rgba(255,106,0,0.6)] whitespace-nowrap disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#ff6a00] disabled:hover:shadow-none"
            >
              {status === 'loading' ? 'CONNECTING...' : 'CONNECT'}
            </button>
          </form>
        )}
        
        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium tracking-wide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {errorMessage || 'CONNECTION FAILED'}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
