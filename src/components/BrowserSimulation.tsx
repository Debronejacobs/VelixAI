import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const columns = ['Name', 'Email', 'Company', 'Value', 'Status'];
const MOCK_DATA = [
  ['Jane Doe', 'jane@acme.com', 'Acme Corp', '$5,000', 'Closed Won'],
  ['John Smith', 'john@tech.io', 'Tech.io', '$12,000', 'Negotiation'],
  ['Alice Johnson', 'alice@startup.net', 'Startup Net', '$2,500', 'Lead'],
  ['Bob Williams', 'bob@enterprise.com', 'Enterprise', '$45,000', 'Closed Won'],
  ['Charlie Brown', 'charlie@smb.org', 'SMB LLC', '$1,200', 'Contacted'],
  ['Diana Prince', 'diana@amazon.com', 'Amazon', '$150,000', 'Proposal'],
  ['Evan Wright', 'evan@wright.co', 'Wright Co', '$8,500', 'Lead'],
  ['Fiona Apple', 'fiona@music.inc', 'Music Inc', '$3,400', 'Closed Lost'],
  ['George Lucas', 'george@lucasfilm.com', 'Lucasfilm', '$88,000', 'Closed Won'],
  ['Hannah Abbott', 'hannah@magic.uk', 'Magic UK', '$4,100', 'Negotiation'],
];

export default function BrowserSimulation() {
  const [filledCells, setFilledCells] = useState<number>(0);
  const totalCells = MOCK_DATA.length * columns.length;

  useEffect(() => {
    let currentCell = 0;
    let timeout: NodeJS.Timeout;

    const animate = () => {
      if (currentCell < totalCells) {
        setFilledCells(currentCell + 1);
        currentCell++;
        // Speed up the typing dramatically over time 
        // Starts at 100ms per cell, drops rapidly to just 15ms per cell
        const delay = Math.max(15, 100 - (currentCell * 3)); 
        timeout = setTimeout(animate, delay);
      } else {
        // Reset after a 3 second pause at the end to loop the animation
        timeout = setTimeout(() => {
          setFilledCells(0);
          currentCell = 0;
          animate();
        }, 3000);
      }
    };

    // Start 1.5 seconds after mounting
    timeout = setTimeout(animate, 1500);

    return () => clearTimeout(timeout);
  }, [totalCells]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto mt-16 rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 bg-zinc-900 flex flex-col font-sans text-sm group"
    >
      
      {/* Browser Chrome Header (Mac Style) */}
      <div className="bg-[#2D2D2D] h-12 flex items-center px-4 gap-4 select-none relative z-20">
        {/* Mac OS Window Controls */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        {/* Active Tab */}
        <div className="bg-[#1E1E1E] text-zinc-300 px-4 py-2 rounded-t-lg flex items-center gap-2 text-xs translate-y-2 border-t border-x border-white/5 shadow-md">
          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m-2 14H7v-2h10v2m0-4H7v-2h10v2m0-4H7V7h10v2z"/></svg>
          Q3 Lead Enrichment
          <span className="ml-6 opacity-40 hover:opacity-100 cursor-pointer text-[10px]">✕</span>
        </div>
      </div>

      {/* Browser URL / Address Bar */}
      <div className="bg-[#1E1E1E] h-12 flex items-center px-4 gap-4 border-b border-white/5 relative z-20">
        <div className="flex gap-4 text-zinc-400">
          <svg className="w-4 h-4 cursor-pointer hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <svg className="w-4 h-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          <svg className="w-4 h-4 cursor-pointer hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </div>
        {/* URL Input Box */}
        <div className="flex-1 bg-[#0F0F0F] rounded-md h-8 border border-white/5 flex items-center px-4 text-[13px] text-zinc-300 gap-2 shadow-inner">
          <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          <span className="opacity-60">docs.google.com/spreadsheets/d/</span>
          <span>1BxiMVs0...</span>
        </div>
        <div className="text-zinc-400 flex gap-4">
           <svg className="w-4 h-4 cursor-pointer hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
        </div>
      </div>

      {/* Main Website Content Area (Google Sheets Simulation) */}
      <div className="bg-white flex-1 flex flex-col h-[400px] relative z-10 selection:bg-blue-200">
        
        {/* App Title & Top Menus */}
        <div className="h-16 border-b border-zinc-200 flex flex-col justify-center px-4 gap-1.5 bg-[#F9FBFD]">
          <div className="text-[15px] font-medium text-zinc-800 flex items-center gap-3">
             <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m-2 14H7v-2h10v2m0-4H7v-2h10v2m0-4H7V7h10v2z"/></svg>
             Q3 Lead Enrichment <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold tracking-wider">.XLSX</span>
          </div>
          <div className="flex gap-4 text-[13px] text-zinc-600 pl-8">
            <span className="cursor-pointer hover:bg-zinc-200/50 px-1.5 rounded transition-colors">File</span>
            <span className="cursor-pointer hover:bg-zinc-200/50 px-1.5 rounded transition-colors">Edit</span>
            <span className="cursor-pointer hover:bg-zinc-200/50 px-1.5 rounded transition-colors">View</span>
            <span className="cursor-pointer hover:bg-zinc-200/50 px-1.5 rounded transition-colors">Insert</span>
            <span className="cursor-pointer hover:bg-zinc-200/50 px-1.5 rounded transition-colors">Format</span>
            <span className="cursor-pointer hover:bg-zinc-200/50 px-1.5 rounded transition-colors">Data</span>
            <span className="cursor-pointer hover:bg-zinc-200/50 px-1.5 rounded transition-colors">Tools</span>
          </div>
        </div>

        {/* Action Toolbar (bold, italic, alignment, etc) */}
        <div className="h-9 border-b border-zinc-200 flex items-center px-4 gap-4 text-zinc-600 bg-white shadow-sm z-10">
           <svg className="w-4 h-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
           <svg className="w-4 h-4 cursor-pointer opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" /></svg>
           <div className="w-px h-5 bg-zinc-300"></div>
           <span className="font-bold cursor-pointer font-serif">B</span>
           <span className="italic cursor-pointer font-serif">I</span>
           <span className="underline cursor-pointer font-serif">U</span>
           <div className="w-px h-5 bg-zinc-300"></div>
           <svg className="w-4 h-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </div>

        {/* Formula Bar */}
        <div className="h-8 border-b border-zinc-300 flex items-center px-4 gap-3 text-zinc-600 text-[13px] bg-white">
          <span className="font-mono text-zinc-400 italic font-bold">fx</span>
          <div className="h-5 w-px bg-zinc-300"></div>
          {/* Fills in dynamically as AI interacts */}
          <div className="flex-1 font-mono text-zinc-800">
             {filledCells > 0 ? Object.values(MOCK_DATA).flat()[Math.min(filledCells - 1, Object.values(MOCK_DATA).flat().length - 1)] : ''}
          </div>
        </div>

        {/* The Spreadsheet Grid */}
        <div className="overflow-hidden relative flex-1 bg-white">
          <table className="w-full text-left border-collapse table-fixed" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr className="bg-[#F8F9FA]">
                <th className="w-10 border-b-2 border-r border-[#C0C0C0] bg-[#F8F9FA]"></th>
                {columns.map((col, i) => (
                  <th key={i} className="border-b-2 border-r border-[#C0C0C0] font-normal text-xs text-center py-1.5 text-zinc-600 bg-[#F8F9FA] hover:bg-zinc-200 cursor-pointer transition-colors select-none shadow-sm">{String.fromCharCode(65 + i)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Header Row (Row 1) */}
              <tr>
                <td className="w-10 border-b border-r border-[#C0C0C0] text-center text-xs text-zinc-500 bg-[#F8F9FA] select-none hover:bg-zinc-200 cursor-pointer">1</td>
                {columns.map((col, i) => (
                  <td key={i} className="border-b border-r border-[#E2E3E3] px-3 py-1.5 text-[13px] font-bold text-zinc-800 bg-white truncate shadow-sm relative z-0">{col}</td>
                ))}
              </tr>
              
              {/* Data Rows */}
              {MOCK_DATA.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="w-10 border-b border-r border-[#C0C0C0] text-center text-xs text-zinc-500 bg-[#F8F9FA] select-none hover:bg-zinc-200 cursor-pointer">{rowIndex + 2}</td>
                  
                  {row.map((cellValue, colIndex) => {
                    const cellIndex = (rowIndex * columns.length) + colIndex;
                    
                    // State flags
                    const isFilled = filledCells > cellIndex;
                    const isTyping = filledCells === cellIndex;

                    return (
                      <td 
                        key={colIndex} 
                        className={`border-b border-r border-[#E2E3E3] px-3 py-1.5 text-[13px] text-zinc-800 transition-colors duration-75 relative overflow-hidden
                        ${isTyping ? 'bg-[#E8F0FE]' : 'bg-white'}`}
                      >
                        <div className="truncate w-full font-medium pointer-events-none text-zinc-800">
                             {isFilled ? cellValue : '\u00A0'}
                        </div>
                        
                        {/* The AI "Cursor" cell highlighter */}
                        {isTyping && (
                          <motion.div 
                            layoutId="spreadsheet-cursor"
                            className="absolute -inset-[1px] border-[2px] border-[#1A73E8] z-10"
                            transition={{ duration: 0, ease: "linear" }}
                          >
                            {/* Blue box drag handle in bottom right corner */}
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#1A73E8] border border-white"></div>
                          </motion.div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Overlay to gracefully fade out the bottom rows so it doesn't hard cut */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20"></div>
        </div>
      </div>
    </motion.div>
  );
}
