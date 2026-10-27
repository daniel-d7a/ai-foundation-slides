<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    domain: "cooking" | "maps" | "library";
    isPlaying?: boolean;
  }>(),
  {
    isPlaying: true,
  },
);

const isRunning = ref(false);

// Cooking state
const cookingLinearIdx = ref(0);
const cookingHashHit = ref(false);

// Maps state (BFS vs Dijkstra)
const bfsStep = ref(0);
const dijkstraStep = ref(0);

// Library state (Page flip linear vs binary halving)
const linearFlipPage = ref(1);
const binaryCutStep = ref(0);

let timerLinear: ReturnType<typeof setInterval> | null = null;
let timerOptimal: ReturnType<typeof setInterval> | null = null;

const spiceJars = [
  { id: "basil", name: "BASIL", fill: "#16a34a", cap: "#78350f" },
  { id: "cumin", name: "CUMIN", fill: "#b45309", cap: "#451a03" },
  { id: "dill", name: "DILL", fill: "#65a30d", cap: "#78350f" },
  { id: "garlic", name: "GARLIC", fill: "#f1f5f9", cap: "#334155" },
  { id: "mint", name: "MINT", fill: "#059669", cap: "#1e293b" },
  { id: "paprika", name: "PAPRIKA", fill: "#dc2626", cap: "#7f1d1d" },
  {
    id: "oregano",
    name: "OREGANO",
    fill: "#15803d",
    cap: "#14532d",
    isTarget: true,
  },
];

const targetJarIndex = 6; // Oregano is at index 6

function runRace() {
  if (isRunning.value) return;
  isRunning.value = true;

  // Reset state
  cookingLinearIdx.value = 0;
  cookingHashHit.value = false;
  bfsStep.value = 0;
  dijkstraStep.value = 0;
  linearFlipPage.value = 1;
  binaryCutStep.value = 0;

  if (timerLinear) clearInterval(timerLinear);
  if (timerOptimal) clearInterval(timerOptimal);

  if (props.domain === "cooking") {
    // Optimal Hash Carousel: instant direct jump after 180ms
    setTimeout(() => {
      cookingHashHit.value = true;
    }, 200);

    // Linear Pantry Scan: steps through jar-by-jar
    timerLinear = setInterval(() => {
      if (cookingLinearIdx.value < targetJarIndex) {
        cookingLinearIdx.value++;
      } else {
        if (timerLinear) clearInterval(timerLinear);
        isRunning.value = false;
      }
    }, 420);
  } else if (props.domain === "maps") {
    // Dijkstra: Hugs highway bypass swiftly (0 to 4 hops)
    timerOptimal = setInterval(() => {
      if (dijkstraStep.value < 4) {
        dijkstraStep.value++;
      } else {
        if (timerOptimal) clearInterval(timerOptimal);
      }
    }, 320);

    // Naive BFS: 0 -> 1 (branch to both first nodes) -> 2 (bottom hits goal) -> 3 (confirm path)
    timerLinear = setInterval(() => {
      if (bfsStep.value < 3) {
        bfsStep.value++;
      } else {
        if (timerLinear) clearInterval(timerLinear);
        isRunning.value = false;
      }
    }, 600);
  } else {
    // Library:
    // Binary split: cuts in half 4 times (slower pace: 850ms per cut)
    timerOptimal = setInterval(() => {
      if (binaryCutStep.value < 4) {
        binaryCutStep.value++;
      } else {
        if (timerOptimal) clearInterval(timerOptimal);
      }
    }, 850);

    // Linear page flip: flips sequentially page-by-page 1-by-1 to 42
    timerLinear = setInterval(() => {
      if (linearFlipPage.value < 42) {
        linearFlipPage.value++;
      } else {
        if (timerLinear) clearInterval(timerLinear);
        isRunning.value = false;
      }
    }, 100);
  }
}

function stepBinary(delta: number) {
  if (timerLinear) clearInterval(timerLinear);
  if (timerOptimal) clearInterval(timerOptimal);
  isRunning.value = false;
  const next = Math.max(0, Math.min(4, binaryCutStep.value + delta));
  binaryCutStep.value = next;
  const pagesByStep = [1, 11, 21, 32, 42];
  linearFlipPage.value = pagesByStep[next];
}

function setBinaryStep(step: number) {
  if (timerLinear) clearInterval(timerLinear);
  if (timerOptimal) clearInterval(timerOptimal);
  isRunning.value = false;
  binaryCutStep.value = step;
  const pagesByStep = [1, 11, 21, 32, 42];
  linearFlipPage.value = pagesByStep[step];
}

function resetRace() {
  if (timerLinear) clearInterval(timerLinear);
  if (timerOptimal) clearInterval(timerOptimal);
  isRunning.value = false;
  cookingLinearIdx.value = 0;
  cookingHashHit.value = false;
  bfsStep.value = 0;
  dijkstraStep.value = 0;
  linearFlipPage.value = 1;
  binaryCutStep.value = 0;
}

watch(
  () => props.domain,
  () => {
    resetRace();
    runRace();
  },
);

onMounted(() => {
  runRace();
});

onUnmounted(() => {
  if (timerLinear) clearInterval(timerLinear);
  if (timerOptimal) clearInterval(timerOptimal);
});
</script>

<template>
  <div class="h-full flex flex-col justify-between select-none">
    <!-- Top Telemetry & Control Bar -->
    <div
      class="flex items-center justify-between pb-1.5 border-b border-slate-800 text-xs font-mono"
    >
      <div class="flex items-center gap-2">
        <span class="text-slate-400">Target:</span>
        <span
          class="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold flex items-center gap-1.5"
        >
          <span
            v-if="domain === 'cooking'"
            class="i-lucide-soup w-3.5 h-3.5"
          ></span>
          <span
            v-else-if="domain === 'maps'"
            class="i-lucide-map-pin w-3.5 h-3.5"
          ></span>
          <span v-else class="i-lucide-book-open w-3.5 h-3.5"></span>

          <span v-if="domain === 'cooking'">Oregano Jar</span>
          <span v-else-if="domain === 'maps'">Fastest Route to Goal</span>
          <span v-else>Page 42 ("Quantum")</span>
        </span>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="runRace"
          :disabled="isRunning"
          class="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-mono text-[10.5px] cursor-pointer transition-all shadow-sm"
        >
          <span class="i-lucide-play w-3 h-3"></span>
          <span>{{ isRunning ? "Running..." : "Run Race" }}</span>
        </button>

        <button
          @click="resetRace"
          class="flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-mono text-[10.5px] cursor-pointer transition-all"
        >
          <svg
            class="w-3 h-3 text-slate-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span>Reset</span>
        </button>
      </div>
    </div>

    <!-- ==================== 1. COOKING DOMAIN ==================== -->
    <div
      v-if="domain === 'cooking'"
      class="flex flex-col gap-2.5 my-1 flex-1 justify-center animate-fade-scale"
    >
      <!-- Track 1: Naive O(n) Shelf Scan of Realistic Jars -->
      <div
        class="p-2.5 rounded-xl bg-slate-950 border border-rose-500/30 flex flex-col gap-1.5 shadow-sm"
      >
        <div class="flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <span
              class="w-2 h-2 rounded-full bg-rose-400"
              :class="{
                'animate-ping': isRunning && cookingLinearIdx < targetJarIndex,
              }"
            ></span>
            <span class="font-bold text-rose-300">Linear Shelf Walk O(n)</span>
          </div>
          <div class="text-[10.5px] font-bold text-rose-400">
            Checks: {{ cookingLinearIdx + 1 }} / 7 &bull; Time:
            {{ (cookingLinearIdx + 1) * 120 }} ms
          </div>
        </div>

        <!-- Shelf Canvas with Realistic Jars -->
        <svg class="w-full h-24" viewBox="0 0 310 75">
          <!-- Wooden Pantry Shelf Plank -->
          <rect
            x="5"
            y="62"
            width="300"
            height="8"
            rx="2"
            fill="#451a03"
            stroke="#78350f"
            stroke-width="1"
          />

          <!-- 7 Realistic Spice Jars -->
          <g
            v-for="(jar, idx) in spiceJars"
            :key="jar.id"
            :transform="`translate(${12 + idx * 42}, ${
              idx === cookingLinearIdx ? 10 : 16
            })`"
            class="transition-all duration-300"
          >
            <!-- Searchlight pointer above currently inspected jar -->
            <g v-if="idx === cookingLinearIdx && isRunning">
              <polygon
                points="13,-8 19,-8 16,-2"
                fill="#f43f5e"
                class="animate-pulse"
              />
            </g>

            <!-- Jar Cap -->
            <rect
              x="3.5"
              y="0"
              width="17"
              height="5"
              rx="1.5"
              :fill="jar.cap"
              stroke="#0f172a"
              stroke-width="0.8"
            />
            <!-- Jar Neck -->
            <rect
              x="5.5"
              y="5"
              width="13"
              height="3"
              rx="0.5"
              fill="#cbd5e1"
              fill-opacity="0.4"
            />

            <!-- Glass Jar Body -->
            <rect
              x="1"
              y="8"
              width="22"
              height="38"
              rx="3.5"
              fill="#1e293b"
              fill-opacity="0.85"
              :stroke="
                idx === cookingLinearIdx
                  ? '#f43f5e'
                  : idx === targetJarIndex && cookingLinearIdx >= targetJarIndex
                    ? '#10b981'
                    : '#334155'
              "
              :stroke-width="idx === cookingLinearIdx ? '1.5' : '1'"
            />

            <!-- Spice Herb Fill Level -->
            <rect
              x="2.5"
              y="16"
              width="19"
              height="28"
              rx="2"
              :fill="jar.fill"
              fill-opacity="0.9"
            />

            <!-- Glass Reflection Highlight -->
            <line
              x1="4"
              y1="10"
              x2="4"
              y2="42"
              stroke="#ffffff"
              stroke-width="1"
              stroke-linecap="round"
              opacity="0.4"
            />

            <!-- Paper Label on Jar -->
            <rect
              x="3"
              y="22"
              width="18"
              height="12"
              rx="1.5"
              fill="#fef3c7"
              stroke="#d97706"
              stroke-width="0.6"
            />
            <text
              x="12"
              y="30"
              fill="#78350f"
              font-size="1.5"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              {{ jar.name }}
            </text>

            <!-- Status Badge Below Shelf -->
            <text
              v-if="idx < cookingLinearIdx"
              x="12"
              y="56"
              fill="#f43f5e"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              &cross;
            </text>
            <text
              v-else-if="
                idx === targetJarIndex && cookingLinearIdx >= targetJarIndex
              "
              x="12"
              y="56"
              fill="#10b981"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              &check;
            </text>
          </g>
        </svg>
      </div>

      <!-- Track 2: Optimal O(1) Hash Table Carousel -->
      <div
        class="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 flex flex-col gap-1.5 shadow-lg shadow-emerald-950/20"
      >
        <div class="flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <span
              class="w-2 h-2 rounded-full bg-emerald-400"
              :class="{ 'animate-ping': cookingHashHit }"
            ></span>
            <span class="font-bold text-emerald-300"
              >Indexed Hash Carousel O(1)</span
            >
          </div>
          <div class="text-[10.5px] font-bold text-emerald-400">
            Checks: 1 Direct Hit &bull; Time: 12 ms
          </div>
        </div>

        <!-- Carousel / Direct Slot Bar -->
        <svg class="w-full h-24 overflow-visible" viewBox="0 0 310 75">
          <!-- Carousel Rotating Base Rail -->
          <rect
            x="5"
            y="62"
            width="300"
            height="8"
            rx="2"
            fill="#064e3b"
            stroke="#059669"
            stroke-width="1"
          />

          <!-- Direct Hashing Beam connecting Hash Function to Oregano Jar -->
          <g v-if="cookingHashHit">
            <path
              d="M 20,15 Q 140,-5 264,20"
              fill="none"
              stroke="#34d399"
              stroke-width="2"
              stroke-dasharray="4 3"
              class="animate-pulse"
            />
          </g>

          <!-- 7 Indexed Slots -->
          <g
            v-for="(jar, idx) in spiceJars"
            :key="`hash-${jar.id}`"
            :transform="`translate(${12 + idx * 42}, ${
              jar.isTarget && cookingHashHit ? 10 : 18
            })`"
            class="transition-all duration-300"
            :class="{ 'opacity-30': cookingHashHit && !jar.isTarget }"
          >
            <!-- Slot Index Tag -->
            <rect
              x="5"
              y="-12"
              width="14"
              height="7"
              rx="1.5"
              :fill="jar.isTarget && cookingHashHit ? '#10b981' : '#1e293b'"
            />
            <text
              x="12"
              y="-6"
              :fill="jar.isTarget && cookingHashHit ? '#000000' : '#94a3b8'"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              #{{ idx }}
            </text>

            <!-- Jar Cap -->
            <rect
              x="3.5"
              y="0"
              width="17"
              height="5"
              rx="1.5"
              :fill="jar.cap"
              stroke="#0f172a"
              stroke-width="0.8"
            />
            <!-- Jar Neck -->
            <rect
              x="5.5"
              y="5"
              width="13"
              height="3"
              rx="0.5"
              fill="#cbd5e1"
              fill-opacity="0.4"
            />

            <!-- Glass Jar Body -->
            <rect
              x="1"
              y="8"
              width="22"
              height="38"
              rx="3.5"
              fill="#1e293b"
              fill-opacity="0.85"
              :stroke="jar.isTarget && cookingHashHit ? '#34d399' : '#334155'"
              :stroke-width="jar.isTarget && cookingHashHit ? '2' : '1'"
            />

            <!-- Spice Herb Fill Level -->
            <rect
              x="2.5"
              y="16"
              width="19"
              height="28"
              rx="2"
              :fill="jar.fill"
              fill-opacity="0.9"
            />

            <!-- Label -->
            <rect
              x="3"
              y="22"
              width="18"
              height="12"
              rx="1.5"
              fill="#fef3c7"
              stroke="#d97706"
              stroke-width="0.6"
            />
            <text
              x="12"
              y="30"
              fill="#78350f"
              font-size="1.5"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              {{ jar.name }}
            </text>

            <!-- Target Extracted Badge -->
            <g
              v-if="jar.isTarget && cookingHashHit"
              transform="translate(4, -20)"
            >
              <rect
                x="-2"
                y="-2"
                width="20"
                height="8"
                rx="1.5"
                fill="#10b981"
              />
              <text
                x="9"
                y="5"
                fill="#ffffff"
                font-size="2"
                font-family="monospace"
                font-weight="bold"
                text-anchor="middle"
              >
                HIT!
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>

    <!-- ==================== 2. MAPS DOMAIN (BFS vs DIJKSTRA) ==================== -->
    <div
      v-else-if="domain === 'maps'"
      class="flex flex-col gap-2.5 my-1 flex-1 justify-center animate-fade-scale"
    >
      <!-- Track 1: Unweighted BFS (Expands blindly into traffic bottleneck) -->
      <div
        class="p-2.5 rounded-xl bg-slate-950 border border-rose-500/30 flex flex-col gap-1.5 shadow-sm"
      >
        <div class="flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <span
              class="w-2 h-2 rounded-full bg-rose-400"
              :class="{ 'animate-ping': isRunning && bfsStep < 3 }"
            ></span>
            <span class="font-bold text-rose-300"
              >Unweighted BFS (Minimizes Hops)</span
            >
          </div>
          <div class="text-[10.5px] font-bold text-rose-400">
            {{
              bfsStep === 0
                ? "Picks 2 Hops • Cost: 20"
                : bfsStep === 1
                  ? "1. Branch to both 1st nodes"
                  : bfsStep === 2
                    ? "2. Bottom reaches Goal!"
                    : "Confirmed: 2 Hops (Cost: 20)"
            }}
          </div>
        </div>

        <!-- BFS Grid SVG -->
        <svg class="w-full h-24 overflow-visible" viewBox="0 0 310 75">
          <!-- Background Grid Area -->
          <rect
            x="5"
            y="5"
            width="300"
            height="65"
            rx="4"
            fill="#090d16"
            stroke="#1e293b"
            stroke-width="1"
          />

          <!-- Central Road Jam (High cost bottleneck = 20) -->
          <rect
            x="105"
            y="24"
            width="100"
            height="26"
            rx="3"
            fill="#450a0a"
            stroke="#dc2626"
            stroke-width="1"
          />
          <text
            x="155"
            y="31"
            fill="#fca5a5"
            font-size="2"
            font-family="sans-serif"
            font-weight="bold"
            text-anchor="middle"
          >
            Traffic (Cost: 20)
          </text>

          <!-- North Highway Bypass Base Arc -->
          <path
            d="M 30,37 Q 155,-5 280,37"
            fill="none"
            stroke="#334155"
            stroke-width="2"
          />
          <text
            x="155"
            y="6"
            fill="#94a3b8"
            font-size="2"
            font-family="sans-serif"
            font-weight="bold"
            text-anchor="middle"
          >
            Highway (Cost: 4)
          </text>

          <!-- Central Slow Road Base Line -->
          <line
            x1="30"
            y1="37"
            x2="280"
            y2="37"
            stroke="#334155"
            stroke-width="2"
          />

          <!-- BFS Branch Lines Step 1: Source to BOTH first nodes -->
          <g v-if="bfsStep >= 1">
            <!-- Top branch to H1 (95,21) -->
            <path
              d="M 30,37 Q 62,25 95,21"
              fill="none"
              :stroke="bfsStep >= 3 ? '#64748b' : '#f43f5e'"
              :stroke-width="bfsStep >= 3 ? 1.5 : 2.5"
              :opacity="bfsStep >= 3 ? 0.35 : 1"
              class="transition-all duration-300"
            />
            <!-- Bottom branch to Jam Node (155,38) -->
            <line
              x1="30"
              y1="37"
              x2="155"
              y2="38"
              :stroke="bfsStep >= 3 ? '#ef4444' : '#f43f5e'"
              :stroke-width="bfsStep >= 3 ? 3.5 : 2.5"
              class="transition-all duration-300"
            />
          </g>

          <!-- BFS Branch Lines Step 2: Advance to second nodes -->
          <g v-if="bfsStep >= 2">
            <!-- Top branch advances H1 to H2 (155,16) -->
            <path
              d="M 95,21 Q 125,17 155,16"
              fill="none"
              :stroke="bfsStep >= 3 ? '#64748b' : '#f43f5e'"
              :stroke-width="bfsStep >= 3 ? 1.5 : 2"
              :opacity="bfsStep >= 3 ? 0.25 : 0.8"
              stroke-dasharray="3 2"
              class="transition-all duration-300"
            />
            <!-- Bottom branch advances Jam Node to Goal G (280,37) -->
            <line
              x1="155"
              y1="38"
              x2="280"
              y2="37"
              :stroke="bfsStep >= 3 ? '#ef4444' : '#f43f5e'"
              :stroke-width="bfsStep >= 3 ? 3.5 : 2.5"
              class="transition-all duration-300"
            />
          </g>

          <!-- Fast Highway Waypoint Nodes -->
          <circle
            cx="95"
            cy="21"
            r="4"
            :fill="
              bfsStep >= 1 ? (bfsStep >= 3 ? '#475569' : '#f43f5e') : '#334155'
            "
          />
          <circle
            cx="155"
            cy="16"
            r="4"
            :fill="
              bfsStep >= 2 ? (bfsStep >= 3 ? '#334155' : '#f43f5e') : '#334155'
            "
          />
          <circle cx="215" cy="21" r="4" fill="#334155" />

          <!-- Start Node S -->
          <circle
            cx="30"
            cy="37"
            r="7"
            fill="#0284c7"
            stroke="#38bdf8"
            stroke-width="1.5"
          />
          <text
            x="30"
            y="38.5"
            fill="#ffffff"
            font-size="2"
            font-family="sans-serif"
            font-weight="bold"
            text-anchor="middle"
          >
            S
          </text>

          <!-- Bottleneck Node (First Bottom Node) -->
          <circle
            cx="155"
            cy="38"
            r="4.5"
            :fill="bfsStep >= 1 ? '#ef4444' : '#334155'"
            stroke="#f43f5e"
            stroke-width="1"
          />

          <!-- Goal Node G -->
          <circle
            cx="280"
            cy="37"
            r="7"
            :fill="bfsStep >= 2 ? '#ef4444' : '#1e293b'"
            :stroke="
              bfsStep >= 3 ? '#ffffff' : bfsStep >= 2 ? '#f43f5e' : '#f59e0b'
            "
            :stroke-width="bfsStep >= 3 ? 2 : 1.5"
          />
          <text
            x="280"
            y="38.5"
            fill="#ffffff"
            font-size="2"
            font-family="sans-serif"
            font-weight="bold"
            text-anchor="middle"
          >
            G
          </text>

          <!-- Confirmation / Result Tag -->
          <g v-if="bfsStep >= 2" transform="translate(230, 50)">
            <rect
              x="0"
              y="0"
              width="50"
              height="8.5"
              rx="1.5"
              :fill="bfsStep >= 3 ? '#b91c1c' : '#991b1b'"
              :stroke="bfsStep >= 3 ? '#ef4444' : '#f87171'"
              stroke-width="0.8"
            />
            <text
              x="25"
              y="5.8"
              fill="#ffffff"
              font-size="1.8"
              font-family="sans-serif"
              font-weight="bold"
              text-anchor="middle"
            >
              {{ bfsStep >= 3 ? "Cost: 20" : "Goal Hit (2 Hops)" }}
            </text>
          </g>
        </svg>
      </div>

      <!-- Track 2: Weighted Dijkstra (Priority Queue hugs fast Highway, skips traffic) -->
      <div
        class="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 flex flex-col gap-1.5 shadow-lg shadow-emerald-950/20"
      >
        <div class="flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <span
              class="w-2 h-2 rounded-full bg-emerald-400"
              :class="{ 'animate-ping': dijkstraStep >= 4 }"
            ></span>
            <span class="font-bold text-emerald-300"
              >Dijkstra's Algorithm: Prioritizes Low Cost</span
            >
          </div>
          <div class="text-[10.5px] font-bold text-emerald-400">
            Hops: {{ dijkstraStep }} / 4 &bull; Total Cost: 4
          </div>
        </div>

        <!-- Dijkstra Grid SVG -->
        <svg class="w-full h-24 overflow-visible" viewBox="0 0 310 75">
          <!-- Background Grid Area -->
          <rect
            x="5"
            y="5"
            width="300"
            height="65"
            rx="4"
            fill="#090d16"
            stroke="#1e293b"
            stroke-width="1"
          />

          <!-- Traffic Bottleneck (Skipped!) -->
          <rect
            x="105"
            y="24"
            width="100"
            height="26"
            rx="3"
            fill="#1f1315"
            stroke="#451a1a"
            stroke-width="0.8"
            opacity="0.6"
          />
          <text
            x="155"
            y="31"
            fill="#7f1d1d"
            font-size="2"
            font-family="sans-serif"
            text-anchor="middle"
          >
            Traffic (Cost: 20)
          </text>

          <!-- Central Slow Road (Bypassed by Dijkstra) -->
          <line
            x1="30"
            y1="37"
            x2="280"
            y2="37"
            stroke="#1e293b"
            stroke-width="1.8"
            stroke-dasharray="3 3"
          />
          <circle cx="155" cy="38" r="3.5" fill="#334155" opacity="0.4" />

          <!-- North Highway Flowing Active Path -->
          <path
            d="M 30,37 Q 155,-5 280,37"
            fill="none"
            :stroke="dijkstraStep >= 1 ? '#10b981' : '#334155'"
            stroke-width="2.5"
            :stroke-dasharray="dijkstraStep >= 4 ? 'none' : '4 3'"
          />
          <text
            x="155"
            y="6"
            fill="#34d399"
            font-size="2"
            font-family="sans-serif"
            font-weight="bold"
            text-anchor="middle"
          >
            Highway (Cost: 4)
          </text>

          <!-- Start Node S -->
          <circle
            cx="30"
            cy="37"
            r="7"
            fill="#0284c7"
            stroke="#38bdf8"
            stroke-width="1.5"
          />
          <text
            x="30"
            y="38.5"
            fill="#ffffff"
            font-size="2"
            font-family="sans-serif"
            font-weight="bold"
            text-anchor="middle"
          >
            S
          </text>

          <!-- Highway Waypoint Nodes -->
          <circle
            cx="95"
            cy="21"
            r="4.5"
            :fill="dijkstraStep >= 1 ? '#10b981' : '#334155'"
          />
          <circle
            cx="155"
            cy="16"
            r="4.5"
            :fill="dijkstraStep >= 2 ? '#10b981' : '#334155'"
          />
          <circle
            cx="215"
            cy="21"
            r="4.5"
            :fill="dijkstraStep >= 3 ? '#10b981' : '#334155'"
          />

          <!-- Goal Node G -->
          <circle
            cx="280"
            cy="37"
            r="7"
            :fill="dijkstraStep >= 4 ? '#10b981' : '#1e293b'"
            stroke="#34d399"
            stroke-width="2"
          />
          <text
            x="280"
            y="38.5"
            fill="#ffffff"
            font-size="2"
            font-family="sans-serif"
            font-weight="bold"
            text-anchor="middle"
          >
            G
          </text>

          <!-- Result Tag -->
          <g v-if="dijkstraStep >= 4" transform="translate(235, 50)">
            <rect
              x="0"
              y="0"
              width="46"
              height="10"
              rx="1.5"
              fill="#065f46"
              stroke="#34d399"
              stroke-width="0.8"
            />
            <text
              x="23"
              y="7"
              fill="#ffffff"
              font-size="1.8"
              font-family="sans-serif"
              font-weight="bold"
              text-anchor="middle"
            >
              Cost: 16
            </text>
          </g>
        </svg>
      </div>
    </div>

    <!-- ==================== 3. LIBRARY DOMAIN (PAGE FLIP vs BINARY SPLIT) ==================== -->
    <div
      v-else
      class="flex flex-col gap-2.5 my-1 flex-1 justify-center animate-fade-scale"
    >
      <!-- Track 1: Linear Page-by-Page Flip O(n) -->
      <div
        class="p-2.5 rounded-xl bg-slate-950 border border-rose-500/30 flex flex-col gap-1.5 shadow-sm"
      >
        <div class="flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <span
              class="w-2 h-2 rounded-full bg-rose-400"
              :class="{ 'animate-ping': isRunning && linearFlipPage < 42 }"
            ></span>
            <span class="font-bold text-rose-300"
              >Linear Search (Page-by-Page Flip)</span
            >
          </div>
          <div class="text-[10.5px] font-bold text-rose-400">
            Flipped: Page {{ linearFlipPage }} / 42 &bull; Slow O(n)
          </div>
        </div>

        <!-- Flipping Book SVG Canvas -->
        <svg class="w-full h-24" viewBox="0 0 310 75">
          <!-- Desk Backdrop -->
          <rect
            x="5"
            y="5"
            width="300"
            height="65"
            rx="4"
            fill="#090d16"
            stroke="#1e293b"
            stroke-width="1"
          />

          <!-- Open Book Base -->
          <!-- Left Static Page Block -->
          <rect
            x="45"
            y="14"
            width="105"
            height="48"
            rx="2"
            fill="#f8fafc"
            stroke="#94a3b8"
            stroke-width="1"
          />
          <text
            x="95"
            y="24"
            fill="#64748b"
            font-size="2"
            font-family="monospace"
            text-anchor="middle"
          >
            Page 1: Introduction
          </text>
          <line
            x1="55"
            y1="32"
            x2="140"
            y2="32"
            stroke="#cbd5e1"
            stroke-width="1"
          />
          <line
            x1="55"
            y1="38"
            x2="140"
            y2="38"
            stroke="#cbd5e1"
            stroke-width="1"
          />
          <line
            x1="55"
            y1="44"
            x2="120"
            y2="44"
            stroke="#cbd5e1"
            stroke-width="1"
          />

          <!-- Center Spine Crease -->
          <line
            x1="150"
            y1="12"
            x2="150"
            y2="64"
            stroke="#475569"
            stroke-width="3"
          />

          <!-- Right Page Stack -->
          <rect
            x="152"
            y="14"
            width="105"
            height="48"
            rx="2"
            fill="#f1f5f9"
            stroke="#94a3b8"
            stroke-width="1"
          />
          <text
            x="205"
            y="24"
            fill="#334155"
            font-size="2"
            font-family="monospace"
            font-weight="bold"
            text-anchor="middle"
          >
            {{
              linearFlipPage >= 42
                ? "Page 42: QUANTUM HIT!"
                : `Flipping Page ${linearFlipPage}...`
            }}
          </text>

          <!-- Animated Flipping Page Curl Sheet -->
          <path
            v-if="isRunning && linearFlipPage < 42"
            d="M 152,14 Q 200,8 220,18 L 220,60 Q 200,64 152,62 Z"
            fill="#fef08a"
            fill-opacity="0.85"
            stroke="#eab308"
            stroke-width="1"
            class="animate-pulse"
          />

          <!-- Page Flip Counter Meter -->
          <rect
            x="262"
            y="16"
            width="38"
            height="44"
            rx="2"
            fill="#1e1b4b"
            stroke="#6366f1"
            stroke-width="0.8"
          />
          <text
            x="281"
            y="32"
            fill="#a5b4fc"
            font-size="1.8"
            font-family="monospace"
            text-anchor="middle"
          >
            CURRENT
          </text>
          <text
            x="281"
            y="44"
            fill="#ffffff"
            font-size="2"
            font-family="monospace"
            font-weight="bold"
            text-anchor="middle"
          >
            p.{{ linearFlipPage }}
          </text>
        </svg>
      </div>

      <!-- Track 2: Binary Search Page Halving O(log n) -->
      <div
        class="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 flex flex-col gap-1.5 shadow-lg shadow-emerald-950/20"
      >
        <div class="flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <span
              class="w-2 h-2 rounded-full bg-emerald-400"
              :class="{ 'animate-ping': binaryCutStep >= 4 }"
            ></span>
            <span class="font-bold text-emerald-300"
              >Binary Search (50% Page Halving)</span
            >
            <span class="text-[10px] text-slate-500 hidden sm:inline"
              >({{ [0, 250, 375, 438, 458][binaryCutStep] }} Discarded)</span
            >
          </div>
          <div
            class="flex items-center gap-1 bg-slate-900 border border-emerald-500/30 rounded px-1.5 py-0.5"
          >
            <span class="text-[10px] text-slate-400 font-semibold mr-1"
              >STEPPER</span
            >
            <button
              @click="stepBinary(-1)"
              :disabled="binaryCutStep <= 0"
              class="px-1.5 py-0.5 rounded bg-emerald-950/80 hover:bg-emerald-800 disabled:opacity-30 disabled:cursor-not-allowed text-emerald-300 font-bold text-[10px] cursor-pointer transition-colors"
              title="Previous Step"
            >
              &larr; Prev
            </button>
            <div class="flex items-center gap-0.5">
              <button
                v-for="s in [0, 1, 2, 3, 4]"
                :key="s"
                @click="setBinaryStep(s)"
                class="w-4 h-4 rounded text-[9.5px] font-bold flex items-center justify-center cursor-pointer transition-all"
                :class="
                  binaryCutStep === s
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-emerald-300'
                "
              >
                {{ s }}
              </button>
            </div>
            <button
              @click="stepBinary(1)"
              :disabled="binaryCutStep >= 4"
              class="px-1.5 py-0.5 rounded bg-emerald-950/80 hover:bg-emerald-800 disabled:opacity-30 disabled:cursor-not-allowed text-emerald-300 font-bold text-[10px] cursor-pointer transition-colors"
              title="Next Step"
            >
              Next &rarr;
            </button>
          </div>
        </div>

        <!-- Binary Splitting Book SVG Canvas -->
        <svg class="w-full h-24" viewBox="0 0 310 75">
          <!-- Desk Backdrop -->
          <rect
            x="5"
            y="5"
            width="300"
            height="65"
            rx="4"
            fill="#090d16"
            stroke="#1e293b"
            stroke-width="1"
          />

          <!-- Open Book Base -->
          <rect
            x="35"
            y="14"
            width="115"
            height="48"
            rx="2"
            fill="#f8fafc"
            stroke="#94a3b8"
            stroke-width="1"
          />
          <line
            x1="150"
            y1="12"
            x2="150"
            y2="64"
            stroke="#475569"
            stroke-width="3"
          />

          <!-- Right Half Page Stack (Discarded in huge chunks) -->
          <rect
            x="152"
            y="14"
            width="115"
            height="48"
            rx="2"
            fill="#f1f5f9"
            stroke="#94a3b8"
            stroke-width="1"
            :class="{ 'opacity-30 filter grayscale': binaryCutStep >= 1 }"
          />

          <!-- Laser Dividing Split Blade at 50% -->
          <line
            x1="150"
            y1="8"
            x2="150"
            y2="66"
            stroke="#34d399"
            stroke-width="2"
            class="animate-pulse"
          />

          <!-- Active Search Chunk Banner (Tall, 2-line format) -->
          <g v-if="binaryCutStep >= 1" transform="translate(182, 27)">
            <rect
              x="-12"
              y="0"
              width="80"
              height="22"
              rx="2"
              fill="#064e3b"
              stroke="#10b981"
              stroke-width="0.8"
            />
            <text
              x="27"
              y="9"
              fill="#a7f3d0"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              Cut {{ binaryCutStep }}: Discard
            </text>
            <text
              x="27"
              y="16"
              fill="#6ee7b7"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              {{
                binaryCutStep === 1
                  ? "Pages 250-500"
                  : binaryCutStep === 2
                    ? "Pages 125-250"
                    : binaryCutStep === 3
                      ? "Pages 63-125"
                      : "Pages 43-62"
              }}
            </text>
          </g>

          <!-- Step 4 Base Case Target Hit -->
          <g v-if="binaryCutStep >= 4" transform="translate(42, 20)">
            <rect
              x="0"
              y="0"
              width="98"
              height="36"
              rx="2.5"
              fill="#022c22"
              stroke="#34d399"
              stroke-width="1.5"
            />
            <text
              x="49"
              y="17"
              fill="#a7f3d0"
              font-size="1.8"
              font-family="monospace"
              text-anchor="middle"
            >
              FOUND IN 4 SPLITS!
            </text>
            <text
              x="49"
              y="25"
              fill="#ffffff"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              PAGE 42: QUANTUM
            </text>
          </g>

          <!-- Splits Telemetry Panel -->
          <rect
            x="272"
            y="14"
            width="28"
            height="48"
            rx="2"
            fill="#064e3b"
            stroke="#10b981"
            stroke-width="0.8"
          />
          <text
            x="286"
            y="32"
            fill="#a7f3d0"
            font-size="1.8"
            font-family="monospace"
            text-anchor="middle"
          >
            CUTS
          </text>
          <text
            x="286"
            y="44"
            fill="#ffffff"
            font-size="2"
            font-family="monospace"
            font-weight="bold"
            text-anchor="middle"
          >
            {{ binaryCutStep }} / 4
          </text>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes flowFast {
  to {
    stroke-dashoffset: -20;
  }
}

.animate-flow-fast {
  animation: flowFast 0.5s linear infinite;
}
</style>
