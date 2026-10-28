<script setup lang="ts">
import { ref } from 'vue'

// --- NEXT TOKEN PREDICTION ---
interface TokenProb {
  token: string
  prob: number
  selected?: boolean
}

interface PredictionSample {
  prompt: string
  nextTokens: TokenProb[]
}

const predictionSamples: PredictionSample[] = [
  {
    prompt: 'The capital of France is',
    nextTokens: [
      { token: 'Paris', prob: 93, selected: true },
      { token: 'widely', prob: 4 },
      { token: 'often', prob: 2 },
      { token: 'a', prob: 1 },
    ],
  },
  {
    prompt: 'To fix this bug, inspect the',
    nextTokens: [
      { token: 'logs', prob: 64, selected: true },
      { token: 'stack', prob: 21 },
      { token: 'code', prob: 10 },
      { token: 'database', prob: 5 },
    ],
  },
  {
    prompt: 'Neural networks learn by adjusting',
    nextTokens: [
      { token: 'weights', prob: 82, selected: true },
      { token: 'biases', prob: 11 },
      { token: 'inputs', prob: 5 },
      { token: 'layers', prob: 2 },
    ],
  },
]

const activePredictionIdx = ref(0)

// --- TOKENIZATION ---
interface TokenItem {
  text: string
  id: number
  colorClass: string
}

interface TokenSample {
  sentence: string
  tokenCount: number
  wordCount: number
  tokens: TokenItem[]
}

const tokenSamples: TokenSample[] = [
  {
    sentence: 'Understanding AI agents',
    tokenCount: 4,
    wordCount: 3,
    tokens: [
      { text: 'Under', id: 13241, colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
      { text: 'standing', id: 4108, colorClass: 'bg-teal-500/20 text-teal-300 border-teal-500/40' },
      { text: ' AI', id: 9552, colorClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
      { text: ' agents', id: 18420, colorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
    ],
  },
  {
    sentence: 'Autonomous tool loops',
    tokenCount: 4,
    wordCount: 3,
    tokens: [
      { text: 'Auto', id: 8931, colorClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
      { text: 'nomous', id: 14205, colorClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
      { text: ' tool', id: 3951, colorClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
      { text: ' loops', id: 26110, colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    ],
  },
  {
    sentence: 'Foundation models scale',
    tokenCount: 4,
    wordCount: 3,
    tokens: [
      { text: 'Found', id: 10452, colorClass: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
      { text: 'ation', id: 721, colorClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
      { text: ' models', id: 4211, colorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
      { text: ' scale', id: 6224, colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    ],
  },
]

const activeTokenIdx = ref(0)
</script>

<template>
  <div class="grid grid-cols-2 gap-5 mt-5 w-full text-left" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
    
    <!-- CARD 1: WHAT IS AN LLM? -->
    <div class="p-5 rounded-xl bg-slate-900/90 border border-indigo-500/40 flex flex-col justify-between h-[415px] shadow-xl shadow-indigo-950/20">
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-[11px] font-mono font-bold text-indigo-400 tracking-wider">STATISTICAL ENGINE</span>
          <button
            @click="activePredictionIdx = (activePredictionIdx + 1) % predictionSamples.length"
            class="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span class="i-lucide-refresh-cw w-2.5 h-2.5"></span>
            <span>Switch Prompt</span>
          </button>
        </div>
        <h3 class="font-bold text-lg text-white font-serif">What is an LLM?</h3>
        <p class="text-xs text-slate-300 mt-1.5 font-sans leading-relaxed">
          Not a static database or search index. A deep neural network trained to calculate the <strong class="text-indigo-300">probability of the next token</strong> given context.
        </p>

        <!-- Diagram: Prediction Flow -->
        <div class="mt-3.5 p-3 rounded-lg bg-slate-950/80 border border-slate-800">
          <div class="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-1.5 flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <span class="i-lucide-message-square w-3.5 h-3.5 text-indigo-400"></span>
              <span>Input Context</span>
            </span>
            <span class="text-[9px] text-slate-500 font-mono">Prompt</span>
          </div>
          <div class="text-xs font-mono text-slate-100 bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800">
            "{{ predictionSamples[activePredictionIdx].prompt }} <span class="text-indigo-400 underline font-bold animate-pulse">___</span>"
          </div>

          <!-- Flow Arrow -->
          <div class="my-2 flex items-center justify-center gap-2 text-slate-500 text-[10px] font-mono">
            <span class="h-px bg-slate-800 flex-1"></span>
            <span class="flex items-center gap-1 text-indigo-400">
              <span class="i-lucide-cpu w-3 h-3"></span>
              <span>Transformer Weights</span>
            </span>
            <span class="h-px bg-slate-800 flex-1"></span>
          </div>

          <div class="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-1.5 flex items-center justify-between">
            <span>Next-Token Distribution</span>
            <span class="text-[9px] text-indigo-400 font-bold">AUTOREGRESSIVE</span>
          </div>

          <div class="space-y-1.5">
            <div
              v-for="item in predictionSamples[activePredictionIdx].nextTokens"
              :key="item.token"
              class="flex items-center justify-between text-xs font-mono px-2.5 py-1 rounded"
              :class="item.selected ? 'bg-indigo-500/25 border border-indigo-500/50 text-white font-bold' : 'text-slate-400 bg-slate-900/50'"
            >
              <div class="flex items-center gap-2">
                <span v-if="item.selected" class="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span v-else class="w-2 h-2 rounded-full bg-slate-700"></span>
                <span>"{{ item.token }}"</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden hidden sm:block">
                  <div class="bg-indigo-400 h-1.5 rounded-full" :style="{ width: `${item.prob}%` }"></div>
                </div>
                <span class="w-8 text-right">{{ item.prob }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CARD 2: WHAT IS A TOKEN? -->
    <div class="p-5 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex flex-col justify-between h-[415px] shadow-xl shadow-emerald-950/20">
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-[11px] font-mono font-bold text-emerald-400 tracking-wider">CURRENCY OF AI</span>
          <button
            @click="activeTokenIdx = (activeTokenIdx + 1) % tokenSamples.length"
            class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span class="i-lucide-refresh-cw w-2.5 h-2.5"></span>
            <span>Switch Example</span>
          </button>
        </div>
        <h3 class="font-bold text-lg text-white font-serif">What is a Token?</h3>
        <p class="text-xs text-slate-300 mt-1.5 font-sans leading-relaxed">
          The atomic chunk of text processed by models. Text is chopped into <strong class="text-emerald-300">sub-words</strong> and converted to numeric IDs.
        </p>

        <!-- Diagram: Tokenizer Split & IDs -->
        <div class="mt-3.5 p-3 rounded-lg bg-slate-950/80 border border-slate-800">
          <div class="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-1.5 flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <span class="i-lucide-layers w-3.5 h-3.5 text-emerald-400"></span>
              <span>Sub-word Segmentation</span>
            </span>
            <span class="text-[9px] text-emerald-400 font-bold font-mono">
              {{ tokenSamples[activeTokenIdx].wordCount }} Words ➔ {{ tokenSamples[activeTokenIdx].tokenCount }} Tokens
            </span>
          </div>

          <!-- Token visual chips -->
          <div class="flex flex-wrap gap-2 my-2.5">
            <div
              v-for="t in tokenSamples[activeTokenIdx].tokens"
              :key="t.id"
              class="px-2.5 py-1.5 rounded-lg text-xs font-mono border flex flex-col items-center shadow-sm"
              :class="t.colorClass"
            >
              <span class="font-bold">"{{ t.text }}"</span>
              <span class="text-[9px] opacity-75 mt-0.5">ID: {{ t.id }}</span>
            </div>
          </div>

          <!-- Practical Rules of Thumb -->
          <div class="mt-3 pt-2.5 border-t border-slate-800/80 space-y-2 text-xs font-sans text-slate-300">
            <div class="flex items-center justify-between">
              <span class="text-slate-400 flex items-center gap-1.5">
                <span class="i-lucide-type w-3.5 h-3.5 text-emerald-400"></span>
                <span>1 Token</span>
              </span>
              <span class="font-mono text-emerald-300 font-medium">≈ 4 characters (~0.75 words)</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400 flex items-center gap-1.5">
                <span class="i-lucide-file-text w-3.5 h-3.5 text-emerald-400"></span>
                <span>1,000 Tokens</span>
              </span>
              <span class="font-mono text-emerald-300 font-medium">≈ 750 words (~1.5 typed pages)</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400 flex items-center gap-1.5">
                <span class="i-lucide-maximize w-3.5 h-3.5 text-emerald-400"></span>
                <span>Context Window</span>
              </span>
              <span class="font-mono text-emerald-300 font-medium">Model memory limit (128K - 2M)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
