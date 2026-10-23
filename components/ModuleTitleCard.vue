<script setup lang="ts">
defineProps<{
  moduleNo: string
  title: string
  subtitle: string
  image: string
  color?: 'indigo' | 'emerald' | 'amber' | 'pink' | 'cyan'
}>()

const colorMap = {
  indigo: {
    badge: 'text-indigo-300 bg-indigo-500/15 border-indigo-500/30',
    glow: 'from-indigo-500/20',
    border: 'border-indigo-500/30',
  },
  emerald: {
    badge: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30',
    glow: 'from-emerald-500/20',
    border: 'border-emerald-500/30',
  },
  amber: {
    badge: 'text-amber-300 bg-amber-500/15 border-amber-500/30',
    glow: 'from-amber-500/20',
    border: 'border-amber-500/30',
  },
  pink: {
    badge: 'text-pink-300 bg-pink-500/15 border-pink-500/30',
    glow: 'from-pink-500/20',
    border: 'border-pink-500/30',
  },
  cyan: {
    badge: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30',
    glow: 'from-cyan-500/20',
    border: 'border-cyan-500/30',
  },
}
</script>

<template>
  <div class="h-full flex items-center justify-center px-4">
    <div class="grid grid-cols-12 gap-8 items-center w-full max-w-5xl">
      <!-- Left Content -->
      <div class="col-span-7 flex flex-col justify-center text-left">
        <span
          class="inline-block w-fit px-3 py-1 rounded-md border text-xs font-mono font-bold tracking-wider mb-4"
          :class="colorMap[color || 'indigo'].badge"
        >
          {{ moduleNo }}
        </span>
        <h1 class="text-4xl font-extrabold text-white font-serif tracking-tight leading-tight">
          {{ title }}
        </h1>
        <p class="text-slate-300 font-sans text-base mt-4 leading-relaxed max-w-xl">
          {{ subtitle }}
        </p>
      </div>

      <!-- Right Image Card -->
      <div class="col-span-5 relative group">
        <div
          class="absolute -inset-1 rounded-2xl bg-gradient-to-r blur-xl opacity-50 group-hover:opacity-75 transition"
          :class="colorMap[color || 'indigo'].glow"
        ></div>
        <div class="relative overflow-hidden rounded-2xl border bg-slate-900/80 shadow-2xl" :class="colorMap[color || 'indigo'].border">
          <img
            :src="image"
            :alt="title"
            class="w-full h-64 object-cover object-center transform transition duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  </div>
</template>
