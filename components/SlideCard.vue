<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  accent?: 'indigo' | 'emerald' | 'amber' | 'cyan' | 'pink' | 'purple'
  hoverEffect?: boolean
}>()
</script>

<template>
  <div
    class="p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border transition-all duration-200"
    :class="[
      accent === 'emerald' ? 'border-emerald-500/30 hover:border-emerald-500/60' :
      accent === 'amber' ? 'border-amber-500/30 hover:border-amber-500/60' :
      accent === 'cyan' ? 'border-cyan-500/30 hover:border-cyan-500/60' :
      accent === 'pink' ? 'border-pink-500/30 hover:border-pink-500/60' :
      accent === 'purple' ? 'border-purple-500/30 hover:border-purple-500/60' :
      'border-slate-700/60 hover:border-indigo-500/60',
      hoverEffect ? 'hover:shadow-lg hover:-translate-y-0.5' : ''
    ]"
  >
    <div v-if="title || $slots.header" class="flex items-center justify-between gap-2 mb-2">
      <div class="flex items-center gap-2">
        <slot name="icon" />
        <h3 v-if="title" class="font-bold text-sm tracking-wide text-white">{{ title }}</h3>
      </div>
      <span v-if="subtitle" class="text-[11px] font-mono text-slate-400">{{ subtitle }}</span>
      <slot name="badge" />
    </div>
    <div class="text-xs text-slate-300 leading-relaxed">
      <slot />
    </div>
  </div>
</template>
