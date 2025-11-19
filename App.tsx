import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import { TikTokAnalysis, ImageUpload } from './types';
import { analyzeTikTokConcept } from './services/geminiService';

const App: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<TikTokAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (text: string, image: ImageUpload | null) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      // Simulate a minimum loading time for UX feel (so it doesn't flash too fast)
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));
      
      const analysisPromise = analyzeTikTokConcept(
        text, 
        image?.base64, 
        image?.mimeType
      );

      const [result] = await Promise.all([analysisPromise, minLoadTime]);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate analysis. Please try again or check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <Header />
        
        <main className="relative z-10">
          <InputForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center mb-8 animate-in fade-in slide-in-from-top-4">
              {error}
            </div>
          )}

          {analysisResult && !isAnalyzing && (
            <AnalysisDisplay data={analysisResult} />
          )}
        </main>
      </div>

      {/* Background Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none -z-0 mix-blend-screen"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px] pointer-events-none -z-0 mix-blend-screen"></div>
    </div>
  );
};

export default App;
