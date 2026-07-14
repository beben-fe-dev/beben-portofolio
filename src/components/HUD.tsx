import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { Language } from '../utils/i18n';

interface HUDProps {
  bentoPowerState: string;
  coinCount: number;
  xp: number;
  selectedJob: number;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lang: Language;
  changeLanguage: (lang: Language) => void;
  isMuted: boolean;
  handleToggleMute: () => void;
  clickCoinHUD: () => void;
  t: (key: any) => string;
}

export const HUD: React.FC<HUDProps> = ({
  bentoPowerState,
  coinCount,
  xp,
  selectedJob,
  darkMode,
  setDarkMode,
  lang,
  changeLanguage,
  isMuted,
  handleToggleMute,
  clickCoinHUD,
  t
}) => {
  return (
    <header className={`w-full max-w-6xl mb-6 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 border-4 p-4 rounded-xl shadow-2xl relative transition-colors duration-300 ${
      darkMode ? 'bg-[#141522] border-[#333]' : 'bg-white border-gray-400 text-black'
    }`}>
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 bg-[#e52521] border-4 border-white flex items-center justify-center text-3xl font-bold rounded-lg shadow-lg select-none retro-font-press animate-retro-bounce">
          {bentoPowerState === 'FIRE' ? '🔥' : bentoPowerState === 'STAR' ? '⭐' : bentoPowerState === 'TANOOKI' ? '🍀' : 'B'}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse border border-black"></span>
            <span className="retro-font-press text-[9px] text-green-500 font-bold">
              {t('status')}: {bentoPowerState} BENTO
            </span>
          </div>
          <h1 className="retro-font-press text-lg sm:text-2xl tracking-widest mt-1">BENTO P.H.</h1>
          <p className="retro-font-silk text-xs text-yellow-500 font-bold tracking-widest mt-0.5">★ SENIOR FRONTEND ENGINEER ★</p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:flex items-center justify-between gap-2 sm:gap-6 bg-[#0a0b12] p-3 rounded-lg border-2 border-gray-800 text-white">
        <div onClick={clickCoinHUD} className="flex flex-col items-center px-2 cursor-pointer group">
          <span className="text-xl animate-coin group-hover:scale-125 transition-transform">🪙</span>
          <span className="text-[8px] retro-font-press text-gray-500 mt-1">{t('coins')}</span>
          <span className="text-[11px] sm:text-xs font-bold text-yellow-300 retro-font-press">x{String(coinCount).padStart(2, '0')}</span>
        </div>

        <div className="hidden sm:block h-10 w-[2px] bg-gray-800"></div>

        <div className="flex flex-col items-center px-2">
          <span className="text-xl">🏆</span>
          <span className="text-[8px] retro-font-press text-gray-500 mt-1">{t('score')}</span>
          <span className="text-[11px] sm:text-xs font-bold text-green-400 retro-font-press">{String(xp).padStart(6, '0')}</span>
        </div>

        <div className="hidden sm:block h-10 w-[2px] bg-gray-800"></div>

        <div className="flex flex-col items-center px-2">
          <span className="text-xl">🗺️</span>
          <span className="text-[8px] retro-font-press text-gray-500 mt-1">{t('world')}</span>
          <span className="text-[11px] sm:text-xs font-bold text-blue-400 retro-font-press">1-{selectedJob + 1}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-2 rounded-lg border-2 text-[8px] sm:text-[9px] font-bold cursor-pointer transition-all ${
            darkMode ? 'bg-gray-800 text-yellow-400 border-gray-700 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
          } retro-font-press`}
        >
          {darkMode ? t('themeToggleLight') : t('themeToggleDark')}
        </button>

        <div className="flex bg-[#0a0b12] border-2 border-gray-800 rounded-lg p-1 text-white">
          <button 
            onClick={() => changeLanguage('en')}
            className={`px-2 py-1 text-[8px] sm:text-[9px] font-bold rounded ${
              lang === 'en' ? 'bg-[#e52521] text-white' : 'text-gray-500 hover:text-white'
            } retro-font-press`}
          >
            EN
          </button>
          <button 
            onClick={() => changeLanguage('id')}
            className={`px-2 py-1 text-[8px] sm:text-[9px] font-bold rounded ${
              lang === 'id' ? 'bg-[#e52521] text-white' : 'text-gray-500 hover:text-white'
            } retro-font-press`}
          >
            ID
          </button>
        </div>

        <button 
          onClick={handleToggleMute}
          className={`p-2 rounded-lg border-2 font-mono flex items-center justify-center cursor-pointer transition-all ${
            isMuted 
              ? 'bg-red-950/40 text-red-500 border-red-900 hover:bg-red-900/40' 
              : 'bg-green-950/40 text-green-400 border-green-800 hover:bg-green-900/40'
          }`}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
        </button>
      </div>
    </header>
  );
};
