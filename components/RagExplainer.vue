<script setup lang="ts">
interface StepPillar {
  step: string
  title: string
  icon: string
  color: string
  border: string
  badgeBg: string
  badgeText: string
  desc: string
  tag: string
}

const steps: StepPillar[] = [
  {
    step: 'STEP 01',
    title: 'Retrieve',
    icon: 'i-lucide-search',
    color: 'indigo',
    border: 'border-indigo-500/40',
    badgeBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
    badgeText: 'text-indigo-300',
    desc: 'When you ask a question, the system searches your uploaded PDFs and notes for relevant passages.',
    tag: 'Finds exact paragraphs instead of guessing',
  },
  {
    step: 'STEP 02',
    title: 'Augment',
    icon: 'i-lucide-layers',
    color: 'cyan',
    border: 'border-cyan-500/40',
    badgeBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    badgeText: 'text-cyan-300',
    desc: 'The retrieved snippets are automatically injected into the AI prompt as verified context.',
    tag: 'Loads source truth into prompt memory',
  },
  {
    step: 'STEP 03',
    title: 'Generate',
    icon: 'i-lucide-sparkles',
    color: 'emerald',
    border: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    badgeText: 'text-emerald-300',
    desc: 'The LLM synthesizes a targeted answer strictly from those passages, complete with citations.',
    tag: 'Accurate answers with direct citations',
  },
]
</script>

<template>
  <div class="mt-6 w-full">
    <div class="grid grid-cols-3 gap-5">
      <div
        v-for="s in steps"
        :key="s.step"
        v-click
        class="p-5 rounded-xl bg-slate-900/90 border-2 flex flex-col justify-between h-76 transition-all hover:shadow-lg"
        :class="s.border"
      >
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-lg border flex items-center justify-center shrink-0"
              :class="s.badgeBg"
            >
              <span :class="s.icon" class="text-xl"></span>
            </div>
            <div>
              <span class="text-[10px] font-mono uppercase tracking-wider font-bold" :class="s.badgeText">{{ s.step }}</span>
              <h3 class="text-lg font-bold text-white font-serif leading-tight">{{ s.title }}</h3>
            </div>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed font-sans">
            {{ s.desc }}
          </p>
        </div>

        <div
          class="p-2.5 rounded-lg border text-[11px] font-mono text-center font-medium"
          :class="[
            s.color === 'indigo' ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300' :
            s.color === 'cyan' ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300' :
            'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
          ]"
        >
          {{ s.tag }}
        </div>
      </div>
    </div>

    <div
      v-click
      class="mt-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2.5 text-xs text-slate-300 font-sans"
    >
      <span class="i-lucide-lightbulb text-amber-400 text-sm shrink-0"></span>
      <span>
        <strong class="text-white">The Exam Analogy:</strong> A regular LLM takes a closed-book test from memory. RAG takes an open-book exam with your course notes open.
      </span>
    </div>
  </div>
</template>
