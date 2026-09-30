import React from 'react';
import {
  Plus,
  Settings,
  PanelLeftClose,
  PanelLeft,
  GraduationCap,
  Laptop,
  Trophy,
  Clock,
} from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewStory: () => void;
  onSelectStoryTemplate: (text: string) => void;
  recentStories: { id: string; title: string; text: string; date: string }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  onNewStory,
  onSelectStoryTemplate,
  recentStories,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-[#1E1F20] text-slate-100 border-r border-[#2D2F31] flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1 overflow-hidden p-3">
          {/* Header Row: New Brand Logo & Toggle */}
          <div className="flex items-center justify-between mb-4 px-1 py-1">
            <div className={`flex items-center gap-2.5 overflow-hidden ${!isOpen && 'md:hidden'}`}>
              <Logo size={26} />
              <span className="font-extrabold text-base font-display text-white tracking-tight whitespace-nowrap">
                AuraPost
              </span>
            </div>

            <button
              onClick={onToggle}
              title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#2D2F31] transition-colors"
            >
              {isOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* "+ New Story" Button with high visibility */}
          <button
            onClick={onNewStory}
            className={`w-full flex items-center gap-3 p-3 rounded-full bg-[#131314] hover:bg-[#2A2B2D] border border-slate-700/80 text-sm font-semibold text-white transition-all duration-200 mb-6 shadow-sm ${
              !isOpen && 'md:justify-center md:px-0'
            }`}
          >
            <Plus className="w-4 h-4 text-sky-400 shrink-0" />
            {isOpen && <span className="whitespace-nowrap">New story</span>}
          </button>

          {/* Quick Experience Inspiration / History with clear visible font */}
          {isOpen && (
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              <div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider px-2 block mb-2">
                  Experience Ideas
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() =>
                      onSelectStoryTemplate(
                        'I had an event in my college and that was a tech event. I felt very interesting and knowledgeable after attending and while attending that function. I learned about cutting-edge AI and connected with peers who share the same drive!'
                      )
                    }
                    className="w-full text-left flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-[#2A2B2D] text-slate-200 hover:text-white font-medium transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">College Tech Event</span>
                  </button>

                  <button
                    onClick={() =>
                      onSelectStoryTemplate(
                        'We spent 36 hours non-stop at the regional hackathon. Our code broke at 4 AM, but we rallied together, fixed the API bug, and ended up winning the Community Choice award. Pure adrenaline and teamwork!'
                      )
                    }
                    className="w-full text-left flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-[#2A2B2D] text-slate-200 hover:text-white font-medium transition-colors"
                  >
                    <Trophy className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">Hackathon Win</span>
                  </button>

                  <button
                    onClick={() =>
                      onSelectStoryTemplate(
                        'After 3 sleepless weeks of debugging, my small web app finally went live today. I was terrified of showing anyone, but hearing the first positive user review made me tear up with pride and joy.'
                      )
                    }
                    className="w-full text-left flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-[#2A2B2D] text-slate-200 hover:text-white font-medium transition-colors"
                  >
                    <Laptop className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="truncate">First Project Launch</span>
                  </button>
                </div>
              </div>

              {recentStories.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider px-2 block mb-2">
                    Recent Stories
                  </span>
                  <div className="space-y-1">
                    {recentStories.map((story) => (
                      <button
                        key={story.id}
                        onClick={() => onSelectStoryTemplate(story.text)}
                        className="w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-[#2A2B2D] text-slate-200 hover:text-white font-medium transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{story.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Profile with crisp visible font */}
        <div className="p-3 border-t border-[#2D2F31]">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#2A2B2D] transition-colors cursor-pointer group">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-xs shrink-0 ring-2 ring-sky-400/40">
                A
              </div>
              {isOpen && (
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">
                    Story Creator
                  </div>
                  <div className="text-[10px] text-sky-300 font-medium">
                    AuraPost Account
                  </div>
                </div>
              )}
            </div>

            {isOpen && (
              <Settings className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors shrink-0" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
