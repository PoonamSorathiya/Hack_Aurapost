import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, ArrowUp, Plus, Sparkles, AlertCircle } from 'lucide-react';

interface PromptBarProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  loading: boolean;
}

export const PromptBar: React.FC<PromptBarProps> = ({
  content,
  setContent,
  onSubmit,
  loading,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Initialize SpeechRecognition safely
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setContent((prev: string) => (prev ? prev.trim() + ' ' + transcript : transcript));
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setVoiceError('Microphone permission was denied. Please allow microphone access in your browser.');
        } else if (event.error === 'no-speech') {
          // Normal timeout
        } else {
          setVoiceError(`Voice input error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.error('Failed to create SpeechRecognition:', err);
    }
  }, [setContent]);

  const toggleSpeech = async () => {
    setVoiceError(null);

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch {
      setVoiceError('Please grant microphone permission to dictate.');
      return;
    }

    if (!recognitionRef.current) {
      setVoiceError('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      try {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current?.start();
          setIsListening(true);
        }, 150);
      } catch {
        setVoiceError('Could not start voice recognition.');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (content.trim() && !loading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Centered Hero Greeting with high-contrast, crystal clear font */}
      <div className="text-center mb-8 sm:mb-12 animate-hero">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
          Let's jump in
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-200 font-medium max-w-lg mx-auto leading-relaxed">
          Share your college event or milestone, and we'll craft it for every social feed.
        </p>
      </div>

      {/* Floating Dark Mode Prompt Bar with high visibility */}
      <div className="w-full bg-[#1E1F20] rounded-3xl p-5 sm:p-6 border border-slate-700/80 focus-within:border-sky-400 transition-all duration-300 shadow-2xl shadow-black/40 animate-box">
        {/* Multiline Input with Bright White Text */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder="Enter what happened and what you felt... (e.g. I had an event in my college and that was a tech event. I felt very interesting and knowledgeable...)"
          className="w-full bg-transparent text-white placeholder:text-slate-400 font-normal focus:outline-none resize-none text-base sm:text-lg leading-relaxed"
        />

        {/* Voice Error Notice if any */}
        {voiceError && (
          <div className="mt-2 p-2.5 rounded-xl bg-red-950/60 border border-red-700 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span className="font-medium">{voiceError}</span>
          </div>
        )}

        {/* Bottom Action Bar inside Container */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80">
          {/* Left: Quick Attach / Starter Pill */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setContent(
                  'I had an event in my college and that was a tech event. I felt very interesting and knowledgeable after attending and while attending that function. I learned about cutting-edge AI tools and connected with peers who share the same drive!'
                )
              }
              title="Load College Tech Event starter"
              className="w-9 h-9 rounded-full bg-[#131314] hover:bg-[#2A2B2D] border border-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4 text-sky-400" />
            </button>

            <span className="hidden sm:inline text-xs font-semibold text-slate-300">
              College Event Quick Fill
            </span>
          </div>

          {/* Right: Model Tag + Voice Mic + Circular Blue Send Button */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-[#131314] px-3 py-1 rounded-full border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>AuraPost AI</span>
            </span>

            {/* Mic Button */}
            <button
              type="button"
              onClick={toggleSpeech}
              className={`p-2 rounded-full transition-all duration-200 ${
                isListening
                  ? 'bg-rose-600 text-white animate-mic shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-[#2A2B2D]'
              }`}
              title={isListening ? 'Stop listening' : 'Speak your experience'}
            >
              {isListening ? (
                <MicOff className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>

            {/* Circular Send Button (Blue circle with arrow up) */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={loading || !content.trim()}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                loading || !content.trim()
                  ? 'bg-[#2A2B2D] text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-900/40 hover:scale-105 active:scale-95'
              }`}
              title="Craft story"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
