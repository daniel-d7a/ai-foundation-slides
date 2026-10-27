<script setup lang="ts">
import BenefitSlide from './BenefitSlide.vue'

const benefits = [
  {
    title: 'Continuous Socratic Tutor',
    desc: 'Ask AI to explain complex topics and test your knowledge at any time.',
    icon: 'i-lucide-brain'
  },
  {
    title: 'Fast Study Materials',
    desc: 'Convert textbooks and lecture notes into flashcards, test questions, and summaries in seconds.',
    icon: 'i-lucide-sparkles'
  },
  {
    title: 'Job-Ready Portfolio',
    desc: 'Complete your studies with practical AI workflow skills that employers require.',
    icon: 'i-lucide-trophy'
  }
]
</script>

<template>
  <BenefitSlide
    audience="STUDENTS AND LEARNERS"
    headline="Reduce Study Time and Improve Your Career Opportunities"
    subtitle="Active Recall &bull; Clear Explanations"
    accent="emerald"
    stat-number="2x"
    stat-label="Faster Learning and Retention"
    :benefits="benefits"
    verdict="Learn course material faster and acquire practical AI skills that employers require."
  />
</template>
