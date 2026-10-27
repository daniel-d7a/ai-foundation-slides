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
        bold: 'Rigid Logic',
        text: 'Fixed if-then rules without error tolerance.',
      },
      {
        icon: 'i-lucide-shield-alert',
        bold: 'No Reasoning',
        text: 'Fails when input text format changes.',
      },
      {
        icon: 'i-lucide-arrow-right-circle',
        bold: 'Example',
        text: 'Submit a web form to write a spreadsheet row.',
      },
    ],
  },
  {
    level: 'LEVEL 2',
    title: 'AI-Powered Workflows',
    theme: 'cyan',
    diagramType: 'branch',
    points: [
      {
        icon: 'i-lucide-sparkles',
        bold: 'Semantic Logic',
        text: 'AI models classify, summarize, and route data.',
      },
      {
        icon: 'i-lucide-layers',
        bold: 'Unstructured Data',
        text: 'Converts free text and documents into structured JSON.',
      },
      {
        icon: 'i-lucide-arrow-right-circle',
        bold: 'Example',
        text: 'Analyze customer email and draft appropriate reply.',
      },
    ],
  },
  {
    level: 'LEVEL 3',
    title: 'Autonomous Agents',
    theme: 'emerald',
    diagramType: 'loop',
    points: [
      {
        icon: 'i-lucide-bot',
        bold: 'Goal-Directed',
        text: 'Plans actions and selects external tools to achieve goals.',
      },
      {
        icon: 'i-lucide-cpu',
        bold: 'Closed Loop',
        text: 'Reads execution errors, corrects mistakes, and retries.',
      },
      {
        icon: 'i-lucide-arrow-right-circle',
        bold: 'Example',
        text: 'Detect system error, diagnose root cause, and submit fix.',
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
