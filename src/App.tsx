import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PromptBar } from './components/PromptBar';
import { EmotionDashboard } from './components/EmotionDashboard';
import { ImageDialog } from './components/ImageDialog';
import { GeneratedImageCard } from './components/GeneratedImageCard';
import { PlatformHub } from './components/PlatformHub';
import { MockupModal } from './components/MockupModal';
import { AnalysisResult, PlatformKey } from './types';

const USER_COLLEGE_EXAMPLE =
  'I had an event in my college and that was a tech event. I felt very interesting and knowledgeable after attending and while attending that function. I learned about cutting-edge AI and connected with peers who share the same drive!';

export default function App() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [recentStories, setRecentStories] = useState<
    { id: string; title: string; text: string; date: string }[]
  >([]);

  // Dialog box & image states
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [hasGeneratedImage, setHasGeneratedImage] = useState(false);

  // Platform mockup modal state
  const [mockupPlatform, setMockupPlatform] = useState<PlatformKey | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Scroll ref
  const outputRef = useRef<HTMLDivElement>(null);

  // Load saved stories from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aurapost_recent_stories');
      if (saved) {
        setRecentStories(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
  }, []);

  const saveToRecentStories = (storyText: string) => {
    try {
      const newEntry = {
        id: Date.now().toString(),
        title: storyText.slice(0, 32) + '...',
        text: storyText,
        date: new Date().toLocaleDateString(),
      };
      const updated = [newEntry, ...recentStories.slice(0, 7)];
      setRecentStories(updated);
      localStorage.setItem('aurapost_recent_stories', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/analyze-and-craft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!res.ok) throw new Error('Failed to analyze content');

      const data: AnalysisResult = await res.json();
      setResult(data);
      saveToRecentStories(content.trim());

      // Smooth scroll to output and trigger the "Do you want to make an image also?" dialog box
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          setShowImageDialog(true);
        }, 500);
      }, 200);
    } catch (err) {
      console.error('Error during analysis:', err);
      alert('Something went wrong while crafting your story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlatformText = (platform: PlatformKey, newText: string) => {
    setResult((prev) => {
      if (!prev) return prev;
      const newPlatforms = { ...prev.platforms };
      if (platform === 'instagram') {
        newPlatforms.instagram = { ...newPlatforms.instagram, caption: newText };
      } else if (platform === 'linkedin') {
        newPlatforms.linkedin = { ...newPlatforms.linkedin, caption: newText };
      } else if (platform === 'twitter') {
        newPlatforms.twitter = { ...newPlatforms.twitter, tweet: newText };
      } else if (platform === 'facebook') {
        newPlatforms.facebook = { ...newPlatforms.facebook, caption: newText };
      }
      return { ...prev, platforms: newPlatforms };
    });
  };

  const handleLoadUserCollegeExample = () => {
    setContent(USER_COLLEGE_EXAMPLE);
  };

  const handleReset = () => {
    setContent('');
    setResult(null);
    setShowImageDialog(false);
    setHasGeneratedImage(false);
    setMockupPlatform(null);
  };

  const handleSelectTemplate = (text: string) => {
    setContent(text);
  };

  return (
    <div className="min-h-screen bg-[#131314] text-[#E3E3E3] flex antialiased selection:bg-sky-900/60 selection:text-sky-200">
      {/* Sleek Collapsible Sidebar (Matching Layout) */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewStory={handleReset}
        onSelectStoryTemplate={handleSelectTemplate}
        recentStories={recentStories}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'md:ml-64' : 'md:ml-16'
        }`}
      >
        {/* Top Header */}
        <Header
          onLoadExample={handleLoadUserCollegeExample}
          onReset={handleReset}
          hasContent={Boolean(content || result)}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* Center Main Stage with Ambient Background Glow */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 relative flex flex-col justify-center">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 ambient-glow pointer-events-none -z-10" />

          {/* Floating Prompt Bar (Matching Screenshot) */}
          <PromptBar
            content={content}
            setContent={setContent}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {/* Output Section */}
          {result && (
            <div ref={outputRef} className="space-y-8 mt-12">
              {/* Story Output with Big Lines */}
              <EmotionDashboard
                profile={result.emotionalProfile}
                initialCraft={result.initialCraft}
                soundEnabled={soundEnabled}
                onOpenImageDialog={() => setShowImageDialog(true)}
              />

              {/* Generated Image Card with Cartoon Scenes & Typography */}
              {hasGeneratedImage && (
                <GeneratedImageCard
                  visualIdea={result.visualIdea}
                  primaryEmotion={result.emotionalProfile.primaryEmotion}
                  onClose={() => setHasGeneratedImage(false)}
                />
              )}

              {/* Multi-Platform Outputs */}
              <PlatformHub
                platforms={result.platforms}
                onUpdatePlatformText={handleUpdatePlatformText}
                onOpenMockup={(plat) => setMockupPlatform(plat)}
              />
            </div>
          )}
        </main>

        {/* Minimal Footer */}
        <footer className="py-6 border-t border-[#2D2F31]/60 text-center text-xs text-[#8E918F]">
          <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>AuraPost · Emotion to Social Story AI</span>
            <span>Crafted for authentic human storytelling</span>
          </div>
        </footer>
      </div>

      {/* "Do you want to make an image also?" Dialog Box */}
      <ImageDialog
        isOpen={showImageDialog}
        onConfirm={() => {
          setShowImageDialog(false);
          setHasGeneratedImage(true);
        }}
        onDecline={() => {
          setShowImageDialog(false);
        }}
        onClose={() => {
          setShowImageDialog(false);
        }}
      />

      {/* Realistic Mobile Mockup Modal */}
      {mockupPlatform && result && (
        <MockupModal
          platform={mockupPlatform}
          text={
            mockupPlatform === 'instagram'
              ? result.platforms.instagram.caption
              : mockupPlatform === 'linkedin'
              ? result.platforms.linkedin.caption
              : mockupPlatform === 'twitter'
              ? result.platforms.twitter.tweet
              : result.platforms.facebook.caption
          }
          onClose={() => setMockupPlatform(null)}
        />
      )}
    </div>
  );
}
