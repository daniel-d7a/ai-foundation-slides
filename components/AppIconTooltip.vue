<script setup lang="ts">
import { computed } from 'vue'
import { customIcons } from '../customIcons'

const props = defineProps<{
  name: string
  icon?: string
  size?: string
}>()

const customSvg = computed(() => {
  if (!props.icon) return null
  const tokens = props.icon.split(' ')
  for (const t of tokens) {
    const rawKey = t.replace(/^i-custom-/, '')
    if (customIcons[rawKey]) {
      return customIcons[rawKey]
    }
    if (customIcons[t]) {
      return customIcons[t]
    }
  }
  return null
})

const iconModifiers = computed(() => {
  if (!props.icon) return ''
  return props.icon.split(' ').filter(c => !c.startsWith('i-') && !customIcons[c] && !customIcons[c.replace(/^i-custom-/, '')]).join(' ')
})
</script>

<template>
  <div class="group relative flex items-center justify-center p-2 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-600 hover:bg-slate-900 transition-all duration-150 hover:scale-110 hover:shadow-lg cursor-pointer">
    <div
      v-if="customSvg"
      :class="[size || 'size-7', iconModifiers]"
      class="shrink-0 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
      v-html="customSvg"
    ></div>
    <span
      v-else-if="icon"
      :class="[icon, size || 'size-7']"
      class="shrink-0"
    ></span>
    <slot v-else></slot>

    <!-- Hover Tooltip -->
    <div class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-200 whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 z-30 shadow-xl shadow-black/60">
      {{ name }}
    </div>
  </div>
</template>
