<script setup lang="ts">
import { ref } from 'vue'

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
            <div class="relative w-64 h-36 rounded-lg bg-slate-950 border border-slate-700 overflow-hidden flex items-center justify-center">
              <!-- Grid background -->
              <div class="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              <!-- Simulated Bounding Box -->
              <div class="relative z-10 w-36 h-24 border-2 border-indigo-400 rounded bg-indigo-500/10 flex flex-col justify-between p-1 animate-pulse">
                <div class="flex justify-between items-center text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-1 rounded">
                  <span>object: car</span>
                  <span>98.4%</span>
                </div>
                <div class="text-[9px] font-mono text-slate-400">[x: 142, y: 88, w: 220, h: 140]</div>
              </div>
            </div>
            <div class="text-[11px] font-mono text-slate-400 text-center">
              Matrix decomposition into convolutional feature activations.
            </div>
          </div>

          <!-- Visual for NLP -->
          <div v-else-if="active.id === 'nlp'" class="w-full flex flex-col items-center gap-3">
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
            <div class="text-[11px] font-mono text-slate-400 text-center mt-1">
              Words map to high-dimensional embedding vectors in continuous semantic space.
            </div>
          </div>

          <!-- Visual for LLMs -->
          <div v-else-if="active.id === 'llm'" class="w-full flex flex-col gap-2">
            <div class="text-xs font-mono text-slate-400">Autoregressive Next-Token Probability:</div>
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-xs">
              <div class="flex justify-between items-center text-amber-300">
                <span>1. "systems"</span>
                <span class="text-[11px] text-slate-400">p = 0.72 (Selected)</span>
              </div>
              <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div class="bg-amber-400 h-full w-[72%]"></div>
              </div>

              <div class="flex justify-between items-center text-slate-400 text-[11px] pt-1">
                <span>2. "interfaces"</span>
                <span>p = 0.16</span>
              </div>
              <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div class="bg-slate-500 h-full w-[16%]"></div>
              </div>

              <div class="flex justify-between items-center text-slate-400 text-[11px]">
                <span>3. "pipelines"</span>
                <span>p = 0.08</span>
              </div>
              <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div class="bg-slate-500 h-full w-[8%]"></div>
              </div>
            </div>
          </div>

          <!-- Visual for Automation -->
          <div v-else class="w-full flex flex-col items-center gap-2">
            <div class="flex items-center gap-2 font-mono text-xs">
              <div class="p-2 rounded bg-slate-950 border border-cyan-500/40 text-cyan-300">
                Webhook Event
              </div>
              <span class="text-slate-500">→</span>
              <div class="p-2 rounded bg-slate-950 border border-indigo-500/40 text-indigo-300">
                LLM Parse
              </div>
              <span class="text-slate-500">→</span>
              <div class="p-2 rounded bg-slate-950 border border-emerald-500/40 text-emerald-300">
                Post DB
              </div>
            </div>
            <div class="text-[11px] font-mono text-slate-400 text-center mt-2">
              System actions fire autonomously with zero human copy-paste required.
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
