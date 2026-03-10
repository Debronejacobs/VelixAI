import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Check } from 'lucide-react';
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
        if ((error as any).status === 429) {
          setErrorMessage((error as any).message || 'Rate limit reached.');
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
            {/* Minimalist Chrome Extension Icon Representation */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6a00] to-[#ffa500] p-[1px] shadow-[0_0_30px_rgba(255,106,0,0.4)]">
              <div className="w-full h-full bg-black/80 rounded-xl backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#ff6a00]" />
              </div>
            </div>
            <span className="text-zinc-400 font-medium tracking-wide text-sm uppercase">Browser Native Agent</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-[6rem] leading-[0.9] font-['Space_Grotesk'] font-bold text-white tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stop clicking.<br/>
            Let Velix do<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6a00] to-[#ffa500]">the work.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-lg md:text-2xl text-zinc-300 font-light tracking-[0.02em] leading-relaxed max-w-lg"
          >
            The AI agent that actually does things. You show it once. It repeats the task perfectly, forever.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 max-w-md w-full"
          >
            {status === 'success' ? (
              <div className="flex items-center gap-4 bg-[#ff6a00]/10 border border-[#ff6a00]/30 rounded-lg px-6 py-4 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-full bg-[#ff6a00] flex items-center justify-center">
                   <Check className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-white font-medium">You're on the list.</p>
                  <p className="text-zinc-400 text-sm">Keep an eye on your inbox.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex w-full group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6a00] to-[#ffa500] rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder={status === 'error' ? "Error. Try again." : "Enter email for early access"} 
                  className={`relative flex-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-l-lg px-6 py-4 text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-[#ff6a00] transition-colors disabled:opacity-50 ${status === 'error' ? 'border-red-500' : ''}`}
                  required
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="relative px-8 py-4 bg-[#ff6a00] text-black font-bold uppercase tracking-widest text-sm rounded-r-lg hover:bg-[#ffa500] transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Join'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-500 font-mono text-xs mt-2 uppercase tracking-tight">
                {errorMessage || 'Error initializing connection'}
              </p>
            )}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
