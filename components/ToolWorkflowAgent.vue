<script setup lang="ts">
import { ref } from 'vue'

type StageId = 'tool' | 'workflow' | 'agent'

const activeTab = ref<StageId>('tool')

const tabs = [
  {
    id: 'tool' as StageId,
    level: 'LEVEL 1',
    title: 'Tool',
    subtitle: 'Single Call in the Middle',
    icon: 'i-lucide-wrench',
    activeClass: 'bg-blue-950/80 border-blue-500 text-white shadow-lg shadow-blue-950/40',
    inactiveClass: 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  {
    id: 'workflow' as StageId,
    level: 'LEVEL 2',
    title: 'Workflow',
    subtitle: 'Start to Finish Path',
    icon: 'i-lucide-workflow',
    activeClass: 'bg-cyan-950/80 border-cyan-500 text-white shadow-lg shadow-cyan-950/40',
    inactiveClass: 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  {
    id: 'agent' as StageId,
    level: 'LEVEL 3',
    title: 'Agent',
    subtitle: 'Autonomous Loop',
    icon: 'i-lucide-bot',
    activeClass: 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg shadow-emerald-950/40',
    inactiveClass: 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
]
</script>

<template>
  <div class="w-full max-w-5xl mx-auto h-[400px] flex flex-col justify-between select-none">
    
    <!-- 3 TABS SELECTOR -->
    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="t in tabs"
        :key="t.id"
        @click="activeTab = t.id"
        class="px-4 py-2 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer"
        :class="activeTab === t.id ? t.activeClass + ' ring-1 ring-white/10' : t.inactiveClass"
      >
        <div class="flex items-center gap-2.5">
          <div
            class="w-7 h-7 rounded-lg flex items-center justify-center border shrink-0"
            :class="activeTab === t.id ? 'bg-white/10 border-white/20' : 'bg-slate-800 border-slate-700'"
          >
            <span :class="[t.icon, 'w-4 h-4']"></span>
          </div>
          <div>
            <div class="text-[9px] font-mono uppercase tracking-wider opacity-75">{{ t.level }}</div>
            <div class="text-xs font-bold text-white font-serif">{{ t.title }}</div>
          </div>
        </div>

        <span class="text-[9px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block" :class="t.badgeClass">
          {{ t.subtitle }}
        </span>
      </button>
    </div>

    <!-- ========================================================================= -->
    <!-- TAB 1: TOOL (SIMPLE PATH WITH TOOL IN THE MIDDLE) -->
    <!-- ========================================================================= -->
    <div
      v-if="activeTab === 'tool'"
      class="flex-1 mt-3 p-6 rounded-2xl bg-slate-950/80 border border-blue-500/40 shadow-xl flex flex-col justify-center relative overflow-hidden"
    >
      <div class="text-center mb-6">
        <span class="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-widest">Single Action Execution</span>
        <h3 class="text-lg font-bold text-white font-serif mt-0.5">Prompt ➔ AI Uses Tool ➔ Final Answer</h3>
      </div>

      <!-- Linear Path with Tool in Middle -->
      <div class="relative flex items-center justify-between max-w-4xl mx-auto w-full px-4">
        
        <!-- Connecting Line Background -->
        <div class="absolute left-10 right-10 top-[40px] -translate-y-1/2 h-1 bg-slate-800 z-0"></div>
        <div class="absolute left-10 right-10 top-[40px] -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 opacity-60 z-0"></div>

        <!-- 1. USER PROMPT -->
        <div class="relative z-10 flex flex-col items-center">
          <div class="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-xl shadow-slate-950/50">
            <span class="i-lucide-message-square w-7 h-7 text-blue-400"></span>
          </div>
          <span class="text-xs font-bold text-white mt-2.5 font-serif">1. User Prompt</span>
          <span class="text-[10px] font-mono text-slate-400">"What is 452 × 89?"</span>
        </div>

        <!-- Arrow 1 -->
        <div class="relative z-10 text-slate-600 -translate-y-5">
          <span class="i-lucide-arrow-right w-5 h-5 text-blue-400"></span>
        </div>

        <!-- 2. AI MODEL DECISION -->
        <div class="relative z-10 flex flex-col items-center">
          <div class="w-16 h-16 rounded-2xl bg-indigo-950/80 border-2 border-indigo-500 flex items-center justify-center shadow-xl shadow-indigo-950/60 ring-4 ring-indigo-500/20">
            <span class="i-lucide-brain w-7 h-7 text-indigo-400"></span>
          </div>
          <span class="text-xs font-bold text-white mt-2.5 font-serif">2. AI Model</span>
          <span class="text-[10px] font-mono text-indigo-300">Decides tool needed</span>
        </div>

        <!-- Arrow 2 -->
        <div class="relative z-10 text-slate-600 -translate-y-5">
          <span class="i-lucide-arrow-right w-5 h-5 text-indigo-400"></span>
        </div>

        <!-- 3. TOOL IN THE MIDDLE -->
        <div class="relative z-10 flex flex-col items-center">
          <div class="w-20 h-20 rounded-2xl bg-amber-950/90 border-2 border-amber-400 flex flex-col items-center justify-center shadow-2xl shadow-amber-950/80 scale-105">
            <span class="i-lucide-wrench w-7 h-7 text-amber-300"></span>
            <span class="text-[9px] font-mono font-bold text-amber-200 mt-1 uppercase">Tool Call</span>
          </div>
          <span class="text-xs font-bold text-amber-300 mt-2 font-serif">3. External Tool</span>
          <span class="text-[10px] font-mono text-amber-400/90">Calculator: 40,228</span>
        </div>

        <!-- Arrow 3 -->
        <div class="relative z-10 text-slate-600 -translate-y-5">
          <span class="i-lucide-arrow-right w-5 h-5 text-emerald-400"></span>
        </div>

        <!-- 4. FINAL ANSWER -->
        <div class="relative z-10 flex flex-col items-center">
          <div class="w-16 h-16 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-950/60">
            <span class="i-lucide-check-circle-2 w-7 h-7 text-emerald-400"></span>
          </div>
          <span class="text-xs font-bold text-white mt-2.5 font-serif">4. Output Answer</span>
          <span class="text-[10px] font-mono text-emerald-300">"The answer is 40,228"</span>
        </div>

      </div>

      <div class="text-center mt-6 text-[11px] font-mono text-slate-400">
        Runs once · 0 autonomy · No planning
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- TAB 2: WORKFLOW (PATH WITH START AND FINISH) -->
    <!-- ========================================================================= -->
    <div
      v-else-if="activeTab === 'workflow'"
      class="flex-1 mt-3 p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/40 shadow-xl flex flex-col justify-center relative overflow-hidden"
    >
      <div class="text-center mb-6">
        <span class="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">Fixed Pipeline Path</span>
        <h3 class="text-lg font-bold text-white font-serif mt-0.5">Fixed Steps from Start to Finish</h3>
      </div>

      <!-- Linear Pipeline Path: START to FINISH -->
      <div class="relative flex items-center justify-between max-w-4xl mx-auto w-full px-2">
        
        <!-- Connecting Track Line -->
        <div class="absolute left-8 right-8 top-[32px] -translate-y-1/2 h-1 bg-slate-800 z-0"></div>
        <div class="absolute left-8 right-8 top-[32px] -translate-y-1/2 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 opacity-70 z-0"></div>

        <!-- START NODE -->
        <div class="relative z-10 flex flex-col items-center">
          <div class="w-16 h-16 rounded-2xl bg-cyan-950 border-2 border-cyan-400 flex flex-col items-center justify-center shadow-xl shadow-cyan-950/60">
            <span class="i-lucide-zap w-6 h-6 text-cyan-300"></span>
            <span class="text-[8px] font-mono font-bold text-cyan-200 uppercase mt-0.5">START</span>
          </div>
          <span class="text-xs font-bold text-white mt-2 font-serif">Trigger</span>
          <span class="text-[10px] font-mono text-slate-400">New Form Submit</span>
        </div>

        <span class="i-lucide-arrow-right w-4 h-4 text-cyan-400 relative z-10 -translate-y-5"></span>

        <!-- STEP 1 -->
        <div class="relative z-10 flex flex-col items-center">
          <div class="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
            <span class="i-lucide-database w-6 h-6 text-slate-300"></span>
          </div>
          <span class="text-xs font-bold text-slate-200 mt-2 font-serif">1. Fetch Data</span>
          <span class="text-[10px] font-mono text-slate-400">Customer record</span>
        </div>

        <span class="i-lucide-arrow-right w-4 h-4 text-indigo-400 relative z-10 -translate-y-5"></span>

        <!-- STEP 2: AI STEP -->
        <div class="relative z-10 flex flex-col items-center">
          <div class="w-16 h-16 rounded-2xl bg-indigo-950/90 border-2 border-indigo-400 flex items-center justify-center shadow-xl shadow-indigo-950/70">
            <span class="i-lucide-cpu w-7 h-7 text-indigo-300"></span>
          </div>
          <span class="text-xs font-bold text-white mt-2 font-serif">2. AI Parsing</span>
          <span class="text-[10px] font-mono text-indigo-300">Score &amp; Categorize</span>
        </div>

        <span class="i-lucide-arrow-right w-4 h-4 text-indigo-400 relative z-10 -translate-y-5"></span>

        <!-- STEP 3: ACTION -->
        <div class="relative z-10 flex flex-col items-center">
          <div class="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
            <span class="i-lucide-send w-6 h-6 text-slate-300"></span>
          </div>
          <span class="text-xs font-bold text-slate-200 mt-2 font-serif">3. Save CRM</span>
          <span class="text-[10px] font-mono text-slate-400">Update status</span>
        </div>

        <span class="i-lucide-arrow-right w-4 h-4 text-emerald-400 relative z-10 -translate-y-5"></span>

        <!-- FINISH NODE -->
        <div class="relative z-10 flex flex-col items-center">
          <div class="w-16 h-16 rounded-2xl bg-emerald-950 border-2 border-emerald-400 flex flex-col items-center justify-center shadow-xl shadow-emerald-950/60">
            <span class="i-lucide-check-circle-2 w-6 h-6 text-emerald-300"></span>
            <span class="text-[8px] font-mono font-bold text-emerald-200 uppercase mt-0.5">FINISH</span>
          </div>
          <span class="text-xs font-bold text-white mt-2 font-serif">Notification</span>
          <span class="text-[10px] font-mono text-emerald-300">Slack Alert Sent</span>
        </div>

      </div>

      <div class="text-center mt-6 text-[11px] font-mono text-slate-400">
        Fixed sequence · Always follows same path · Breaks if unexpected error
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- TAB 3: AGENT (LOOP DIAGRAM) -->
    <!-- ========================================================================= -->
    <div
      v-else
      class="flex-1 mt-3 p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/40 shadow-xl flex flex-col justify-between relative overflow-hidden"
    >
      <div class="text-center mb-1">
        <span class="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest">Autonomous Closed Loop</span>
        <h3 class="text-lg font-bold text-white font-serif mt-0.5">Iterates Until Goal is Solved</h3>
      </div>

      <!-- Clean Circular Loop Diagram -->
      <div class="relative w-[700px] h-[210px] mx-auto my-auto flex items-center justify-center">
        
        <!-- SVG Loop Ring with Directional Curved Arrows -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 210">
          <defs>
            <marker id="loop-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
            </marker>
          </defs>

          <!-- Outer Loop Rectangle Track -->
          <rect
            x="140"
            y="20"
            width="420"
            height="170"
            rx="30"
            fill="none"
            stroke="#1e293b"
            stroke-width="3"
          />

          <!-- Clockwise Directional Arc Arrows -->
          <!-- Top Arrow: Plan -> Act -->
          <path
            d="M 310 20 L 390 20"
            fill="none"
            stroke="#10b981"
            stroke-width="3"
            marker-end="url(#loop-arrow)"
          />

          <!-- Right Arrow: Act -> Observe -->
          <path
            d="M 560 75 L 560 135"
            fill="none"
            stroke="#10b981"
            stroke-width="3"
            marker-end="url(#loop-arrow)"
          />

          <!-- Bottom Arrow: Observe -> Evaluate -->
          <path
            d="M 390 190 L 310 190"
            fill="none"
            stroke="#10b981"
            stroke-width="3"
            marker-end="url(#loop-arrow)"
          />

          <!-- Left Arrow: Evaluate -> Plan (Loopback) -->
          <path
            d="M 140 135 L 140 75"
            fill="none"
            stroke="#10b981"
            stroke-width="3"
            marker-end="url(#loop-arrow)"
          />
        </svg>

        <!-- INPUT: GOAL (Enters from Left) -->
        <div class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center">
            <span class="i-lucide-target w-5 h-5 text-indigo-400"></span>
            <span class="text-[9px] font-mono font-bold text-indigo-300 mt-1">USER GOAL</span>
          </div>
          <span class="i-lucide-arrow-right w-4 h-4 text-indigo-400"></span>
        </div>

        <!-- 4 LOOP NODES -->
        <!-- 1. TOP-LEFT: PLAN -->
        <div class="absolute left-[190px] top-[4px] px-3.5 py-1.5 rounded-xl bg-slate-900 border-2 border-indigo-500/60 flex items-center gap-2 shadow-lg z-10">
          <span class="i-lucide-brain w-4 h-4 text-indigo-400"></span>
          <span class="text-xs font-bold text-white font-serif">1. Plan</span>
        </div>

        <!-- 2. TOP-RIGHT: ACT -->
        <div class="absolute right-[190px] top-[4px] px-3.5 py-1.5 rounded-xl bg-slate-900 border-2 border-amber-500/60 flex items-center gap-2 shadow-lg z-10">
          <span class="i-lucide-wrench w-4 h-4 text-amber-400"></span>
          <span class="text-xs font-bold text-white font-serif">2. Act / Tool</span>
        </div>

        <!-- 3. BOTTOM-RIGHT: OBSERVE -->
        <div class="absolute right-[180px] bottom-[4px] px-3.5 py-1.5 rounded-xl bg-slate-900 border-2 border-cyan-500/60 flex items-center gap-2 shadow-lg z-10">
          <span class="i-lucide-eye w-4 h-4 text-cyan-400"></span>
          <span class="text-xs font-bold text-white font-serif">3. Observe Result</span>
        </div>

        <!-- 4. BOTTOM-LEFT: EVALUATE -->
        <div class="absolute left-[180px] bottom-[4px] px-3.5 py-1.5 rounded-xl bg-slate-900 border-2 border-emerald-500/60 flex items-center gap-2 shadow-lg z-10">
          <span class="i-lucide-refresh-cw w-4 h-4 text-emerald-400"></span>
          <span class="text-xs font-bold text-white font-serif">4. Self-Correct</span>
        </div>

        <!-- CENTER REPEAT BADGE -->
        <div class="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center">
          <span class="i-lucide-rotate-cw w-5 h-5 text-emerald-400 animate-spin" style="animation-duration: 6s;"></span>
          <span class="text-[10px] font-mono font-bold text-emerald-300 mt-1">AUTONOMOUS LOOP</span>
          <span class="text-[9px] font-mono text-slate-400">Repeats if error occurs</span>
        </div>

        <!-- OUTPUT: SUCCESS (Exits to Right) -->
        <div class="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <span class="i-lucide-arrow-right w-4 h-4 text-emerald-400"></span>
          <div class="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/60 flex flex-col items-center">
            <span class="i-lucide-check-circle-2 w-5 h-5 text-emerald-400"></span>
            <span class="text-[9px] font-mono font-bold text-emerald-200 mt-1">GOAL DONE</span>
          </div>
        </div>

      </div>

      <div class="text-center mt-2 text-[11px] font-mono text-slate-400">
        Closed feedback loop · Tries alternative tools on failure · Halts when finished
      </div>
    </div>

  </div>
</template>
