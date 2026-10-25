<script setup lang="ts">
export interface ToolItem {
  icon: string
  text: string
}

export interface RobotArm {
  id: string
  armNumber: string
  title: string
  effectorName: string
  theme: 'indigo' | 'emerald' | 'cyan' | 'amber'
  icon: string
  tools: ToolItem[]
  status: string
}

const props = defineProps<{
  arm: RobotArm
  active: boolean
  isLeft: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

const themeClasses = {
  indigo: {
    border: 'border-indigo-500/40 hover:border-indigo-400',
    activeBorder: 'border-indigo-400 ring-1 ring-indigo-400/50 shadow-indigo-950/60',
    badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40',
    iconColor: 'text-indigo-400',
    glow: 'from-indigo-950/40',
    gripper: '#818cf8',
    gripperBg: 'bg-indigo-500',
  },
  emerald: {
    border: 'border-emerald-500/40 hover:border-emerald-400',
    activeBorder: 'border-emerald-400 ring-1 ring-emerald-400/50 shadow-emerald-950/60',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    iconColor: 'text-emerald-400',
    glow: 'from-emerald-950/40',
    gripper: '#34d399',
    gripperBg: 'bg-emerald-500',
  },
  cyan: {
    border: 'border-cyan-500/40 hover:border-cyan-400',
    activeBorder: 'border-cyan-400 ring-1 ring-cyan-400/50 shadow-cyan-950/60',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
    iconColor: 'text-cyan-400',
    glow: 'from-cyan-950/40',
    gripper: '#22d3ee',
    gripperBg: 'bg-cyan-500',
  },
  amber: {
    border: 'border-amber-500/40 hover:border-amber-400',
    activeBorder: 'border-amber-400 ring-1 ring-amber-400/50 shadow-amber-950/60',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    iconColor: 'text-amber-400',
    glow: 'from-amber-950/40',
    gripper: '#fbbf24',
    gripperBg: 'bg-amber-500',
  },
}
</script>

<template>
  <div
    class="relative group rounded-xl p-3 border transition-all duration-300 cursor-pointer bg-slate-900/90 shadow-lg select-none"
    :class="[
      props.active ? themeClasses[arm.theme].activeBorder : themeClasses[arm.theme].border,
      props.active ? 'bg-gradient-to-br to-slate-950 shadow-xl' : '',
    ]"
    @click="emit('select', arm.id)"
  >
    <!-- Mechanical Gripper Mount Accent on edge connecting to the robot arm -->
    <div
      class="absolute top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none"
      :class="props.isLeft ? '-right-3.5 flex-row' : '-left-3.5 flex-row-reverse'"
    >
      <!-- Gripper Prongs -->
      <div class="flex flex-col gap-1.5 items-center">
        <div
          class="w-2.5 h-1 rounded-sm transition-all"
          :class="props.active ? themeClasses[arm.theme].gripperBg : 'bg-slate-600'"
        ></div>
        <div
          class="w-3 h-2 rounded-xs border transition-all flex items-center justify-center text-[7px] font-mono"
          :class="props.active ? 'border-white/80 bg-slate-800 text-white' : 'border-slate-600 bg-slate-900 text-slate-400'"
        >
          <span class="w-1 h-1 rounded-full" :class="props.active ? themeClasses[arm.theme].gripperBg : 'bg-slate-500'"></span>
        </div>
        <div
          class="w-2.5 h-1 rounded-sm transition-all"
          :class="props.active ? themeClasses[arm.theme].gripperBg : 'bg-slate-600'"
        ></div>
      </div>
      <!-- Mount Bracket -->
      <div class="w-1.5 h-7 rounded-sm bg-slate-700/80 border border-slate-600/70"></div>
    </div>

    <!-- Header: Arm ID, effector name & title -->
    <div class="flex items-center justify-between gap-1.5 border-b border-slate-800/80 pb-1.5 mb-2">
      <div class="flex items-center gap-2 min-w-0">
        <div class="truncate">
          <div class="flex items-center gap-1.5">
          </div>
          <h3 class="text-[13px] font-bold text-white font-serif tracking-tight truncate leading-tight mt-0.5">
            {{ arm.title }}
          </h3>
        </div>
      </div>

      <!-- Online / Status LED -->
      <div class="flex items-center gap-1 shrink-0">
        <span
          class="w-1.5 h-1.5 rounded-full transition-all"
          :class="props.active ? themeClasses[arm.theme].gripperBg + ' animate-ping' : 'bg-slate-600'"
        ></span>
        <span
          class="w-1.5 h-1.5 rounded-full -ml-2.5 transition-all"
          :class="props.active ? themeClasses[arm.theme].gripperBg : 'bg-slate-600'"
        ></span>
      </div>
    </div>

    <!-- Tools list (The set of tools mounted on this arm) -->
    <div class="space-y-1.5 text-[10.5px] font-mono">
      <div
        v-for="(t, i) in arm.tools"
        :key="i"
        class="flex items-center gap-2 text-slate-300 leading-snug"
      >
        <span :class="[t.icon, themeClasses[arm.theme].iconColor]" class="w-3.5 h-3.5 shrink-0"></span>
        <span class="truncate">{{ t.text }}</span>
      </div>
    </div>
  </div>
</template>
