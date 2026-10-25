<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface BlockShape {
  id: string
  label: string
  icon: string
  color: string
  border: string
  bg: string
  text: string
  studColor: string
}

const blocks: BlockShape[] = [
  {
    id: 'persona',
    label: '1. PERSONA',
    icon: 'i-lucide-user-check',
    color: 'purple',
    border: 'border-purple-500',
    bg: 'from-purple-600/40 to-purple-900/60',
    text: 'text-purple-300',
    studColor: 'bg-purple-400',
  },
  {
    id: 'context',
    label: '2. CONTEXT',
    icon: 'i-lucide-compass',
    color: 'blue',
    border: 'border-blue-500',
    bg: 'from-blue-600/40 to-blue-900/60',
    text: 'text-blue-300',
    studColor: 'bg-blue-400',
  },
  {
    id: 'task',
    label: '3. TASK',
    icon: 'i-lucide-check-circle-2',
    color: 'emerald',
    border: 'border-emerald-500',
    bg: 'from-emerald-600/40 to-emerald-900/60',
    text: 'text-emerald-300',
    studColor: 'bg-emerald-400',
  },
  {
    id: 'instructions',
    label: '4. INSTRUCTIONS',
    icon: 'i-lucide-shield-alert',
    color: 'cyan',
    border: 'border-cyan-500',
    bg: 'from-cyan-600/40 to-cyan-900/60',
    text: 'text-cyan-300',
    studColor: 'bg-cyan-400',
  },
  {
    id: 'format',
    label: '5. FORMAT',
    icon: 'i-lucide-layout-grid',
    color: 'amber',
    border: 'border-amber-500',
    bg: 'from-amber-600/40 to-amber-900/60',
    text: 'text-amber-300',
    studColor: 'bg-amber-400',
  },
  {
    id: 'reasoning',
    label: '6. REASONING (CoT)',
    icon: 'i-lucide-git-commit',
    color: 'pink',
    border: 'border-pink-500',
    bg: 'from-pink-600/40 to-pink-900/60',
    text: 'text-pink-300',
    studColor: 'bg-pink-400',
  },
]

const assembledCount = ref(blocks.length)
const isBuilding = ref(false)
let buildTimer: any = null

function triggerBuild() {
  if (buildTimer) clearInterval(buildTimer)
  assembledCount.value = 0
  isBuilding.value = true
  let count = 0
  buildTimer = setInterval(() => {
    count++
    assembledCount.value = count
    if (count >= blocks.length) {
      clearInterval(buildTimer)
      isBuilding.value = false
    }
  }, 350)
}

onUnmounted(() => {
  if (buildTimer) clearInterval(buildTimer)
})
</script>

<template>
  <div class="relative w-full text-left font-sans select-none">
    <div class="grid grid-cols-2 gap-5 w-full max-w-5xl mx-auto h-[335px]">
      
      <!-- LEFT: Chaotic Gibberish (Bad Prompt) -->
      <div class="rounded-xl bg-slate-900/80 border border-red-500/40 p-3 flex flex-col justify-between shadow-lg relative overflow-hidden">
        <!-- Background Ambient Glow -->
        <div class="absolute -top-12 -left-12 w-36 h-36 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header -->
        <div class="flex items-center justify-between pb-1.5 border-b border-red-500/20">
          <div class="flex items-center gap-1.5">
            <span class="p-0.5 rounded bg-red-500/20 border border-red-500/40">
              <span class="i-lucide-shuffle w-3.5 h-3.5 text-red-400 block"></span>
            </span>
            <span class="text-[11px] font-mono font-bold tracking-wider text-red-300 uppercase">
              Vague Blabber
            </span>
          </div>
          <span class="text-[9px] font-mono text-red-400/80 uppercase">0 Structure</span>
        </div>

        <!-- Center Visual: Messy Chaotic Scribbles & Floating Gibberish -->
        <div class="flex-1 flex flex-col items-center justify-center relative my-1">
          <div class="relative w-full max-w-[320px] h-36 flex items-center justify-center">
            <!-- Tangled Scribble SVG -->
            <svg class="absolute inset-0 w-full h-full text-red-500/30 overflow-visible" viewBox="0 0 320 140" fill="none">
              <path
                d="M 30,70 Q 60,15 110,65 T 170,95 T 80,115 Q 40,65 140,40 T 250,75 T 200,115 T 110,30 T 270,95 T 300,65"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                class="opacity-60"
              />
              <path
                d="M 50,45 C 120,135 70,15 200,90 C 270,135 290,15 220,50 C 150,85 110,30 90,95"
                stroke="#ef4444"
                stroke-width="1.5"
                stroke-dasharray="4 6"
                stroke-linecap="round"
                class="opacity-70 animate-pulse"
              />
            </svg>

            <!-- Floating Gibberish Snippets As Messy Text / Speech Shards -->
            <div class="absolute top-1 left-2 rotate-[-5deg] bg-slate-950/90 border border-red-500/40 px-2 py-0.5 rounded shadow-sm text-[10px] font-mono text-red-300">
              "yo write an email or whatever..."
            </div>

            <div class="absolute top-10 right-2 rotate-[4deg] bg-slate-950/90 border border-red-500/40 px-2 py-0.5 rounded shadow-sm text-[10px] font-mono text-red-300">
              "viral but formal idk???"
            </div>

            <div class="absolute bottom-6 left-5 rotate-[3deg] bg-slate-950/90 border border-red-500/40 px-2 py-0.5 rounded shadow-sm text-[10px] font-mono text-red-300">
              "cool stuff asap :)))"
            </div>

            <div class="absolute bottom-1 right-7 rotate-[-6deg] bg-red-950/90 border border-red-500 text-red-400 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest shadow">
              ??? ???
            </div>
          </div>
        </div>

        <!-- Bottom Result: Foggy Cliché Output -->
        <div class="pt-1.5 border-t border-red-500/20 flex items-center justify-between text-[10px] font-mono">
          <div class="flex items-center gap-1.5 text-slate-400">
            <span class="i-lucide-arrow-down-right w-3.5 h-3.5 text-red-400"></span>
            <span>Result:</span>
          </div>
          <div class="flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/60 border border-red-900/60 text-red-300 text-[10px]">
            <span class="i-lucide-cloud-fog w-3 h-3 text-red-400"></span>
            <span>Unbounded Hallucination</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: Modular Shapes Being Built (Well-Crafted Prompt) -->
      <div class="rounded-xl bg-slate-900/80 border border-emerald-500/40 p-3 flex flex-col justify-between shadow-lg relative overflow-hidden">
        <!-- Background Ambient Glow -->
        <div class="absolute -top-12 -right-12 w-36 h-36 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header with Replay Assembly Trigger -->
        <div class="flex items-center justify-between pb-1.5 border-b border-emerald-500/20">
          <div class="flex items-center gap-1.5">
            <span class="p-0.5 rounded bg-emerald-500/20 border border-emerald-500/40">
              <span class="i-lucide-boxes w-3.5 h-3.5 text-emerald-400 block"></span>
            </span>
            <span class="text-[11px] font-mono font-bold tracking-wider text-emerald-300 uppercase">
              The 6 Pillars Architecture
            </span>
          </div>

          <!-- Build Button -->
          <button
            type="button"
            @click.stop="triggerBuild"
            :disabled="isBuilding"
            class="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80 hover:border-emerald-400 active:scale-95 disabled:opacity-50"
            title="Watch blocks assemble"
          >
            <span class="i-lucide-refresh-cw w-2.5 h-2.5" :class="{ 'animate-spin': isBuilding }"></span>
            <span>{{ isBuilding ? 'Snapping...' : 'Rebuild' }}</span>
          </button>
        </div>

        <!-- Center Visual: The Stacking Physical Lego/Puzzle Blocks (6 Blocks) -->
        <div class="flex-1 flex flex-col justify-center items-center py-0.5 px-2">
          <div class="w-full max-w-[320px] flex flex-col gap-1">
            <div
              v-for="(block, idx) in blocks"
              :key="block.id"
              class="relative transition-all duration-300 rounded-md border shadow-sm flex items-center justify-between px-2.5 py-0.5 bg-gradient-to-r"
              :class="[
                block.bg,
                idx < assembledCount
                  ? `${block.border} opacity-100 translate-y-0 scale-100`
                  : 'border-slate-800 opacity-15 translate-y-1 scale-95 pointer-events-none'
              ]"
            >
              <!-- Top Lego Studs for Interlocking Visual Metaphor -->
              <div class="absolute -top-1 left-5 flex items-center gap-2.5 pointer-events-none">
                <div class="w-2.5 h-0.5 rounded-t-sm border-t border-x border-white/30" :class="block.studColor"></div>
                <div class="w-2.5 h-0.5 rounded-t-sm border-t border-x border-white/30" :class="block.studColor"></div>
                <div class="w-2.5 h-0.5 rounded-t-sm border-t border-x border-white/30" :class="block.studColor"></div>
              </div>

              <!-- Left Shape Icon + Label -->
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3" :class="[block.icon, block.text]"></span>
                <span class="text-[10px] font-mono font-bold tracking-wider" :class="block.text">
                  {{ block.label }}
                </span>
              </div>

              <!-- Center Puzzle Notch Tab / Connector Graphic -->
              <div class="flex items-center gap-1 opacity-60">
                <div class="w-1.5 h-1.5 rounded-sm border border-white/40 rotate-45"></div>
                <div class="w-8 h-0.5 bg-white/20 rounded"></div>
              </div>

              <!-- Right Lock Indicator -->
              <div class="flex items-center">
                <span
                  v-if="idx < assembledCount"
                  class="i-lucide-check w-3 h-3 text-emerald-400 font-bold"
                ></span>
                <span
                  v-else
                  class="w-2.5 h-2.5 rounded-full border border-slate-700 block"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Result: Crisp Deterministic Crystal -->
        <div class="pt-1.5 border-t border-emerald-500/20 flex items-center justify-between text-[10px] font-mono">
          <div class="flex items-center gap-1.5 text-slate-400">
            <span class="i-lucide-arrow-down-right w-3.5 h-3.5 text-emerald-400"></span>
            <span>Result:</span>
          </div>
          <div class="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px]">
            <span class="i-lucide-sparkles w-3 h-3 text-emerald-400"></span>
            <span>Deterministic Precision</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
