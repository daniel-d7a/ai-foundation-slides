<script setup lang="ts">
import { ref } from 'vue'

const instructorImg = '/images/instructor.jpeg'
const hasImgError = ref(false)

interface RoleItem {
  title: string
  org: string
  icon: string
}

const roles: RoleItem[] = [
  {
    title: 'Mid-Level Software Engineer',
    org: 'Fullstack and AI',
    icon: 'i-lucide-code'
  },
  {
    title: 'Tech Instructor',
    org: 'EraaSoft',
    icon: 'i-lucide-presentation'
  },
  {
    title: 'Tech Content Creator',
    org: 'YouTube & LinkedIn',
    icon: 'i-lucide-video'
  }
]

interface SocialLink {
  label: string
  url: string
  icon: string
  color: string
}

const socials: SocialLink[] = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/eyad-alsherif', icon: 'i-lucide-linkedin', color: 'hover:text-blue-400 hover:border-blue-500/50' },
  { label: 'YouTube', url: 'https://www.youtube.com/@eyadalsherif', icon: 'i-lucide-youtube', color: 'hover:text-red-400 hover:border-red-500/50' },
  { label: 'GitHub', url: 'https://github.com/daniel-d7a', icon: 'i-lucide-github', color: 'hover:text-white hover:border-slate-400' },
  { label: 'Portfolio', url: 'https://portfolio-v2.eyadabdou862.workers.dev/', icon: 'i-lucide-globe', color: 'hover:text-indigo-400 hover:border-indigo-500/50' },
]
</script>

<template>
  <div class="h-full flex flex-col justify-between py-2">
    <!-- Header -->
    <div class="flex items-center justify-between pb-2">
      <div>
        <span class="text-xs font-mono tracking-widest text-indigo-400 font-bold uppercase">
          Instructor Profile
        </span>
        <h2 class="text-3xl font-extrabold text-white font-serif mt-0.5">
          About Me
        </h2>
      </div>
    </div>

    <!-- Main Content: Left 1/3 (col-span-4), Right 2/3 (col-span-8) -->
    <div class="grid grid-cols-12 gap-5 my-auto items-center">
      <!-- Left 1/3: Image only, vertically centered, no background, no text -->
      <div class="col-span-4 flex items-center justify-center h-full">
        <div class="w-full max-h-[350px] aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center bg-slate-950">
          <img
            v-if="!hasImgError"
            :src="instructorImg"
            alt="Instructor"
            class="w-full h-full object-cover"
            @error="hasImgError = true"
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-slate-900/40">
            <span class="i-lucide-user w-20 h-20 text-slate-500"></span>
          </div>
        </div>
      </div>

      <!-- Right 2/3: Reduced padding, top-aligned icons, no badges -->
      <div class="col-span-8 flex flex-col justify-center gap-2.5">
        <!-- 3 Role Items (icons top-aligned, no badges, tight padding) -->
        <div class="space-y-2">
          <div
            v-for="r in roles"
            :key="r.title"
            class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 transition-all hover:border-slate-600"
          >
            <div class="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
              <span :class="r.icon" class="w-4 h-4 text-white"></span>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white font-serif leading-tight">{{ r.title }}</h4>
              <div class="text-xs font-mono text-slate-400 mt-2">{{ r.org }}</div>
            </div>
          </div>
        </div>

        <!-- Social Links Container (tight padding) -->
        <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <div class="text-[10px] font-mono text-slate-400 mb-1.5 font-semibold">FIND ME ONLINE</div>
          <div class="grid grid-cols-4 gap-2">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.url"
              target="_blank"
              class="p-2 rounded-lg bg-slate-900/90 border border-slate-800 transition-all flex flex-col items-center justify-center text-center group"
              :class="s.color"
            >
              <span :class="s.icon" class="w-4 h-4 text-slate-300 group-hover:scale-110 transition-transform"></span>
              <span class="text-[11px] font-mono text-slate-200 mt-1 font-semibold">{{ s.label }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
