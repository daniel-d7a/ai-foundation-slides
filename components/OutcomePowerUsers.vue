<script setup lang="ts">
import BenefitSlide from './BenefitSlide.vue'

const benefits = [
  {
    title: 'Deterministic 6-Pillar Prompts',
    desc: 'Replace fuzzy guessing with structured prompts: role, context, task, explicit constraints, format templates, and chain-of-thought.',
    icon: 'i-lucide-terminal'
  },
  {
    title: 'Full Context & Agent Mastery',
    desc: 'Push frontier models to their limits with token budget management, file & data ingestion, and multi-step reasoning tools.',
    icon: 'i-lucide-cpu'
  },
  {
    title: 'Visual Automation with n8n',
    desc: 'Stop repetitive manual copy-pasting into chat boxes. Design background AI pipelines that execute tasks autonomously 24/7.',
    icon: 'i-lucide-workflow'
  }
]
</script>

<template>
  <BenefitSlide
    audience="CURRENT AI USERS & PRACTITIONERS"
    headline="Stop 'Chatting' With AI. Start Engineering Autonomous Systems"
    subtitle="Frameworks &bull; Autonomous Background Pipelines"
    accent="amber"
    stat-number="100%"
    stat-label="Deterministic System Outputs"
    :benefits="benefits"
    verdict="Transition from an everyday AI consumer into a high-leverage systems architect who builds scalable autonomous workflows."
  />
</template>
