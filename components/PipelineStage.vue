<script setup lang="ts">
export interface StageProps {
  label: string
  sublabel: string
  icon: string
  status: 'idle' | 'active' | 'completed'
  theme: 'red' | 'cyan' | 'emerald' | 'indigo' | 'slate'
}

const props = defineProps<StageProps>()

const themeStyles = {
  red: {
    activeBorder: 'border-red-400 ring-2 ring-red-500/30 bg-red-950/40 text-red-300',
    idleBorder: 'border-slate-800 bg-slate-900/80 text-slate-400',
    iconColor: 'text-red-400',
    badge: 'bg-red-500/20 text-red-300 border-red-500/40',
  },
  cyan: {
    activeBorder: 'border-cyan-400 ring-2 ring-cyan-500/30 bg-cyan-950/40 text-cyan-300',
    idleBorder: 'border-slate-800 bg-slate-900/80 text-slate-400',
    iconColor: 'text-cyan-400',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  emerald: {
    activeBorder: 'border-emerald-400 ring-2 ring-emerald-500/30 bg-emerald-950/40 text-emerald-300',
    idleBorder: 'border-slate-800 bg-slate-900/80 text-slate-400',
    iconColor: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  indigo: {
    activeBorder: 'border-indigo-400 ring-2 ring-indigo-500/30 bg-indigo-950/40 text-indigo-300',
    idleBorder: 'border-slate-800 bg-slate-900/80 text-slate-400',
    iconColor: 'text-indigo-400',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  },
  slate: {
    activeBorder: 'border-slate-500 ring-2 ring-slate-600/30 bg-slate-900 text-slate-200',
    idleBorder: 'border-slate-800 bg-slate-950/80 text-slate-500',
    iconColor: 'text-slate-400',
    badge: 'bg-slate-800 text-slate-400 border-slate-700',
  },
}
</script>

<template>
  <div
    class="flex-1 rounded-xl p-2.5 border transition-all duration-200 flex flex-col justify-between select-none relative"
    :class="props.status === 'active' ? themeStyles[props.theme].activeBorder : themeStyles[props.theme].idleBorder"
  >
    <!-- Top Row: Icon + Status Pill -->
    <div class="flex items-center justify-between mb-1.5">
      <div
        class="w-7 h-7 rounded-lg flex items-center justify-center border transition-all"
        :class="props.status === 'active' ? 'bg-slate-900 border-current shadow-sm' : 'bg-slate-950 border-slate-800'"
      >
        <span :class="[props.icon, themeStyles[props.theme].iconColor]" class="w-4 h-4"></span>
      </div>

      <span
        class="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border"
        :class="props.status === 'active' ? themeStyles[props.theme].badge : 'bg-slate-900 text-slate-500 border-slate-800'"
      >
        {{ props.status }}
      </span>
    </div>

    <!-- Middle: Labels -->
    <div class="min-h-[32px]">
      <div class="text-[11px] font-bold text-white font-serif leading-tight truncate">
        {{ props.label }}
      </div>
      <div class="text-[9px] font-mono text-slate-400 truncate mt-0.5">
        {{ props.sublabel }}
      </div>
    </div>
  </div>
</template>
