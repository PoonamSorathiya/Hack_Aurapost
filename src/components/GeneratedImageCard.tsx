import React, { useRef, useState, useEffect } from 'react';
import { Download, Copy, Check, Sparkles, Upload, X, Laptop, Trophy, Star } from 'lucide-react';
import { VisualIdea } from '../types';

interface GeneratedImageCardProps {
  visualIdea: VisualIdea;
  primaryEmotion: string;
  onClose: () => void;
}

type SceneType = 'collaboration' | 'stage' | 'breakthrough' | 'celebration';
type ThemeType = 'dark_cyber' | 'aesthetic_silver' | 'warm_noir';

interface SceneOption {
  id: SceneType;
  label: string;
  icon: any;
  desc: string;
}

const SCENE_OPTIONS: SceneOption[] = [
  { id: 'collaboration', label: 'Tech Collaboration', icon: Laptop, desc: 'Students collaborating with laptops & code' },
  { id: 'stage', label: 'Keynote & Insight', icon: Star, desc: 'Speaker presenting to an inspired audience' },
  { id: 'breakthrough', label: 'Creator Focused', icon: Sparkles, desc: 'Late night breakthrough with glowing screen' },
  { id: 'celebration', label: 'Team Celebration', icon: Trophy, desc: 'Friends cheering with project certificates' },
];

export const GeneratedImageCard: React.FC<GeneratedImageCardProps> = ({
  visualIdea,
  primaryEmotion,
  onClose,
}) => {
  const [headline, setHeadline] = useState(visualIdea.cardHeadline || 'From Curiosity to Code');
  const [subheadline, setSubheadline] = useState(
    visualIdea.cardSubheadline || 'What a college tech event taught me about building the future'
  );
  const [activeScene, setActiveScene] = useState<SceneType>('collaboration');
  const [activeTheme, setActiveTheme] = useState<ThemeType>('dark_cyber');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw rich illustrated scene with characters, people, and varied typography onto Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    // Background & Palette Setup
    let bgMain = '#0B0F19';
    let bgSecondary = '#1E293B';
    let textPrimary = '#FFFFFF';
    let textSecondary = '#94A3B8';
    let accentColor = '#38BDF8';
    let badgeBg = '#1E293B';

    if (activeTheme === 'aesthetic_silver') {
      bgMain = '#181A20';
      bgSecondary = '#2A2E39';
      textPrimary = '#FFFFFF';
      textSecondary = '#94A3B8';
      accentColor = '#60A5FA';
      badgeBg = '#2A2E39';
    } else if (activeTheme === 'warm_noir') {
      bgMain = '#18181B';
      bgSecondary = '#27272A';
      textPrimary = '#FAFAFA';
      textSecondary = '#A1A1AA';
      accentColor = '#F59E0B';
      badgeBg = '#27272A';
    }

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, bgMain);
    grad.addColorStop(1, bgSecondary);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative ambient glow orbs
    ctx.save();
    ctx.filter = 'blur(90px)';
    ctx.beginPath();
    ctx.arc(width * 0.2, height * 0.25, 240, 0, Math.PI * 2);
    ctx.fillStyle = accentColor + '33';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.75, 280, 0, Math.PI * 2);
    ctx.fillStyle = '#818CF833';
    ctx.fill();
    ctx.restore();

    // Subtle background grid
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let x = 60; x < width; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 60; y < height; y += 100) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    // Top Badges & Emotional Tag
    const margin = 70;
    let curY = margin + 30;

    const emotionBadge = `✦ ${primaryEmotion.toUpperCase()}`;
    ctx.font = 'bold 20px "Outfit", sans-serif';
    const badgeW = ctx.measureText(emotionBadge).width;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(margin, curY, badgeW + 36, 42, 12);
    ctx.fillStyle = badgeBg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = accentColor;
    ctx.fillText(emotionBadge, margin + 18, curY + 28);
    ctx.restore();

    const eventTag = 'COLLEGE TECH 2026';
    ctx.font = '600 16px monospace';
    ctx.fillStyle = textSecondary;
    ctx.fillText(eventTag, width - margin - ctx.measureText(eventTag).width, curY + 28);

    curY += 80;

    // Draw Character Cartoon Illustration
    const sceneCenterX = width * 0.5;
    const sceneCenterY = 460;

    ctx.save();

    if (activeScene === 'collaboration') {
      // Desk
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.roundRect(sceneCenterX - 280, sceneCenterY + 120, 560, 16, 8);
      ctx.fill();

      // Student 1 (Left)
      ctx.fillStyle = '#6366F1';
      ctx.beginPath();
      ctx.ellipse(sceneCenterX - 140, sceneCenterY + 90, 48, 60, -0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FED7AA';
      ctx.beginPath();
      ctx.arc(sceneCenterX - 140, sceneCenterY + 10, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1E293B';
      ctx.beginPath();
      ctx.arc(sceneCenterX - 140, sceneCenterY + 4, 34, Math.PI, Math.PI * 2.2);
      ctx.fill();

      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(sceneCenterX - 130, sceneCenterY + 12, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Student 2 (Right)
      ctx.fillStyle = '#EC4899';
      ctx.beginPath();
      ctx.ellipse(sceneCenterX + 140, sceneCenterY + 90, 48, 60, 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FDE68A';
      ctx.beginPath();
      ctx.arc(sceneCenterX + 140, sceneCenterY + 10, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#451A03';
      ctx.beginPath();
      ctx.arc(sceneCenterX + 140, sceneCenterY - 4, 38, Math.PI * 0.8, Math.PI * 2.2);
      ctx.fill();

      ctx.strokeStyle = '#FDE68A';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(sceneCenterX + 100, sceneCenterY + 70);
      ctx.lineTo(sceneCenterX + 20, sceneCenterY + 80);
      ctx.stroke();

      // Glowing Laptop
      ctx.fillStyle = '#94A3B8';
      ctx.beginPath();
      ctx.roundRect(sceneCenterX - 70, sceneCenterY + 70, 140, 50, 6);
      ctx.fill();

      ctx.fillStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.roundRect(sceneCenterX - 55, sceneCenterY + 25, 110, 50, 4);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Floating code
      ctx.font = 'bold 22px monospace';
      ctx.fillStyle = '#34D399';
      ctx.fillText('<AI />', sceneCenterX - 100, sceneCenterY - 40);
      ctx.fillStyle = '#F472B6';
      ctx.fillText('{ code }', sceneCenterX + 40, sceneCenterY - 60);

      // Coffee mug
      ctx.fillStyle = '#F97316';
      ctx.beginPath();
      ctx.roundRect(sceneCenterX + 180, sceneCenterY + 96, 26, 26, 4);
      ctx.fill();
    } else if (activeScene === 'stage') {
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.roundRect(sceneCenterX - 70, sceneCenterY + 60, 140, 100, 12);
      ctx.fill();

      ctx.fillStyle = '#0284C7';
      ctx.beginPath();
      ctx.ellipse(sceneCenterX, sceneCenterY + 30, 44, 55, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FED7AA';
      ctx.beginPath();
      ctx.arc(sceneCenterX, sceneCenterY - 30, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '40px sans-serif';
      ctx.fillText('💡', sceneCenterX - 15, sceneCenterY - 80);

      ctx.fillStyle = '#0F172A99';
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(sceneCenterX + i * 110, sceneCenterY + 160, 40, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (activeScene === 'breakthrough') {
      ctx.fillStyle = '#4F46E5';
      ctx.beginPath();
      ctx.ellipse(sceneCenterX, sceneCenterY + 60, 55, 70, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FBCFE8';
      ctx.beginPath();
      ctx.arc(sceneCenterX, sceneCenterY - 20, 34, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(sceneCenterX, sceneCenterY - 24, 42, Math.PI, 0);
      ctx.stroke();

      ctx.fillStyle = accentColor + '22';
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 3;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.roundRect(sceneCenterX - 180, sceneCenterY - 100, 360, 180, 16);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = '#38BDF8';
      ctx.fillText('> tech_event.build()', sceneCenterX - 150, sceneCenterY - 50);
      ctx.fillStyle = '#4ADE80';
      ctx.fillText('✓ knowledge: 100%', sceneCenterX - 150, sceneCenterY - 15);
      ctx.fillStyle = '#F472B6';
      ctx.fillText('✓ curiosity: infinite', sceneCenterX - 150, sceneCenterY + 20);
    } else {
      const members = [
        { x: sceneCenterX - 120, color: '#3B82F6', skin: '#FED7AA' },
        { x: sceneCenterX, color: '#10B981', skin: '#FDE68A' },
        { x: sceneCenterX + 120, color: '#EC4899', skin: '#FECDD3' },
      ];

      members.forEach((m) => {
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.ellipse(m.x, sceneCenterY + 60, 40, 55, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = m.skin;
        ctx.beginPath();
        ctx.arc(m.x, sceneCenterY - 10, 28, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.font = '56px sans-serif';
      ctx.fillText('🏆', sceneCenterX - 28, sceneCenterY - 70);

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('✨ SUCCESS ✨', sceneCenterX - 80, sceneCenterY + 140);
    }

    ctx.restore();

    // Overlaid Optional User Photo Frame
    if (userImage) {
      const img = new Image();
      img.onload = () => {
        const pSize = 220;
        const pX = width - margin - pSize;
        const pY = 220;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(pX, pY, pSize, pSize, 20);
        ctx.clip();
        ctx.drawImage(img, pX, pY, pSize, pSize);
        ctx.restore();

        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(pX, pY, pSize, pSize, 20);
        ctx.stroke();
      };
      img.src = userImage;
    }

    // Varied Expressive Typography in Bottom Half
    const textStartY = 720;
    ctx.fillStyle = textPrimary;
    ctx.font = 'bold 52px "Outfit", sans-serif';
    const maxTextW = width - margin * 2;

    const words = headline.toUpperCase().split(' ');
    let line = '';
    let lineY = textStartY;
    const lineHeight = 64;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTextW && n > 0) {
        ctx.fillText(line.trim(), margin, lineY);
        line = words[n] + ' ';
        lineY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), margin, lineY);
    lineY += lineHeight + 8;

    // Editorial Subtext
    ctx.fillStyle = textSecondary;
    ctx.font = '400 26px "Plus Jakarta Sans", sans-serif';
    const subWords = subheadline.split(' ');
    let subLine = '';
    const subLineHeight = 38;

    for (let n = 0; n < subWords.length; n++) {
      const testLine = subLine + subWords[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTextW && n > 0) {
        ctx.fillText(subLine.trim(), margin, lineY);
        subLine = subWords[n] + ' ';
        lineY += subLineHeight;
      } else {
        subLine = testLine;
      }
    }
    ctx.fillText(subLine.trim(), margin, lineY);

    // Signature
    const bottomY = height - margin + 10;
    ctx.fillStyle = accentColor;
    ctx.font = 'bold 22px "Outfit", sans-serif';
    ctx.fillText('AuraPost · Social Story', margin, bottomY);

    ctx.fillStyle = textSecondary;
    ctx.font = '600 16px monospace';
    ctx.fillText('#CAMPUS_TECH_STORY', width - margin - 220, bottomY);
  }, [headline, subheadline, activeScene, activeTheme, userImage, primaryEmotion]);

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);
    const link = document.createElement('a');
    link.download = `AuraPost-Scene-${activeScene}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setTimeout(() => setDownloading(false), 800);
  };

  const handleCopyCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      alert('Could not copy image directly on this browser. You can download the PNG instead!');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-[#1E1F20] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#2D2F31] animate-enter">
      <div className="flex items-center justify-between pb-4 border-b border-[#2D2F31]">
        <div>
          <h3 className="text-xl font-bold text-white font-display">
            Aesthetic Story Graphic
          </h3>
          <p className="text-xs text-[#8E918F]">
            Rich cartoon scene with character illustrations and expressive typography
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-[#8E918F] hover:text-white hover:bg-[#2D2F31] rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left Column: Graphic Canvas Live Preview */}
        <div className="lg:col-span-6 bg-[#131314] p-4 rounded-2xl border border-[#2D2F31] flex flex-col items-center">
          <canvas
            ref={canvasRef}
            className="w-full max-w-md h-auto rounded-xl shadow-lg border border-[#2D2F31] block bg-[#0B0F19]"
          />
        </div>

        {/* Right Column: Scene Selection & Customization */}
        <div className="lg:col-span-6 space-y-4">
          {/* Cartoon Scene Chooser */}
          <div>
            <label className="text-xs font-semibold text-[#C4C7C5] block mb-1.5">
              Choose Character Scene
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SCENE_OPTIONS.map((sc) => {
                const Icon = sc.icon;
                const isSelected = activeScene === sc.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setActiveScene(sc.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-sky-950/80 text-white border-sky-500 shadow-sm'
                        : 'bg-[#131314] hover:bg-[#282A2C] text-[#C4C7C5] border-[#2D2F31]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-xs mb-0.5">
                      <Icon className="w-3.5 h-3.5 text-sky-400" />
                      <span>{sc.label}</span>
                    </div>
                    <div className={`text-[10px] line-clamp-1 ${isSelected ? 'text-sky-300' : 'text-[#8E918F]'}`}>
                      {sc.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Palette Chooser */}
          <div>
            <label className="text-xs font-semibold text-[#C4C7C5] block mb-1.5">
              Graphic Atmosphere
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveTheme('dark_cyber')}
                className={`py-2 px-2 rounded-xl text-xs font-medium transition-all ${
                  activeTheme === 'dark_cyber'
                    ? 'bg-sky-900/60 text-white font-bold border border-sky-400'
                    : 'bg-[#131314] hover:bg-[#282A2C] text-[#C4C7C5] border border-[#2D2F31]'
                }`}
              >
                Cyber Night
              </button>

              <button
                type="button"
                onClick={() => setActiveTheme('aesthetic_silver')}
                className={`py-2 px-2 rounded-xl text-xs font-medium transition-all ${
                  activeTheme === 'aesthetic_silver'
                    ? 'bg-sky-900/60 text-white font-bold border border-sky-400'
                    : 'bg-[#131314] hover:bg-[#282A2C] text-[#C4C7C5] border border-[#2D2F31]'
                }`}
              >
                Charcoal Slate
              </button>

              <button
                type="button"
                onClick={() => setActiveTheme('warm_noir')}
                className={`py-2 px-2 rounded-xl text-xs font-medium transition-all ${
                  activeTheme === 'warm_noir'
                    ? 'bg-amber-950/60 text-white font-bold border border-amber-400'
                    : 'bg-[#131314] hover:bg-[#282A2C] text-[#C4C7C5] border border-[#2D2F31]'
                }`}
              >
                Warm Noir
              </button>
            </div>
          </div>

          {/* Headline Input */}
          <div>
            <label className="text-xs font-semibold text-[#8E918F] block mb-1">
              Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-[#131314] border border-[#2D2F31] text-[#E3E3E3] focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Subheadline Input */}
          <div>
            <label className="text-xs font-semibold text-[#8E918F] block mb-1">
              Subheadline Story
            </label>
            <input
              type="text"
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-[#131314] border border-[#2D2F31] text-[#E3E3E3] focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Optional Photo Attachment */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-2.5 rounded-xl border border-dashed border-[#444746] hover:bg-[#131314] text-[#C4C7C5] text-xs flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Upload className="w-3.5 h-3.5 text-sky-400" />
              <span>{userImage ? 'Change Attached Event Photo' : 'Attach Real Event Photo (Optional)'}</span>
            </button>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleDownloadPNG}
              disabled={downloading}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-sky-950/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Preparing...' : 'Download Image (PNG)'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyCanvas}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#131314] hover:bg-[#282A2C] text-[#C4C7C5] border border-[#2D2F31] flex items-center justify-center gap-2 transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Image</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
