<script setup lang="ts">
import AudienceCard from './AudienceCard.vue'

const audiences = [
  {
    role: 'STUDENTS & LEARNERS',
    subtitle: 'Cut Study Time in Half & Build an Unfair Career Advantage',
    icon: 'i-lucide-graduation-cap',
    badgeColor: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    borderAccent: 'border-emerald-500/40 hover:border-emerald-500/70',
    points: [
      '24/7 Socratic Mentor: Deconstruct complex coursework through custom analogies tailored to you',
      'Rapid Synthesis: Turn raw lecture transcripts into flashcards, mock quizzes, and study guides instantly',
      'Standout Portfolio: Graduate ahead of peers with real, practical AI workflow experience'
    ],
    takeaway: '10x Study Velocity'
  },
  {
    role: 'NON-AI USERS & SKEPTICS',
    subtitle: 'Zero Coding Required: From Overwhelmed to Confident Operator',
    icon: 'i-lucide-sparkles',
    badgeColor: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
    borderAccent: 'border-indigo-500/40 hover:border-indigo-500/70',
    points: [
      'Demystify the Hype: Understand what AI actually is and isn’t—no math, no tech jargon needed',
      'Conquer Replacement Fear: Stop worrying about AI taking your job; become the one wielding it',
      'Instant Daily Wins: Effortlessly write emails, analyze documents, and brainstorm high-impact ideas'
    ],
    takeaway: 'Zero Fear, Pure Utility'
  },
  {
    role: 'CURRENT AI USERS',
    subtitle: 'Stop "Chatting" with AI. Start Engineering Autonomous Systems',
    icon: 'i-lucide-cpu',
    badgeColor: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    borderAccent: 'border-amber-500/40 hover:border-amber-500/70',
    points: [
      'Ditch Prompt Guessing: Replace hit-or-miss queries with deterministic 6-Pillar Prompt Engineering',
      'System Mastery: Harness full context windows, agent tool-calling, and multi-step reasoning chains',
      'Visual Autopilot: Move beyond single chats—build autonomous background pipelines with n8n'
    ],
    takeaway: 'Consumer -> Architect'
  }
]
</script>

<template>
  <div class="h-full flex flex-col justify-between py-2">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-mono tracking-wider text-emerald-400 font-bold uppercase">
          Tangible Return on Investment
        </span>
        <span class="text-[11px] font-mono text-slate-400">
          Tailored Value For Every Background
        </span>
      </div>
      <h2 class="text-3xl font-extrabold text-white font-serif">
        What Will You Gain From This Course?
      </h2>
    </div>

    <div class="grid grid-cols-3 gap-4 my-auto">
      <AudienceCard
        v-for="(aud, idx) in audiences"
        :key="idx"
        v-click
        :role="aud.role"
        :subtitle="aud.subtitle"
        :icon="aud.icon"
        :badge-color="aud.badgeColor"
        :border-accent="aud.borderAccent"
        :points="aud.points"
        :takeaway="aud.takeaway"
      />
    </div>

    <div class="p-2.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 flex items-center justify-between px-5">
      <div class="flex items-center gap-3">
        <span class="i-lucide-rocket w-5 h-5 text-indigo-400 shrink-0"></span>
        <span class="text-xs text-slate-200 font-sans">
          <strong class="text-white">Bottom Line:</strong> You will stop treating AI like a curious search novelty and start orchestrating it as your force multiplier.
        </span>
      </div>
      <span class="text-xs font-mono font-bold text-indigo-300">
        AI Consumer &rarr; AI Architect
      </span>
    </div>
  </div>
</template>
