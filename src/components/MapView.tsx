import React from 'react';
import { Map as MapIcon } from 'lucide-react';
import type { Language } from '../utils/i18n';

interface Experience {
  company: string;
  roleEn: string;
  roleId: string;
  period: string;
  world: string;
  bulletsEn: string[];
  bulletsId: string[];
  x: number;
  y: number;
}

interface MapViewProps {
  darkMode: boolean;
  t: (key: any) => string;
  experiences: Experience[];
  selectedJob: number;
  setSelectedJob: (idx: number) => void;
  mapCharPos: { x: number; y: number };
  isWalking: boolean;
  facingLeft: boolean;
  bentoPowerState: string;
  lang: Language;
}

export const MapView: React.FC<MapViewProps> = ({
  darkMode,
  t,
  experiences,
  selectedJob,
  setSelectedJob,
  mapCharPos,
  isWalking,
  facingLeft,
  bentoPowerState,
  lang
}) => {
  return (
    <div className={`border-4 rounded-xl p-4 sm:p-6 shadow-2xl text-left transition-colors duration-300 ${
      darkMode ? 'bg-[#141522] border-[#333]' : 'bg-white border-gray-400 text-black'
    }`}>
      <div className="flex items-center gap-2 mb-6">
        <MapIcon className="text-green-500 w-6 h-6 animate-pulse" />
        <div>
          <h2 className="retro-font-press text-xs">{t('worldMap')}</h2>
          <p className="text-xs text-gray-400 font-mono mt-1">{t('mapSubtitle')}</p>
        </div>
      </div>

      {/* Visual Dotted Path World Map */}
      <div className="w-full bg-[#0a0b12] border-4 border-black p-4 rounded-xl relative overflow-hidden mb-6 flex flex-col md:flex-row gap-6">
        
        {/* Map visual stage container */}
        <div className="flex-1 min-h-[250px] bg-[#6b8cff] rounded-lg border-2 border-white relative overflow-hidden p-3 shadow-inner">
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#00a000] border-t-2 border-black"></div>
          <div className="absolute top-4 left-6 w-16 h-8 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-10 right-12 w-20 h-10 bg-white rounded-full opacity-60"></div>

          {/* SVG Dotted Path connecting nodes precisely */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <polyline
              points={experiences.map(e => `${e.x}%,${e.y}%`).join(' ')}
              fill="none"
              stroke="#000"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={experiences.map(e => `${e.x}%,${e.y}%`).join(' ')}
              fill="none"
              stroke="#fbd000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 6"
              className="animate-[dash_2s_linear_infinite]"
            />
          </svg>

          {/* Interactive levels map nodes */}
          {experiences.map((exp, idx) => {
            const isSelected = selectedJob === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedJob(idx)}
                className={`absolute w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all cursor-pointer z-10 transform -translate-x-1/2 -translate-y-1/2 ${
                  isSelected
                    ? 'bg-red-600 border-white scale-110 shadow-lg shadow-black/80 animate-bounce'
                    : 'bg-[#fbd000] border-black hover:scale-110'
                }`}
                style={{ left: `${exp.x}%`, top: `${exp.y}%` }}
              >
                <span className="text-[9px] font-bold text-black font-mono">{idx + 1}</span>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[7px] retro-font-press whitespace-nowrap text-white drop-shadow-md">
                  W {idx + 1}
                </span>
              </button>
            );
          })}

          {/* Smooth Walking Bento Character marker */}
          <div 
            className={`absolute z-20 text-3xl select-none pointer-events-none transition-transform duration-100 ${
              isWalking ? 'animate-retro-bounce' : ''
            }`}
            style={{
              left: `${mapCharPos.x}%`,
              top: `${mapCharPos.y}%`,
              transform: `translate(-50%, -80%) scaleX(${facingLeft ? -1 : 1})`
            }}
          >
            {bentoPowerState === 'FIRE' ? '🧑‍🚒' : bentoPowerState === 'STAR' ? '🧙‍♂️' : bentoPowerState === 'TANOOKI' ? '🦝' : '🏃‍♂️'}
          </div>
        </div>

        {/* Selected Job HUD panel */}
        <div className="w-full md:w-[260px] bg-[#141522] border-2 border-gray-800 rounded-lg p-3 flex flex-col justify-between gap-4 text-white">
          <div>
            <div className="retro-font-press text-[9px] text-yellow-400 mb-1">{t('selectedWorld')}</div>
            <h3 className="text-xl font-bold text-white font-mono">{experiences[selectedJob].world}</h3>
            <div className="text-xs text-green-400 font-mono mt-1 font-bold">{experiences[selectedJob].company}</div>
            <div className="text-[10px] text-gray-400 font-mono mt-1">
              {lang === 'en' ? experiences[selectedJob].roleEn : experiences[selectedJob].roleId}
            </div>
          </div>

          <div className="text-[10px] font-mono text-gray-500 bg-black/40 p-2 rounded">
            {t('selectWorldDesc')}
          </div>
        </div>
      </div>

      {/* Stage Detailed view details */}
      <div className="bg-[#0a0b12] border-4 border-black p-5 rounded-xl transition-all relative overflow-hidden text-white">
        <div className="absolute right-4 top-4 text-xs font-mono text-yellow-400 bg-yellow-950/50 border border-yellow-800 px-3 py-1 rounded">
          🏆 {experiences[selectedJob].period}
        </div>

        <div className="mb-4">
          <p className="retro-font-press text-[9px] text-[#e52521] mb-1">{t('stageClearedLabel')}</p>
          <h3 className="text-2xl font-bold text-white">
            {experiences[selectedJob].company} 
            <span className="text-sm font-semibold text-gray-400 block sm:inline sm:ml-3">
              — {lang === 'en' ? experiences[selectedJob].roleEn : experiences[selectedJob].roleId}
            </span>
          </h3>
        </div>

        <div className="border-t border-gray-800 pt-4">
          <h4 className="retro-font-press text-[8px] text-green-400 mb-3">{t('levelMissions')}</h4>
          <ul className="space-y-3">
            {(lang === 'en' ? experiences[selectedJob].bulletsEn : experiences[selectedJob].bulletsId).map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-[#e52521] text-xs mt-1">⭐</span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
