import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function TimelineSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
    { title: "Record", desc: "You click through your task once." },
    { title: "Synthesize", desc: "Velix maps the browser and writes the automation." },
    { title: "Automate", desc: "It runs in the background. Forever." }
  ];

  return (
    <section ref={containerRef} className="relative w-full py-40 flex flex-col items-center justify-center bg-transparent min-h-[150vh] z-10 overflow-hidden">
      
      {/* Background Blur Overlay to ensure text readability */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/40 z-0 pointer-events-none" />

      {/* SVG Curved Neural Pathway Track */}
      <div className="absolute left-1/2 top-[10%] bottom-[10%] -translate-x-1/2 w-24 h-[80%] z-10 pointer-events-none hidden md:block">
        <svg fill="none" viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,106,0,0.5)]">
          {/* Base faint track */}
          <path d="M50 0 C 80 250, 20 500, 50 750 C 80 900, 50 1000, 50 1000" stroke="rgba(255, 106, 0, 0.2)" strokeWidth="4" />
          {/* Animated filling track */}
          <motion.path 
            d="M50 0 C 80 250, 20 500, 50 750 C 80 900, 50 1000, 50 1000" 
            stroke="#ff6a00" 
            strokeWidth="4"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-6 z-20 flex flex-col gap-40">
        {steps.map((step, idx) => {
          // Calculate when each node should fill based on index (0, 1, 2)
          const startFill = idx * 0.35 + 0.1;
          const endFill = startFill + 0.1;
          const nodeFill = useTransform(scrollYProgress, [startFill, endFill], ["rgba(0,0,0,1)", "rgba(255,106,0,1)"]);

          return (
            <div 
              key={idx}
              className={`flex items-center gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'flex-row text-left'}`}
            >
              {/* Content Card */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="p-8 group transition-all duration-500 rounded-[24px]"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 106, 0, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.borderColor = "#ff6a00";
                    target.style.boxShadow = "0 0 30px rgba(255, 106, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.borderColor = "rgba(255, 106, 0, 0.2)";
                    target.style.boxShadow = "none";
                  }}
                >
                  <h3 className="text-white text-3xl font-['Space_Grotesk'] font-bold mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-zinc-400 text-lg font-light">{step.desc}</p>
                </motion.div>
              </div>

              {/* Glowing Empty Ring Node */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 items-center justify-center z-20">
                <motion.div 
                  className="w-8 h-8 rounded-full border-4 border-[#ff6a00] shadow-[0_0_20px_rgba(255,106,0,0.6)]"
                  style={{ backgroundColor: nodeFill }}
                />
              </div>

              <div className="hidden md:block md:w-1/2" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
