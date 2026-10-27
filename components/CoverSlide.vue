<script setup lang="ts">
const modules = [
  {
    no: "MODULE 01",
    title: "The AI Landscape",
    desc: "History & Structure",
    badge: "text-indigo-400",
    icon: "i-lucide-globe",
  },
  {
    no: "MODULE 02",
    title: "Modern AI Tools",
    desc: "Tools for All Fields",
    badge: "text-emerald-400",
    icon: "i-lucide-boxes",
  },
  {
    no: "MODULE 03",
    title: "Prompt Engineering",
    desc: "6 Pillars & Context",
    badge: "text-amber-400",
    icon: "i-lucide-sparkles",
  },
  {
    no: "MODULE 04",
    title: "AI for Learning",
    desc: "Active Study Methods",
    badge: "text-pink-400",
    icon: "i-lucide-graduation-cap",
  },
  {
    no: "MODULE 05",
    title: "Automation with n8n",
    desc: "Automated Workflows",
    badge: "text-cyan-400",
    icon: "i-lucide-workflow",
  },
];
</script>

<template>
  <div
    class="relative h-full flex flex-col justify-center items-center overflow-hidden text-center select-none"
  >
    <div
      class="px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4"
    >
      AI FOUNDATIONS CURRICULUM
    </div>

    <h1 class="text-6xl font-extrabold tracking-tight text-white font-serif">
      From AI User to AI System Designer
    </h1>

    <p class="mt-3 text-lg text-slate-300 max-w-2xl font-sans">
      Learn the core concepts, modern tools, prompt engineering, active study methods, and visual automation.
    </p>

    <div class="grid grid-cols-5 gap-3 mt-10 w-full max-w-4xl text-left">
      <div
        v-for="m in modules"
        :key="m.no"
        v-click
        class="cover-card p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-indigo-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 flex flex-col justify-between h-28"
      >
        <div class="flex items-center justify-between">
          <div class="text-[10px] font-mono font-bold" :class="m.badge">
            {{ m.no }}
          </div>
          <span :class="[m.icon, m.badge]" class="w-4 h-4 shrink-0"></span>
        </div>
        <div class="font-bold text-sm text-white font-serif">{{ m.title }}</div>
        <div class="text-[11px] text-slate-400 font-sans">{{ m.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover-card.slidev-vclick-target {
  transition:
    opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.cover-card.slidev-vclick-hidden {
  opacity: 0 !important;
  transform: translateY(20px) scale(0.94) !important;
  pointer-events: none !important;
}
</style>
