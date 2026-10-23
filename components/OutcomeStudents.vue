<script setup lang="ts">
import BenefitSlide from './BenefitSlide.vue'

const benefits = [
  {
    title: '24/7 Socratic Mentor',
    desc: 'Never get stuck on hard concepts. Prompt AI to quiz you and explain difficult topics through your specific major or interests.',
    icon: 'i-lucide-brain'
  },
  {
    title: 'Instant Study Pipelines',
    desc: 'Turn dense PDF textbooks and lecture recordings into active-recall flashcards, practice quizzes, and executive summaries in seconds.',
    icon: 'i-lucide-sparkles'
  },
  {
    title: 'Career-Ready Portfolio',
    desc: 'Graduate ahead of the curve with real practical AI workflow skills that recruiters and engineering managers actively prioritize.',
    icon: 'i-lucide-trophy'
  }
]
</script>

<template>
  <BenefitSlide
    audience="STUDENTS & LEARNERS"
    headline="Cut Study Time in Half & Build an Unfair Career Edge"
    subtitle="Active Recall &bull; Concept Deconstruction"
    accent="emerald"
    stat-number="10x"
    stat-label="Velocity & Exam Retention"
    :benefits="benefits"
    verdict="Master coursework in a fraction of the time and graduate with practical AI skills that employers fight to hire."
  />
</template>
