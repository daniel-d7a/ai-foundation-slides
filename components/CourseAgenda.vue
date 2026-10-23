<script setup lang="ts">
const modules = [
  {
    no: '01',
    title: 'The AI Landscape',
    tag: 'Foundation & Mental Model',
    icon: 'i-lucide-globe',
    badge: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
    border: 'border-indigo-500/40 hover:border-indigo-500/70',
    topics: [
      'Evolution: Rules to GenAI',
      'ANI vs AGI realities',
      'Subfields: ML, DL, NLP, CV'
    ]
  },
  {
    no: '02',
    title: 'Modern AI Toolbox',
    tag: 'Tools For Every Major',
    icon: 'i-lucide-wrench',
    badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    border: 'border-emerald-500/40 hover:border-emerald-500/70',
    topics: [
      'Chat & Ideation: Claude, Gemini',
      'Research: Perplexity, NotebookLM',
      'Code & Media: Cursor, Midjourney'
    ]
  },
  {
    no: '03',
    title: 'Speaking to the Machine',
    tag: 'Prompt Engineering Mastery',
    icon: 'i-lucide-terminal',
    badge: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    border: 'border-amber-500/40 hover:border-amber-500/70',
    topics: [
      '6 Pillars & Chain-of-Thought',
      'Context windows & agent tools',
      'Applied scenarios (Data, Copy, Code)'
    ]
  },
  {
    no: '04',
    title: 'Supercharging Learning',
    tag: 'Personal Growth & Tutoring',
    icon: 'i-lucide-book-open',
    badge: 'bg-pink-500/15 border-pink-500/30 text-pink-300',
    border: 'border-pink-500/40 hover:border-pink-500/70',
    topics: [
      'Socratic Method: Questions > Answers',
      'Custom concept deconstruction',
      'Automated study pipelines & gap drills'
    ]
  },
  {
    no: '05',
    title: 'Visual Automation',
    tag: 'Autopilot with n8n',
    icon: 'i-lucide-cpu',
    badge: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
    border: 'border-cyan-500/40 hover:border-cyan-500/70',
    topics: [
      'Triggers, actions & AI nodes',
      'Autonomous content pipelines',
      'From single chats to background systems'
    ]
  }
]
</script>

<template>
  <div class="h-full flex flex-col justify-between py-2">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-mono tracking-wider text-indigo-400 font-bold uppercase">
          Course Roadmap
        </span>
        <span class="text-[11px] font-mono text-slate-400">
          5 Core Modules &bull; Theory to Hands-on System Architecture
        </span>
      </div>
      <h2 class="text-3xl font-extrabold text-white font-serif">
        What We Will Cover
      </h2>
    </div>

    <div class="grid grid-cols-5 gap-3 my-auto">
      <div
        v-for="m in modules"
        :key="m.no"
        v-click
        class="p-3.5 rounded-xl bg-slate-900/80 border flex flex-col justify-between h-80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        :class="m.border"
      >
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border" :class="m.badge">
              MODULE {{ m.no }}
            </span>
            <span :class="m.icon" class="w-4 h-4 text-slate-400"></span>
          </div>

          <h3 class="text-sm font-bold text-white font-serif min-h-[2.5rem] flex items-center leading-tight">
            {{ m.title }}
          </h3>

          <div class="text-[11px] font-mono text-slate-400 mb-3 border-b border-slate-800 pb-2">
            {{ m.tag }}
          </div>

          <ul class="space-y-2 text-[11px] text-slate-300 font-sans">
            <li v-for="(t, i) in m.topics" :key="i" class="flex items-start gap-1.5 leading-snug">
              <span class="i-lucide-chevron-right w-3 h-3 text-indigo-400 shrink-0 mt-0.5"></span>
              <span>{{ t }}</span>
            </li>
          </ul>
        </div>

        <div class="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 text-center">
          Step {{ m.no }} of 05
        </div>
      </div>
    </div>

    <div class="text-center text-xs text-slate-400 font-mono">
      Designed to take anyone from absolute ground zero to building autonomous AI workflows.
    </div>
  </div>
</template>
