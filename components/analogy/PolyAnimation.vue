<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

const props = withDefaults(defineProps<{
  domain: 'cooking' | 'maps' | 'library'
  isPlaying?: boolean
}>(), {
  isPlaying: true,
})

const activeIndex = ref(0)
let intervalTimer: ReturnType<typeof setInterval> | null = null

// Maps Specific Data
const mapModes = [
  {
    id: 'car',
    title: 'Highway Drive',
    icon: 'i-lucide-car',
    color: '#f472b6',
    textColor: 'text-pink-400',
    borderColor: 'border-pink-500/60',
    bgBadge: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    path: 'M 50,130 C 100,30 200,20 270,20 C 370,20 450,30 510,45',
    implClass: 'class CarRouter implements NavigationRoute',
    telemetry: '32 mins • 18.4 mi • 65 mph • Dynamic Traffic Graph',
  },
  {
    id: 'transit',
    title: 'Subway Transit',
    icon: 'i-lucide-train-front',
    color: '#fbbf24',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/60',
    bgBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    path: 'M 50,130 L 170,110 L 290,85 L 400,65 L 510,45',
    implClass: 'class SubwayRouter implements NavigationRoute',
    telemetry: '24 mins • 4 stops • Fixed Timetable Grid',
  },
  {
    id: 'walk',
    title: 'Pedestrian Walk',
    icon: 'i-lucide-footprints',
    color: '#22d3ee',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/60',
    bgBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    path: 'M 50,130 C 110,165 190,165 260,150 C 340,135 440,105 510,45',
    implClass: 'class WalkRouter implements NavigationRoute',
    telemetry: '1h 10m • 3.2 mi • 0 Emissions • Park Greenways',
  },
]

// General Domain Config for Cooking & Library
const domainConfig = {
  cooking: {
    interfaceName: 'motor.blend()',
    interfaceDesc: 'Universal Drive Shaft Interface',
    items: [
      {
        id: 'smoothie',
        title: 'Smoothie Cup',
        icon: 'i-lucide-glass-water',
        color: 'text-pink-400',
        borderColor: 'border-pink-500/50',
        bgGlow: 'bg-pink-500/10',
        metric: '24,000 RPM Vortex',
        actionLabel: 'Swirling liquid & fruit particles',
      },
      {
        id: 'chopper',
        title: 'Food Processor',
        icon: 'i-lucide-scissors',
        color: 'text-amber-400',
        borderColor: 'border-amber-500/50',
        bgGlow: 'bg-amber-500/10',
        metric: '3,200 RPM Slicing',
        actionLabel: 'Oscillating stainless dual blades',
      },
      {
        id: 'grinder',
        title: 'Spice Grinder',
        icon: 'i-lucide-sparkles',
        color: 'text-cyan-400',
        borderColor: 'border-cyan-500/50',
        bgGlow: 'bg-cyan-500/10',
        metric: '18,500 RPM Impact',
        actionLabel: 'High-speed pulverizing blade',
      },
    ],
  },
  maps: {
    interfaceName: 'router.getRoute(A, B)',
    interfaceDesc: 'Universal Navigation Contract',
    items: mapModes,
  },
  library: {
    interfaceName: 'scanner.checkout(item)',
    interfaceDesc: 'Universal Circulation Interface',
    items: [
      {
        id: 'book',
        title: 'Hardcover Book',
        icon: 'i-lucide-book-open',
        color: 'text-pink-400',
        borderColor: 'border-pink-500/50',
        bgGlow: 'bg-pink-500/10',
        metric: '21-Day Physical Loan',
        actionLabel: 'RFID electromagnetic gate unlock',
      },
      {
        id: 'audiobook',
        title: 'Audiobook CD',
        icon: 'i-lucide-disc',
        color: 'text-amber-400',
        borderColor: 'border-amber-500/50',
        bgGlow: 'bg-amber-500/10',
        metric: '14-Day Physical Loan',
        actionLabel: 'Laser optical scan & case unlock',
      },
      {
        id: 'ebook',
        title: 'Digital E-Reader',
        icon: 'i-lucide-tablet',
        color: 'text-cyan-400',
        borderColor: 'border-cyan-500/50',
        bgGlow: 'bg-cyan-500/10',
        metric: '7-Day Auto Expiry',
        actionLabel: 'Wireless cryptographic DRM push',
      },
    ],
  },
}

const currentMapMode = computed(() => mapModes[activeIndex.value])

function selectItem(idx: number) {
  activeIndex.value = idx
}

function startTimer() {
  if (intervalTimer) clearInterval(intervalTimer)
  intervalTimer = setInterval(() => {
    if (props.isPlaying) {
      activeIndex.value = (activeIndex.value + 1) % 3
    }
  }, 2800)
}

watch(() => props.domain, () => {
  activeIndex.value = 0
})

watch(() => props.isPlaying, (playing) => {
  if (!playing && intervalTimer) {
    clearInterval(intervalTimer)
    intervalTimer = null
  } else if (playing) {
    startTimer()
  }
})

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (intervalTimer) clearInterval(intervalTimer)
})
</script>

<template>
  <div class="h-full flex flex-col justify-between select-none">
    <!-- CASE A: MAPS SPECIFIC INTERACTIVE MAP DRAWING -->
    <div v-if="domain === 'maps'" class="flex flex-col justify-between h-full gap-2">
      <!-- Map Navigation Header & Polymorphic Mode Tabs -->
      <div class="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
        <!-- Caller Contract -->
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono text-slate-400 uppercase font-semibold">Contract:</span>
          <span class="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/50 text-indigo-300 font-mono text-[11px] font-bold">
            router.getRoute(Point_A, Point_B)
          </span>
        </div>

        <!-- Mode Selectors -->
        <div class="flex items-center gap-1.5">
          <button
            v-for="(mode, idx) in mapModes"
            :key="mode.id"
            @click="selectItem(idx)"
            class="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-mono transition-all cursor-pointer border"
            :class="[
              activeIndex === idx
                ? `${mode.bgBadge} font-bold shadow-sm scale-105`
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            ]"
          >
            <span :class="mode.icon" class="w-3.5 h-3.5"></span>
            <span>{{ mode.title }}</span>
          </button>
        </div>
      </div>

      <!-- Main SVG Map Canvas with Multiple Points & Dynamic Path -->
      <div class="relative w-full h-[245px] rounded-xl bg-slate-950 border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center">
        <svg class="w-full h-full" viewBox="0 0 560 200" preserveAspectRatio="none">
          <defs>
            <!-- Water Gradient -->
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0e2338" stop-opacity="0.6" />
              <stop offset="100%" stop-color="#0a1929" stop-opacity="0.8" />
            </linearGradient>

            <!-- Glow Filters for Active Path -->
            <filter id="glowPink" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowAmber" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- 1. City Grid Lines (Map Terrain) -->
          <g stroke="#1e293b" stroke-width="1" stroke-dasharray="3 5">
            <line x1="80" y1="0" x2="80" y2="200" />
            <line x1="160" y1="0" x2="160" y2="200" />
            <line x1="240" y1="0" x2="240" y2="200" />
            <line x1="320" y1="0" x2="320" y2="200" />
            <line x1="400" y1="0" x2="400" y2="200" />
            <line x1="480" y1="0" x2="480" y2="200" />
            <line x1="0" y1="50" x2="560" y2="50" />
            <line x1="0" y1="100" x2="560" y2="100" />
            <line x1="0" y1="150" x2="560" y2="150" />
          </g>

          <!-- 2. Winding City River -->
          <path
            d="M 130,0 Q 210,100 280,115 T 450,200 L 485,200 Q 310,115 240,100 T 160,0 Z"
            fill="url(#waterGrad)"
          />

          <!-- 3. Inactive Path Ghosts (Dotted Background) -->
          <path
            v-for="(m, idx) in mapModes"
            :key="m.id"
            :d="m.path"
            fill="none"
            :stroke="activeIndex === idx ? 'transparent' : '#1e293b'"
            stroke-width="2"
            stroke-dasharray="4 4"
          />

          <!-- 4. Active Chosen Route Path (Prominent Animated Flow) -->
          <path
            :d="currentMapMode.path"
            fill="none"
            :stroke="currentMapMode.color"
            stroke-width="4"
            stroke-dasharray="8 5"
            stroke-linecap="round"
            class="animate-flow"
            :filter="activeIndex === 0 ? 'url(#glowPink)' : activeIndex === 1 ? 'url(#glowAmber)' : 'url(#glowCyan)'"
          />

          <!-- 5. Multiple Location Points / Waypoints -->
          <!-- Point A (Origin - Home) -->
          <g transform="translate(50, 130)">
            <circle r="15" fill="#38bdf8" fill-opacity="0.15" class="animate-ping" />
            <circle r="8" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
            <circle r="3" fill="#ffffff" />
            <text x="0" y="23" fill="#7dd3fc" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">
              Origin (A)
            </text>
          </g>

          <!-- Point B (Destination - Campus/Work) -->
          <g transform="translate(510, 45)">
            <circle r="15" fill="#34d399" fill-opacity="0.15" class="animate-ping" />
            <circle r="8" fill="#059669" stroke="#34d399" stroke-width="2" />
            <circle r="3" fill="#ffffff" />
            <text x="0" y="-12" fill="#6ee7b7" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">
              Destination (B)
            </text>
          </g>

          <!-- Intermediate Landmark 1: Highway Junction (North) -->
          <g transform="translate(270, 20)">
            <circle r="5" fill="#334155" :stroke="activeIndex === 0 ? '#f472b6' : '#475569'" stroke-width="1.5" />
            <text x="0" y="-8" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">
              Junction 10
            </text>
          </g>

          <!-- Intermediate Landmark 2: Metro Transit Hub (Center) -->
          <g transform="translate(290, 85)">
            <circle r="6" fill="#334155" :stroke="activeIndex === 1 ? '#fbbf24' : '#475569'" stroke-width="2" />
            <circle v-if="activeIndex === 1" r="10" fill="#fbbf24" fill-opacity="0.2" class="animate-ping" />
            <text x="0" y="18" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">
              Central Metro
            </text>
          </g>

          <!-- Intermediate Station Alpha -->
          <g transform="translate(170, 110)">
            <circle r="4" fill="#334155" :stroke="activeIndex === 1 ? '#fbbf24' : '#475569'" stroke-width="1.5" />
          </g>

          <!-- Intermediate Station Beta -->
          <g transform="translate(400, 65)">
            <circle r="4" fill="#334155" :stroke="activeIndex === 1 ? '#fbbf24' : '#475569'" stroke-width="1.5" />
          </g>

          <!-- Intermediate Landmark 3: Park Trail Greenway (South) -->
          <g transform="translate(260, 150)">
            <circle r="5" fill="#334155" :stroke="activeIndex === 2 ? '#22d3ee' : '#475569'" stroke-width="1.5" />
            <text x="0" y="16" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">
              Greenway Park
            </text>
          </g>

          <!-- 6. Moving Vehicle Marker Gliding Along the Active Path -->
          <g :key="currentMapMode.path">
            <animateMotion
              :path="currentMapMode.path"
              dur="3.2s"
              repeatCount="indefinite"
              rotate="auto"
            />
            <!-- Vehicle Halo & Indicator -->
            <circle r="12" :fill="currentMapMode.color" fill-opacity="0.3" />
            <circle r="6.5" :fill="currentMapMode.color" stroke="#ffffff" stroke-width="1.5" />
          </g>
        </svg>

        <!-- Dynamic Overlay Badge with Execution Details -->
        <div class="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] font-mono flex items-center gap-2 backdrop-blur-sm">
          <span :class="[currentMapMode.icon, currentMapMode.textColor]" class="w-3.5 h-3.5"></span>
          <span class="text-white font-bold">{{ currentMapMode.implClass }}</span>
          <span class="text-slate-500">|</span>
          <span class="text-slate-300">{{ currentMapMode.telemetry }}</span>
        </div>
      </div>
    </div>

    <!-- CASE B: COOKING & LIBRARY INTERACTION STAGES -->
    <div v-else class="grid grid-cols-12 gap-3 items-center flex-1 h-full py-1">
      <!-- Left: Central Motor / Interface Hub -->
      <div class="col-span-4 p-4 rounded-xl bg-slate-950 border border-indigo-500/40 flex flex-col items-center justify-center text-center relative overflow-hidden h-[285px] shadow-lg">
        <div class="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>

        <div class="relative w-24 h-24 flex items-center justify-center mb-3">
          <svg class="absolute inset-0 w-full h-full text-indigo-500/40 animate-spin" style="animation-duration: 9s;" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="8 6" />
            <polygon points="50,15 85,32 85,68 50,85 15,68 15,32" fill="none" stroke="currentColor" stroke-width="2" />
          </svg>

          <div class="w-14 h-14 rounded-full bg-indigo-950/80 border-2 border-indigo-400 flex items-center justify-center text-indigo-300 shadow-md shadow-indigo-500/30">
            <span class="i-lucide-cpu w-7 h-7 animate-pulse"></span>
          </div>
        </div>

        <div class="text-xs font-mono text-indigo-300 font-bold tracking-tight">
          {{ domainConfig[domain].interfaceName }}
        </div>
        <div class="text-[10px] font-mono text-slate-400 mt-1">
          {{ domainConfig[domain].interfaceDesc }}
        </div>

        <div class="mt-3 px-2.5 py-0.5 rounded bg-indigo-900/40 border border-indigo-500/40 text-[9.5px] font-mono text-indigo-200 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
          <span>Dispatching Call</span>
        </div>
      </div>

      <!-- Center: Dynamic Dispatch Conduits (SVG Flow Lines) -->
      <div class="col-span-2 flex items-center justify-center h-[285px] relative">
        <svg class="w-full h-full" viewBox="0 0 100 200" preserveAspectRatio="none">
          <path
            d="M 0,100 C 50,100 50,35 100,35"
            fill="none"
            :stroke="activeIndex === 0 ? '#f472b6' : '#334155'"
            :stroke-width="activeIndex === 0 ? 3 : 1.5"
            :stroke-dasharray="activeIndex === 0 ? '6 4' : 'none'"
            class="transition-all duration-300"
            :class="{ 'animate-flow': activeIndex === 0 }"
          />
          <path
            d="M 0,100 C 50,100 50,100 100,100"
            fill="none"
            :stroke="activeIndex === 1 ? '#fbbf24' : '#334155'"
            :stroke-width="activeIndex === 1 ? 3 : 1.5"
            :stroke-dasharray="activeIndex === 1 ? '6 4' : 'none'"
            class="transition-all duration-300"
            :class="{ 'animate-flow': activeIndex === 1 }"
          />
          <path
            d="M 0,100 C 50,100 50,165 100,165"
            fill="none"
            :stroke="activeIndex === 2 ? '#22d3ee' : '#334155'"
            :stroke-width="activeIndex === 2 ? 3 : 1.5"
            :stroke-dasharray="activeIndex === 2 ? '6 4' : 'none'"
            class="transition-all duration-300"
            :class="{ 'animate-flow': activeIndex === 2 }"
          />
        </svg>
      </div>

      <!-- Right: 3 Concrete Implementations -->
      <div class="col-span-6 flex flex-col justify-between h-[285px] gap-2">
        <div
          v-for="(item, idx) in domainConfig[domain].items"
          :key="item.id"
          @click="selectItem(idx)"
          class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between relative overflow-hidden flex-1"
          :class="[
            activeIndex === idx
              ? `${item.borderColor} ${item.bgGlow} shadow-lg shadow-slate-950/50 scale-[1.02]`
              : 'border-slate-800 bg-slate-950/60 opacity-60 hover:opacity-100 hover:border-slate-700'
          ]"
        >
          <div class="flex items-center gap-2.5">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
              :class="[
                activeIndex === idx
                  ? `${item.borderColor} bg-slate-900 shadow-md`
                  : 'border-slate-800 bg-slate-900/50'
              ]"
            >
              <span
                :class="[item.icon, item.color]"
                class="w-5 h-5 transition-transform duration-300"
                style="display: inline-block;"
                :style="activeIndex === idx ? 'animation: pulseScale 1.2s infinite ease-in-out;' : ''"
              ></span>
            </div>

            <div>
              <div class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{{ item.title }}</span>
                <span v-if="activeIndex === idx" class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <div class="text-[10px] font-mono text-slate-300 truncate max-w-[210px] mt-0.5">
                {{ item.actionLabel }}
              </div>
            </div>
          </div>

          <div
            class="px-2.5 py-1 rounded text-[10px] font-mono font-bold shrink-0 border"
            :class="[
              activeIndex === idx
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            ]"
          >
            {{ item.metric }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulseScale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15) rotate(5deg); }
}

@keyframes flowDash {
  to {
    stroke-dashoffset: -20;
  }
}

.animate-flow {
  animation: flowDash 0.8s linear infinite;
}
</style>
