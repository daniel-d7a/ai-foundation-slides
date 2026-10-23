<script setup lang="ts">
const props = defineProps<{
  part: 1 | 2
}>()

interface Milestone {
  step: string
  moduleNo: string
  title: string
  badge: string
  color: string
  icon: string
  description: string
  bullets: string[]
}

const part1Milestones: Milestone[] = [
  {
    step: '01',
    moduleNo: 'MODULE 01',
    title: 'The AI Landscape',
    badge: 'Foundations & Mental Models',
    color: 'indigo',
    icon: 'i-lucide-globe',
    description: 'Demystifying the tech stack and capability spectrum.',
    bullets: ['From Symbolic Rules to Transformers', 'Narrow AI (ANI) vs General AI (AGI)', 'ML, Deep Learning, NLP & Vision']
  },
  {
    step: '02',
    moduleNo: 'MODULE 02',
    title: 'The Modern Toolbox',
    badge: 'Tools For Every Major',
    color: 'emerald',
    icon: 'i-lucide-wrench',
    description: 'Curating the right tool for each problem archetype.',
    bullets: ['Ideation & Chat: Claude, Gemini', 'Deep Synthesis: Perplexity, NotebookLM', 'Coding & Media: Cursor, Midjourney']
  },
  {
    step: '03',
    moduleNo: 'MODULE 03',
    title: 'Speaking to the Machine',
    badge: 'Prompt Engineering',
    color: 'amber',
    icon: 'i-lucide-terminal',
    description: 'Transitioning from guessing to deterministic control.',
    bullets: ['The 6-Pillar Prompting Framework', 'Context windows & token budgeting', 'Applied Workflows: Data, Copy, Code']
  }
]

const part2Milestones: Milestone[] = [
  {
    step: '04',
    moduleNo: 'MODULE 04',
    title: 'Supercharging Learning',
    badge: 'Socratic Tutor Framework',
    color: 'pink',
    icon: 'i-lucide-book-open',
    description: 'Transforming passive memorization into active recall.',
    bullets: ['Socratic Drills: Questions > Answers', 'Tailored concept deconstruction', 'Automated study & quiz pipelines']
  },
  {
    step: '05',
    moduleNo: 'MODULE 05',
    title: 'Visual Automation',
    badge: 'Autopilot with n8n',
    color: 'cyan',
    icon: 'i-lucide-cpu',
    description: 'Building autonomous background pipelines.',
    bullets: ['Event triggers, actions & AI nodes', 'Autonomous content & research pipelines', 'Multi-step autonomous execution']
  },
  {
    step: '06',
    moduleNo: 'CAPSTONE',
    title: 'The AI Architect',
    badge: 'Full Autonomy & Mastery',
    color: 'purple',
    icon: 'i-lucide-rocket',
    description: 'Complete synthesis into daily life and career.',
    bullets: ['From consumer to system architect', 'Building durable personal workflows', 'Continuous real-world leverage']
  }
]

const milestones = props.part === 1 ? part1Milestones : part2Milestones
</script>

<template>
  <div class="h-full flex flex-col justify-between py-2">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-2">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono tracking-widest text-indigo-400 font-bold uppercase">
            Curriculum Timeline &bull; Part {{ part }} of 2
          </span>
          <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
            {{ part === 1 ? 'Phase 1: Foundations to Practical Interaction' : 'Phase 2: Accelerated Learning to Autonomous Systems' }}
          </span>
        </div>
        <h2 class="text-3xl font-extrabold text-white font-serif mt-1">
          {{ part === 1 ? 'From Landscape to Deterministic Prompting' : 'From Socratic Mastery to Autopilot Workflows' }}
        </h2>
      </div>
      <div class="text-right font-mono text-[11px] text-slate-400">
        {{ part === 1 ? 'Milestones 01 &rarr; 03' : 'Milestones 04 &rarr; Final Capstone' }}
      </div>
    </div>

    <!-- Timeline Area with SVG Path -->
    <div class="relative my-auto w-full">
      <!-- SVG Connecting Timeline Path -->
      <svg
        class="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 900 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <!-- Main Timeline Path (Solid, no gradient) -->
        <path
          d="M 150 40 L 750 40"
          :stroke="part === 1 ? '#818cf8' : '#ec4899'"
          stroke-width="3"
          stroke-linecap="round"
          stroke-dasharray="8 6"
        />

        <!-- Downward connecting drop paths from milestone points to cards -->
        <path d="M 150 40 L 150 75" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3" opacity="0.7" />
        <path d="M 450 40 L 450 75" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3" opacity="0.7" />
        <path d="M 750 40 L 750 75" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3" opacity="0.7" />
      </svg>

      <!-- Milestones Cards Grid -->
      <div class="grid grid-cols-3 gap-6 pt-2">
        <div
          v-for="(m, idx) in milestones"
          :key="m.step"
          v-click
          class="flex flex-col items-center"
        >
          <!-- SVG Timeline Node Anchor Pin -->
          <div
            class="w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-xl z-10 transition-transform hover:scale-110"
            :class="{
              'bg-indigo-950 border-indigo-400 text-indigo-300 shadow-indigo-500/30': m.color === 'indigo',
              'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-emerald-500/30': m.color === 'emerald',
              'bg-amber-950 border-amber-400 text-amber-300 shadow-amber-500/30': m.color === 'amber',
              'bg-pink-950 border-pink-400 text-pink-300 shadow-pink-500/30': m.color === 'pink',
              'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-cyan-500/30': m.color === 'cyan',
              'bg-purple-950 border-purple-400 text-purple-300 shadow-purple-500/30': m.color === 'purple'
            }"
          >
            <span :class="m.icon" class="w-5 h-5"></span>
          </div>

          <!-- Card Content -->
          <div
            class="w-full mt-4 p-4 rounded-xl bg-slate-900/90 border flex flex-col justify-between h-56 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            :class="{
              'border-indigo-500/40 hover:border-indigo-500/80': m.color === 'indigo',
              'border-emerald-500/40 hover:border-emerald-500/80': m.color === 'emerald',
              'border-amber-500/40 hover:border-amber-500/80': m.color === 'amber',
              'border-pink-500/40 hover:border-pink-500/80': m.color === 'pink',
              'border-cyan-500/40 hover:border-cyan-500/80': m.color === 'cyan',
              'border-purple-500/40 hover:border-purple-500/80': m.color === 'purple'
            }"
          >
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[10px] font-mono font-bold text-slate-400">
                  {{ m.moduleNo }}
                </span>
                <span
                  class="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  :class="{
                    'bg-indigo-500/15 border-indigo-500/30 text-indigo-300': m.color === 'indigo',
                    'bg-emerald-500/15 border-emerald-500/30 text-emerald-300': m.color === 'emerald',
                    'bg-amber-500/15 border-amber-500/30 text-amber-300': m.color === 'amber',
                    'bg-pink-500/15 border-pink-500/30 text-pink-300': m.color === 'pink',
                    'bg-cyan-500/15 border-cyan-500/30 text-cyan-300': m.color === 'cyan',
                    'bg-purple-500/15 border-purple-500/30 text-purple-300': m.color === 'purple'
                  }"
                >
                  {{ m.badge }}
                </span>
              </div>

              <h3 class="text-base font-bold text-white font-serif leading-tight mt-1">
                {{ m.title }}
              </h3>

              <ul class="mt-3 space-y-1.5 text-xs text-slate-300 font-sans border-t border-slate-800/80 pt-2.5">
                <li v-for="(b, bIdx) in m.bullets" :key="bIdx" class="flex items-start gap-1.5 leading-snug">
                  <span class="i-lucide-circle-check w-3.5 h-3.5 shrink-0 mt-0.5" :class="{
                    'text-indigo-400': m.color === 'indigo',
                    'text-emerald-400': m.color === 'emerald',
                    'text-amber-400': m.color === 'amber',
                    'text-pink-400': m.color === 'pink',
                    'text-cyan-400': m.color === 'cyan',
                    'text-purple-400': m.color === 'purple'
                  }"></span>
                  <span>{{ b }}</span>
                </li>
              </ul>
            </div>

            <div class="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800 flex items-center justify-between">
              <span>Timeline checkpoint</span>
              <span class="text-white font-bold">Step {{ m.step }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer navigation cue -->
    <div class="flex items-center justify-between text-xs text-slate-400 font-mono">
      <span>{{ part === 1 ? 'Foundations & Tooling &bull; 01 to 03' : 'Advanced Synthesis & Autopilot &bull; 04 to Capstone' }}</span>
      <span class="text-indigo-400 flex items-center gap-1">
        <span>{{ part === 1 ? 'Next: Phase 2 Automation & Capstone' : 'Next: Tangible Outcomes' }}</span>
        <span class="i-lucide-arrow-right w-3.5 h-3.5"></span>
      </span>
    </div>
  </div>
</template>
