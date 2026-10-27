<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  step: 1 | 2 | 3
  domain?: 'cs' | 'cooking'
}>(), {
  domain: 'cs',
})

// Pipeline stages meta
const stages = computed(() => {
  if (props.domain === 'cooking') {
    return [
      {
        num: '01',
        title: 'Culinary Ingestion',
        tool: 'Recipe Book & Ratios',
        icon: 'i-lucide-book-open',
        color: 'indigo',
        border: 'border-indigo-500',
        activeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50',
      },
      {
        num: '02',
        title: 'Technique Recall',
        tool: 'Baker Ratios & Yeast',
        icon: 'i-lucide-brain',
        color: 'emerald',
        border: 'border-emerald-500',
        activeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
      },
      {
        num: '03',
        title: 'Interactive Kitchen Drill',
        tool: 'Claude Artifacts',
        icon: 'i-lucide-utensils',
        color: 'amber',
        border: 'border-amber-500',
        activeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
      },
    ]
  }
  return [
    {
      num: '01',
      title: 'Grounded Ingestion',
      tool: 'Google NotebookLM',
      icon: 'i-lucide-book-open',
      color: 'indigo',
      border: 'border-indigo-500',
      activeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50',
    },
    {
      num: '02',
      title: 'Active Recall Practice',
      tool: 'Claude & Anki',
      icon: 'i-lucide-brain',
      color: 'emerald',
      border: 'border-emerald-500',
      activeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    },
    {
      num: '03',
      title: 'Interactive Visual Drill',
      tool: 'Claude Artifacts',
      icon: 'i-lucide-code-2',
      color: 'amber',
      border: 'border-amber-500',
      activeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    },
  ]
})

// --- STEP 1 STATE: Document Feeding & NotebookLM Audio ---
const isAudioPlaying = ref(false)
const activeDocFeed = ref(0)
let feedTimer: ReturnType<typeof setInterval> | null = null

function toggleAudio() {
  isAudioPlaying.value = !isAudioPlaying.value
}

// --- STEP 2 STATE: Animated Flashcards & Visual Questions (No Text) ---
interface AnimatedCard {
  id: number
  isFlipped: boolean
  isCorrect: boolean
  tag: string
  interval: string
}

const flashcards = ref<AnimatedCard[]>([
  { id: 1, isFlipped: true, isCorrect: true, tag: 'Card 01', interval: '+4 Days' },
  { id: 2, isFlipped: true, isCorrect: false, tag: 'Card 02', interval: '< 1 Min' },
  { id: 3, isFlipped: false, isCorrect: true, tag: 'Card 03', interval: '+7 Days' },
])

const isAutoFlipping = ref(false)
let autoFlipTimer: ReturnType<typeof setInterval> | null = null

function toggleCard(idx: number) {
  flashcards.value[idx].isFlipped = !flashcards.value[idx].isFlipped
}

function flipAllCards() {
  const anyUnflipped = flashcards.value.some(c => !c.isFlipped)
  flashcards.value.forEach(c => { c.isFlipped = anyUnflipped })
}

function toggleAutoFlip() {
  if (isAutoFlipping.value) {
    if (autoFlipTimer) clearInterval(autoFlipTimer)
    isAutoFlipping.value = false
    return
  }
  isAutoFlipping.value = true
  let cardIdx = 0
  autoFlipTimer = setInterval(() => {
    flashcards.value[cardIdx].isFlipped = !flashcards.value[cardIdx].isFlipped
    cardIdx = (cardIdx + 1) % flashcards.value.length
  }, 1300)
}

// --- STEP 3 CS STATE: Breadth First Search (BFS) Graph ---
interface GraphNode {
  id: number
  x: number // percentage
  y: number // percentage
  parent?: number
  level: number
}

const bfsGraphNodes: GraphNode[] = [
  { id: 1, x: 50, y: 16, level: 0 },
  { id: 2, x: 28, y: 48, level: 1, parent: 1 },
  { id: 3, x: 72, y: 48, level: 1, parent: 1 },
  { id: 4, x: 16, y: 82, level: 2, parent: 2 },
  { id: 5, x: 40, y: 82, level: 2, parent: 2 },
  { id: 6, x: 60, y: 82, level: 2, parent: 3 },
  { id: 7, x: 84, y: 82, level: 2, parent: 3 },
]

const edges = [
  { from: 1, to: 2, x1: 50, y1: 16, x2: 28, y2: 48 },
  { from: 1, to: 3, x1: 50, y1: 16, x2: 72, y2: 48 },
  { from: 2, to: 4, x1: 28, y1: 48, x2: 16, y2: 82 },
  { from: 2, to: 5, x1: 28, y1: 48, x2: 40, y2: 82 },
  { from: 3, to: 6, x1: 72, y1: 48, x2: 60, y2: 82 },
  { from: 3, to: 7, x1: 72, y1: 48, x2: 84, y2: 82 },
]

// BFS Step Index: 0 to 7
const bfsStep = ref(1)
const isAutoBfsRunning = ref(false)
let bfsTimer: ReturnType<typeof setInterval> | null = null

const bfsQueueStates = [
  { current: null, queue: [1], visited: [] },
  { current: 1, queue: [2, 3], visited: [1] },
  { current: 2, queue: [3, 4, 5], visited: [1, 2] },
  { current: 3, queue: [4, 5, 6, 7], visited: [1, 2, 3] },
  { current: 4, queue: [5, 6, 7], visited: [1, 2, 3, 4] },
  { current: 5, queue: [6, 7], visited: [1, 2, 3, 4, 5] },
  { current: 6, queue: [7], visited: [1, 2, 3, 4, 5, 6] },
  { current: 7, queue: [], visited: [1, 2, 3, 4, 5, 6, 7] },
]

const currentBfsState = computed(() => {
  return bfsQueueStates[bfsStep.value] || bfsQueueStates[0]
})

function nextBfsStep() {
  if (bfsStep.value >= 7) {
    bfsStep.value = 1
  } else {
    bfsStep.value++
  }
}

function resetBfs() {
  bfsStep.value = 1
  if (isAutoBfsRunning.value && bfsTimer) {
    clearInterval(bfsTimer)
    isAutoBfsRunning.value = false
  }
}

function toggleAutoBfs() {
  if (isAutoBfsRunning.value) {
    if (bfsTimer) clearInterval(bfsTimer)
    isAutoBfsRunning.value = false
    return
  }
  isAutoBfsRunning.value = true
  bfsTimer = setInterval(() => {
    if (bfsStep.value >= 7) {
      bfsStep.value = 1
    } else {
      bfsStep.value++
    }
  }, 900)
}

function jumpToNode(nodeId: number) {
  bfsStep.value = nodeId
}

// --- STEP 3 COOKING STATE: Simple Culinary Technique (Perfect Steak) ---
interface CookingStage {
  id: number
  title: string
  action: string
  heat: string
  timing: string
  tip: string
  status: string
  icon: string
  donenessPercent: number
}

const cookingStages: CookingStage[] = [
  {
    id: 1,
    title: 'Season',
    action: 'Pat Dry & Season Generously',
    heat: 'Room Temp',
    timing: '15 mins before',
    tip: 'Pat meat dry with paper towels; rub with coarse salt and black pepper.',
    status: 'Raw pink steak • Salt begins dissolving into meat',
    icon: 'i-lucide-utensils',
    donenessPercent: 0,
  },
  {
    id: 2,
    title: 'Hot Pan',
    action: 'Preheat Skillet Until Smoking',
    heat: 'High Heat',
    timing: '3 mins',
    tip: 'Add high-heat oil. Pan must be smoking hot before the meat touches it.',
    status: 'Skillet smoking hot • Ready for contact sizzle',
    icon: 'i-lucide-flame',
    donenessPercent: 15,
  },
  {
    id: 3,
    title: 'The Sear',
    action: 'Lay Down & Don\'t Move',
    heat: 'High Heat',
    timing: '2 mins',
    tip: 'Press gently once. Leave undisturbed so a crisp, dark brown crust develops.',
    status: 'Deep golden brown crust forming on first side',
    icon: 'i-lucide-sparkles',
    donenessPercent: 40,
  },
  {
    id: 4,
    title: 'Baste',
    action: 'Flip & Spoon Hot Butter',
    heat: 'Medium Heat',
    timing: '2 mins',
    tip: 'Flip once; drop in butter, smashed garlic, and thyme. Spoon hot butter over the top.',
    status: 'Foaming butter glaze • Rich aroma infused',
    icon: 'i-lucide-droplets',
    donenessPercent: 70,
  },
  {
    id: 5,
    title: 'Doneness',
    action: 'Check Center Temperature',
    heat: '54°C (130°F)',
    timing: 'Instant Read',
    tip: 'Insert thermometer into center: 54°C for medium-rare, 60°C for medium.',
    status: 'Target reached: Warm red/pink center',
    icon: 'i-lucide-gauge',
    donenessPercent: 90,
  },
  {
    id: 6,
    title: 'Rest & Slice',
    action: 'Rest on Cutting Board',
    heat: 'Off Heat',
    timing: '5 mins',
    tip: 'Do not cut immediately! Resting lets the juices reabsorb back into the steak.',
    status: 'Tender & juicy • Ready to slice against grain',
    icon: 'i-lucide-check-circle-2',
    donenessPercent: 100,
  },
]

const cookingStep = ref(3)
const isAutoCookingRunning = ref(false)
let cookingTimer: ReturnType<typeof setInterval> | null = null

const currentCookingStage = computed(() => {
  return cookingStages.find(s => s.id === cookingStep.value) || cookingStages[0]
})

function nextCookingStep() {
  if (cookingStep.value >= 6) {
    cookingStep.value = 1
  } else {
    cookingStep.value++
  }
}

function resetCooking() {
  cookingStep.value = 1
  if (isAutoCookingRunning.value && cookingTimer) {
    clearInterval(cookingTimer)
    isAutoCookingRunning.value = false
  }
}

function toggleAutoCooking() {
  if (isAutoCookingRunning.value) {
    if (cookingTimer) clearInterval(cookingTimer)
    isAutoCookingRunning.value = false
    return
  }
  isAutoCookingRunning.value = true
  cookingTimer = setInterval(() => {
    if (cookingStep.value >= 6) {
      cookingStep.value = 1
    } else {
      cookingStep.value++
    }
  }, 1200)
}

function jumpToCookingStage(id: number) {
  cookingStep.value = id
}

onMounted(() => {
  feedTimer = setInterval(() => {
    activeDocFeed.value = (activeDocFeed.value + 1) % 3
  }, 1800)
})

onUnmounted(() => {
  if (feedTimer) clearInterval(feedTimer)
  if (autoFlipTimer) clearInterval(autoFlipTimer)
  if (bfsTimer) clearInterval(bfsTimer)
  if (cookingTimer) clearInterval(cookingTimer)
})
</script>

<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none text-left">
    <!-- Top 3-Step Breadcrumb Bar -->
    <div class="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
      <div
        v-for="(st, idx) in stages"
        :key="st.num"
        class="flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200"
        :class="[
          step === idx + 1
            ? 'bg-slate-800 ' + st.border + ' shadow-md'
            : 'bg-slate-950/40 border-slate-800/80 opacity-60'
        ]"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold border shrink-0"
            :class="step === idx + 1 ? st.activeBg : 'bg-slate-900 border-slate-800 text-slate-500'"
          >
            {{ st.num }}
          </div>
          <div>
            <div class="text-[9px] font-mono uppercase tracking-wider text-slate-400">{{ st.tool }}</div>
            <div class="text-xs font-bold leading-tight" :class="step === idx + 1 ? 'text-white' : 'text-slate-400'">
              {{ st.title }}
            </div>
          </div>
        </div>
        <span
          :class="[st.icon, 'w-4 h-4 shrink-0', step === idx + 1 ? 'text-white' : 'text-slate-600']"
        ></span>
      </div>
    </div>

    <!-- Active Stage Card Container (No duplicate header, no footer, no translations) -->
    <div class="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-xl flex flex-col justify-center min-h-[300px]">
      
      <!-- ================= STEP 1: Grounded Ingestion (Animated Pipeline) ================= -->
      <div v-if="step === 1" class="flex flex-col gap-3 py-1">
        <div class="grid grid-cols-12 gap-3 items-center p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/30">
          <div class="col-span-4 flex flex-col gap-2">
            <div class="flex items-center justify-between text-xs font-mono text-slate-400">
              <span class="flex items-center gap-1.5 font-bold uppercase tracking-wider text-indigo-400">
                <span class="i-lucide-library w-4 h-4"></span>
                <span>1. Raw Sources</span>
              </span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">3 Documents</span>
            </div>

            <div class="flex flex-col gap-1.5 relative">
              <div
                v-for="(doc, dIdx) in [
                  { name: 'Lecture_04_Trees.pdf', size: '4.2 MB', icon: 'i-lucide-file-text', color: 'text-rose-400', border: 'border-rose-500/40' },
                  { name: 'Algorithms_Textbook.pdf', size: '18 MB', icon: 'i-lucide-book-open', color: 'text-blue-400', border: 'border-blue-500/40' },
                  { name: 'Lab_Notes.docx', size: '850 KB', icon: 'i-lucide-file-code', color: 'text-amber-400', border: 'border-amber-500/40' },
                ]"
                :key="doc.name"
                class="flex items-center justify-between p-2 rounded-lg bg-slate-950 border text-xs transition-all duration-300"
                :class="[
                  doc.border,
                  dIdx === activeDocFeed
                    ? 'ring-2 ring-indigo-400 shadow-md translate-x-1.5 bg-indigo-950/30'
                    : 'opacity-75 hover:opacity-100'
                ]"
              >
                <div class="flex items-center gap-2 truncate">
                  <span :class="[doc.icon, doc.color, 'w-4 h-4 shrink-0']"></span>
                  <span class="font-mono text-[11px] text-slate-200 truncate">{{ doc.name }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span
                    v-if="dIdx === activeDocFeed"
                    class="i-lucide-arrow-right w-3 h-3 text-indigo-400 animate-pulse"
                  ></span>
                  <span class="text-[9px] font-mono text-slate-500 shrink-0">{{ doc.size }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-4 flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-950/90 border border-indigo-500/40 relative overflow-hidden text-center">
            <div class="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent scan-beam"></div>

            <div class="w-12 h-12 rounded-2xl bg-indigo-600/20 border-2 border-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-950/60 mb-2 relative">
              <span class="i-lucide-cpu w-6 h-6 text-indigo-300"></span>
              <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
              <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>

            <div class="text-xs font-bold text-white font-serif tracking-wide">
              Google NotebookLM
            </div>
            <div class="text-[10px] font-mono text-indigo-400 mt-0.5">
              Document-Grounded Analysis
            </div>

            <div class="w-full mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span class="flex items-center gap-1 text-emerald-400 font-semibold">
                <span class="i-lucide-shield-check w-3.3 h-3.3"></span>
                <span>Source-Grounded</span>
              </span>
              <span class="text-[9px] text-indigo-300 animate-pulse">Analyzing...</span>
            </div>
          </div>

          <div class="col-span-4 flex flex-col gap-2">
            <div class="flex items-center justify-between text-xs font-mono text-slate-400">
              <span class="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-400">
                <span class="i-lucide-headphones w-4 h-4"></span>
                <span>2. Audio Overview Output</span>
              </span>
              <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                Audio Overview
              </span>
            </div>

            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2 shadow-md">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <div class="flex -space-x-1.5">
                    <div class="w-5 h-5 rounded-full bg-indigo-500/30 border border-indigo-400 flex items-center justify-center text-[9px] font-bold text-indigo-300">
                      H1
                    </div>
                    <div class="w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[9px] font-bold text-emerald-300">
                      H2
                    </div>
                  </div>
                  <span class="text-[11px] font-bold text-white truncate">Deep-Dive Discussion</span>
                </div>
                <span class="text-[9px] font-mono text-slate-400">14:20</span>
              </div>

              <div class="flex items-center gap-1 h-7 py-0.5 bg-slate-900/70 rounded px-2">
                <div
                  v-for="i in 22"
                  :key="i"
                  :style="{ height: isAudioPlaying ? `${((i * 17) % 20) + 4}px` : '4px' }"
                  :class="[
                    'flex-1 rounded-full transition-all duration-150',
                    i <= 12 ? 'bg-indigo-400' : 'bg-slate-700'
                  ]"
                ></div>
              </div>

              <button
                @click.stop="toggleAudio"
                class="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow cursor-pointer"
              >
                <span :class="isAudioPlaying ? 'i-lucide-pause' : 'i-lucide-play'" class="w-3.5 h-3.5"></span>
                <span>{{ isAudioPlaying ? 'Pause Podcast' : 'Listen to AI Podcast' }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="i-lucide-file-check-2 w-4 h-4 text-indigo-400 shrink-0"></span>
            <span class="text-slate-300 text-[11px]">
              <strong>Verified Ingestion Citation:</strong> "A self-balancing BST guarantees O(log n) lookup by maintaining invariant height factor &le; 1."
            </span>
          </div>
          <span class="text-[10px] font-mono text-indigo-400 shrink-0 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
            Source: Lecture_04_Trees.pdf (Page 24)
          </span>
        </div>
      </div>

      <!-- ================= STEP 2: Active Recall (Animated Flashcards, No Text) ================= -->
      <div v-else-if="step === 2" class="flex flex-col gap-3 py-1">
        <div class="flex items-center justify-between px-1">
          <div class="flex items-center gap-2 text-xs font-mono">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span class="text-slate-300 font-bold uppercase tracking-wider">
              Spaced Active Recall Cards (Click card to flip)
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click.stop="flipAllCards"
              class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5"
            >
              <svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M8 16H3v5"/>
              </svg>
              <span>Flip All</span>
            </button>
            <button
              @click.stop="toggleAutoFlip"
              class="px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
              :class="isAutoFlipping
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'"
            >
              <svg v-if="isAutoFlipping" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="5" height="18" x="14" y="3" rx="1"/>
                <rect width="5" height="18" x="5" y="3" rx="1"/>
              </svg>
              <svg v-else class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>
              </svg>
              <span>{{ isAutoFlipping ? 'Stop Sequence' : 'Auto Flip Sequence' }}</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3.5">
          <div
            v-for="(card, cIdx) in flashcards"
            :key="card.id"
            @click.stop="toggleCard(cIdx)"
            class="card-scene cursor-pointer h-52 select-none"
          >
            <div
              class="card-flipper relative w-full h-full rounded-2xl"
              :class="{ flipped: card.isFlipped }"
            >
              <!-- FRONT: Abstract Question (No Text) -->
              <div
                class="card-front absolute inset-0 p-4 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-indigo-400/60 shadow-xl flex flex-col justify-between"
              >
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px] font-bold">
                    {{ card.tag }}
                  </span>
                  <span class="flex items-center gap-1 text-[10px] font-mono text-indigo-400">
                    <span class="i-lucide-help-circle w-3.5 h-3.5"></span>
                    <span>Question</span>
                  </span>
                </div>

                <div class="flex flex-col items-center justify-center gap-3 my-auto py-2">
                  <div class="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/50 flex items-center justify-center text-indigo-300 shadow-lg shadow-indigo-950/50">
                    <span class="text-2xl font-bold font-mono">?</span>
                  </div>

                  <div class="w-full flex flex-col items-center gap-1.5 opacity-75">
                    <div class="w-3/4 h-2 rounded-full bg-slate-700 animate-pulse"></div>
                    <div class="w-1/2 h-2 rounded-full bg-slate-800"></div>
                  </div>
                </div>

                <div class="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
                  <span class="flex items-center gap-1 text-slate-400">
                    <span class="i-lucide-mouse-pointer-click w-3 h-3 text-indigo-400"></span>
                    <span>Click to flip</span>
                  </span>
                  <span class="text-indigo-400 font-bold">Spaced Recall</span>
                </div>
              </div>

              <!-- BACK: Correct or Wrong Answer State -->
              <div
                class="card-back absolute inset-0 p-4 rounded-2xl shadow-xl flex flex-col justify-between border"
                :class="card.isCorrect
                  ? 'bg-emerald-950/50 border-emerald-500/90 shadow-emerald-950/50 ring-1 ring-emerald-500/50'
                  : 'bg-rose-950/50 border-rose-500/90 shadow-rose-950/50 ring-1 ring-rose-500/50'"
              >
                <div class="flex items-center justify-between">
                  <span
                    class="px-2 py-0.5 rounded font-mono text-[10px] font-bold border"
                    :class="card.isCorrect
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'"
                  >
                    {{ card.tag }}
                  </span>

                  <span
                    class="flex items-center gap-1 font-mono text-[11px] font-bold"
                    :class="card.isCorrect ? 'text-emerald-400' : 'text-rose-400'"
                  >
                    <span :class="card.isCorrect ? 'i-lucide-check-circle-2' : 'i-lucide-x-circle'" class="w-4 h-4"></span>
                    <span>{{ card.isCorrect ? 'CORRECT' : 'WRONG' }}</span>
                  </span>
                </div>

                <div class="flex flex-col items-center justify-center gap-2.5 my-auto py-2">
                  <div
                    class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                    :class="card.isCorrect
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/80'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-400/80'"
                  >
                    <span :class="card.isCorrect ? 'i-lucide-check' : 'i-lucide-x'" class="w-8 h-8 font-bold"></span>
                  </div>

                  <div class="w-full flex flex-col items-center gap-1.5 opacity-80">
                    <div
                      class="w-4/5 h-2 rounded-full"
                      :class="card.isCorrect ? 'bg-emerald-400/60' : 'bg-rose-400/60'"
                    ></div>
                    <div
                      class="w-3/5 h-2 rounded-full"
                      :class="card.isCorrect ? 'bg-emerald-500/30' : 'bg-rose-500/30'"
                    ></div>
                  </div>
                </div>

                <div
                  class="flex items-center justify-between text-[10px] font-mono border-t pt-2"
                  :class="card.isCorrect ? 'border-emerald-900/60 text-emerald-300' : 'border-rose-900/60 text-rose-300'"
                >
                  <span>Interval</span>
                  <span class="font-bold text-xs" :class="card.isCorrect ? 'text-emerald-400' : 'text-rose-400'">
                    {{ card.interval }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= STEP 3: Cooking / Culinary Steak Searing Drill ================= -->
      <div v-else-if="domain === 'cooking'" class="flex flex-col gap-2.5 py-1">
        <!-- Top Toolbar & Cooking Actions -->
        <div class="flex items-center justify-between px-1">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold uppercase">
              Home Cooking Drill
            </span>
            <span class="text-[11px] font-mono text-slate-400">
              Searing the Perfect Steak: Heat &amp; Timing
            </span>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-2">
            <button
              @click.stop="nextCookingStep"
              class="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer active:scale-95"
            >
              <span class="i-lucide-arrow-right w-3.5 h-3.5"></span>
              <span>Next Step</span>
            </button>
            <button
              @click.stop="toggleAutoCooking"
              class="px-3 py-1 rounded-lg border text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer active:scale-95"
              :class="isAutoCookingRunning
                ? 'bg-amber-950 border-amber-500 text-amber-300 shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'"
            >
              <span :class="isAutoCookingRunning ? 'i-lucide-pause' : 'i-lucide-play'" class="w-3.5 h-3.5 text-amber-400"></span>
              <span>{{ isAutoCookingRunning ? 'Pause' : 'Auto Cook' }}</span>
            </button>
            <button
              @click.stop="resetCooking"
              class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer"
              title="Reset steps"
            >
              <span class="i-lucide-rotate-ccw w-3.5 h-3.5"></span>
              <span>Reset</span>
            </button>
          </div>
        </div>

        <!-- Central Culinary Process Canvas -->
        <div class="relative w-full h-52 rounded-xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner">
          <!-- Horizontal Timeline Station Pipeline -->
          <div class="relative flex items-center justify-between px-2 pt-1 pb-2">
            <!-- Connecting SVG Pipeline Tube -->
            <svg class="absolute top-5.5 left-6 right-6 h-1 w-[calc(100%-48px)] pointer-events-none" preserveAspectRatio="none">
              <line x1="0" y1="2" x2="100%" y2="2" stroke="#334155" stroke-width="2.5" />
              <line
                x1="0"
                y1="2"
                :x2="`${((cookingStep - 1) / 5) * 100}%`"
                stroke="#f59e0b"
                stroke-width="3"
                class="transition-all duration-300"
              />
            </svg>

            <!-- 6 Stages Stations -->
            <div
              v-for="stg in cookingStages"
              :key="stg.id"
              @click.stop="jumpToCookingStage(stg.id)"
              class="flex flex-col items-center cursor-pointer relative z-10 transition-all duration-300 group"
            >
              <div
                class="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold transition-all duration-300 border-2 shadow-md"
                :class="[
                  cookingStep === stg.id
                    ? 'bg-amber-500 border-white text-slate-950 scale-115 ring-4 ring-amber-400/50 shadow-amber-500/40 animate-pulse'
                    : cookingStep > stg.id
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                      : 'bg-slate-950 border-slate-700 text-slate-500 group-hover:border-slate-500 group-hover:text-slate-300'
                ]"
              >
                <span v-if="cookingStep > stg.id" class="i-lucide-check w-4 h-4 text-emerald-400"></span>
                <span v-else class="text-xs">{{ stg.id }}</span>
              </div>
              <span
                class="text-[9.5px] font-mono mt-1 transition-all"
                :class="cookingStep === stg.id ? 'text-amber-300 font-bold' : (cookingStep > stg.id ? 'text-emerald-400' : 'text-slate-500')"
              >
                {{ stg.title }}
              </span>
            </div>
          </div>

          <!-- Active Stage Card: Parameters, Chef Rule & Steak Visual -->
          <div class="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4 mt-1">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-white font-serif flex items-center gap-1.5">
                  <span :class="currentCookingStage.icon" class="w-3.5 h-3.5 text-amber-400"></span>
                  Step {{ currentCookingStage.id }}: {{ currentCookingStage.action }}
                </span>
                <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                  {{ currentCookingStage.heat }} &bull; {{ currentCookingStage.timing }}
                </span>
              </div>

              <p class="text-[10.5px] text-slate-300 font-sans leading-tight">
                {{ currentCookingStage.tip }}
              </p>
            </div>

            <!-- Visual Steak Doneness Monitor -->
            <div class="flex items-center gap-2.5 shrink-0 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono">
              <div class="flex flex-col text-right">
                <span class="text-slate-400 text-[8.5px] uppercase">State:</span>
                <span class="text-amber-300 font-bold text-[9.5px] max-w-[140px] truncate">{{ currentCookingStage.status }}</span>
              </div>

              <!-- Mini Steak Cross-Section Graphic -->
              <svg class="w-10 h-7 rounded-md bg-slate-950 border border-slate-800 p-0.5" viewBox="0 0 40 28">
                <!-- Outer Sear Crust -->
                <rect x="2" y="4" width="36" height="20" rx="4" :fill="cookingStep >= 3 ? '#451a03' : '#991b1b'" stroke="#78350f" stroke-width="1.2" />
                <!-- Inner Meat Center -->
                <rect x="5" y="7" width="30" height="14" rx="2" :fill="cookingStep >= 5 ? '#f43f5e' : (cookingStep >= 3 ? '#e11d48' : '#be123c')" opacity="0.9" />
                <!-- Warm Center Core for Medium-Rare -->
                <ellipse v-if="cookingStep >= 4" cx="20" cy="14" rx="8" ry="4" fill="#fda4af" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Bottom Traversal State: Kitchen Golden Rule & Progress -->
        <div class="grid grid-cols-12 gap-2 text-xs font-mono">
          <!-- Chef Rule -->
          <div class="col-span-8 p-2 rounded-lg bg-slate-900/90 border border-amber-500/30 flex items-center justify-between">
            <span class="text-[10px] uppercase text-amber-400 font-bold flex items-center gap-1">
              <span class="i-lucide-lightbulb w-3.5 h-3.5 text-amber-400"></span>
              <span>Kitchen Rule:</span>
            </span>
            <span class="text-[10.5px] text-slate-200">
              {{ currentCookingStage.id === 6 ? 'Never cut immediately; resting 5 mins locks juices inside.' : 'High heat creates the crust; gentle basting cooks the center.' }}
            </span>
          </div>

          <!-- Sequence Tracker -->
          <div class="col-span-4 p-2 rounded-lg bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
            <span class="text-[10px] uppercase text-emerald-400 font-bold flex items-center gap-1">
              <span class="i-lucide-check-circle-2 w-3.5 h-3.5"></span>
              <span>Progress:</span>
            </span>
            <div class="flex items-center gap-1 text-[10px]">
              <span class="text-white font-bold">{{ currentCookingStage.title }}</span>
              <span class="text-slate-500">({{ currentCookingStage.id }}/6)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= STEP 3: Breadth First Search (BFS) Graph of Numbers ================= -->
      <div v-else class="flex flex-col gap-2.5 py-1">
        <!-- Top Toolbar & BFS Actions (No explanatory text) -->
        <div class="flex items-center justify-between px-1">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold uppercase">
              Breadth First Search (BFS)
            </span>
            <span class="text-[11px] font-mono text-slate-400">
              Level-by-Level Exploration
            </span>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-2">
            <button
              @click.stop="nextBfsStep"
              class="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432zM3 4v16"/>
              </svg>
              <span>Next Node</span>
            </button>
            <button
              @click.stop="toggleAutoBfs"
              class="px-3 py-1 rounded-lg border text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer"
              :class="isAutoBfsRunning
                ? 'bg-amber-950 border-amber-500 text-amber-300 shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'"
            >
              <svg v-if="isAutoBfsRunning" class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="5" height="18" x="14" y="3" rx="1"/>
                <rect width="5" height="18" x="5" y="3" rx="1"/>
              </svg>
              <svg v-else class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>
              </svg>
              <span>{{ isAutoBfsRunning ? 'Pause' : 'Auto Traverse' }}</span>
            </button>
            <button
              @click.stop="resetBfs"
              class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer"
              title="Reset traversal"
            >
              <svg class="w-3.5 h-3.5 text-slate-400 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              <span>Reset</span>
            </button>
          </div>
        </div>

        <!-- Central Graph Canvas with Actual SVG Edges and Number Node Buttons -->
        <div class="relative w-full h-52 rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden">
          <!-- Background SVG Edges Connecting Nodes -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line
              v-for="(e, eIdx) in edges"
              :key="eIdx"
              :x1="e.x1"
              :y1="e.y1"
              :x2="e.x2"
              :y2="e.y2"
              :stroke="currentBfsState.visited.includes(e.to) || currentBfsState.current === e.to ? '#10b981' : '#334155'"
              :stroke-width="currentBfsState.visited.includes(e.to) || currentBfsState.current === e.to ? '1.4' : '0.8'"
              :stroke-dasharray="currentBfsState.current === e.to ? '2 1' : 'none'"
              class="transition-all duration-300"
            />
          </svg>

          <!-- Number Buttons Arranged as Tree / Graph -->
          <div
            v-for="node in bfsGraphNodes"
            :key="node.id"
            @click.stop="jumpToNode(node.id)"
            class="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all duration-300"
            :style="{ left: `${node.x}%`, top: `${node.y}%` }"
          >
            <button
              type="button"
              class="w-11 h-11 rounded-full flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 border-2 shadow-lg"
              :class="[
                currentBfsState.current === node.id
                  ? 'bg-amber-500 border-white text-slate-950 scale-125 ring-4 ring-amber-400/60 shadow-amber-500/50 z-20 animate-pulse'
                  : currentBfsState.visited.includes(node.id)
                    ? 'bg-emerald-950 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/40 shadow-emerald-950/60'
                    : currentBfsState.queue.includes(node.id)
                      ? 'bg-indigo-950 border-indigo-400 text-indigo-200 ring-2 ring-indigo-500/30'
                      : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
              ]"
            >
              <span class="text-sm font-extrabold leading-none">{{ node.id }}</span>
              <span
                class="text-[7.5px] uppercase tracking-tighter mt-0.5 font-sans"
                :class="currentBfsState.current === node.id ? 'text-slate-900 font-bold' : 'text-slate-400'"
              >
                L{{ node.level }}
              </span>
            </button>
          </div>
        </div>

        <!-- Bottom Traversal State: FIFO Queue & BFS Visited Sequence -->
        <div class="grid grid-cols-12 gap-2 text-xs font-mono">
          <!-- FIFO Queue -->
          <div class="col-span-6 p-2 rounded-lg bg-slate-900/90 border border-indigo-500/30 flex items-center justify-between">
            <span class="text-[10px] uppercase text-indigo-400 font-bold flex items-center gap-1">
              <span class="i-lucide-layers w-3.5 h-3.5"></span>
              <span>FIFO Queue:</span>
            </span>
            <div class="flex items-center gap-1">
              <span
                v-for="qItem in currentBfsState.queue"
                :key="qItem"
                class="w-6 h-6 rounded-md bg-indigo-500/20 border border-indigo-400 text-indigo-200 flex items-center justify-center text-xs font-bold"
              >
                {{ qItem }}
              </span>
              <span v-if="currentBfsState.queue.length === 0" class="text-slate-500 text-[10px] italic">
                Queue Empty
              </span>
            </div>
          </div>

          <!-- Visited Sequence -->
          <div class="col-span-6 p-2 rounded-lg bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
            <span class="text-[10px] uppercase text-emerald-400 font-bold flex items-center gap-1">
              <span class="i-lucide-check-circle-2 w-3.5 h-3.5"></span>
              <span>Visited (BFS Order):</span>
            </span>
            <div class="flex items-center gap-1">
              <span
                v-for="(vItem, vIdx) in currentBfsState.visited"
                :key="vItem"
                class="flex items-center gap-1"
              >
                <span class="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-400 text-emerald-200 flex items-center justify-center text-xs font-bold">
                  {{ vItem }}
                </span>
                <span v-if="vIdx < currentBfsState.visited.length - 1" class="text-slate-600 text-[10px]">&rarr;</span>
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes scanBeam {
  0% { transform: translateY(-30px); opacity: 0; }
  50% { opacity: 0.9; }
  100% { transform: translateY(40px); opacity: 0; }
}
.scan-beam {
  animation: scanBeam 2.2s ease-in-out infinite;
}

/* 3D Card Flip CSS */
.card-scene {
  perspective: 1000px;
}
.card-flipper {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.card-flipper.flipped {
  transform: rotateY(180deg);
}
.card-front,
.card-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
</style>
