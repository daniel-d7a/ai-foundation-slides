<script setup lang="ts">
import { ref, computed } from 'vue'

interface TaskOption {
  id: string
  title: string
  iconClass: string
  primaryTool: string
  secondaryTool: string
  why: string
  samplePrompt: string
}

interface MajorOption {
  id: string
  name: string
  iconClass: string
  tasks: TaskOption[]
}

const majors: MajorOption[] = [
  {
    id: 'business',
    name: 'Business & Marketing',
    iconClass: 'i-lucide-briefcase',
    tasks: [
      {
        id: 'campaign',
        title: 'Launch a Multi-Channel Campaign',
        iconClass: 'i-lucide-megaphone',
        primaryTool: 'Claude 3.5 Sonnet + Canva AI',
        secondaryTool: 'Gemini 2.0 (Competitor Analysis)',
        why: 'Claude provides calibrated brand tone and structured copywriting; Canva AI converts briefs into ready-to-publish social ad formats.',
        samplePrompt: 'Act as a Senior Growth Strategist. We are launching an AI productivity app for undergraduate students. Create a 3-part Instagram launch angle focusing on exam cramming anxiety. Return output as a table: [Hook] | [Visual Scene] | [CTA]. Do not use corporate buzzwords.',
      },
      {
        id: 'analysis',
        title: 'Analyze Customer Retention CSV',
        iconClass: 'i-lucide-bar-chart-2',
        primaryTool: 'ChatGPT Advanced Data Analysis',
        secondaryTool: 'NotebookLM',
        why: 'Built-in sandboxed Python runtime computes cohort churn curves, calculates statistical significance, and generates instant visualization charts.',
        samplePrompt: 'I have uploaded customer_orders.csv. Clean missing values in the "churn_status" column, calculate the 30-day retention rate by acquisition source, and generate a seaborn bar chart showing top 3 drop-off points.',
      },
    ],
  },
  {
    id: 'stem',
    name: 'CS & Engineering',
    iconClass: 'i-lucide-code-2',
    tasks: [
      {
        id: 'build',
        title: 'Build Full-Stack Prototype',
        iconClass: 'i-lucide-layers',
        primaryTool: 'Cursor / Antigravity',
        secondaryTool: 'Claude 3.5 Sonnet (System Architecture)',
        why: 'Cursor and Antigravity index the entire repository into a vector AST, enabling atomic multi-file edits and terminal execution with live diff verification.',
        samplePrompt: 'Analyze the authentication middleware in @server/auth.ts. Refactor the JWT token validation to support refresh token rotation, update the unit tests in @tests/auth.test.ts, and ensure no breaking changes in existing route handlers.',
      },
      {
        id: 'debug',
        title: 'Debug Distributed Trace Logs',
        iconClass: 'i-lucide-bug',
        primaryTool: 'Gemini 2.0 Pro (2M Context)',
        secondaryTool: 'GitHub Copilot',
        why: 'The 2-million-token window ingests entire server error dumps alongside the full codebase to identify subtle concurrency race conditions.',
        samplePrompt: 'Attached is a 400KB server stack trace and our order processing worker. Scan for deadlocks occurring between Redis lock acquisition and PostgreSQL commit. Pinpoint the exact line of failure and explain the fix.',
      },
    ],
  },
  {
    id: 'humanities',
    name: 'Humanities & Health',
    iconClass: 'i-lucide-book-open',
    tasks: [
      {
        id: 'literature',
        title: 'Synthesize 30 Research Papers',
        iconClass: 'i-lucide-file-text',
        primaryTool: 'NotebookLM + Perplexity Pro',
        secondaryTool: 'Claude 3.5 Sonnet',
        why: 'NotebookLM grounds all outputs strictly within your uploaded source PDFs with verified inline quotes, completely eliminating hallucinations.',
        samplePrompt: 'Based exclusively on the 8 clinical study PDFs uploaded to this notebook, synthesize the reported efficacy of cognitive behavioral therapy vs SSRIs in adolescent insomnia. Include clickable citation anchors for each finding.',
      },
      {
        id: 'exam',
        title: 'Socratic Medical Board Prep',
        iconClass: 'i-lucide-brain',
        primaryTool: 'Claude 3.5 Sonnet (Tutor Mode)',
        secondaryTool: 'NotebookLM Audio Overview',
        why: 'Challenges diagnostic hypotheses and guides you through differential diagnosis without prematurely revealing the textbook answer.',
        samplePrompt: 'Act as a clinical attending physician preparing a resident for USMLE Step 2. Present a patient case history with acute shortness of breath. Do not give the diagnosis. Ask me for my diagnostic workup plan first.',
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
  <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 text-left">
    <!-- Step 1: Select Major -->
    <div class="flex items-center gap-3 mb-2.5">
      <span class="text-xs font-mono text-indigo-400 uppercase tracking-wider font-bold">1. Select Domain:</span>
      <div class="flex gap-2">
        <button
          v-for="m in majors"
          :key="m.id"
          @click="setMajor(m.id)"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer"
          :class="[
            selectedMajor === m.id
              ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
          ]"
        >
          <span :class="m.iconClass" class="w-3.5 h-3.5"></span>
          <span class="font-serif font-bold">{{ m.name }}</span>
        </button>
      </div>
    </div>

    <!-- Step 2: Select Task -->
    <div class="flex items-center gap-3 mb-3">
      <span class="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">2. Specific Task:</span>
      <div class="flex gap-2">
        <button
          v-for="t in activeMajorObj.tasks"
          :key="t.id"
          @click="selectedTask = t.id"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer"
          :class="[
            selectedTask === t.id
              ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
          ]"
        >
          <span :class="t.iconClass" class="w-3.5 h-3.5"></span>
          <span>{{ t.title }}</span>
        </button>
      </div>
    </div>

    <!-- Recommendations & Sample Prompt Grid -->
    <div class="grid grid-cols-12 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
      <!-- Tool Stack -->
      <div class="col-span-4 flex flex-col justify-between pr-3 border-r border-slate-800">
        <div>
          <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">Recommended Primary Engine</div>
          <div class="p-2.5 rounded-lg bg-slate-900 border border-indigo-500/40">
            <div class="text-xs font-bold text-white font-serif">{{ activeTaskObj.primaryTool }}</div>
          </div>
          
          <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-2.5 mb-1 font-bold">Secondary Companion</div>
          <div class="p-2 rounded-lg bg-slate-900 border border-slate-700">
            <div class="text-[11px] font-medium text-slate-300 font-serif">{{ activeTaskObj.secondaryTool }}</div>
          </div>
        </div>

        <div class="text-[11px] text-slate-300 mt-2 font-sans leading-tight">
          {{ activeTaskObj.why }}
        </div>
      </div>

      <!-- Sample Prompt Display -->
      <div class="col-span-8 flex flex-col justify-between pl-1">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Production-Ready Prompt Template</span>
            <span class="text-[10px] font-mono text-slate-400">Ready to test</span>
          </div>
          <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-200 leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
            {{ activeTaskObj.samplePrompt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
