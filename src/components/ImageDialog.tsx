import React from 'react';
import { X, Image as ImageIcon, Sparkles, ArrowRight } from 'lucide-react';

interface ImageDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onDecline: () => void;
  onClose: () => void;
}

export const ImageDialog: React.FC<ImageDialogProps> = ({
  isOpen,
  onConfirm,
  onDecline,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#1E1F20] rounded-3xl max-w-md w-full shadow-2xl border border-[#2D2F31] p-6 sm:p-7 relative transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#8E918F] hover:text-white hover:bg-[#2D2F31] rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon & Question */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#131314] border border-[#2D2F31] text-sky-400 flex items-center justify-center mb-4 shadow-sm shadow-sky-950/40">
            <ImageIcon className="w-7 h-7" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Do you want to make an image also?
          </h3>

          <p className="text-[#8E918F] text-sm mt-2 leading-relaxed">
            We can generate an aesthetic companion graphic with cartoon characters, people, and expressive typography to match your story.
          </p>

          {/* Action Buttons */}
          <div className="w-full mt-6 space-y-2.5">
            <button
              type="button"
              onClick={onConfirm}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-sky-950/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Yes, Generate Image</span>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </button>

            <button
              type="button"
              onClick={onDecline}
              className="w-full py-2.5 px-4 rounded-xl bg-[#131314] hover:bg-[#282A2C] text-[#C4C7C5] hover:text-white border border-[#2D2F31] text-sm font-medium transition-all duration-200"
            >
              No, Continue with Text Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
