import { motion } from 'framer-motion';
import { MousePointer2, DatabaseZap, Sparkles } from 'lucide-react';

export default function WhatIsVelix() {
  const pillars = [
    {
      title: "It Browses",
      desc: "Navigates complex sites, clicks buttons, and handles logins just like you do.",
      icon: <MousePointer2 className="w-8 h-8 text-[#ff6a00]" />
    },
    {
      title: "It Extracts",
      desc: "Pulls data from lists, tables, and nested pages into clean CSVs instantly.",
      icon: <DatabaseZap className="w-8 h-8 text-[#ff6a00]" />
    },
    {
      title: "It Fills",
      desc: "Types into forms, sends messages, and executes transactions across hundreds of tabs.",
      icon: <Sparkles className="w-8 h-8 text-[#ff6a00]" />
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-transparent z-10">
      
      {/* Heavy Blur for the 'About' section to contrast with the sharp Hero */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-black/40 z-0 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl w-full rounded-[2.5rem] p-12 md:p-20 relative z-10 overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 106, 0, 0.15)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)"
        }}
      >
        <div className="text-center mb-20">
          <h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            An AI agent that takes over <br/>the <span className="text-[#ff6a00]">mouse and keyboard.</span>
          </h2>
          <p className="text-xl text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed">
            Velix isn't a chatbot. It's a digital worker that lives inside your Chrome extension. It understands the web exactly like a human does. Hand off your tedious clicking, typing, and data entry, and get your time back.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* subtle dividing lines between columns */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

          {pillars.map((pillar, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,106,0,0.1)]">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>{pillar.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm md:text-base">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
