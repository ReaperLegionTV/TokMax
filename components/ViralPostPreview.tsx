import React, { useState } from 'react';
import { Copy, RefreshCcw, Check, Hash } from 'lucide-react';
import { TikTokAnalysis } from '../types';

interface ViralPostPreviewProps {
  analysis: TikTokAnalysis;
}

const ViralPostPreview: React.FC<ViralPostPreviewProps> = ({ analysis }) => {
  const [selectedHookIndex, setSelectedHookIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  const currentHook = analysis.viralHooks[selectedHookIndex];
  // Filter out # if it's already there to avoid double hashes, then add it back
  const hashtagsString = analysis.hashtags.map(tag => `#${tag.replace(/^#/, '')}`).join(' ');
  
  // Construct the full post text
  const fullPostText = `${currentHook}\n\n${analysis.caption}\n\n${hashtagsString}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPostText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTags = () => {
    navigator.clipboard.writeText(hashtagsString);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const cycleHook = () => {
    setSelectedHookIndex((prev) => (prev + 1) % analysis.viralHooks.length);
  };

  return (
    <div className="glass-panel rounded-2xl p-1 md:p-1.5 bg-gradient-to-b from-zinc-800/40 to-black/40 border border-zinc-700/50 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
       {/* Header Controls */}
       <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/50 bg-zinc-900/30 rounded-t-xl">
          <div className="flex items-center gap-3">
             <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
             </div>
             <span className="ml-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">Post Preview</span>
          </div>
          <div className="flex items-center gap-2">
             <button 
               onClick={cycleHook}
               className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20"
             >
               <RefreshCcw className="w-3.5 h-3.5" />
               <span>Hook {selectedHookIndex + 1}/{analysis.viralHooks.length}</span>
             </button>
          </div>
       </div>

       {/* Content Area */}
       <div className="p-6 font-sans text-sm md:text-base leading-relaxed text-gray-200 bg-[#0a0a0a]">
          <div className="font-black text-white mb-4 text-lg md:text-xl tracking-tight">
            {currentHook}
          </div>
          <div className="mb-6 text-gray-300 whitespace-pre-wrap">
            {analysis.caption}
          </div>
          <div className="text-cyan-400 font-medium text-sm leading-relaxed break-words">
            {hashtagsString}
          </div>
       </div>

       {/* Footer Actions */}
       <div className="px-4 py-4 bg-zinc-900/50 rounded-b-xl border-t border-zinc-800/50 flex flex-col md:flex-row justify-between gap-3">
          <button
             onClick={handleCopyTags}
             className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border border-transparent hover:border-zinc-700"
          >
             {copiedTags ? <Check className="w-3.5 h-3.5" /> : <Hash className="w-3.5 h-3.5" />}
             Copy Tags Only
          </button>

          <button
            onClick={handleCopy}
            className={`
              flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all transform active:scale-95
              ${copied 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                : 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]'}
            `}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy Full Post
              </>
            )}
          </button>
       </div>
    </div>
  );
};

export default ViralPostPreview;