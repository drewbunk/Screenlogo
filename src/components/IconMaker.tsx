import React, { useState, useRef } from 'react';
import { Upload, Download, ArrowLeft, Layers, Image as ImageIcon, Sliders, Sparkles } from 'lucide-react';
import { toPng } from 'html-to-image';
import { GoogleGenAI } from '@google/genai';

interface IconConfig {
  logo: string | null;
  backgroundColor: string;
  padding: number;
  previewRadius: number;
}

export function IconMaker({ onBack }: { onBack: () => void }) {
  const [config, setConfig] = useState<IconConfig>({
    logo: null,
    backgroundColor: '#ffffff',
    padding: 20,
    previewRadius: 22, // Apple's continuous curve is roughly 22% of the size
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [logoPrompt, setLogoPrompt] = useState('');
  const [logoSize, setLogoSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);

  const handleGenerateLogo = async () => {
    if (!logoPrompt) return;
    
    // Check for API key
    const win = window as any;
    if (win.aistudio && !(await win.aistudio.hasSelectedApiKey())) {
      try {
        await win.aistudio.openSelectKey();
      } catch (e) {
        console.error("Failed to open API key selector", e);
        return;
      }
    }

    setIsGeneratingLogo(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: `App icon logo, transparent background, flat design, vector style: ${logoPrompt}`,
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: logoSize
          }
        }
      });
      
      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${base64EncodeString}`;
          setConfig(prev => ({ ...prev, logo: imageUrl }));
          break;
        }
      }
    } catch (error) {
      console.error("Error generating logo:", error);
      alert("Failed to generate logo. Please try again.");
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig(prev => ({ ...prev, logo: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const exportIcon = async (size: number, name: string) => {
    if (!canvasRef.current) return;
    
    // We temporarily remove border radius for export because Apple requires square icons without transparency
    const originalRadius = config.previewRadius;
    setConfig(prev => ({ ...prev, previewRadius: 0 }));
    
    // Wait for state to update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      const dataUrl = await toPng(canvasRef.current, {
        quality: 1,
        pixelRatio: size / 512, // The preview canvas is 512x512
        cacheBust: true,
      });
      
      const link = document.createElement('a');
      link.download = `${name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate icon', err);
    } finally {
      setConfig(prev => ({ ...prev, previewRadius: originalRadius }));
    }
  };

  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      await exportIcon(1024, 'AppStore-1024x1024');
      await new Promise(resolve => setTimeout(resolve, 300));
      await exportIcon(180, 'iPhone-180x180');
      await new Promise(resolve => setTimeout(resolve, 300));
      await exportIcon(120, 'iPhone-120x120');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA] font-sans text-slate-900 overflow-hidden selection:bg-violet-200">
      {/* Sidebar */}
      <div className="w-80 bg-white/90 backdrop-blur-xl border-r border-slate-200/60 flex flex-col h-full overflow-y-auto shadow-sm z-10">
        <div className="p-6 border-b border-slate-100">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-violet-600 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <h1 className="text-xl font-black flex items-center gap-2 text-slate-900 tracking-tight">
            <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center text-white shadow-sm shadow-violet-200">
              <Layers className="w-4 h-4" />
            </div>
            Icon Studio
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Design for App Store Connect</p>
        </div>

        <div className="p-6 space-y-8 flex-1">
          {/* Upload Section */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-violet-500" /> Logo Image
            </h2>
            
            {/* AI Logo Generator */}
            <div className="bg-violet-50/50 p-4 rounded-2xl border border-violet-100 space-y-3 mb-4">
              <div className="flex items-center gap-2 text-violet-700 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                AI Logo (Nano Banana Pro)
              </div>
              <input 
                type="text" 
                placeholder="e.g. A minimalist fox head..."
                value={logoPrompt}
                onChange={(e) => setLogoPrompt(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all font-medium"
              />
              <div className="flex gap-2">
                <select 
                  value={logoSize} 
                  onChange={(e) => setLogoSize(e.target.value as any)}
                  className="px-2 py-2 text-sm border border-violet-200 rounded-xl bg-white text-violet-700 outline-none focus:ring-2 focus:ring-violet-500 font-semibold"
                >
                  <option value="1K">1K</option>
                  <option value="2K">2K</option>
                  <option value="4K">4K</option>
                </select>
                <button
                  onClick={handleGenerateLogo}
                  disabled={isGeneratingLogo || !logoPrompt}
                  className="flex-1 py-2 px-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isGeneratingLogo ? <Sparkles className="w-4 h-4 animate-spin" /> : 'Generate'}
                </button>
              </div>
            </div>

            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-violet-300 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <p className="text-sm text-slate-500 font-semibold text-center px-4">Upload transparent PNG or SVG</p>
              </div>
              <input type="file" className="hidden" accept="image/png, image/svg+xml" onChange={handleLogoUpload} />
            </label>
          </section>

          {/* Design Section */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-violet-500" /> Design
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Background Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={config.backgroundColor.startsWith('#') ? config.backgroundColor : '#ffffff'}
                    onChange={(e) => setConfig({...config, backgroundColor: e.target.value})}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 p-0"
                  />
                  <input 
                    type="text" 
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({...config, backgroundColor: e.target.value})}
                    className="flex-1 text-sm border border-slate-200 rounded-xl px-3 outline-none focus:ring-2 focus:ring-violet-500 font-medium"
                    placeholder="#FFFFFF or linear-gradient(...)"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Logo Padding</label>
                  <span className="text-xs font-bold text-violet-600">{config.padding}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="40" 
                  value={config.padding}
                  onChange={(e) => setConfig({...config, padding: parseInt(e.target.value)})}
                  className="w-full accent-violet-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Preview Border Radius</label>
                  <span className="text-xs font-bold text-violet-600">{config.previewRadius}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="50" 
                  value={config.previewRadius}
                  onChange={(e) => setConfig({...config, previewRadius: parseInt(e.target.value)})}
                  className="w-full accent-violet-600"
                />
                <p className="text-xs text-slate-400 mt-2 font-medium">
                  Note: Apple requires square icons without transparency. The radius is removed during export.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-slate-200/60 bg-slate-50/50">
          <button
            onClick={handleExportAll}
            disabled={isExporting}
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md shadow-violet-200"
          >
            <Download className="w-5 h-5" />
            {isExporting ? 'Exporting...' : 'Export 1024x1024'}
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative bg-[#FAFAFA] overflow-hidden">
        <div className="flex-1 overflow-auto flex items-center justify-center p-8 pattern-dots">
          
          <div 
            className="relative shadow-2xl transition-all duration-300"
            style={{ 
              width: 512, 
              height: 512,
              borderRadius: `${config.previewRadius}%`,
              overflow: 'hidden'
            }}
          >
            {/* The actual element to be captured */}
            <div 
              ref={canvasRef}
              className="w-full h-full flex items-center justify-center relative"
              style={{ background: config.backgroundColor }}
            >
              {config.logo ? (
                <img 
                  src={config.logo} 
                  alt="App Logo" 
                  className="w-full h-full object-contain"
                  style={{ padding: `${config.padding}%` }}
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <ImageIcon className="w-16 h-16 mb-2 opacity-50" />
                  <p className="font-medium">Upload Logo</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
