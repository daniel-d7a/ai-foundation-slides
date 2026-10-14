<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'direct' | 'socratic'>('socratic')
</script>

<template>
  <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-left">
    <!-- Mode Switcher -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono text-slate-400">Interaction Framework:</span>
        <div class="flex p-0.5 rounded-lg bg-slate-950 border border-slate-800">
          <button
            @click="activeTab = 'direct'"
            class="px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer"
            :class="activeTab === 'direct' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-slate-400 hover:text-slate-200'"
          >
            ❌ Passive Answer Mode (Copy/Paste)
          </button>
          <button
            @click="activeTab = 'socratic'"
            class="px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer"
            :class="activeTab === 'socratic' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'"
          >
            ✅ Socratic Tutor Mode (Cognitive Growth)
          </button>
        </div>
      </div>
      <span class="text-[10px] font-mono text-indigo-400">Student Question: "Why does QuickSort run in O(n log n)?"</span>
    </div>

    <!-- Mode Comparison Views -->
    <div v-if="activeTab === 'direct'" class="grid grid-cols-12 gap-3">
      <div class="col-span-8 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed h-52 overflow-y-auto">
        <div class="text-[10px] text-slate-500 uppercase font-bold mb-2">Prompt: "Explain QuickSort time complexity."</div>
        <p class="text-slate-400">
          "QuickSort has an average-case time complexity of O(n log n) because in each recursive step, the array is partitioned around a pivot into two sub-arrays. Partitioning takes O(n) time. If the pivot splits the array into roughly equal halves, the recursion tree has a depth of log n. Multiplying work per level (n) by tree depth (log n) gives O(n log n). However, in the worst case (already sorted array with bad pivot), the depth is n, resulting in O(n^2)..."
        </p>
      </div>
      <div class="col-span-4 p-3 rounded-lg bg-red-950/20 border border-red-500/30 flex flex-col justify-between text-xs">
        <div>
          <div class="font-bold text-red-400 mb-1.5">Outcome: Zero Retention</div>
          <p class="text-slate-300 leading-relaxed text-[11px]">
            The student reads the textbook block, closes the tab, and retains almost nothing 24 hours later. Passive reading creates the <strong class="text-white">illusion of competence</strong>.
          </p>
        </div>
        <div class="text-[10px] font-mono text-red-400">
          ⚠️ Illusion of understanding
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-12 gap-3">
      <div class="col-span-8 p-3 rounded-lg bg-slate-950 border border-emerald-500/30 font-mono text-xs text-slate-200 leading-relaxed h-52 overflow-y-auto flex flex-col gap-2">
        <div class="text-[10px] text-emerald-400 uppercase font-bold">Prompt: "Act as a Socratic CS tutor. Guide me to understand QuickSort complexity through questions. Do not give the answer."</div>
        
        <div class="p-2 rounded bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-[11px]">
          🤖 <strong>AI:</strong> "Let's break it down! Imagine you have 8 cards. If you pick a middle card and split the remaining cards into lower and higher piles, how many comparison steps did that single split take?"
        </div>
        <div class="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
          🧑‍🎓 <strong>Student:</strong> "I had to compare each card against the pivot, so 7 or 8 comparisons."
        </div>
        <div class="p-2 rounded bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-[11px]">
          🤖 <strong>AI:</strong> "Exactly, so roughly <em>n</em> steps. Now, if you keep halving an 8-item deck, how many times can you divide it until each pile has just 1 card?"
        </div>
      </div>

      <div class="col-span-4 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between text-xs">
        <div>
          <div class="font-bold text-emerald-400 mb-1.5">Outcome: Deep Intuition</div>
          <p class="text-slate-300 leading-relaxed text-[11px]">
            Active recall and progressive hypothesis testing force the student's brain to construct the mathematical proof themselves.
          </p>
        </div>
        <div class="text-[10px] font-mono text-emerald-300">
          ✨ 10x long-term concept retention
        </div>
      </div>
    </div>
  </div>
</template>
