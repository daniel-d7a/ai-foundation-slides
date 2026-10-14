<script setup lang="ts">
import { ref, computed } from 'vue'

interface MemoryItem {
  id: number
  title: string
  tokens: number
  color: string
}

const maxCapacity = 100 // represents 100k tokens
const items = ref<MemoryItem[]>([
  { id: 1, title: 'System Instructions & Persona Definition', tokens: 8, color: 'bg-purple-500' },
  { id: 2, title: 'Turn 1: Project Overview & Scope Brief', tokens: 12, color: 'bg-blue-500' },
])

let counter = 3

function addItem(title: string, tokens: number, color: string) {
  items.value.push({
    id: counter++,
    title,
    tokens,
    color,
  })
}

function clearAll() {
  items.value = [
    { id: 1, title: 'System Instructions & Persona Definition', tokens: 8, color: 'bg-purple-500' },
  ]
}

function runCompaction() {
  // Compaction merges past conversation turns into a compressed semantic executive summary
  const sys = items.value.find(i => i.id === 1) || { id: 1, title: 'System Instructions', tokens: 8, color: 'bg-purple-500' }
  const totalPrevious = items.value.filter(i => i.id !== 1).reduce((acc, c) => acc + c.tokens, 0)
  const compressedTokens = Math.max(6, Math.round(totalPrevious * 0.15))

  items.value = [
    sys,
    {
      id: counter++,
      title: `[Compacted Context Summary: ${totalPrevious}k &rarr; ${compressedTokens}k]`,
      tokens: compressedTokens,
      color: 'bg-emerald-500',
    },
    {
      id: counter++,
      title: 'Current Active User Instruction',
      tokens: 6,
      color: 'bg-indigo-500',
    },
  ]
}

const totalTokens = computed(() => items.value.reduce((acc, curr) => acc + curr.tokens, 0))
const usagePercent = computed(() => Math.min(100, Math.round((totalTokens.value / maxCapacity) * 100)))
const isOverflow = computed(() => totalTokens.value > maxCapacity)

const truncatedCount = computed(() => {
  if (!isOverflow.value) return 0
  let over = totalTokens.value - maxCapacity
  let truncated = 0
  for (const item of items.value) {
    if (item.id === 1) continue
    over -= item.tokens
    truncated++
    if (over <= 0) break
  }
  return truncated
})
</script>

<template>
  <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 text-left">
    <!-- Top Bar: Capacity, Status & Compaction Action -->
    <div class="flex items-center justify-between mb-2.5">
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono font-bold text-slate-200">Context Window Gauge</span>
        <span class="text-[11px] font-mono text-slate-400">({{ totalTokens }}k / {{ maxCapacity }}k Tokens)</span>
      </div>

      <div class="flex items-center gap-2">
        <!-- Compaction Mechanism Button -->
        <button
          @click="runCompaction"
          class="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600/30 border border-emerald-500/60 hover:bg-emerald-600/50 text-emerald-200 text-xs font-mono font-bold transition-all cursor-pointer"
        >
          <span class="i-lucide-shrink w-3.5 h-3.5"></span>
          <span>Compact Context (Summarize)</span>
        </button>

        <span
          class="text-xs font-mono font-bold px-2 py-0.5 rounded"
          :class="isOverflow ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-slate-800 text-slate-300 border border-slate-700'"
        >
          {{ isOverflow ? 'OVERFLOW (TRUNCATING)' : `${usagePercent}% Utilized` }}
        </span>

        <button
          @click="clearAll"
          class="text-[11px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Segmented Visual Memory Bar -->
    <div class="w-full h-4 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex p-0.5 gap-0.5 mb-3">
      <div
        v-for="item in items"
        :key="item.id"
        :style="{ width: `${(item.tokens / maxCapacity) * 100}%` }"
        :class="[item.color, 'h-full rounded-sm transition-all duration-300 opacity-90 hover:opacity-100']"
        :title="`${item.title} (${item.tokens}k tokens)`"
      ></div>
    </div>

    <!-- Actions to Inject Tokens -->
    <div class="flex flex-wrap gap-2 mb-3">
      <button
        @click="addItem('Follow-up Conversation Turns', 10, 'bg-blue-500')"
        class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:border-indigo-500 hover:text-white transition-all cursor-pointer"
      >
        <span class="i-lucide-message-square w-3.5 h-3.5 text-blue-400"></span>
        <span>+ Add 10 Chat Turns (10k)</span>
      </button>

      <button
        @click="addItem('Attached 60-Page Syllabus PDF', 38, 'bg-cyan-500')"
        class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:border-cyan-500 hover:text-white transition-all cursor-pointer"
      >
        <span class="i-lucide-file-text w-3.5 h-3.5 text-cyan-400"></span>
        <span>+ Attach 60-Page PDF (38k)</span>
      </button>

      <button
        @click="addItem('Imported Monorepo Source Tree', 50, 'bg-amber-500')"
        class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:border-amber-500 hover:text-white transition-all cursor-pointer"
      >
        <span class="i-lucide-folder-git-2 w-3.5 h-3.5 text-amber-400"></span>
        <span>+ Import Git Monorepo (50k)</span>
      </button>
    </div>

    <!-- Memory Stack & Compaction Mechanism Explainer -->
    <div class="grid grid-cols-12 gap-3 text-xs">
      <div class="col-span-8 p-2.5 rounded-lg bg-slate-950 border border-slate-800 h-40 overflow-y-auto flex flex-col gap-1.5">
        <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-0.5">Active Context Memory Stack (FIFO):</div>
        <div
          v-for="(item, idx) in items"
          :key="item.id"
          class="flex items-center justify-between p-1.5 rounded border text-[11px]"
          :class="[
            isOverflow && idx > 0 && idx <= truncatedCount
              ? 'bg-red-950/40 border-red-900/60 text-red-400 line-through opacity-50'
              : 'bg-slate-900/70 border-slate-800 text-slate-300'
          ]"
        >
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :class="item.color"></span>
            <span class="font-mono">{{ item.title }}</span>
          </div>
          <span class="font-mono text-slate-400">{{ item.tokens }}k tokens</span>
        </div>
      </div>

      <div class="col-span-4 p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between text-[11px]">
        <div>
          <div class="font-bold text-white font-serif mb-1 text-xs">Compaction Architecture</div>
          <p class="text-slate-300 leading-relaxed font-sans">
            When token limits approach saturation, agent systems perform an autonomous recursive summarization pass—distilling historic turns into a dense semantic state block while retaining system instructions.
          </p>
        </div>
        <div class="text-[10px] font-mono text-emerald-400 mt-2">
          Reduces token overhead by up to 85%
        </div>
      </div>
    </div>
  </div>
</template>
