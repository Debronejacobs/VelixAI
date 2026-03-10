import { motion } from 'framer-motion';

export default function Capabilities() {
  return (
    <section className="w-full py-40 px-6 bg-transparent relative z-10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto flex flex-col gap-32 relative z-10">
        
        {/* Capability 1: Massive Data Entry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Extract anything.<br/>Sync anywhere.
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              Scrape, sync, and format data between any two websites instantly. No APIs. No coding. If you can see it on the screen, Velix can put it in a spreadsheet.
            </p>
          </div>
          <div className="order-1 md:order-2 h-80 rounded-[2rem] bg-black/40 border border-white/5 backdrop-blur-xl p-8 relative overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* CSS Animation: Data Sorting */}
            <div className="relative w-full h-full flex items-center justify-between">
              
              {/* Messy Data Left */}
              <div className="flex flex-col gap-3 w-1/3 opacity-50">
                {[...Array(5)].map((_, i) => (
                  <div key={`m-${i}`} className="h-4 bg-zinc-800 rounded w-full overflow-hidden relative">
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
                      className="absolute inset-y-0 w-1/2 bg-white/20"
                    />
                  </div>
                ))}
              </div>

              {/* Sweeping Scanner */}
              <motion.div 
                animate={{ x: [-50, 50, -50] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-full bg-[#ff6a00] shadow-[0_0_15px_#ff6a00] rounded-full z-10"
              />

              {/* Clean Grid Right */}
              <div className="grid grid-cols-2 gap-2 w-1/2">
                {[...Array(8)].map((_, i) => (
                  <div key={`c-${i}`} className="h-6 bg-[#ff6a00]/10 border border-[#ff6a00]/30 rounded"></div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Capability 2: Form Fills & Mass Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="h-80 rounded-[2rem] bg-black/40 border border-white/5 backdrop-blur-xl p-8 relative overflow-hidden flex flex-col gap-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
             {/* CSS Animation: Form Filling Phantom Cursor */}
             <div className="w-full flex-1 flex flex-col gap-6 pt-4 relative">
                {[...Array(4)].map((_, i) => (
                  <div key={`f-${i}`} className="w-full">
                    <div className="h-2 w-1/4 bg-zinc-700 rounded mb-2"></div>
                    <div className="h-10 w-full bg-zinc-900 border border-zinc-800 rounded relative overflow-hidden">
                       <motion.div
                         initial={{ width: 0 }}
                         whileInView={{ width: "100%" }}
                         viewport={{ once: false }}
                         transition={{ duration: 0.5, delay: 0.5 + (i * 0.4) }}
                         className="absolute inset-y-0 left-0 bg-[#ff6a00]/20 border-l-2 border-[#ff6a00]"
                       />
                    </div>
                  </div>
                ))}
                
                {/* Phantom Cursor */}
                <motion.div 
                  initial={{ top: 20, left: 20 }}
                  animate={{ 
                    top: [20, 100, 180, 260, 20],
                    left: [20, 150, 50, 200, 20] 
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_15px_white] z-20"
                />
             </div>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Mass actions.<br/>Zero effort.
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              Fill out 100-page government forms, buy products across 50 tabs, or apply to hundreds of jobs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
