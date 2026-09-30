import React from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ThumbsUp,
  Share2,
  Repeat2,
  MoreHorizontal,
  Sparkles,
} from 'lucide-react';
import { PlatformKey } from '../types';

interface MockupModalProps {
  platform: PlatformKey;
  text: string;
  onClose: () => void;
}

export const MockupModal: React.FC<MockupModalProps> = ({
  platform,
  text,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#1E1F20] rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#2D2F31] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-[#2D2F31] flex items-center justify-between bg-[#131314]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white font-display capitalize">
              {platform} Live Feed Preview
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8E918F] hover:text-white rounded-full hover:bg-[#2D2F31] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Phone Mockup Container */}
        <div className="overflow-y-auto p-4 sm:p-6 bg-[#0B0F19] flex justify-center">
          <div className="w-full max-w-sm bg-[#18191A] rounded-2xl shadow-xl border border-[#2D2F31] overflow-hidden text-xs sm:text-sm text-[#E3E3E3]">
            {/* Instagram Mockup */}
            {platform === 'instagram' && (
              <div>
                <div className="p-3 flex items-center justify-between border-b border-[#2D2F31]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-rose-400 p-[1.5px]">
                      <div className="w-full h-full rounded-full bg-[#18191A] flex items-center justify-center font-bold text-[10px] text-white">
                        P
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">poonam.tech</div>
                      <div className="text-[10px] text-[#8E918F]">Campus Tech Fest</div>
                    </div>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-[#8E918F]" />
                </div>

                <div className="w-full aspect-square bg-[#0F172A] flex flex-col items-center justify-center p-6 text-center border-b border-[#2D2F31] relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6 text-sky-400" />
                  </div>
                  <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                    Experience Reflection
                  </span>
                  <p className="font-display font-bold text-base text-white mt-1 max-w-xs">
                    Curiosity in Code & Connection
                  </p>
                  <span className="text-[10px] text-[#8E918F] mt-2">
                    AuraPost Visual Companion Card
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between mb-2 text-white">
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 cursor-pointer hover:text-rose-500 transition-colors" />
                      <MessageCircle className="w-5 h-5 cursor-pointer" />
                      <Send className="w-5 h-5 cursor-pointer" />
                    </div>
                    <Bookmark className="w-5 h-5 cursor-pointer" />
                  </div>
                  <div className="font-bold text-white text-xs mb-1">
                    184 likes
                  </div>
                  <div className="text-xs text-[#C4C7C5] whitespace-pre-wrap leading-relaxed line-clamp-6">
                    <span className="font-bold text-white mr-1">poonam.tech</span>
                    {text}
                  </div>
                  <div className="text-[10px] text-[#8E918F] mt-2 uppercase">
                    2 hours ago
                  </div>
                </div>
              </div>
            )}

            {/* LinkedIn Mockup */}
            {platform === 'linkedin' && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-sky-900/60 text-sky-300 font-bold flex items-center justify-center text-xs border border-sky-600/40">
                      PS
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Poonam Sorathiya</div>
                      <div className="text-[10px] text-[#8E918F]">Tech Enthusiast & Student</div>
                      <div className="text-[9px] text-[#8E918F]">1h · 🌐</div>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-sky-400 hover:underline">
                    + Follow
                  </button>
                </div>

                <div className="text-xs text-[#C4C7C5] whitespace-pre-wrap leading-relaxed">
                  {text}
                </div>

                <div className="mt-4 pt-2 border-t border-[#2D2F31] flex items-center justify-around text-[#8E918F] text-xs">
                  <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-[#282A2C] rounded text-sky-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Like</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-[#282A2C] rounded">
                    <MessageCircle className="w-4 h-4" />
                    <span>Comment</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-[#282A2C] rounded">
                    <Repeat2 className="w-4 h-4" />
                    <span>Repost</span>
                  </div>
                </div>
              </div>
            )}

            {/* Twitter / X Mockup */}
            {platform === 'twitter' && (
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    P
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="font-bold text-white">Poonam</span>
                      <span className="text-[#8E918F]">@poonam_tech · 2h</span>
                    </div>

                    <div className="text-xs text-[#E3E3E3] mt-2 whitespace-pre-wrap leading-relaxed">
                      {text}
                    </div>

                    <div className="flex items-center justify-between text-[#8E918F] text-xs mt-4 pt-2 border-t border-[#2D2F31]">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>24</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Repeat2 className="w-3.5 h-3.5" />
                        <span>56</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />
                        <span>312</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Facebook Mockup */}
            {platform === 'facebook' && (
              <div className="p-4">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/60 text-blue-300 font-bold flex items-center justify-center text-xs border border-blue-600/40">
                    PS
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Poonam Sorathiya</div>
                    <div className="text-[10px] text-[#8E918F]">3 hrs · 👥 Friends</div>
                  </div>
                </div>

                <div className="text-xs text-[#C4C7C5] whitespace-pre-wrap leading-relaxed">
                  {text}
                </div>

                <div className="mt-4 pt-2 border-t border-[#2D2F31] flex items-center justify-around text-[#8E918F] text-xs">
                  <div className="flex items-center gap-1.5 py-1 px-3 hover:bg-[#282A2C] rounded text-blue-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Like</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-3 hover:bg-[#282A2C] rounded">
                    <MessageCircle className="w-4 h-4" />
                    <span>Comment</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-3 hover:bg-[#282A2C] rounded">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#131314] border-t border-[#2D2F31] text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#282A2C] hover:bg-[#3C4043] text-white text-xs font-semibold transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
