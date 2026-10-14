<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'socratic' | 'direct'>('socratic')
</script>

<template>
  <div class="flex flex-col gap-2.5 text-left">
    <!-- Student Prompt Question Displayed Outside & Above Card -->
    <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
      <div class="flex items-center gap-2.5">
        <span class="i-lucide-help-circle w-4 h-4 text-indigo-400 shrink-0"></span>
        <span class="text-xs font-mono text-slate-400">Student Question:</span>
        <span class="text-xs font-bold text-white font-serif">"Why does QuickSort run in O(n log n) average time, but O(n²) worst case?"</span>
      </div>

      <!-- Mode Switcher -->
      <div class="flex p-0.5 rounded-lg bg-slate-900 border border-slate-800">
        <button
          @click="activeTab = 'socratic'"
          class="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer"
          :class="activeTab === 'socratic' ? 'bg-emerald-600/30 text-emerald-200 border border-emerald-500/50 shadow-sm' : 'text-slate-400 hover:text-slate-200'"
        >
          <span class="i-lucide-brain-circuit w-3.5 h-3.5 text-emerald-400"></span>
          <span>Socratic Tutor (Active Mastery)</span>
        </button>

        <button
          @click="activeTab = 'direct'"
          class="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer"
          :class="activeTab === 'direct' ? 'bg-red-600/30 text-red-200 border border-red-500/50 shadow-sm' : 'text-slate-400 hover:text-slate-200'"
        >
          <span class="i-lucide-file-x w-3.5 h-3.5 text-red-400"></span>
          <span>Passive Answer (Textbook Dump)</span>
        </button>
      </div>
    </div>

    <!-- Main Card Body -->
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60">
      <div v-if="activeTab === 'socratic'" class="grid grid-cols-12 gap-4">
        <!-- Multi-turn Socratic Transcript -->
        <div class="col-span-8 p-3 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono text-xs leading-relaxed h-64 overflow-y-auto space-y-2.5">
          <div class="p-2 rounded bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-[11px]">
            <div class="text-[10px] uppercase font-bold text-indigo-400 mb-0.5">Tutor AI:</div>
            "Let's build the intuition from scratch! Imagine you have an unsorted deck of 8 cards. If you pick one pivot card and partition the other 7 cards into 'lower' and 'higher' piles, how many card comparisons did that single pass require?"
          </div>

          <div class="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
            <div class="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Student:</div>
            "I had to compare each of the other cards against the pivot once, so 7 comparisons. Roughly n steps."
          </div>

          <div class="p-2 rounded bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-[11px]">
            <div class="text-[10px] uppercase font-bold text-indigo-400 mb-0.5">Tutor AI:</div>
            "Spot on! Now imagine each pivot splits the cards perfectly in half (4 and 4, then 2 and 2). How many times can you divide an 8-card pile in half until you reach 1-card piles?"
          </div>

          <div class="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
            <div class="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Student:</div>
            "3 times, because 2³ = 8. That's log₂(8) levels!"
          </div>

          <div class="p-2 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-[11px]">
            <div class="text-[10px] uppercase font-bold text-emerald-400 mb-0.5">Tutor AI (Synthesis):</div>
            "Boom! Exactly: n work per level &times; log n recursive tree levels = O(n log n). Now, what happens if the pivot chosen is always the absolute largest card in the pile?"
          </div>
        </div>

        <!-- Pedagogy Value Breakdown -->
        <div class="col-span-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div>
            <div class="text-xs font-bold text-emerald-300 font-serif mb-1.5">Cognitive Impact</div>
            <p class="text-slate-300 text-xs leading-relaxed font-sans">
              The student's brain is forced into hypothesis formulation and active deduction. They derive the mathematical proof internally rather than passively scanning symbols.
            </p>
          </div>
          <div class="space-y-1.5 text-[11px] font-mono text-slate-300 border-t border-slate-800 pt-2">
            <div class="text-emerald-400">&check; High neural synaptic encoding</div>
            <div class="text-emerald-400">&check; Zero illusion of competence</div>
            <div class="text-emerald-400">&check; Prepares for unseen exam variants</div>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-12 gap-4">
        <!-- Direct Answer Dump -->
        <div class="col-span-8 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed h-64 overflow-y-auto">
          <div class="text-[10px] text-slate-500 uppercase font-bold mb-2">Prompt: "Explain QuickSort complexity."</div>
          <p class="text-slate-400">
            QuickSort exhibits an average-case time complexity of O(n log n) based on recurrence relation T(n) = 2T(n/2) + O(n). In the ideal partition case, the array is partitioned evenly around the pivot, yielding a recursion tree depth bounded by log₂(n). Since each level of the recursion tree requires a linear O(n) scan to partition elements, the total work across all levels is O(n &times; log n).
            <br><br>
            However, when the chosen pivot is maximally unbalanced (such as selecting the smallest or largest element on an already sorted array), the recurrence degrades to T(n) = T(n-1) + O(n), which resolves to an arithmetic progression summing to n(n-1)/2, producing an O(n²) worst-case runtime...
          </p>
        </div>

        <div class="col-span-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div>
            <div class="text-xs font-bold text-red-400 font-serif mb-1.5">The Illusion of Competence</div>
            <p class="text-slate-300 text-xs leading-relaxed font-sans">
              Passive reading feels smooth, but memory decay is near 90% after 48 hours. The student recognizes the words but cannot reproduce the logic on an exam paper.
            </p>
          </div>
          <div class="text-[11px] font-mono text-red-400 border-t border-slate-800 pt-2">
            &cross; Zero active recall trigger
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
