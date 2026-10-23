<script setup lang="ts">
interface BenefitItem {
  title: string
  desc: string
  icon: string
}

defineProps<{
  audience: string
  headline: string
  subtitle: string
  accent: 'emerald' | 'indigo' | 'amber'
  statNumber: string
  statLabel: string
  benefits: BenefitItem[]
  verdict: string
}>()
</script>

<template>
  <div class="h-full flex flex-col justify-between py-2">
    <!-- Top Header -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-2">
      <div>
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border"
          :class="{
            'bg-emerald-500/15 border-emerald-500/30 text-emerald-300': accent === 'emerald',
            'bg-indigo-500/15 border-indigo-500/30 text-indigo-300': accent === 'indigo',
            'bg-amber-500/15 border-amber-500/30 text-amber-300': accent === 'amber',
          }"
        >
          TARGET AUDIENCE &bull; {{ audience }}
        </span>
        <h2 class="text-3xl font-extrabold text-white font-serif mt-1">
          {{ headline }}
        </h2>
      </div>

      <!-- Quick Impact Stat Badge -->
      <div
        class="p-2.5 rounded-xl border flex items-center gap-3 bg-slate-900/90"
        :class="{
          'border-emerald-500/40 text-emerald-300': accent === 'emerald',
          'border-indigo-500/40 text-indigo-300': accent === 'indigo',
          'border-amber-500/40 text-amber-300': accent === 'amber',
        }"
      >
        <span class="text-2xl font-black font-mono leading-none">{{ statNumber }}</span>
        <span class="text-[10px] font-mono leading-tight text-slate-300 max-w-[100px]">{{ statLabel }}</span>
      </div>
    </div>

    <!-- 3 Punchy Benefit Columns -->
    <div class="grid grid-cols-3 gap-5 my-auto">
      <div
        v-for="(b, idx) in benefits"
        :key="idx"
        v-click
        class="p-5 rounded-xl bg-slate-900/85 border flex flex-col justify-between h-56 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        :class="{
          'border-emerald-500/40 hover:border-emerald-500/80': accent === 'emerald',
          'border-indigo-500/40 hover:border-indigo-500/80': accent === 'indigo',
          'border-amber-500/40 hover:border-amber-500/80': accent === 'amber',
        }"
      >
        <div>
          <!-- Icon + Index -->
          <div class="flex items-center justify-between mb-3">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center border"
              :class="{
                'bg-emerald-500/15 border-emerald-500/30 text-emerald-400': accent === 'emerald',
                'bg-indigo-500/15 border-indigo-500/30 text-indigo-400': accent === 'indigo',
                'bg-amber-500/15 border-amber-500/30 text-amber-400': accent === 'amber',
              }"
            >
              <span :class="b.icon" class="w-5 h-5"></span>
            </div>
            <span class="text-[11px] font-mono text-slate-400 font-bold">0{{ idx + 1 }}</span>
          </div>

          <h3 class="text-base font-bold text-white font-serif mb-2 leading-snug">
            {{ b.title }}
          </h3>

          <p class="text-xs text-slate-300 leading-relaxed font-sans">
            {{ b.desc }}
          </p>
        </div>

        <div class="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
          <span class="i-lucide-check w-3 h-3 text-emerald-400"></span>
          <span>Guaranteed Course Takeaway</span>
        </div>
      </div>
    </div>

    <!-- Bottom Verdict Banner -->
    <div
      class="p-3 rounded-xl bg-slate-900/90 border flex items-center justify-between px-5"
      :class="{
        'border-emerald-500/30': accent === 'emerald',
        'border-indigo-500/30': accent === 'indigo',
        'border-amber-500/30': accent === 'amber',
      }"
    >
      <div class="flex items-center gap-3">
        <span class="i-lucide-sparkles w-4 h-4 shrink-0" :class="{
          'text-emerald-400': accent === 'emerald',
          'text-indigo-400': accent === 'indigo',
          'text-amber-400': accent === 'amber',
        }"></span>
        <span class="text-xs text-slate-200 font-sans">
          <strong class="text-white">Why it sells:</strong> {{ verdict }}
        </span>
      </div>
      <span class="text-[11px] font-mono font-bold text-slate-400">
        {{ subtitle }}
      </span>
    </div>
  </div>
</template>
