<script setup lang="ts">
import { ref } from 'vue'

interface Stage {
  id: string
  number: string
  title: string
  tool: string
  icon: string
  accentColor: string
  activeBorder: string
  badgeBg: string
  summary: string
  keyPoints: { icon: string; title: string; text: string }[]
}

const stages: Stage[] = [
  {
    id: 'stage1',
    number: '01',
    title: 'Grounded Ingestion',
    tool: 'Google NotebookLM',
    icon: 'i-lucide-book-open',
    accentColor: 'indigo',
    activeBorder: 'border-indigo-500',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    summary: 'Constrain LLM strictly to your course PDFs with zero hallucination.',
    keyPoints: [
      { icon: 'i-lucide-shield-check', title: 'Zero Hallucination', text: 'Responses strictly cite uploaded PDFs with page anchors.' },
      { icon: 'i-lucide-headphones', title: 'Audio Overview', text: 'Synthesizes 2-host podcast discussions from complex chapters.' }
    ]
  },
  {
    id: 'stage2',
    number: '02',
    title: 'Active Recall Synthesis',
    tool: 'Claude & Anki',
    icon: 'i-lucide-brain',
    accentColor: 'emerald',
    activeBorder: 'border-emerald-500',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    summary: 'Convert dense slides into high-yield spaced repetition flashcards.',
    keyPoints: [
      { icon: 'i-lucide-layers', title: 'Cloze Deletion', text: 'Extracts core formulas and keywords for rapid recall.' },
      { icon: 'i-lucide-message-square', title: 'Interactive Drill', text: 'One-question-at-a-time tutor waiting for user response.' }
    ]
  },
  {
    id: 'stage3',
    number: '03',
    title: 'Visual Sandbox Drill',
    tool: 'Claude Artifacts',
    icon: 'i-lucide-code-2',
    accentColor: 'amber',
    activeBorder: 'border-amber-500',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    summary: 'Synthesize interactive simulations to directly manipulate abstract concepts.',
    keyPoints: [
      { icon: 'i-lucide-sparkles', title: 'Dynamic Sandboxes', text: 'Runnable visualizers for trees, pointers, and memory state.' },
      { icon: 'i-lucide-mouse-pointer-click', title: 'Direct Testing', text: 'Step through code states and observe invariant changes.' }
    ]
  }
]

const activeStageId = ref('stage1')

// Interactive Widget 1: Audio Overview & Citation
const isAudioPlaying = ref(false)
const audioProgress = ref(38)
const citationActive = ref(false)
function toggleAudio() {
  isAudioPlaying.value = !isAudioPlaying.value
}

// Interactive Widget 2: Flippable Flashcard
const isFlipped = ref(false)
const cardIndex = ref(0)
const flashcards = [
  {
    q: 'What is the worst-case lookup time of an unbalanced BST?',
    a: 'O(n) - it degrades into a linear linked list when elements are inserted sorted.',
    tag: 'Algorithms'
  },
  {
    q: 'How does Spaced Repetition leverage the Forgetting Curve?',
    a: 'Reviews items right before memory decay occurs, strengthening synaptic consolidation.',
    tag: 'Cognition'
  }
]
function nextCard() {
  isFlipped.value = false
  cardIndex.value = (cardIndex.value + 1) % flashcards.length
}

// Interactive Widget 3: Mini BST Visualizer
const bstNodes = ref([
  { val: 12, label: 'Root (12)', active: true },
  { val: 7, label: 'Left (7)', active: false },
  { val: 19, label: 'Right (19)', active: false },
  { val: 4, label: 'L-L (4)', active: false },
  { val: 9, label: 'L-R (9)', active: false }
])
const activeNodeIdx = ref(0)
function stepBst() {
  activeNodeIdx.value = (activeNodeIdx.value + 1) % bstNodes.value.length
}
</script>

<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none">
    <!-- Horizontal Pipeline Flow -->
    <div class="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
      <button
        v-for="stage in stages"
        :key="stage.id"
        @click="activeStageId = stage.id"
        :class="[
          'relative flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200',
          activeStageId === stage.id
            ? 'bg-slate-800 ' + stage.activeBorder + ' shadow-lg'
            : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
        ]"
      >
        <div class="flex items-center gap-2.5">
          <div
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold border shrink-0',
              activeStageId === stage.id ? stage.badgeBg : 'bg-slate-900 border-slate-800 text-slate-400'
            ]"
          >
            {{ stage.number }}
          </div>
          <div>
            <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400">{{ stage.tool }}</div>
            <div :class="['text-xs font-bold leading-tight', activeStageId === stage.id ? 'text-white' : 'text-slate-300']">
              {{ stage.title }}
            </div>
          </div>
        </div>
        <span :class="[stage.icon, 'w-4 h-4 shrink-0', activeStageId === stage.id ? 'text-white' : 'text-slate-500']"></span>
      </button>
    </div>

    <!-- Active Stage Interactive Workspace (Split View) -->
    <div class="grid grid-cols-12 gap-3 rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-xl min-h-[290px]">
      <!-- Left: Key Pillars & Bullet Insights (5 cols) -->
      <div class="col-span-5 flex flex-col justify-between pr-2 border-r border-slate-800/80">
        <div>
          <!-- Header Tag -->
          <div class="flex items-center gap-2 mb-2">
            <span
              v-for="s in [stages.find(st => st.id === activeStageId)!]"
              :key="s.id"
              :class="['px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border', s.badgeBg]"
            >
              Stage {{ s.number }} • {{ s.tool }}
            </span>
          </div>

          <!-- Stage Summary -->
          <h3 class="text-base font-bold text-white font-serif mb-1.5">
            {{ stages.find(s => s.id === activeStageId)?.title }}
          </h3>
          <p class="text-xs text-slate-300 leading-relaxed font-sans mb-4">
            {{ stages.find(s => s.id === activeStageId)?.summary }}
          </p>

          <!-- Key Points -->
          <div class="space-y-2.5">
            <div
              v-for="(point, idx) in stages.find(s => s.id === activeStageId)?.keyPoints"
              :key="idx"
              class="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs flex items-start gap-2.5"
            >
              <span :class="[point.icon, 'w-4 h-4 text-slate-300 shrink-0 mt-0.5']"></span>
              <div>
                <div class="text-slate-200 font-bold text-[11px]">{{ point.title }}</div>
                <div class="text-slate-400 text-[11px] leading-snug">{{ point.text }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-[10px] font-mono text-slate-500 pt-2 flex items-center gap-1.5">
          <span class="i-lucide-arrow-right w-3 h-3 text-slate-400"></span>
          <span>Interact with live simulator on the right</span>
        </div>
      </div>

      <!-- Right: Live Interactive Widget (7 cols) -->
      <div class="col-span-7 flex flex-col justify-center pl-2">
        <!-- WIDGET 1: NotebookLM Grounding & Audio Overview -->
        <div v-if="activeStageId === 'stage1'" class="flex flex-col gap-3">
          <!-- Citation Quote Box -->
          <div
            @click="citationActive = !citationActive"
            :class="[
              'p-3 rounded-xl border cursor-pointer transition-all',
              citationActive ? 'bg-indigo-950/40 border-indigo-500/70 shadow-md' : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            ]"
          >
            <div class="flex items-center justify-between text-[10px] font-mono text-indigo-400 mb-1">
              <span class="flex items-center gap-1">
                <span class="i-lucide-file-text w-3 h-3"></span>
                <span>Source: Lecture_04_Trees.pdf (Page 24)</span>
              </span>
              <span class="px-1.5 py-0.2 rounded bg-indigo-500/20 border border-indigo-500/30">Verified Citation</span>
            </div>
            <p class="text-xs text-slate-200 italic font-serif leading-snug">
              "A self-balancing binary search tree ensures O(log n) lookup by maintaining invariant height balance factor &le; 1."
            </p>
          </div>

          <!-- Audio Overview Player -->
          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2.5">
            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span class="font-bold text-white text-xs">NotebookLM Deep Dive Podcast</span>
              </div>
              <span class="text-[10px] font-mono text-slate-400">12:45 / 18:20</span>
            </div>

            <!-- Waveform Bar -->
            <div class="flex items-center gap-1 h-6 py-1">
              <div
                v-for="i in 28"
                :key="i"
                :style="{ height: isAudioPlaying ? `${(i * 17) % 20 + 6}px` : '6px' }"
                :class="[
                  'flex-1 rounded-full transition-all duration-300',
                  i <= 14 ? 'bg-indigo-500' : 'bg-slate-700'
                ]"
              ></div>
            </div>

            <!-- Player Controls -->
            <div class="flex items-center justify-between pt-1">
              <button
                @click="toggleAudio"
                class="flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs transition-all shadow"
              >
                <span :class="isAudioPlaying ? 'i-lucide-pause' : 'i-lucide-play'" class="w-3.5 h-3.5"></span>
                <span>{{ isAudioPlaying ? 'Pause Audio' : 'Play Audio Overview' }}</span>
              </button>
              <span class="text-[10px] font-mono text-slate-400">2-Host AI Discussion</span>
            </div>
          </div>
        </div>

        <!-- WIDGET 2: Flippable Anki Flashcard -->
        <div v-else-if="activeStageId === 'stage2'" class="flex flex-col gap-3">
          <!-- The Flippable Card -->
          <div
            @click="isFlipped = !isFlipped"
            :class="[
              'p-5 rounded-xl border cursor-pointer min-h-[160px] flex flex-col justify-between transition-all duration-300 transform',
              isFlipped
                ? 'bg-emerald-950/40 border-emerald-500/70 shadow-lg'
                : 'bg-slate-900 border-slate-700 hover:border-emerald-500/40'
            ]"
          >
            <div>
              <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                <span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {{ flashcards[cardIndex].tag }}
                </span>
                <span class="text-slate-400 flex items-center gap-1">
                  <span class="i-lucide-rotate-cw w-3 h-3"></span>
                  <span>{{ isFlipped ? 'Click to show question' : 'Click to flip answer' }}</span>
                </span>
              </div>

              <!-- Question or Answer Text -->
              <div class="mt-2 text-sm font-sans font-bold leading-relaxed" :class="isFlipped ? 'text-emerald-200 font-mono text-xs' : 'text-white'">
                <span v-if="!isFlipped">Q: {{ flashcards[cardIndex].q }}</span>
                <span v-else>A: {{ flashcards[cardIndex].a }}</span>
              </div>
            </div>

            <div class="text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span>Card {{ cardIndex + 1 }} of {{ flashcards.length }}</span>
              <span class="text-emerald-400">{{ isFlipped ? 'Answer Revealed' : 'Test Active Recall' }}</span>
            </div>
          </div>

          <!-- Spaced Repetition Buttons -->
          <div class="flex items-center justify-between gap-2">
            <button
              @click="nextCard"
              class="flex-1 py-1.5 px-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-[11px] font-mono text-red-300 transition-all text-center"
            >
              Again (&lt;1m)
            </button>
            <button
              @click="nextCard"
              class="flex-1 py-1.5 px-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-[11px] font-mono text-amber-300 transition-all text-center"
            >
              Hard (2d)
            </button>
            <button
              @click="nextCard"
              class="flex-1 py-1.5 px-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 transition-all text-center font-bold"
            >
              Good (4d)
            </button>
          </div>
        </div>

        <!-- WIDGET 3: Interactive Claude Artifact Simulator -->
        <div v-else class="flex flex-col gap-3">
          <!-- Mini Binary Tree Inspector -->
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-3">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-white flex items-center gap-1.5">
                <span class="i-lucide-binary w-3.5 h-3.5 text-amber-400"></span>
                <span>BST Invariant Tree Simulator</span>
              </span>
              <span class="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                Interactive Artifact
              </span>
            </div>

            <!-- Dynamic Node Graph Diagram -->
            <div class="flex items-center justify-center gap-2 py-2">
              <div
                v-for="(node, idx) in bstNodes"
                :key="node.val"
                @click="activeNodeIdx = idx"
                :class="[
                  'px-3 py-2 rounded-xl border font-mono text-xs cursor-pointer transition-all text-center',
                  activeNodeIdx === idx
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/30 scale-105 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                ]"
              >
                <div class="text-[9px] uppercase tracking-wider text-slate-500">Node</div>
                <div class="font-bold text-sm text-white">{{ node.val }}</div>
              </div>
            </div>

            <!-- Node Inspector Details -->
            <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] flex items-center justify-between">
              <span class="text-slate-400">Selected: <strong class="text-amber-300">{{ bstNodes[activeNodeIdx].label }}</strong></span>
              <span class="text-emerald-400 font-mono">Balance Factor = 0 (Balanced)</span>
            </div>
          </div>

          <!-- Step Controller -->
          <div class="flex items-center justify-between gap-2">
            <button
              @click="stepBst"
              class="flex-1 py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow"
            >
              <span class="i-lucide-step-forward w-3.5 h-3.5"></span>
              <span>Step Tree Traversal</span>
            </button>
            <span class="text-[10px] font-mono text-slate-400">Manipulate state in real-time</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
