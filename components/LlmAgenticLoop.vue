<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

interface LoopPhase {
  id: number;
  title: string;
  role: string;
  icon: string;
  color: string;
  borderColor: string;
  activeBorder: string;
  bg: string;
  activeBg: string;
  badgeBg: string;
  desc: string;
  traceLabel: string;
  traceCode: string;
}

const phases: LoopPhase[] = [
  {
    id: 1,
    title: "1. Perceive & Plan",
    role: "Reasoning Engine",
    icon: "i-lucide-brain",
    color: "text-indigo-400",
    borderColor: "border-indigo-500/30",
    activeBorder:
      "border-indigo-400 ring-2 ring-indigo-400/50 shadow-indigo-950/50",
    bg: "bg-slate-900/90",
    activeBg: "bg-indigo-950/90",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    desc: "Analyzes user goal, environment state, and decides next sub-task.",
    traceLabel: "REASONING",
    traceCode: 'Think: "Need stock for Item #482. Must call inventory API."',
  },
  {
    id: 2,
    title: "2. Act (Tool Call)",
    role: "Execution",
    icon: "i-lucide-wrench",
    color: "text-amber-400",
    borderColor: "border-amber-500/30",
    activeBorder:
      "border-amber-400 ring-2 ring-amber-400/50 shadow-amber-950/50",
    bg: "bg-slate-900/90",
    activeBg: "bg-amber-950/90",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    desc: "Calls external tool: search web, run bash/code, or query database.",
    traceLabel: "TOOL CALL",
    traceCode: 'execute_tool("inventory_api", { item_id: 482 })',
  },
  {
    id: 3,
    title: "3. Observe Result",
    role: "Feedback",
    icon: "i-lucide-eye",
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    activeBorder: "border-cyan-400 ring-2 ring-cyan-400/50 shadow-cyan-950/50",
    bg: "bg-slate-900/90",
    activeBg: "bg-cyan-950/90",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    desc: "Captures tool execution output, data payload, or error trace.",
    traceLabel: "OBSERVE",
    traceCode: 'Payload: { stock: 2, reorder_level: 5, status: "LOW_STOCK" }',
  },
  {
    id: 4,
    title: "4. Evaluate & Iterate",
    role: "Control",
    icon: "i-lucide-refresh-cw",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    activeBorder:
      "border-emerald-400 ring-2 ring-emerald-400/50 shadow-emerald-950/50",
    bg: "bg-slate-900/90",
    activeBg: "bg-emerald-950/90",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    desc: "Is goal met? If NOT, refine and loop back. If YES, return answer.",
    traceLabel: "EVALUATE",
    traceCode:
      "Stock < 5. Need Slack alert. Looping back to Step 1 -> notify_slack()",
  },
];

const currentStep = ref(0);
const isAutoPlay = ref(true);
let loopInterval: any = null;

function setStep(idx: number) {
  currentStep.value = idx;
}

function nextStep() {
  currentStep.value = (currentStep.value + 1) % phases.length;
}

function togglePlay() {
  isAutoPlay.value = !isAutoPlay.value;
  if (isAutoPlay.value) startTimer();
  else if (loopInterval) clearInterval(loopInterval);
}

function startTimer() {
  if (loopInterval) clearInterval(loopInterval);
  loopInterval = setInterval(() => {
    nextStep();
  }, 3200);
}

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (loopInterval) clearInterval(loopInterval);
});
</script>

<template>
  <div
    class="w-full max-w-5xl mx-auto mt-2 select-none flex flex-col justify-between h-[380px]"
  >
    <!-- CIRCULAR LOOP CANVAS -->
    <div class="relative w-[920px] h-[380px] mx-auto">
      <!-- SVG CIRCLE TRACK & ARROWS -->
      <svg
        class="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 920 380"
      >
        <defs>
          <marker
            id="arrow-indigo"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#818cf8" />
          </marker>
          <marker
            id="arrow-amber"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#fbbf24" />
          </marker>
          <marker
            id="arrow-cyan"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#22d3ee" />
          </marker>
          <marker
            id="arrow-emerald"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#34d399" />
          </marker>
        </defs>

        <!-- Corner 1: Top-Right (Step 1 -> Step 2) -->
        <path
          d="M 590 45 L 745 45 Q 770 45 770 70 L 770 118"
          fill="none"
          stroke="#818cf8"
          stroke-width="3"
          stroke-dasharray="6 4"
          marker-end="url(#arrow-indigo)"
          class="animate-pulse"
        />

        <!-- Corner 2: Bottom-Right (Step 2 -> Step 3) -->
        <path
          d="M 770 195 L 770 302 Q 770 327 745 327 L 592 327"
          fill="none"
          stroke="#fbbf24"
          stroke-width="3"
          stroke-dasharray="6 4"
          marker-end="url(#arrow-amber)"
          class="animate-pulse"
        />

        <!-- Corner 3: Bottom-Left (Step 3 -> Step 4) -->
        <path
          d="M 330 327 L 170 327 Q 145 327 145 302 L 145 196"
          fill="none"
          stroke="#22d3ee"
          stroke-width="3"
          stroke-dasharray="6 4"
          marker-end="url(#arrow-cyan)"
          class="animate-pulse"
        />

        <!-- Corner 4: Top-Left (Step 4 -> Step 1 - Closed Loopback) -->
        <path
          d="M 195 120 L 195 60 Q 195 45 210 45 L 328 45"
          fill="none"
          stroke="#34d399"
          stroke-width="3"
          stroke-dasharray="6 4"
          marker-end="url(#arrow-emerald)"
          class="animate-pulse"
        />
      </svg>

      <!-- 1. TOP NODE: PERCEIVE & PLAN -->
      <div
        @click="setStep(0)"
        class="absolute left-[335px] top-[10px] w-[250px] p-2.5 rounded-xl border transition-all duration-300 cursor-pointer shadow-lg z-10"
        :class="[
          currentStep === 0
            ? `${phases[0].activeBorder} ${phases[0].activeBg} scale-[1.03]`
            : `${phases[0].borderColor} ${phases[0].bg} opacity-75 hover:opacity-100`,
        ]"
      >
        <div
          class="absolute left-2 -top-4 px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500/50 shadow-md flex items-center gap-1.5 z-10"
        >
          <span class="i-lucide-sparkles w-3 h-3 text-indigo-400"></span>
          <span class="text-[10px] font-mono font-bold text-indigo-200"
            >User Goal / Task</span
          >
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span
              :class="[phases[0].icon, 'w-3.5 h-3.5', phases[0].color]"
            ></span>
            <h4 class="font-bold text-xs text-white font-serif">
              {{ phases[0].title }}
            </h4>
          </div>
          <span
            class="text-[8px] font-mono px-1.5 py-0.5 rounded border"
            :class="phases[0].badgeBg"
          >
            {{ phases[0].role }}
          </span>
        </div>
        <p class="text-[10px] text-slate-300 font-sans mt-1 leading-snug">
          {{ phases[0].desc }}
        </p>
      </div>

      <!-- 2. RIGHT NODE: ACT / TOOL CALL -->
      <div
        @click="setStep(1)"
        class="absolute left-[650px] top-[125px] w-[240px] p-2.5 rounded-xl border transition-all duration-300 cursor-pointer shadow-lg z-10"
        :class="[
          currentStep === 1
            ? `${phases[1].activeBorder} ${phases[1].activeBg} scale-[1.03]`
            : `${phases[1].borderColor} ${phases[1].bg} opacity-75 hover:opacity-100`,
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span
              :class="[phases[1].icon, 'w-3.5 h-3.5', phases[1].color]"
            ></span>
            <h4 class="font-bold text-xs text-white font-serif">
              {{ phases[1].title }}
            </h4>
          </div>
          <span
            class="text-[8px] font-mono px-1.5 py-0.5 rounded border"
            :class="phases[1].badgeBg"
          >
            {{ phases[1].role }}
          </span>
        </div>
        <p class="text-[10px] text-slate-300 font-sans mt-1 leading-snug">
          {{ phases[1].desc }}
        </p>
      </div>

      <!-- 3. BOTTOM NODE: OBSERVE RESULT -->
      <div
        @click="setStep(2)"
        class="absolute left-[335px] top-[292px] w-[250px] p-2.5 rounded-xl border transition-all duration-300 cursor-pointer shadow-lg z-10"
        :class="[
          currentStep === 2
            ? `${phases[2].activeBorder} ${phases[2].activeBg} scale-[1.03]`
            : `${phases[2].borderColor} ${phases[2].bg} opacity-75 hover:opacity-100`,
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span
              :class="[phases[2].icon, 'w-3.5 h-3.5', phases[2].color]"
            ></span>
            <h4 class="font-bold text-xs text-white font-serif">
              {{ phases[2].title }}
            </h4>
          </div>
          <span
            class="text-[8px] font-mono px-1.5 py-0.5 rounded border"
            :class="phases[2].badgeBg"
          >
            {{ phases[2].role }}
          </span>
        </div>
        <p class="text-[10px] text-slate-300 font-sans mt-1 leading-snug">
          {{ phases[2].desc }}
        </p>
      </div>

      <!-- 4. LEFT NODE: EVALUATE & ITERATE -->
      <div
        @click="setStep(3)"
        class="absolute left-[25px] top-[125px] w-[240px] p-2.5 rounded-xl border transition-all duration-300 cursor-pointer shadow-lg z-10"
        :class="[
          currentStep === 3
            ? `${phases[3].activeBorder} ${phases[3].activeBg} scale-[1.03]`
            : `${phases[3].borderColor} ${phases[3].bg} opacity-75 hover:opacity-100`,
        ]"
      >
        <!-- EXIT BADGE (Bottom-Left) -->
        <div
          class="absolute left-2 -top-4 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/60 shadow-md flex items-center gap-1.5 z-10"
        >
          <span class="i-lucide-check-circle-2 w-3 h-3 text-emerald-400"></span>
          <span class="text-[10px] font-mono font-bold text-emerald-200"
            >Goal Satisfied (Done)</span
          >
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span
              :class="[phases[3].icon, 'w-3.5 h-3.5', phases[3].color]"
            ></span>
            <h4 class="font-bold text-xs text-white font-serif">
              {{ phases[3].title }}
            </h4>
          </div>
          <span
            class="text-[8px] font-mono px-1.5 py-0.5 rounded border"
            :class="phases[3].badgeBg"
          >
            {{ phases[3].role }}
          </span>
        </div>
        <p class="text-[10px] text-slate-300 font-sans mt-1 leading-snug">
          {{ phases[3].desc }}
        </p>
      </div>
    </div>
  </div>
</template>
