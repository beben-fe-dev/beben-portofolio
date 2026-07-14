import React from 'react';
import { ShoppingBag } from 'lucide-react';
import type { Language } from '../utils/i18n';

interface Skill {
  name: string;
  level: string;
  type: string;
  icon: string;
  descEn: string;
  descId: string;
}

interface InventoryViewProps {
  darkMode: boolean;
  lang: Language;
  t: (key: any) => string;
  skillsList: Skill[];
  selectedSkill: Skill | null;
  handleSelectSkill: (skill: Skill) => void;
  unlockedSkills: string[];
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  darkMode,
  lang,
  t,
  skillsList,
  selectedSkill,
  handleSelectSkill,
  unlockedSkills
}) => {
  return (
    <div className={`border-4 rounded-xl p-4 sm:p-6 shadow-2xl text-left transition-colors duration-300 ${
      darkMode ? 'bg-[#141522] border-[#333]' : 'bg-white border-gray-400'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-yellow-500 w-6 h-6" />
          <div>
            <h2 className="retro-font-press text-xs">{t('inventory')}</h2>
            <p className="text-xs text-gray-400 font-mono mt-1">{t('clickBlocksHint')}</p>
          </div>
        </div>
        <span className="retro-font-press text-[8px] text-green-400 animate-pulse">{t('activePowerup')}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left grid containing items */}
        <div className="lg:col-span-7 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 bg-[#0a0b12] border-4 border-black p-4 rounded-xl items-start">
          {skillsList.map((skill, idx) => {
            const isSelected = selectedSkill?.name === skill.name;
            const isUnlocked = unlockedSkills.includes(skill.name);
            return (
              <button
                key={idx}
                onClick={() => handleSelectSkill(skill)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 relative group focus:outline-none ${
                  isSelected 
                    ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 scale-105 shadow-inner animate-[pulse_1s_infinite]' 
                    : 'bg-[#141522] border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white'
                }`}
              >
                <span className="text-3xl transform group-active:scale-90 transition-transform">{skill.icon}</span>
                <span className="text-[9px] font-mono text-center font-bold truncate w-full">{skill.name}</span>
                
                {isUnlocked && (
                  <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-green-600 text-white rounded-full px-1 border border-black scale-90">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right column toad bubble detail */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          {selectedSkill ? (
            <div className="bg-[#0a0b12] border-4 border-[#fbd000] p-5 rounded-xl relative overflow-hidden transition-all duration-300 shadow-xl flex-1 flex flex-col justify-between text-white">
              <div>
                <div className="absolute right-3 top-3 text-[9px] retro-font-press text-yellow-400 bg-yellow-950 border border-yellow-800 px-2 py-1 rounded">
                  {selectedSkill.level}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl p-2 bg-[#141522] rounded-lg border-2 border-gray-800 shadow-md animate-bounce">
                    {selectedSkill.icon}
                  </span>
                  <div>
                    <p className="retro-font-press text-[8px] text-gray-500">{t('activeItem')}</p>
                    <h3 className="text-xl font-bold text-white font-mono">{selectedSkill.name}</h3>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4 text-sm text-gray-300 leading-relaxed">
                  <div className="bg-[#141522] p-4 rounded-lg border-2 border-white relative shadow-inner mb-4">
                    <p className="font-mono text-xs text-white leading-relaxed">
                      "{lang === 'en' ? selectedSkill.descEn : selectedSkill.descId}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#141522] p-3 rounded-lg border border-gray-800 space-y-2 mt-4">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-gray-400">ITEM POWER LEVEL:</span>
                  <span className="text-yellow-400 font-bold">100 / 100</span>
                </div>
                <div className="w-full bg-[#0a0b12] h-2.5 rounded-full overflow-hidden border border-gray-800">
                  <div className="bg-[#fbd000] h-full w-[95%]"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0a0b12] border-4 border-dashed border-gray-800 p-8 rounded-xl text-center text-gray-500 flex-1 flex flex-col items-center justify-center">
              <span className="text-5xl block mb-3 opacity-50">🎒</span>
              <p className="text-xs font-mono max-w-xs mx-auto leading-relaxed text-white">
                {t('skillsSelectHint')}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
