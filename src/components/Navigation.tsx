import React from 'react';
import { Gamepad2, Map as MapIcon, ShoppingBag, Save } from 'lucide-react';

interface NavigationProps {
  currentMenu: 'dashboard' | 'map' | 'inventory' | 'contact';
  selectMenu: (menu: 'dashboard' | 'map' | 'inventory' | 'contact') => void;
  darkMode: boolean;
  t: (key: any) => string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentMenu,
  selectMenu,
  darkMode,
  t
}) => {
  return (
    <nav className={`w-full max-w-6xl mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 border-4 p-1.5 rounded-xl relative shadow-lg transition-colors duration-300 ${
      darkMode ? 'bg-[#141522] border-[#333]' : 'bg-white border-gray-400'
    }`}>
      <button 
        onClick={() => selectMenu('dashboard')}
        className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold cursor-pointer transition-all border-2 ${
          currentMenu === 'dashboard' 
            ? 'bg-[#e52521] border-white text-white shadow-lg' 
            : 'bg-[#0a0b12] border-transparent text-gray-400 hover:text-white'
        } retro-font-press`}
      >
        <Gamepad2 className="w-4 h-4" />
        <span>{t('playArcade')}</span>
      </button>

      <button 
        onClick={() => selectMenu('map')}
        className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold cursor-pointer transition-all border-2 ${
          currentMenu === 'map' 
            ? 'bg-green-600 border-white text-white shadow-lg' 
            : 'bg-[#0a0b12] border-transparent text-gray-400 hover:text-white'
        } retro-font-press`}
      >
        <MapIcon className="w-4 h-4" />
        <span>{t('worldMap')}</span>
      </button>

      <button 
        onClick={() => selectMenu('inventory')}
        className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold cursor-pointer transition-all border-2 ${
          currentMenu === 'inventory' 
            ? 'bg-yellow-500 border-white text-black shadow-lg' 
            : 'bg-[#0a0b12] border-transparent text-gray-400 hover:text-white'
        } retro-font-press`}
      >
        <ShoppingBag className="w-4 h-4" />
        <span>{t('inventory')}</span>
      </button>

      <button 
        onClick={() => selectMenu('contact')}
        className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold cursor-pointer transition-all border-2 ${
          currentMenu === 'contact' 
            ? 'bg-blue-600 border-white text-white shadow-lg' 
            : 'bg-[#0a0b12] border-transparent text-gray-400 hover:text-white'
        } retro-font-press`}
      >
        <Save className="w-4 h-4" />
        <span>{t('saveGame')}</span>
      </button>
    </nav>
  );
};
