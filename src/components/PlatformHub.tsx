import React, { useState } from 'react';
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Copy,
  Check,
  Eye,
} from 'lucide-react';
import { PlatformPosts, PlatformKey } from '../types';

interface PlatformHubProps {
  platforms: PlatformPosts;
  onUpdatePlatformText: (platform: PlatformKey, newText: string) => void;
  onOpenMockup: (platform: PlatformKey) => void;
}

const PLATFORMS: {
  key: PlatformKey;
  name: string;
  icon: any;
  charLimit?: number;
  tip: string;
}[] = [
  {
    key: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    charLimit: 2200,
    tip: 'Crafted with engaging spacing, an emotional hook, and 15 targeted hashtags.',
  },
  {
    key: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    charLimit: 3000,
    tip: 'Structured with an opening takeaway, professional lessons learned, and a peer question.',
  },
  {
    key: 'twitter',
    name: 'Twitter / X',
    icon: Twitter,
    charLimit: 280,
    tip: 'Punchy single post under 280 characters, plus a 3-part thread option.',
  },
  {
    key: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    charLimit: 5000,
    tip: 'Conversational and warm, great for sharing stories with friends and family.',
  },
];

export const PlatformHub: React.FC<PlatformHubProps> = ({
  platforms,
  onUpdatePlatformText,
  onOpenMockup,
}) => {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>('instagram');
  const [showThread, setShowThread] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const currentConfig = PLATFORMS.find((p) => p.key === activePlatform)!;

  const getCurrentText = (): string => {
    if (activePlatform === 'instagram') return platforms.instagram.caption;
    if (activePlatform === 'linkedin') return platforms.linkedin.caption;
    if (activePlatform === 'twitter') {
      return showThread
        ? platforms.twitter.thread.join('\n\n---\n\n')
        : platforms.twitter.tweet;
    }
    if (activePlatform === 'facebook') return platforms.facebook.caption;
    return '';
  };

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(identifier);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentText = getCurrentText();
  const charCount = currentText.length;
  const isOverTwitterLimit =
    activePlatform === 'twitter' && !showThread && charCount > 280;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 animate-enter">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
          Ready for Social Platforms
        </h2>
        <p className="mt-2 text-slate-300 text-sm font-medium">
          Select a platform to view, edit, or copy the customized post.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-[#1E1F20] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/80">
        {/* Platform Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-700/80 scrollbar-none">
          {PLATFORMS.map((plat) => {
            const Icon = plat.icon;
            const isActive = activePlatform === plat.key;
            return (
              <button
                key={plat.key}
                type="button"
                onClick={() => setActivePlatform(plat.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-950/50 scale-105'
                    : 'bg-[#131314] hover:bg-[#2A2B2D] text-slate-200 hover:text-white border border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{plat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Twitter Thread Toggle if on Twitter */}
        {activePlatform === 'twitter' && (
          <div className="mt-4 flex items-center justify-between p-3.5 rounded-2xl bg-[#131314] border border-slate-700">
            <span className="text-xs font-bold text-slate-200">
              Output Format:
            </span>
            <div className="flex items-center gap-1 bg-[#1E1F20] p-1 rounded-xl border border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setShowThread(false)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  !showThread
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Single Tweet
              </button>
              <button
                type="button"
                onClick={() => setShowThread(true)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  showThread
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                3-Part Thread
              </button>
            </div>
          </div>
        )}

        {/* Content Box with High Visibility White Text */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-slate-300 font-medium">
              Click anywhere to edit caption
            </span>

            <span
              className={`font-mono text-xs font-semibold ${
                isOverTwitterLimit ? 'text-rose-400 font-bold' : 'text-slate-300'
              }`}
            >
              {charCount}{' '}
              {currentConfig.charLimit ? `/ ${currentConfig.charLimit}` : 'characters'}
            </span>
          </div>

          <textarea
            value={currentText}
            onChange={(e) => {
              if (activePlatform !== 'twitter' || !showThread) {
                onUpdatePlatformText(activePlatform, e.target.value);
              }
            }}
            rows={8}
            readOnly={activePlatform === 'twitter' && showThread}
            className="w-full bg-[#131314] text-white p-4 sm:p-5 rounded-2xl border border-slate-700 focus:border-sky-400 focus:outline-none transition-all duration-200 resize-y text-base sm:text-lg leading-relaxed font-sans select-text"
          />
        </div>

        {/* Platform Tip */}
        <div className="mt-3 p-3.5 rounded-2xl bg-[#131314] border border-slate-700/80 text-xs text-slate-300 font-medium leading-relaxed">
          <span className="font-bold text-sky-400">Tip: </span>
          <span>{currentConfig.tip}</span>
        </div>

        {/* Action Toolbar */}
        <div className="mt-5 pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onOpenMockup(activePlatform)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#131314] hover:bg-[#2A2B2D] text-slate-200 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>Preview in Feed</span>
          </button>

          <button
            type="button"
            onClick={() => handleCopy(currentText, activePlatform)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-sky-950/40 hover:scale-105 active:scale-95"
          >
            {copiedKey === activePlatform ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white" />
                <span>Copy {currentConfig.name} Post</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
