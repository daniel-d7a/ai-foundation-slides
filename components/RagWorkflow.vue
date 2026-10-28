<script setup lang="ts">
interface WorkflowStage {
  num: string
  title: string
  icon: string
  accent: 'indigo' | 'cyan' | 'emerald'
  action: string
  bullets: string[]
  pill: string
}

const stages: WorkflowStage[] = [
  {
    num: '01',
    title: 'Upload & Chunk',
    icon: 'i-lucide-file-text',
    accent: 'indigo',
    action: 'Feed lecture slides, syllabus, and textbook PDFs into the tool.',
    bullets: ['Parses text, code, and tables', 'Splits into semantic units'],
    pill: 'Prepares your knowledge base',
  },
  {
    num: '02',
    title: 'Ask & Match',
    icon: 'i-lucide-search',
    accent: 'cyan',
    action: 'Ask any conceptual question or request practice problems.',
    bullets: ['Semantic search runs', 'Fetches 3–5 top passages'],
    pill: 'Zero irrelevant clutter',
  },
  {
    num: '03',
    title: 'Review & Verify',
    icon: 'i-lucide-check-circle-2',
    accent: 'emerald',
    action: 'Read generated explanations and inspect inline page citations.',
    bullets: ['Answers grounded in your files', 'One-click source verification'],
    pill: 'Exam-ready confidence',
  },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-5 mt-6 w-full">
    <div
      v-for="st in stages"
      :key="st.num"
      v-click
      class="p-5 rounded-xl bg-slate-900/90 border border-slate-700/80 flex flex-col justify-between h-80 transition-all hover:shadow-lg"
      :class="[
        st.accent === 'indigo' ? 'hover:border-indigo-500/50' :
        st.accent === 'cyan' ? 'hover:border-cyan-500/50' :
        'hover:border-emerald-500/50'
      ]"
    >
      <div>
        <div class="flex items-center gap-3 mb-3">
          <div
            class="w-8 h-8 rounded-lg border flex items-center justify-center font-mono font-bold text-xs"
            :class="[
              st.accent === 'indigo' ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400' :
              st.accent === 'cyan' ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' :
              'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
            ]"
          >
            {{ st.num }}
          </div>
          <h3 class="text-base font-bold text-white font-serif">{{ st.title }}</h3>
        </div>

        <p class="text-xs text-slate-300 leading-relaxed mb-3 font-sans">
          {{ st.action }}
        </p>

        <div class="text-[11px] font-mono text-slate-400 space-y-1.5">
          <div
            v-for="b in st.bullets"
            :key="b"
            class="flex items-center gap-1.5"
          >
            <span
              class="i-lucide-check text-xs shrink-0"
              :class="[
                st.accent === 'indigo' ? 'text-indigo-400' :
                st.accent === 'cyan' ? 'text-cyan-400' :
                'text-emerald-400'
              ]"
            ></span>
            <span>{{ b }}</span>
          </div>
        </div>
      </div>

      <div
        class="text-[10px] font-mono px-2 py-1 rounded border text-center font-medium"
        :class="[
          st.accent === 'indigo' ? 'text-indigo-300 bg-indigo-950/40 border-indigo-500/20' :
          st.accent === 'cyan' ? 'text-cyan-300 bg-cyan-950/40 border-cyan-500/20' :
          'text-emerald-300 bg-emerald-950/40 border-emerald-500/20'
        ]"
      >
        {{ st.pill }}
      </div>
    </div>
  </div>
</template>
