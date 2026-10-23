<script setup lang="ts">
import { ref } from "vue";
import AlgoAnimation from "./analogy/AlgoAnimation.vue";
import PolyAnimation from "./analogy/PolyAnimation.vue";
import RecurseAnimation from "./analogy/RecurseAnimation.vue";

const concepts = [
  { id: "poly", label: "Polymorphism & Interfaces" },
  { id: "algorithms", label: "Algorithms & Efficiency (Big-O)" },
  { id: "recursion", label: "Recursion & Base Cases" },
];

const domains = [
  { id: "cooking", label: "Cooking & Kitchen" },
  { id: "maps", label: "GPS & Google Maps" },
  { id: "library", label: "Library & Bookshelves" },
];

const selectedConcept = ref<"poly" | "algorithms" | "recursion">("poly");
const selectedDomain = ref<"cooking" | "maps" | "library">("cooking");
const isPlaying = ref(true);
</script>

<template>
  <div
    class="p-3.5 h-[395px] rounded-xl bg-slate-900/90 border border-slate-700/60 text-left flex flex-col justify-between shadow-xl"
  >
    <!-- Top Prompt Bar with Embedded Dropdowns and Header Controls -->
    <div
      class="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 shadow-inner"
    >
      <div class="flex items-center gap-2 text-xs font-mono">
        <!-- Sparkle Prompt Icon -->
        <span class="i-lucide-sparkles w-4 h-4 text-amber-400 shrink-0"></span>
        <span class="text-white font-medium">"Explain</span>

        <!-- Dropdown X (Concept) -->
        <div class="relative inline-block">
          <select
            v-model="selectedConcept"
            class="bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/70 hover:border-indigo-400 text-indigo-200 font-bold px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all pr-7 appearance-none"
          >
            <option
              v-for="c in concepts"
              :key="c.id"
              :value="c.id"
              class="bg-slate-900 text-white py-1"
            >
              {{ c.label }}
            </option>
          </select>
          <span
            class="i-lucide-chevron-down w-3.5 h-3.5 text-indigo-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
          ></span>
        </div>

        <span class="text-white font-medium">in analogy to</span>

        <!-- Dropdown Y (Domain) -->
        <div class="relative inline-block">
          <select
            v-model="selectedDomain"
            class="bg-pink-950/80 hover:bg-pink-900/80 border border-pink-500/70 hover:border-pink-400 text-pink-200 font-bold px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer outline-none focus:ring-2 focus:ring-pink-400/50 transition-all pr-7 appearance-none"
          >
            <option
              v-for="d in domains"
              :key="d.id"
              :value="d.id"
              class="bg-slate-900 text-white py-1"
            >
              {{ d.label }}
            </option>
          </select>
          <span
            class="i-lucide-chevron-down w-3.5 h-3.5 text-pink-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
          ></span>
        </div>

        <span class="text-white font-medium">"</span>
      </div>

      <!-- Right Header Controls: Pause/Play Icon Button & Status -->
      <div class="flex items-center gap-2">
        <button
          @click="isPlaying = !isPlaying"
          class="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
          :title="isPlaying ? 'Pause Animation' : 'Play Animation'"
        >
          <span
            v-if="isPlaying"
            class="i-lucide-pause w-3.5 h-3.5 text-amber-400"
          ></span>
          <span
            v-else
            class="i-lucide-play w-3.5 h-3.5 text-emerald-400"
          ></span>
        </button>
      </div>
    </div>

    <!-- Main Visual Animation Canvas (Moving Icons & SVGs) -->
    <div
      class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 h-[335px] flex flex-col justify-between overflow-hidden relative mt-2"
    >
      <!-- 1. Polymorphism Animation -->
      <PolyAnimation
        v-if="selectedConcept === 'poly'"
        :domain="selectedDomain"
        :is-playing="isPlaying"
      />

      <!-- 2. Algorithms Big-O Race Animation -->
      <AlgoAnimation
        v-else-if="selectedConcept === 'algorithms'"
        :domain="selectedDomain"
        :is-playing="isPlaying"
      />

      <!-- 3. Recursion Call Stack Animation -->
      <RecurseAnimation
        v-else
        :domain="selectedDomain"
        :is-playing="isPlaying"
      />
    </div>
  </div>
</template>
