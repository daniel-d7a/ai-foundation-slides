<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import RobotArmPod, { type RobotArm } from './RobotArmPod.vue'

const arms: RobotArm[] = [
  {
    id: 'search',
    armNumber: 'ARM 01',
    title: 'Web Search Engine',
    effectorName: 'Perception Scanner',
    theme: 'indigo',
    icon: 'i-lucide-globe',
    status: 'ONLINE',
    tools: [
      { icon: 'i-lucide-globe', text: 'Retrieves live API documentation' },
      { icon: 'i-lucide-calendar', text: 'Validates recent regulatory changes' },
      { icon: 'i-lucide-link-2', text: 'Emits direct URL citations' },
    ],
  },
  {
    id: 'code',
    armNumber: 'ARM 02',
    title: 'Code Interpreter',
    effectorName: 'Compute Manipulator',
    theme: 'emerald',
    icon: 'i-lucide-calculator',
    status: 'ONLINE',
    tools: [
      { icon: 'i-lucide-calculator', text: 'Exact math calculation without hallucination' },
      { icon: 'i-lucide-table', text: 'In-memory Pandas dataframe operations' },
      { icon: 'i-lucide-chart-bar', text: 'Renders Matplotlib & Seaborn charts' },
    ],
  },
  {
    id: 'diagram',
    armNumber: 'ARM 03',
    title: 'Visual Diagramming',
    effectorName: 'Schematic Stylus',
    theme: 'cyan',
    icon: 'i-lucide-workflow',
    status: 'ONLINE',
    tools: [
      { icon: 'i-lucide-git-commit-horizontal', text: 'Sequence & distributed system traces' },
      { icon: 'i-lucide-database', text: 'Database ERD entity modeling' },
      { icon: 'i-lucide-workflow', text: 'State transition diagrams' },
    ],
  },
  {
    id: 'function',
    armNumber: 'ARM 04',
    title: 'Function Calling',
    effectorName: 'Execution Actuator',
    theme: 'amber',
    icon: 'i-lucide-cpu',
    status: 'ONLINE',
    tools: [
      { icon: 'i-lucide-database', text: 'Executes SQL database transactions' },
      { icon: 'i-lucide-send', text: 'Dispatches webhook payloads to n8n' },
      { icon: 'i-lucide-key', text: 'Authenticates third-party API mutations' },
    ],
  },
]

const activeArmId = ref<string>('search')
const isAutoCycling = ref<boolean>(true)

const currentArm = computed(() => arms.find(a => a.id === activeArmId.value) || arms[0])

const activeSimulations: Record<string, string> = {
  search: "Invoking web_search: 'https://docs.anthropic.com/en/api'...",
  code: 'Invoking sandbox_py: df.groupby(\'cohort\').mean()...',
  diagram: 'Invoking diagram_render: sequenceDiagram auth_flow...',
  function: "Invoking post_webhook: { event: 'db.commit', payload: {...} }...",
}

function selectArm(id: string) {
  activeArmId.value = id
  isAutoCycling.value = false
}

let timer: ReturnType<typeof setInterval> | null = null

function toggleCycle() {
  isAutoCycling.value = !isAutoCycling.value
}

onMounted(() => {
  timer = setInterval(() => {
    if (!isAutoCycling.value) return
    const currentIndex = arms.findIndex(a => a.id === activeArmId.value)
    const nextIndex = (currentIndex + 1) % arms.length
    activeArmId.value = arms[nextIndex].id
  }, 3200)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="relative w-full max-w-5xl mx-auto mt-2 h-[385px] select-none">
    <!-- SVG Mechanical Articulated Arms Overlay (connecting center chassis to the 4 arm pods) -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 400" preserveAspectRatio="none">
      <defs>
        <!-- Gradients for cybernetic energy cables -->
        <linearGradient id="cable-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#a5b4fc" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="cable-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#6ee7b7" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="cable-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#67e8f9" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="cable-amber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#fde68a" stop-opacity="1" />
        </linearGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- ARM 01 (Upper Left: Search) -->
      <g :opacity="activeArmId === 'search' ? 1 : 0.4" class="transition-opacity duration-300">
        <!-- Structural Titanium Arm Boom -->
        <path d="M 430 160 L 370 120 L 315 90" fill="none" stroke="#1e293b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 430 160 L 370 120 L 315 90" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Hydraulic cylinder linkage -->
        <line x1="420" y1="170" x2="365" y2="135" stroke="#64748b" stroke-width="2.5" />
        <!-- Glowing Energy Conduit -->
        <path
          d="M 430 160 L 370 120 L 315 90"
          fill="none"
          stroke="url(#cable-indigo)"
          stroke-width="2"
          stroke-dasharray="6 4"
          filter="url(#glow)"
          class="transition-all"
        />
        <!-- Shoulder Servo Joint -->
        <circle cx="430" cy="160" r="7" fill="#0f172a" stroke="#818cf8" stroke-width="2" />
        <circle cx="430" cy="160" r="2.5" fill="#c7d2fe" />
        <!-- Elbow Joint -->
        <circle cx="370" cy="120" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2" />
        <circle cx="370" cy="120" r="2" fill="#818cf8" />
        <!-- Wrist / Gripper Base -->
        <circle cx="315" cy="90" r="5" fill="#818cf8" />
      </g>

      <!-- ARM 02 (Upper Right: Code) -->
      <g :opacity="activeArmId === 'code' ? 1 : 0.4" class="transition-opacity duration-300">
        <!-- Structural Titanium Arm Boom -->
        <path d="M 570 160 L 630 120 L 685 90" fill="none" stroke="#1e293b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 570 160 L 630 120 L 685 90" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Hydraulic cylinder linkage -->
        <line x1="580" y1="170" x2="635" y2="135" stroke="#64748b" stroke-width="2.5" />
        <!-- Glowing Energy Conduit -->
        <path
          d="M 570 160 L 630 120 L 685 90"
          fill="none"
          stroke="url(#cable-emerald)"
          stroke-width="2"
          stroke-dasharray="6 4"
          filter="url(#glow)"
          class="transition-all"
        />
        <!-- Shoulder Servo Joint -->
        <circle cx="570" cy="160" r="7" fill="#0f172a" stroke="#34d399" stroke-width="2" />
        <circle cx="570" cy="160" r="2.5" fill="#a7f3d0" />
        <!-- Elbow Joint -->
        <circle cx="630" cy="120" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2" />
        <circle cx="630" cy="120" r="2" fill="#34d399" />
        <!-- Wrist / Gripper Base -->
        <circle cx="685" cy="90" r="5" fill="#34d399" />
      </g>

      <!-- ARM 03 (Lower Left: Diagram) -->
      <g :opacity="activeArmId === 'diagram' ? 1 : 0.4" class="transition-opacity duration-300">
        <!-- Structural Titanium Arm Boom -->
        <path d="M 430 240 L 370 280 L 315 310" fill="none" stroke="#1e293b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 430 240 L 370 280 L 315 310" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Hydraulic cylinder linkage -->
        <line x1="420" y1="230" x2="365" y2="265" stroke="#64748b" stroke-width="2.5" />
        <!-- Glowing Energy Conduit -->
        <path
          d="M 430 240 L 370 280 L 315 310"
          fill="none"
          stroke="url(#cable-cyan)"
          stroke-width="2"
          stroke-dasharray="6 4"
          filter="url(#glow)"
          class="transition-all"
        />
        <!-- Shoulder Servo Joint -->
        <circle cx="430" cy="240" r="7" fill="#0f172a" stroke="#22d3ee" stroke-width="2" />
        <circle cx="430" cy="240" r="2.5" fill="#a5f3fc" />
        <!-- Elbow Joint -->
        <circle cx="370" cy="280" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2" />
        <circle cx="370" cy="280" r="2" fill="#22d3ee" />
        <!-- Wrist / Gripper Base -->
        <circle cx="315" cy="310" r="5" fill="#22d3ee" />
      </g>

      <!-- ARM 04 (Lower Right: Function) -->
      <g :opacity="activeArmId === 'function' ? 1 : 0.4" class="transition-opacity duration-300">
        <!-- Structural Titanium Arm Boom -->
        <path d="M 570 240 L 630 280 L 685 310" fill="none" stroke="#1e293b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 570 240 L 630 280 L 685 310" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Hydraulic cylinder linkage -->
        <line x1="580" y1="230" x2="635" y2="265" stroke="#64748b" stroke-width="2.5" />
        <!-- Glowing Energy Conduit -->
        <path
          d="M 570 240 L 630 280 L 685 310"
          fill="none"
          stroke="url(#cable-amber)"
          stroke-width="2"
          stroke-dasharray="6 4"
          filter="url(#glow)"
          class="transition-all"
        />
        <!-- Shoulder Servo Joint -->
        <circle cx="570" cy="240" r="7" fill="#0f172a" stroke="#fbbf24" stroke-width="2" />
        <circle cx="570" cy="240" r="2.5" fill="#fde68a" />
        <!-- Elbow Joint -->
        <circle cx="630" cy="280" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2" />
        <circle cx="630" cy="280" r="2" fill="#fbbf24" />
        <!-- Wrist / Gripper Base -->
        <circle cx="685" cy="310" r="5" fill="#fbbf24" />
      </g>
    </svg>

    <!-- Main 3-Column Layout: Left Arms | Robot Torso / Brain | Right Arms -->
    <div class="relative z-20 grid grid-cols-12 gap-3 h-full items-center">
      <!-- Left Column: Arm 01 & Arm 03 -->
      <div class="col-span-4 flex flex-col justify-between h-full py-1">
        <!-- Arm 1: Web Search Engine -->
        <RobotArmPod
          :arm="arms[0]"
          :active="activeArmId === 'search'"
          :is-left="true"
          @select="selectArm"
        />

        <!-- Arm 3: Visual Diagramming -->
        <RobotArmPod
          :arm="arms[2]"
          :active="activeArmId === 'diagram'"
          :is-left="true"
          @select="selectArm"
        />
      </div>

      <!-- Center Column: Agent Body & Reasoning Core -->
      <div class="col-span-4 flex flex-col items-center justify-center px-1">
        <!-- Central Robot Torso / Processor Chassis -->
        <div class="w-full bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl p-3 shadow-2xl relative flex flex-col items-center text-center">
          <!-- Torso Status Top Bar -->
          <div class="w-full flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2 px-1">
            <span class="text-[9px] font-mono font-bold text-slate-400 tracking-wider">
              AGENT CHASSIS // v4.2
            </span>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-[9px] font-mono text-emerald-400 uppercase font-semibold">Active</span>
            </div>
          </div>

          <!-- Pulsing Core / Neural Reactor -->
          <div class="relative my-1">
            <div class="w-16 h-16 rounded-full bg-slate-950 border-2 border-indigo-500/60 flex items-center justify-center shadow-lg relative overflow-hidden group">
              <!-- Radial pulse -->
              <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-cyan-500/10 to-transparent animate-spin-slow"></div>
              <!-- Inner Core Indicator -->
              <span class="i-lucide-bot w-8 h-8 text-indigo-300 relative z-10 transition-transform group-hover:scale-110"></span>
            </div>
            <!-- Concentric rings -->
            <div class="absolute -inset-2 rounded-full border border-indigo-500/30 animate-ping opacity-25 pointer-events-none"></div>
          </div>

          <!-- Central Core Label -->
          <h4 class="text-sm font-bold text-white font-serif tracking-tight mt-1">
            Agent Reasoning Core
          </h4>
          <p class="text-[10px] text-slate-400 font-mono mt-0.5 leading-tight">
            Autonomous Multi-Arm Tool Dispatcher
          </p>

          <!-- Live Tool Simulation Feed -->
          <div class="w-full mt-2.5 p-2 rounded-lg bg-slate-950/90 border border-slate-800 text-left font-mono">
            <div class="flex items-center justify-between text-[9px] text-slate-400 border-b border-slate-800/80 pb-1 mb-1">
              <span class="flex items-center gap-1">
                <span class="i-lucide-activity w-3 h-3 text-cyan-400"></span>
                <span class="text-slate-300 uppercase font-bold">{{ currentArm.armNumber }} ARMED</span>
              </span>
              <span class="text-[8px] text-slate-500">BUS // 0x4F</span>
            </div>
            <p class="text-[10px] text-cyan-300 truncate font-mono">
              {{ activeSimulations[activeArmId] }}
            </p>
          </div>

          <!-- Action Toggle -->
          <div class="mt-2.5 w-full flex items-center justify-between gap-1 text-[9px] font-mono">
            <button
              @click="toggleCycle"
              class="flex-1 py-1 px-2 rounded border transition-all text-center cursor-pointer"
              :class="isAutoCycling ? 'bg-indigo-600/30 border-indigo-500/60 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'"
            >
              {{ isAutoCycling ? '⚡ Auto-Cycling Arms' : '⏸ Click Arm to Inspect' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column: Arm 02 & Arm 04 -->
      <div class="col-span-4 flex flex-col justify-between h-full py-1">
        <!-- Arm 2: Code Interpreter -->
        <RobotArmPod
          :arm="arms[1]"
          :active="activeArmId === 'code'"
          :is-left="false"
          @select="selectArm"
        />

        <!-- Arm 4: Function Calling -->
        <RobotArmPod
          :arm="arms[3]"
          :active="activeArmId === 'function'"
          :is-left="false"
          @select="selectArm"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
</style>
