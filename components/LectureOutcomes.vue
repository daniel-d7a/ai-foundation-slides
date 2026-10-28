<script setup lang="ts">
import { computed } from 'vue'

interface OutcomeItem {
  title: string
  desc: string
  icon: string
}

interface ModuleOutcomeData {
  moduleNo: string
  lectureTitle: string
  subtitle: string
  accent: 'indigo' | 'emerald' | 'amber' | 'pink' | 'cyan'
  outcomes: OutcomeItem[]
}

const props = defineProps<{
  module?: 1 | 2 | 3 | 4 | 5
  moduleNo?: string
  lectureTitle?: string
  subtitle?: string
  accent?: 'indigo' | 'emerald' | 'amber' | 'pink' | 'cyan'
  outcomes?: OutcomeItem[]
}>()

const MODULE_DATA: Record<number, ModuleOutcomeData> = {
  1: {
    moduleNo: 'MODULE 01',
    lectureTitle: 'The AI Landscape',
    subtitle: 'From manual rule-based systems to generative foundation models.',
    accent: 'indigo',
    outcomes: [
      {
        title: 'Trace AI Evolution',
        desc: 'Understand the shift from manual rules to modern generative foundation models.',
        icon: 'i-lucide-history',
      },
      {
        title: 'Identify AI Types',
        desc: 'Distinguish narrow AI (ANI) in use today from general AI (AGI) and super AI (ASI).',
        icon: 'i-lucide-layers',
      },
      {
        title: 'Classify AI Subfields',
        desc: 'Map the hierarchy of Artificial Intelligence, Machine Learning, Deep Learning, and LLMs.',
        icon: 'i-lucide-network',
      },
      {
        title: 'Navigate Ecosystem',
        desc: 'Connect AI tools to industry roles. Treat LLMs as reasoning engines and tools as hands.',
        icon: 'i-lucide-compass',
      },
    ],
  },
  2: {
    moduleNo: 'MODULE 02',
    lectureTitle: 'The Modern AI Toolbox',
    subtitle: 'Select the right foundation model and tool category for each task.',
    accent: 'emerald',
    outcomes: [
      {
        title: 'Compare Models',
        desc: 'Evaluate foundation models by cost, context limit, speed, and privacy requirements.',
        icon: 'i-lucide-scale',
      },
      {
        title: 'Select Specialized Tools',
        desc: 'Choose dedicated applications for chat, grounded research, image creation, and software code.',
        icon: 'i-lucide-layout-grid',
      },
      {
        title: 'Match Tools to Tasks',
        desc: 'Connect your study major and daily work directly to the best AI tools.',
        icon: 'i-lucide-briefcase',
      },
    ],
  },
  3: {
    moduleNo: 'MODULE 03',
    lectureTitle: 'Prompt Engineering',
    subtitle: 'Write structured prompts to produce accurate and repeatable results.',
    accent: 'amber',
    outcomes: [
      {
        title: 'Stop Ambiguous Prompts',
        desc: 'Replace vague questions with structured inputs to prevent hallucination and generic answers.',
        icon: 'i-lucide-alert-triangle',
      },
      {
        title: 'Apply the 6 Pillars',
        desc: 'Construct master prompts using Persona, Context, Task, Instructions, Format, and Chain of Thought.',
        icon: 'i-lucide-blocks',
      },
      {
        title: 'Control Chat Systems',
        desc: 'Manage context limits, upload reference files, and activate external tools like search and code runners.',
        icon: 'i-lucide-sliders-horizontal',
      },
      {
        title: 'Execute Real Scenarios',
        desc: 'Build and deploy proven prompt templates for marketing copy, data analysis, and code development.',
        icon: 'i-lucide-sparkles',
      },
    ],
  },
  4: {
    moduleNo: 'MODULE 04',
    lectureTitle: 'AI for Learning',
    subtitle: 'Transform AI into a 24/7 personal tutor for active understanding.',
    accent: 'pink',
    outcomes: [
      {
        title: 'Adopt the Tutor Mindset',
        desc: 'Use AI as a guide to explain hard ideas instead of copying quick answers.',
        icon: 'i-lucide-brain',
      },
      {
        title: 'Practice Socratic Dialogue',
        desc: 'Instruct the model to challenge you with diagnostic questions and direct feedback.',
        icon: 'i-lucide-message-square',
      },
      {
        title: 'Deconstruct Tough Topics',
        desc: 'Translate complex technical subjects into simple analogies using your personal interests.',
        icon: 'i-lucide-lightbulb',
      },
      {
        title: 'Generate Study Materials',
        desc: 'Turn raw lecture notes and documents into flashcards, mock quizzes, and study guides in seconds.',
        icon: 'i-lucide-file-text',
      },
    ],
  },
  5: {
    moduleNo: 'MODULE 05',
    lectureTitle: 'Automation with n8n',
    subtitle: 'Connect tools and build automated background pipelines without code.',
    accent: 'cyan',
    outcomes: [
      {
        title: 'Eliminate Manual Work',
        desc: 'Stop repetitive copy-paste actions. Build event-driven pipelines that run automatically.',
        icon: 'i-lucide-zap-off',
      },
      {
        title: 'Identify Automation Tiers',
        desc: 'Progress from scheduled scripts to data transformation and autonomous multi-step agents.',
        icon: 'i-lucide-git-branch',
      },
      {
        title: 'Master n8n Architecture',
        desc: 'Configure Trigger Nodes, Action Nodes, AI Agent Nodes, and Output Nodes effectively.',
        icon: 'i-lucide-cpu',
      },
      {
        title: 'Deploy Live Pipelines',
        desc: 'Build, connect credentials, and run end-to-end workflows from raw input to finished assets.',
        icon: 'i-lucide-rocket',
      },
    ],
  },
}

const data = computed(() => {
  const base = props.module ? MODULE_DATA[props.module] : MODULE_DATA[1]
  return {
    moduleNo: props.moduleNo ?? base.moduleNo,
    lectureTitle: props.lectureTitle ?? base.lectureTitle,
    subtitle: props.subtitle ?? base.subtitle,
    accent: props.accent ?? base.accent,
    outcomes: props.outcomes ?? base.outcomes,
  }
})

const colorStyles = computed(() => {
  const accent = data.value.accent
  const map = {
    indigo: {
      badge: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/30',
      cardBorder: 'border-indigo-500/30 hover:border-indigo-500/60',
      iconBox: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
      checkIcon: 'text-indigo-400',
      tag: 'text-indigo-400',
    },
    emerald: {
      badge: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      cardBorder: 'border-emerald-500/30 hover:border-emerald-500/60',
      iconBox: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      checkIcon: 'text-emerald-400',
      tag: 'text-emerald-400',
    },
    amber: {
      badge: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
      cardBorder: 'border-amber-500/30 hover:border-amber-500/60',
      iconBox: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      checkIcon: 'text-amber-400',
      tag: 'text-amber-400',
    },
    pink: {
      badge: 'text-pink-400 bg-pink-500/15 border-pink-500/30',
      cardBorder: 'border-pink-500/30 hover:border-pink-500/60',
      iconBox: 'bg-pink-500/15 border-pink-500/30 text-pink-400',
      checkIcon: 'text-pink-400',
      tag: 'text-pink-400',
    },
    cyan: {
      badge: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
      cardBorder: 'border-cyan-500/30 hover:border-cyan-500/60',
      iconBox: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
      checkIcon: 'text-cyan-400',
      tag: 'text-cyan-400',
    },
  }
  return map[accent] || map.indigo
})
</script>

<template>
  <div class="h-full flex flex-col justify-between py-2">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <div class="flex items-center gap-2">
          <span
            class="text-xs font-mono tracking-widest font-bold uppercase px-2.5 py-0.5 rounded border"
            :class="colorStyles.badge"
          >
            {{ data.moduleNo }} &bull; LECTURE OUTCOMES
          </span>
        </div>
        <h2 class="text-3xl font-extrabold text-white font-serif mt-1.5">
          {{ data.lectureTitle }}
        </h2>
      </div>
    </div>

    <!-- Outcomes Grid -->
    <div
      class="grid my-auto gap-4"
      :class="data.outcomes.length === 3 ? 'grid-cols-3' : 'grid-cols-4'"
    >
      <div
        v-for="(item, idx) in data.outcomes"
        :key="idx"
        v-click
        class="p-4 rounded-xl bg-slate-900/85 border flex flex-col justify-between h-74 transition-all duration-200"
        :class="colorStyles.cardBorder"
      >
        <div>
          <!-- Icon + Index -->
          <div class="flex items-center justify-between mb-3">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center border"
              :class="colorStyles.iconBox"
            >
              <span :class="item.icon" class="w-5 h-5"></span>
            </div>
            <span class="text-[11px] font-mono text-slate-400 font-bold">
              0{{ idx + 1 }}
            </span>
          </div>

          <!-- Outcome Title -->
          <h3 class="text-base font-bold text-white font-serif mb-2 leading-snug">
            {{ item.title }}
          </h3>

          <!-- ASD-STE100 Concise Description -->
          <p class="text-xs text-slate-300 leading-relaxed font-sans">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
