<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

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
  { id: "oregano", name: "OREGANO", fill: "#15803d", cap: "#14532d", isTarget: true },
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
    // Dijkstra: Hugs highway bypass swiftly (0 to 3)
    timerOptimal = setInterval(() => {
      if (dijkstraStep.value < 3) {
        dijkstraStep.value++;
      } else {
        if (timerOptimal) clearInterval(timerOptimal);
      }
    }, 320);

    // BFS: Concentric waves expand blindly everywhere (0 to 5)
    timerLinear = setInterval(() => {
      if (bfsStep.value < 5) {
        bfsStep.value++;
      } else {
        if (timerLinear) clearInterval(timerLinear);
        isRunning.value = false;
      }
    }, 400);
  } else {
    // Library:
    // Binary split: cuts in half 4 times
    timerOptimal = setInterval(() => {
      if (binaryCutStep.value < 4) {
        binaryCutStep.value++;
      } else {
        if (timerOptimal) clearInterval(timerOptimal);
      }
    }, 380);

    // Linear page flip: flips sequentially page-by-page to 42
    timerLinear = setInterval(() => {
      if (linearFlipPage.value < 42) {
        linearFlipPage.value += 7;
        if (linearFlipPage.value > 42) linearFlipPage.value = 42;
      } else {
        if (timerLinear) clearInterval(timerLinear);
        isRunning.value = false;
      }
    }, 320);
  }
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
            <span class="font-bold text-rose-300"
              >Linear Shelf Walk O(n)</span
            >
            <span class="text-[10px] text-slate-500"
              >(Dark Pantry: Checks jar by jar)</span
            >
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
                class="animate-bounce"
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
              font-size="3.5"
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
              font-size="4.5"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              &cross;
            </text>
            <text
              v-else-if="idx === targetJarIndex && cookingLinearIdx >= targetJarIndex"
              x="12"
              y="56"
              fill="#10b981"
              font-size="4.5"
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
            <span class="text-[10px] text-slate-500"
              >(Hash function maps "Oregano" &rarr; Slot 6 directly)</span
            >
          </div>
          <div class="text-[10.5px] font-bold text-emerald-400">
            Checks: 1 Direct Hit &bull; Time: 12 ms
          </div>
        </div>

        <!-- Carousel / Direct Slot Bar -->
        <svg class="w-full h-24" viewBox="0 0 310 75">
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
              y="-7"
              :fill="jar.isTarget && cookingHashHit ? '#000000' : '#94a3b8'"
              font-size="4"
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
              font-size="3.5"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              {{ jar.name }}
            </text>

            <!-- Target Extracted Badge -->
            <g v-if="jar.isTarget && cookingHashHit" transform="translate(4, -20)">
              <rect
                x="0"
                y="0"
                width="16"
                height="7"
                rx="1.5"
                fill="#10b981"
              />
              <text
                x="8"
                y="5"
                fill="#ffffff"
                font-size="4"
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
              :class="{ 'animate-ping': isRunning && bfsStep < 5 }"
            ></span>
            <span class="font-bold text-rose-300"
              >Unweighted BFS (Breadth-First Search)</span
            >
            <span class="text-[10px] text-slate-500"
              >(Blind hop count: explores all directions &amp; traffic)</span
            >
          </div>
          <div class="text-[10.5px] font-bold text-rose-400">
            Nodes Explored: {{ (bfsStep + 1) * 3 }} &bull; Wasted in Traffic:
            {{ bfsStep >= 2 ? 6 : 0 }}
          </div>
        </div>

        <!-- BFS Grid SVG -->
        <svg class="w-full h-24" viewBox="0 0 310 75">
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

          <!-- Central Road Jam (High cost bottleneck = 10) -->
          <rect
            x="110"
            y="26"
            width="90"
            height="22"
            rx="3"
            fill="#450a0a"
            stroke="#dc2626"
            stroke-width="1"
          />
          <text
            x="155"
            y="39"
            fill="#fca5a5"
            font-size="4.5"
            font-family="monospace"
            font-weight="bold"
            text-anchor="middle"
          >
            TRAFFIC JAM (Cost 10)
          </text>

          <!-- North Highway Bypass Edge -->
          <path
            d="M 30,37 Q 155,-5 280,37"
            fill="none"
            stroke="#334155"
            stroke-width="2"
          />
          <text
            x="155"
            y="12"
            fill="#64748b"
            font-size="4"
            font-family="monospace"
            text-anchor="middle"
          >
            Highway Bypass (Cost 2)
          </text>

          <!-- Concentric BFS Circular Wavefronts (blindly expanding) -->
          <circle
            cx="30"
            cy="37"
            :r="bfsStep * 28"
            fill="none"
            stroke="#f43f5e"
            stroke-width="1.5"
            stroke-dasharray="3 3"
            class="transition-all duration-300 opacity-60"
          />

          <!-- Start Node S -->
          <circle cx="30" cy="37" r="7" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
          <text
            x="30"
            y="39"
            fill="#ffffff"
            font-size="4.5"
            font-family="monospace"
            font-weight="bold"
            text-anchor="middle"
          >
            S
          </text>

          <!-- Center Jam Nodes explored by BFS -->
          <circle
            cx="135"
            cy="37"
            r="4"
            :fill="bfsStep >= 2 ? '#ef4444' : '#334155'"
          />
          <circle
            cx="175"
            cy="37"
            r="4"
            :fill="bfsStep >= 3 ? '#ef4444' : '#334155'"
          />

          <!-- Goal Node G -->
          <circle
            cx="280"
            cy="37"
            r="7"
            :fill="bfsStep >= 5 ? '#f59e0b' : '#1e293b'"
            stroke="#f59e0b"
            stroke-width="1.5"
          />
          <text
            x="280"
            y="39"
            fill="#ffffff"
            font-size="4.5"
            font-family="monospace"
            font-weight="bold"
            text-anchor="middle"
          >
            G
          </text>

          <!-- Wave status -->
          <text
            x="30"
            y="65"
            fill="#f43f5e"
            font-size="4.5"
            font-family="monospace"
          >
            BFS Wave {{ bfsStep }} / 5 &rarr; Stuck checking congested center!
          </text>
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
              :class="{ 'animate-ping': dijkstraStep >= 3 }"
            ></span>
            <span class="font-bold text-emerald-300"
              >Dijkstra's Shortest Path (Weighted)</span
            >
            <span class="text-[10px] text-slate-500"
              >(Priority Queue favors cheapest highway, bypasses traffic)</span
            >
          </div>
          <div class="text-[10.5px] font-bold text-emerald-400">
            Total Path Cost: 8 &bull; Skips 100% of Traffic
          </div>
        </div>

        <!-- Dijkstra Grid SVG -->
        <svg class="w-full h-24" viewBox="0 0 310 75">
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
            x="110"
            y="26"
            width="90"
            height="22"
            rx="3"
            fill="#1f1315"
            stroke="#451a1a"
            stroke-width="0.8"
            opacity="0.6"
          />
          <text
            x="155"
            y="39"
            fill="#7f1d1d"
            font-size="4.5"
            font-family="monospace"
            text-anchor="middle"
          >
            TRAFFIC JAM (Skipped by Priority Q)
          </text>

          <!-- North Highway Flowing Active Path -->
          <path
            d="M 30,37 Q 155,-5 280,37"
            fill="none"
            :stroke="dijkstraStep >= 1 ? '#10b981' : '#334155'"
            stroke-width="2.5"
            :stroke-dasharray="dijkstraStep >= 3 ? 'none' : '4 3'"
          />
          <text
            x="155"
            y="12"
            fill="#34d399"
            font-size="4"
            font-family="monospace"
            font-weight="bold"
            text-anchor="middle"
          >
            Fast Highway Arc (Cost = 2 &bull; Prioritized!)
          </text>

          <!-- Start Node S -->
          <circle cx="30" cy="37" r="7" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
          <text
            x="30"
            y="39"
            fill="#ffffff"
            font-size="4.5"
            font-family="monospace"
            font-weight="bold"
            text-anchor="middle"
          >
            S
          </text>

          <!-- Highway Waypoint Nodes -->
          <circle
            cx="95"
            cy="19"
            r="4.5"
            :fill="dijkstraStep >= 1 ? '#10b981' : '#334155'"
          />
          <circle
            cx="155"
            cy="15"
            r="4.5"
            :fill="dijkstraStep >= 2 ? '#10b981' : '#334155'"
          />
          <circle
            cx="215"
            cy="19"
            r="4.5"
            :fill="dijkstraStep >= 3 ? '#10b981' : '#334155'"
          />

          <!-- Goal Node G -->
          <circle
            cx="280"
            cy="37"
            r="7"
            :fill="dijkstraStep >= 3 ? '#10b981' : '#1e293b'"
            stroke="#34d399"
            stroke-width="2"
          />
          <text
            x="280"
            y="39"
            fill="#ffffff"
            font-size="4.5"
            font-family="monospace"
            font-weight="bold"
            text-anchor="middle"
          >
            G
          </text>

          <!-- Result Tag -->
          <g v-if="dijkstraStep >= 3" transform="translate(245, 52)">
            <rect x="0" y="0" width="35" height="9" rx="1.5" fill="#059669" />
            <text
              x="17.5"
              y="6.5"
              fill="#ffffff"
              font-size="4"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              OPTIMAL PATH!
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
            <span class="text-[10px] text-slate-500"
              >(Flipping 1 page at a time from page 1)</span
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
            y="26"
            fill="#64748b"
            font-size="4"
            font-family="monospace"
            text-anchor="middle"
          >
            Page 1: Introduction
          </text>
          <line x1="55" y1="32" x2="140" y2="32" stroke="#cbd5e1" stroke-width="1" />
          <line x1="55" y1="38" x2="140" y2="38" stroke="#cbd5e1" stroke-width="1" />
          <line x1="55" y1="44" x2="120" y2="44" stroke="#cbd5e1" stroke-width="1" />

          <!-- Center Spine Crease -->
          <line x1="150" y1="12" x2="150" y2="64" stroke="#475569" stroke-width="3" />

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
            y="26"
            fill="#334155"
            font-size="4.5"
            font-family="monospace"
            font-weight="bold"
            text-anchor="middle"
          >
            {{
              linearFlipPage >= 42
                ? 'Page 42: QUANTUM HIT!'
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
          <rect x="262" y="16" width="38" height="44" rx="2" fill="#1e1b4b" stroke="#6366f1" stroke-width="0.8" />
          <text x="281" y="27" fill="#a5b4fc" font-size="3.5" font-family="monospace" text-anchor="middle">CURRENT</text>
          <text x="281" y="42" fill="#ffffff" font-size="5" font-family="monospace" font-weight="bold" text-anchor="middle">
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
            <span class="text-[10px] text-slate-500"
              >(Splits 500 pages in half: 250 &rarr; 125 &rarr; 62 &rarr; 42)</span
            >
          </div>
          <div class="text-[10.5px] font-bold text-emerald-400">
            Splits: {{ binaryCutStep }} / 4 &bull; 458 Pages Discarded
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
          <line x1="150" y1="12" x2="150" y2="64" stroke="#475569" stroke-width="3" />

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

          <!-- Active Search Chunk Banner -->
          <g v-if="binaryCutStep >= 1" transform="translate(160, 24)">
            <rect x="0" y="0" width="85" height="15" rx="2" fill="#064e3b" stroke="#10b981" stroke-width="0.8" />
            <text x="42.5" y="10" fill="#a7f3d0" font-size="4" font-family="monospace" font-weight="bold" text-anchor="middle">
              Cut 1: Discard Pages 250-500
            </text>
          </g>

          <!-- Step 4 Base Case Target Hit -->
          <g v-if="binaryCutStep >= 4" transform="translate(42, 20)">
            <rect x="0" y="0" width="98" height="36" rx="2.5" fill="#022c22" stroke="#34d399" stroke-width="1.5" />
            <text x="49" y="12" fill="#a7f3d0" font-size="4" font-family="monospace" text-anchor="middle">
              TARGET ISOLATED IN 4 SPLITS!
            </text>
            <text x="49" y="24" fill="#ffffff" font-size="5" font-family="monospace" font-weight="bold" text-anchor="middle">
              PAGE 42: QUANTUM
            </text>
            <circle cx="49" cy="30" r="3" fill="#10b981" />
          </g>

          <!-- Splits Telemetry Panel -->
          <rect x="272" y="14" width="28" height="48" rx="2" fill="#064e3b" stroke="#10b981" stroke-width="0.8" />
          <text x="286" y="26" fill="#a7f3d0" font-size="3.5" font-family="monospace" text-anchor="middle">CUTS</text>
          <text x="286" y="42" fill="#ffffff" font-size="5" font-family="monospace" font-weight="bold" text-anchor="middle">
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
