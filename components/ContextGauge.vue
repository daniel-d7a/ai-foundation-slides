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
  { id: 1, title: 'System Prompt & Custom Instructions', tokens: 8, color: 'bg-purple-500' },
  { id: 2, title: 'Turn 1: Initial Question', tokens: 6, color: 'bg-blue-500' },
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
    { id: 1, title: 'System Prompt & Custom Instructions', tokens: 8, color: 'bg-purple-500' },
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
    if (item.id === 1) continue // system prompt pinned
    over -= item.tokens
    truncated++
    if (over <= 0) break
  }
  return truncated
})
</script>

<template>
  <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-left">
    <!-- Top Bar: Capacity & Meter -->
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono font-bold text-slate-200">Context Window Gauge</span>
        <span class="text-[11px] font-mono text-slate-400">({{ totalTokens }}k / {{ maxCapacity }}k Tokens)</span>
      </div>
      <div class="flex items-center gap-2">
        <span
          class="text-xs font-mono font-bold px-2 py-0.5 rounded"
          :class="isOverflow ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'"
        >
          {{ isOverflow ? '⚠️ CONTEXT OVERFLOW / TRUNCATING' : `${usagePercent}% Utilized` }}
        </span>
        <button
          @click="clearAll"
          class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Segmented Visual Bar -->
    <div class="w-full h-4 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex p-0.5 gap-0.5 mb-3">
      <div
        v-for="item in items"
        :key="item.id"
        :style="{ width: `${(item.tokens / maxCapacity) * 100}%` }"
        :class="[item.color, 'h-full rounded-sm transition-all duration-300 opacity-90 hover:opacity-100']"
        :title="`${item.title} (${item.tokens}k tokens)`"
      ></div>
    </div>

    <!-- Actions to inject tokens -->
    <div class="flex flex-wrap gap-2 mb-3">
      <button
        @click="addItem('Follow-up Discussion Turn', 8, 'bg-blue-500')"
        class="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:border-indigo-500 hover:text-white transition-all cursor-pointer"
      >
        + Add Chat Turn (8k)
      </button>
      <button
        @click="addItem('Attached 50-Page Course PDF', 35, 'bg-emerald-500')"
        class="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:border-emerald-500 hover:text-white transition-all cursor-pointer"
      >
        + Attach 50-page PDF (35k)
      </button>
      <button
        @click="addItem('Imported Git Repository', 45, 'bg-amber-500')"
        class="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:border-amber-500 hover:text-white transition-all cursor-pointer"
      >
        + Import Git Repo (45k)
      </button>
    </div>

    <!-- History / Memory Stack View -->
    <div class="grid grid-cols-12 gap-3 text-xs">
      <div class="col-span-8 p-2.5 rounded-lg bg-slate-950 border border-slate-800 h-36 overflow-y-auto flex flex-col gap-1.5">
        <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">Active Context Memory Stack (FIFO):</div>
        <div
          v-for="(item, idx) in items"
          :key="item.id"
          class="flex items-center justify-between p-1.5 rounded border text-[11px]"
          :class="[
            isOverflow && idx > 0 && idx <= truncatedCount
              ? 'bg-red-950/30 border-red-900/50 text-red-400 line-through opacity-50'
              : 'bg-slate-900/60 border-slate-800 text-slate-300'
          ]"
        >
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :class="item.color"></span>
            <span>{{ item.title }}</span>
          </div>
          <span class="font-mono text-slate-400">{{ item.tokens }}k tokens</span>
        </div>
      </div>

      <div class="col-span-4 p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-500/30 flex flex-col justify-between text-[11px]">
        <div>
          <div class="font-bold text-indigo-300 mb-1">Key Takeaway</div>
          <p class="text-slate-300 leading-relaxed">
            LLMs don't have infinite working memory. When tokens exceed the window limit or get too dense, early messages silently drop or suffer from <strong class="text-white">"Lost in the Middle"</strong> degradation.
          </p>
        </div>
        <div class="text-[10px] font-mono text-emerald-400 mt-2">
          💡 Gemini 2.0 (2M tokens) vs Claude (200k)
        </div>
      </div>
    </div>
  </div>
</template>
