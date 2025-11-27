import React, { useState } from 'react';
import { parseVideoUrl } from './services/mockDownloaderService';
import { VideoData } from './types';
import { AdSlot } from './components/AdSlot';
import { ResultCard } from './components/ResultCard';
import { LinkIcon, LoaderIcon, SparklesIcon, GlobeIcon, TrashIcon, PasteIcon } from './components/ui/Icons';

type Language = 'en' | 'zh';

const uiTranslations = {
  en: {
    nav_how: "How to Download",
    nav_sites: "Supported Sites",
    nav_faq: "FAQ",
    hero_title_1: "Download TikTok & Douyin",
    hero_title_2: "Without Watermark",
    hero_desc: "The fastest, cleanest, and most advanced video downloader. Just paste the link and let our AI do the rest.",
    placeholder: "Paste video link here (share link or raw cached url)",
    btn_parse: "Parse URL",
    btn_clear: "Clear Content",
    btn_paste: "Paste Link",
    error_empty: "Please enter a valid link.",
    footer_rights: "© 2024 SnapSave Pro. Not affiliated with TikTok or ByteDance.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
    features: [
       { title: 'No Watermark', desc: 'Download high quality videos without the annoying logo.', color: 'bg-blue-50 text-blue-600' },
       { title: 'MP3 Extraction', desc: 'Save just the background music or audio in MP3 format.', color: 'bg-green-50 text-green-600' },
       { title: 'AI Powered', desc: 'Generate viral captions and hashtags for your reposts.', color: 'bg-amber-50 text-amber-600' },
    ]
  },
  zh: {
    nav_how: "如何下载",
    nav_sites: "支持站点",
    nav_faq: "常见问题",
    hero_title_1: "下载抖音 & TikTok",
    hero_title_2: "无水印视频",
    hero_desc: "最快、最简洁的高级视频下载器。只需粘贴链接，剩下的交给 AI。",
    placeholder: "在此粘贴视频链接 (支持分享链接或嗅探到的缓存地址)",
    btn_parse: "解析网址",
    btn_clear: "清除内容",
    btn_paste: "粘贴链接",
    error_empty: "请输入有效的链接。",
    footer_rights: "© 2024 SnapSave Pro. 与 TikTok 或 字节跳动 无关。",
    privacy: "隐私政策",
    terms: "服务条款",
    contact: "联系我们",
    features: [
       { title: '无水印', desc: '下载高清无水印视频，画质无损。', color: 'bg-blue-50 text-blue-600' },
       { title: 'MP3 提取', desc: '仅提取背景音乐或音频，保存为 MP3 格式。', color: 'bg-green-50 text-green-600' },
       { title: 'AI 赋能', desc: '自动生成爆款文案和热门标签，助您轻松转发。', color: 'bg-amber-50 text-amber-600' },
    ]
  }
};

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VideoData | null>(null);
  const [lang, setLang] = useState<Language>('en');

  const t = uiTranslations[lang];

  const handleParse = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await parseVideoUrl(url);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to parse video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text); 
      // Reset previous state so user feels the "freshness" of the new paste
      setError(null);
      setResult(null);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const handleClear = () => {
    setUrl('');
    setError(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-lg mr-2 flex items-center justify-center text-white font-bold text-xl shadow-md">
                S
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">SnapSave<span className="text-brand-600">Pro</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-brand-600 transition-colors">{t.nav_how}</a>
              <a href="#" className="hover:text-brand-600 transition-colors">{t.nav_sites}</a>
              <a href="#" className="hover:text-brand-600 transition-colors">{t.nav_faq}</a>
              
              {/* Language Switcher */}
              <div className="relative group pl-4 border-l border-gray-200">
                <button className="flex items-center text-gray-500 hover:text-brand-600 transition-colors py-2">
                  <GlobeIcon className="w-5 h-5 mr-1.5"/>
                  <span>{lang === 'en' ? 'English' : '中文'}</span>
                </button>
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover:block overflow-hidden py-1 animate-fade-in">
                  <button 
                    onClick={() => setLang('en')} 
                    className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${lang === 'en' ? 'text-brand-600 bg-brand-50' : 'text-gray-700'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => setLang('zh')} 
                    className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${lang === 'zh' ? 'text-brand-600 bg-brand-50' : 'text-gray-700'}`}
                  >
                    中文 (CN)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center">
        
        {/* Top Ad Banner */}
        <div className="w-full max-w-5xl px-4 mt-6">
            <AdSlot slotId="top-banner-001" format="banner" debugLabel="Top Leaderboard" />
        </div>

        {/* Hero Section */}
        <div className="w-full max-w-3xl px-4 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-brand-700 to-indigo-800 mb-6 pb-2">
            {t.hero_title_1} <br className="hidden md:block"/>
            <span className="text-brand-500">{t.hero_title_2}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            {t.hero_desc}
          </p>

          {/* Search Area */}
          <div className="max-w-2xl mx-auto w-full">
            {/* Input Field */}
            <div className="relative group mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors"/>
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 text-base md:text-lg rounded-2xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none bg-white"
                placeholder={t.placeholder}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleParse()}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
               <button
                type="button"
                onClick={handleClear}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-600 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <TrashIcon className="w-4 h-4 mr-2"/>
                {t.btn_clear}
              </button>

              <button
                type="button"
                onClick={handlePaste}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <PasteIcon className="w-4 h-4 mr-2"/>
                {t.btn_paste}
              </button>
              
              <button
                type="button"
                onClick={() => handleParse()}
                disabled={loading}
                className={`w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm md:text-base font-semibold shadow-md transition-all ${loading ? 'opacity-80 cursor-wait' : ''}`}
              >
                {loading ? <LoaderIcon className="animate-spin w-5 h-5 mr-2"/> : null}
                {t.btn_parse}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm animate-fade-in inline-block">
              {error}
            </div>
          )}
        </div>

        {/* Results Area */}
        {result && (
          <div className="w-full px-4 mb-20 animate-fade-up">
            <ResultCard data={result} lang={lang} />
            
            {/* Ad between results */}
            <div className="max-w-4xl mx-auto mt-8">
               <AdSlot slotId="mid-content-001" format="rectangle" debugLabel="Mid Content Ad" className="h-40" />
            </div>
          </div>
        )}

        {/* Features / SEO Content */}
        {!result && (
           <div className="w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
             {t.features.map((feature, idx) => (
               <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                 <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <SparklesIcon className="w-6 h-6"/>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
               </div>
             ))}
           </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {t.footer_rights}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">{t.privacy}</a>
             <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">{t.terms}</a>
             <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">{t.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;