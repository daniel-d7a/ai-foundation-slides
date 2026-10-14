<script setup lang="ts">
import { ref, computed } from 'vue'

interface MajorOption {
  id: string
  name: string
  tasks: {
    id: string
    title: string
    primaryTool: string
    secondaryTool: string
    why: string
    icon: string
  }[]
}

const majors: MajorOption[] = [
  {
    id: 'business',
    name: 'Business & Marketing',
    tasks: [
      {
        id: 'campaign',
        title: 'Launch a marketing campaign',
        primaryTool: 'Claude 3.7 + Canva AI',
        secondaryTool: 'Gemini (market research)',
        why: 'Claude provides nuanced tone and multi-format copy; Canva AI quickly turns text briefs into multi-channel visual ad formats.',
        icon: '📢',
      },
      {
        id: 'analysis',
        title: 'Analyze customer survey CSV',
        primaryTool: 'ChatGPT Advanced Data Analysis',
        secondaryTool: 'NotebookLM',
        why: 'Python sandbox runs instant regression analysis and churn prediction directly on spreadsheet uploads.',
        icon: '📊',
      },
    ],
  },
  {
    id: 'stem',
    name: 'CS & Engineering',
    tasks: [
      {
        id: 'build',
        title: 'Build a full-stack prototype',
        primaryTool: 'Cursor / Antigravity',
        secondaryTool: 'Claude (Architectural design)',
        why: 'Cursor & Antigravity provide multi-file context indexing, repo-wide edits, and autonomous terminal execution.',
        icon: '💻',
      },
      {
        id: 'debug',
        title: 'Debug legacy codebase & logs',
        primaryTool: 'GitHub Copilot + Gemini 2.0 Pro',
        secondaryTool: 'Perplexity',
        why: 'Gemini 2M token context window allows dumping the entire codebase + server log in a single prompt to pinpoint race conditions.',
        icon: '🐞',
      },
    ],
  },
  {
    id: 'humanities',
    name: 'Humanities & Pre-Med',
    tasks: [
      {
        id: 'literature',
        title: 'Synthesize 30 medical/research papers',
        primaryTool: 'NotebookLM + Perplexity',
        secondaryTool: 'Claude',
        why: 'NotebookLM grounds answers 100% in your uploaded source PDFs with inline citations, eliminating hallucinations.',
        icon: '📚',
      },
      {
        id: 'exam',
        title: 'Prepare for high-stakes board exam',
        primaryTool: 'Claude (Socratic Mode)',
        secondaryTool: 'NotebookLM Audio Overview',
        why: 'Acts as an interactive tutor challenging hypotheses rather than just spoon-feeding textbook answers.',
        icon: '🧠',
      },
    ],
  },
]

const selectedMajor = ref(majors[0].id)
const activeMajorObj = computed(() => majors.find(m => m.id === selectedMajor.value) || majors[0])
const selectedTask = ref(activeMajorObj.value.tasks[0].id)

const activeTaskObj = computed(() => {
  return activeMajorObj.value.tasks.find(t => t.id === selectedTask.value) || activeMajorObj.value.tasks[0]
})

function setMajor(id: string) {
  selectedMajor.value = id
  const m = majors.find(x => x.id === id)
  if (m) selectedTask.value = m.tasks[0].id
}
</script>

<template>
  <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-left">
    <!-- Step 1: Select Major -->
    <div class="flex items-center gap-3 mb-3">
      <span class="text-xs font-mono text-indigo-400 uppercase tracking-wide">1. Select Major:</span>
      <div class="flex gap-2">
        <button
          v-for="m in majors"
          :key="m.id"
          @click="setMajor(m.id)"
          class="px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer"
          :class="[
            selectedMajor === m.id
              ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
          ]"
        >
          {{ m.name }}
        </button>
      </div>
    </div>

    <!-- Step 2: Select Task -->
    <div class="flex items-center gap-3 mb-4">
      <span class="text-xs font-mono text-emerald-400 uppercase tracking-wide">2. Primary Task:</span>
      <div class="flex gap-2">
        <button
          v-for="t in activeMajorObj.tasks"
          :key="t.id"
          @click="selectedTask = t.id"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer"
          :class="[
            selectedTask === t.id
              ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
          ]"
        >
          <span>{{ t.icon }}</span>
          <span>{{ t.title }}</span>
        </button>
      </div>
    </div>

    <!-- Recommendation Output Box -->
    <div class="grid grid-cols-12 gap-3 p-3.5 rounded-xl bg-indigo-950/25 border border-indigo-500/30">
      <div class="col-span-5 flex flex-col gap-2 border-r border-indigo-500/20 pr-3">
        <div class="text-[11px] font-mono uppercase tracking-wider text-indigo-300">Recommended AI Stack</div>
        <div class="p-2.5 rounded-lg bg-indigo-900/40 border border-indigo-500/40">
          <div class="text-[10px] text-slate-400 uppercase font-mono">Core Driver</div>
          <div class="text-sm font-bold text-white mt-0.5">{{ activeTaskObj.primaryTool }}</div>
        </div>
        <div class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/60">
          <div class="text-[10px] text-slate-400 uppercase font-mono">Secondary / Companion</div>
          <div class="text-xs font-semibold text-slate-200 mt-0.5">{{ activeTaskObj.secondaryTool }}</div>
        </div>
      </div>

      <div class="col-span-7 flex flex-col justify-between pl-1">
        <div>
          <div class="text-[11px] font-mono uppercase tracking-wider text-emerald-400 mb-1.5">Architectural Rationale</div>
          <p class="text-xs text-slate-200 leading-relaxed">
            {{ activeTaskObj.why }}
          </p>
        </div>
        <div class="mt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Matches tool strength directly to task failure modes.
        </div>
      </div>
    </div>
  </div>
</template>
