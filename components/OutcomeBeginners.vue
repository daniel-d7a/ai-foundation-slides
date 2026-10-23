<script setup lang="ts">
import BenefitSlide from './BenefitSlide.vue'

const benefits = [
  {
    title: 'Demystify the Tech Hype',
    desc: 'Get an intuitive, hype-free mental model of how AI models think and work—no advanced mathematics or coding required.',
    icon: 'i-lucide-eye'
  },
  {
    title: 'Conquer Replacement Fear',
    desc: 'Replace job displacement anxiety with confidence by learning how to wield AI as your personal indefatigable assistant.',
    icon: 'i-lucide-shield-check'
  },
  {
    title: 'Instant Day-One Productivity',
    desc: 'Automate tedious everyday chores: draft emails, summarize 50-page reports, extract key data points, and brainstorm solutions.',
    icon: 'i-lucide-zap'
  }
]
</script>

<template>
  <BenefitSlide
    audience="NON-AI USERS & BEGINNERS"
    headline="Zero Coding Needed: From Overwhelmed to Confident Operator"
    subtitle="Clarity &bull; Practical Daily Superpowers"
    accent="indigo"
    stat-number="Day 1"
    stat-label="Immediate Practical Wins"
    :benefits="benefits"
    verdict="AI will not replace humans, but professionals wielding AI will replace those who do not. Start effortlessly today."
  />
</template>
