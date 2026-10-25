<script setup lang="ts">
import AutomationTierCard, { type TierConfig } from './AutomationTierCard.vue'

const tiers: TierConfig[] = [
  {
    level: 'LEVEL 1',
    title: 'Deterministic Rules',
    theme: 'indigo',
    diagramType: 'linear',
    points: [
      {
        icon: 'i-lucide-binary',
        bold: 'Brittle Logic',
        text: 'Rigid If/Then rules with zero fault tolerance.',
      },
      {
        icon: 'i-lucide-shield-alert',
        bold: 'No Reasoning',
        text: 'Crashes on unexpected schema or free text.',
      },
      {
        icon: 'i-lucide-arrow-right-circle',
        bold: 'Example',
        text: 'Google Form submit, Append sheet row.',
      },
    ],
  },
  {
    level: 'LEVEL 2',
    title: 'AI Orchestration',
    theme: 'cyan',
    diagramType: 'branch',
    points: [
      {
        icon: 'i-lucide-sparkles',
        bold: 'Semantic Logic',
        text: 'LLMs branch, summarize, and route data.',
      },
      {
        icon: 'i-lucide-layers',
        bold: 'Data Tolerant',
        text: 'Converts unstructured free text into JSON.',
      },
      {
        icon: 'i-lucide-arrow-right-circle',
        bold: 'Example',
        text: 'Angry user email, LLM drafts refund.',
      },
    ],
  },
  {
    level: 'LEVEL 3',
    title: 'Autonomous Agent',
    theme: 'emerald',
    diagramType: 'loop',
    points: [
      {
        icon: 'i-lucide-bot',
        bold: 'Goal-Directed',
        text: 'Plans and selects tools autonomously.',
      },
      {
        icon: 'i-lucide-cpu',
        bold: 'Closed Loop',
        text: 'Inspects errors, runs scripts, self-heals.',
      },
      {
        icon: 'i-lucide-arrow-right-circle',
        bold: 'Example',
        text: 'Server outage alert, Diagnoses & opens PR.',
      },
    ],
  },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-3.5 mt-3 w-full max-w-full">
    <AutomationTierCard
      v-for="(t, i) in tiers"
      :key="i"
      :tier="t"
    />
  </div>
</template>
