<script setup lang="ts">
import BenefitSlide from './BenefitSlide.vue'

const benefits = [
  {
    title: 'Understand AI Concepts',
    desc: 'Learn how AI models operate without complex mathematics or programming.',
    icon: 'i-lucide-eye'
  },
  {
    title: 'Use AI with Confidence',
    desc: 'Overcome fear of job loss. Use AI as a personal assistant to complete daily tasks.',
    icon: 'i-lucide-shield-check'
  },
  {
    title: 'Increase Daily Productivity',
    desc: 'Automate routine tasks. Write messages, summarize long documents, and analyze data quickly.',
    icon: 'i-lucide-zap'
  }
]
</script>

<template>
  <BenefitSlide
    audience="NEW USERS AND BEGINNERS"
    headline="No Programming Necessary: Become a Confident Operator"
    subtitle="Clear Concepts &bull; Daily Practical Tools"
    accent="indigo"
    stat-number="Day 1"
    stat-label="Immediate Practical Results"
    :benefits="benefits"
    verdict="AI will not replace humans. But people who use AI will replace people who do not. Start today."
  />
</template>
