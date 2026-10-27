<script setup lang="ts">
interface FlowNode {
  icon: string;
  label: string;
  subtext: string;
}

interface BenefitItem {
  icon: string;
  title: string;
  desc: string;
}

const problemFlow: FlowNode[] = [
  {
    icon: "i-lucide-inbox",
    label: "Inbound Events",
    subtext: "Emails, forms, requests",
  },
  {
    icon: "i-lucide-user-x",
    label: "Manual Processing",
    subtext: "Fatigue & delays",
  },
  { icon: "i-lucide-clock", label: "Delayed Output", subtext: "Hours or days" },
];

const problemPoints: BenefitItem[] = [
  {
    icon: "i-lucide-triangle-alert",
    title: "Human Delays",
    desc: "Humans get tired and cause task delays.",
  },
  {
    icon: "i-lucide-copy",
    title: "Manual Copying",
    desc: "Copying data between tools wastes time.",
  },
  {
    icon: "i-lucide-trending-down",
    title: "Linear Limits",
    desc: "More work requires more workers and causes errors.",
  },
];

const solutionFlow: FlowNode[] = [
  {
    icon: "i-lucide-zap",
    label: "Automatic Triggers",
    subtext: "Webhooks, schedules, APIs",
  },
  {
    icon: "i-lucide-cpu",
    label: "AI Workflow Engine",
    subtext: "Logic & model reasoning",
  },
  {
    icon: "i-lucide-check-circle-2",
    label: "Instant Output",
    subtext: "Less than 2 seconds",
  },
];

const solutionPoints: BenefitItem[] = [
  {
    icon: "i-lucide-sparkles",
    title: "Continuous Operation",
    desc: "Workflows run 24/7 without human delay.",
  },
  {
    icon: "i-lucide-shield-check",
    title: "Accurate Results",
    desc: "Automated rules prevent data loss and typos.",
  },
  {
    icon: "i-lucide-rocket",
    title: "High Scalability",
    desc: "Systems process high task volume easily.",
  },
];
</script>

<template>
  <div
    class="w-full max-w-5xl mx-auto mt-2 h-[345px] select-none flex flex-col justify-between"
  >
    <div class="grid grid-cols-2 gap-4 h-full">
      <!-- ================= THE PROBLEM PANEL ================= -->
      <div
        class="rounded-2xl p-3.5 border-2 border-red-500/30 bg-slate-950/80 flex flex-col justify-between transition-all hover:border-red-500/50 shadow-lg shadow-red-950/10"
      >
        <div>
          <h3 class="text-sm font-bold text-white font-serif mb-2.5">
            The "Human Middleware" Trap
          </h3>

          <!-- DIAGRAM: Problem Flow -->
          <div
            class="p-2 rounded-xl bg-slate-900/90 border border-red-500/30 mb-3 relative"
          >
            <div class="flex items-center justify-between gap-1 relative z-10">
              <template v-for="(node, idx) in problemFlow" :key="idx">
                <div
                  class="flex-1 flex flex-col items-center text-center p-1.5 rounded-lg"
                  :class="
                    idx === 1
                      ? 'bg-red-950/50 border border-red-500/40'
                      : 'bg-slate-950/60 border border-slate-800'
                  "
                >
                  <span
                    :class="[
                      node.icon,
                      idx === 1 ? 'text-red-400' : 'text-slate-400',
                    ]"
                    class="w-4 h-4 mb-1"
                  ></span>
                  <div
                    class="text-[10px] font-bold leading-tight"
                    :class="idx === 1 ? 'text-red-200' : 'text-slate-300'"
                  >
                    {{ node.label }}
                  </div>
                  <div
                    class="text-[8px] font-mono text-slate-400 leading-none mt-0.5"
                  >
                    {{ node.subtext }}
                  </div>
                </div>

                <!-- Arrow -->
                <span
                  v-if="idx < problemFlow.length - 1"
                  class="i-lucide-arrow-right w-3.5 h-3.5 text-red-500/60 shrink-0"
                ></span>
              </template>
            </div>
          </div>

          <!-- Points List -->
          <div class="space-y-2">
            <div
              v-for="(point, idx) in problemPoints"
              :key="idx"
              class="flex items-start gap-2.5 p-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80"
            >
              <div
                class="w-5 h-5 rounded flex items-center justify-center bg-red-500/10 border border-red-500/25 shrink-0 mt-0.5"
              >
                <span :class="point.icon" class="w-3 h-3 text-red-400"></span>
              </div>
              <div class="min-w-0">
                <div
                  class="text-[11px] font-bold text-slate-200 font-serif leading-tight"
                >
                  {{ point.title }}
                </div>
                <div class="text-[9px] text-slate-400 leading-tight mt-0.5">
                  {{ point.desc }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Metric Footer -->
        <div
          class="pt-2 border-t border-red-900/30 flex items-center justify-between text-[9px] font-mono"
        >
          <span class="text-red-400/90 font-semibold"
            >Cost: High toil + Slow turnaround</span
          >
          <span class="text-slate-500">Latency: Hours / Days</span>
        </div>
      </div>

      <!-- ================= THE SOLUTION PANEL ================= -->
      <div
        class="rounded-2xl p-3.5 border-2 border-cyan-500/40 bg-slate-950/80 flex flex-col justify-between transition-all hover:border-cyan-400/60 shadow-lg shadow-cyan-950/20"
      >
        <div>
          <h3 class="text-sm font-bold text-white font-serif mb-2.5">
            The Autonomous Leverage Engine
          </h3>

          <!-- DIAGRAM: Solution Flow -->
          <div
            class="p-2 rounded-xl bg-slate-900/90 border border-cyan-500/40 mb-3 relative"
          >
            <div class="flex items-center justify-between gap-1 relative z-10">
              <template v-for="(node, idx) in solutionFlow" :key="idx">
                <div
                  class="flex-1 flex flex-col items-center text-center p-1.5 rounded-lg"
                  :class="
                    idx === 1
                      ? 'bg-cyan-950/50 border border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-950/60 border border-slate-800'
                  "
                >
                  <span
                    :class="[
                      node.icon,
                      idx === 1 ? 'text-cyan-300' : 'text-slate-300',
                    ]"
                    class="w-4 h-4 mb-1"
                  ></span>
                  <div
                    class="text-[10px] font-bold leading-tight"
                    :class="idx === 1 ? 'text-cyan-200' : 'text-slate-200'"
                  >
                    {{ node.label }}
                  </div>
                  <div
                    class="text-[8px] font-mono text-cyan-300/80 leading-none mt-0.5"
                  >
                    {{ node.subtext }}
                  </div>
                </div>

                <!-- Arrow -->
                <span
                  v-if="idx < solutionFlow.length - 1"
                  class="i-lucide-arrow-right w-3.5 h-3.5 text-cyan-400 shrink-0"
                ></span>
              </template>
            </div>
          </div>

          <!-- Points List -->
          <div class="space-y-2">
            <div
              v-for="(point, idx) in solutionPoints"
              :key="idx"
              class="flex items-start gap-2.5 p-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80"
            >
              <div
                class="w-5 h-5 rounded flex items-center justify-center bg-cyan-500/10 border border-cyan-500/25 shrink-0 mt-0.5"
              >
                <span :class="point.icon" class="w-3 h-3 text-cyan-300"></span>
              </div>
              <div class="min-w-0">
                <div
                  class="text-[11px] font-bold text-slate-200 font-serif leading-tight"
                >
                  {{ point.title }}
                </div>
                <div class="text-[9px] text-slate-400 leading-tight mt-0.5">
                  {{ point.desc }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Metric Footer -->
        <div
          class="pt-2 border-t border-cyan-900/30 flex items-center justify-between text-[9px] font-mono"
        >
          <span class="text-cyan-300 font-semibold"
            >Outcome: Zero toil + Creative freedom</span
          >
          <span class="text-cyan-400">Latency: &lt; 2 Seconds</span>
        </div>
      </div>
    </div>
  </div>
</template>
