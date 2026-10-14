<script setup lang="ts">
import { ref } from 'vue'

interface Domain {
  id: string
  name: string
  icon: string
  fields: { name: string; tag: string }[]
  jobs: string[]
  useCase: string
}

const domains: Domain[] = [
  {
    id: 'health',
    name: 'Healthcare & Biotech',
    icon: '🏥',
    fields: [
      { name: 'Computer Vision', tag: 'Radiology & MRI scans' },
      { name: 'Deep Learning', tag: 'Protein folding (AlphaFold)' },
      { name: 'NLP & LLMs', tag: 'Clinical note summarization' },
    ],
    jobs: ['Medical AI Researcher', 'Bioinformatics Scientist', 'Clinical Data Engineer'],
    useCase: 'Analyzing thousands of pathology slides per hour to detect early-stage tumor cells.',
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    icon: '📈',
    fields: [
      { name: 'Machine Learning', tag: 'Credit scoring & risk models' },
      { name: 'Deep Learning', tag: 'Algorithmic trading signals' },
      { name: 'Automation', tag: 'Regulatory KYC / Anti-fraud bots' },
    ],
    jobs: ['Quantitative Analyst (Quant)', 'Fraud Risk ML Specialist', 'FinTech Solutions Architect'],
    useCase: 'Flagging fraudulent credit card transactions in under 50 milliseconds using anomaly detection.',
  },
  {
    id: 'creative',
    name: 'Marketing & Creative',
    icon: '🎨',
    fields: [
      { name: 'LLMs & GenAI', tag: 'Copywriting & multi-variant hooks' },
      { name: 'Computer Vision', tag: 'Image generation (Midjourney)' },
      { name: 'Automation', tag: 'Social publishing pipelines' },
    ],
    jobs: ['AI Content Strategist', 'Prompt Designer', 'Creative Tech Director'],
    useCase: 'Generating 20 personalized ad variants with matching visuals for segmented audiences in minutes.',
  },
  {
    id: 'software',
    name: 'Software Engineering',
    icon: '💻',
    fields: [
      { name: 'LLMs & Agents', tag: 'Code completion, test writing' },
      { name: 'NLP', tag: 'Doc search & semantic code analysis' },
      { name: 'Automation', tag: 'CI/CD self-healing workflows' },
    ],
    jobs: ['AI Systems Engineer', 'Full-stack AI Developer', 'DevOps Automation Lead'],
    useCase: 'Autonomous PR reviews, bug remediation drafts, and converting legacy codebases across languages.',
  },
  {
    id: 'ops',
    name: 'Supply Chain & Ops',
    icon: '📦',
    fields: [
      { name: 'Machine Learning', tag: 'Demand forecasting' },
      { name: 'Computer Vision', tag: 'Defect detection on assembly line' },
      { name: 'Automation', tag: 'ERP & inventory synchronizers' },
    ],
    jobs: ['Supply Chain Data Scientist', 'Industrial Vision Engineer', 'n8n Solutions Architect'],
    useCase: 'Predicting warehouse stockouts 14 days in advance and auto-triggering purchase orders.',
  },
]

const selected = ref<Domain>(domains[0])
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Domain Tabs -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="d in domains"
        :key="d.id"
        @click="selected = d"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer"
        :class="[
          selected.id === d.id
            ? 'bg-indigo-500/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/20'
            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
        ]"
      >
        <span>{{ d.icon }}</span>
        <span>{{ d.name }}</span>
      </button>
    </div>

    <!-- Active Details Grid -->
    <div class="grid grid-cols-12 gap-3 mt-1 text-left">
      <!-- AI Fields Active -->
      <div class="col-span-4 p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col gap-2">
        <div class="text-[11px] font-mono uppercase tracking-wider text-indigo-400">Primary AI Subfields</div>
        <div class="flex flex-col gap-1.5">
          <div
            v-for="f in selected.fields"
            :key="f.name"
            class="p-2 rounded-lg bg-slate-800/60 border border-slate-700/40 text-xs"
          >
            <div class="font-bold text-slate-200">{{ f.name }}</div>
            <div class="text-[11px] text-slate-400">{{ f.tag }}</div>
          </div>
        </div>
      </div>

      <!-- Real-World Impact -->
      <div class="col-span-4 p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between">
        <div>
          <div class="text-[11px] font-mono uppercase tracking-wider text-emerald-400 mb-2">Production Use Case</div>
          <p class="text-xs text-slate-200 leading-relaxed bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/30">
            "{{ selected.useCase }}"
          </p>
        </div>
        <div class="mt-2 text-[11px] text-slate-400">
          ⚡ <em>Shows why knowing AI is not just for computer scientists.</em>
        </div>
      </div>

      <!-- Job Titles -->
      <div class="col-span-4 p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col gap-2">
        <div class="text-[11px] font-mono uppercase tracking-wider text-amber-400">Emerging Career Paths</div>
        <ul class="flex flex-col gap-1.5 text-xs text-slate-300">
          <li
            v-for="job in selected.jobs"
            :key="job"
            class="flex items-center gap-2 p-1.5 rounded-md bg-slate-800/40 border border-slate-800 text-[11px]"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
            <span>{{ job }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
