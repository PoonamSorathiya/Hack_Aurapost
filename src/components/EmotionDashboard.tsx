import React, { useState } from 'react';
import { Copy, Check, Volume2, Sparkles } from 'lucide-react';
import { EmotionalProfile } from '../types';

interface EmotionDashboardProps {
  profile: EmotionalProfile;
  initialCraft: string;
  soundEnabled: boolean;
  onOpenImageDialog: () => void;
}

export const EmotionDashboard: React.FC<EmotionDashboardProps> = ({
  profile,
  initialCraft,
  soundEnabled,
  onOpenImageDialog,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(initialCraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech audio is not supported in this browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(initialCraft);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 animate-enter">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
          Crafted Experience Story
        </h2>
        <p className="mt-2 text-slate-300 text-sm font-medium">
          Emotion recognized: <span className="text-sky-400 font-bold">{profile.primaryEmotion}</span> · <span className="text-slate-200">{profile.toneVibe}</span>
        </p>
      </div>

      {/* Main Story Container with Big, Crisp White Lines */}
      <div className="bg-[#1E1F20] rounded-3xl p-6 sm:p-9 shadow-2xl border border-slate-700/80 transition-all duration-300">
        {/* Emotion Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-700/80">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-sky-200 bg-sky-950/80 px-3.5 py-1.5 rounded-full border border-sky-600/70 shadow-xs">
              {profile.primaryEmotion}
            </span>
            {profile.secondaryEmotions.map((emo, idx) => (
              <span
                key={idx}
                className="text-slate-200 bg-[#131314] px-3 py-1.5 rounded-full border border-slate-700 font-medium"
              >
                {emo}
              </span>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeak}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isSpeaking
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-[#131314] hover:bg-[#2A2B2D] text-slate-200 hover:text-white border border-slate-700'
              }`}
              title="Listen to story audio"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#131314] hover:bg-[#2A2B2D] text-slate-200 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>Copy Story</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* The Output Given in Big, Beautiful, Highly Visible White Lines */}
        <div className="py-8">
          <div className="text-lg sm:text-xl md:text-2xl font-normal text-white leading-relaxed sm:leading-loose tracking-wide whitespace-pre-line font-sans select-text">
            {initialCraft}
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="pt-6 border-t border-slate-700/80">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
            Key Insights
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {profile.keyHighlights.map((hl, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#131314] border border-slate-700/70 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium hover-lift"
              >
                <div className="text-xs font-bold text-sky-400 mb-1">
                  0{idx + 1}
                </div>
                <div>{hl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialog Trigger Banner */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#131314] border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-white">
              Make this post more attractive with an image?
            </div>
            <div className="text-xs text-slate-300 mt-1 font-medium">
              Generate an aesthetic companion graphic with cartoon characters and people.
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenImageDialog}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-sky-950/40 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Generate Image Also?</span>
          </button>
        </div>
      </div>
    </div>
  );
};
