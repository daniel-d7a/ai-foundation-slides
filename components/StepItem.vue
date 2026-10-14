<script setup lang="ts">
defineProps<{
  step: number | string
  title: string
  active?: boolean
  accent?: 'indigo' | 'emerald' | 'amber' | 'cyan'
}>()
</script>

<template>
  <div
    class="flex items-start gap-3 p-3 rounded-lg border transition-all duration-200"
    :class="[
      active 
        ? 'bg-indigo-500/10 border-indigo-500/50' 
        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
    ]"
  >
    <div
      class="w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0"
      :class="[
        active 
          ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/50' 
          : 'bg-slate-800 text-slate-400'
      ]"
    >
      {{ step }}
    </div>
    <div class="flex-1 min-w-0">
      <div class="font-semibold text-xs text-slate-200">{{ title }}</div>
      <div class="text-[11px] text-slate-400 mt-0.5 leading-snug">
        <slot />
      </div>
    </div>
  </div>
</template>
