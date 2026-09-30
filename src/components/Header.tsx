import React from 'react';
import { Sparkles, RotateCcw, Volume2, VolumeX, Menu } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onLoadExample: () => void;
  onReset: () => void;
  hasContent: boolean;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onLoadExample,
  onReset,
  hasContent,
  soundEnabled,
  setSoundEnabled,
  onToggleSidebar,
}) => {
  return (
    <header className="sticky top-0 z-20 bg-[#131314]/90 backdrop-blur-md border-b border-[#2D2F31] transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Mobile Sidebar Toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-200 hover:text-white hover:bg-[#2D2F31] rounded-xl transition-colors md:hidden"
            title="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <Logo size={26} />
            <span className="text-lg font-bold tracking-tight text-white font-display">
              AuraPost
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onLoadExample}
            title="Load college tech event example"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1E1F20] hover:bg-[#2A2B2D] border border-slate-700/80 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Try College Event</span>
            <span className="sm:hidden">Example</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Disable speech narration' : 'Enable speech narration'}
            className="p-2 text-slate-200 hover:text-white hover:bg-[#2D2F31] rounded-full transition-colors"
            aria-label="Toggle narration"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-sky-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {hasContent && (
            <button
              onClick={onReset}
              title="Clear and start new story"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#1E1F20] hover:bg-[#2A2B2D] border border-slate-700/80 rounded-full transition-all duration-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
