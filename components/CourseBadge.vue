<script setup lang="ts">
defineProps<{
  type?: 'indigo' | 'emerald' | 'amber' | 'cyan' | 'pink' | 'purple'
}>()
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border"
    :class="{
      'bg-indigo-500/15 border-indigo-500/30 text-indigo-300': !type || type === 'indigo',
      'bg-emerald-500/15 border-emerald-500/30 text-emerald-300': type === 'emerald',
      'bg-amber-500/15 border-amber-500/30 text-amber-300': type === 'amber',
      'bg-cyan-500/15 border-cyan-500/30 text-cyan-300': type === 'cyan',
      'bg-pink-500/15 border-pink-500/30 text-pink-300': type === 'pink',
      'bg-purple-500/15 border-purple-500/30 text-purple-300': type === 'purple',
    }"
  >
    <slot />
  </span>
</template>
