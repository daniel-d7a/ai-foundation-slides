<script setup lang="ts">
import { ref } from 'vue'

interface Layer {
  id: string
  name: string
  short: string
  desc: string
  examples: string[]
  color: string
  borderColor: string
  bgHover: string
}

const layers: Layer[] = [
  {
    id: 'ai',
    name: 'Artificial Intelligence (AI)',
    short: 'The Grand Umbrella',
    desc: 'Any technique that enables computers to mimic human intelligence, including logic, rules, search algorithms, and machine learning.',
    examples: ['Expert Systems', 'Pathfinding (A*)', 'Game Solvers (Chess engines)'],
    color: '#6366f1',
    borderColor: 'border-indigo-500',
    bgHover: 'hover:fill-indigo-500/20',
  },
  {
    id: 'ml',
    name: 'Machine Learning (ML)',
    short: 'Learning from Data',
    desc: 'Algorithms that parse data, learn patterns from it, and make predictions or decisions without being explicitly programmed with rules.',
    examples: ['Spam Filters', 'Recommendation Engines', 'Fraud Detection', 'Random Forests'],
    color: '#10b981',
    borderColor: 'border-emerald-500',
    bgHover: 'hover:fill-emerald-500/20',
  },
  {
    id: 'dl',
    name: 'Deep Learning (DL)',
    short: 'Multi-layer Neural Networks',
    desc: 'Subset of ML based on artificial neural networks with multiple layers, capable of learning hierarchical feature representations directly from raw data.',
    examples: ['Convolutional Nets (CNNs)', 'Transformers', 'Speech Recognition', 'Self-driving perception'],
    color: '#0ea5e9',
    borderColor: 'border-cyan-500',
    bgHover: 'hover:fill-cyan-500/20',
  },
  {
    id: 'llm',
    name: 'LLMs & GenAI',
    short: 'Foundation Models',
    desc: 'Massive transformer architectures trained on internet-scale data to generate natural language, code, images, and multimodal content.',
    examples: ['Gemini', 'Claude', 'GPT-4', 'Midjourney', 'Voice Clones'],
    color: '#f59e0b',
    borderColor: 'border-amber-500',
    bgHover: 'hover:fill-amber-500/20',
  },
]

const selectedLayer = ref<Layer>(layers[3])
</script>

<template>
  <div class="grid grid-cols-12 gap-4 items-center">
    <!-- SVG Concentric Diagram -->
    <div class="col-span-6 flex justify-center items-center">
      <svg viewBox="0 0 400 400" class="w-72 h-72 drop-shadow-2xl select-none">
        <!-- Layer 1: AI (Outer) -->
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="rgba(99, 102, 241, 0.1)"
          stroke="#6366f1"
          stroke-width="2"
          class="cursor-pointer transition-all duration-300 hover:fill-indigo-500/25"
          :class="selectedLayer.id === 'ai' ? 'stroke-indigo-400 stroke-[3.5]' : 'stroke-indigo-500/60'"
          @click="selectedLayer = layers[0]"
        />
        <text x="200" y="32" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="700" letter-spacing="1">
          ARTIFICIAL INTELLIGENCE
        </text>

        <!-- Layer 2: ML -->
        <circle
          cx="200"
          cy="215"
          r="145"
          fill="rgba(16, 185, 129, 0.12)"
          stroke="#10b981"
          stroke-width="2"
          class="cursor-pointer transition-all duration-300 hover:fill-emerald-500/25"
          :class="selectedLayer.id === 'ml' ? 'stroke-emerald-400 stroke-[3.5]' : 'stroke-emerald-500/60'"
          @click="selectedLayer = layers[1]"
        />
        <text x="200" y="94" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="700" letter-spacing="1">
          MACHINE LEARNING
        </text>

        <!-- Layer 3: DL -->
        <circle
          cx="200"
          cy="235"
          r="100"
          fill="rgba(14, 165, 233, 0.15)"
          stroke="#0ea5e9"
          stroke-width="2"
          class="cursor-pointer transition-all duration-300 hover:fill-cyan-500/25"
          :class="selectedLayer.id === 'dl' ? 'stroke-cyan-400 stroke-[3.5]' : 'stroke-cyan-500/60'"
          @click="selectedLayer = layers[2]"
        />
        <text x="200" y="160" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="700" letter-spacing="0.5">
          DEEP LEARNING
        </text>

        <!-- Layer 4: GenAI / LLM (Inner) -->
        <circle
          cx="200"
          cy="260"
          r="55"
          fill="rgba(245, 158, 11, 0.22)"
          stroke="#f59e0b"
          stroke-width="2.5"
          class="cursor-pointer transition-all duration-300 hover:fill-amber-500/35"
          :class="selectedLayer.id === 'llm' ? 'stroke-amber-300 stroke-[4]' : 'stroke-amber-500/80'"
          @click="selectedLayer = layers[3]"
        />
        <text x="200" y="255" text-anchor="middle" fill="#fde68a" font-size="11" font-weight="800">
          LLMs &
        </text>
        <text x="200" y="272" text-anchor="middle" fill="#fde68a" font-size="11" font-weight="800">
          GEN-AI
        </text>
      </svg>
    </div>

    <!-- Right Side Explanatory Card -->
    <div class="col-span-6 flex flex-col gap-3 text-left">
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono text-slate-400">Click a ring to inspect:</span>
      </div>

      <div class="p-4 rounded-xl bg-slate-900/90 border transition-all duration-300" :class="selectedLayer.borderColor">
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-base text-white">{{ selectedLayer.name }}</h4>
          <span class="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            {{ selectedLayer.short }}
          </span>
        </div>

        <p class="text-xs text-slate-300 mt-2.5 leading-relaxed">
          {{ selectedLayer.desc }}
        </p>

        <div class="mt-3.5 pt-3 border-t border-slate-800">
          <div class="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">Key Real-World Examples</div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="ex in selectedLayer.examples"
              :key="ex"
              class="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-200"
            >
              {{ ex }}
            </span>
          </div>
        </div>
      </div>

      <!-- Quick insight pill -->
      <div class="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300">
        💡 <strong>Key Rule:</strong> Every LLM is Deep Learning, every Deep Learning model is ML, and all ML is AI — but not all AI is Machine Learning!
      </div>
    </div>
  </div>
</template>
