<script setup lang="ts">
import { ref } from "vue";

interface Layer {
  id: string;
  name: string;
  short: string;
  desc: string;
  examples: string[];
  color: string;
  borderColor: string;
}

const layers: Layer[] = [
  {
    id: "ai",
    name: "Artificial Intelligence (AI)",
    short: "The Umbrella Field",
    desc: "Any computational technique that enables machines to mimic human intelligence, including logic rules, heuristic search, and pattern induction.",
    examples: [
      "Expert Systems",
      "Pathfinding (A*)",
      "Game Solvers (Chess engines)",
    ],
    color: "#6366f1",
    borderColor: "border-indigo-500",
  },
  {
    id: "ml",
    name: "Machine Learning (ML)",
    short: "Statistical Learning",
    desc: "Algorithms that parse data, identify statistical patterns, and make predictions or decisions without being explicitly programmed with static rules.",
    examples: [
      "Spam Detection",
      "Recommendation Engines",
      "Fraud Scoring",
      "Random Forests",
    ],
    color: "#10b981",
    borderColor: "border-emerald-500",
  },
  {
    id: "dl",
    name: "Deep Learning (DL)",
    short: "Hierarchical Representations",
    desc: "Subset of ML using multi-layered artificial neural networks capable of learning features directly from unstructured data.",
    examples: [
      "Convolutional Nets (CNNs)",
      "Transformers",
      "Speech Synthesis",
      "Perception Systems",
    ],
    color: "#0ea5e9",
    borderColor: "border-cyan-500",
  },
  {
    id: "llm",
    name: "LLMs & GenAI",
    short: "Foundation Models",
    desc: "Massive autoregressive transformer architectures trained on web-scale token corpora to generate multimodal content.",
    examples: ["Gemini", "Claude", "GPT-4", "Midjourney", "Voice Models"],
    color: "#f59e0b",
    borderColor: "border-amber-500",
  },
];

const selectedLayer = ref<Layer>(layers[3]);
</script>

<template>
  <div class="grid grid-cols-12 gap-5 items-center">
    <!-- SVG Concentric Diagram: bigger circles, smaller text -->
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.9 }"
      :enter="{ opacity: 1, scale: 1, transition: { duration: 400 } }"
      class="col-span-6 flex justify-center items-center"
    >
      <svg viewBox="0 0 500 500" class="w-92 h-92 drop-shadow-2xl select-none">
        <!-- Layer 1: AI (Outer) -->
        <circle
          cx="230"
          cy="260"
          r="220"
          class="z-0 relative cursor-pointer transition-all duration-300 hover:fill-indigo-500/20 fill-indigo-500/10"
          :class="
            selectedLayer.id === 'ai'
              ? 'stroke-indigo-400 stroke-4 fill-indigo-500/40'
              : 'stroke-indigo-500/50'
          "
          @click="selectedLayer = layers[0]"
        />
        <text
          x="230"
          y="30"
          text-anchor="middle"
          fill="#a5b4fc"
          font-size="5"
          font-family="JetBrains Mono, monospace"
          font-weight="600"
          letter-spacing="1.5"
        >
          ARTIFICIAL INTELLIGENCE
        </text>

        <!-- Layer 2: ML -->
        <circle
          cx="230"
          cy="285"
          r="165"
          class="z-10 relative cursor-pointer transition-all duration-300 hover:fill-emerald-500/20 fill-emerald-500/10"
          :class="
            selectedLayer.id === 'ml'
              ? 'stroke-emerald-400 stroke-4 fill-emarald-500/40'
              : 'stroke-emerald-500/50'
          "
          @click="selectedLayer = layers[1]"
        />
        <text
          x="230"
          y="110"
          text-anchor="middle"
          fill="#6ee7b7"
          font-size="5"
          font-family="JetBrains Mono, monospace"
          font-weight="600"
          letter-spacing="1.5"
        >
          MACHINE LEARNING
        </text>

        <!-- Layer 3: DL -->
        <circle
          cx="230"
          cy="305"
          r="115"
          class="z-20 relative cursor-pointer transition-all duration-300 hover:fill-cyan-500/20 fill-cyan-500/10"
          :class="
            selectedLayer.id === 'dl'
              ? 'stroke-cyan-400 stroke-4 fill-cyan-500/40'
              : 'stroke-cyan-500/50'
          "
          @click="selectedLayer = layers[2]"
        />
        <text
          x="230"
          y="180"
          text-anchor="middle"
          fill="#7dd3fc"
          font-size="5"
          font-family="JetBrains Mono, monospace"
          font-weight="600"
          letter-spacing="1"
        >
          DEEP LEARNING
        </text>

        <!-- Layer 4: GenAI / LLM (Inner) -->
        <circle
          cx="230"
          cy="330"
          r="65"
          class="z-30 relative cursor-pointer transition-all duration-300 hover:fill-amber-500/30 fill-amber-500/10"
          :class="
            selectedLayer.id === 'llm'
              ? 'stroke-amber-300 stroke-4 fill-amber-500/40'
              : 'stroke-amber-500/70'
          "
          @click="selectedLayer = layers[3]"
        />
        <text
          x="230"
          y="255"
          text-anchor="middle"
          fill="#fde68a"
          font-size="5"
          font-family="JetBrains Mono, monospace"
          font-weight="700"
        >
          LLMs &amp; GEN-AI
        </text>
      </svg>
    </div>

    <!-- Right Side Explanatory Card -->
    <div
      v-motion
      :initial="{ opacity: 0, x: 20 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 400 } }"
      class="col-span-6 flex flex-col gap-3 text-left"
    >
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono text-slate-400"
          >Click ring to inspect boundary:</span
        >
      </div>

      <div
        class="p-4 rounded-xl bg-slate-900/90 border transition-all duration-300"
        :class="selectedLayer.borderColor"
      >
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-base text-white font-serif">
            {{ selectedLayer.name }}
          </h4>
        </div>

        <p class="text-xs text-slate-300 mt-2.5 leading-relaxed font-sans">
          {{ selectedLayer.desc }}
        </p>

        <div class="mt-3.5 pt-3 border-t border-slate-800">
          <div
            class="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5"
          >
            Production Examples
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="ex in selectedLayer.examples"
              :key="ex"
              class="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-200 font-mono"
            >
              {{ ex }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="p-2.5 rounded-lg bg-slate-900 border border-indigo-500/30 text-[11px] text-slate-300 font-sans"
      >
        <strong class="text-indigo-300">Architectural Note:</strong> Every LLM
        is Deep Learning, every Deep Learning model is ML, and all ML is AI —
        but not all AI is Machine Learning.
      </div>
    </div>
  </div>
</template>
