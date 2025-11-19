import React, { useState, useRef } from 'react';
import { Upload, X, Zap, Image as ImageIcon } from 'lucide-react';
import { ImageUpload } from '../types';

interface InputFormProps {
  onAnalyze: (text: string, image: ImageUpload | null) => void;
  isAnalyzing: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isAnalyzing }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<ImageUpload | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (images only)
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data URL prefix to get raw base64
      const base64Data = base64String.split(',')[1];
      
      setImage({
        file,
        previewUrl: URL.createObjectURL(file),
        base64: base64Data,
        mimeType: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    if (image) {
      URL.revokeObjectURL(image.previewUrl);
      setImage(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !image) return;
    onAnalyze(text, image);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl mb-8 shadow-xl border border-zinc-800">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Video Concept / Script
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., A Day in the life of a software engineer, trying the new viral coffee trend, educational video about finance..."
            className="w-full h-32 bg-zinc-900/50 border border-zinc-700 rounded-xl p-4 text-white placeholder-zinc-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none resize-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 uppercase tracking-wider flex justify-between items-center">
            <span>Upload Thumbnail / Screenshot (Optional)</span>
            {image && (
               <button 
                 type="button" 
                 onClick={clearImage}
                 className="text-xs text-red-400 hover:text-red-300"
               >
                 Remove
               </button>
            )}
          </label>
          
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-800/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-2 group-hover:bg-zinc-700 transition-colors">
                <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400" />
              </div>
              <p className="text-sm text-gray-500">Click to upload thumbnail context</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900/50 h-48 flex items-center justify-center">
              <img 
                src={image.previewUrl} 
                alt="Preview" 
                className="h-full object-contain" 
              />
              <div className="absolute top-2 right-2">
                 <button
                    type="button"
                    onClick={clearImage}
                    className="bg-black/50 hover:bg-black/80 p-1.5 rounded-full backdrop-blur-sm transition-colors"
                 >
                   <X className="w-4 h-4 text-white" />
                 </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isAnalyzing || (!text && !image)}
          className={`
            w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]
            ${isAnalyzing || (!text && !image)
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-500 to-pink-600 text-white hover:shadow-[0_0_20px_rgba(0,242,234,0.3)]'
            }
          `}
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Optimizing...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-current" />
              Maximize Virality
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
