<script setup lang="ts">
import { ref, computed } from 'vue'

const activeBlocks = ref<Record<string, boolean>>({
  persona: true,
  context: false,
  task: true,
  instructions: false,
  format: false,
  cot: false,
})

const blocks = [
  {
    key: 'persona',
    label: 'Persona',
    badgeClass: 'bg-purple-500/20 border-purple-500 text-purple-300',
    snippet: 'Act as a Senior Conversion Copywriter & EdTech Growth Strategist.',
  },
  {
    key: 'context',
    label: 'Context',
    badgeClass: 'bg-blue-500/20 border-blue-500 text-blue-300',
    snippet: 'We are launching "FocusPulse", an AI study companion for college students facing exam fatigue. Traditional ads are ignored.',
  },
  {
    key: 'task',
    label: 'Task',
    badgeClass: 'bg-emerald-500/20 border-emerald-500 text-emerald-300',
    snippet: 'Create a 3-part Instagram carousel script to drive app waitlist signups.',
  },
  {
    key: 'instructions',
    label: 'Instructions',
    badgeClass: 'bg-indigo-500/20 border-indigo-500 text-indigo-300',
    snippet: 'Eliminate corporate jargon ("unleash", "synergy"). Target the specific panic felt 48h before midterms.',
  },
  {
    key: 'format',
    label: 'Format',
    badgeClass: 'bg-amber-500/20 border-amber-500 text-amber-300',
    snippet: 'Format as a table with columns: [Slide #] | [Visual Direction] | [On-Screen Hook] | [Caption]. Include CTA at the end.',
  },
  {
    key: 'cot',
    label: 'Chain of Thought',
    badgeClass: 'bg-pink-500/20 border-pink-500 text-pink-300',
    snippet: 'First, diagnose 3 psychological obstacles of exhausted students. Then, craft each slide specifically addressing one obstacle.',
  },
]

const compiledPrompt = computed(() => {
  return blocks
    .filter((b) => activeBlocks.value[b.key])
    .map((b) => `[${b.label.toUpperCase()}]\n${b.snippet}`)
    .join('\n\n')
})

const qualityScore = computed(() => {
  const count = Object.values(activeBlocks.value).filter(Boolean).length
  return Math.round((count / blocks.length) * 100)
})

const simulatedOutput = computed(() => {
  const s = activeBlocks.value
  if (!s.context && !s.instructions && !s.format && !s.cot) {
    return `Here is an Instagram post for your app:\n\n🚀 Want to ace your exams? Try FocusPulse! The revolutionary AI tool to study faster and smarter. Link in bio! #StudyGram #CollegeLife #AI`
  }

  let out = ''
  if (s.cot) {
    out += `🧠 [Reasoning Analysis: 3 Student Friction Points]\n1. Guilt over procrastination\n2. Overwhelm from 100-page slide decks\n3. Fear of blanking out during exams\n\n`
  }
  if (s.persona || s.context) {
    out += `📱 [Campaign Concept: "The 48-Hour Exam Rescue"]\n`
  }
  if (s.format) {
    out += `| Slide | Visual Direction | On-Screen Hook | Caption |\n|---|---|---|---|\n| 1 | Dark room, illuminated laptop, energy drink | "It's 2 AM and you have 200 slides left." | Stop rereading highlighted lines that won't stick. |\n| 2 | Screen recording of messy PDF -> 3 flashcards | "Your brain can't digest 40 pages at once." | Turn raw notes into active recall in 10s. |\n| 3 | Clean minimal interface with green checkmarks | "Sleep 6 hours. Still pass." | Study the 20% that yields 80% of exam points. |\n\n👉 CTA: Link in bio. First 500 campus testers get free lifetime access.`
  } else {
    out += `Slide 1 Hook: "Stop rereading highlighted lines."\nSlide 2: Show PDF converting into 5-minute flashcards.\nSlide 3 CTA: Claim beta access before Friday exams.`
  }
  return out
})
</script>

<template>
  <div class="grid grid-cols-12 gap-3 mt-1 text-left text-xs">
    <!-- Left Column: Toggles & Prompt Preview -->
    <div class="col-span-6 flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <span class="text-[11px] font-mono text-slate-400">Pillars of Master Prompt:</span>
        <span class="text-[10px] font-mono text-indigo-400">Click to toggle</span>
      </div>

      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="block in blocks"
          :key="block.key"
          @click="activeBlocks[block.key] = !activeBlocks[block.key]"
          class="px-2.5 py-1 rounded-md border text-[11px] font-medium transition-all duration-150 cursor-pointer"
          :class="
            activeBlocks[block.key]
              ? block.badgeClass + ' shadow-sm'
              : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60 hover:opacity-90'
          "
        >
          {{ activeBlocks[block.key] ? '✓ ' : '+ ' }}{{ block.label }}
        </button>
      </div>

      <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono whitespace-pre-wrap h-52 overflow-y-auto leading-relaxed text-slate-200 text-[11px]">
        {{ compiledPrompt || 'Click the pillars above to construct your prompt...' }}
      </div>
    </div>

    <!-- Right Column: Quality Meter & Simulated Output -->
    <div class="col-span-6 flex flex-col gap-2">
      <div class="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
        <span class="text-[11px] font-semibold text-slate-300">Prompt Determinism Score</span>
        <div class="flex items-center gap-2">
          <div class="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              class="h-full transition-all duration-300"
              :class="qualityScore > 70 ? 'bg-emerald-400' : qualityScore > 40 ? 'bg-amber-400' : 'bg-red-400'"
              :style="{ width: qualityScore + '%' }"
            ></div>
          </div>
          <span class="font-mono font-bold text-xs" :class="qualityScore > 70 ? 'text-emerald-400' : 'text-amber-400'">
            {{ qualityScore }}%
          </span>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/30 whitespace-pre-wrap h-52 overflow-y-auto leading-relaxed text-indigo-100 text-[11px] font-mono">
        <div class="text-[10px] font-mono uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          Simulated LLM Output
        </div>
        {{ simulatedOutput }}
      </div>
    </div>
  </div>
</template>
