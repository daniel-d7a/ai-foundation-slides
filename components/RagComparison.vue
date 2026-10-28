<script setup lang="ts">
interface ComparisonPoint {
  icon: string
  text: string
}

const llmPoints: ComparisonPoint[] = [
  { icon: 'i-lucide-x-circle', text: 'Relies on public training data (cannot see your syllabus)' },
  { icon: 'i-lucide-triangle-alert', text: 'Prone to confident hallucinations on technical terms' },
  { icon: 'i-lucide-file-x', text: 'Cannot provide slide numbers or page citations' },
]

const ragPoints: ComparisonPoint[] = [
  { icon: 'i-lucide-check-circle-2', text: 'Anchored strictly to your uploaded slides and textbook' },
  { icon: 'i-lucide-shield-check', text: 'Matches your professor’s exact definitions and notation' },
  { icon: 'i-lucide-bookmark-check', text: 'Links directly to source slides and page citations' },
]
</script>

<template>
  <div class="grid grid-cols-2 gap-6 mt-6 w-full">
    <!-- Standard LLM -->
    <div
      v-click
      class="p-5 rounded-xl bg-slate-900/90 border-2 border-rose-500/40 flex flex-col justify-between h-84 transition-all hover:shadow-lg"
    >
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-rose-500/20 mb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <span class="i-lucide-bot text-lg"></span>
            </div>
            <h3 class="text-lg font-bold text-white font-serif">Standard LLM</h3>
          </div>
          <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-950/60 text-rose-300 border border-rose-500/30">
            Closed-Book
          </span>
        </div>

        <div class="space-y-3.5 text-xs text-slate-300 font-mono">
          <div
            v-for="pt in llmPoints"
            :key="pt.text"
            class="flex items-start gap-2.5"
          >
            <span :class="pt.icon" class="text-rose-400 text-sm mt-0.5 shrink-0"></span>
            <span class="leading-snug">{{ pt.text }}</span>
          </div>
        </div>
      </div>

      <div class="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20 text-[11px] font-mono text-rose-300 text-center font-medium">
        Verdict: High risk of subtle errors before exams
      </div>
    </div>

    <!-- RAG Study Partner -->
    <div
      v-click
      class="p-5 rounded-xl bg-slate-900/90 border-2 border-emerald-500/40 flex flex-col justify-between h-84 transition-all hover:shadow-lg"
    >
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <span class="i-lucide-book-open-check text-lg"></span>
            </div>
            <h3 class="text-lg font-bold text-white font-serif">RAG Study Partner</h3>
          </div>
          <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
            Open-Book
          </span>
        </div>

        <div class="space-y-3.5 text-xs text-slate-300 font-mono">
          <div
            v-for="pt in ragPoints"
            :key="pt.text"
            class="flex items-start gap-2.5"
          >
            <span :class="pt.icon" class="text-emerald-400 text-sm mt-0.5 shrink-0"></span>
            <span class="leading-snug">{{ pt.text }}</span>
          </div>
        </div>
      </div>

      <div class="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] font-mono text-emerald-300 text-center font-medium">
        Verdict: Verifiable, trusted study companion
      </div>
    </div>
  </div>
</template>
