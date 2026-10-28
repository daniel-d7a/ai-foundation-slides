<script setup lang="ts">
interface BulletItem {
  icon: string;
  label: string;
}

const whyBullets: BulletItem[] = [
  { icon: "i-lucide-cpu", label: "Stateless Memory (Working RAM)" },
  {
    icon: "i-lucide-shield-check",
    label: "Instant Grounding (Zero Retraining)",
  },
  { icon: "i-lucide-sparkles", label: "Dynamic Runtime Control" },
];

const problemBullets: BulletItem[] = [
  {
    icon: "i-lucide-trending-down",
    label: '"Lost in the Middle" Attention Drop',
  },
  { icon: "i-lucide-clock", label: "Inference Latency & Token Cost Surge" },
  { icon: "i-lucide-zap-off", label: "Instruction Dilution & Noise" },
];

const ragBullets: BulletItem[] = [
  { icon: "i-lucide-database", label: "1. Vector Database Indexing" },
  { icon: "i-lucide-search", label: "2. Semantic Search (Top Matches)" },
  { icon: "i-lucide-check-circle-2", label: "3. Grounded Context Injection" },
];
</script>

<template>
  <div
    class="grid grid-cols-3 gap-4 mt-2 w-full text-left select-none font-sans"
  >
    <!-- Pillar 1: Why Context -->
    <div
      v-click
      class="p-4 rounded-xl bg-slate-900/85 border border-emerald-500/30 flex flex-col justify-between h-[350px] transition-all shadow-lg hover:border-emerald-500/50"
    >
      <div>
        <div
          class="flex items-start gap-2 h-20 mb-4 pb-2.5 border-b border-slate-800"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center border text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shrink-0"
          >
            <span class="i-lucide-layers size-4.5"></span>
          </div>
          <h3
            class="font-bold text-sm text-white font-serif tracking-wide leading-tight"
          >
            Why Use Context?
          </h3>
        </div>

        <!-- Bullets -->
        <div class="space-y-3">
          <div
            v-for="b in whyBullets"
            :key="b.label"
            class="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40"
          >
            <div
              class="w-6 h-6 rounded flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30 shrink-0"
            >
              <span :class="b.icon" class="size-3.5 text-emerald-400"></span>
            </div>
            <span class="text-xs font-semibold text-slate-200 leading-tight">{{
              b.label
            }}</span>
          </div>
        </div>
      </div>

      <div
        class="text-[10px] font-mono text-emerald-300 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/30 text-center font-medium"
      >
        Fast, flexible & zero model retraining
      </div>
    </div>

    <!-- Pillar 2: Breaking Points -->
    <div
      v-click
      class="p-4 rounded-xl bg-slate-900/85 border border-rose-500/30 flex flex-col justify-between h-[350px] transition-all shadow-lg hover:border-rose-500/50"
    >
      <div>
        <div
          class="flex items-start gap-2 mb-4 h-20 pb-2.5 border-b border-slate-800"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center border text-rose-400 bg-rose-500/10 border-rose-500/30 shrink-0"
          >
            <span class="i-lucide-zap-off size-4.5"></span>
          </div>
          <h3
            class="font-bold text-sm text-white font-serif tracking-wide leading-tight"
          >
            Where It Breaks Down
          </h3>
        </div>

        <!-- Bullets -->
        <div class="space-y-3">
          <div
            v-for="b in problemBullets"
            :key="b.label"
            class="flex items-center gap-3 p-2.5 rounded-lg bg-red-950/20 border border-red-500/25"
          >
            <div
              class="w-6 h-6 rounded flex items-center justify-center bg-rose-500/10 border border-rose-500/30 shrink-0"
            >
              <span :class="b.icon" class="size-3.5 text-rose-400"></span>
            </div>
            <span class="text-xs font-semibold text-rose-200 leading-tight">{{
              b.label
            }}</span>
          </div>
        </div>
      </div>

      <div
        class="text-[10px] font-mono text-rose-300 bg-rose-950/40 px-2 py-1 rounded border border-rose-500/30 text-center font-medium"
      >
        More tokens &ne; higher accuracy
      </div>
    </div>

    <!-- Pillar 3: Shift to RAG -->
    <div
      v-click
      class="p-4 rounded-xl bg-slate-900/85 border border-indigo-500/30 flex flex-col justify-between h-[350px] transition-all shadow-lg hover:border-indigo-500/50"
    >
      <div>
        <div
          class="flex items-start gap-2 h-20 mb-4 pb-2.5 border-b border-slate-800"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center border text-indigo-400 bg-indigo-500/10 border-indigo-500/30 shrink-0"
          >
            <span class="i-lucide-database size-4.5"></span>
          </div>
          <h3
            class="font-bold text-sm text-white font-serif tracking-wide leading-tight"
          >
            The Shift to RAG
          </h3>
        </div>

        <!-- Bullets -->
        <div class="space-y-3">
          <div
            v-for="b in ragBullets"
            :key="b.label"
            class="flex items-center gap-3 p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-500/25"
          >
            <div
              class="w-6 h-6 rounded flex items-center justify-center bg-indigo-500/10 border border-indigo-500/30 shrink-0"
            >
              <span :class="b.icon" class="size-3.5 text-indigo-400"></span>
            </div>
            <span class="text-xs font-semibold text-indigo-200 leading-tight">{{
              b.label
            }}</span>
          </div>
        </div>
      </div>

      <div
        class="text-[10px] font-mono text-indigo-300 bg-indigo-950/40 px-2 py-1 rounded border border-indigo-500/30 text-center font-medium"
      >
        Fetch snippets &bull; Don't dump the whole library
      </div>
    </div>
  </div>
</template>
