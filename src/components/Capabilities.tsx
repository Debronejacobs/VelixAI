import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Capabilities() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="w-full relative z-10 overflow-hidden bg-black" style={{ minHeight: '120vh' }}>

      {/* Parallax Background */}
      <motion.div
        className="absolute inset-x-0 -top-[10%] -bottom-[10%] z-0 opacity-50"
        style={{
          y: backgroundY,
          scale: backgroundScale,
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <div
          className="absolute inset-0 bg-[url('/crystal-core.jpg')] bg-cover bg-center bg-no-repeat w-full h-full mix-blend-screen"
          style={{ filter: 'contrast(1.2)' }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col gap-40 relative z-10 pt-40 pb-40 px-6">

        {/* Capability 1: Digital Employee */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Hire your first<br />digital employee.
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Create specialized agents for every job  social media, data entry, finance, research, and more. Each one hired for a purpose, working in the browser like a real employee.
            </p>
          </motion.div>

          <div className="md:w-1/2 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative z-10 bg-black/50 backdrop-blur-md border border-zinc-200/30 px-6 py-3 rounded-full flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-zinc-200 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              <span className="text-zinc-200 font-mono text-sm tracking-widest uppercase">Agent Running</span>
            </motion.div>
          </div>
        </div>

        {/* Capability 2: Scale Workflows */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Scale your best<br />workflows.
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Assign Velix to handle your repetitive portal navigation and data entry. It processes the operational backlog so you can focus on the work that matters.
            </p>
          </motion.div>

          <div className="md:w-1/2 flex justify-center md:justify-start" />
        </div>

        {/* Capability 3: Infinite Memory */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Never forgets<br />a thing.
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Velix remembers every task, every workflow, every detail  so you never have to re-explain yourself. The longer it works, the better it knows your business.
            </p>
          </motion.div>

          <div className="md:w-1/2 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative z-10 bg-black/50 backdrop-blur-md border border-zinc-200/30 px-6 py-3 rounded-full flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-zinc-200 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              <span className="text-zinc-200 font-mono text-sm tracking-widest uppercase">Memory Active</span>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}