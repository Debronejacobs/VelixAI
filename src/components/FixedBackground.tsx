export default function FixedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      {/* Image Layer */}
      <img 
        src="/hero-image.png" 
        alt="AI Core" 
        className="absolute inset-0 object-cover object-[70%_center] md:object-contain md:object-right w-full h-full opacity-40 md:opacity-80 mix-blend-screen"
        onError={(e) => {
           // fallback if no image to avoid broken icon
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      
      {/* Particles Removed per user request */}
      {/* Subtle Readability Mask - Full width on mobile to ensure centered text is readable, partial width on desktop */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent w-full md:w-1/2"></div>
    </div>
  );
}
