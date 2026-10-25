<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import PipelineStage from "./PipelineStage.vue";

// --- MANUAL PROMPTING STATE ---
const manualCount = ref(0);
const manualStep = ref<"idle" | "typing" | "waiting" | "copying">("idle");
const manualProgress = ref(0);
const manualStatusText = ref("Paused. Nothing happens until you click.");

function triggerManualCycle() {
  if (manualStep.value !== "idle") return;

  manualStep.value = "typing";
  manualProgress.value = 25;
  manualStatusText.value = "1/3: Human opening browser & typing prompt...";

  setTimeout(() => {
    manualStep.value = "waiting";
    manualProgress.value = 60;
    manualStatusText.value = "2/3: Waiting for LLM generation to complete...";

    setTimeout(() => {
      manualStep.value = "copying";
      manualProgress.value = 90;
      manualStatusText.value =
        "3/3: Manually selecting text, Ctrl+C, tab-switching, Ctrl+V...";

      setTimeout(() => {
        manualStep.value = "idle";
        manualProgress.value = 0;
        manualCount.value++;
        manualStatusText.value =
          "Finished 1 turn. Stalled again awaiting next human click.";
      }, 700);
    }, 700);
  }, 700);
}

// --- AUTONOMOUS PIPELINE STATE ---
const autoCount = ref(14);
const autoStep = ref<"listening" | "trigger" | "reasoning" | "action">(
  "listening",
);
const autoSimulationRunning = ref(true);
const lastEventText = ref(
  "Webhook: Stripe checkout.session.completed ($49.00)",
);
const recentEvents = [
  "Webhook: Stripe checkout.session.completed ($49.00)",
  "Schedule: Daily 08:00 AM Digest Cron fired",
  'Webhook: Typeform "Midterm Study Survey" submitted',
  "Telegram Bot: Incoming audio memo recorded (24s)",
  'GitHub Event: Issue #88 created with label "bug"',
];

function fireAutoEvent(customEventName?: string) {
  if (autoStep.value !== "listening") return;

  const evt =
    customEventName ||
    recentEvents[Math.floor(Math.random() * recentEvents.length)];
  lastEventText.value = evt;

  autoStep.value = "trigger";

  setTimeout(() => {
    autoStep.value = "reasoning";

    setTimeout(() => {
      autoStep.value = "action";

      setTimeout(() => {
        autoCount.value++;
        autoStep.value = "listening";
      }, 500);
    }, 600);
  }, 500);
}

let autoInterval: ReturnType<typeof setInterval> | null = null;

function toggleAutoSimulation() {
  autoSimulationRunning.value = !autoSimulationRunning.value;
}

onMounted(() => {
  autoInterval = setInterval(() => {
    if (autoSimulationRunning.value && autoStep.value === "listening") {
      fireAutoEvent();
    }
  }, 2600);
});

onUnmounted(() => {
  if (autoInterval) clearInterval(autoInterval);
});
</script>

<template>
  <div
    class="w-full max-w-5xl mx-auto mt-2 h-[395px] select-none flex flex-col justify-between"
  >
    <!-- Top Comparison Grid -->
    <div class="grid grid-cols-2 gap-4 h-[345px]">
      <!-- ================= LEFT PANEL: MANUAL PROMPTING ================= -->
      <div
        class="rounded-2xl p-3.5 border-2 flex flex-col justify-between relative transition-all duration-300"
        :class="
          manualStep !== 'idle'
            ? 'bg-slate-900/95 border-red-500/70 shadow-lg shadow-red-950/30'
            : 'bg-slate-950/80 border-slate-800'
        "
      >
        <!-- Panel Header -->
        <div>
          <div
            class="flex items-center justify-between border-b border-slate-800/80 pb-1.5 mb-2"
          >
            <span
              class="text-[9px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 rounded border border-red-500/40 bg-red-500/15 text-red-300"
            >
              MANUAL PROMPTING (THE OLD WAY)
            </span>
          </div>

          <h3 class="text-sm font-bold text-white font-serif leading-tight">
            Human-in-the-Loop Bottleneck
          </h3>
        </div>

        <!-- 3-Stage Pipeline Diagram -->
        <div class="relative my-2">
          <!-- Animated Connection Line -->
          <div
            class="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-800 -z-0"
          >
            <div
              class="h-full bg-red-500 transition-all duration-300"
              :style="{ width: `${manualProgress}%` }"
            ></div>
          </div>

          <div class="flex items-center gap-2 relative z-10">
            <!-- Stage 1: Human User -->
            <PipelineStage
              label="Human User"
              sublabel="Manual keyboard"
              icon="i-lucide-user"
              :status="manualStep === 'typing' ? 'active' : 'idle'"
              theme="red"
            />

            <!-- Stage 2: Web Chatbot -->
            <PipelineStage
              label="Chatbot Tab"
              sublabel="Waits for answer"
              icon="i-lucide-bot"
              :status="manualStep === 'waiting' ? 'active' : 'idle'"
              theme="red"
            />

            <!-- Stage 3: Paste Destination -->
            <PipelineStage
              label="Copy-Paste"
              sublabel="Notion / Email / DB"
              icon="i-lucide-copy"
              :status="manualStep === 'copying' ? 'active' : 'idle'"
              theme="red"
            />
          </div>
        </div>

        <!-- Live Status Bar -->
        <div
          class="p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[10px] flex items-center justify-between"
        >
          <span
            class="truncate"
            :class="manualStep !== 'idle' ? 'text-red-300' : 'text-slate-500'"
          >
            {{ manualStatusText }}
          </span>
          <span
            v-if="manualStep !== 'idle'"
            class="w-2 h-2 rounded-full bg-red-400 animate-ping shrink-0 ml-1"
          ></span>
        </div>

        <!-- THE BUTTON: Manual Click Trigger -->
        <button
          @click="triggerManualCycle"
          :disabled="manualStep !== 'idle'"
          class="w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border shadow-md"
          :class="[
            manualStep === 'idle'
              ? 'bg-red-950/60 hover:bg-red-900/80 border-red-500/80 text-red-200 hover:text-white ring-1 ring-red-500/40 active:scale-[0.98]'
              : 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed opacity-60',
          ]"
        >
          <span
            class="i-lucide-mouse-pointer-click w-4 h-4 text-red-400"
          ></span>
          <span>{{
            manualStep === "idle"
              ? "✋ CLICK TO RUN 1 MANUAL STEP"
              : "Human Working (Typing & Copying)..."
          }}</span>
        </button>
      </div>

      <!-- ================= RIGHT PANEL: AUTONOMOUS EVENT PIPELINES ================= -->
      <div
        class="rounded-2xl p-3.5 border-2 flex flex-col justify-between relative transition-all duration-300 bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-950/20"
      >
        <!-- Panel Header -->
        <div>
          <div
            class="flex items-center justify-between border-b border-slate-800/80 pb-1.5 mb-2"
          >
            <span
              class="text-[9px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 rounded border border-cyan-500/40 bg-cyan-500/15 text-cyan-300"
            >
              AUTONOMOUS PIPELINE (THE EVENT-DRIVEN WAY)
            </span>
          </div>

          <h3 class="text-sm font-bold text-white font-serif leading-tight">
            24/7 Autonomous Visual Pipeline (n8n)
          </h3>
        </div>

        <!-- 3-Stage Pipeline Diagram -->
        <div class="relative my-2">
          <!-- Animated Flowing Neon Conduit -->
          <div
            class="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-800 overflow-hidden -z-0"
          >
            <div
              class="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-400 animate-pulse"
              :class="autoStep !== 'listening' ? 'opacity-100' : 'opacity-40'"
            ></div>
          </div>

          <div class="flex items-center gap-2 relative z-10">
            <!-- Stage 1: External Trigger -->
            <PipelineStage
              label="Outside Trigger"
              sublabel="Webhook / Timer"
              icon="i-lucide-zap"
              :status="autoStep === 'trigger' ? 'active' : 'idle'"
              theme="cyan"
            />

            <!-- Stage 2: AI Reasoning Node -->
            <PipelineStage
              label="AI Agent Node"
              sublabel="Extracts & decides"
              icon="i-lucide-cpu"
              :status="autoStep === 'reasoning' ? 'active' : 'idle'"
              theme="emerald"
            />

            <!-- Stage 3: API Execution -->
            <PipelineStage
              label="Auto Action"
              sublabel="Notion / Stripe / DB"
              icon="i-lucide-database"
              :status="autoStep === 'action' ? 'active' : 'idle'"
              theme="cyan"
            />
          </div>
        </div>

        <!-- Live Ticker of Inbound Outside Events -->
        <div
          class="p-2 rounded-lg bg-slate-950/90 border border-slate-800 font-mono text-[10px] flex items-center justify-between"
        >
          <div class="flex items-center gap-1.5 truncate">
            <span
              class="i-lucide-radio w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse"
            ></span>
            <span class="text-cyan-300 truncate">{{ lastEventText }}</span>
          </div>
          <span class="text-[9px] text-emerald-400 font-bold shrink-0 ml-1">
            {{ autoStep === "listening" ? "⚡ 24/7 ONLINE" : "RUNNING" }}
          </span>
        </div>

        <!-- Outside Trigger Action Bar -->
        <div class="flex items-center gap-2">
          <!-- External Trigger Injection Buttons -->
          <button
            @click="fireAutoEvent('Webhook: Inbound Customer Form')"
            :disabled="autoStep !== 'listening'"
            class="flex-1 py-2 px-2 rounded-xl font-mono text-[10.5px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 bg-cyan-950/40 hover:bg-cyan-900/60 border-cyan-500/50 text-cyan-200"
          >
            <span class="i-lucide-zap w-3 h-3 text-cyan-400"></span>
            <span>Simulate Webhook</span>
          </button>

          <button
            @click="toggleAutoSimulation"
            class="py-2 px-3 rounded-xl font-mono text-[10.5px] font-bold border transition-all cursor-pointer flex items-center gap-1"
            :class="
              autoSimulationRunning
                ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            "
          >
            <span
              :class="
                autoSimulationRunning ? 'i-lucide-play' : 'i-lucide-pause'
              "
              class="w-3 h-3"
            ></span>
            <span>{{
              autoSimulationRunning ? "Auto-Trigger: ON" : "Paused"
            }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
