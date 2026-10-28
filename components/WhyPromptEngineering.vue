<script setup lang="ts">
interface ProblemSolutionRow {
  id: string
  problemTitle: string
  problemDesc: string
  problemIcon: string
  solutionTitle: string
  solutionDesc: string
  solutionIcon: string
}

const rows: ProblemSolutionRow[] = [
  {
    id: 'hallucinations',
    problemTitle: 'Hallucinations',
    problemDesc: 'Invented facts, fake citations & phantom APIs',
    problemIcon: 'i-lucide-triangle-alert',
    solutionTitle: 'Grounded Context',
    solutionDesc: 'Source-anchored text & "admit unknown" rule',
    solutionIcon: 'i-lucide-shield-check',
  },
  {
    id: 'fluff',
    problemTitle: 'Generic Fluff',
    problemDesc: 'Bland corporate clichés & superficial generalities',
    problemIcon: 'i-lucide-cloud-fog',
    solutionTitle: 'Persona & Scope',
    solutionDesc: 'Explicit expert persona, audience & negative rules',
    solutionIcon: 'i-lucide-user-check',
  },
  {
    id: 'formatting',
    problemTitle: 'Format Chaos',
    problemDesc: 'Unstructured plain text breaks downstream code',
    problemIcon: 'i-lucide-layout-grid',
    solutionTitle: 'Strict Schemas',
    solutionDesc: 'Enforced JSON, Markdown tables & strict contracts',
    solutionIcon: 'i-lucide-code',
  },
  {
    id: 'reasoning',
    problemTitle: 'Logic Jumps',
    problemDesc: 'Rushed guessing on multi-step reasoning tasks',
    problemIcon: 'i-lucide-brain',
    solutionTitle: 'Chain-of-Thought',
    solutionDesc: 'Step-by-step logic breakdown before conclusion',
    solutionIcon: 'i-lucide-git-commit',
  },
]
</script>

<template>
  <div class="w-full max-w-4xl mx-auto mt-4 font-sans select-none text-left">
    <!-- Header Labels -->
    <div class="flex items-center justify-between px-3 mb-2 text-[10px] font-mono uppercase tracking-wider font-bold">
      <div class="flex items-center gap-1.5 text-red-400">
        <span class="i-lucide-circle-alert w-3.5 h-3.5"></span>
        <span>Common AI Failure (Problem)</span>
      </div>
      <div class="flex items-center gap-1.5 text-emerald-400">
        <span class="i-lucide-check-circle-2 w-3.5 h-3.5"></span>
        <span>Prompt Engineering Fix (Solution)</span>
      </div>
    </div>

    <!-- Rows: <Problem> -> <Solution> -->
    <div class="space-y-2.5">
      <div
        v-for="row in rows"
        :key="row.id"
        class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md transition-all hover:border-slate-700"
      >
        <!-- PROBLEM (Left) -->
        <div class="flex-1 flex items-center gap-3 p-2 rounded-lg bg-red-950/20 border border-red-500/20 min-w-0">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center bg-red-500/10 border border-red-500/30 shrink-0">
            <span :class="row.problemIcon" class="w-3.5 h-3.5 text-red-400"></span>
          </div>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-bold text-red-200 font-serif leading-tight">
              {{ row.problemTitle }}
            </div>
            <div class="text-[10px] text-slate-400 leading-tight truncate">
              {{ row.problemDesc }}
            </div>
          </div>
        </div>

        <!-- ARROW (Center) -->
        <div class="shrink-0 flex items-center justify-center">
          <div class="w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shadow-inner">
            <span class="i-lucide-arrow-right w-3.5 h-3.5 text-amber-400"></span>
          </div>
        </div>

        <!-- SOLUTION (Right) -->
        <div class="flex-1 flex items-center gap-3 p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20 min-w-0">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30 shrink-0">
            <span :class="row.solutionIcon" class="w-3.5 h-3.5 text-emerald-400"></span>
          </div>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-bold text-emerald-200 font-serif leading-tight">
              {{ row.solutionTitle }}
            </div>
            <div class="text-[10px] text-slate-300 leading-tight truncate">
              {{ row.solutionDesc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
