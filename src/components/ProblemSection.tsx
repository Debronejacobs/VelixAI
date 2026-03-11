import { motion } from 'framer-motion';

export default function ProblemSection() {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-transparent">
      
      {/* This layer blurs the background as the user scrolls through this section */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/10 z-0 pointer-events-none" />

      <div className="max-w-4xl text-center z-10 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-['Space_Grotesk'] font-bold text-white mb-6 leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          If it requires a browser tab,<br/> 
          <span className="text-zinc-500 font-normal drop-shadow-none">you shouldn't be doing it.</span>
        </motion.h2>
      </div>
      
      {/* Glowing orange divider line */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100%", opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-0 left-0 h-[1px] max-w-4xl mx-auto right-0 bg-gradient-to-r from-transparent via-[#e4e4e7] to-transparent z-20 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
      />
    </section>
  );
}
