<script setup lang="ts">
const props = defineProps<{
  part: 1 | 2;
}>();

interface Milestone {
  step: string;
  moduleNo: string;
  title: string;
  badge: string;
  color: string;
  icon: string;
  description: string;
  bullets: string[];
}

const part1Milestones: Milestone[] = [
  {
    step: "01",
    moduleNo: "MODULE 01",
    title: "The AI Landscape",
    badge: "Foundations and Mental Models",
    color: "indigo",
    icon: "i-lucide-globe",
    description: "Learn the core technical structure and capabilities.",
    bullets: [
      "From rule-based systems to transformers",
      "Narrow AI (ANI) compared to General AI (AGI)",
      "Machine learning, deep learning, NLP, and vision",
    ],
  },
  {
    step: "02",
    moduleNo: "MODULE 02",
    title: "Modern AI Tools",
    badge: "Tools for All Fields",
    color: "emerald",
    icon: "i-lucide-wrench",
    description: "Select the correct tool for each task type.",
    bullets: [
      "Discussion and chat tools: Claude, Gemini",
      "Research and summary tools: Perplexity, NotebookLM",
      "Code and media tools: Cursor, Midjourney",
    ],
  },
  {
    step: "03",
    moduleNo: "MODULE 03",
    title: "Prompt Engineering",
    badge: "Prompt Engineering",
    color: "amber",
    icon: "i-lucide-terminal",
    description: "Control AI outputs with structured rules instead of guesses.",
    bullets: [
      "The 6-pillar prompt structure",
      "Context limits and token management",
      "Practical tasks: data, text, and code",
    ],
  },
];

const part2Milestones: Milestone[] = [
  {
    step: "04",
    moduleNo: "MODULE 04",
    title: "Active Learning with AI",
    badge: "Socratic Tutor Method",
    color: "pink",
    icon: "i-lucide-book-open",
    description: "Change passive reading into active question-and-answer study.",
    bullets: [
      "Socratic practice: questions before answers",
      "Clear explanations for complex topics",
      "Automated study notes and test questions",
    ],
  },
  {
    step: "05",
    moduleNo: "MODULE 05",
    title: "Visual Automation",
    badge: "Automation with n8n",
    color: "cyan",
    icon: "i-lucide-cpu",
    description: "Build automated workflows that run in the background.",
    bullets: [
      "Triggers, actions, and AI nodes",
      "Automated research and content workflows",
      "Multi-step automated task execution",
    ],
  },
  {
    step: "06",
    moduleNo: "CAPSTONE",
    title: "The AI System Designer",
    badge: "Complete Workflow Control",
    color: "purple",
    icon: "i-lucide-rocket",
    description: "Apply automated workflows to your daily work and career.",
    bullets: [
      "From basic user to system designer",
      "Build reliable personal workflows",
      "Increase output in real-world work",
    ],
  },
];

const milestones = props.part === 1 ? part1Milestones : part2Milestones;
</script>

<template>
  <div class="h-full flex flex-col justify-between py-2">
    <!-- Header -->
    <div
      class="flex items-center justify-between border-b border-slate-800 pb-2"
    >
      <div>
        <div class="flex items-center gap-2">
          <span
            class="text-xs font-mono tracking-widest text-indigo-400 font-bold uppercase"
          >
            Curriculum Timeline &bull; Part {{ part }} of 2
          </span>
        </div>
        <h2 class="text-3xl font-extrabold text-white font-serif mt-1">
          {{
            part === 1
              ? "From Basic Concepts to Structured Prompts"
              : "From Active Learning to Automated Workflows"
          }}
        </h2>
      </div>
    </div>

    <!-- Timeline Area with SVG Path -->
    <div class="relative my-auto w-full">
      <!-- SVG Connecting Timeline Path -->
      <svg
        class="absolute -top-6 inset-0 w-full h-full pointer-events-none"
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
        <path
          d="M 150 40 L 150 75"
          stroke="#64748b"
          stroke-width="2"
          stroke-dasharray="3 3"
          opacity="0.7"
        />
        <path
          d="M 450 40 L 450 75"
          stroke="#64748b"
          stroke-width="2"
          stroke-dasharray="3 3"
          opacity="0.7"
        />
        <path
          d="M 750 40 L 750 75"
          stroke="#64748b"
          stroke-width="2"
          stroke-dasharray="3 3"
          opacity="0.7"
        />
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
            class="w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-xl z-10"
            :class="{
              'bg-indigo-950 border-indigo-400 text-indigo-300 shadow-indigo-500/30':
                m.color === 'indigo',
              'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-emerald-500/30':
                m.color === 'emerald',
              'bg-amber-950 border-amber-400 text-amber-300 shadow-amber-500/30':
                m.color === 'amber',
              'bg-pink-950 border-pink-400 text-pink-300 shadow-pink-500/30':
                m.color === 'pink',
              'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-cyan-500/30':
                m.color === 'cyan',
              'bg-purple-950 border-purple-400 text-purple-300 shadow-purple-500/30':
                m.color === 'purple',
            }"
          >
            <span :class="m.icon" class="w-5 h-5"></span>
          </div>

          <!-- Card Content -->
          <div
            class="w-full mt-4 p-4 rounded-xl bg-slate-900/90 border flex flex-col justify-between h-70"
            :class="{
              'border-indigo-500/40': m.color === 'indigo',
              'border-emerald-500/40': m.color === 'emerald',
              'border-amber-500/40': m.color === 'amber',
              'border-pink-500/40': m.color === 'pink',
              'border-cyan-500/40': m.color === 'cyan',
              'border-purple-500/40': m.color === 'purple',
            }"
          >
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[10px] font-mono font-bold text-slate-400">
                  {{ m.moduleNo }}
                </span>
              </div>

              <h3
                class="text-base font-bold text-white font-serif leading-tight mt-1"
              >
                {{ m.title }}
              </h3>

              <ul
                class="mt-3 space-y-1.5 text-xs text-slate-300 font-sans border-t border-slate-800/80 pt-2.5"
              >
                <li
                  v-for="(b, bIdx) in m.bullets"
                  :key="bIdx"
                  class="flex items-start gap-1.5 leading-snug"
                >
                  <span
                    class="i-lucide-circle-check w-3.5 h-3.5 shrink-0 mt-0.5"
                    :class="{
                      'text-indigo-400': m.color === 'indigo',
                      'text-emerald-400': m.color === 'emerald',
                      'text-amber-400': m.color === 'amber',
                      'text-pink-400': m.color === 'pink',
                      'text-cyan-400': m.color === 'cyan',
                      'text-purple-400': m.color === 'purple',
                    }"
                  ></span>
                  <span>{{ b }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
