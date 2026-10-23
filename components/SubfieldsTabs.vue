<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import AppIconTooltip from './AppIconTooltip.vue'

interface Subfield {
  id: string
  name: string
  subtitle: string
  badge: string
  color: string
  desc: string
  mechanisms: string[]
  productionStack: string[]
}

const appsMap: Record<string, { name: string; icon: string }[]> = {
  cv: [
    { name: 'Google Photos', icon: 'i-logos-google-photos' },
    { name: 'Instagram', icon: 'i-lucide-instagram text-white' },
    { name: 'TikTok', icon: 'i-logos-tiktok-icon' },
    { name: 'Pinterest', icon: 'i-logos-pinterest' },
  ],
  nlp: [
    { name: 'Grammarly', icon: 'i-logos-grammarly-icon' },
    { name: 'Google Translate', icon: 'i-logos-google' },
    { name: 'Spotify', icon: 'i-logos-spotify-icon' },
    { name: 'Hugging Face', icon: 'i-logos-hugging-face-icon' },
  ],
  llm: [
    { name: 'ChatGPT', icon: 'i-logos-openai-icon brightness-0 invert text-white' },
    { name: 'Claude', icon: 'i-logos-claude-icon' },
    { name: 'Gemini', icon: 'i-logos-google-gemini' },
    { name: 'GitHub Copilot', icon: 'i-logos-github-copilot brightness-0 invert text-white' },
  ],
  auto: [
    { name: 'n8n', icon: 'i-logos-n8n-icon' },
    { name: 'Zapier', icon: 'i-logos-zapier-icon' },
    { name: 'Airtable', icon: 'i-logos-airtable' },
  ],
}

const automationSteps = [
  {
    title: '1. Webhook Event',
    role: 'Trigger Source',
    color: 'border-cyan-500/40 text-cyan-400',
    apps: [
      { name: 'Stripe', icon: 'i-logos-stripe' },
      { name: 'GitHub', icon: 'i-lucide-github text-white' },
      { name: 'Slack', icon: 'i-logos-slack-icon' },
    ],
  },
  {
    title: '2. LLM Parse',
    role: 'Model Engine',
    color: 'border-indigo-500/40 text-indigo-400',
    apps: [
      { name: 'OpenAI (ChatGPT)', icon: 'i-logos-openai-icon brightness-0 invert text-white' },
      { name: 'Claude', icon: 'i-logos-claude-icon' },
      { name: 'Gemini', icon: 'i-logos-google-gemini' },
    ],
  },
  {
    title: '3. Action / DB',
    role: 'Storage / CRM',
    color: 'border-emerald-500/40 text-emerald-400',
    apps: [
      { name: 'Notion', icon: 'i-logos-notion-icon' },
      { name: 'Airtable', icon: 'i-logos-airtable' },
      { name: 'Supabase', icon: 'i-logos-supabase-icon' },
    ],
  },
]

interface PredictionCandidate {
  word: string
  prob: number
  percent: string
}

interface PredictionStep {
  context: string[]
  candidates: PredictionCandidate[]
  selectedWord: string
}

const subfields: Subfield[] = [
  {
    id: 'cv',
    name: 'Computer Vision (CV)',
    subtitle: 'Visual Perception',
    badge: 'i-lucide-eye',
    color: 'text-indigo-400 border-indigo-500',
    desc: 'Extracts semantic structures and spatial features from raw matrices of image pixels and video frames.',
    mechanisms: ['Convolutional Filters', 'Object Detection (YOLO)', 'Semantic Segmentation', 'Feature Embeddings'],
    productionStack: ['OpenCV', 'PyTorch Vision', 'YOLOv11', 'Segment Anything (SAM)'],
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing (NLP)',
    subtitle: 'Linguistics & Semantics',
    badge: 'i-lucide-message-square',
    color: 'text-emerald-400 border-emerald-500',
    desc: 'Deconstructs syntax, sentiment, entities, and semantic relationships across unstructured human language.',
    mechanisms: ['Subword Tokenization (BPE)', 'Vector Embeddings', 'Named Entity Recognition (NER)', 'Cross-Attention'],
    productionStack: ['Hugging Face', 'spaCy', 'tiktoken', 'FastText'],
  },
  {
    id: 'llm',
    name: 'Large Language Models (LLMs)',
    subtitle: 'Foundation Generators',
    badge: 'i-lucide-cpu',
    color: 'text-amber-400 border-amber-500',
    desc: 'Massive autoregressive transformers trained on trillions of tokens to generate text, code, and structured output.',
    mechanisms: ['Self-Attention Mechanism', 'RLHF & Direct Preference Opt', 'Context Windows', 'In-Context Learning'],
    productionStack: ['vLLM', 'Ollama', 'LangChain', 'Llama.cpp'],
  },
  {
    id: 'auto',
    name: 'Workflow Automation',
    subtitle: 'System Orchestration',
    badge: 'i-lucide-workflow',
    color: 'text-cyan-400 border-cyan-500',
    desc: 'Bridges foundation models to enterprise systems, APIs, database tables, and real-time event webhooks.',
    mechanisms: ['Event Webhooks', 'Structured Function Calling', 'Autonomous Agent Loops', 'Data Transformation'],
    productionStack: ['n8n', 'Zapier', 'Temporal', 'Make.com'],
  },
]

const active = ref<Subfield>(subfields[0])
const sampleTokens = ref([
  { word: 'AI', id: 9552 },
  { word: ' transforms', id: 18231 },
  { word: ' software', id: 3749 },
  { word: ' engineering', id: 9284 },
])

const predictionSteps: PredictionStep[] = [
  {
    context: ['AI'],
    selectedWord: 'creates',
    candidates: [
      { word: 'creates', prob: 0.68, percent: '68%' },
      { word: 'processes', prob: 0.20, percent: '20%' },
      { word: 'learns', prob: 0.12, percent: '12%' },
    ],
  },
  {
    context: ['AI', 'creates'],
    selectedWord: 'intelligent',
    candidates: [
      { word: 'intelligent', prob: 0.74, percent: '74%' },
      { word: 'digital', prob: 0.17, percent: '17%' },
      { word: 'complex', prob: 0.09, percent: '9%' },
    ],
  },
  {
    context: ['AI', 'creates', 'intelligent'],
    selectedWord: 'autonomous',
    candidates: [
      { word: 'autonomous', prob: 0.65, percent: '65%' },
      { word: 'automated', prob: 0.23, percent: '23%' },
      { word: 'scalable', prob: 0.12, percent: '12%' },
    ],
  },
  {
    context: ['AI', 'creates', 'intelligent', 'autonomous'],
    selectedWord: 'systems.',
    candidates: [
      { word: 'systems.', prob: 0.81, percent: '81%' },
      { word: 'agents.', prob: 0.13, percent: '13%' },
      { word: 'models.', prob: 0.06, percent: '6%' },
    ],
  },
]

const currentStepIdx = ref(0)
const isSelectedPhase = ref(false)
let timer: any = null

function runAnimationCycle() {
  clearTimeout(timer)
  isSelectedPhase.value = false
  timer = setTimeout(() => {
    isSelectedPhase.value = true
    timer = setTimeout(() => {
      if (currentStepIdx.value < predictionSteps.length - 1) {
        currentStepIdx.value++
        runAnimationCycle()
      } else {
        timer = setTimeout(() => {
          currentStepIdx.value = 0
          runAnimationCycle()
        }, 2200)
      }
    }, 900)
  }, 950)
}

function resetAnimation() {
  clearTimeout(timer)
  currentStepIdx.value = 0
  runAnimationCycle()
}

watch(() => active.value.id, (id) => {
  if (id === 'llm') resetAnimation()
  else clearTimeout(timer)
})

onMounted(() => {
  if (active.value.id === 'llm') resetAnimation()
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Tab Headers with Icons -->
    <div class="flex gap-2">
      <button
        v-for="s in subfields"
        :key="s.id"
        @click="active = s"
        class="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer"
        :class="[
          active.id === s.id
            ? 'bg-slate-800 border-slate-500 text-white shadow-md'
            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
        ]"
      >
        <span :class="s.badge" class="w-4 h-4"></span>
        <span class="font-serif font-bold">{{ s.name.split(' (')[0] }}</span>
      </button>
    </div>

    <!-- Tab Content Body: Grid 12 -->
    <transition name="fade" mode="out-in">
      <div :key="active.id" class="grid grid-cols-12 gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 text-left min-h-[260px]">
        <!-- Left: Specifications -->
        <div class="col-span-6 flex flex-col justify-between pr-2 border-r border-slate-800">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono uppercase tracking-wider text-slate-400">{{ active.subtitle }}</span>
            </div>
            <h3 class="text-xl font-bold text-white mt-1 font-serif">{{ active.name }}</h3>
            <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
              {{ active.desc }}
            </p>
          </div>

          <div class="space-y-3 mt-3">
            <div>
              <div class="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">Core Mechanisms:</div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="m in active.mechanisms"
                  :key="m"
                  class="text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono"
                >
                  {{ m }}
                </span>
              </div>
            </div>

            <div>
              <div class="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">Standard Production Stack:</div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="st in active.productionStack"
                  :key="st"
                  class="text-[11px] px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 font-mono"
                >
                  {{ st }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Animated Visual Demonstration -->
        <div class="col-span-6 flex flex-col justify-center items-center pl-2">
          <!-- Visual for CV -->
          <div v-if="active.id === 'cv'" class="w-full flex flex-col items-center gap-2">
            <div class="relative w-64 h-32 rounded-lg bg-slate-950 border border-slate-700 overflow-hidden flex items-center justify-center">
              <!-- Grid background -->
              <div class="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              <!-- Simulated Bounding Box -->
              <div class="relative z-10 w-36 h-20 border-2 border-indigo-400 rounded bg-indigo-500/10 flex flex-col justify-between p-1.5 animate-pulse">
                <div class="flex justify-between items-center text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-1 rounded">
                  <span>object: car</span>
                  <span>98.4%</span>
                </div>
                <div class="flex-1 flex items-center justify-center">
                  <span class="i-lucide-car size-8 text-indigo-300/80"></span>
                </div>
                <div class="text-[9px] font-mono text-slate-400">[x: 142, y: 88, w: 220, h: 140]</div>
              </div>
            </div>
            <div class="text-[11px] font-mono text-slate-400 text-center">
              Matrix decomposition into convolutional feature activations.
            </div>
            <!-- Popular Apps -->
            <div class="flex items-center gap-3 pt-1 border-t border-slate-800/80 mt-1">
              <span class="text-[10px] font-mono uppercase text-slate-400">Apps:</span>
              <div class="flex items-center gap-2">
                <AppIconTooltip
                  v-for="app in appsMap.cv"
                  :key="app.name"
                  :name="app.name"
                  :icon="app.icon"
                />
              </div>
            </div>
          </div>

          <!-- Visual for NLP -->
          <div v-else-if="active.id === 'nlp'" class="w-full flex flex-col items-center gap-2">
            <div class="text-xs font-mono text-slate-400">Byte-Pair Tokenization & Vector IDs:</div>
            <div class="flex gap-2">
              <div
                v-for="t in sampleTokens"
                :key="t.id"
                class="p-2 rounded-lg bg-slate-950 border border-emerald-500/40 text-center"
              >
                <div class="text-xs font-bold text-emerald-300">"{{ t.word }}"</div>
                <div class="text-[10px] font-mono text-slate-400 mt-1">ID: {{ t.id }}</div>
              </div>
            </div>
            <div class="text-[11px] font-mono text-slate-400 text-center">
              Words map to high-dimensional embedding vectors in continuous semantic space.
            </div>
            <!-- Popular Apps -->
            <div class="flex items-center gap-3 pt-1 border-t border-slate-800/80 mt-1">
              <span class="text-[10px] font-mono uppercase text-slate-400">Apps:</span>
              <div class="flex items-center gap-2">
                <AppIconTooltip
                  v-for="app in appsMap.nlp"
                  :key="app.name"
                  :name="app.name"
                  :icon="app.icon"
                />
              </div>
            </div>
          </div>

          <!-- Visual for LLMs: Animated Autoregressive Next-Token Prediction -->
          <div v-else-if="active.id === 'llm'" class="w-full flex flex-col gap-2">
            <!-- Context Stream Prompt -->
            <div class="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Token Sequence Context:</span>
              <button
                @click="resetAnimation"
                class="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer text-[10px]"
                title="Restart animation"
              >
                <span class="i-lucide-rotate-ccw w-3 h-3"></span> Restart
              </button>
            </div>

            <!-- Context words chip strip -->
            <div class="p-2 rounded-lg bg-slate-950 border border-slate-800 flex flex-wrap items-center gap-1.5 min-h-[38px]">
              <span
                v-for="(w, idx) in predictionSteps[currentStepIdx].context"
                :key="idx"
                class="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700"
              >
                {{ w }}
              </span>
              <!-- Newly appended word during selected phase -->
              <span
                v-if="isSelectedPhase"
                class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/60 animate-pulse"
              >
                + {{ predictionSteps[currentStepIdx].selectedWord }}
              </span>
              <span v-else class="text-amber-400 font-mono text-xs animate-ping ml-0.5">_</span>
            </div>

            <!-- Top-3 candidate distribution -->
            <div class="p-2 rounded-lg bg-slate-950 border border-slate-800 space-y-1 font-mono text-xs">
              <div class="flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                <span>Candidate Distribution (Top 3):</span>
                <span>Step {{ currentStepIdx + 1 }}/4</span>
              </div>

              <div
                v-for="cand in predictionSteps[currentStepIdx].candidates"
                :key="cand.word"
                class="p-1 rounded transition-all duration-300"
                :class="[
                  isSelectedPhase && cand.word === predictionSteps[currentStepIdx].selectedWord
                    ? 'bg-amber-500/15 border border-amber-500/50'
                    : isSelectedPhase
                      ? 'opacity-40'
                      : 'border border-transparent'
                ]"
              >
                <div class="flex justify-between items-center text-[11px]" :class="cand.word === predictionSteps[currentStepIdx].selectedWord && isSelectedPhase ? 'text-amber-300 font-bold' : 'text-slate-300'">
                  <span>"{{ cand.word }}"</span>
                  <span class="text-[10px]" :class="cand.word === predictionSteps[currentStepIdx].selectedWord && isSelectedPhase ? 'text-amber-400 font-bold' : 'text-slate-400'">
                    p = {{ cand.prob }} {{ cand.word === predictionSteps[currentStepIdx].selectedWord && isSelectedPhase ? '(Selected)' : '' }}
                  </span>
                </div>
                <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-0.5">
                  <div
                    class="h-full transition-all duration-500 rounded-full"
                    :class="cand.word === predictionSteps[currentStepIdx].selectedWord && isSelectedPhase ? 'bg-amber-400' : 'bg-slate-500'"
                    :style="{ width: cand.percent }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Popular Apps -->
            <div class="flex items-center gap-3 pt-1 border-t border-slate-800/80">
              <span class="text-[10px] font-mono uppercase text-slate-400">Apps:</span>
              <div class="flex items-center gap-2">
                <AppIconTooltip
                  v-for="app in appsMap.llm"
                  :key="app.name"
                  :name="app.name"
                  :icon="app.icon"
                />
              </div>
            </div>
          </div>

          <!-- Visual for Automation -->
          <div v-else class="w-full flex flex-col items-center gap-3">
            <!-- 3 Pipeline Steps with What They Could Be -->
            <div class="grid grid-cols-3 gap-2 w-full font-mono">
              <div
                v-for="step in automationSteps"
                :key="step.title"
                class="p-2.5 rounded-lg bg-slate-950 border flex flex-col gap-1.5"
                :class="step.color"
              >
                <div class="text-[10px] uppercase font-bold tracking-wider">{{ step.title }}</div>
                <div class="text-[11px] text-slate-300 font-sans">{{ step.role }}:</div>
                <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <AppIconTooltip
                    v-for="app in step.apps"
                    :key="app.name"
                    :name="app.name"
                    :icon="app.icon"
                    size="size-6"
                  />
                </div>
              </div>
            </div>

            <div class="text-[11px] font-mono text-slate-400 text-center">
              Autonomous execution bridges real triggers directly to databases.
            </div>

            <!-- Popular Automation Platforms -->
            <div class="flex items-center gap-3 pt-1 border-t border-slate-800/80 w-full justify-center">
              <span class="text-[10px] font-mono uppercase text-slate-400">Platforms:</span>
              <div class="flex items-center gap-2">
                <AppIconTooltip
                  v-for="app in appsMap.auto"
                  :key="app.name"
                  :name="app.name"
                  :icon="app.icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
