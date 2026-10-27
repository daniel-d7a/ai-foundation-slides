<script setup lang="ts">
import { ref } from 'vue'

interface Stage {
  id: 'tool' | 'workflow' | 'agent'
  level: string
  title: string
  paradigm: string
  analogy: string
  theme: 'blue' | 'cyan' | 'emerald'
  icon: string
  tag: string
  example: {
    task: string
    codeOrChain: string
    behavior: string
  }
}

const activeStage = ref<'tool' | 'workflow' | 'agent' | null>(null)

const stages: Stage[] = [
  {
    id: 'tool',
    level: 'LEVEL 1',
    title: 'Tool',
    paradigm: 'Single Action',
    analogy: 'A hammer',
    theme: 'blue',
    icon: 'i-lucide-wrench',
    tag: '1 Function · 0 Autonomy',
    example: {
      task: 'Translate "Hello" to Spanish',
      codeOrChain: 'translate_text("Hello", "es") ➔ "Hola"',
      behavior: 'Runs once when called. No memory, no planning.',
    },
  },
  {
    id: 'workflow',
    level: 'LEVEL 2',
    title: 'Workflow',
    paradigm: 'Fixed Pipeline',
    analogy: 'An assembly line',
    theme: 'cyan',
    icon: 'i-lucide-workflow',
    tag: 'Chained Steps · Fixed Paths',
    example: {
      task: 'Lead Submission on Website',
      codeOrChain: 'Form ➔ AI Categorize ➔ Save CRM ➔ Slack Alert',
      behavior: 'Runs trigger-to-finish. Breaks if an unforeseen edge case arises.',
    },
  },
  {
    id: 'agent',
    level: 'LEVEL 3',
    title: 'Agent',
    paradigm: 'Autonomous Loop',
    analogy: 'An executive assistant',
    theme: 'emerald',
    icon: 'i-lucide-bot',
    tag: 'Closed Loop · High Autonomy',
    example: {
      task: 'Book Flight Under $300',
      codeOrChain: 'Search ($340) ➔ Date +1d ➔ Found $280 ➔ Booked!',
      behavior: 'Loops autonomously: observes result, self-corrects, stops when done.',
    },
  },
]

function selectStage(id: 'tool' | 'workflow' | 'agent') {
  activeStage.value = activeStage.value === id ? null : id
}
</script>

<template>
  <div class="w-full max-w-5xl mx-auto h-[385px] flex flex-col justify-between select-none">
    
    <!-- Top Evolution Progression Header -->
    <div class="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-white font-serif">Capability Spectrum:</span>
        <span class="text-[11px] text-slate-400">How AI expands from a single tool into an autonomous problem solver.</span>
      </div>

      <!-- <div class="flex items-center gap-2 text-[10px] font-mono">
        <span class="px-2 py-0.5 rounded bg-blue-950/70 border border-blue-500/40 text-blue-300 font-semibold flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Point: Tool (1 Step)
        </span>
        <span class="i-lucide-arrow-right w-3 h-3 text-slate-600"></span>
        <span class="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-semibold flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Line: Workflow (Chain)
        </span>
        <span class="i-lucide-arrow-right w-3 h-3 text-slate-600"></span>
        <span class="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Loop: Agent (Cycle)
        </span>
      </div> -->
    </div>

    <!-- 3 Stage Diagram Cards -->
    <div class="grid grid-cols-3 gap-3 flex-1 my-2">
      <div
        v-for="s in stages"
        :key="s.id"
        @click="selectStage(s.id)"
        class="rounded-xl p-3 border flex flex-col justify-between shadow-lg transition-all cursor-pointer bg-slate-950/80"
        :class="[
          activeStage === s.id
            ? (s.theme === 'blue'
                ? 'border-blue-500 bg-slate-900/90 ring-2 ring-blue-500/30'
                : s.theme === 'cyan'
                  ? 'border-cyan-500 bg-slate-900/90 ring-2 ring-cyan-500/30'
                  : 'border-emerald-500 bg-slate-900/90 ring-2 ring-emerald-500/30')
            : (s.theme === 'blue'
                ? 'border-blue-500/30 hover:border-blue-500/60 hover:bg-slate-900/50'
                : s.theme === 'cyan'
                  ? 'border-cyan-500/30 hover:border-cyan-500/60 hover:bg-slate-900/50'
                  : 'border-emerald-500/30 hover:border-emerald-500/60 hover:bg-slate-900/50')
        ]"
      >
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div>
              <div class="flex items-center gap-1.5">
                <span
                  class="text-[9px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.2 rounded"
                  :class="s.theme === 'blue' ? 'bg-blue-500/10 text-blue-400' : s.theme === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-emerald-500/10 text-emerald-400'"
                >
                  {{ s.level }}
                </span>
                <span class="text-[9.5px] font-mono text-slate-400">Like {{ s.analogy }}</span>
              </div>
              <div class="text-base font-bold text-white font-serif leading-tight mt-0.5">{{ s.title }}</div>
            </div>
            
            <div
              class="w-7 h-7 rounded-lg flex items-center justify-center border shrink-0"
              :class="s.theme === 'blue'
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                : s.theme === 'cyan'
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'"
            >
              <span :class="s.icon" class="w-4 h-4"></span>
            </div>
          </div>

          <!-- DIAGRAM 1: TOOL (1-Shot Execution) -->
          <div v-if="s.id === 'tool'" class="my-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col gap-1.5">
            <div class="flex items-center justify-between px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px]">
              <div class="flex items-center gap-1.5">
                <span class="i-lucide-file-text w-3.5 h-3.5 text-slate-400"></span>
                <span class="text-slate-300 font-medium">Input Query</span>
              </div>
              <span class="font-mono text-[9px] text-blue-300">"London"</span>
            </div>

            <div class="flex items-center justify-center py-0.2">
              <span class="i-lucide-arrow-down w-3 h-3 text-slate-600"></span>
            </div>

            <div class="flex items-center justify-between px-2 py-1 rounded bg-blue-950/40 border border-blue-500/40 text-[10px] text-blue-200">
              <div class="flex items-center gap-1.5">
                <span class="i-lucide-wrench w-3.5 h-3.5 text-blue-400"></span>
                <span class="font-semibold">Tool Execution</span>
              </div>
              <span class="font-mono text-[9px] text-blue-300">weather_api()</span>
            </div>

            <div class="flex items-center justify-center py-0.2">
              <span class="i-lucide-arrow-down w-3 h-3 text-slate-600"></span>
            </div>

            <div class="flex items-center justify-between px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px]">
              <div class="flex items-center gap-1.5">
                <span class="i-lucide-check w-3.5 h-3.5 text-emerald-400"></span>
                <span class="text-slate-300 font-medium">Direct Output</span>
              </div>
              <span class="font-mono text-[9px] text-emerald-300">"14°C, Rain"</span>
            </div>
          </div>

          <!-- DIAGRAM 2: WORKFLOW (Chained Pipeline) -->
          <div v-else-if="s.id === 'workflow'" class="my-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col gap-1.5">
            <div class="flex items-center justify-between px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px]">
              <div class="flex items-center gap-1.5">
                <span class="i-lucide-zap w-3.5 h-3.5 text-amber-400"></span>
                <span class="text-slate-300 font-medium">1. Trigger</span>
              </div>
              <span class="font-mono text-[9px] text-slate-400">Form submit</span>
            </div>

            <div class="flex items-center justify-center py-0.2">
              <span class="i-lucide-arrow-down w-3 h-3 text-slate-600"></span>
            </div>

            <div class="flex items-center justify-between px-2 py-1 rounded bg-cyan-950/40 border border-cyan-500/40 text-[10px] text-cyan-200">
              <div class="flex items-center gap-1.5">
                <span class="i-lucide-cpu w-3.5 h-3.5 text-cyan-400"></span>
                <span class="font-semibold">2. AI Processing</span>
              </div>
              <span class="font-mono text-[9px] text-cyan-300">Score &amp; parse</span>
            </div>

            <div class="flex items-center justify-center py-0.2">
              <span class="i-lucide-arrow-down w-3 h-3 text-slate-600"></span>
            </div>

            <div class="flex items-center justify-between px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px]">
              <div class="flex items-center gap-1.5">
                <span class="i-lucide-send w-3.5 h-3.5 text-cyan-400"></span>
                <span class="text-slate-300 font-medium">3. Output Action</span>
              </div>
              <span class="font-mono text-[9px] text-cyan-300">Slack + CRM</span>
            </div>
          </div>

          <!-- DIAGRAM 3: AGENT (Autonomous Feedback Loop) -->
          <div v-else class="my-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col gap-1.5">
            <!-- Goal Node -->
            <div class="flex items-center justify-between px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px]">
              <div class="flex items-center gap-1.5">
                <span class="i-lucide-target w-3.5 h-3.5 text-emerald-400"></span>
                <span class="text-slate-300 font-medium">Goal</span>
              </div>
              <span class="font-mono text-[9px] text-emerald-300">"Book &lt; $300"</span>
            </div>

            <!-- Loop Cycle Container -->
            <div class="p-1.5 rounded bg-emerald-950/30 border border-emerald-500/40 flex flex-col gap-1 text-[9.5px]">
              <div class="flex items-center justify-between text-emerald-200 font-semibold">
                <div class="flex items-center gap-1">
                  <span class="i-lucide-refresh-cw w-2.5 h-2.5 animate-spin text-emerald-400"></span>
                  <span>Reasoning Loop</span>
                </div>
                <span class="font-mono text-[8px] text-emerald-400/90">Think ➔ Act ➔ Observe</span>
              </div>
              
              <div class="grid grid-cols-3 gap-1 text-center font-mono text-[8.5px]">
                <div class="py-0.8 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                  1. Plan
                </div>
                <div class="py-0.8 rounded bg-slate-950/80 border border-slate-800 text-emerald-300">
                  2. Tool
                </div>
                <div class="py-0.8 rounded bg-slate-950/80 border border-slate-800 text-amber-300">
                  3. Check
                </div>
              </div>
            </div>

            <!-- Goal Completion -->
            <div class="flex items-center justify-between px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px]">
              <div class="flex items-center gap-1.5">
                <span class="i-lucide-check-circle-2 w-3.5 h-3.5 text-emerald-400"></span>
                <span class="text-slate-300 font-medium">Goal Met</span>
              </div>
              <span class="font-mono text-[9px] text-emerald-300">Booked ($280)</span>
            </div>
          </div>
        </div>

        <!-- SIMPLE CONCRETE EXAMPLE -->
        <div>
          <div class="pt-1.5 border-t border-slate-800/80">
            <div class="flex items-center justify-between text-[8.5px] font-mono uppercase text-slate-400 mb-1">
              <span>Simple Example</span>
              <span class="text-slate-300 font-semibold">{{ s.example.task }}</span>
            </div>
            
            <div class="p-1.5 rounded bg-slate-900 border border-slate-800/80 font-mono text-[9px] text-slate-300 space-y-1">
              <div class="text-[9.5px] font-sans text-white font-medium truncate">
                {{ s.example.codeOrChain }}
              </div>
              <div class="text-[8.5px] text-slate-400">
                {{ s.example.behavior }}
              </div>
            </div>
          </div>

          <!-- Bottom Characteristic Tag -->
          <div
            class="mt-2 py-0.8 px-2 rounded text-center text-[9px] font-mono font-semibold border"
            :class="s.theme === 'blue'
              ? 'bg-blue-950/30 border-blue-500/30 text-blue-300'
              : s.theme === 'cyan'
                ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-300'
                : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'"
          >
            {{ s.tag }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
