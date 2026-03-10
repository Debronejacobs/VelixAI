import { motion } from 'framer-motion';
import { Database, Share2, Mail, ShoppingCart } from 'lucide-react';

export default function BentoFeatures() {
  const features = [
    {
      title: "Infinite Data Entry",
      desc: "Scrape, sync, and format data between any two websites. No API required.",
      icon: <Database className="w-8 h-8 text-[#ff6a00]" />,
    },
    {
      title: "Social Media Domination",
      desc: "It reads, it engages, it posts. Build your audience while you sleep.",
      icon: <Share2 className="w-8 h-8 text-[#ff6a00]" />,
    },
    {
      title: "Inbox Zero, Literally",
      desc: "It reads your email, drafts replies in your tone, and deletes the spam before you even wake up.",
      icon: <Mail className="w-8 h-8 text-[#ff6a00]" />,
    },
    {
      title: "E-Commerce & Form Fills",
      desc: "Buy products, fill out 100-page government forms, or apply to 50 jobs.",
      icon: <ShoppingCart className="w-8 h-8 text-[#ff6a00]" />,
    }
  ];

  return (
    <section className="w-full py-32 px-6 bg-transparent relative z-10">
      <div className="absolute inset-0 backdrop-blur-xl bg-black/30 z-0 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="rounded-[24px] p-10 flex flex-col justify-between group transition-all duration-500 relative"
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
              <div className="mb-8">
                {feat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white mb-3 tracking-tight">{feat.title}</h3>
                <p className="text-zinc-400 text-lg font-light leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
