import React from 'react';
import { Save, Sparkles, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

interface ContactViewProps {
  darkMode: boolean;
  t: (key: any) => string;
  clickCoinHUD: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  darkMode,
  t,
  clickCoinHUD
}) => {
  return (
    <div className={`border-4 rounded-xl p-4 sm:p-6 shadow-2xl text-left transition-colors duration-300 ${
      darkMode ? 'bg-[#141522] border-[#333]' : 'bg-white border-gray-400'
    }`}>
      <div className="flex items-center gap-2 mb-6">
        <Save className="text-blue-500 w-6 h-6 animate-retro-bounce" />
        <div>
          <h2 className="retro-font-press text-xs">{t('saveGameTitle')}</h2>
          <p className="text-xs text-gray-400 font-mono mt-1">{t('saveGameSubtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column Channels */}
        <div className="bg-[#0a0b12] border-4 border-black p-5 rounded-xl flex flex-col justify-between text-white">
          <div>
            <h3 className="retro-font-press text-xs text-yellow-400 mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>{t('selectChannels')}</span>
            </h3>
            
            <div className="space-y-3 font-mono text-xs">
              <a 
                href="mailto:bentoputrahermanto@gmail.com"
                onClick={clickCoinHUD}
                className="flex items-center justify-between p-3 bg-[#141522] border border-gray-800 rounded-lg hover:border-white transition-all cursor-pointer group"
              >
                <span className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#e52521]" />
                  <span>bentoputrahermanto@gmail.com</span>
                </span>
                <span className="text-[10px] text-gray-500 group-hover:text-yellow-400 font-bold">▶</span>
              </a>

              <a 
                href="tel:+62859106530700"
                onClick={clickCoinHUD}
                className="flex items-center justify-between p-3 bg-[#141522] border border-gray-800 rounded-lg hover:border-white transition-all cursor-pointer group"
              >
                <span className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>+62859106530700</span>
                </span>
                <span className="text-[10px] text-gray-500 group-hover:text-yellow-400 font-bold">▶</span>
              </a>

              <div className="flex items-center justify-between p-3 bg-[#141522] border border-gray-800 rounded-lg">
                <span className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Jakarta, ID</span>
                </span>
                <span className="text-[9px] bg-blue-950 border border-blue-800 rounded px-2 py-0.5 text-blue-400 font-bold">{t('gamer')}</span>
              </div>
            </div>
          </div>

          {/* Bina nusantara university details */}
          <div className="bg-[#141522] border border-gray-800 p-3 rounded mt-6">
            <div className="flex justify-between items-start gap-1">
              <h4 className="font-bold text-xs text-white">Bina Nusantara University</h4>
              <span className="text-[9px] font-mono text-gray-400">{t('classOf')} 2020</span>
            </div>
            <p className="text-[10px] text-yellow-400 font-mono mt-0.5">Bachelor – Computer Science</p>
            <p className="text-[9px] text-gray-400 mt-1">{t('gpa')} 3.58 | {t('minorGame')}</p>
          </div>
        </div>

        {/* Right Column messaging */}
        <div className="bg-[#0a0b12] border-4 border-black p-5 rounded-xl flex flex-col justify-between gap-4 text-white">
          <div>
            <h3 className="retro-font-press text-xs text-white mb-4 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-green-400" />
              <span>{t('directMessage')}</span>
            </h3>
            
            <p className="text-xs text-gray-300 mb-4 leading-relaxed">
              {t('whatsappDesc')}
            </p>

            <a
              href="https://wa.me/62859106530700"
              target="_blank"
              rel="noopener noreferrer"
              onClick={clickCoinHUD}
              className="w-full text-center block bg-[#00c000] border-2 border-white hover:bg-green-600 text-white font-bold text-xs py-3.5 rounded-lg shadow-lg active:scale-95 transition-transform cursor-pointer retro-font-press"
            >
              {t('chatWhatsapp')}
            </a>
          </div>

          <div className="bg-[#141522] border border-gray-800 p-3 rounded text-[10px] text-gray-500 font-mono">
            {t('binusCredential')}
          </div>
        </div>

      </div>
    </div>
  );
};
