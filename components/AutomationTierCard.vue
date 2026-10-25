<script setup lang="ts">
export interface TierPoint {
  icon: string;
  bold: string;
  text: string;
}

export interface TierConfig {
  level: string;
  title: string;
  theme: "indigo" | "cyan" | "emerald";
  points: TierPoint[];
  diagramType: "linear" | "branch" | "loop";
}

const props = defineProps<{
  tier: TierConfig;
}>();

const themeClasses = {
  indigo: {
    cardBorder: "border-slate-800 hover:border-indigo-500/50",
    badge: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    iconColor: "text-indigo-400",
    diagramBox: "bg-indigo-950/20 border-indigo-500/30",
    nodeActive: "bg-indigo-950/60 border-indigo-500/60 text-indigo-200",
    nodeIdle: "bg-slate-900 border-slate-800 text-slate-400",
    wire: "text-indigo-400",
    accentText: "text-indigo-300",
  },
  cyan: {
    cardBorder: "border-cyan-500/40 hover:border-cyan-400/60",
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    iconColor: "text-cyan-400",
    diagramBox: "bg-cyan-950/20 border-cyan-500/30",
    nodeActive: "bg-cyan-950/60 border-cyan-500/60 text-cyan-200",
    nodeIdle: "bg-slate-900 border-slate-800 text-slate-400",
    wire: "text-cyan-400",
    accentText: "text-cyan-300",
  },
  emerald: {
    cardBorder: "border-emerald-500/40 hover:border-emerald-400/60",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    iconColor: "text-emerald-400",
    diagramBox: "bg-emerald-950/20 border-emerald-500/30",
    nodeActive: "bg-emerald-950/60 border-emerald-500/60 text-emerald-200",
    nodeIdle: "bg-slate-900 border-slate-800 text-slate-400",
    wire: "text-emerald-400",
    accentText: "text-emerald-300",
  },
};
</script>

<template>
  <div
    class="p-4 rounded-xl bg-slate-900/95 border flex flex-col justify-between h-[375px] min-w-0 shadow-lg transition-all"
    :class="themeClasses[props.tier.theme].cardBorder"
  >
    <!-- Card Header -->
    <div>
      <div class="flex items-center justify-between mb-1">
        <span
          class="text-[9px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 rounded border"
          :class="themeClasses[props.tier.theme].badge"
        >
          {{ props.tier.level }}
        </span>
      </div>
      <h3 class="text-base font-bold text-white font-serif leading-tight">
        {{ props.tier.title }}
      </h3>

      <!-- Shortened Concise Bullet Points -->
      <div class="mt-2 text-[11px] font-sans text-slate-300 space-y-1.5">
        <div
          v-for="(pt, idx) in props.tier.points"
          :key="idx"
          class="flex items-start gap-1.5 leading-snug"
        >
          <span
            :class="[pt.icon, themeClasses[props.tier.theme].iconColor]"
            class="w-3.5 h-3.5 shrink-0 mt-0.5"
          ></span>
          <span
            ><strong class="text-white">{{ pt.bold }}:</strong>
            {{ pt.text }}</span
          >
        </div>
      </div>
    </div>

    <!-- Visual Architecture Diagram Container -->
    <div
      class="mt-3 p-2.5 rounded-lg border flex flex-col justify-between h-[155px] font-mono text-[9px] select-none"
      :class="themeClasses[props.tier.theme].diagramBox"
    >
      <!-- DIAGRAM 1: Level 1 (Linear Deterministic Flow) -->
      <div
        v-if="props.tier.diagramType === 'linear'"
        class="h-full flex flex-col justify-between"
      >
        <div
          class="flex items-center justify-between text-[8px] text-slate-400 uppercase font-bold tracking-wider"
        >
          <span>Flow Architecture</span>
        </div>

        <!-- 3 Nodes Linear Flow -->
        <div class="flex items-center justify-between gap-1 my-auto">
          <!-- Step 1 -->
          <div
            class="flex-1 py-1.5 px-1 rounded border text-center flex flex-col items-center bg-slate-900 border-slate-800"
          >
            <span
              class="i-lucide-file-text w-3 h-3 text-indigo-400 mb-0.5"
            ></span>
            <span class="text-[8.5px] text-white truncate w-full">Form</span>
          </div>

          <span class="text-indigo-400 font-bold shrink-0">&rarr;</span>

          <!-- Step 2 -->
          <div
            class="flex-1 py-1.5 px-1 rounded border text-center flex flex-col items-center bg-indigo-950/70 border-indigo-500/50"
          >
            <span class="i-lucide-binary w-3 h-3 text-indigo-300 mb-0.5"></span>
            <span class="text-[8.5px] text-indigo-200 font-bold truncate w-full"
              >Fixed If/Else</span
            >
          </div>

          <span class="text-indigo-400 font-bold shrink-0">&rarr;</span>

          <!-- Step 3 -->
          <div
            class="flex-1 py-1.5 px-1 rounded border text-center flex flex-col items-center bg-slate-900 border-slate-800"
          >
            <span class="i-lucide-table w-3 h-3 text-indigo-400 mb-0.5"></span>
            <span class="text-[8.5px] text-white truncate w-full">Sheet</span>
          </div>
        </div>

        <!-- Vulnerability strip -->
        <div
          class="py-1 px-1.5 rounded bg-red-950/40 border border-red-500/30 text-red-300 flex items-center gap-1 text-[8px]"
        >
          <span
            class="i-lucide-alert-triangle w-3 h-3 shrink-0 text-red-400"
          ></span>
          <span class="truncate">Fails on schema change or free text</span>
        </div>
      </div>

      <!-- DIAGRAM 2: Level 2 (AI Semantic Dispatch Flow) -->
      <div
        v-else-if="props.tier.diagramType === 'branch'"
        class="h-full flex flex-col justify-between"
      >
        <div
          class="flex items-center justify-between text-[8px] text-slate-400 uppercase font-bold tracking-wider"
        >
          <span>Flow Architecture</span>
        </div>

        <!-- Input -> LLM Node -> Branch outputs -->
        <div class="flex items-center justify-between gap-1.5 my-auto">
          <!-- Step 1: Messy Input -->
          <div
            class="w-12 py-1.5 px-1 rounded border text-center flex flex-col items-center bg-slate-900 border-slate-800"
          >
            <span class="i-lucide-mail w-3 h-3 text-cyan-400 mb-0.5"></span>
            <span class="text-[8.5px] text-white truncate w-full">Email</span>
          </div>

          <span class="text-cyan-400 font-bold shrink-0">&rarr;</span>

          <!-- Step 2: LLM Reasoner -->
          <div
            class="flex-1 py-1.5 px-1 w-40 rounded border border-red-500 text-center flex flex-col items-center bg-cyan-950/80 border-cyan-400/60 shadow-sm"
          >
            <span
              class="i-lucide-sparkles w-3 h-3 text-cyan-300 mb-0.5 animate-pulse"
            ></span>
            <span class="text-[8.5px] text-cyan-100 font-bold truncate w-full"
              >LLM</span
            >
            <span class="text-[7px] text-cyan-300">Parse to JSON</span>
          </div>

          <span class="text-cyan-400 font-bold shrink-0">&rarr;</span>

          <!-- Step 3: Dynamic Branches -->
          <div class="flex flex-col gap-1 w-18">
            <div
              class="py-0.5 px-1 rounded bg-slate-900 border border-slate-800 text-[8px] text-cyan-300 text-center truncate"
            >
              Ticket Tier
            </div>
            <div
              class="py-0.5 px-1 rounded bg-slate-900 border border-slate-800 text-[8px] text-emerald-300 text-center truncate"
            >
              Draft Reply
            </div>
          </div>
        </div>

        <!-- Resilience strip -->
        <div
          class="py-1 px-1.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex items-center gap-1 text-[8px]"
        >
          <span class="i-lucide-check w-3 h-3 shrink-0 text-cyan-400"></span>
          <span class="truncate">Normalizes dirty, unstructured inputs</span>
        </div>
      </div>

      <!-- DIAGRAM 3: Level 3 (Autonomous Closed-Loop Multi-Agent) -->
      <div v-else class="h-full flex flex-col justify-between">
        <div
          class="flex items-center justify-between text-[8px] text-slate-400 uppercase font-bold tracking-wider"
        >
          <span>Flow Architecture</span>
        </div>

        <!-- Goal -> Multi-Turn Agent Loop -->
        <div class="flex items-center justify-between gap-1.5 my-auto">
          <!-- Goal Node -->
          <div
            class="w-12 py-1 px-1 rounded border text-center flex flex-col items-center bg-slate-900 border-slate-800"
          >
            <span
              class="i-lucide-target w-3 h-3 text-emerald-400 mb-0.5"
            ></span>
            <span class="text-[8px] text-white truncate w-full">Alert</span>
          </div>

          <span class="text-emerald-400 font-bold shrink-0">&rarr;</span>

          <!-- Active Loop Box -->
          <div
            class="flex-1 py-1 px-1.5 rounded-lg border border-emerald-500/50 bg-emerald-950/70 text-center flex flex-col justify-between"
          >
            <div
              class="flex items-center justify-center gap-1 text-[8.5px] font-bold text-emerald-200"
            >
              <span class="i-lucide-bot w-3 h-3 text-emerald-300"></span>
              <span>Agent Planner</span>
            </div>
            <div
              class="flex items-center justify-center gap-1 my-0.5 text-[7.5px] text-emerald-300"
            >
              <span>Tools / Code</span>
            </div>
            <div
              class="text-[7px] text-emerald-400 font-mono flex items-center justify-center gap-0.5"
            >
              <span class="i-lucide-refresh-cw w-2.5 h-2.5 animate-spin"></span>
              <span>Iterate on error</span>
            </div>
          </div>

          <span class="text-emerald-400 font-bold shrink-0">&rarr;</span>

          <!-- Outcome Node -->
          <div
            class="w-12 py-1 px-1 rounded border text-center flex flex-col items-center bg-slate-900 border-slate-800"
          >
            <span
              class="i-lucide-check-circle-2 w-3 h-3 text-emerald-400 mb-0.5"
            ></span>
            <span class="text-[8px] text-white truncate w-full">Fix</span>
          </div>
        </div>

        <!-- Self-heal strip -->
        <div
          class="py-1 px-1.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-1 text-[8px]"
        >
          <span class="i-lucide-zap w-3 h-3 shrink-0 text-emerald-400"></span>
          <span class="truncate">Self-heals errors in terminal & logs</span>
        </div>
      </div>
    </div>
  </div>
</template>
