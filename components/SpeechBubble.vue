<script setup lang="ts">
defineProps<{
  isUser?: boolean
  theme?: 'slate' | 'red' | 'emerald' | 'indigo'
  lines?: string[]
  badgeIcon?: string
  badgeColor?: string
  badgeText?: string
  dense?: boolean
}>()
</script>

<template>
  <div
    class="flex items-end gap-2 transition-all duration-300 ease-out transform animate-fade-in"
    :class="isUser ? 'flex-row-reverse self-end' : 'flex-row self-start'"
  >
    <!-- Avatar -->
    <div
      class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] shadow-sm"
      :class="[
        isUser
          ? 'bg-slate-700 text-slate-200 border border-slate-600'
          : theme === 'red'
            ? 'bg-rose-950 text-rose-300 border border-rose-500/50'
            : 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
      ]"
    >
      <span v-if="isUser" class="i-lucide-user w-3.5 h-3.5"></span>
      <span v-else-if="theme === 'red'" class="i-lucide-bot w-3.5 h-3.5"></span>
      <span v-else class="i-lucide-sparkles w-3.5 h-3.5"></span>
    </div>

    <!-- Bubble -->
    <div
      class="relative rounded-2xl p-2.5 transition-all shadow-md"
      :class="[
        isUser
          ? 'rounded-br-xs bg-slate-800/95 border border-slate-700/80 text-slate-200'
          : theme === 'red'
            ? 'rounded-bl-xs bg-rose-950/40 border border-rose-500/50 text-rose-200'
            : theme === 'indigo'
              ? 'rounded-br-xs bg-indigo-950/50 border border-indigo-500/50 text-indigo-200'
              : 'rounded-bl-xs bg-emerald-950/40 border border-emerald-500/50 text-emerald-200',
        dense ? 'w-full' : 'max-w-[85%]'
      ]"
    >
      <!-- Optional top micro badge -->
      <div v-if="badgeIcon || badgeText" class="flex items-center gap-1.5 mb-1.5 text-[10px] font-mono font-bold" :class="badgeColor || 'text-slate-400'">
        <span v-if="badgeIcon" :class="[badgeIcon, 'w-3 h-3 shrink-0']"></span>
        <span v-if="badgeText">{{ badgeText }}</span>
      </div>

      <!-- Skeleton Lines (conveying speech without readable text) -->
      <div :class="dense ? 'space-y-1.5' : 'space-y-1.5'">
        <div
          v-for="(w, idx) in (lines || ['w-24', 'w-16'])"
          :key="idx"
          class="h-1.5 rounded-full"
          :class="[
            w,
            isUser
              ? 'bg-slate-400/60'
              : theme === 'red'
                ? 'bg-rose-400/50'
                : theme === 'indigo'
                  ? 'bg-indigo-400/60'
                  : 'bg-emerald-400/60'
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(6px) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in {
  animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
