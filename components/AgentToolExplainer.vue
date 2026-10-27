<script setup lang="ts">
import { ref } from 'vue'

interface ToolExample {
  id: string
  title: string
  icon: string
  theme: 'indigo' | 'cyan' | 'emerald'
  prompt: string
  output: string
  badgeText: string
}

const tools: ToolExample[] = [
  {
    id: 'calendar',
    title: 'Calendar Integration',
    icon: 'i-lucide-calendar',
    theme: 'indigo',
    badgeText: 'Live Booking',
    prompt: '"Book 30 min review with Sarah on Friday at 2:00 PM."',
    output: 'Calendar invite sent &bull; Meeting link attached',
  },
  {
    id: 'maps',
    title: 'Maps & Geolocation',
    icon: 'i-lucide-map-pin',
    theme: 'cyan',
    badgeText: 'Optimal Route',
    prompt: '"Find fastest driving route to airport avoiding traffic."',
    output: 'ETA: 24 mins via Highway 104 &bull; Saved 11 mins',
  },
  {
    id: 'scheduled',
    title: 'Scheduled Actions',
    icon: 'i-lucide-clock',
    theme: 'emerald',
    badgeText: 'Automated Job',
    prompt: '"Send a weekly summary report to my team every Monday at 9 AM."',
    output: 'Cron active: Triggers every Monday at 09:00 AM',
  },
]

const activeToolId = ref('calendar')

function setTool(t: ToolExample) {
  activeToolId.value = t.id
}
</script>

<template>
  <div class="w-full max-w-5xl mx-auto h-[385px] flex flex-col justify-between select-none">
    
    <!-- Top Concept Banner: What is a Tool? -->
    <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
          <span class="i-lucide-wrench w-4 h-4 text-indigo-400"></span>
        </div>
        <div>
          <div class="text-xs font-bold text-white font-serif">Definition: What is an AI Tool?</div>
          <div class="text-[11px] text-slate-300 leading-tight">
            An external software function. An AI model alone can only output text. Tools give models <strong class="text-white">hands and senses</strong> to interact with live systems.
          </div>
        </div>
      </div>

      <!-- Compact 4-Step Tool Loop -->
      <!-- <div class="flex items-center gap-1.5 shrink-0 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-[10px] font-mono">
        <span class="text-slate-400">1. User Goal</span>
        <span class="i-lucide-arrow-right w-3 h-3 text-slate-600"></span>
        <span class="text-indigo-400 font-semibold">2. Model Selects Tool</span>
        <span class="i-lucide-arrow-right w-3 h-3 text-slate-600"></span>
        <span class="text-cyan-400 font-semibold">3. Tool Executes API</span>
        <span class="i-lucide-arrow-right w-3 h-3 text-slate-600"></span>
        <span class="text-emerald-400 font-semibold">4. Verified Result</span>
      </div> -->
    </div>

    <!-- Main Grid: 3 Interactive Tool Cards with Diagrams -->
    <div class="grid grid-cols-3 gap-3.5 flex-1 my-2.5">
      <div
        v-for="t in tools"
        :key="t.id"
        @click="setTool(t)"
        class="rounded-xl p-3 border transition-all cursor-pointer flex flex-col justify-between shadow-md"
        :class="activeToolId === t.id
          ? (t.theme === 'indigo'
              ? 'bg-slate-900/95 border-indigo-500/80 ring-2 ring-indigo-500/30 scale-101'
              : t.theme === 'cyan'
                ? 'bg-slate-900/95 border-cyan-500/80 ring-2 ring-cyan-500/30 scale-101'
                : 'bg-slate-900/95 border-emerald-500/80 ring-2 ring-emerald-500/30 scale-101')
          : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'"
      >
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between pb-2 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span
                class="w-4 h-4"
                :class="[
                  t.icon,
                  t.theme === 'indigo' ? 'text-indigo-400' : t.theme === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'
                ]"
              ></span>
              <span class="text-xs font-bold text-white font-serif">{{ t.title }}</span>
            </div>
          </div>

          <!-- Prompt snippet -->
          <div class="mt-2">
            <div class="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <span class="i-lucide-message-square w-2.5 h-2.5 text-slate-400"></span>
              Human Instruction
            </div>
            <div class="p-1.5 rounded bg-slate-950 border border-slate-800/80 text-[10px] text-slate-200 font-sans italic leading-tight">
              {{ t.prompt }}
            </div>
          </div>

          <!-- Visual Diagram Slot -->
          <div class="mt-2">
            <div class="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <span
                class="w-2.5 h-2.5"
                :class="t.theme === 'indigo' ? 'i-lucide-calendar text-indigo-400' : t.theme === 'cyan' ? 'i-lucide-map text-cyan-400' : 'i-lucide-cpu text-emerald-400'"
              ></span>
              <span>Tool Execution Model</span>
            </div>

            <!-- DIAGRAM 1: CALENDAR TIMELINE -->
            <div
              v-if="t.id === 'calendar'"
              class="h-[110px] rounded-lg bg-slate-950 border border-indigo-500/30 p-2 flex flex-col justify-between relative overflow-hidden"
            >
              <div class="flex items-center justify-between text-[8.5px] font-mono border-b border-slate-800/80 pb-1">
                <span class="flex items-center gap-1 text-indigo-300 font-bold">
                  <span class="i-lucide-calendar-days w-2.5 h-2.5 text-indigo-400"></span>
                  Friday &bull; Oct 31
                </span>
                <span class="text-emerald-400 font-semibold flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  1 Slot Available
                </span>
              </div>

              <div class="flex flex-col gap-1 my-auto">
                <!-- Slot 1 (Busy) -->
                <div class="flex items-center gap-1.5 text-[8.5px] font-mono">
                  <span class="w-10 text-slate-500 text-right shrink-0">1:00 PM</span>
                  <div class="flex-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500 line-through truncate">
                    Sprint Sync (Busy)
                  </div>
                </div>

                <!-- Slot 2 (Booked by AI) -->
                <div class="flex items-center gap-1.5 text-[8.5px] font-mono">
                  <span class="w-10 text-indigo-300 font-bold text-right shrink-0">2:00 PM</span>
                  <div class="flex-1 px-1.5 py-0.5 rounded bg-indigo-950/90 border border-indigo-400 text-indigo-200 flex items-center justify-between shadow-sm">
                    <span class="flex items-center gap-1 truncate font-medium">
                      <span class="i-lucide-check-circle w-2.5 h-2.5 text-emerald-400 shrink-0"></span>
                      <span>Review w/ Sarah (30m)</span>
                    </span>
                    <span class="text-[7.5px] font-mono px-1 py-0.2 rounded bg-indigo-500/30 text-indigo-300 shrink-0">Booked</span>
                  </div>
                </div>

                <!-- Slot 3 (Busy) -->
                <div class="flex items-center gap-1.5 text-[8.5px] font-mono">
                  <span class="w-10 text-slate-500 text-right shrink-0">3:00 PM</span>
                  <div class="flex-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500 line-through truncate">
                    Team Standup (Busy)
                  </div>
                </div>
              </div>
            </div>

            <!-- DIAGRAM 2: MAPS GPS VECTOR ROUTE -->
            <div
              v-else-if="t.id === 'maps'"
              class="h-[110px] rounded-lg bg-slate-950 border border-cyan-500/30 p-2 flex flex-col justify-between relative overflow-hidden"
            >
              <div class="flex items-center justify-between text-[8.5px] font-mono border-b border-slate-800/80 pb-1">
                <span class="flex items-center gap-1 text-cyan-300 font-bold">
                  <span class="i-lucide-navigation w-2.5 h-2.5 text-cyan-400"></span>
                  Live Route Calculation
                </span>
                <span class="text-emerald-400 font-semibold font-mono">Save 11 min</span>
              </div>

              <div class="relative flex-1 flex items-center justify-center my-0.5">
                <svg class="w-full h-16 overflow-visible" viewBox="0 0 240 65" fill="none">
                  <!-- Road Grid backdrop lines -->
                  <line x1="15" y1="18" x2="225" y2="18" stroke="#1e293b" stroke-width="0.8" stroke-dasharray="2 3" />
                  <line x1="15" y1="46" x2="225" y2="46" stroke="#1e293b" stroke-width="0.8" stroke-dasharray="2 3" />

                  <!-- Congested Alternative Route (Dashed Red) -->
                  <path
                    d="M 28,32 Q 85,58 140,50 T 212,32"
                    stroke="#ef4444"
                    stroke-width="1.8"
                    stroke-dasharray="3 3"
                    class="opacity-50"
                  />
                  <text x="75" y="60" fill="#f87171" font-size="2.3" font-family="monospace">Traffic Jam (35m)</text>

                  <!-- Chosen Optimal Route (Cyan Expressway) -->
                  <path
                    d="M 28,32 Q 75,8 135,12 T 212,32"
                    stroke="#06b6d4"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />

                  <!-- Origin Node -->
                  <circle cx="28" cy="32" r="4.5" fill="#0f172a" stroke="#06b6d4" stroke-width="2" />
                  <text x="12" y="44" fill="#94a3b8" font-size="2.3" font-family="monospace">Office</text>

                  <!-- Destination Node -->
                  <circle cx="212" cy="32" r="4.5" fill="#10b981" stroke="#ffffff" stroke-width="1.5" />
                  <text x="194" y="44" fill="#34d399" font-size="2.3" font-family="monospace" font-weight="bold">Airport</text>

                  <!-- Badge on Optimal Route -->
                  <rect x="75" y="2" width="75" height="12" rx="3" fill="#083344" stroke="#06b6d4" stroke-width="0.8" />
                  <text x="82" y="10.5" fill="#67e8f9" font-size="2.3" font-family="monospace" font-weight="bold">Hwy 104: 24m</text>
                </svg>
              </div>
            </div>

            <!-- DIAGRAM 3: SCHEDULED ACTIONS PIPELINE -->
            <div
              v-else-if="t.id === 'scheduled'"
              class="h-[110px] rounded-lg bg-slate-950 border border-emerald-500/30 p-2 flex flex-col justify-between relative overflow-hidden"
            >
              <div class="flex items-center justify-between text-[8.5px] font-mono border-b border-slate-800/80 pb-1">
                <span class="flex items-center gap-1 text-emerald-300 font-bold">
                  <span class="i-lucide-repeat w-2.5 h-2.5 text-emerald-400"></span>
                  Cron Execution Cycle
                </span>
                <span class="text-slate-400 font-mono">Every Mon 09:00</span>
              </div>

              <!-- Step Nodes: Trigger -> Digest -> Dispatch -->
              <div class="flex items-center justify-between px-1 my-auto">
                <!-- Step 1: Clock / Timer Trigger -->
                <div class="flex flex-col items-center text-center">
                  <div class="w-6.5 h-6.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-sm">
                    <span class="i-lucide-clock w-3 h-3"></span>
                  </div>
                  <span class="text-[7.5px] font-mono text-emerald-300 mt-1 font-bold">Mon 9 AM</span>
                  <span class="text-[7px] font-mono text-slate-500">Auto Timer</span>
                </div>

                <!-- Connector 1 -->
                <div class="flex-1 mx-1 flex flex-col items-center">
                  <div class="w-full h-0.5 bg-emerald-500/40 relative">
                  </div>
                  <span class="text-[6.5px] font-mono text-slate-400 mt-0.5">Triggers AI</span>
                </div>

                <!-- Step 2: Digest -->
                <div class="flex flex-col items-center text-center">
                  <div class="w-6.5 h-6.5 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-300">
                    <span class="i-lucide-file-text w-3 h-3"></span>
                  </div>
                  <span class="text-[7.5px] font-mono text-slate-300 mt-1 font-bold">Compile</span>
                  <span class="text-[7px] font-mono text-slate-500">Summary</span>
                </div>

                <!-- Connector 2 -->
                <div class="flex-1 mx-1 flex flex-col items-center">
                  <div class="w-full h-0.5 bg-emerald-500/40 relative"></div>
                  <span class="text-[6.5px] font-mono text-slate-400 mt-0.5">Dispatches</span>
                </div>

                <!-- Step 3: Send -->
                <div class="flex flex-col items-center text-center">
                  <div class="w-6.5 h-6.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                    <span class="i-lucide-send w-3 h-3"></span>
                  </div>
                  <span class="text-[7.5px] font-mono text-emerald-300 mt-1 font-bold">Team</span>
                  <span class="text-[7px] font-mono text-slate-500">Delivered</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Tool Output / Impact -->
        <div class="mt-2 pt-1.5 border-t border-slate-800/80 flex items-start gap-1.5 text-[9px] font-mono">
          <span class="i-lucide-check-circle-2 w-3 h-3 text-emerald-400 shrink-0"></span>
          <div class="text-slate-300" v-html="t.output"></div>
        </div>
      </div>
    </div>
  </div>
</template>
