<script setup lang="ts">
import { ref } from 'vue'

interface Domain {
  id: string
  name: string
  iconClass: string
  fields: { name: string; tag: string }[]
  jobs: string[]
  useCase: string
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
    jobs: ['Medical AI Researcher', 'Bioinformatics Scientist', 'Clinical Data Engineer'],
    useCase: 'Analyzing thousands of pathology histology slides per hour to detect early-stage tumor cells.',
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
    jobs: ['Quantitative ML Researcher', 'Financial Risk Specialist', 'FinTech Solutions Architect'],
    useCase: 'Flagging fraudulent credit card transactions in under 50 milliseconds using anomaly detection.',
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
    jobs: ['AI Content Strategist', 'Prompt Systems Designer', 'Creative Tech Director'],
    useCase: 'Generating 20 personalized ad variants with matching visuals for segmented audiences in minutes.',
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
    jobs: ['AI Systems Engineer', 'Full-stack AI Developer', 'DevOps Automation Lead'],
    useCase: 'Autonomous PR reviews, bug remediation drafts, and converting legacy codebases across languages.',
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
    jobs: ['Supply Chain Data Scientist', 'Industrial Vision Engineer', 'n8n Solutions Architect'],
    useCase: 'Predicting warehouse stockouts 14 days in advance and auto-triggering purchase orders.',
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

    <!-- Active Details Grid with Normalized Heights -->
    <transition name="fade" mode="out-in">
      <div :key="selected.id" class="grid grid-cols-12 gap-3 text-left">
        <!-- AI Fields Active -->
        <div class="col-span-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-56">
          <div>
            <div class="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold mb-2">Primary AI Subfields</div>
            <div class="flex flex-col gap-1.5">
              <div
                v-for="f in selected.fields"
                :key="f.name"
                class="p-2 rounded-lg bg-slate-800/60 border border-slate-700/40 text-xs"
              >
                <div class="font-bold text-slate-200 font-serif">{{ f.name }}</div>
                <div class="text-[11px] text-slate-400 font-sans">{{ f.tag }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Real-World Impact -->
        <div class="col-span-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-56">
          <div>
            <div class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2">Production Use Case</div>
            <p class="text-xs text-slate-200 leading-relaxed bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/30 font-sans">
              "{{ selected.useCase }}"
            </p>
          </div>
          <div class="text-[11px] text-slate-400 font-mono">
            Direct business leverage without raw model training.
          </div>
        </div>

        <!-- Job Titles -->
        <div class="col-span-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-56">
          <div>
            <div class="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">Emerging Career Titles</div>
            <ul class="flex flex-col gap-1.5 text-xs text-slate-300">
              <li
                v-for="job in selected.jobs"
                :key="job"
                class="flex items-center gap-2 p-2 rounded-md bg-slate-800/60 border border-slate-800 text-[11px] font-mono"
              >
                <span class="i-lucide-check w-3.5 h-3.5 text-amber-400 shrink-0"></span>
                <span>{{ job }}</span>
              </li>
            </ul>
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
