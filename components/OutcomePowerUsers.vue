<script setup lang="ts">
import BenefitSlide from './BenefitSlide.vue'

const benefits = [
  {
    title: 'Structured Prompt Framework',
    desc: 'Write clear prompts with specified roles, tasks, constraints, and output formats to get consistent results.',
    icon: 'i-lucide-terminal'
  },
  {
    title: 'Control Context and Agents',
    desc: 'Manage context limits, connect external files, and use multi-step reasoning tools effectively.',
    icon: 'i-lucide-cpu'
  },
  {
    title: 'Visual Automation with n8n',
    desc: 'Do not copy and paste text manually. Build background workflows that run tasks automatically.',
    icon: 'i-lucide-workflow'
  }
]
</script>

<template>
  <BenefitSlide
    audience="CURRENT AI USERS AND SPECIALISTS"
    headline="Move Beyond Simple Chat: Build Automated Systems"
    subtitle="Structured Methods &bull; Automated Pipelines"
    accent="amber"
    stat-number="100%"
    stat-label="Reliable System Outputs"
    :benefits="benefits"
    verdict="Change from a standard AI user to a system designer who builds automated workflows."
  />
</template>
