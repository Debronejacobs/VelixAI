import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="absolute top-0 w-full z-50 flex items-center justify-between px-8 py-6"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-[12px] bg-gradient-to-br from-[#FF5A00] to-[#FF8800] p-[2px] shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
            <span className="text-[#FF5A00] text-sm font-bold">V</span>
          </div>
        </div>
        <span className="text-white font-bold tracking-wide text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Velix AI</span>
      </div>

    </motion.header>
  );
}
