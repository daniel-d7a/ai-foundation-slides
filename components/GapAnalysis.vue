<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Stage {
  id: number
  name: string
  tag: string
  color: string
  border: string
  activeBorder: string
  bg: string
  activeBg: string
  badgeBg: string
  glow: string
  icon: string
  desc: string
}

const stages: Stage[] = [
  {
    id: 1,
    name: 'Benchmark',
    tag: 'Calibrated Blind Test',
    color: 'text-indigo-400',
    border: 'border-indigo-500/30',
    activeBorder: 'border-indigo-500',
    bg: 'bg-indigo-950/20',
    activeBg: 'bg-indigo-950/70',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    glow: 'ring-2 ring-indigo-400 shadow-lg shadow-indigo-950/80',
    icon: 'target',
    desc: 'Unassisted challenging problem'
  },
  {
    id: 2,
    name: 'Attempt',
    tag: 'Raw Scratchpad',
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    activeBorder: 'border-amber-500',
    bg: 'bg-amber-950/20',
    activeBg: 'bg-amber-950/70',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    glow: 'ring-2 ring-amber-400 shadow-lg shadow-amber-950/80',
    icon: 'pencil',
    desc: 'Unfiltered reasoning trace'
  },
  {
    id: 3,
    name: 'Diagnose',
    tag: 'Root-Cause Scan',
    color: 'text-rose-400',
    border: 'border-rose-500/30',
    activeBorder: 'border-rose-500',
    bg: 'bg-rose-950/20',
    activeBg: 'bg-rose-950/70',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    glow: 'ring-2 ring-rose-400 shadow-lg shadow-rose-950/80',
    icon: 'stethoscope',
    desc: 'Pinpoint hidden false premise'
  },
  {
    id: 4,
    name: 'Help',
    tag: 'Targeted Remediation',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    activeBorder: 'border-emerald-500',
    bg: 'bg-emerald-950/20',
    activeBg: 'bg-emerald-950/70',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    glow: 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-950/80',
    icon: 'sparkles',
    desc: 'Socratic drills & rebuild'
  }
]

const currentStep = ref(1)
const isAutoRunning = ref(true)
let loopTimer: ReturnType<typeof setInterval> | null = null

const activeStage = computed(() => {
  return stages.find(s => s.id === currentStep.value) || stages[0]
})

function nextStage() {
  currentStep.value = currentStep.value >= 4 ? 1 : currentStep.value + 1
}

function selectStage(id: number) {
  currentStep.value = id
}

function toggleAutoLoop() {
  if (isAutoRunning.value) {
    if (loopTimer) clearInterval(loopTimer)
    isAutoRunning.value = false
  } else {
    isAutoRunning.value = true
    startTimer()
  }
}

function resetLoop() {
  currentStep.value = 1
}

function startTimer() {
  if (loopTimer) clearInterval(loopTimer)
  loopTimer = setInterval(() => {
    nextStage()
  }, 2400)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (loopTimer) clearInterval(loopTimer)
})
</script>

<template>
  <div class="w-full flex flex-col gap-2 font-sans select-none text-left">
    <!-- Top Toolbar with Actions -->
    <div class="flex items-center justify-between px-1">
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
          Circular Diagnostic Loop
        </span>
        <span class="text-[11px] font-mono text-slate-400">
          Continuous Cognitive Calibration
        </span>
      </div>

      <!-- Traversal Controls -->
      <div class="flex items-center gap-2">
        <button
          @click.stop="nextStage"
          class="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432zM3 4v16"/>
          </svg>
          <span>Next Phase</span>
        </button>

        <button
          @click.stop="toggleAutoLoop"
          class="px-3 py-1 rounded-lg border text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer"
          :class="isAutoRunning
            ? 'bg-indigo-950 border-indigo-500 text-indigo-300 shadow-md'
            : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'"
        >
          <svg v-if="isAutoRunning" class="w-3.5 h-3.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="5" height="18" x="14" y="3" rx="1"/>
            <rect width="5" height="18" x="5" y="3" rx="1"/>
          </svg>
          <svg v-else class="w-3.5 h-3.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>
          </svg>
          <span>{{ isAutoRunning ? 'Pause' : 'Auto Loop' }}</span>
        </button>

        <button
          @click.stop="resetLoop"
          class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer"
          title="Reset traversal"
        >
          <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          <span>Reset</span>
        </button>
      </div>
    </div>

    <!-- Main Circular Loop Arena -->
    <div class="relative w-full h-[360px] rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-xl flex items-center justify-center overflow-hidden">
      <!-- Background SVG: Pure Geometric Circle & Clockwise Flow Direction -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400">
        <defs>
          <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.9" />
            <stop offset="33%" stop-color="#f59e0b" stop-opacity="0.9" />
            <stop offset="66%" stop-color="#f43f5e" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.9" />
          </linearGradient>

          <!-- Marker Arrowheads -->
          <marker id="arrowIndigo" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#818cf8" />
          </marker>
          <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#fbbf24" />
          </marker>
          <marker id="arrowRose" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#fb7185" />
          </marker>
          <marker id="arrowEmerald" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
          </marker>
        </defs>

        <!-- Base Faded Orbit Ring -->
        <circle cx="400" cy="200" r="130" fill="none" stroke="#1e293b" stroke-width="4" />

        <!-- Dynamic Colored Orbit Segments (Clockwise Flow) -->
        <!-- Top to Right: Benchmark -> Attempt -->
        <path
          d="M 400 70 A 130 130 0 0 1 530 200"
          fill="none"
          stroke="#6366f1"
          :stroke-width="currentStep === 1 ? '4' : '2'"
          stroke-dasharray="6 4"
          class="transition-all duration-300"
        />

        <!-- Right to Bottom: Attempt -> Diagnose -->
        <path
          d="M 530 200 A 130 130 0 0 1 400 330"
          fill="none"
          stroke="#f59e0b"
          :stroke-width="currentStep === 2 ? '4' : '2'"
          stroke-dasharray="6 4"
          class="transition-all duration-300"
        />

        <!-- Bottom to Left: Diagnose -> Help -->
        <path
          d="M 400 330 A 130 130 0 0 1 270 200"
          fill="none"
          stroke="#f43f5e"
          :stroke-width="currentStep === 3 ? '4' : '2'"
          stroke-dasharray="6 4"
          class="transition-all duration-300"
        />

        <!-- Left to Top: Help -> Again (Loop return) -->
        <path
          d="M 270 200 A 130 130 0 0 1 400 70"
          fill="none"
          stroke="#10b981"
          :stroke-width="currentStep === 4 ? '4' : '2'"
          stroke-dasharray="6 4"
          class="transition-all duration-300"
        />

        <!-- Flow Direction Arrow Indicators -->
        <path d="M 490 108 L 498 116" stroke="#818cf8" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrowIndigo)" />
        <path d="M 495 292 L 487 300" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrowAmber)" />
        <path d="M 305 292 L 297 284" stroke="#fb7185" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrowRose)" />
        <path d="M 305 108 L 313 100" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrowEmerald)" />
      </svg>

      <!-- Center Hub: Pulsing Core with Loop Identity -->
      <div class="relative z-10 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-sm select-none">
        <div class="w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300" :class="activeStage.bg + ' ' + activeStage.color">
          <svg class="w-6 h-6 animate-spin" style="animation-duration: 9s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
          </svg>
        </div>
        <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Feedback Loop</span>
        <span class="text-xs font-mono font-extrabold text-white mt-0.5">
          Phase 0{{ activeStage.id }}
        </span>
        <span class="text-[10px] font-bold tracking-tight" :class="activeStage.color">
          {{ activeStage.name }}
        </span>
      </div>

      <!-- "Again ↻" Looping Badge on the Return Arc (Top-Left) -->
      <div
        class="absolute top-16 left-60 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full border shadow-md font-mono text-[10px] font-bold transition-all duration-300 pointer-events-none"
        :class="currentStep === 4
          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400/50 scale-105'
          : 'bg-slate-900/90 border-slate-700 text-slate-400 opacity-80'"
      >
        <svg class="w-3 h-3 animate-spin" style="animation-duration: 6s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        <span>Again ↻</span>
      </div>

      <!-- ================= 4 TABS POSITIONED PRECISELY NEXT TO EACH PART OF THE LOOP ================= -->

      <!-- TAB 1: TOP (12 o'clock) -> Benchmark -->
      <div
        @click.stop="selectStage(1)"
        class="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-52 p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-2.5 shadow-lg backdrop-blur-md"
        :class="[
          currentStep === 1
            ? stages[0].activeBg + ' ' + stages[0].activeBorder + ' ' + stages[0].glow + ' scale-105'
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
        ]"
      >
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border shrink-0"
          :class="currentStep === 1 ? stages[0].badgeBg : 'bg-slate-800 border-slate-700 text-slate-400'"
        >
          01
        </div>
        <div class="flex flex-col min-w-0">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold leading-none" :class="currentStep === 1 ? 'text-white' : 'text-slate-200'">
              Benchmark
            </span>
            <span v-if="currentStep === 1" class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
          </div>
          <span class="text-[10px] font-mono mt-0.5 truncate" :class="currentStep === 1 ? stages[0].color : 'text-slate-400'">
            {{ stages[0].desc }}
          </span>
        </div>
      </div>

      <!-- TAB 2: RIGHT (3 o'clock) -> Attempt -->
      <div
        @click.stop="selectStage(2)"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-52 p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-2.5 shadow-lg backdrop-blur-md"
        :class="[
          currentStep === 2
            ? stages[1].activeBg + ' ' + stages[1].activeBorder + ' ' + stages[1].glow + ' scale-105'
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
        ]"
      >
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border shrink-0"
          :class="currentStep === 2 ? stages[1].badgeBg : 'bg-slate-800 border-slate-700 text-slate-400'"
        >
          02
        </div>
        <div class="flex flex-col min-w-0">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold leading-none" :class="currentStep === 2 ? 'text-white' : 'text-slate-200'">
              Attempt
            </span>
            <span v-if="currentStep === 2" class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
          </div>
          <span class="text-[10px] font-mono mt-0.5 truncate" :class="currentStep === 2 ? stages[1].color : 'text-slate-400'">
            {{ stages[1].desc }}
          </span>
        </div>
      </div>

      <!-- TAB 3: BOTTOM (6 o'clock) -> Diagnose -->
      <div
        @click.stop="selectStage(3)"
        class="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-52 p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-2.5 shadow-lg backdrop-blur-md"
        :class="[
          currentStep === 3
            ? stages[2].activeBg + ' ' + stages[2].activeBorder + ' ' + stages[2].glow + ' scale-105'
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
        ]"
      >
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border shrink-0"
          :class="currentStep === 3 ? stages[2].badgeBg : 'bg-slate-800 border-slate-700 text-slate-400'"
        >
          03
        </div>
        <div class="flex flex-col min-w-0">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold leading-none" :class="currentStep === 3 ? 'text-white' : 'text-slate-200'">
              Diagnose
            </span>
            <span v-if="currentStep === 3" class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
          </div>
          <span class="text-[10px] font-mono mt-0.5 truncate" :class="currentStep === 3 ? stages[2].color : 'text-slate-400'">
            {{ stages[2].desc }}
          </span>
        </div>
      </div>

      <!-- TAB 4: LEFT (9 o'clock) -> Help -->
      <div
        @click.stop="selectStage(4)"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-52 p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-2.5 shadow-lg backdrop-blur-md"
        :class="[
          currentStep === 4
            ? stages[3].activeBg + ' ' + stages[3].activeBorder + ' ' + stages[3].glow + ' scale-105'
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
        ]"
      >
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border shrink-0"
          :class="currentStep === 4 ? stages[3].badgeBg : 'bg-slate-800 border-slate-700 text-slate-400'"
        >
          04
        </div>
        <div class="flex flex-col min-w-0">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold leading-none" :class="currentStep === 4 ? 'text-white' : 'text-slate-200'">
              Help
            </span>
            <span v-if="currentStep === 4" class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <span class="text-[10px] font-mono mt-0.5 truncate" :class="currentStep === 4 ? stages[3].color : 'text-slate-400'">
            {{ stages[3].desc }}
          </span>
        </div>
      </div>

    </div>
  </div>
</template>
