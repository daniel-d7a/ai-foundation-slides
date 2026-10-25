<script setup lang="ts">
import { ref } from "vue";
import ImagePlaceholder from "./ImagePlaceholder.vue";

interface DomainImage {
  src?: string;
  alt?: string;
  caption: string;
}

interface Domain {
  id: string;
  name: string;
  iconClass: string;
  fields: { name: string; tag?: string }[];
  useCases: string[];
  images: DomainImage[];
}

const domains: Domain[] = [
  {
    id: "health",
    name: "Healthcare & Biotech",
    iconClass: "i-lucide-activity",
    fields: [
      { name: "Computer Vision" },
      { name: "Deep Learning" },
      { name: "NLP & LLMs" },
    ],
    useCases: [
      "Analyzing thousands of pathology histology slides per hour to detect early-stage tumor cells.",
      "Screening millions of candidate molecular structures against target proteins to accelerate clinical trials.",
      "Ambient AI scribes summarizing 45-minute physician patient consults directly into structured EHR charts.",
    ],
    images: [
      {
        src: "images/ecosystem/pathology.png",
        caption: "Pathology & Histology Slide Analysis",
      },
      {
        src: "images/ecosystem/cancer.webp",
        caption: "Ambient Clinical Scribe EHR UI",
      },
    ],
  },
  {
    id: "finance",
    name: "Finance & Banking",
    iconClass: "i-lucide-trending-up",
    fields: [
      { name: "Machine Learning" },
      { name: "Deep Learning" },
      { name: "Automation" },
    ],
    useCases: [
      "Flagging fraudulent credit card transactions in under 50 milliseconds using stream anomaly detection.",
      "Synthesizing earnings calls, SEC 10-K filings, and breaking news into quantitative portfolio risk metrics.",
      "Scanning incoming KYC customer documentation and biometric identity feeds against global sanctions databases.",
    ],
    images: [
      {
        src: "images/ecosystem/fraude detection.jpg",
        caption: "Sub-50ms Real-time Fraud Stream",
      },
      {
        src: "images/ecosystem/risk assessment.png",
        caption: "SEC Filings & Quantitative Risk Dashboard",
      },
    ],
  },
  {
    id: "creative",
    name: "Marketing & Creative",
    iconClass: "i-lucide-palette",
    fields: [
      { name: "LLMs & GenAI" },
      { name: "Computer Vision" },
      { name: "Automation" },
    ],
    useCases: [
      "Generating 20 personalized ad variants with custom visuals and copy tuned per demographic in minutes.",
      "Auto-dubbing marketing campaigns with synthetic voice cloning and frame-accurate lip-sync across 14 languages.",
      "Translating natural language briefs into brand-aligned vector illustrations, 3D mockups, and packaging concepts.",
    ],
    images: [
      {
        src: "images/ecosystem/design varients.jpg",
        caption: "Multi-Modal Personalized Ad Variants",
      },
      {
        src: "images/ecosystem/voice cloning.jpg",
        caption: "Voice Cloning & Cross-Platform Pipeline",
      },
    ],
  },
  {
    id: "software",
    name: "Software Engineering",
    iconClass: "i-lucide-terminal",
    fields: [
      { name: "LLMs & Agents" },
      { name: "NLP" },
      { name: "Automation" },
    ],
    useCases: [
      "Autonomous PR reviews, security audits, and legacy syntax modernization across repositories.",
      "Auto-generating unit test suites, integration mocks, and boundary condition test fixtures with 90%+ coverage.",
      "Diagnosing broken continuous integration builds from terminal logs and creating verified zero-shot hotfixes.",
    ],
    images: [
      {
        src: "images/ecosystem/pr review.png",
        caption: "Autonomous PR Review & AST Diff",
      },
      {
        src: "images/ecosystem/code tests.png",
        caption: "Auto-generating test suites",
      },
    ],
  },
  {
    id: "ops",
    name: "Supply Chain & Ops",
    iconClass: "i-lucide-boxes",
    fields: [
      { name: "Machine Learning" },
      { name: "Computer Vision" },
      { name: "Automation" },
    ],
    useCases: [
      "Predicting warehouse stockouts 14 days in advance and auto-triggering replenishment purchase orders.",
      "Inspecting assembly lines at 1,200 parts/min using high-speed computer vision to detect micro-surface defects.",
      "Continuously re-optimizing fleet delivery routes in real time based on port delays, traffic, and fuel costs.",
    ],
    images: [
      {
        src: "images/ecosystem/warehouse.png",
        caption: "Predicting warehouse stockouts",
      },
      {
        src: "images/ecosystem/inspection.png",
        caption: "High-Speed Micro-Defect Inspection",
      },
    ],
  },
];

const selected = ref<Domain>(domains[0]);
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
            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200',
        ]"
      >
        <span :class="d.iconClass" class="w-4 h-4 text-indigo-400"></span>
        <span class="font-serif font-bold">{{ d.name }}</span>
      </button>
    </div>

    <!-- Active Details Grid with 2 Columns -->
    <transition name="fade" mode="out-in">
      <div :key="selected.id" class="grid grid-cols-2 gap-4 text-left">
        <!-- Left: Subfields as small bullets & Production Use Cases -->
        <div
          class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col gap-3 min-h-[250px]"
        >
          <!-- Subfields as small bullets -->
          <div>
            <div
              class="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-bold mb-1.5 flex items-center gap-1.5"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>Active Subfields</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="f in selected.fields"
                :key="f.name"
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/60 text-slate-200 text-xs font-mono font-medium"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>{{ f.name }}</span>
              </span>
            </div>
          </div>

          <!-- Production Use Cases -->
          <div class="flex-1 flex flex-col">
            <div
              class="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1.5 flex items-center gap-1.5"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Production Use Cases</span>
            </div>
            <div class="flex flex-col gap-2 flex-1 justify-between">
              <div
                v-for="(uc, idx) in selected.useCases"
                :key="idx"
                class="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-xs text-slate-200 leading-relaxed font-sans flex items-start gap-2"
              >
                <span
                  class="text-emerald-400 font-mono font-bold text-[11px] mt-0.5 shrink-0"
                  >{{ String(idx + 1).padStart(2, "0") }}.</span
                >
                <span class="text-xs">{{ uc }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: 2 Image Placeholders -->
        <div
          class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between min-h-[250px]"
        >
          <div
            class="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5"
          >
            <span
              class="i-lucide-layout-grid w-3.5 h-3.5 text-indigo-400"
            ></span>
            <span>Visual Artifacts & Architecture</span>
          </div>
          <div class="grid grid-cols-2 gap-3 flex-1 min-h-[190px]">
            <ImagePlaceholder
              v-for="(img, idx) in selected.images"
              :key="idx"
              :src="img.src"
              :alt="img.alt || img.caption"
              :caption="img.caption"
              hint="Add image"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
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
