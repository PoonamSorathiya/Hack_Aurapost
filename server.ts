import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Fallback generator if API key is not yet set or in case of temporary issues
function generateFallbackResponse(content: string, tone = 'authentic') {
  const previewSummary = content.slice(0, 120) || 'Attending an inspiring event and learning new skills';
  return {
    emotionalProfile: {
      primaryEmotion: 'Intellectual Curiosity & Inspiration',
      secondaryEmotions: ['Pride & Accomplishment', 'Sense of Wonder', 'Connection'],
      toneVibe: 'Warm, Uplifting & Transformative',
      keyHighlights: [
        'Dived deep into fresh technical concepts and ideas',
        'Felt the vibrant energy of collaborating with like-minded peers',
        'Walked away with genuine momentum and confidence for what comes next',
      ],
      coreMessage: 'Every breakthrough begins with the curiosity to show up and learn.',
    },
    initialCraft: `Attending this was more than just participating—it was a reminder of why I love diving into new challenges. Between the discussions, the shared insights, and the spark of new knowledge, I walked away feeling both intellectually energized and deeply grateful for the community. Sometimes the best growth happens simply because you leaned in with genuine curiosity.`,
    platforms: {
      instagram: {
        caption: `✨ Walked into this experience curious, walked out completely inspired.\n\n${content}\n\nThere’s something so special about being in a room where everyone is excited to learn, build, and push boundaries. It reminded me that learning isn't just about taking in information—it's about the energy and people you share it with! 💡🌱\n\nDrop a comment: What’s the last event or experience that gave you a burst of fresh inspiration? 👇\n\n#CampusLife #TechCommunity #KeepLearning #PersonalGrowth #StudentLife #TechFest #InspirationDaily #GrowthMindset #LifelongLearner #CreativeJourney #CollegeVibes #FutureTech #MindsetMatters #CommunityFirst #LearnAndGrow`,
        visualTip: 'A warm photo of you smiling with your notebook/laptop or a snapshot of the event hall bathed in warm light.',
        suggestedPrompt: 'A warm pastel editorial photograph of a smiling student in a modern campus tech hall, warm peach and mint lighting, cozy and uplifting atmosphere',
      },
      linkedin: {
        caption: `Continuous learning isn't just a career strategy; it’s an energizing mindset.\n\nRecently, I had the opportunity to participate in a standout experience that left a lasting impression:\n\n👉 ${content}\n\nThree key takeaways from the day:\n1. Curiosity accelerates capability: Asking questions always beats pretending to know everything.\n2. Knowledge thrives in community: The exchange of perspectives between peers sparked brand new ideas.\n3. Action cements learning: The real value is in how we apply these insights to tomorrow’s projects.\n\nGrateful for spaces that challenge us to grow and connect. Looking forward to putting these concepts into practice!\n\nHow do you stay inspired and keep your skills sharp? Would love to hear your approach.\n\n#ProfessionalGrowth #ContinuousLearning #TechLeadership #Innovation #StudentSuccess`,
        visualTip: 'An infographic carousel or a clean quote card highlighting your core takeaway.',
      },
      twitter: {
        tweet: `Walked into the event curious, walked away with pure momentum. 🚀\n\nWhen you surround yourself with people passionate about building & learning, everything clicks.\n\nNever underestimate the power of showing up with an open mind. #TechCommunity #Growth`,
        thread: [
          `1/3 Still thinking about the tech event I attended recently. The biggest takeaway? Real understanding doesn't come from passive listening—it comes from active immersion. 🧵`,
          `2/3 Being around passionate mentors and peers who genuinely care about solving problems refuels your drive. Knowledge shared is knowledge multiplied.`,
          `3/3 Take the chance on that seminar, hackathon, or meetup. You never know which idea will spark your next big chapter. 💡✨`,
        ],
      },
      facebook: {
        caption: `Just wanted to share a quick reflection from an unforgettable experience today! 🌸\n\n${content}\n\nIt felt so good to step out of my usual routine, soak up new knowledge, and connect with people who share that same excitement. Feeling grateful, energized, and ready for what’s ahead.\n\nHope everyone is having a wonderful week! Have you learned anything new or attended an event lately that you really enjoyed? Tell me below! ❤️`,
      },
    },
    visualIdea: {
      cardHeadline: 'Curiosity Sparks the Future',
      cardSubheadline: 'Reflections from a memorable day of learning & connection',
      suggestedColors: ['#FF8A65', '#E8E5F7', '#FAF6F0', '#2D2622'],
      imagePrompt: 'Soft pastel aesthetic flatlay of a notebook with inspiring notes, college tech badge, fresh coffee, warm morning sunlight, peach and lavender tones',
    },
  };
}

// 1. Endpoint: Analyze Emotion & Craft Multi-Platform Content
app.post('/api/analyze-and-craft', async (req, res) => {
  try {
    const { content, moodTone = 'authentic', audience = 'all' } = req.body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ error: 'Please share your experience or thoughts to begin.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Graceful fallback if no API key is injected yet
      return res.json(generateFallbackResponse(content, moodTone));
    }

    const systemPrompt = `You are AuraPost's elite Emotional Intelligence and Social Media Storyteller.
The user shares raw, unpolished, authentic personal experiences (e.g. college tech event, personal milestone, struggle turned into triumph, travel, hackathon, learning journey).
Your goal:
1. Emotion Recognition: Deeply identify the emotions they felt during and after the experience (e.g., intellectual curiosity, pride, excitement, awe, nervous excitement, feeling empowered, grateful).
2. Meaning Extraction: Discover the core human truth and personal growth inside their raw narrative.
3. Craft an initial heartfelt personal story that represents their experience.
4. Adapt this story into 4 distinct, platform-optimized formats:
   - Instagram: Emotion-first storytelling with an engaging hook, tasteful emojis, conversational pacing, community question, and 15 relevant, high-impact hashtags.
   - LinkedIn: Professional narrative with a strong hook, the event/experience context, 3 bulleted actionable learnings/insights, a forward-looking conclusion, and 3-5 professional hashtags.
   - Twitter (X):
     * tweet: A single punchy, viral-potential tweet (<280 chars) with hook, insight, and 2-3 hashtags.
     * thread: A 3-tweet thread breakdown expanding on the story.
   - Facebook: Warm, friendly, community-first storytelling for friends, family, and classmates with an inviting prompt for comments.
5. Create a Visual Idea matching the emotional tone with a headline, subheadline, 4 hex palette colors (sweet, soft pastel tones, e.g. peach, cream, lavender, mint, warm honey), and a vivid image prompt.
Tone preference: ${moodTone}. Target audience: ${audience}.
Respond strictly in valid JSON conforming to the requested schema.`;

    const userPrompt = `Here is the user's raw experience and feelings:
"""
${content}
"""
Please recognize the emotions, extract the meaning, and craft the multi-platform posts and visual concept.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            emotionalProfile: {
              type: Type.OBJECT,
              properties: {
                primaryEmotion: { type: Type.STRING, description: 'Primary emotion detected' },
                secondaryEmotions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '2 to 3 secondary emotions detected',
                },
                toneVibe: { type: Type.STRING, description: 'Overall tone and vibe descriptor' },
                keyHighlights: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '3 bullet points capturing the experience',
                },
                coreMessage: { type: Type.STRING, description: 'One sentence emotional essence' },
              },
              required: ['primaryEmotion', 'secondaryEmotions', 'toneVibe', 'keyHighlights', 'coreMessage'],
            },
            initialCraft: {
              type: Type.STRING,
              description: 'Initial polished personal narrative outcome of their experience',
            },
            platforms: {
              type: Type.OBJECT,
              properties: {
                instagram: {
                  type: Type.OBJECT,
                  properties: {
                    caption: { type: Type.STRING },
                    visualTip: { type: Type.STRING },
                    suggestedPrompt: { type: Type.STRING },
                  },
                  required: ['caption', 'visualTip'],
                },
                linkedin: {
                  type: Type.OBJECT,
                  properties: {
                    caption: { type: Type.STRING },
                    visualTip: { type: Type.STRING },
                  },
                  required: ['caption', 'visualTip'],
                },
                twitter: {
                  type: Type.OBJECT,
                  properties: {
                    tweet: { type: Type.STRING },
                    thread: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ['tweet', 'thread'],
                },
                facebook: {
                  type: Type.OBJECT,
                  properties: {
                    caption: { type: Type.STRING },
                  },
                  required: ['caption'],
                },
              },
              required: ['instagram', 'linkedin', 'twitter', 'facebook'],
            },
            visualIdea: {
              type: Type.OBJECT,
              properties: {
                cardHeadline: { type: Type.STRING },
                cardSubheadline: { type: Type.STRING },
                suggestedColors: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                imagePrompt: { type: Type.STRING },
              },
              required: ['cardHeadline', 'cardSubheadline', 'suggestedColors', 'imagePrompt'],
            },
          },
          required: ['emotionalProfile', 'initialCraft', 'platforms', 'visualIdea'],
        },
      },
    });

    const textOutput = response.text || '';
    const parsedData = JSON.parse(textOutput);
    return res.json(parsedData);
  } catch (err: any) {
    console.error('Error analyzing content:', err);
    // Return high quality fallback rather than failing completely
    const fallback = generateFallbackResponse(req.body?.content || '');
    return res.json(fallback);
  }
});

// 2. Endpoint: Refine / Rewrite Post for a specific platform or instruction
app.post('/api/refine-post', async (req, res) => {
  try {
    const { platform, currentText, instruction, originalExperience } = req.body;

    if (!currentText || !instruction) {
      return res.status(400).json({ error: 'Missing text or refinement instruction' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        refinedText: `${currentText}\n\n[Updated with: ${instruction}]`,
      });
    }

    const prompt = `You are an expert social media copy editor.
The user wants to refine their ${platform} post based on this instruction: "${instruction}".
Original raw experience context: "${originalExperience || ''}"

Current post draft:
"""
${currentText}
"""

Rewrite this post keeping the emotional authenticity, matching the conventions of ${platform}, and directly applying the user instruction. Return ONLY the refined post text with no intro or explanation.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({ refinedText: response.text?.trim() || currentText });
  } catch (err: any) {
    console.error('Error refining post:', err);
    return res.status(500).json({ error: 'Could not refine post at this time.' });
  }
});

// Dev vs Prod Vite Integration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
