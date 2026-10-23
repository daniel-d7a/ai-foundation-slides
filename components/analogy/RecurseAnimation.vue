<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    domain: "cooking" | "maps" | "library";
    isPlaying?: boolean;
  }>(),
  {
    isPlaying: true,
  },
);

const depth = ref(1);
const isUnwinding = ref(false);
const isStopped = ref(false);
let autoStepTimer: ReturnType<typeof setTimeout> | null = null;

const maxDepth = 4;

const sliderLabels = {
  maps: [
    "1: Globe (World)",
    "2: Country (Region)",
    "3: City (Street Grid)",
    "4: Building (Base Case)",
  ],
  cooking: [
    "1: Whole Block (1.0)",
    "2: First Cut (1/2)",
    "3: Second Cut (1/4)",
    "4: Target 1/8th (Base Case)",
  ],
  library: [
    "1: Multiple Sections (Hall)",
    "2: Multiple Shelves (Sec 500)",
    "3: Multiple Books (Shelf 530)",
    "4: Single Book (Base Case)",
  ],
};

const mapStageTitles = [
  {
    level: 1,
    name: "Planet Globe",
    scale: "12,742 km",
    fn: 'zoom(planet=Earth, target="Building 42")',
  },
  {
    level: 2,
    name: "National Country",
    scale: "1,500 km",
    fn: 'zoom(country="State", target="Building 42")',
  },
  {
    level: 3,
    name: "Metropolitan City",
    scale: "10 km",
    fn: 'zoom(city="Downtown", target="Building 42")',
  },
  {
    level: 4,
    name: "Specific Building",
    scale: "25 m",
    fn: 'zoom(building="No. 42") -> BASE CASE HIT!',
  },
];

const cookingStageTitles = [
  {
    level: 1,
    name: "Whole Kitchen Block",
    scale: "1.0 (Whole)",
    fn: "cut(size=1.0, target=0.125) -> calls cut(0.5)",
  },
  {
    level: 2,
    name: "First Halving Cut",
    scale: "1/2 Original",
    fn: "cut(size=0.5, target=0.125) -> calls cut(0.25)",
  },
  {
    level: 3,
    name: "Second Halving Cut",
    scale: "1/4 Original",
    fn: "cut(size=0.25, target=0.125) -> calls cut(0.125)",
  },
  {
    level: 4,
    name: "Target 1/8th Dice",
    scale: "1/8th (Base Case)",
    fn: "cut(size=0.125) -> SIZE <= 1/8! STOP CUTTING.",
  },
];

const libraryStageTitles = [
  {
    level: 1,
    name: "Multiple Sections (Hallway)",
    scale: "Hall Scale",
    fn: 'search(sections=["100", "300", "500", "800"], target="B42") -> enter Section 500',
  },
  {
    level: 2,
    name: "Multiple Shelves (Section 500)",
    scale: "Section Scale",
    fn: 'search(shelves=["510", "520", "530", "540"], target="B42") -> enter Shelf 530',
  },
  {
    level: 3,
    name: "Multiple Books (Shelf 530)",
    scale: "Shelf Scale",
    fn: 'search(books=["B10", "B25", "B42", "B99"], target="B42") -> pick Book B42',
  },
  {
    level: 4,
    name: "Single Book (Base Case)",
    scale: "Book Scale",
    fn: 'search(book="B42") -> BASE CASE REACHED! BOOK IN HAND.',
  },
];

const currentStageTitle = computed(() => {
  if (props.domain === "maps") return mapStageTitles[depth.value - 1];
  if (props.domain === "cooking") return cookingStageTitles[depth.value - 1];
  return libraryStageTitles[depth.value - 1];
});

const stackFrames = computed(() => {
  if (props.domain === "maps") {
    return [
      {
        id: 1,
        fn: "zoom(Globe)",
        state: "Waiting for Country sub-call...",
        isBase: false,
      },
      {
        id: 2,
        fn: "zoom(Country)",
        state: "Waiting for City sub-call...",
        isBase: false,
      },
      {
        id: 3,
        fn: "zoom(City)",
        state: "Waiting for Building sub-call...",
        isBase: false,
      },
      {
        id: 4,
        fn: "zoom(Building)",
        state: "TARGET LOCATED! Stop recursion.",
        isBase: true,
      },
    ].slice(0, depth.value);
  } else if (props.domain === "cooking") {
    return [
      {
        id: 1,
        fn: "cut(Block = 1.0)",
        state: "Waiting for 1/2 sub-cut...",
        isBase: false,
      },
      {
        id: 2,
        fn: "cut(Piece = 1/2)",
        state: "Waiting for 1/4 sub-cut...",
        isBase: false,
      },
      {
        id: 3,
        fn: "cut(Piece = 1/4)",
        state: "Waiting for 1/8 sub-cut...",
        isBase: false,
      },
      {
        id: 4,
        fn: "cut(Piece = 1/8)",
        state: "SIZE == 1/8th! Stop cutting.",
        isBase: true,
      },
    ].slice(0, depth.value);
  } else {
    return [
      {
        id: 1,
        fn: 'search(Library Hall)',
        state: 'Narrows to Section 500 (Sciences)',
        isBase: false,
      },
      {
        id: 2,
        fn: 'search(Section 500)',
        state: 'Narrows to Shelf 530 (Physics)',
        isBase: false,
      },
      {
        id: 3,
        fn: 'search(Shelf 530)',
        state: 'Narrows to Book #42',
        isBase: false,
      },
      {
        id: 4,
        fn: 'search(Book #42)',
        state: 'Single book in hand! BASE CASE STOP.',
        isBase: true,
      },
    ].slice(0, depth.value);
  }
});

const librarySections = [
  { id: "100", name: "Philosophy", desc: "100s", x: 20, y: 18, isTarget: false },
  { id: "300", name: "Social Sci", desc: "300s", x: 155, y: 18, isTarget: false },
  { id: "500", name: "Pure Sciences", desc: "TARGET", x: 20, y: 64, isTarget: true },
  { id: "800", name: "Literature", desc: "800s", x: 155, y: 64, isTarget: false },
];

const sectionShelves = [
  { id: "510", name: "Mathematics", y: 15, isTarget: false },
  { id: "520", name: "Astronomy", y: 40, isTarget: false },
  { id: "530", name: "Physics", y: 65, isTarget: true },
  { id: "540", name: "Chemistry", y: 90, isTarget: false },
];

const shelfBooks = [
  { id: "B10", title: "Mechanics", color: "#475569", isTarget: false },
  { id: "B25", title: "Optics", color: "#0284c7", isTarget: false },
  { id: "B42", title: "Quantum", color: "#059669", isTarget: true },
  { id: "B60", title: "Thermal", color: "#d97706", isTarget: false },
  { id: "B99", title: "Nuclear", color: "#7c3aed", isTarget: false },
];

function scheduleNextStep() {
  if (autoStepTimer) clearTimeout(autoStepTimer);
  if (!props.isPlaying || isStopped.value) return;

  autoStepTimer = setTimeout(() => {
    if (depth.value < maxDepth) {
      depth.value++;
      scheduleNextStep();
    } else {
      isStopped.value = true;
    }
  }, 1900);
}

function handleSliderInput(e: Event) {
  const val = Number((e.target as HTMLInputElement).value);
  depth.value = val;
  if (val === maxDepth) {
    isStopped.value = true;
  } else {
    isStopped.value = false;
  }
}

function restartZoom() {
  if (autoStepTimer) clearTimeout(autoStepTimer);
  isStopped.value = false;
  isUnwinding.value = false;
  depth.value = 1;
  scheduleNextStep();
}

function unwindStack() {
  isUnwinding.value = true;
  if (autoStepTimer) clearTimeout(autoStepTimer);
  setTimeout(() => {
    depth.value = 1;
    isUnwinding.value = false;
    isStopped.value = false;
    scheduleNextStep();
  }, 1000);
}

watch(
  () => props.domain,
  () => {
    restartZoom();
  },
);

watch(
  () => props.isPlaying,
  (playing) => {
    if (playing && !isStopped.value) {
      scheduleNextStep();
    } else if (!playing && autoStepTimer) {
      clearTimeout(autoStepTimer);
    }
  },
);

onMounted(() => {
  scheduleNextStep();
});

onUnmounted(() => {
  if (autoStepTimer) clearTimeout(autoStepTimer);
});
</script>

<template>
  <div class="h-full flex flex-col justify-between select-none gap-2">
    <!-- Top Interactive Zoom / Cut Slider Bar -->
    <div
      class="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm"
    >
      <div class="flex items-center gap-2 text-xs font-mono">
        <span
          :class="
            domain === 'cooking'
              ? 'i-lucide-scissors text-amber-400'
              : 'i-lucide-zoom-in text-cyan-400'
          "
          class="w-4 h-4 shrink-0"
        ></span>
        <span class="text-slate-400 font-semibold uppercase text-[11px]">
          {{
            domain === "cooking"
              ? "Subdivision Cut Slider:"
              : "Recursion Depth Slider:"
          }}
        </span>
      </div>

      <!-- Center Slider -->
      <div class="flex items-center gap-3 flex-1 max-w-[340px] mx-3">
        <input
          type="range"
          min="1"
          max="4"
          :value="depth"
          @input="handleSliderInput"
          class="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-950 rounded-lg border border-slate-700"
          :class="{ 'accent-amber-400': domain === 'cooking' }"
        />
        <div class="flex items-center gap-1 shrink-0">
          <span
            v-for="i in 4"
            :key="i"
            @click="
              depth = i;
              isStopped = i === 4;
            "
            class="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono cursor-pointer transition-all border"
            :class="[
              depth === i
                ? domain === 'cooking'
                  ? 'bg-amber-500 border-amber-300 text-slate-950 font-bold shadow-sm'
                  : 'bg-cyan-500 border-cyan-300 text-slate-950 font-bold shadow-sm'
                : depth > i
                  ? 'bg-slate-800 border-slate-700 text-slate-300'
                  : 'bg-slate-950 border-slate-800 text-slate-600',
            ]"
          >
            {{ i }}
          </span>
        </div>
      </div>

      <!-- Right Indicator / Max Stop Status -->
      <div class="flex items-center gap-2">
        <button
          @click="restartZoom"
          class="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all cursor-pointer flex items-center justify-center shadow-sm"
          title="Restart Simulation"
        >
          <svg class="w-3.5 h-3.5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Main Visual Stage: Progressive Visual Chamber + Call Stack -->
    <div class="grid grid-cols-12 gap-3 items-center flex-1 h-[275px]">
      <!-- LEFT (7 cols): The Visual Chamber -->
      <div
        class="col-span-7 rounded-xl bg-slate-950 border border-slate-800/90 h-full flex flex-col justify-between p-2.5 relative overflow-hidden shadow-inner"
      >
        <!-- Stage Title Header -->
        <div class="flex items-center justify-between z-10 px-1">
          <div class="flex items-center gap-2">
            <span
              class="text-xs font-mono font-bold text-white flex items-center gap-1.5"
            >
              <span
                class="w-2 h-2 rounded-full"
                :class="
                  depth === 4
                    ? 'bg-emerald-400 animate-ping'
                    : domain === 'cooking'
                      ? 'bg-amber-400'
                      : 'bg-cyan-400'
                "
              ></span>
              <span>{{ currentStageTitle.name }}</span>
            </span>
            <!-- <span class="text-[10px] font-mono text-slate-400">Scale: {{ currentStageTitle.scale }}</span> -->
          </div>

          <span
            class="text-[9.5px] font-mono px-2 py-0.5 rounded border"
            :class="
              depth === 4
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            "
          >
            Stack Depth: #{{ depth }}
          </span>
        </div>

        <!-- 1. MAP ZOOM SPECIFIC RENDERING -->
        <div
          v-if="domain === 'maps'"
          class="relative flex-1 flex items-center justify-center my-1 overflow-hidden"
        >
          <!-- STAGE 1: Globe / Planet Earth -->
          <div
            v-if="depth === 1"
            class="relative w-44 h-44 flex items-center justify-center animate-fade-scale"
          >
            <svg class="w-full h-full" viewBox="0 0 160 160">
              <defs>
                <radialGradient id="globeGrad" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stop-color="#0284c7" />
                  <stop offset="60%" stop-color="#0369a1" />
                  <stop offset="100%" stop-color="#082f49" />
                </radialGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r="66"
                fill="#38bdf8"
                fill-opacity="0.1"
                class="animate-pulse"
              />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="url(#globeGrad)"
                stroke="#38bdf8"
                stroke-width="2"
              />
              <ellipse
                cx="80"
                cy="80"
                rx="60"
                ry="24"
                fill="none"
                stroke="#7dd3fc"
                stroke-width="1"
                stroke-dasharray="3 3"
                opacity="0.6"
              />
              <ellipse
                cx="80"
                cy="80"
                rx="30"
                ry="60"
                fill="none"
                stroke="#7dd3fc"
                stroke-width="1"
                stroke-dasharray="3 3"
                opacity="0.6"
              />
              <line
                x1="20"
                y1="80"
                x2="140"
                y2="80"
                stroke="#7dd3fc"
                stroke-width="1.5"
                opacity="0.7"
              />
              <path
                d="M 50,45 Q 65,35 85,42 Q 100,55 95,70 Q 80,85 65,75 Q 45,65 50,45 Z"
                fill="#10b981"
                fill-opacity="0.85"
                stroke="#34d399"
                stroke-width="1"
              />
              <path
                d="M 68,90 Q 80,85 88,95 Q 92,120 78,130 Q 65,120 68,90 Z"
                fill="#10b981"
                fill-opacity="0.8"
                stroke="#34d399"
                stroke-width="1"
              />
              <path
                d="M 105,40 Q 125,40 135,55 Q 120,70 110,60 Z"
                fill="#10b981"
                fill-opacity="0.75"
              />
              <g transform="translate(75, 55)">
                <circle
                  r="9"
                  fill="none"
                  stroke="#f43f5e"
                  stroke-width="1.5"
                  class="animate-ping"
                />
                <circle r="4" fill="#f43f5e" />
                <line
                  x1="-12"
                  y1="0"
                  x2="12"
                  y2="0"
                  stroke="#f43f5e"
                  stroke-width="1"
                />
                <line
                  x1="0"
                  y1="-12"
                  x2="0"
                  y2="12"
                  stroke="#f43f5e"
                  stroke-width="1"
                />
              </g>
            </svg>
            <div
              class="absolute bottom-0 text-[10px] font-mono text-cyan-300 font-bold bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/40"
            >
              Globe Level &rarr; Recursing into Continent
            </div>
          </div>

          <!-- STAGE 2: Country / Regional Landmass -->
          <div
            v-else-if="depth === 2"
            class="relative w-full h-full flex flex-col items-center justify-center animate-fade-scale"
          >
            <svg class="w-full h-36" viewBox="0 0 280 140">
              <path
                d="M 30,40 Q 70,20 140,25 Q 220,15 250,50 Q 260,95 230,120 Q 150,135 90,115 Q 20,110 30,40 Z"
                fill="#0f172a"
                stroke="#0284c7"
                stroke-width="2.5"
              />
              <path
                d="M 140,25 L 140,125"
                stroke="#334155"
                stroke-width="1.5"
                stroke-dasharray="4 3"
              />
              <path
                d="M 30,80 L 245,80"
                stroke="#334155"
                stroke-width="1.5"
                stroke-dasharray="4 3"
              />
              <path
                d="M 55,60 Q 130,50 210,65"
                fill="none"
                stroke="#fbbf24"
                stroke-width="2"
                stroke-dasharray="6 3"
              />
              <path
                d="M 130,30 Q 145,80 155,120"
                fill="none"
                stroke="#fbbf24"
                stroke-width="2"
                stroke-dasharray="6 3"
              />
              <circle cx="55" cy="60" r="3" fill="#94a3b8" />
              <circle cx="210" cy="65" r="3" fill="#94a3b8" />
              <circle cx="155" cy="120" r="3" fill="#94a3b8" />
              <g transform="translate(138, 75)">
                <circle
                  r="14"
                  fill="#f43f5e"
                  fill-opacity="0.2"
                  class="animate-ping"
                />
                <circle
                  r="6"
                  fill="#f43f5e"
                  stroke="#ffffff"
                  stroke-width="1.5"
                />
                <text
                  x="0"
                  y="-10"
                  fill="#fecdd3"
                  font-size="8.5"
                  font-family="monospace"
                  text-anchor="middle"
                  font-weight="bold"
                >
                  Metro Hub
                </text>
              </g>
            </svg>
            <div
              class="text-[10px] font-mono text-cyan-300 font-bold bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/40 mt-1"
            >
              Country Level &rarr; Recursing into Metro Grid
            </div>
          </div>

          <!-- STAGE 3: Metropolitan City Grid -->
          <div
            v-else-if="depth === 3"
            class="relative w-full h-full flex flex-col items-center justify-center animate-fade-scale"
          >
            <svg class="w-full h-36" viewBox="0 0 280 140">
              <path
                d="M 0,35 Q 80,50 140,85 T 280,110 L 280,140 L 0,140 Z"
                fill="#0c4a6e"
                fill-opacity="0.4"
              />
              <g stroke="#334155" stroke-width="2">
                <line x1="20" y1="20" x2="260" y2="20" />
                <line x1="20" y1="55" x2="260" y2="55" />
                <line x1="20" y1="90" x2="260" y2="90" />
                <line x1="20" y1="125" x2="260" y2="125" />
                <line x1="50" y1="10" x2="50" y2="135" />
                <line x1="100" y1="10" x2="100" y2="135" />
                <line x1="150" y1="10" x2="150" y2="135" />
                <line x1="200" y1="10" x2="200" y2="135" />
                <line x1="250" y1="10" x2="250" y2="135" />
              </g>
              <rect
                x="58"
                y="27"
                width="34"
                height="20"
                rx="3"
                fill="#1e293b"
              />
              <rect
                x="108"
                y="27"
                width="34"
                height="20"
                rx="3"
                fill="#1e293b"
              />
              <rect
                x="158"
                y="27"
                width="34"
                height="20"
                rx="3"
                fill="#1e293b"
              />
              <rect
                x="208"
                y="27"
                width="34"
                height="20"
                rx="3"
                fill="#1e293b"
              />
              <rect
                x="58"
                y="63"
                width="34"
                height="20"
                rx="3"
                fill="#1e293b"
              />
              <rect
                x="108"
                y="63"
                width="34"
                height="20"
                rx="3"
                fill="#f59e0b"
                fill-opacity="0.3"
                stroke="#f59e0b"
                stroke-width="2"
                class="animate-pulse"
              />
              <g transform="translate(125, 73)">
                <circle
                  r="10"
                  fill="none"
                  stroke="#f43f5e"
                  stroke-width="1.5"
                  class="animate-ping"
                />
                <circle r="4" fill="#f43f5e" />
              </g>
            </svg>
            <div
              class="text-[10px] font-mono text-cyan-300 font-bold bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/40 mt-1"
            >
              City Level &rarr; Recursing onto Specific Street Block
            </div>
          </div>

          <!-- STAGE 4: Specific Building / House Door (MAX - BASE CASE STOP) -->
          <div
            v-else
            class="relative w-full h-full flex flex-col items-center justify-center animate-fade-scale"
          >
            <svg class="w-full h-36" viewBox="0 0 280 140">
              <defs>
                <filter
                  id="goldGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <ellipse
                cx="140"
                cy="115"
                rx="90"
                ry="22"
                fill="#047857"
                fill-opacity="0.2"
                stroke="#10b981"
                stroke-width="1.5"
              />
              <polygon
                points="105,65 140,82 140,118 105,100"
                fill="#1e293b"
                stroke="#334155"
                stroke-width="1.5"
              />
              <polygon
                points="140,82 175,65 175,100 140,118"
                fill="#0f172a"
                stroke="#334155"
                stroke-width="1.5"
              />
              <polygon
                points="140,48 175,65 140,82 105,65"
                fill="#3b82f6"
                fill-opacity="0.8"
                stroke="#60a5fa"
                stroke-width="1.5"
              />
              <rect
                x="112"
                y="73"
                width="7"
                height="9"
                fill="#fbbf24"
                opacity="0.9"
              />
              <rect
                x="124"
                y="79"
                width="7"
                height="9"
                fill="#fbbf24"
                opacity="0.9"
              />
              <rect
                x="148"
                y="79"
                width="7"
                height="9"
                fill="#fbbf24"
                opacity="0.9"
              />
              <rect
                x="160"
                y="73"
                width="7"
                height="9"
                fill="#fbbf24"
                opacity="0.9"
              />
              <rect
                x="135"
                y="96"
                width="10"
                height="18"
                fill="#10b981"
                stroke="#34d399"
                stroke-width="1"
              />
              <g transform="translate(140, 32)">
                <circle
                  r="14"
                  fill="#10b981"
                  fill-opacity="0.3"
                  class="animate-ping"
                />
                <circle
                  r="8"
                  fill="#059669"
                  stroke="#34d399"
                  stroke-width="2"
                  filter="url(#goldGlow)"
                />
                <path
                  d="M -3,0 L -1,3 L 4,-3"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </g>
            </svg>
            <div
              class="px-3 py-1 rounded-lg bg-emerald-950 border-2 border-emerald-400 text-emerald-300 font-mono text-[10.5px] font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-2 animate-bounce"
            >
              <span
                class="i-lucide-check-circle-2 w-4 h-4 text-emerald-400"
              ></span>
              <span>BASE CASE HIT: Door #42 Reached &rarr; STOP ZOOMING!</span>
            </div>
          </div>
        </div>

        <!-- 2. KITCHEN CUTTING EXAMPLE (Big Square cut until 1/8th size) -->
        <div
          v-else-if="domain === 'cooking'"
          class="relative flex-1 flex flex-col items-center justify-center my-1 overflow-hidden animate-fade-scale"
        >
          <svg class="w-full h-40" viewBox="0 0 300 150">
            <!-- Cutting Board Background -->
            <rect
              x="30"
              y="8"
              width="240"
              height="134"
              rx="12"
              fill="#1e1814"
              stroke="#452a1a"
              stroke-width="2"
            />
            <circle
              cx="45"
              cy="75"
              r="5"
              fill="#0f0c0a"
              stroke="#452a1a"
              stroke-width="1.5"
            />

            <!-- The Big Culinary Square (120 x 120 pixels, Centered at x=85, y=15) -->
            <!-- Background Whole Square Bounds -->
            <rect
              x="85"
              y="15"
              width="120"
              height="120"
              rx="4"
              fill="#271b12"
              stroke="#5c3a21"
              stroke-width="2"
            />

            <!-- Subdivisions based on depth:
                 Total Square: 120 x 120 (Area 14400)
                 Cut 1 (depth >= 1): Vertical bisect at x = 145 (two 60x120 halves = 1/2 each)
                 Cut 2 (depth >= 2): Horizontal bisect of left half at y = 75 (two 60x60 quarters = 1/4 each)
                 Cut 3 (depth >= 3): Vertical bisect of top-left quarter at x = 115 (two 30x60 eighths = 1/8 each)
                 Depth 4: The 30x60 slice (1/8th size) glows bright gold/emerald, base case triggered!
            -->

            <!-- Inactive / Cut-Off Offcut Slices -->
            <!-- Right Half (1/2 discarded after Cut 1) -->
            <rect
              x="145"
              y="15"
              width="60"
              height="120"
              rx="2"
              fill="#d97706"
              :fill-opacity="depth === 1 ? '0.75' : '0.15'"
              stroke="#b45309"
              :stroke-width="depth === 1 ? 1.5 : 1"
              :stroke-dasharray="depth > 1 ? '2 2' : 'none'"
            />
            <text
              v-if="depth === 1"
              x="175"
              y="78"
              fill="#fef3c7"
              font-size="4"
              font-family="monospace"
              text-anchor="middle"
              font-weight="bold"
            >
              1/2
            </text>

            <!-- Bottom-Left Quarter (1/4 discarded after Cut 2) -->
            <rect
              x="85"
              y="75"
              width="60"
              height="60"
              rx="2"
              fill="#d97706"
              :fill-opacity="depth <= 2 ? '0.85' : '0.15'"
              stroke="#b45309"
              :stroke-width="depth <= 2 ? 1.5 : 1"
              :stroke-dasharray="depth > 2 ? '2 2' : 'none'"
            />
            <text
              v-if="depth === 2"
              x="115"
              y="108"
              fill="#fef3c7"
              font-size="4"
              font-family="monospace"
              text-anchor="middle"
              font-weight="bold"
            >
              1/4
            </text>

            <!-- Top-Left Right-Eighth (1/8 discarded after Cut 3) -->
            <rect
              x="115"
              y="15"
              width="30"
              height="60"
              rx="2"
              fill="#f59e0b"
              :fill-opacity="depth <= 3 ? '0.85' : '0.15'"
              stroke="#d97706"
              :stroke-width="depth <= 3 ? 1.5 : 1"
              :stroke-dasharray="depth > 3 ? '2 2' : 'none'"
            />
            <text
              v-if="depth === 3"
              x="130"
              y="48"
              fill="#fef3c7"
              font-size="4"
              font-family="monospace"
              text-anchor="middle"
              font-weight="bold"
            >
              1/8
            </text>

            <!-- THE ACTIVE SUB-PIECE -->
            <!-- Depth 1: Left Half active -->
            <rect
              v-if="depth === 1"
              x="85"
              y="15"
              width="60"
              height="120"
              rx="2"
              fill="#f59e0b"
              fill-opacity="0.9"
              stroke="#fbbf24"
              stroke-width="2"
            />
            <text
              v-if="depth === 1"
              x="115"
              y="78"
              fill="#78350f"
              font-size="4"
              font-family="monospace"
              text-anchor="middle"
              font-weight="bold"
            >
              1/2
            </text>

            <!-- Depth 2: Top-Left Quarter active -->
            <rect
              v-if="depth === 2"
              x="85"
              y="15"
              width="60"
              height="60"
              rx="2"
              fill="#f59e0b"
              fill-opacity="0.95"
              stroke="#fbbf24"
              stroke-width="2"
            />
            <text
              v-if="depth === 2"
              x="115"
              y="48"
              fill="#78350f"
              font-size="4"
              font-family="monospace"
              text-anchor="middle"
              font-weight="bold"
            >
              Active 1/4
            </text>

            <!-- Depth 3: Top-Left Eighth slice active -->
            <rect
              v-if="depth === 3"
              x="85"
              y="15"
              width="30"
              height="60"
              rx="2"
              fill="#f59e0b"
              fill-opacity="1"
              stroke="#fef08a"
              stroke-width="2.5"
            />
            <text
              v-if="depth === 3"
              x="100"
              y="48"
              fill="#78350f"
              font-size="4"
              font-family="monospace"
              text-anchor="middle"
              font-weight="bold"
            >
              1/8
            </text>

            <!-- Depth 4 (MAX / BASE CASE): Target 1/8th Piece glowing emerald/gold! -->
            <g v-if="depth === 4">
              <rect
                x="85"
                y="15"
                width="30"
                height="60"
                rx="3"
                fill="#10b981"
                fill-opacity="0.95"
                stroke="#34d399"
                stroke-width="3"
                class="animate-pulse"
              />
              <circle
                cx="100"
                cy="45"
                r="12"
                fill="#059669"
                fill-opacity="0.3"
                class="animate-ping"
              />
              <text
                x="100"
                y="48"
                fill="#ffffff"
                font-size="4"
                font-family="monospace"
                text-anchor="middle"
                font-weight="bold"
              >
                1/8th
              </text>
            </g>

            <!-- Animated Knife Cutting Guides -->
            <!-- Cut Line 1 (Vertical at x=145) -->
            <line
              x1="145"
              y1="10"
              x2="145"
              y2="140"
              :stroke="depth === 1 ? '#f43f5e' : '#5c3a21'"
              :stroke-width="depth === 1 ? 2.5 : 1.5"
              :stroke-dasharray="depth === 1 ? '4 3' : 'none'"
            />

            <!-- Cut Line 2 (Horizontal at y=75, across left side) -->
            <line
              v-if="depth >= 2"
              x1="80"
              y1="75"
              x2="145"
              y2="75"
              :stroke="depth === 2 ? '#f43f5e' : '#5c3a21'"
              :stroke-width="depth === 2 ? 2.5 : 1.5"
              :stroke-dasharray="depth === 2 ? '4 3' : 'none'"
            />

            <!-- Cut Line 3 (Vertical at x=115, across top-left) -->
            <line
              v-if="depth >= 3"
              x1="115"
              y1="10"
              x2="115"
              y2="75"
              :stroke="depth === 3 ? '#f43f5e' : '#5c3a21'"
              :stroke-width="depth === 3 ? 2.5 : 1.5"
              :stroke-dasharray="depth === 3 ? '4 3' : 'none'"
            />

            <!-- Animated Chef Knife Visual -->
            <!-- Moving Knife during cutting steps 1-3 -->
            <g
              v-if="depth < 4"
              :transform="
                depth === 1
                  ? 'translate(145, 5)'
                  : depth === 2
                    ? 'translate(80, 75)'
                    : 'translate(115, 5)'
              "
            >
              <!-- Knife Blade -->
              <path
                d="M 0,-8 L 35,-12 L 35,-4 L 6,-4 Z"
                fill="#e2e8f0"
                stroke="#94a3b8"
                stroke-width="1"
              />
              <!-- Knife Handle -->
              <rect
                x="35"
                y="-13"
                width="18"
                height="8"
                rx="2"
                fill="#78350f"
                stroke="#451a03"
                stroke-width="1"
              />
            </g>

            <!-- Rested Knife when Depth == 4 (Base Case: Cutting Complete) -->
            <g v-if="depth === 4" transform="translate(210, 45) rotate(45)">
              <path
                d="M 0,-6 L 40,-10 L 40,-2 L 6,-2 Z"
                fill="#94a3b8"
                stroke="#cbd5e1"
                stroke-width="1"
              />
              <rect
                x="40"
                y="-11"
                width="20"
                height="8"
                rx="2"
                fill="#78350f"
                stroke="#451a03"
                stroke-width="1"
              />
            </g>
          </svg>
        </div>

        <!-- 3. LIBRARY DOMAIN: Sections -> Shelves -> Books -> Single Book -->
        <div
          v-else
          class="relative flex-1 flex flex-col items-center justify-between my-1 overflow-hidden animate-fade-scale"
        >
          <!-- Stage 1: Multiple Sections (depth === 1) -->
          <svg v-if="depth === 1" class="w-full h-36" viewBox="0 0 300 130">
            <!-- Library Floor Outline -->
            <rect
              x="10"
              y="8"
              width="280"
              height="114"
              rx="6"
              fill="#090d16"
              stroke="#334155"
              stroke-width="1.5"
            />
            <!-- Hallway aisles -->
            <path
              d="M 145 10 L 145 120 M 12 65 L 288 65"
              stroke="#1e293b"
              stroke-width="8"
              stroke-dasharray="2 3"
            />
            <text
              x="145"
              y="67"
              fill="#64748b"
              font-size="4.5"
              font-family="monospace"
              text-anchor="middle"
            >
              CENTRAL HALL
            </text>

            <!-- 4 Sections -->
            <g
              v-for="sec in librarySections"
              :key="sec.id"
              :transform="`translate(${sec.x}, ${sec.y})`"
              class="transition-all duration-300"
            >
              <!-- Room Rect -->
              <rect
                x="0"
                y="0"
                width="125"
                height="42"
                rx="4"
                :fill="sec.isTarget ? '#1e1b4b' : '#0f172a'"
                :stroke="sec.isTarget ? '#818cf8' : '#334155'"
                :stroke-width="sec.isTarget ? '1.8' : '1'"
              />
              <!-- Section badge -->
              <rect
                x="5"
                y="5"
                width="26"
                height="11"
                rx="2"
                :fill="sec.isTarget ? '#4f46e5' : '#334155'"
              />
              <text
                x="18"
                y="13"
                fill="#ffffff"
                font-size="5"
                font-family="monospace"
                font-weight="bold"
                text-anchor="middle"
              >
                {{ sec.id }}
              </text>
              <text
                x="36"
                y="13"
                :fill="sec.isTarget ? '#c7d2fe' : '#94a3b8'"
                font-size="5"
                font-family="monospace"
                font-weight="bold"
              >
                {{ sec.name }}
              </text>

              <!-- Mini bookshelf racks inside room -->
              <line
                x1="8"
                y1="23"
                x2="115"
                y2="23"
                stroke="#475569"
                stroke-width="1.5"
              />
              <line
                x1="8"
                y1="33"
                x2="115"
                y2="33"
                stroke="#475569"
                stroke-width="1.5"
              />
              <rect
                v-for="k in 8"
                :key="k"
                :x="12 + (k - 1) * 12"
                y="18"
                width="7"
                height="5"
                rx="0.5"
                :fill="sec.isTarget ? '#a5b4fc' : '#334155'"
              />
              <rect
                v-for="k in 8"
                :key="`b-${k}`"
                :x="12 + (k - 1) * 12"
                y="28"
                width="7"
                height="5"
                rx="0.5"
                :fill="sec.isTarget ? '#818cf8' : '#334155'"
              />

              <!-- Target zoom indicator for Sec 500 -->
              <g v-if="sec.isTarget" transform="translate(98, 5)">
                <rect
                  x="0"
                  y="0"
                  width="22"
                  height="10"
                  rx="2"
                  fill="#4338ca"
                  stroke="#a5b4fc"
                  stroke-width="0.8"
                  class="animate-pulse"
                />
                <text
                  x="11"
                  y="7.5"
                  fill="#ffffff"
                  font-size="4"
                  font-family="monospace"
                  font-weight="bold"
                  text-anchor="middle"
                >
                  ENTER &darr;
                </text>
              </g>
            </g>
          </svg>

          <!-- Stage 2: Section 500 with Multiple Shelves (depth === 2) -->
          <svg v-else-if="depth === 2" class="w-full h-36" viewBox="0 0 300 130">
            <!-- Bookcase Outer Frame -->
            <rect
              x="25"
              y="8"
              width="250"
              height="114"
              rx="5"
              fill="#0f172a"
              stroke="#334155"
              stroke-width="1.5"
            />
            <text
              x="35"
              y="16"
              fill="#818cf8"
              font-size="5"
              font-family="monospace"
              font-weight="bold"
            >
              SECTION 500: PURE SCIENCES
            </text>

            <!-- 4 Shelves -->
            <g
              v-for="sh in sectionShelves"
              :key="sh.id"
              :transform="`translate(32, ${sh.y + 7})`"
              class="transition-all duration-300"
            >
              <!-- Shelf slot -->
              <rect
                x="0"
                y="0"
                width="236"
                height="22"
                rx="3"
                :fill="sh.isTarget ? '#172554' : '#090d16'"
                :stroke="sh.isTarget ? '#38bdf8' : '#1e293b'"
                :stroke-width="sh.isTarget ? '1.5' : '0.8'"
              />
              <!-- Shelf Ledge plank -->
              <rect x="0" y="20" width="236" height="3" fill="#475569" />

              <!-- Shelf Label Tag -->
              <rect
                x="4"
                y="4"
                width="46"
                height="12"
                rx="2"
                :fill="sh.isTarget ? '#0284c7' : '#1e293b'"
              />
              <text
                x="27"
                y="12.5"
                fill="#ffffff"
                font-size="4.8"
                font-family="monospace"
                font-weight="bold"
                text-anchor="middle"
              >
                {{ sh.id }} {{ sh.name }}
              </text>

              <!-- Mini Books sitting on this shelf -->
              <rect
                v-for="i in 12"
                :key="i"
                :x="58 + (i - 1) * 14"
                y="5"
                width="8"
                height="15"
                rx="1"
                :fill="
                  sh.isTarget && i === 6
                    ? '#38bdf8'
                    : sh.isTarget
                      ? '#1e3a8a'
                      : '#334155'
                "
                :class="{ 'animate-pulse': sh.isTarget && i === 6 }"
              />

              <!-- Target highlight tag on Shelf 530 -->
              <g v-if="sh.isTarget" transform="translate(196, 4)">
                <rect
                  x="0"
                  y="0"
                  width="36"
                  height="12"
                  rx="2"
                  fill="#0369a1"
                  stroke="#7dd3fc"
                  stroke-width="0.8"
                  class="animate-pulse"
                />
                <text
                  x="18"
                  y="8.5"
                  fill="#ffffff"
                  font-size="4.5"
                  font-family="monospace"
                  font-weight="bold"
                  text-anchor="middle"
                >
                  ZOOM IN &rarr;
                </text>
              </g>
            </g>
          </svg>

          <!-- Stage 3: Shelf 530 with Multiple Books (depth === 3) -->
          <svg v-else-if="depth === 3" class="w-full h-36" viewBox="0 0 300 130">
            <!-- Shelf Backing & Header -->
            <rect
              x="15"
              y="8"
              width="270"
              height="114"
              rx="6"
              fill="#0f172a"
              stroke="#334155"
              stroke-width="1.5"
            />
            <text
              x="25"
              y="18"
              fill="#38bdf8"
              font-size="5"
              font-family="monospace"
              font-weight="bold"
            >
              SHELF 530: PHYSICS AISLE
            </text>

            <!-- Shelf Floor Plank -->
            <rect
              x="20"
              y="102"
              width="260"
              height="8"
              rx="2"
              fill="#475569"
              stroke="#64748b"
              stroke-width="1"
            />

            <!-- Row of 5 Standing Books -->
            <g
              v-for="(bk, idx) in shelfBooks"
              :key="bk.id"
              :transform="`translate(${30 + idx * 48}, ${bk.isTarget ? 24 : 32})`"
              class="transition-all duration-300"
            >
              <!-- Target Glow outline -->
              <rect
                v-if="bk.isTarget"
                x="-3"
                y="-3"
                width="42"
                height="76"
                rx="4"
                fill="none"
                stroke="#34d399"
                stroke-width="2"
                class="animate-pulse"
              />

              <!-- Book Spine -->
              <rect
                x="0"
                y="0"
                width="36"
                height="70"
                rx="3"
                :fill="bk.isTarget ? '#059669' : bk.color"
                stroke="#1e293b"
                stroke-width="1"
              />

              <!-- Top Dewey Tag -->
              <rect
                x="3"
                y="3"
                width="30"
                height="11"
                rx="1.5"
                fill="#020617"
                fill-opacity="0.8"
              />
              <text
                x="18"
                y="11"
                fill="#ffffff"
                font-size="4.5"
                font-family="monospace"
                font-weight="bold"
                text-anchor="middle"
              >
                530
              </text>

              <!-- Book Title text -->
              <text
                x="18"
                y="27"
                fill="#f1f5f9"
                font-size="4.5"
                font-family="monospace"
                text-anchor="middle"
              >
                {{ bk.title }}
              </text>

              <!-- Book Call ID at bottom -->
              <rect
                x="4"
                y="50"
                width="28"
                height="14"
                rx="2"
                :fill="bk.isTarget ? '#10b981' : '#0f172a'"
                fill-opacity="0.9"
              />
              <text
                x="18"
                y="60"
                fill="#ffffff"
                font-size="5"
                font-family="monospace"
                font-weight="bold"
                text-anchor="middle"
              >
                {{ bk.id }}
              </text>

              <!-- Target Marker Pin -->
              <g v-if="bk.isTarget" transform="translate(10, -14)">
                <rect x="0" y="0" width="16" height="9" rx="1.5" fill="#f59e0b" />
                <text
                  x="8"
                  y="6.5"
                  fill="#000000"
                  font-size="4"
                  font-family="monospace"
                  font-weight="bold"
                  text-anchor="middle"
                >
                  PICK
                </text>
              </g>
            </g>
          </svg>

          <!-- Stage 4: Single Book in Hand (Base Case - depth === 4) -->
          <svg v-else class="w-full h-36" viewBox="0 0 300 130">
            <!-- Background Radial Glow -->
            <rect
              x="15"
              y="8"
              width="270"
              height="114"
              rx="6"
              fill="#022c22"
              stroke="#059669"
              stroke-width="1.5"
            />

            <!-- Single Extracted Book in Hand -->
            <g transform="translate(85, 14)">
              <!-- Outer Cover Drop Shadow -->
              <rect
                x="4"
                y="4"
                width="130"
                height="92"
                rx="5"
                fill="#000000"
                fill-opacity="0.5"
              />
              <!-- Book Cover Body -->
              <rect
                x="0"
                y="0"
                width="130"
                height="92"
                rx="5"
                fill="#065f46"
                stroke="#34d399"
                stroke-width="2.5"
              />

              <!-- Spine Strip -->
              <rect
                x="0"
                y="0"
                width="22"
                height="92"
                rx="3"
                fill="#047857"
                stroke="#10b981"
                stroke-width="1"
              />
              <text
                x="11"
                y="25"
                fill="#a7f3d0"
                font-size="4.5"
                font-family="monospace"
                font-weight="bold"
                text-anchor="middle"
              >
                500
              </text>
              <text
                x="11"
                y="40"
                fill="#a7f3d0"
                font-size="4.5"
                font-family="monospace"
                text-anchor="middle"
              >
                530
              </text>
              <text
                x="11"
                y="75"
                fill="#ffffff"
                font-size="5"
                font-family="monospace"
                font-weight="bold"
                text-anchor="middle"
              >
                B42
              </text>

              <!-- Front Cover Design -->
              <rect
                x="28"
                y="8"
                width="94"
                height="76"
                rx="3"
                fill="#022c22"
                stroke="#10b981"
                stroke-width="0.8"
              />
              <text
                x="75"
                y="24"
                fill="#a7f3d0"
                font-size="4.5"
                font-family="monospace"
                text-anchor="middle"
              >
                LIBRARY CLASSIFICATION
              </text>
              <text
                x="75"
                y="38"
                fill="#ffffff"
                font-size="5"
                font-family="monospace"
                font-weight="bold"
                text-anchor="middle"
              >
                QUANTUM PHYSICS
              </text>
              <text
                x="75"
                y="52"
                fill="#6ee7b7"
                font-size="4.5"
                font-family="monospace"
                text-anchor="middle"
              >
                Call: 500.530.B42
              </text>

              <!-- Target Checkmark Star Badge -->
              <circle cx="75" cy="68" r="7" fill="#10b981" />
              <path
                d="M 72 68 L 74 70 L 78 66"
                fill="none"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
              />

              <!-- Gold Ribbon Bookmark -->
              <polygon points="110,84 122,84 116,98" fill="#f59e0b" />
            </g>
          </svg>

          <!-- Bottom Stage Caption / Base Case Status -->
          <div
            v-if="depth === 4"
            class="px-2.5 py-1 rounded-lg bg-emerald-950 border-2 border-emerald-400 text-emerald-300 font-mono text-[10px] font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 animate-bounce"
          >
            <span
              class="i-lucide-check-circle-2 w-3.5 h-3.5 text-emerald-400 shrink-0"
            ></span>
            <span>BASE CASE: Single Book #42 Acquired &rarr; Stop Recursion!</span>
          </div>
          <div
            v-else
            class="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[9.5px] flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
            <span v-if="depth === 1"
              >Hallway view: 4 sections &rarr; entering Section 500...</span
            >
            <span v-else-if="depth === 2"
              >Section 500: 4 shelves &rarr; entering Shelf 530 (Physics)...</span
            >
            <span v-else>Shelf 530: 5 books &rarr; picking Book #42...</span>
          </div>
        </div>
      </div>

      <!-- RIGHT (5 cols): The Call Stack Accumulator -->
      <div
        class="col-span-5 rounded-xl bg-slate-950 border border-slate-800/90 h-full flex flex-col justify-between p-3 shadow-inner"
      >
        <!-- Call Stack Header -->
        <div
          class="flex items-center justify-between border-b border-slate-800 pb-2"
        >
          <div class="flex items-center gap-1.5">
            <span class="i-lucide-layers-3 w-4 h-4 text-pink-400"></span>
            <span class="text-xs font-mono text-pink-300 font-bold"
              >Call Stack (RAM)</span
            >
          </div>
          <span class="text-[10px] font-mono text-slate-400"
            >{{ depth }} / 4 Frames</span
          >
        </div>

        <!-- Stack Frames (Bottom up accumulation) -->
        <div class="flex flex-col-reverse gap-1.5 flex-1 justify-end py-1.5">
          <div
            v-for="frame in stackFrames"
            :key="frame.id"
            class="p-2 rounded-lg border text-xs font-mono flex items-center justify-between transition-all duration-300"
            :class="[
              frame.isBase
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/30'
                : 'bg-slate-900/90 border-indigo-500/40 text-slate-200',
            ]"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-1.5 py-0.5 rounded text-[9px] font-bold"
                :class="
                  frame.isBase
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-indigo-600 text-white'
                "
              >
                #{{ frame.id }}
              </span>
              <span class="text-[11px] font-bold">{{ frame.fn }}</span>
            </div>

            <div class="text-[9.5px]">
              <span
                v-if="frame.isBase"
                class="text-emerald-300 font-bold flex items-center gap-1"
              >
                <span
                  class="i-lucide-check-circle-2 w-3 h-3 text-emerald-400"
                ></span>
                <span>STOP</span>
              </span>
              <span v-else class="text-slate-400">Pushed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeScale {
  0% {
    opacity: 0;
    transform: scale(0.92);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-scale {
  animation: fadeScale 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
