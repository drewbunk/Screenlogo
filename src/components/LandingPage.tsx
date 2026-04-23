import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  Smartphone, 
  Zap, 
  Shield, 
  Layout, 
  Sparkles,
  MonitorSmartphone,
  Palette,
  MessageCircle,
  Wand2,
  Image as ImageIcon,
  Layers
} from 'lucide-react';

interface LandingPageProps {
  onStartScreenshots: () => void;
  onStartIconMaker: () => void;
}

export function LandingPage({ onStartScreenshots, onStartIconMaker }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-violet-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl tracking-tight text-slate-900">
            <div className="w-8 h-8 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-violet-200">
              <Layers className="w-5 h-5" />
            </div>
            <span>Screenlogo</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-violet-600 transition-colors">Features</a>
            <a href="#templates" className="hover:text-violet-600 transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-violet-600 transition-colors">Pricing</a>
            <button 
              onClick={onStartScreenshots}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md"
            >
              Open Studio
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Powered by Gemini & Nano Banana Pro</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight text-slate-900"
          >
            Design App Store assets <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">at the speed of thought.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-medium"
          >
            The premium creative suite for indie devs and startup creators. Generate stunning screenshots, craft perfect icons, and let AI handle the heavy lifting.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onStartScreenshots}
              className="w-full sm:w-auto bg-violet-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-violet-700 transition-all shadow-xl shadow-violet-200/50 flex items-center justify-center gap-2"
            >
              Design Screenshots <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onStartIconMaker}
              className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Make App Icon <ImageIcon className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Hero Image Preview - Redesigned for Screenlogo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="mt-20 max-w-6xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200/60 bg-white p-4 relative"
        >
          <div className="w-full rounded-[1.5rem] shadow-inner bg-slate-50 overflow-hidden relative h-[400px] md:h-[600px]">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
              <div className="absolute top-40 -left-40 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
            </div>

            {/* Content composition */}
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 p-8">
              
              {/* Left: Screenshot Editor Preview */}
              <div className="w-full md:w-1/2 h-full max-h-[500px] bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col overflow-hidden transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Editor Header */}
                <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-3 bg-white shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  </div>
                  <div className="mx-auto text-xs font-bold text-slate-800 tracking-wide uppercase">Screenshot Studio</div>
                </div>
                {/* Editor Body */}
                <div className="flex-1 flex p-4 gap-4 bg-slate-50/50 overflow-hidden">
                  {/* Sidebar */}
                  <div className="w-1/3 bg-white rounded-xl border border-slate-100 p-3 space-y-4 hidden sm:block shadow-sm">
                    <div className="h-4 w-20 bg-slate-100 rounded"></div>
                    <div className="h-24 w-full bg-violet-50 rounded-lg border border-violet-100 flex flex-col items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-violet-400" />
                      <div className="h-2 w-16 bg-violet-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-slate-100 rounded"></div>
                      <div className="h-3 w-4/5 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                  {/* Canvas */}
                  <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-blue-600 opacity-90"></div>
                    {/* Phone Frame */}
                    <div className="w-36 h-72 bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-800 p-1 relative shadow-2xl transform translate-y-12">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-5 bg-slate-900 rounded-b-2xl z-10"></div>
                      <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col">
                          <div className="h-1/2 bg-slate-100 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-slate-300" />
                          </div>
                          <div className="h-1/2 bg-white p-3 space-y-3">
                            <div className="h-3 w-3/4 bg-slate-200 rounded-full"></div>
                            <div className="h-2 w-1/2 bg-slate-100 rounded-full"></div>
                            <div className="h-2 w-2/3 bg-slate-100 rounded-full"></div>
                          </div>
                      </div>
                    </div>
                    {/* Floating Text */}
                    <div className="absolute top-10 text-center w-full px-4">
                      <div className="text-white font-black text-2xl tracking-tight shadow-sm">Screenlogo</div>
                      <div className="text-white/90 text-sm font-medium mt-1">Design better, faster.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Icon Maker Preview */}
              <div className="w-full md:w-1/3 h-full max-h-[400px] bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col overflow-hidden transform md:rotate-3 hover:rotate-0 transition-transform duration-500 md:translate-y-8 hidden sm:flex">
                {/* Editor Header */}
                <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-3 bg-white shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  </div>
                  <div className="mx-auto text-xs font-bold text-slate-800 tracking-wide uppercase">Icon Studio</div>
                </div>
                {/* Editor Body */}
                <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 p-6 relative">
                  {/* Settings Panel */}
                  <div className="absolute top-4 right-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100 space-y-3">
                    <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
                    <div className="w-24 h-2 bg-slate-100 rounded-full"></div>
                  </div>
                  {/* Icon Preview */}
                  <div className="w-32 h-32 md:w-44 md:h-44 bg-gradient-to-tr from-violet-600 to-blue-500 rounded-[22%] shadow-2xl flex items-center justify-center border border-white/20 relative group">
                    <Layers className="w-16 h-16 md:w-20 md:h-20 text-white" />
                    {/* Grid overlay */}
                    <div className="absolute inset-0 border border-white/40 rounded-[22%] opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute top-1/2 left-0 w-full h-px bg-white/40"></div>
                      <div className="absolute left-1/2 top-0 h-full w-px bg-white/40"></div>
                    </div>
                  </div>
                  <div className="mt-10 flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center"><div className="w-6 h-6 rounded-md bg-slate-200"></div></div>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center"><div className="w-5 h-5 rounded-md bg-slate-200"></div></div>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center"><div className="w-4 h-4 rounded-md bg-slate-200"></div></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* AI Features Section */}
      <section id="features" className="py-24 bg-white px-4 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 tracking-tight">Supercharged by AI</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Stop searching for stock photos or struggling with vectors. Let Gemini and Nano Banana Pro generate exactly what you need.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-6">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Magic Auto-Fill</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Upload a raw screenshot and our AI instantly writes a catchy title, subtitle, and picks the perfect color palette to match your app's vibe.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">AI Backgrounds</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Generate stunning 1K, 2K, or 4K backgrounds using Nano Banana Pro. Just type a prompt like "neon city at night" and get a unique backdrop instantly.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">AI Logo Generation</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Need an icon? Describe your idea and our AI will generate a flat, vector-style logo perfectly formatted for the App Store.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Device Support Section */}
      <section className="py-24 bg-[#FAFAFA] px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">Pixel-perfect for every Apple device.</h2>
            <p className="text-lg text-slate-500 font-medium mb-8 leading-relaxed">
              Stop worrying about App Store Connect requirements. Screenlogo automatically scales and frames your screenshots to meet Apple's exact specifications.
            </p>
            <ul className="space-y-4">
              {[
                'iPhone 6.5" & 6.7" Displays',
                'iPad 12.9" & 13" Displays',
                'Apple Watch Ultra 3, Series 11, 9, 6, 3',
                'Automatic App Icon sizing (1024px, 180px, 120px)'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square bg-gradient-to-br from-violet-100 to-blue-50 rounded-full absolute inset-0 blur-3xl opacity-50"></div>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 transform translate-y-8">
                <Smartphone className="w-10 h-10 text-slate-800 mb-4" />
                <h4 className="font-bold text-lg mb-1">iPhone</h4>
                <p className="text-sm text-slate-500 font-medium">1290 × 2796px</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
                <MonitorSmartphone className="w-10 h-10 text-slate-800 mb-4" />
                <h4 className="font-bold text-lg mb-1">iPad</h4>
                <p className="text-sm text-slate-500 font-medium">2064 × 2752px</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 bg-white px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 tracking-tight">Premium Layouts</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Choose from dozens of high-converting styles designed specifically for the modern App Store.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Modern Gradient', desc: 'Vibrant colors that pop on dark mode.', icon: <Sparkles className="text-violet-500" /> },
              { title: 'Clean Minimal', desc: 'Let your UI do the talking.', icon: <Smartphone className="text-blue-500" /> },
              { title: 'Two Screens', desc: 'Showcase flows with overlapping devices.', icon: <Layers className="text-indigo-500" /> },
              { title: 'Technical Grid', desc: 'Perfect for developer tools and utilities.', icon: <MonitorSmartphone className="text-slate-500" /> },
              { title: 'Social Focus', desc: 'Highlight user profiles and chat.', icon: <MessageCircle className="text-green-500" /> },
              { title: 'Feature List', desc: 'Bullet points for complex apps.', icon: <Layout className="text-orange-500" /> },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4 }}
                className="bg-[#FAFAFA] p-6 rounded-3xl border border-slate-200 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#FAFAFA] px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 tracking-tight">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Choose the plan that fits your creative workflow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 flex flex-col hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-slate-900">Basic</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-black text-slate-900">Free</span>
              </div>
              <p className="text-slate-500 font-medium mb-8">Perfect for trying out the editor and creating your first set of screenshots.</p>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 font-medium text-slate-700">
                  <Check className="w-5 h-5 text-violet-500" /> 1 project
                </li>
                <li className="flex items-center gap-3 font-medium text-slate-700">
                  <Check className="w-5 h-5 text-violet-500" /> Manual exports
                </li>
                <li className="flex items-center gap-3 font-medium text-slate-700">
                  <Check className="w-5 h-5 text-violet-500" /> Standard templates
                </li>
              </ul>
              <button 
                onClick={onStartScreenshots}
                className="w-full py-4 rounded-xl font-bold border-2 border-slate-200 text-slate-900 hover:border-slate-900 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-violet-900/20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-black text-white">$5</span>
                <span className="text-slate-400 font-medium">/ month</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">Billed annually at $60.00. Cancel anytime.</p>
              <p className="text-slate-300 font-medium mb-8">For builders and small teams who update listings often.</p>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 font-medium text-white">
                  <Check className="w-5 h-5 text-violet-400" /> 10 projects
                </li>
                <li className="flex items-center gap-3 font-medium text-white">
                  <Check className="w-5 h-5 text-violet-400" /> AI Magic Auto-Fill
                </li>
                <li className="flex items-center gap-3 font-medium text-white">
                  <Check className="w-5 h-5 text-violet-400" /> AI Backgrounds (1K)
                </li>
              </ul>
              <button 
                onClick={onStartScreenshots}
                className="w-full py-4 rounded-xl font-bold bg-violet-500 text-white hover:bg-violet-600 transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Scale Plan */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 flex flex-col hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-slate-900">Scale</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-black text-slate-900">$10</span>
                <span className="text-slate-500 font-medium">/ month</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">Billed annually at $120.00. Cancel anytime.</p>
              <p className="text-slate-500 font-medium mb-8">For serious app professionals who want to save hours and ship faster.</p>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 font-medium text-slate-700">
                  <Check className="w-5 h-5 text-violet-500" /> Unlimited projects
                </li>
                <li className="flex items-center gap-3 font-medium text-slate-700">
                  <Check className="w-5 h-5 text-violet-500" /> 4K AI Backgrounds
                </li>
                <li className="flex items-center gap-3 font-medium text-slate-700">
                  <Check className="w-5 h-5 text-violet-500" /> AI Logo Generation
                </li>
              </ul>
              <button 
                onClick={onStartScreenshots}
                className="w-full py-4 rounded-xl font-bold border-2 border-slate-200 text-slate-900 hover:border-slate-900 transition-colors"
              >
                Upgrade to Scale
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/20 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">Ready to launch?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
              Join thousands of indie developers and designers who use Screenlogo to create stunning App Store assets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStartScreenshots}
                className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Open Screenlogo Studio <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAFAFA] py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-black text-lg tracking-tight text-slate-900">
            <div className="w-6 h-6 bg-violet-600 rounded-lg flex items-center justify-center text-white">
              <Layers className="w-3 h-3" />
            </div>
            <span>Screenlogo</span>
          </div>
          <div className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Screenlogo. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-violet-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
