<script setup lang="ts">
defineProps<{
  role: string
  subtitle: string
  icon: string
  badgeColor: string
  borderAccent: string
  points: string[]
  takeaway: string
}>()
</script>

<template>
  <div
    class="p-4 rounded-xl bg-slate-900/85 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    :class="borderAccent"
  >
    <div>
      <div class="flex items-center justify-between mb-3">
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border"
          :class="badgeColor"
        >
          <span :class="icon" class="w-3.5 h-3.5"></span>
          {{ role }}
        </span>
      </div>

      <h3 class="text-base font-bold text-white font-serif mb-3 leading-snug">
        {{ subtitle }}
      </h3>

      <ul class="space-y-2 text-xs text-slate-300 font-sans">
        <li
          v-for="(pt, idx) in points"
          :key="idx"
          class="flex items-start gap-2 leading-relaxed"
        >
          <span class="i-lucide-check-circle-2 w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5"></span>
          <span>{{ pt }}</span>
        </li>
      </ul>
    </div>

    <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
      <span>Outcome:</span>
      <span class="text-white font-semibold">{{ takeaway }}</span>
    </div>
  </div>
</template>
