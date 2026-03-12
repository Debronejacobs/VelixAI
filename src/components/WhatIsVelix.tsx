import { motion, useScroll, useTransform } from 'framer-motion';
import { MousePointer2, Wrench, Sparkles } from 'lucide-react';
import React, { useRef } from 'react';
import BrowserSimulation from './BrowserSimulation';

const pillars = [
  {
    title: "Navigates Like a Human",
    desc: "Velix controls your browser . It clicks buttons, fills forms browses the web gets work done ,  just like a human employee.",
    icon: <MousePointer2 className="w-8 h-8 text-zinc-200" />
  },
  {
    title: "MCP support",
    desc: "With MCP support , Velix can control any MCP supported tool",
    icon: <Wrench className="w-8 h-8 text-zinc-200" />
  },
  {
    title: "Set up workflows easily",
    desc: "Got complex repetitive tasks you do on the browser ? Set up a workflow and let Velix do the rest",
    icon: <Sparkles className="w-8 h-8 text-zinc-200" />
  }
];

export default function WhatIsVelix() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Create a scroll-linked progress value for subtle parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Shift the background grid slowly upwards as you scroll down
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-black overflow-hidden z-10">
      
      {/* Moving Background Grid (Matches Hero Section but full height) */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-x-0 -top-1/4 -bottom-1/4 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"
      >
        <div className="absolute left-0 right-0 top-1/4 -z-10 m-auto h-[500px] w-[500px] rounded-full bg-zinc-200 opacity-[0.08] blur-[100px]"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Middle Section: The Core Message */}
        <div className="relative mt-20 mb-32 max-w-4xl mx-auto text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-zinc-200/5 to-transparent blur-3xl rounded-full"></div>
          <h3 
            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl" 
            style={{ fontFamily: "var(--font-display)" }}
          >
            An AI agent that takes over <br/>
            the <span className="text-zinc-200">mouse and keyboard.</span>
          </h3>
          
          <p className="mt-8 text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Velix  is a fully autonomous browser agent that navigates the web exactly like a human does. It clicks, types, scrolls, and reads the screen , bringing automation to any site, portal, or tool.
          </p>

          <BrowserSimulation />
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
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>{pillar.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm md:text-base">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
