<script setup lang="ts">
interface PipelineStagePreview {
  num: string
  title: string
  status: string
  active?: boolean
}

const pipelineSteps: PipelineStagePreview[] = [
  { num: '01', title: 'Grounded Ingestion (RAG)', status: 'Up Next', active: true },
  { num: '02', title: 'Active Recall Practice', status: 'Step 2' },
  { num: '03', title: 'Interactive Drills', status: 'Step 3' },
]
</script>

<template>
  <div class="grid grid-cols-2 gap-6 mt-6 w-full">
    <!-- Tool in Action: NotebookLM -->
    <div
      v-click
      class="p-5 rounded-xl bg-slate-900/90 border border-indigo-500/40 flex flex-col justify-between h-84 transition-all hover:shadow-lg"
    >
      <div>
        <div class="flex items-center gap-3 mb-3">
          <div class="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <span class="i-lucide-book-open text-lg"></span>
          </div>
          <div>
            <span class="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">RAG in Action</span>
            <h3 class="text-base font-bold text-white font-serif">Google NotebookLM</h3>
          </div>
        </div>

        <p class="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
          You don’t need to build RAG from scratch to use it. Turnkey student tools give you a personal AI study partner grounded entirely in your uploaded files.
        </p>

        <div class="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs font-mono text-slate-300">
          <div class="flex items-center gap-2">
            <span class="i-lucide-check text-emerald-400 text-xs shrink-0"></span>
            <span>Upload up to 50 sources (PDFs, slides, docs)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="i-lucide-check text-emerald-400 text-xs shrink-0"></span>
            <span>Generate grounded study guides, FAQs & podcasts</span>
          </div>
        </div>
      </div>

      <div class="text-[11px] font-mono text-indigo-300 bg-indigo-950/40 px-2.5 py-1.5 rounded border border-indigo-500/30 text-center font-medium">
        Zero coding • Upload materials & study immediately
      </div>
    </div>

    <!-- Segue into the 3-Step Study Framework -->
    <div
      v-click
      class="p-5 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex flex-col justify-between h-84 transition-all hover:shadow-lg"
    >
      <div>
        <div class="flex items-center gap-3 mb-3">
          <div class="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <span class="i-lucide-git-branch text-lg"></span>
          </div>
          <div>
            <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Framework Segue</span>
            <h3 class="text-base font-bold text-white font-serif">The 3-Step AI Study Method</h3>
          </div>
        </div>

        <p class="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
          RAG powers Stage 1 of our active learning system before we build flashcards or drills:
        </p>

        <div class="space-y-2.5 text-xs font-mono">
          <div
            v-for="step in pipelineSteps"
            :key="step.num"
            class="p-2.5 rounded-lg flex items-center justify-between border"
            :class="[
              step.active
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800/40 border-slate-700/40 text-slate-400'
            ]"
          >
            <div class="flex items-center gap-2">
              <span class="font-bold">{{ step.num }}.</span>
              <span>{{ step.title }}</span>
            </div>
            <span
              class="text-[10px] uppercase font-bold"
              :class="step.active ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-500'"
            >
              {{ step.status }}
              <span v-if="step.active" class="i-lucide-arrow-right text-xs"></span>
            </span>
          </div>
        </div>
      </div>

      <div class="text-[11px] font-mono text-emerald-300 bg-emerald-950/40 px-2.5 py-1.5 rounded border border-emerald-500/30 text-center font-medium">
        First step: Grounding your AI in course materials
      </div>
    </div>
  </div>
</template>
