<script setup lang="ts">
const steps = [
  {
    num: 1,
    title: 'Generate Blind Benchmark',
    desc: 'Prompt model for 5 conceptual problems requiring non-trivial multi-step deduction.',
  },
  {
    num: 2,
    title: 'Submit Raw Scratchpad Reasoning',
    desc: 'Answer without consulting textbook, web searches, or running a compiler.',
  },
  {
    num: 3,
    title: 'Diagnose Underlying Misconception',
    desc: 'Feed incorrect reasoning back to isolate the false premise behind the error.',
  },
  {
    num: 4,
    title: 'Prescribe Targeted Counter-Drills',
    desc: 'Solve 3 focused variants engineered specifically to reinforce the blind spot.',
  },
]
</script>

<template>
  <div class="grid grid-cols-12 gap-4 mt-5 text-xs text-left">
    <!-- Visual Step Pipeline -->
    <div class="col-span-6 p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 flex flex-col justify-between h-72">
      <div class="space-y-2">
        <div class="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider mb-1">
          The 4-Step Diagnostic Loop:
        </div>
        <div
          v-for="s in steps"
          :key="s.num"
          class="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950 border border-slate-800"
        >
          <span class="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
            {{ s.num }}
          </span>
          <div class="font-sans text-slate-200 text-[11px]">
            <strong>{{ s.title }}:</strong> {{ s.desc }}
          </div>
        </div>
      </div>
    </div>

    <!-- Live Prompt & Pedagogical Mechanism -->
    <div class="col-span-6 p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex flex-col justify-between h-72">
      <div>
        <div class="text-xs font-mono text-emerald-400 font-bold uppercase mb-1.5">
          Live Diagnostic Prompt:
        </div>
        <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed max-h-44 overflow-y-auto whitespace-pre-wrap">
"Here are my 2 incorrect answers to the dynamic programming practice test, along with the scratchpad logic I used to arrive at them. Do not provide the correct code.

Instead:
1) Pinpoint the false mental assumption I made regarding overlapping subproblems vs optimal substructure
2) Explain why my heuristic failed
3) Generate 2 simpler benchmark exercises targeting this exact distinction."
        </div>
      </div>
      <div class="text-[11px] font-mono text-emerald-300 border-t border-slate-800 pt-2">
        Eliminates wasted hours spent re-reading already mastered material
      </div>
    </div>
  </div>
</template>
