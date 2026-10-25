<script setup lang="ts">
interface BenefitItem {
  title: string;
  desc: string;
  icon: string;
}

defineProps<{
  audience: string;
  headline: string;
  subtitle: string;
  accent: "emerald" | "indigo" | "amber";
  statNumber: string;
  statLabel: string;
  benefits: BenefitItem[];
  verdict: string;
}>();
</script>

<template>
  <div class="h-full flex flex-col justify-between py-2">
    <!-- Top Header -->
    <div
      class="flex flex-col items-start justify-between border-b border-slate-800 pb-2"
    >
      <div class="flex items-center gap-2">
        <span
          class="text-xs font-mono tracking-widest text-indigo-400 font-bold uppercase"
        >
          Curriculum Outcome
        </span>
      </div>
      <h2 class="text-3xl font-extrabold text-white font-serif mt-1">
        {{ headline }}
      </h2>
    </div>

    <!-- 3 Punchy Benefit Columns -->
    <div class="grid grid-cols-3 gap-5 my-auto">
      <div
        v-for="(b, idx) in benefits"
        :key="idx"
        v-click
        class="p-5 rounded-xl bg-slate-900/85 border flex flex-col justify-between h-76"
        :class="{
          'border-emerald-500/40': accent === 'emerald',
          'border-indigo-500/40': accent === 'indigo',
          'border-amber-500/40': accent === 'amber',
        }"
      >
        <div>
          <!-- Icon + Index -->
          <div class="flex items-center justify-between mb-3">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center border"
              :class="{
                'bg-emerald-500/15 border-emerald-500/30 text-emerald-400':
                  accent === 'emerald',
                'bg-indigo-500/15 border-indigo-500/30 text-indigo-400':
                  accent === 'indigo',
                'bg-amber-500/15 border-amber-500/30 text-amber-400':
                  accent === 'amber',
              }"
            >
              <span :class="b.icon" class="w-5 h-5"></span>
            </div>
            <span class="text-[11px] font-mono text-slate-400 font-bold"
              >0{{ idx + 1 }}</span
            >
          </div>

          <h3
            class="text-base font-bold text-white font-serif mb-2 leading-snug"
          >
            {{ b.title }}
          </h3>

          <p class="text-xs text-slate-300 leading-relaxed font-sans">
            {{ b.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
