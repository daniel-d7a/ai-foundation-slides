<script setup lang="ts">
import { ref, computed } from 'vue'

const activeBlocks = ref({
  persona: true,
  context: false,
  task: true,
  format: false,
  cot: false,
})

const blocks = [
  {
    key: 'persona',
    label: 'Persona',
    color: 'bg-purple-500/20 border-purple-500 text-purple-300',
    snippet: 'Act as an expert Staff Software Engineer & patient CS Mentor.',
  },
  {
    key: 'context',
    label: 'Context',
    color: 'bg-blue-500/20 border-blue-500 text-blue-300',
    snippet: 'I am a 1st-year biology major learning Python for data analysis. I understand basic variables but struggle with loops.',
  },
  {
    key: 'task',
    label: 'Task',
    color: 'bg-emerald-500/20 border-emerald-500 text-emerald-300',
    snippet: 'Explain how a "for loop" works and help me process a list of DNA sequences.',
  },
  {
    key: 'format',
    label: 'Format',
    color: 'bg-amber-500/20 border-amber-500 text-amber-300',
    snippet: 'Use a biology lab analogy first, then show a 4-line commented code block, followed by 1 practice question.',
  },
  {
    key: 'cot',
    label: 'Chain of Thought',
    color: 'bg-pink-500/20 border-pink-500 text-pink-300',
    snippet: 'Think step-by-step: trace the loop variable on iteration 1, 2, and 3 explicitly before showing the final output.',
  },
]

const compiledPrompt = computed(() => {
  return blocks
    .filter((b) => activeBlocks.value[b.key as keyof typeof activeBlocks.value])
    .map((b) => `[${b.label.toUpperCase()}]: ${b.snippet}`)
    .join('\n\n')
})

const qualityScore = computed(() => {
  const count = Object.values(activeBlocks.value).filter(Boolean).length
  return Math.round((count / blocks.length) * 100)
})

const simulatedOutput = computed(() => {
  const s = activeBlocks.value
  if (!s.context && !s.format && !s.cot) {
    return `A for loop in Python iterates over a sequence (like a list, tuple, or string) and executes a block of code for each item.\n\nSyntax:\nfor item in sequence:\n    process(item)\n\nIt uses the iterator protocol under the hood... (Generic textbook explanation)`
  }
  let out = ''
  if (s.persona && s.context) {
    out += `🧬 Lab Analogy: Think of a "for loop" like an automated pipette machine processing a tray of test tubes one by one.\n\n`
  }
  if (s.cot) {
    out += `🔍 Step-by-Step Trace:\n Tube 1: Picks up "ATCG" -> checks length\n Tube 2: Picks up "GGCA" -> checks length\n\n`
  }
  out += `💻 Python Code:\nsequences = ["ATCG", "GGCA"]\nfor seq in sequences:\n    print(f"Analyzing: {seq}")\n\n`
  if (s.format) {
    out += `🎯 Quick Check: What would print on the first pass if we added "TTAA" to the start of the list?`
  }
  return out
})
</script>

<template>
  <div class="grid grid-cols-12 gap-4 mt-2 text-left text-xs">
    <!-- Left Column: Toggles & Prompt Preview -->
    <div class="col-span-6 flex flex-col gap-3">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="block in blocks"
          :key="block.key"
          @click="activeBlocks[block.key as keyof typeof activeBlocks] = !activeBlocks[block.key as keyof typeof activeBlocks]"
          class="px-3 py-1.5 rounded-lg border font-medium transition-all duration-200 cursor-pointer"
          :class="
            activeBlocks[block.key as keyof typeof activeBlocks]
              ? block.color
              : 'bg-slate-800/40 border-slate-700 text-slate-500 opacity-60'
          "
        >
          {{ activeBlocks[block.key as keyof typeof activeBlocks] ? '✓ ' : '+ ' }}{{ block.label }}
        </button>
      </div>

      <div class="p-3 rounded-xl bg-slate-900 border border-slate-700/80 font-mono whitespace-pre-wrap h-56 overflow-y-auto leading-relaxed text-slate-200">
        {{ compiledPrompt || 'Select at least one block above...' }}
      </div>
    </div>

    <!-- Right Column: Quality Meter & Simulated Output -->
    <div class="col-span-6 flex flex-col gap-3">
      <div class="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/70 border border-slate-700">
        <span class="font-semibold text-slate-300">Prompt Specificity Score</span>
        <span class="font-mono font-bold" :class="qualityScore > 70 ? 'text-emerald-400' : 'text-amber-400'">
          {{ qualityScore }}%
        </span>
      </div>

      <div class="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 whitespace-pre-wrap h-56 overflow-y-auto leading-relaxed text-indigo-100">
        <div class="text-[10px] font-mono uppercase tracking-wider text-indigo-400 mb-1">Simulated AI Output</div>
        {{ simulatedOutput }}
      </div>
    </div>

  </div>
</template>
