<script setup lang="ts">
interface FlowNode {
  icon: string
  label: string
  subtext: string
}

interface BenefitItem {
  icon: string
  title: string
  desc: string
}

const problemFlow: FlowNode[] = [
  { icon: 'i-lucide-inbox', label: 'Inbound Events', subtext: 'Emails, forms, leads' },
  { icon: 'i-lucide-user-x', label: 'Human Middleware', subtext: 'Context switch & fatigue' },
  { icon: 'i-lucide-clock', label: 'Delayed Output', subtext: 'Hours/days latency' },
]

const problemPoints: BenefitItem[] = [
  {
    icon: 'i-lucide-triangle-alert',
    title: 'The Human Bottleneck',
    desc: 'Humans sleep 16h/day, context-switch, and stall workflows when busy.',
  },
  {
    icon: 'i-lucide-copy',
    title: 'Repetitive Copy-Paste Toil',
    desc: 'High-value minds wasted as manual data bridges between disconnected apps.',
  },
  {
    icon: 'i-lucide-trending-down',
    title: 'Linear Scaling Trap',
    desc: '10x tasks require 10x human hours or leads to burnout and dropped balls.',
  },
]

const solutionFlow: FlowNode[] = [
  { icon: 'i-lucide-zap', label: 'Live Triggers', subtext: 'Webhooks, crons, APIs' },
  { icon: 'i-lucide-cpu', label: 'AI Engine (n8n)', subtext: 'Logic + LLM reasoning' },
  { icon: 'i-lucide-check-circle-2', label: 'Instant Dispatch', subtext: '<2s multi-channel' },
]

const solutionPoints: BenefitItem[] = [
  {
    icon: 'i-lucide-sparkles',
    title: '24/7 Zero-Latency Execution',
    desc: 'Event-driven pipelines react instantly in milliseconds, even at 3 AM.',
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Flawless Consistency',
    desc: 'Zero forgotten steps, zero tired typos, complete visibility with audit trails.',
  },
  {
    icon: 'i-lucide-rocket',
    title: 'Asymmetric Leverage',
    desc: '1 or 10,000 tasks run at near-zero marginal cost, freeing you for strategy.',
  },
]
</script>

<template>
  <div class="w-full max-w-5xl mx-auto mt-2 h-[385px] select-none flex flex-col justify-between">
    <div class="grid grid-cols-2 gap-4 h-full">
      <!-- ================= THE PROBLEM PANEL ================= -->
      <div class="rounded-2xl p-3.5 border-2 border-red-500/30 bg-slate-950/80 flex flex-col justify-between transition-all hover:border-red-500/50 shadow-lg shadow-red-950/10">
        <div>
          <!-- Header Tag -->
          <div class="flex items-center justify-between border-b border-red-500/20 pb-1.5 mb-2.5">
            <span class="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-red-500/40 bg-red-500/15 text-red-300 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
              THE PROBLEM WE FIX
            </span>
            <span class="text-[10px] font-mono text-red-400 font-semibold">Fragile & Unscalable</span>
          </div>

          <h3 class="text-sm font-bold text-white font-serif mb-2.5">
            The "Human Middleware" Trap
          </h3>

          <!-- DIAGRAM: Problem Flow -->
          <div class="p-2 rounded-xl bg-slate-900/90 border border-red-500/30 mb-3 relative">
            <div class="flex items-center justify-between gap-1 relative z-10">
              <template v-for="(node, idx) in problemFlow" :key="idx">
                <div class="flex-1 flex flex-col items-center text-center p-1.5 rounded-lg" :class="idx === 1 ? 'bg-red-950/50 border border-red-500/40' : 'bg-slate-950/60 border border-slate-800'">
                  <span :class="[node.icon, idx === 1 ? 'text-red-400' : 'text-slate-400']" class="w-4 h-4 mb-1"></span>
                  <div class="text-[10px] font-bold leading-tight" :class="idx === 1 ? 'text-red-200' : 'text-slate-300'">{{ node.label }}</div>
                  <div class="text-[8px] font-mono text-slate-400 leading-none mt-0.5">{{ node.subtext }}</div>
                </div>

                <!-- Arrow -->
                <span v-if="idx < problemFlow.length - 1" class="i-lucide-arrow-right w-3.5 h-3.5 text-red-500/60 shrink-0"></span>
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
              <div class="w-5 h-5 rounded flex items-center justify-center bg-red-500/10 border border-red-500/25 shrink-0 mt-0.5">
                <span :class="point.icon" class="w-3 h-3 text-red-400"></span>
              </div>
              <div class="min-w-0">
                <div class="text-[11px] font-bold text-slate-200 font-serif leading-tight">{{ point.title }}</div>
                <div class="text-[9px] text-slate-400 leading-tight mt-0.5">{{ point.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Metric Footer -->
        <div class="pt-2 border-t border-red-900/30 flex items-center justify-between text-[9px] font-mono">
          <span class="text-red-400/90 font-semibold">Cost: High toil + Slow turnaround</span>
          <span class="text-slate-500">Latency: Hours / Days</span>
        </div>
      </div>

      <!-- ================= THE SOLUTION PANEL ================= -->
      <div class="rounded-2xl p-3.5 border-2 border-cyan-500/40 bg-slate-950/80 flex flex-col justify-between transition-all hover:border-cyan-400/60 shadow-lg shadow-cyan-950/20">
        <div>
          <!-- Header Tag -->
          <div class="flex items-center justify-between border-b border-cyan-500/20 pb-1.5 mb-2.5">
            <span class="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-cyan-500/40 bg-cyan-500/15 text-cyan-300 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              WHY AUTOMATIONS?
            </span>
            <span class="text-[10px] font-mono text-cyan-400 font-semibold">Autonomous & Scalable</span>
          </div>

          <h3 class="text-sm font-bold text-white font-serif mb-2.5">
            The Autonomous Leverage Engine
          </h3>

          <!-- DIAGRAM: Solution Flow -->
          <div class="p-2 rounded-xl bg-slate-900/90 border border-cyan-500/40 mb-3 relative">
            <div class="flex items-center justify-between gap-1 relative z-10">
              <template v-for="(node, idx) in solutionFlow" :key="idx">
                <div class="flex-1 flex flex-col items-center text-center p-1.5 rounded-lg" :class="idx === 1 ? 'bg-cyan-950/50 border border-cyan-500/50 shadow-sm shadow-cyan-500/20' : 'bg-slate-950/60 border border-slate-800'">
                  <span :class="[node.icon, idx === 1 ? 'text-cyan-300' : 'text-slate-300']" class="w-4 h-4 mb-1"></span>
                  <div class="text-[10px] font-bold leading-tight" :class="idx === 1 ? 'text-cyan-200' : 'text-slate-200'">{{ node.label }}</div>
                  <div class="text-[8px] font-mono text-cyan-300/80 leading-none mt-0.5">{{ node.subtext }}</div>
                </div>

                <!-- Arrow -->
                <span v-if="idx < solutionFlow.length - 1" class="i-lucide-arrow-right w-3.5 h-3.5 text-cyan-400 shrink-0"></span>
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
              <div class="w-5 h-5 rounded flex items-center justify-center bg-cyan-500/10 border border-cyan-500/25 shrink-0 mt-0.5">
                <span :class="point.icon" class="w-3 h-3 text-cyan-300"></span>
              </div>
              <div class="min-w-0">
                <div class="text-[11px] font-bold text-slate-200 font-serif leading-tight">{{ point.title }}</div>
                <div class="text-[9px] text-slate-400 leading-tight mt-0.5">{{ point.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Metric Footer -->
        <div class="pt-2 border-t border-cyan-900/30 flex items-center justify-between text-[9px] font-mono">
          <span class="text-cyan-300 font-semibold">Outcome: Zero toil + Creative freedom</span>
          <span class="text-cyan-400">Latency: &lt; 2 Seconds</span>
        </div>
      </div>
    </div>
  </div>
</template>
