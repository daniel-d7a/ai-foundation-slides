<script setup lang="ts">
import { ref } from 'vue'

interface Domain {
  id: string
  name: string
  iconClass: string
  fields: { name: string; tag: string }[]
  useCases: string[]
}

const domains: Domain[] = [
  {
    id: 'health',
    name: 'Healthcare & Biotech',
    iconClass: 'i-lucide-activity',
    fields: [
      { name: 'Computer Vision', tag: 'Radiology & MRI anomaly detection' },
      { name: 'Deep Learning', tag: 'Protein folding prediction (AlphaFold)' },
      { name: 'NLP & LLMs', tag: 'Clinical EHR summarization' },
    ],
    useCases: [
      'Analyzing thousands of pathology histology slides per hour to detect early-stage tumor cells.',
      'Screening millions of candidate molecular structures against target proteins to accelerate clinical trials.',
      'Ambient AI scribes summarizing 45-minute physician patient consults directly into structured EHR charts.',
    ],
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    iconClass: 'i-lucide-trending-up',
    fields: [
      { name: 'Machine Learning', tag: 'Credit scoring & algorithmic risk' },
      { name: 'Deep Learning', tag: 'High-frequency market signals' },
      { name: 'Automation', tag: 'Regulatory KYC / Transaction scrutiny' },
    ],
    useCases: [
      'Flagging fraudulent credit card transactions in under 50 milliseconds using stream anomaly detection.',
      'Synthesizing earnings calls, SEC 10-K filings, and breaking news into quantitative portfolio risk metrics.',
      'Scanning incoming KYC customer documentation and biometric identity feeds against global sanctions databases.',
    ],
  },
  {
    id: 'creative',
    name: 'Marketing & Creative',
    iconClass: 'i-lucide-palette',
    fields: [
      { name: 'LLMs & GenAI', tag: 'Copy synthesis & audience segmentation' },
      { name: 'Computer Vision', tag: 'Generative diffusion & brand design' },
      { name: 'Automation', tag: 'Multi-platform content orchestration' },
    ],
    useCases: [
      'Generating 20 personalized ad variants with custom visuals and copy tuned per demographic in minutes.',
      'Auto-dubbing marketing campaigns with synthetic voice cloning and frame-accurate lip-sync across 14 languages.',
      'Translating natural language briefs into brand-aligned vector illustrations, 3D mockups, and packaging concepts.',
    ],
  },
  {
    id: 'software',
    name: 'Software Engineering',
    iconClass: 'i-lucide-terminal',
    fields: [
      { name: 'LLMs & Agents', tag: 'Autonomous refactoring & test generation' },
      { name: 'NLP', tag: 'Semantic AST indexing & code search' },
      { name: 'Automation', tag: 'CI/CD self-healing pipeline triggers' },
    ],
    useCases: [
      'Autonomous PR reviews, security audits, and legacy syntax modernization across repositories.',
      'Auto-generating unit test suites, integration mocks, and boundary condition test fixtures with 90%+ coverage.',
      'Diagnosing broken continuous integration builds from terminal logs and creating verified zero-shot hotfixes.',
    ],
  },
  {
    id: 'ops',
    name: 'Supply Chain & Ops',
    iconClass: 'i-lucide-boxes',
    fields: [
      { name: 'Machine Learning', tag: 'Predictive inventory forecasting' },
      { name: 'Computer Vision', tag: 'Automated assembly defect detection' },
      { name: 'Automation', tag: 'Warehouse ERP synchronizers' },
    ],
    useCases: [
      'Predicting warehouse stockouts 14 days in advance and auto-triggering replenishment purchase orders.',
      'Inspecting assembly lines at 1,200 parts/min using high-speed computer vision to detect micro-surface defects.',
      'Continuously re-optimizing fleet delivery routes in real time based on port delays, traffic, and fuel costs.',
    ],
  },
]

const selected = ref<Domain>(domains[0])
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Domain Tabs with Real Icons -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="d in domains"
        :key="d.id"
        @click="selected = d"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer"
        :class="[
          selected.id === d.id
            ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
        ]"
      >
        <span :class="d.iconClass" class="w-4 h-4 text-indigo-400"></span>
        <span class="font-serif font-bold">{{ d.name }}</span>
      </button>
    </div>

    <!-- Active Details Grid with 2 Columns -->
    <transition name="fade" mode="out-in">
      <div :key="selected.id" class="grid grid-cols-2 gap-4 text-left">
        <!-- AI Fields Active -->
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between min-h-[250px]">
          <div>
            <div class="text-sm font-mono uppercase tracking-wider text-indigo-400 font-bold mb-2.5">Primary AI Subfields</div>
            <div class="flex flex-col gap-2">
              <div
                v-for="f in selected.fields"
                :key="f.name"
                class="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-xs"
              >
                <div class="font-bold text-slate-200 font-serif text-sm">{{ f.name }}</div>
                <div class="text-xs text-slate-400 font-sans mt-0.5">{{ f.tag }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Real-World Impact: Production Use Cases -->
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between min-h-[250px]">
          <div>
            <div class="text-sm font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2.5">Production Use Cases</div>
            <div class="flex flex-col gap-2">
              <div
                v-for="(uc, idx) in selected.useCases"
                :key="idx"
                class="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-slate-200 leading-relaxed font-sans flex items-start gap-2"
              >
                <span class="text-emerald-400 font-mono font-bold text-[11px] mt-0.5 shrink-0">{{ String(idx + 1).padStart(2, '0') }}.</span>
                <span>{{ uc }}</span>
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
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
