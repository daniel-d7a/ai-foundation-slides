<script setup lang="ts">
import { ref, computed } from 'vue'

interface Scenario {
  id: string
  title: string
  topic: string
  icon: string
  benchmark: string
  scratchpad: string
  flawedPremise: string
  diagnosis: string
  prescription: string[]
  prompt: string
}

const scenarios: Scenario[] = [
  {
    id: 'oop',
    title: 'OOP & Inheritance',
    topic: 'Object-Oriented',
    icon: 'i-lucide-box',
    benchmark: 'Design a simulation with Birds, Ducks, and Penguins. How do you model Flying behavior?',
    scratchpad: 'Make a parent Bird class with fly(), then inherit Penguin and override fly() to throw an exception or do nothing.',
    flawedPremise: 'Inheritance for Code Reuse (Violates Liskov Substitution)',
    diagnosis: 'A Penguin is a Bird, but cannot Fly. Forcing inheritance causes runtime errors when code expects all Birds to fly. Better approach: favor Composition (has-a CanFly ability) over Inheritance (is-a).',
    prescription: [
      'Refactor: "Favor Composition over Inheritance"',
      'Apply Strategy Pattern or CanFly interface',
      'Validate Liskov Substitution Principle (LSP)'
    ],
    prompt: 'Act as a CS Tutor. Here is my OOP code where Penguin inherits from Bird and overrides fly() to throw an error. Explain why this breaks Liskov Substitution and demonstrate the composition alternative.'
  },
  {
    id: 'stack-queue',
    title: 'Stacks & Queues',
    topic: 'Data Structures',
    icon: 'i-lucide-layers',
    benchmark: 'Implement an "Undo" feature for a text editor. Which data structure stores previous edits?',
    scratchpad: 'Use a FIFO Queue because we need to process actions in order to undo them.',
    flawedPremise: 'Queue (FIFO) instead of Stack (LIFO) for Reversal',
    diagnosis: 'Undo requires reverting the MOST RECENT action first (Last-In, First-Out = Stack). A Queue (First-In, First-Out) would undo your very first edit from an hour ago instead of your last keystroke!',
    prescription: [
      'Trace Stack push/pop order on a 3-keystroke edit history',
      'Build Undo/Redo using two twin Stacks',
      'Contrast Queue (print jobs) vs Stack (browser Back button)'
    ],
    prompt: 'I confused Stacks and Queues when building an undo feature. Provide 2 intuitive real-world analogies and 2 quick drills to cement LIFO vs FIFO.'
  },
  {
    id: 'recursion',
    title: 'Recursion & Base Cases',
    topic: 'Core Fundamentals',
    icon: 'i-lucide-repeat',
    benchmark: 'Write a recursive function to calculate the sum of numbers in a list.',
    scratchpad: 'Just return list[0] + sum(list[1:]) without extra if-statements because the list shrinks on each recursive step.',
    flawedPremise: 'Implicit Termination without Explicit Base Case',
    diagnosis: 'Without checking `if not list: return 0`, the function never stops recursing on an empty list, indexing out of bounds and triggering a Call Stack Overflow (RecursionError).',
    prescription: [
      'Always write and test the trivial Base Case first (empty list = 0)',
      'Draw the Call Stack frames expanding and collapsing',
      'Trace parameter shrinkage toward the base condition'
    ],
    prompt: 'Review my recursive list sum that crashed with a Maximum Recursion Depth error. Walk me through the missing base case and trace the call stack step-by-step.'
  }
]

const selectedScenarioId = ref('oop')
const activeStep = ref(3) // Default to step 3 (Diagnosis)
const isDiagnosing = ref(false)
const copied = ref(false)

const currentScenario = computed(() => {
  return scenarios.find(s => s.id === selectedScenarioId.value) || scenarios[0]
})

function triggerScan() {
  isDiagnosing.value = true
  setTimeout(() => {
    isDiagnosing.value = false
    activeStep.value = 3
  }, 400)
}

function copyPrompt() {
  navigator.clipboard.writeText(currentScenario.value.prompt)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1800)
}
</script>

<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none text-left">
    <!-- Top Selector Bar -->
    <div class="flex items-center justify-between gap-2 flex-wrap">
      <!-- Scenario Selector -->
      <div class="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
        <button
          v-for="sc in scenarios"
          :key="sc.id"
          @click="selectedScenarioId = sc.id; activeStep = 3"
          :class="[
            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
            selectedScenarioId === sc.id
              ? 'bg-slate-800 text-white font-semibold border border-slate-600 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
          ]"
        >
          <span :class="[sc.icon, 'w-3.5 h-3.5 shrink-0']"></span>
          <span>{{ sc.title }}</span>
        </button>
      </div>

      <!-- Copy Action -->
      <button
        @click="copyPrompt"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-sm"
      >
        <span :class="copied ? 'i-lucide-check text-emerald-400' : 'i-lucide-copy text-slate-400'" class="w-3.5 h-3.5"></span>
        <span>{{ copied ? 'Copied Prompt' : 'Copy Diagnostic Prompt' }}</span>
      </button>
    </div>

    <!-- 4-Step Interactive Diagnostic Pipeline Grid -->
    <div class="grid grid-cols-4 gap-2">
      <!-- STEP 1 -->
      <button
        @click="activeStep = 1"
        :class="[
          'p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150',
          activeStep === 1
            ? 'bg-slate-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
        ]"
      >
        <div class="flex items-center justify-between mb-1">
          <span class="text-[10px] font-mono font-bold uppercase text-indigo-400">Step 01</span>
          <span class="i-lucide-help-circle w-3.5 h-3.5 text-indigo-400"></span>
        </div>
        <div class="text-xs font-bold text-white leading-tight">Blind Benchmark</div>
        <div class="text-[10px] text-slate-400 mt-1 line-clamp-1">Multi-step deduction</div>
      </button>

      <!-- STEP 2 -->
      <button
        @click="activeStep = 2"
        :class="[
          'p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150',
          activeStep === 2
            ? 'bg-slate-800/90 border-amber-500 shadow-md ring-1 ring-amber-500/30'
            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
        ]"
      >
        <div class="flex items-center justify-between mb-1">
          <span class="text-[10px] font-mono font-bold uppercase text-amber-400">Step 02</span>
          <span class="i-lucide-pencil-line w-3.5 h-3.5 text-amber-400"></span>
        </div>
        <div class="text-xs font-bold text-white leading-tight">Raw Scratchpad</div>
        <div class="text-[10px] text-slate-400 mt-1 line-clamp-1">Unfiltered intuition</div>
      </button>

      <!-- STEP 3 -->
      <button
        @click="activeStep = 3"
        :class="[
          'p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150',
          activeStep === 3
            ? 'bg-slate-800/90 border-rose-500 shadow-md ring-1 ring-rose-500/30'
            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
        ]"
      >
        <div class="flex items-center justify-between mb-1">
          <span class="text-[10px] font-mono font-bold uppercase text-rose-400">Step 03</span>
          <span class="i-lucide-target w-3.5 h-3.5 text-rose-400"></span>
        </div>
        <div class="text-xs font-bold text-white leading-tight">Isolate Flaw</div>
        <div class="text-[10px] text-slate-400 mt-1 line-clamp-1">Root cause diagnosis</div>
      </button>

      <!-- STEP 4 -->
      <button
        @click="activeStep = 4"
        :class="[
          'p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150',
          activeStep === 4
            ? 'bg-slate-800/90 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
        ]"
      >
        <div class="flex items-center justify-between mb-1">
          <span class="text-[10px] font-mono font-bold uppercase text-emerald-400">Step 04</span>
          <span class="i-lucide-sparkles w-3.5 h-3.5 text-emerald-400"></span>
        </div>
        <div class="text-xs font-bold text-white leading-tight">Counter-Drills</div>
        <div class="text-[10px] text-slate-400 mt-1 line-clamp-1">Targeted mastery</div>
      </button>
    </div>

    <!-- Interactive Inspector Canvas -->
    <div class="rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-xl min-h-[220px] flex flex-col justify-between">
      <!-- VIEW 1: Benchmark -->
      <div v-if="activeStep === 1" class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-bold uppercase">
            Step 1: Benchmark Challenge
          </span>
          <span class="text-[10px] font-mono text-slate-400">Solve without compiler / notes</span>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm font-sans font-bold text-white leading-relaxed">
          {{ currentScenario.benchmark }}
        </div>
        <div class="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-500/30 text-[11px] text-indigo-200 font-sans flex items-center gap-2">
          <span class="i-lucide-info w-4 h-4 shrink-0 text-indigo-400"></span>
          <span>Goal: Force genuine mental retrieval without passive recognition bias.</span>
        </div>
      </div>

      <!-- VIEW 2: Raw Scratchpad -->
      <div v-else-if="activeStep === 2" class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold uppercase">
            Step 2: Student's Raw Scratchpad Reasoning
          </span>
          <span class="text-[10px] font-mono text-slate-400">Unfiltered cognitive trace</span>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/40 text-xs font-mono text-amber-100 leading-relaxed">
          "{{ currentScenario.scratchpad }}"
        </div>
        <div class="flex items-center justify-between pt-1">
          <span class="text-[11px] text-slate-400">Contains subtle conceptual misconception</span>
          <button
            @click="triggerScan"
            class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow"
          >
            <span class="i-lucide-stethoscope w-3.5 h-3.5"></span>
            <span>Run AI Root-Cause Scan</span>
          </button>
        </div>
      </div>

      <!-- VIEW 3: Flaw Diagnosis -->
      <div v-else-if="activeStep === 3" class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold uppercase">
            Step 3: Root-Cause Misconception Isolated
          </span>
          <span class="text-[10px] font-mono text-slate-400">Pedagogical Diagnosis</span>
        </div>

        <!-- Flaw Pill + Diagnosis -->
        <div class="grid grid-cols-12 gap-3">
          <div class="col-span-5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/60 flex flex-col justify-between">
            <div>
              <div class="text-[10px] font-mono uppercase text-rose-400 font-bold mb-1">Fatal False Premise</div>
              <div class="text-xs font-mono font-bold text-rose-200">
                ❌ {{ currentScenario.flawedPremise }}
              </div>
            </div>
            <div class="text-[10px] font-mono text-rose-400/80 pt-2 border-t border-rose-900/40">
              Isolates the exact cognitive blind spot
            </div>
          </div>

          <div class="col-span-7 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div class="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Diagnostic Explanation</div>
              <p class="text-xs text-slate-200 font-sans leading-relaxed">
                {{ currentScenario.diagnosis }}
              </p>
            </div>
            <div class="text-[10px] font-mono text-emerald-400 pt-2 border-t border-slate-800 flex items-center gap-1">
              <span class="i-lucide-check-circle-2 w-3 h-3"></span>
              <span>Eliminates hours of passive re-reading</span>
            </div>
          </div>
        </div>
      </div>

      <!-- VIEW 4: Counter-Drills -->
      <div v-else class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase">
            Step 4: Prescribed Targeted Counter-Drills
          </span>
          <span class="text-[10px] font-mono text-slate-400">Reinforce the blind spot</span>
        </div>
        <div class="space-y-1.5">
          <div
            v-for="(drill, idx) in currentScenario.prescription"
            :key="idx"
            class="p-2 rounded-lg bg-slate-900/90 border border-emerald-500/30 text-xs flex items-center gap-2.5 text-slate-200 font-sans"
          >
            <span class="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
              {{ idx + 1 }}
            </span>
            <span>{{ drill }}</span>
          </div>
        </div>
      </div>

      <!-- Footer Bar -->
      <div class="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div class="flex items-center gap-2">
          <span>Active Topic: <strong class="text-slate-300">{{ currentScenario.topic }}</strong></span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-slate-400">Click steps 1–4 to step through diagnostic loop</span>
        </div>
      </div>
    </div>
  </div>
</template>
