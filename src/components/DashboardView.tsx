import React from 'react';
import { Gamepad2, Info, Award, MapPin } from 'lucide-react';
import { MarioGame } from './MarioGame';
import type { Language } from '../utils/i18n';

interface Skill {
  name: string;
  level: string;
  type: string;
  icon: string;
  descEn: string;
  descId: string;
}

interface DashboardViewProps {
  darkMode: boolean;
  lang: Language;
  t: (key: any) => string;
  coinCount: number;
  setCoinCount: React.Dispatch<React.SetStateAction<number>>;
  handleSkillUnlocked: (skill: string) => void;
  unlockedSkills: string[];
  skillsList: Skill[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  darkMode,
  lang,
  t,
  coinCount,
  setCoinCount,
  handleSkillUnlocked,
  unlockedSkills,
  skillsList
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
      
      {/* Playable Mini Game Area */}
      <section className="col-span-1 lg:col-span-8 flex flex-col gap-6">
        <div className={`p-4 rounded-xl border-4 shadow-2xl relative transition-colors duration-300 ${
          darkMode ? 'bg-[#141522] border-[#333]' : 'bg-white border-gray-400 text-black'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Gamepad2 className="text-[#e52521] w-6 h-6 animate-retro-bounce" />
              <h2 className="retro-font-press text-[10px] sm:text-xs">{t('playArcadeTitle')}</h2>
            </div>
            <span className="text-[8px] retro-font-press text-yellow-500 animate-blink">{t('pressStart')}</span>
          </div>
          
          <MarioGame 
            onSkillUnlocked={handleSkillUnlocked}
            coinCount={coinCount}
            setCoinCount={setCoinCount}
            lang={lang}
          />

          <div className="mt-3 flex items-center justify-between text-xs text-gray-400 bg-[#0a0b12] p-3 rounded-lg border border-gray-800 text-white">
            <span className="flex items-center gap-2 text-xs">
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{t('jumpHint')}</span>
            </span>
          </div>
        </div>

        {/* Quick Profile Summary Card */}
        <div className={`p-5 rounded-xl border-4 relative transition-colors duration-300 ${
          darkMode ? 'bg-[#141522] border-[#333]' : 'bg-white border-gray-400'
        }`}>
          <div className="absolute right-3 top-3 w-8 h-8 bg-green-600 rounded border-2 border-black flex items-center justify-center">
            <span className="text-white text-xs retro-font-press">?</span>
          </div>
          <h3 className="retro-font-press text-xs text-yellow-500 mb-3">{t('charSummary')}</h3>
          <div className={`space-y-4 text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>{t('summaryText1')}</p>
            <p>{t('summaryText2')}</p>
          </div>
        </div>
      </section>

      {/* Right sidebar quick stats */}
      <section className="col-span-1 lg:col-span-4 flex flex-col gap-6">
        
        {/* Profile Card */}
        <div className={`p-5 rounded-xl border-4 text-center transition-colors duration-300 ${
          darkMode ? 'bg-[#141522] border-[#333]' : 'bg-white border-gray-400'
        }`}>
          <div className="w-20 h-20 bg-yellow-400 border-4 border-black rounded-full mx-auto flex items-center justify-center shadow-lg relative overflow-hidden">
            <span className="text-4xl">🧑‍💻</span>
          </div>
          <h3 className="text-lg font-bold mt-3">Bento Putra Hermanto</h3>
          <p className="text-xs text-gray-400 font-mono flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#e52521]" /> Jakarta, Indonesia
          </p>

          <div className="mt-4 bg-[#0a0b12] border-2 border-gray-800 p-3 rounded-lg text-left space-y-3 text-xs font-mono text-white">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t('education')}:</span>
              <span className="text-white text-right">BINUS Univ</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t('experience')}:</span>
              <span className="text-white">{t('yearsExpText')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t('language')}:</span>
              <span className="text-white">{t('indonesian')} ({t('native')}), {t('english')}</span>
            </div>
          </div>
        </div>

        {/* Game Unlocked Progress */}
        <div className={`p-5 rounded-xl border-4 transition-colors duration-300 ${
          darkMode ? 'bg-[#141522] border-[#333]' : 'bg-white border-gray-400'
        }`}>
          <h3 className="retro-font-press text-xs mb-3 flex items-center gap-2">
            <Award className="text-yellow-500 w-5 h-5" />
            <span>{t('unlockedBadges')}</span>
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span>{t('skillsUnlocked')}:</span>
                <span className="text-yellow-500 font-bold">{unlockedSkills.length} / {skillsList.length}</span>
              </div>
              <div className="w-full bg-[#0a0b12] h-4 rounded-full p-1 border border-gray-700">
                <div 
                  className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(unlockedSkills.length / skillsList.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 pt-2">
              {skillsList.map((skill, idx) => {
                const active = unlockedSkills.includes(skill.name);
                return (
                  <div 
                    key={idx}
                    title={skill.name}
                    className={`w-10 h-10 border-2 rounded flex items-center justify-center text-lg ${
                      active ? 'border-yellow-400 bg-yellow-950/30' : 'border-gray-800 bg-[#0a0b12]'
                    }`}
                  >
                    {active ? skill.icon : '❓'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
