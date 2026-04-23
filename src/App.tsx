import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Upload, Download, Type as TypeIcon, MonitorSmartphone, Palette, LayoutTemplate, Smartphone, Tablet, Image as ImageIcon, Layers, Briefcase, Heart, MessageCircle, CheckSquare, Sparkles, Watch, ArrowLeft } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { LandingPage } from './components/LandingPage';
import { IconMaker } from './components/IconMaker';

type DeviceTemplate = {
  id: string;
  name: string;
  width: number;
  height: number;
  deviceAspectRatio: number;
  frameStyle: 'dynamic-island' | 'notch' | 'bezel' | 'ipad' | 'watch';
  icon: React.ReactNode;
};

const TEMPLATES: DeviceTemplate[] = [
  {
    id: 'iphone-69',
    name: '6.9" Display',
    width: 1320,
    height: 2868,
    deviceAspectRatio: 1320 / 2868,
    frameStyle: 'dynamic-island',
    icon: <Smartphone className="w-4 h-4" />
  },
  {
    id: 'iphone-67',
    name: '6.7" Display',
    width: 1290,
    height: 2796,
    deviceAspectRatio: 1290 / 2796,
    frameStyle: 'dynamic-island',
    icon: <Smartphone className="w-4 h-4" />
  },
  {
    id: 'iphone-65',
    name: '6.5" Display',
    width: 1242,
    height: 2688,
    deviceAspectRatio: 1242 / 2688,
    frameStyle: 'notch',
    icon: <Smartphone className="w-4 h-4" />
  },
  {
    id: 'ipad-13',
    name: '13" Display',
    width: 2064,
    height: 2752,
    deviceAspectRatio: 2064 / 2752,
    frameStyle: 'ipad',
    icon: <Tablet className="w-4 h-4" />
  },
  {
    id: 'ipad-129',
    name: '12.9" Display',
    width: 2048,
    height: 2732,
    deviceAspectRatio: 2048 / 2732,
    frameStyle: 'ipad',
    icon: <Tablet className="w-4 h-4" />
  },
  {
    id: 'watch-ultra-3',
    name: 'Watch Ultra 3',
    width: 422,
    height: 514,
    deviceAspectRatio: 422 / 514,
    frameStyle: 'watch',
    icon: <Watch className="w-4 h-4" />
  },
  {
    id: 'watch-series-11',
    name: 'Watch Series 11',
    width: 416,
    height: 496,
    deviceAspectRatio: 416 / 496,
    frameStyle: 'watch',
    icon: <Watch className="w-4 h-4" />
  },
  {
    id: 'watch-series-9',
    name: 'Watch Series 9',
    width: 396,
    height: 484,
    deviceAspectRatio: 396 / 484,
    frameStyle: 'watch',
    icon: <Watch className="w-4 h-4" />
  },
  {
    id: 'watch-series-6',
    name: 'Watch Series 6',
    width: 368,
    height: 448,
    deviceAspectRatio: 368 / 448,
    frameStyle: 'watch',
    icon: <Watch className="w-4 h-4" />
  },
  {
    id: 'watch-series-3',
    name: 'Watch Series 3',
    width: 312,
    height: 390,
    deviceAspectRatio: 312 / 390,
    frameStyle: 'watch',
    icon: <Watch className="w-4 h-4" />
  }
];

const BACKGROUNDS = [
  { name: 'Purple Gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Blue Gradient', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Sunset', value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: 'Ocean', value: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)' },
  { name: 'Mesh Purple', value: 'radial-gradient(at 0% 0%, #764ba2 0, transparent 50%), radial-gradient(at 50% 0%, #667eea 0, transparent 50%), radial-gradient(at 100% 0%, #4facfe 0, transparent 50%)' },
  { name: 'Mesh Sunset', value: 'radial-gradient(at 0% 0%, #fa709a 0, transparent 50%), radial-gradient(at 50% 0%, #fee140 0, transparent 50%), radial-gradient(at 100% 0%, #ff9a9e 0, transparent 50%)' },
  { name: 'Mesh Ocean', value: 'radial-gradient(at 0% 0%, #2af598 0, transparent 50%), radial-gradient(at 50% 0%, #009efd 0, transparent 50%), radial-gradient(at 100% 0%, #38f9d7 0, transparent 50%)' },
  { name: 'Dark', value: '#1a202c' },
  { name: 'Light', value: '#f7fafc' },
  { name: 'White', value: '#ffffff' },
];

const PATTERNS = [
  { name: 'None', value: 'none' },
  { name: 'Dots', value: 'dots' },
  { name: 'Grid', value: 'grid' },
  { name: 'Diagonal', value: 'diagonal' },
  { name: 'Waves', value: 'waves' },
];

type AppConfig = {
  image: string | null;
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
  deviceColor: string;
  layout: 'text-top' | 'text-bottom' | 'device-only' | 'two-screens';
  fontFamily: string;
  imageFit: 'cover' | 'contain';
  pattern?: string;
  patternOpacity?: number;
  adjustments: Record<string, { scale: number; offsetX: number; offsetY: number }>;
};

type StyleTemplate = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  config: Partial<AppConfig>;
};

const STYLE_TEMPLATES: StyleTemplate[] = [
  {
    id: 'aura',
    name: 'Aura',
    description: 'Soft gradients and modern typography',
    icon: <Sparkles className="w-5 h-5" />,
    config: {
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      deviceColor: '#ffffff',
      layout: 'text-top',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      imageFit: 'cover',
    }
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'High contrast and impact',
    icon: <Layers className="w-5 h-5" />,
    config: {
      backgroundColor: '#000000',
      textColor: '#ffffff',
      deviceColor: '#ffffff',
      layout: 'text-bottom',
      fontFamily: 'Helvetica, Arial, sans-serif',
      imageFit: 'cover',
    }
  },
  {
    id: 'clean',
    name: 'Clean',
    description: 'Minimalist and professional',
    icon: <CheckSquare className="w-5 h-5" />,
    config: {
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      deviceColor: '#0f172a',
      layout: 'text-top',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      imageFit: 'contain',
    }
  },
  {
    id: 'duo',
    name: 'Duo',
    description: 'Two-tone split background',
    icon: <LayoutTemplate className="w-5 h-5" />,
    config: {
      backgroundColor: 'linear-gradient(to bottom, #ffffff 45%, #e2e8f0 45%)',
      textColor: '#1e293b',
      deviceColor: '#1e293b',
      layout: 'text-top',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      imageFit: 'cover',
    }
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Elegant serif typography',
    icon: <Briefcase className="w-5 h-5" />,
    config: {
      backgroundColor: '#fff7ed',
      textColor: '#431407',
      deviceColor: '#431407',
      layout: 'text-top',
      fontFamily: 'Georgia, serif',
      imageFit: 'cover',
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm and vibrant vibes',
    icon: <Heart className="w-5 h-5" />,
    config: {
      backgroundColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      textColor: '#1a1a1a',
      deviceColor: '#1a1a1a',
      layout: 'text-top',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      imageFit: 'cover',
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Calm and deep blue tones',
    icon: <MessageCircle className="w-5 h-5" />,
    config: {
      backgroundColor: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
      textColor: '#ffffff',
      deviceColor: '#ffffff',
      layout: 'text-bottom',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      imageFit: 'cover',
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Just the device, no distractions',
    icon: <Smartphone className="w-5 h-5" />,
    config: {
      backgroundColor: '#ffffff',
      textColor: '#ffffff',
      deviceColor: '#000000',
      layout: 'device-only',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      imageFit: 'cover',
    }
  },
  {
    id: 'mesh-vibe',
    name: 'Mesh Vibe',
    description: 'Modern mesh gradients',
    icon: <Sparkles className="w-5 h-5" />,
    config: {
      backgroundColor: 'radial-gradient(at 0% 0%, #764ba2 0, transparent 50%), radial-gradient(at 50% 0%, #667eea 0, transparent 50%), radial-gradient(at 100% 0%, #4facfe 0, transparent 50%)',
      textColor: '#ffffff',
      deviceColor: '#ffffff',
      layout: 'text-top',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      imageFit: 'cover',
      pattern: 'dots',
      patternOpacity: 0.15,
    }
  },
  {
    id: 'grid-pro',
    name: 'Grid Pro',
    description: 'Technical grid background',
    icon: <MonitorSmartphone className="w-5 h-5" />,
    config: {
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      deviceColor: '#1a1a1a',
      layout: 'text-top',
      fontFamily: 'monospace',
      imageFit: 'contain',
      pattern: 'grid',
      patternOpacity: 0.1,
    }
  },
  {
    id: 'waves-vibrant',
    name: 'Waves',
    description: 'Vibrant waves pattern',
    icon: <Palette className="w-5 h-5" />,
    config: {
      backgroundColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      textColor: '#1a1a1a',
      deviceColor: '#1a1a1a',
      layout: 'text-bottom',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      imageFit: 'cover',
      pattern: 'waves',
      patternOpacity: 0.2,
    }
  }
];

const FONTS = [
  { name: 'System Sans', value: 'system-ui, -apple-system, sans-serif' },
  { name: 'Helvetica/Arial', value: 'Helvetica, Arial, sans-serif' },
  { name: 'Georgia Serif', value: 'Georgia, serif' },
  { name: 'Monospace', value: 'monospace' },
];

export default function App() {
  const [view, setView] = useState<'landing' | 'editor' | 'icon-maker'>('landing');
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [config, setConfig] = useState<AppConfig>({
    image: null,
    title: 'Awesome App',
    subtitle: 'The best app in the world',
    backgroundColor: BACKGROUNDS[0].value,
    textColor: '#ffffff',
    deviceColor: '#1a1a1a',
    layout: 'text-top',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    imageFit: 'cover',
    pattern: 'none',
    patternOpacity: 0.1,
    adjustments: {},
  });
  
  const [activeTemplateId, setActiveTemplateId] = useState(TEMPLATES[0].id);
  const activeTemplate = TEMPLATES.find(t => t.id === activeTemplateId) || TEMPLATES[0];
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [scale, setScale] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  
  const [bgPrompt, setBgPrompt] = useState('');
  const [bgSize, setBgSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGeneratingBg, setIsGeneratingBg] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const padding = 60;
        const availableWidth = width - padding * 2;
        const availableHeight = height - padding * 2;
        
        const scaleX = availableWidth / activeTemplate.width;
        const scaleY = availableHeight / activeTemplate.height;
        
        setScale(Math.min(scaleX, scaleY));
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [activeTemplate.width, activeTemplate.height]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig({ ...config, image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMagicAutoFill = async () => {
    if (!config.image) return;
    setIsGeneratingAI(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const match = config.image.match(/^data:(image\/[a-z]+);base64,(.+)$/);
      if (!match) throw new Error("Invalid image format");
      const mimeType = match[1];
      const base64Data = match[2];

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            }
          },
          "Analyze this app screenshot. Generate a catchy, short App Store title (max 30 chars) and subtitle (max 40 chars). Suggest a background color (hex or CSS linear-gradient), text color (hex), device color (hex), and font family (must be exactly one of: 'system-ui, -apple-system, sans-serif', 'Helvetica, Arial, sans-serif', 'Georgia, serif', 'monospace') that perfectly matches the app's vibe and colors."
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Catchy app title" },
              subtitle: { type: Type.STRING, description: "App subtitle" },
              backgroundColor: { type: Type.STRING, description: "Hex color or linear-gradient" },
              textColor: { type: Type.STRING, description: "Hex color for text" },
              deviceColor: { type: Type.STRING, description: "Hex color for device frame" },
              fontFamily: { type: Type.STRING, description: "One of the allowed font families" }
            },
            required: ["title", "subtitle", "backgroundColor", "textColor", "deviceColor", "fontFamily"]
          }
        }
      });

      if (response.text) {
        const aiConfig = JSON.parse(response.text);
        setConfig(prev => ({
          ...prev,
          title: aiConfig.title || prev.title,
          subtitle: aiConfig.subtitle || prev.subtitle,
          backgroundColor: aiConfig.backgroundColor || prev.backgroundColor,
          textColor: aiConfig.textColor || prev.textColor,
          deviceColor: aiConfig.deviceColor || prev.deviceColor,
          fontFamily: aiConfig.fontFamily || prev.fontFamily
        }));
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("Failed to generate AI suggestions. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleGenerateBackground = async () => {
    if (!bgPrompt) return;
    
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

    setIsGeneratingBg(true);
    try {
      // Re-initialize to pick up the new key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: bgPrompt,
        config: {
          imageConfig: {
            aspectRatio: activeTemplate.deviceAspectRatio > 1 ? "16:9" : "9:16",
            imageSize: bgSize
          }
        }
      });
      
      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const imageUrl = `url(data:${part.inlineData.mimeType || 'image/png'};base64,${base64EncodeString})`;
          setConfig(prev => ({ ...prev, backgroundColor: imageUrl, pattern: 'none' }));
          break;
        }
      }
    } catch (error) {
      console.error("Error generating background:", error);
      alert("Failed to generate background. Please try again.");
    } finally {
      setIsGeneratingBg(false);
    }
  };

  const downloadScreenshot = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      // Small delay to ensure any UI updates are flushed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(canvasRef.current, {
        quality: 1,
        pixelRatio: 1,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `screenshot-${activeTemplate.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const downloadAllScreenshots = async () => {
    setIsExporting(true);
    const originalTemplateId = activeTemplateId;
    
    try {
      for (const template of TEMPLATES) {
        setActiveTemplateId(template.id);
        // Wait for React to re-render and image to settle
        await new Promise(resolve => setTimeout(resolve, 400));
        
        if (canvasRef.current) {
          const dataUrl = await toPng(canvasRef.current, {
            quality: 1,
            pixelRatio: 1,
            cacheBust: true,
          });
          const link = document.createElement('a');
          link.download = `screenshot-${template.id}.png`;
          link.href = dataUrl;
          link.click();
          
          // Small pause between downloads
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
    } catch (err) {
      console.error('Failed to generate images', err);
      alert('Failed to generate images. Please try again.');
    } finally {
      setActiveTemplateId(originalTemplateId);
      setIsExporting(false);
    }
  };

  if (view === 'landing') {
    return <LandingPage 
      onStartScreenshots={() => setView('editor')} 
      onStartIconMaker={() => setView('icon-maker')} 
    />;
  }

  if (view === 'icon-maker') {
    return <IconMaker onBack={() => setView('landing')} />;
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA] font-sans text-slate-900 overflow-hidden selection:bg-violet-200">
      {/* Sidebar */}
      <div className="w-80 bg-white/90 backdrop-blur-xl border-r border-slate-200/60 flex flex-col h-full overflow-y-auto shadow-sm z-10">
        <div className="p-6 border-b border-slate-100">
          <button 
            onClick={() => setView('landing')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-violet-600 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <h1 className="text-xl font-black flex items-center gap-2 text-slate-900 tracking-tight">
            <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center text-white shadow-sm shadow-violet-200">
              <Layers className="w-4 h-4" />
            </div>
            Screenlogo Studio
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Professional App Store Assets</p>
        </div>

        <div className="p-6 space-y-8 flex-1">
          {/* Upload Section */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-violet-500" /> Screenshot
            </h2>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-violet-300 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <p className="text-sm text-slate-500 font-semibold">Click to upload image</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
            {config.image && (
              <button
                onClick={handleMagicAutoFill}
                disabled={isGeneratingAI}
                className="mt-3 w-full py-2.5 px-4 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                <Sparkles className={`w-4 h-4 ${isGeneratingAI ? 'animate-spin' : ''}`} />
                {isGeneratingAI ? 'Analyzing Screenshot...' : 'AI Magic Auto-Fill'}
              </button>
            )}
          </section>

          {/* Templates Section */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-violet-500" /> Templates
              </h2>
              <button 
                onClick={() => setShowTemplateLibrary(true)}
                className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors"
              >
                Browse All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {STYLE_TEMPLATES.slice(0, 4).map(template => (
                <button
                  key={template.id}
                  onClick={() => setConfig({ ...config, ...template.config })}
                  className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all text-slate-700 ${
                    config.backgroundColor === template.config.backgroundColor ? 'bg-violet-50 border-violet-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="mb-1 text-violet-500">{template.icon}</div>
                  <span className="text-xs font-semibold">{template.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Text Section */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <TypeIcon className="w-4 h-4 text-violet-500" /> Content
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={config.title}
                  onChange={(e) => setConfig({...config, title: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Subtitle</label>
                <input 
                  type="text" 
                  value={config.subtitle}
                  onChange={(e) => setConfig({...config, subtitle: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all font-medium"
                />
              </div>
            </div>
          </section>

          {/* Design Section */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-violet-500" /> Design
            </h2>
            <div className="space-y-4">
              
              {/* AI Background Generator */}
              <div className="bg-violet-50/50 p-4 rounded-2xl border border-violet-100 space-y-3">
                <div className="flex items-center gap-2 text-violet-700 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  AI Background (Nano Banana Pro)
                </div>
                <input 
                  type="text" 
                  placeholder="e.g. A vibrant neon city at night..."
                  value={bgPrompt}
                  onChange={(e) => setBgPrompt(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all font-medium"
                />
                <div className="flex gap-2">
                  <select 
                    value={bgSize} 
                    onChange={(e) => setBgSize(e.target.value as any)}
                    className="px-2 py-2 text-sm border border-violet-200 rounded-xl bg-white text-violet-700 outline-none focus:ring-2 focus:ring-violet-500 font-semibold"
                  >
                    <option value="1K">1K</option>
                    <option value="2K">2K</option>
                    <option value="4K">4K</option>
                  </select>
                  <button
                    onClick={handleGenerateBackground}
                    disabled={isGeneratingBg || !bgPrompt}
                    className="flex-1 py-2 px-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isGeneratingBg ? <Sparkles className="w-4 h-4 animate-spin" /> : 'Generate'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Background Design</label>
                <div className="grid grid-cols-3 gap-2">
                  {BACKGROUNDS.map((bg, i) => (
                    <button
                      key={i}
                      className={`h-10 rounded-xl border-2 transition-all ${config.backgroundColor === bg.value ? 'border-violet-500 scale-105' : 'border-transparent hover:scale-105 shadow-sm'}`}
                      style={{ background: bg.value }}
                      onClick={() => setConfig({...config, backgroundColor: bg.value})}
                      title={bg.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Background Pattern</label>
                <div className="grid grid-cols-5 gap-2">
                  {PATTERNS.map(p => (
                    <button
                      key={p.name}
                      onClick={() => setConfig({ ...config, pattern: p.value })}
                      className={`h-10 rounded-xl border-2 flex items-center justify-center text-[10px] font-bold transition-all ${config.pattern === p.value ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-slate-100 hover:border-slate-200 bg-white text-slate-500'}`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {config.pattern && config.pattern !== 'none' && (
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-500">Pattern Opacity</label>
                    <span className="text-xs font-bold text-violet-600">{Math.round((config.patternOpacity || 0.1) * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.01" 
                    max="0.5" 
                    step="0.01"
                    value={config.patternOpacity || 0.1}
                    onChange={(e) => setConfig({ ...config, patternOpacity: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Text Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={config.textColor}
                      onChange={(e) => setConfig({...config, textColor: e.target.value})}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                    />
                    <span className="text-sm text-slate-600 font-medium uppercase">{config.textColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Device Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={config.deviceColor}
                      onChange={(e) => setConfig({...config, deviceColor: e.target.value})}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                    />
                    <span className="text-sm text-slate-600 font-medium uppercase">{config.deviceColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Font Family</label>
                <select 
                  value={config.fontFamily}
                  onChange={(e) => setConfig({...config, fontFamily: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm font-medium"
                >
                  {FONTS.map(font => (
                    <option key={font.value} value={font.value}>{font.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Layout Section */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-violet-500" /> Layout
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className={`px-3 py-2 text-sm rounded-xl border font-semibold transition-colors ${config.layout === 'text-top' ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                  onClick={() => setConfig({...config, layout: 'text-top'})}
                >
                  Text Top
                </button>
                <button 
                  className={`px-3 py-2 text-sm rounded-xl border font-semibold transition-colors ${config.layout === 'text-bottom' ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                  onClick={() => setConfig({...config, layout: 'text-bottom'})}
                >
                  Text Bottom
                </button>
                <button 
                  className={`px-3 py-2 text-sm rounded-xl border font-semibold transition-colors ${config.layout === 'device-only' ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                  onClick={() => setConfig({...config, layout: 'device-only'})}
                >
                  Device Only
                </button>
                <button 
                  className={`px-3 py-2 text-sm rounded-xl border font-semibold transition-colors ${config.layout === 'two-screens' ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                  onClick={() => setConfig({...config, layout: 'two-screens'})}
                >
                  Two Screens
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Image Fit</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`px-3 py-2 text-sm rounded-xl border font-semibold transition-colors ${config.imageFit === 'cover' ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                    onClick={() => setConfig({...config, imageFit: 'cover'})}
                  >
                    Cover
                  </button>
                  <button 
                    className={`px-3 py-2 text-sm rounded-xl border font-semibold transition-colors ${config.imageFit === 'contain' ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                    onClick={() => setConfig({...config, imageFit: 'contain'})}
                  >
                    Contain
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Screenshot Adjustments Section */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MonitorSmartphone className="w-4 h-4 text-violet-500" /> Adjustments
            </h2>
            <div className="space-y-4">
              <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Current Display: {activeTemplate.name}</div>
                <div className="font-medium">Dimensions: {activeTemplate.width} × {activeTemplate.height}px</div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-semibold text-slate-700">Scale</label>
                  <span className="text-xs font-bold text-violet-600">{config.adjustments[activeTemplate.id]?.scale ?? 100}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="200" 
                  value={config.adjustments[activeTemplate.id]?.scale ?? 100}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setConfig({
                      ...config,
                      adjustments: {
                        ...config.adjustments,
                        [activeTemplate.id]: {
                          ...(config.adjustments[activeTemplate.id] || { offsetX: 0, offsetY: 0 }),
                          scale: val
                        }
                      }
                    });
                  }}
                  className="w-full accent-violet-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-semibold text-slate-700">Offset X</label>
                  <span className="text-xs font-bold text-violet-600">{config.adjustments[activeTemplate.id]?.offsetX ?? 0}%</span>
                </div>
                <input 
                  type="range" 
                  min="-100" 
                  max="100" 
                  value={config.adjustments[activeTemplate.id]?.offsetX ?? 0}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setConfig({
                      ...config,
                      adjustments: {
                        ...config.adjustments,
                        [activeTemplate.id]: {
                          ...(config.adjustments[activeTemplate.id] || { scale: 100, offsetY: 0 }),
                          offsetX: val
                        }
                      }
                    });
                  }}
                  className="w-full accent-violet-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-semibold text-slate-700">Offset Y</label>
                  <span className="text-xs font-bold text-violet-600">{config.adjustments[activeTemplate.id]?.offsetY ?? 0}%</span>
                </div>
                <input 
                  type="range" 
                  min="-100" 
                  max="100" 
                  value={config.adjustments[activeTemplate.id]?.offsetY ?? 0}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setConfig({
                      ...config,
                      adjustments: {
                        ...config.adjustments,
                        [activeTemplate.id]: {
                          ...(config.adjustments[activeTemplate.id] || { scale: 100, offsetX: 0 }),
                          offsetY: val
                        }
                      }
                    });
                  }}
                  className="w-full accent-violet-600"
                />
              </div>
              
              <button
                onClick={() => {
                  const newAdjustments = { ...config.adjustments };
                  delete newAdjustments[activeTemplate.id];
                  setConfig({ ...config, adjustments: newAdjustments });
                }}
                className="w-full py-2.5 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors font-bold"
              >
                Reset Adjustments
              </button>
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-slate-200/60 bg-slate-50/50 space-y-3">
          <button 
            onClick={downloadScreenshot}
            disabled={isExporting}
            className="w-full py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-sm"
          >
            <Download className="w-5 h-5" />
            Export Current
          </button>
          <button 
            onClick={downloadAllScreenshots}
            disabled={isExporting}
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-md shadow-violet-200"
          >
            {isExporting ? (
              <span className="animate-pulse">Generating All...</span>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Export All Sizes
              </>
            )}
          </button>
          <p className="text-xs text-center text-slate-500 mt-3 font-medium">
            Exports at exact App Store Connect resolutions
          </p>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAFA]">
        {/* Topbar: Device Selection */}
        <div className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center px-6 gap-4 overflow-x-auto shadow-sm z-10">
          <span className="text-sm font-bold text-slate-500 flex items-center gap-2 shrink-0 uppercase tracking-wider">
            <MonitorSmartphone className="w-4 h-4 text-violet-500" /> Target Device
          </span>
          <div className="flex gap-2">
            {TEMPLATES.map(template => (
              <button
                key={template.id}
                onClick={() => setActiveTemplateId(template.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  activeTemplateId === template.id 
                    ? 'bg-violet-100 text-violet-700 ring-2 ring-violet-500 ring-offset-1' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {template.icon}
                {template.name}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Preview Area */}
        <div 
          ref={containerRef} 
          className="flex-1 relative overflow-hidden flex items-center justify-center p-8 pattern-dots"
        >
          <div 
            style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: 'center center',
              transition: 'transform 0.1s ease-out'
            }}
            className="shadow-2xl ring-1 ring-black/5"
          >
            <div 
              ref={canvasRef}
              className="relative flex flex-col overflow-hidden"
              style={{
                width: activeTemplate.width,
                height: activeTemplate.height,
                background: config.backgroundColor,
              }}
            >
              {/* Pattern Overlay */}
              {config.pattern && config.pattern !== 'none' && (
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    opacity: config.patternOpacity || 0.1,
                    backgroundImage: 
                      config.pattern === 'dots' ? 'radial-gradient(currentColor 1px, transparent 1px)' :
                      config.pattern === 'grid' ? 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)' :
                      config.pattern === 'diagonal' ? 'linear-gradient(45deg, currentColor 1px, transparent 1px)' :
                      config.pattern === 'waves' ? 'radial-gradient(circle at 100% 50%, transparent 20%, currentColor 21%, currentColor 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, currentColor 21%, currentColor 34%, transparent 35%, transparent)' : 'none',
                    backgroundSize: 
                      config.pattern === 'dots' ? '24px 24px' :
                      config.pattern === 'grid' ? '40px 40px' :
                      config.pattern === 'diagonal' ? '20px 20px' :
                      config.pattern === 'waves' ? '40px 40px' : 'auto',
                    color: config.textColor,
                  }}
                />
              )}
              {config.layout === 'text-top' && (
                <>
                  <div className="flex-none pt-[12%] px-[8%] text-center z-10" style={{ fontFamily: config.fontFamily }}>
                    <h1 style={{ color: config.textColor, fontSize: `${activeTemplate.width * 0.08}px`, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                      {config.title || 'Your App Title'}
                    </h1>
                    <p style={{ color: config.textColor, fontSize: `${activeTemplate.width * 0.035}px`, marginTop: `${activeTemplate.width * 0.03}px`, opacity: 0.9, fontWeight: 500 }}>
                      {config.subtitle || 'A catchy subtitle for your app'}
                    </p>
                  </div>
                  <div className="flex-1 relative mt-[8%] flex justify-center items-end">
                    <DeviceFrame config={config} template={activeTemplate} />
                  </div>
                </>
              )}
              
              {config.layout === 'text-bottom' && (
                <>
                  <div className="flex-1 relative mb-[8%] flex justify-center items-start pt-[10%]">
                    <DeviceFrame config={config} template={activeTemplate} />
                  </div>
                  <div className="flex-none pb-[12%] px-[8%] text-center z-10" style={{ fontFamily: config.fontFamily }}>
                    <h1 style={{ color: config.textColor, fontSize: `${activeTemplate.width * 0.08}px`, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                      {config.title || 'Your App Title'}
                    </h1>
                    <p style={{ color: config.textColor, fontSize: `${activeTemplate.width * 0.035}px`, marginTop: `${activeTemplate.width * 0.03}px`, opacity: 0.9, fontWeight: 500 }}>
                      {config.subtitle || 'A catchy subtitle for your app'}
                    </p>
                  </div>
                </>
              )}

              {config.layout === 'device-only' && (
                <div className="flex-1 relative flex justify-center items-center">
                  <DeviceFrame config={config} template={activeTemplate} />
                </div>
              )}

              {config.layout === 'two-screens' && (
                <>
                  <div className="flex-none pt-[8%] px-[8%] text-center z-10" style={{ fontFamily: config.fontFamily }}>
                    <h1 style={{ color: config.textColor, fontSize: `${activeTemplate.width * 0.07}px`, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                      {config.title || 'Your App Title'}
                    </h1>
                    <p style={{ color: config.textColor, opacity: 0.9, fontSize: `${activeTemplate.width * 0.035}px`, marginTop: '2%', fontWeight: 500 }}>
                      {config.subtitle || 'The best app ever created'}
                    </p>
                  </div>
                  <div className="flex-1 relative flex justify-center items-center pt-[5%]">
                    <div className="absolute transform -translate-x-[40%] -rotate-6 z-10">
                      <DeviceFrame config={config} template={activeTemplate} />
                    </div>
                    <div className="absolute transform translate-x-[40%] rotate-6 z-0" style={{ opacity: 0.9 }}>
                      <DeviceFrame config={config} template={activeTemplate} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Template Library Modal */}
      {showTemplateLibrary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-slate-200/60">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Template Library</h2>
                <p className="text-sm text-slate-500 font-medium">Choose a starting style for your app screenshots</p>
              </div>
              <button 
                onClick={() => setShowTemplateLibrary(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Upload className="w-6 h-6 rotate-45 text-slate-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {STYLE_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setConfig({ ...config, ...template.config });
                      setShowTemplateLibrary(false);
                    }}
                    className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-violet-500 hover:shadow-xl transition-all text-left"
                  >
                    <div 
                      className="h-40 w-full relative flex items-center justify-center p-4"
                      style={{ background: template.config.backgroundColor }}
                    >
                      {/* Pattern Overlay in Template Preview */}
                      {template.config.pattern && template.config.pattern !== 'none' && (
                        <div 
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            opacity: template.config.patternOpacity || 0.1,
                            backgroundImage: 
                              template.config.pattern === 'dots' ? 'radial-gradient(currentColor 1px, transparent 1px)' :
                              template.config.pattern === 'grid' ? 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)' :
                              template.config.pattern === 'diagonal' ? 'linear-gradient(45deg, currentColor 1px, transparent 1px)' :
                              template.config.pattern === 'waves' ? 'radial-gradient(circle at 100% 50%, transparent 20%, currentColor 21%, currentColor 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, currentColor 21%, currentColor 34%, transparent 35%, transparent)' : 'none',
                            backgroundSize: 
                              template.config.pattern === 'dots' ? '12px 12px' :
                              template.config.pattern === 'grid' ? '20px 20px' :
                              template.config.pattern === 'diagonal' ? '10px 10px' :
                              template.config.pattern === 'waves' ? '20px 20px' : 'auto',
                            color: template.config.textColor,
                          }}
                        />
                      )}
                      <div 
                        className="w-16 h-32 bg-slate-900 rounded-xl border-2 border-white/20 shadow-lg relative overflow-hidden flex flex-col"
                        style={{ borderColor: template.config.deviceColor }}
                      >
                        {template.config.layout === 'text-top' && (
                          <div className="absolute top-2 left-2 right-2 space-y-1">
                            <div className="h-1 w-8 bg-white/40 rounded"></div>
                            <div className="h-1 w-12 bg-white/20 rounded"></div>
                          </div>
                        )}
                        <div className="flex-1 bg-slate-800 m-1 rounded-sm"></div>
                        {template.config.layout === 'text-bottom' && (
                          <div className="absolute bottom-2 left-2 right-2 space-y-1">
                            <div className="h-1 w-8 bg-white/40 rounded"></div>
                            <div className="h-1 w-12 bg-white/20 rounded"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-violet-600">{template.icon}</span>
                        <h3 className="font-bold text-slate-900">{template.name}</h3>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 font-medium">{template.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 flex justify-end bg-white">
              <button 
                onClick={() => setShowTemplateLibrary(false)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const DeviceFrame = ({ config, template }: { config: AppConfig, template: DeviceTemplate }) => {
  const frameWidth = template.width * 0.82; 
  const frameHeight = frameWidth / template.deviceAspectRatio;
  
  let borderRadius = frameWidth * 0.12;
  let borderWidth = frameWidth * 0.025;
  
  if (template.frameStyle === 'ipad') {
    borderRadius = frameWidth * 0.04;
    borderWidth = frameWidth * 0.02;
  } else if (template.frameStyle === 'bezel') {
    borderRadius = frameWidth * 0.08;
    borderWidth = frameWidth * 0.02;
  } else if (template.frameStyle === 'watch') {
    borderRadius = frameWidth * 0.18;
    borderWidth = frameWidth * 0.04;
  }
  
  return (
    <div 
      className="relative bg-black shadow-2xl flex flex-col"
      style={{
        width: frameWidth,
        height: frameHeight,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        borderColor: config.deviceColor,
        borderStyle: 'solid',
        overflow: 'hidden',
        transform: config.layout === 'text-top' ? 'translateY(5%)' : config.layout === 'text-bottom' ? 'translateY(-5%)' : 'none'
      }}
    >
      {/* Notch / Dynamic Island */}
      {template.frameStyle === 'dynamic-island' && (
        <div className="absolute top-[1.5%] left-1/2 -translate-x-1/2 w-[28%] h-[3.5%] bg-black rounded-full z-20 shadow-inner"></div>
      )}
      {template.frameStyle === 'notch' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[3.5%] bg-black rounded-b-3xl z-20"></div>
      )}
      {template.frameStyle === 'bezel' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-[12%] bg-white z-20 flex items-center justify-center border-b border-gray-200">
            <div className="w-[15%] h-[8%] bg-gray-300 rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-white z-20 flex items-center justify-center border-t border-gray-200">
            <div className="w-[12%] aspect-square bg-gray-50 border-2 border-gray-300 rounded-full"></div>
          </div>
        </>
      )}
      
      {/* Screen Content */}
      <div className="w-full h-full bg-gray-100 relative z-10 overflow-hidden" 
           style={{
             marginTop: template.frameStyle === 'bezel' ? '12%' : 0,
             marginBottom: template.frameStyle === 'bezel' ? '12%' : 0,
             height: template.frameStyle === 'bezel' ? '76%' : '100%'
           }}>
        {config.image ? (
          <img 
            src={config.image} 
            alt="Screenshot" 
            className={`w-full h-full ${config.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            style={{
              transform: `scale(${(config.adjustments?.[template.id]?.scale ?? 100) / 100}) translate(${config.adjustments?.[template.id]?.offsetX ?? 0}%, ${config.adjustments?.[template.id]?.offsetY ?? 0}%)`
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <ImageIcon style={{ width: frameWidth * 0.1, height: frameWidth * 0.1, marginBottom: frameWidth * 0.05 }} />
            <span style={{ fontSize: frameWidth * 0.04, fontWeight: 500 }}>Upload Screenshot</span>
          </div>
        )}
      </div>
    </div>
  );
}
