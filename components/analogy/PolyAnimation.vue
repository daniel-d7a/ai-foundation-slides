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

const activeIndex = ref(0);
let autoCycleTimer: ReturnType<typeof setInterval> | null = null;

// ==========================================
// 1. COOKING DOMAIN: Stand Mixer Attachments
// ==========================================
const cookingAttachments = [
  {
    id: "whisk",
    title: "Wire Whisk",
    shortName: "Whisk",
    icon: "i-lucide-sparkles",
    color: "#38bdf8",
    textColor: "text-sky-400",
    borderColor: "border-sky-500/50",
    badgeClass: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    implClass: "class WireWhisk implements KitchenAttachment",
    methodCall: "whisk.process(bowlContents)",
    mechanics: "2,400 RPM Orbital Planetary Spin",
    actionText: "Whips air into egg whites & cream -> Stiff Meringue Foam",
    speedRpm: 2400,
    physicsNote: "Aerates liquids into high-volume froth",
  },
  {
    id: "dough",
    title: "Spiral Dough Hook",
    shortName: "Dough Hook",
    icon: "i-lucide-repeat",
    color: "#fbbf24",
    textColor: "text-amber-400",
    borderColor: "border-amber-500/50",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    implClass: "class DoughHook implements KitchenAttachment",
    methodCall: "doughHook.process(bowlContents)",
    mechanics: "160 RPM High-Torque Planetary Torsion",
    actionText: "Folds flour & water -> Elastic Gluten Bread Matrix",
    speedRpm: 160,
    physicsNote: "High torque stretching and folding",
  },
  {
    id: "slicer",
    title: "Rotary Slicer Disc",
    shortName: "Slicer Disc",
    icon: "i-lucide-scissors",
    color: "#f43f5e",
    textColor: "text-rose-400",
    borderColor: "border-rose-500/50",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    implClass: "class SlicerDisc implements KitchenAttachment",
    methodCall: "slicerDisc.process(bowlContents)",
    mechanics: "1,200 RPM Centrifugal Shear",
    actionText: "Cross-cuts vegetables -> 2mm Uniform Crisp Coins",
    speedRpm: 1200,
    physicsNote: "High-speed sharp razor disc slicing",
  },
];

// ==========================================
// 2. MAPS DOMAIN: Navigation Route Strategies
// ==========================================
const mapStrategies = [
  {
    id: "car",
    title: "Highway Car",
    shortName: "Drive",
    icon: "i-lucide-car",
    color: "#ec4899",
    textColor: "text-pink-400",
    borderColor: "border-pink-500/50",
    badgeClass: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    implClass: "class CarRouter implements RouteStrategy",
    methodCall: "carRouter.calculate(pointA, pointB)",
    path: "M 60,140 C 110,40 210,30 280,30 C 370,30 440,40 500,55",
    vehicleDur: "2.8s",
    mechanics: "A* Live Traffic Graph & Highway Speeds",
    actionText: "Uses expressways & suspension bridge (65 mph)",
    telemetry: "24 mins • 14.8 mi • Highway bypass",
  },
  {
    id: "subway",
    title: "Metro Rail",
    shortName: "Subway",
    icon: "i-lucide-train-front",
    color: "#fbbf24",
    textColor: "text-amber-400",
    borderColor: "border-amber-500/50",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    implClass: "class SubwayRouter implements RouteStrategy",
    methodCall: "subwayRouter.calculate(pointA, pointB)",
    path: "M 60,140 L 180,115 L 300,90 L 410,70 L 500,55",
    vehicleDur: "3.4s",
    mechanics: "Fixed Schedule Timetable & Track Topology",
    actionText: "Snaps to subterranean subway tunnels & 3 lit hubs",
    telemetry: "18 mins • 3 stops • Zero street traffic",
  },
  {
    id: "walk",
    title: "Park Greenway",
    shortName: "Walk",
    icon: "i-lucide-footprints",
    color: "#10b981",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/50",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    implClass: "class WalkRouter implements RouteStrategy",
    methodCall: "walkRouter.calculate(pointA, pointB)",
    path: "M 60,140 C 120,175 200,175 270,160 C 350,145 440,110 500,55",
    vehicleDur: "4.2s",
    mechanics: "Sidewalk Mesh & Pedestrian Crossings",
    actionText: "Follows tree-lined riverside trail & footbridges",
    telemetry: "50 mins • 2.2 mi • 0 emissions",
  },
];

// ==========================================
// 3. LIBRARY DOMAIN: Self-Checkout Kiosk
// ==========================================
const libraryItems = [
  {
    id: "book",
    title: "Hardcover Book",
    shortName: "Paper Book",
    icon: "i-lucide-book-open",
    color: "#6366f1",
    textColor: "text-indigo-400",
    borderColor: "border-indigo-500/50",
    badgeClass: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    implClass: "class PhysicalBook implements BorrowableItem",
    methodCall: "book.processCheckout(patron)",
    mechanics: "Barcode Scan + Electromagnetic Degausser",
    actionText: "Demagnetizes security spine RFID; prints 21-day paper slip",
    resultBadge: "Security Gate Deactivated (21 Days)",
    formatType: "Physical Medium",
  },
  {
    id: "disc",
    title: "Audiobook CD",
    shortName: "Media Disc",
    icon: "i-lucide-disc",
    color: "#f59e0b",
    textColor: "text-amber-400",
    borderColor: "border-amber-500/50",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    implClass: "class MediaDisc implements BorrowableItem",
    methodCall: "disc.processCheckout(patron)",
    mechanics: "Solenoid Unlock Pin + Optical Surface Scan",
    actionText: "Unlatches tamper-proof case; inspects disc for scratches",
    resultBadge: "Clamshell Lock Opened (14 Days)",
    formatType: "Protected Media",
  },
  {
    id: "ebook",
    title: "Digital E-Reader",
    shortName: "Digital E-Book",
    icon: "i-lucide-tablet",
    color: "#06b6d4",
    textColor: "text-cyan-400",
    borderColor: "border-cyan-500/50",
    badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    implClass: "class DigitalEBook implements BorrowableItem",
    methodCall: "ebook.processCheckout(patron)",
    mechanics: "Wireless Over-the-Air Cloud DRM Provisioning",
    actionText: "Syncs encrypted EPUB license via WiFi; auto-revokes in 7 days",
    resultBadge: "Cloud DRM Lease Pushed (7 Days)",
    formatType: "Digital Cloud Token",
  },
];

// Current active object for active domain
const currentCooking = computed(
  () => cookingAttachments[activeIndex.value] || cookingAttachments[0],
);
const currentMap = computed(
  () => mapStrategies[activeIndex.value] || mapStrategies[0],
);
const currentLibrary = computed(
  () => libraryItems[activeIndex.value] || libraryItems[0],
);

function selectIndex(idx: number) {
  activeIndex.value = idx;
}

function startAutoCycle() {
  if (autoCycleTimer) clearInterval(autoCycleTimer);
  autoCycleTimer = setInterval(() => {
    if (props.isPlaying) {
      activeIndex.value = (activeIndex.value + 1) % 3;
    }
  }, 3200);
}

watch(
  () => props.domain,
  () => {
    activeIndex.value = 0;
  },
);

watch(
  () => props.isPlaying,
  (playing) => {
    if (!playing && autoCycleTimer) {
      clearInterval(autoCycleTimer);
      autoCycleTimer = null;
    } else if (playing) {
      startAutoCycle();
    }
  },
);

onMounted(() => {
  startAutoCycle();
});

onUnmounted(() => {
  if (autoCycleTimer) clearInterval(autoCycleTimer);
});
</script>

<template>
  <div class="h-full flex flex-col justify-between select-none">
    <!-- ======================================================= -->
    <!-- 1. COOKING DOMAIN: Universal Kitchen Stand Mixer Hub    -->
    <!-- ======================================================= -->
    <div
      v-if="domain === 'cooking'"
      class="flex flex-col justify-between h-full gap-2"
    >
      <!-- Top Control Bar -->
      <div
        class="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800"
      >
        <div class="flex items-center gap-2">
          <span
            class="text-[10px] font-mono text-slate-400 uppercase font-semibold"
            >Contract:</span
          >
          <span
            class="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/50 text-indigo-300 font-mono text-[11px] font-bold"
          >
            standMixer.run(KitchenAttachment tool)
          </span>
        </div>

        <!-- 3 Attachment Selector Buttons -->
        <div class="flex items-center gap-1.5">
          <button
            v-for="(att, idx) in cookingAttachments"
            :key="att.id"
            @click="selectIndex(idx)"
            class="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-mono transition-all cursor-pointer border"
            :class="[
              activeIndex === idx
                ? `${att.badgeClass} font-bold shadow-sm scale-105`
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200',
            ]"
          >
            <span :class="att.icon" class="w-3.5 h-3.5"></span>
            <span>{{ att.shortName }}</span>
          </button>
        </div>
      </div>

      <!-- Main Visual Stage: Stand Mixer Base & Dynamic Tool Attachment Canvas -->
      <div
        class="relative w-full h-[245px] rounded-xl bg-slate-950 border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center p-3"
      >
        <svg class="w-full h-full" viewBox="0 0 540 200">
          <defs>
            <!-- Motor base metallic gradient -->
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#334155" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>

            <!-- Stainless Bowl Gradient -->
            <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="50%" stop-color="#475569" />
              <stop offset="100%" stop-color="#1e293b" />
            </linearGradient>

            <!-- Foam Glow Filter -->
            <filter id="foamGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- 1. Stand Mixer Power Machine (The Caller) -->
          <!-- Heavy Cast-Iron Base Plate -->
          <rect
            x="25"
            y="172"
            width="220"
            height="18"
            rx="6"
            fill="#1e293b"
            stroke="#475569"
            stroke-width="1.5"
          />
          <rect x="35" y="174" width="200" height="4" rx="2" fill="#334155" />

          <!-- Vertical Motor Column -->
          <path
            d="M 45,172 L 55,60 Q 60,40 85,38 L 135,38 L 135,172 Z"
            fill="url(#metalGrad)"
            stroke="#475569"
            stroke-width="1.5"
          />

          <!-- Overhanging Cantilever Mixer Head -->
          <path
            d="M 80,38 L 225,38 Q 235,38 238,48 L 235,78 Q 230,86 215,86 L 125,86 Z"
            fill="url(#metalGrad)"
            stroke="#64748b"
            stroke-width="1.5"
          />

          <!-- Speed Control Rotary Knob -->
          <circle
            cx="85"
            cy="62"
            r="14"
            fill="#0f172a"
            stroke="#64748b"
            stroke-width="1.5"
          />
          <line
            x1="85"
            y1="62"
            :x2="85 + 10 * Math.cos(activeIndex * 1.5 - 0.7)"
            :y2="62 + 10 * Math.sin(activeIndex * 1.5 - 0.7)"
            stroke="#38bdf8"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <text
            x="85"
            y="86"
            fill="#94a3b8"
            font-size="2"
            font-family="monospace"
            text-anchor="middle"
          >
            SPEED {{ activeIndex + 1 }}
          </text>

          <!-- Universal Drive Shaft Socket (The Interface Contract Socket) -->
          <g transform="translate(195, 86)">
            <rect
              x="-10"
              y="0"
              width="20"
              height="12"
              rx="2"
              fill="#0f172a"
              stroke="#38bdf8"
              stroke-width="1.5"
            />
            <!-- Interface Label Pill -->
            <rect
              x="-38"
              y="-18"
              width="76"
              height="14"
              rx="3"
              fill="#1e1b4b"
              stroke="#6366f1"
              stroke-width="1"
            />
            <text
              x="0"
              y="-8"
              fill="#a5b4fc"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
              text-anchor="middle"
            >
              TOOL SOCKET
            </text>
            <!-- Power connection spark -->
            <circle cx="0" cy="6" r="3" fill="#38bdf8" class="animate-ping" />
          </g>

          <!-- 2. Mixing Bowl Under the Head -->
          <ellipse cx="195" cy="180" rx="60" ry="10" fill="#090d16" />
          <path
            d="M 135,115 C 135,175 160,182 195,182 C 230,182 255,175 255,115 Z"
            fill="url(#bowlGrad)"
            fill-opacity="0.5"
            stroke="#64748b"
            stroke-width="1.5"
          />
          <!-- Bowl Rim -->
          <ellipse
            cx="195"
            cy="115"
            rx="60"
            ry="10"
            fill="none"
            stroke="#94a3b8"
            stroke-width="2"
          />

          <!-- ================= ATTACHMENT 1: WIRE WHISK (High-Speed Whip) ================= -->
          <g v-if="activeIndex === 0" transform="translate(195, 98)">
            <!-- Attachment Shaft -->
            <rect
              x="-3"
              y="0"
              width="6"
              height="24"
              rx="1.5"
              fill="#94a3b8"
              stroke="#cbd5e1"
              stroke-width="1"
            />

            <!-- Rapidly spinning wire balloon loops -->
            <g
              class="animate-spin"
              style="transform-origin: 0px 42px; animation-duration: 0.22s"
            >
              <!-- Outer wire loops -->
              <ellipse
                cx="0"
                cy="42"
                rx="22"
                ry="26"
                fill="none"
                stroke="#e2e8f0"
                stroke-width="1.5"
              />
              <ellipse
                cx="0"
                cy="42"
                rx="12"
                ry="26"
                fill="none"
                stroke="#cbd5e1"
                stroke-width="1.2"
              />
              <line
                x1="0"
                y1="16"
                x2="0"
                y2="68"
                stroke="#94a3b8"
                stroke-width="1.5"
              />
            </g>

            <!-- Rising Frothy Egg White Foam in Bowl -->
            <g transform="translate(0, 52)">
              <ellipse
                cx="0"
                cy="14"
                rx="46"
                ry="12"
                fill="#ffffff"
                fill-opacity="0.85"
                filter="url(#foamGlow)"
              />
              <!-- Fluffy peak clouds -->
              <circle cx="-24" cy="6" r="9" fill="#f8fafc" />
              <circle cx="-8" cy="2" r="12" fill="#ffffff" />
              <circle cx="12" cy="4" r="11" fill="#f8fafc" />
              <circle cx="26" cy="8" r="8" fill="#ffffff" />
              <!-- Aeration Bubbles -->
              <circle
                cx="-16"
                cy="12"
                r="2.5"
                fill="#e0f2fe"
                stroke="#38bdf8"
                stroke-width="0.8"
                class="animate-ping"
              />
              <circle
                cx="18"
                cy="10"
                r="2"
                fill="#e0f2fe"
                stroke="#38bdf8"
                stroke-width="0.8"
                class="animate-ping"
                style="animation-delay: 0.15s"
              />
            </g>
          </g>

          <!-- ================= ATTACHMENT 2: SPIRAL DOUGH HOOK (High-Torque Knead) ================= -->
          <g v-else-if="activeIndex === 1" transform="translate(195, 98)">
            <!-- Attachment Shaft -->
            <rect
              x="-3"
              y="0"
              width="6"
              height="20"
              rx="1.5"
              fill="#f59e0b"
              stroke="#fbbf24"
              stroke-width="1"
            />

            <!-- Slow, powerful corkscrew hook rotating -->
            <g class="animate-pulse" style="animation-duration: 0.8s">
              <!-- Spiral hook path -->
              <path
                d="M 0,20 C 15,22 18,32 10,40 C -4,48 -14,56 -2,66 C 8,72 16,68 18,62"
                fill="none"
                stroke="#fbbf24"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>

            <!-- Kneading Elastic Dough Ball in Bowl -->
            <g transform="translate(0, 56)">
              <!-- Dough mass shape -->
              <path
                d="M -42,16 Q -35,-4 -12,2 Q 6,6 24,-2 Q 44,10 40,22 Q 22,26 -2,26 Q -32,26 -42,16 Z"
                fill="#d97706"
                stroke="#f59e0b"
                stroke-width="2"
              />
              <!-- Dough surface stretch lines (gluten formation) -->
              <path
                d="M -26,12 Q -10,4 10,8"
                fill="none"
                stroke="#fef3c7"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M -18,18 Q 2,12 24,14"
                fill="none"
                stroke="#fef3c7"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </g>
          </g>

          <!-- ================= ATTACHMENT 3: ROTARY SLICER DISC (Centrifugal Cut) ================= -->
          <g v-else transform="translate(195, 98)">
            <!-- Attachment Shaft -->
            <rect
              x="-3"
              y="0"
              width="6"
              height="18"
              rx="1.5"
              fill="#94a3b8"
              stroke="#f43f5e"
              stroke-width="1"
            />

            <!-- Fast spinning razor cutting disc -->
            <g transform="translate(0, 22)">
              <ellipse
                cx="0"
                cy="0"
                rx="42"
                ry="7"
                fill="#334155"
                stroke="#f43f5e"
                stroke-width="2"
              />
              <!-- Rotary blade slits -->
              <line
                x1="-30"
                y1="-2"
                x2="30"
                y2="2"
                stroke="#ffffff"
                stroke-width="2"
                class="animate-spin"
                style="transform-origin: 0px 0px; animation-duration: 0.15s"
              />
              <line
                x1="-2"
                y1="-5"
                x2="2"
                y2="5"
                stroke="#f43f5e"
                stroke-width="1.5"
              />
            </g>

            <!-- Whole Carrot descending through chute -->
            <g transform="translate(14, -6)">
              <polygon
                points="-6,0 6,0 3,24 -3,24"
                fill="#ea580c"
                stroke="#c2410c"
                stroke-width="1"
              />
              <rect
                x="-8"
                y="-12"
                width="16"
                height="12"
                fill="none"
                stroke="#94a3b8"
                stroke-width="1"
                stroke-dasharray="2 2"
              />
            </g>

            <!-- Sliced Vegetable Discs falling into bowl -->
            <g transform="translate(0, 48)">
              <!-- Stacking crisp cucumber / carrot coins -->
              <ellipse
                cx="-20"
                cy="18"
                rx="10"
                ry="4"
                fill="#ea580c"
                stroke="#fed7aa"
                stroke-width="1"
              />
              <ellipse
                cx="-4"
                cy="14"
                rx="11"
                ry="4.5"
                fill="#ea580c"
                stroke="#fed7aa"
                stroke-width="1"
              />
              <ellipse
                cx="14"
                cy="16"
                rx="9.5"
                ry="4"
                fill="#ea580c"
                stroke="#fed7aa"
                stroke-width="1"
              />
              <!-- Flying coin just sliced -->
              <ellipse
                cx="6"
                cy="2"
                rx="9"
                ry="3.5"
                fill="#f97316"
                stroke="#ffffff"
                stroke-width="1.2"
                class="animate-pulse"
                style="animation-duration: 0.6s"
              />
            </g>
          </g>

          <!-- 3. Right Side: Telemetry & Polymorphic Execution Architecture Panel -->
          <g transform="translate(285, 20)">
            <!-- Container Box -->
            <rect
              x="0"
              y="0"
              width="275"
              height="162"
              rx="8"
              fill="#090d16"
              stroke="#1e293b"
              stroke-width="1.2"
            />

            <!-- Header: Implementation Details -->
            <rect
              x="8"
              y="10"
              width="255"
              height="24"
              rx="4"
              fill="#0f172a"
              stroke="#334155"
              stroke-width="1"
            />
            <circle cx="20" cy="22" r="4" :fill="currentCooking.color" />
            <text
              x="32"
              y="26"
              fill="#f8fafc"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
            >
              {{ currentCooking.implClass }}
            </text>

            <!-- Invocation Line -->
            <text
              x="12"
              y="52"
              fill="#94a3b8"
              font-size="2"
              font-family="monospace"
            >
              Invoked via:
              <tspan fill="#38bdf8">mixer.run()</tspan>
            </text>

            <rect
              x="10"
              y="60"
              width="255"
              height="24"
              rx="4"
              fill="#1e1b4b"
              stroke="#4338ca"
              stroke-width="1"
            />
            <text
              x="20"
              y="76"
              fill="#a5b4fc"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
            >
              &gt; {{ currentCooking.methodCall }}
            </text>

            <!-- Physical Specs & Mechanics -->
            <text
              x="12"
              y="102"
              fill="#cbd5e1"
              font-size="2"
              font-family="monospace"
            >
              Speed:
              <tspan :fill="currentCooking.color" font-weight="bold">
                {{ currentCooking.mechanics }}
              </tspan>
            </text>

            <text
              x="12"
              y="122"
              fill="#94a3b8"
              font-size="2"
              font-family="sans-serif"
            >
              Effect:
              <tspan fill="#e2e8f0" font-weight="bold">
                {{ currentCooking.actionText }}
              </tspan>
            </text>

            <!-- Polymorphic Note Box -->
            <rect
              x="10"
              y="132"
              width="255"
              height="22"
              rx="4"
              fill="#0f172a"
              stroke="#1e293b"
              stroke-width="1"
            />
            <text
              x="18"
              y="147"
              fill="#38bdf8"
              font-size="2"
              font-family="monospace"
            >
              &check; 1 Motor Button &bull; 0 if/else Statements
            </text>
          </g>
        </svg>

        <!-- Floating Live Status Badge -->
        <div
          class="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] font-mono flex items-center gap-2 backdrop-blur-sm"
        >
          <span
            :class="[currentCooking.icon, currentCooking.textColor]"
            class="w-3.5 h-3.5"
          ></span>
          <span class="text-white font-bold">{{ currentCooking.title }}</span>
          <span class="text-slate-500">|</span>
          <span class="text-slate-300">{{ currentCooking.physicsNote }}</span>
        </div>
      </div>

      <!-- Bottom Polymorphic Architectural Comparison -->
      <div class="grid grid-cols-12 gap-2 text-xs font-mono">
        <div
          class="col-span-6 p-2 rounded-lg bg-slate-900/90 border border-indigo-500/30 flex items-center justify-between"
        >
          <span
            class="text-[10px] text-indigo-400 font-bold flex items-center gap-1"
          >
            <span class="i-lucide-code-2 w-3.5 h-3.5"></span>
            <span>Caller Code:</span>
          </span>
          <span class="text-[10.5px] text-slate-200 font-mono">
            mixer.start() { this.tool.process(bowl); }
          </span>
        </div>

        <div
          class="col-span-6 p-2 rounded-lg bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between"
        >
          <span
            class="text-[10px] text-emerald-400 font-bold flex items-center gap-1"
          >
            <span class="i-lucide-check-circle-2 w-3.5 h-3.5"></span>
            <span>Core Lesson:</span>
          </span>
          <span class="text-[10px] text-slate-300">
            Tool defines the behavior.
          </span>
        </div>
      </div>
    </div>

    <!-- ======================================================= -->
    <!-- 2. MAPS DOMAIN: GPS & Dynamic Navigation Engine         -->
    <!-- ======================================================= -->
    <div
      v-else-if="domain === 'maps'"
      class="flex flex-col justify-between h-full gap-2"
    >
      <!-- Top Control Bar -->
      <div
        class="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800"
      >
        <div class="flex items-center gap-2">
          <span
            class="text-[10px] font-mono text-slate-400 uppercase font-semibold"
            >Contract:</span
          >
          <span
            class="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/50 text-indigo-300 font-mono text-[11px] font-bold"
          >
            navigator.getRoute(Point_A, Point_B)
          </span>
        </div>

        <!-- 3 Travel Mode Selector Buttons -->
        <div class="flex items-center gap-1.5">
          <button
            v-for="(mode, idx) in mapStrategies"
            :key="mode.id"
            @click="selectIndex(idx)"
            class="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-mono transition-all cursor-pointer border"
            :class="[
              activeIndex === idx
                ? `${mode.badgeClass} font-bold shadow-sm scale-105`
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200',
            ]"
          >
            <span :class="mode.icon" class="w-3.5 h-3.5"></span>
            <span>{{ mode.shortName }}</span>
          </button>
        </div>
      </div>

      <!-- Main Visual Stage: City Map with 3 Dynamic Routes & Animated Glider -->
      <div
        class="relative w-full h-[245px] rounded-xl bg-slate-950 border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center"
      >
        <svg
          class="w-full h-full"
          viewBox="0 0 540 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waterFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0c2538" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#061826" stop-opacity="0.9" />
            </linearGradient>

            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- 1. City Grid Lines & City Blocks -->
          <g stroke="#1e293b" stroke-width="1" stroke-dasharray="3 5">
            <line x1="70" y1="0" x2="70" y2="200" />
            <line x1="150" y1="0" x2="150" y2="200" />
            <line x1="230" y1="0" x2="230" y2="200" />
            <line x1="310" y1="0" x2="310" y2="200" />
            <line x1="390" y1="0" x2="390" y2="200" />
            <line x1="470" y1="0" x2="470" y2="200" />
            <line x1="0" y1="50" x2="540" y2="50" />
            <line x1="0" y1="100" x2="540" y2="100" />
            <line x1="0" y1="150" x2="540" y2="150" />
          </g>

          <!-- 2. Winding City River -->
          <path
            d="M 120,0 Q 200,90 270,110 T 430,200 L 465,200 Q 300,110 230,90 T 150,0 Z"
            fill="url(#waterFlow)"
            stroke="#0284c7"
            stroke-width="0.8"
            stroke-opacity="0.4"
          />


          <!-- 4. Bridges over the river -->
          <!-- Highway Suspension Bridge (North) -->
          <line
            x1="205"
            y1="28"
            x2="225"
            y2="35"
            stroke="#94a3b8"
            stroke-width="4"
            stroke-linecap="round"
          />
          <!-- Pedestrian Footbridge (South) -->
          <line
            x1="340"
            y1="135"
            x2="360"
            y2="145"
            stroke="#10b981"
            stroke-width="2.5"
            stroke-linecap="round"
          />

          <!-- 5. Inactive Alternative Paths (Faint Ghost Dotted Lines) -->
          <path
            v-for="(m, idx) in mapStrategies"
            :key="m.id"
            :d="m.path"
            fill="none"
            :stroke="activeIndex === idx ? 'transparent' : '#1e293b'"
            stroke-width="2"
            stroke-dasharray="4 4"
          />

          <!-- 6. Active Chosen Route (Prominent Glowing Animated Line) -->
          <path
            :d="currentMap.path"
            fill="none"
            :stroke="currentMap.color"
            stroke-width="4"
            stroke-dasharray="8 5"
            stroke-linecap="round"
            class="animate-flow"
            filter="url(#routeGlow)"
          />

          <!-- 7. Waypoints / Origin & Destination -->
          <!-- Point A (Origin - Home) -->
          <g transform="translate(60, 140)">
            <circle
              r="14"
              fill="#38bdf8"
              fill-opacity="0.2"
              class="animate-ping"
            />
            <circle r="7.5" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
            <circle r="2.5" fill="#ffffff" />
            <text
              x="0"
              y="22"
              fill="#7dd3fc"
              font-size="2"
              font-family="monospace"
              text-anchor="middle"
              font-weight="bold"
            >
              Start
            </text>
          </g>

          <!-- Point B (Destination - Tech Campus) -->
          <g transform="translate(500, 55)">
            <circle
              r="14"
              fill="#34d399"
              fill-opacity="0.2"
              class="animate-ping"
            />
            <circle r="7.5" fill="#059669" stroke="#34d399" stroke-width="2" />
            <circle r="2.5" fill="#ffffff" />
            <text
              x="0"
              y="-12"
              fill="#6ee7b7"
              font-size="2"
              font-family="monospace"
              text-anchor="middle"
              font-weight="bold"
            >
              End
            </text>
          </g>

          <!-- Metro Stations along Subway Line (Active when idx === 1) -->
          <g transform="translate(180, 115)">
            <circle
              r="4.5"
              fill="#1e293b"
              :stroke="activeIndex === 1 ? '#fbbf24' : '#475569'"
              stroke-width="1.5"
            />
            <text
              v-if="activeIndex === 1"
              x="0"
              y="16"
              fill="#fbbf24"
              font-size="2"
              font-family="monospace"
              text-anchor="middle"
            >
              Stop 1
            </text>
          </g>
          <g transform="translate(300, 90)">
            <circle
              r="5.5"
              fill="#1e293b"
              :stroke="activeIndex === 1 ? '#fbbf24' : '#475569'"
              stroke-width="2"
            />
            <circle
              v-if="activeIndex === 1"
              r="9"
              fill="#fbbf24"
              fill-opacity="0.2"
              class="animate-ping"
            />
            <text
              v-if="activeIndex === 1"
              x="0"
              y="18"
              fill="#fbbf24"
              font-size="2"
              font-family="monospace"
              text-anchor="middle"
            >
              Central Hub
            </text>
          </g>
          <g transform="translate(410, 70)">
            <circle
              r="4.5"
              fill="#1e293b"
              :stroke="activeIndex === 1 ? '#fbbf24' : '#475569'"
              stroke-width="1.5"
            />
            <text
              v-if="activeIndex === 1"
              x="0"
              y="16"
              fill="#fbbf24"
              font-size="2"
              font-family="monospace"
              text-anchor="middle"
            >
              Stop 3
            </text>
          </g>

          <!-- 8. Moving Vehicle / Transit Marker Gliding Along Route -->
          <g :key="currentMap.path">
            <animateMotion
              :path="currentMap.path"
              :dur="currentMap.vehicleDur"
              repeatCount="indefinite"
              rotate="auto"
            />
            <!-- Halo and Icon Marker -->
            <circle r="12" :fill="currentMap.color" fill-opacity="0.25" />
            <circle
              r="6"
              :fill="currentMap.color"
              stroke="#ffffff"
              stroke-width="1.5"
            />
          </g>
        </svg>

        <!-- Dynamic Overlay Badge with Execution Details -->
        <div
          class="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] font-mono flex items-center gap-2 backdrop-blur-sm"
        >
          <span
            :class="[currentMap.icon, currentMap.textColor]"
            class="w-3.5 h-3.5"
          ></span>
          <span class="text-white font-bold">{{ currentMap.implClass }}</span>
          <span class="text-slate-500">|</span>
          <span class="text-slate-300">{{ currentMap.telemetry }}</span>
        </div>
      </div>

      <!-- Bottom Polymorphic Architectural Comparison -->
      <div class="grid grid-cols-12 gap-2 text-xs font-mono">
        <div
          class="col-span-6 p-2 rounded-lg bg-slate-900/90 border border-indigo-500/30 flex flex-col items-start justify-between"
        >
          <span
            class="text-[10px] text-indigo-400 font-bold flex items-center gap-1"
          >
            <span class="i-lucide-code-2 w-3.5 h-3.5"></span>
            <span>Caller Code:</span>
          </span>
          <span class="text-[10.5px] text-slate-200 font-mono">
            navigator.getRoute(A, B) { return this.strategy.calc(A, B); }
          </span>
        </div>

        <div
          class="col-span-6 p-2 rounded-lg bg-slate-900/90 border border-emerald-500/30 flex flex-col items-start justify-between"
        >
          <span
            class="text-[10px] text-emerald-400 font-bold flex items-center gap-1"
          >
            <span class="i-lucide-check-circle-2 w-3.5 h-3.5"></span>
            <span>Core Lesson:</span>
          </span>
          <span class="text-[10px] text-slate-300">
            UI has 1 search box. Selected strategy computes its own graph.
          </span>
        </div>
      </div>
    </div>

    <!-- ======================================================= -->
    <!-- 3. LIBRARY DOMAIN: Self-Checkout Kiosk Scanner          -->
    <!-- ======================================================= -->
    <div v-else class="flex flex-col justify-between h-full gap-2">
      <!-- Top Control Bar -->
      <div
        class="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800"
      >
        <div class="flex items-center gap-2">
          <span
            class="text-[10px] font-mono text-slate-400 uppercase font-semibold"
            >Contract:</span
          >
          <span
            class="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/50 text-indigo-300 font-mono text-[11px] font-bold"
          >
            kioskScanner.checkout(BorrowableItem item)
          </span>
        </div>

        <!-- 3 Item Type Selector Buttons -->
        <div class="flex items-center gap-1.5">
          <button
            v-for="(item, idx) in libraryItems"
            :key="item.id"
            @click="selectIndex(idx)"
            class="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-mono transition-all cursor-pointer border"
            :class="[
              activeIndex === idx
                ? `${item.badgeClass} font-bold shadow-sm scale-105`
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200',
            ]"
          >
            <span :class="item.icon" class="w-3.5 h-3.5"></span>
            <span>{{ item.shortName }}</span>
          </button>
        </div>
      </div>

      <!-- Main Visual Stage: Interactive Checkout Kiosk Deck with 3 Item Behaviors -->
      <div
        class="relative w-full h-[245px] rounded-xl bg-slate-950 border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center p-3"
      >
        <svg class="w-full h-full" viewBox="0 0 540 200">
          <defs>
            <!-- Laser Red Scanner Sweep Gradient -->
            <linearGradient id="laserBeam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#ef4444" stop-opacity="0.05" />
            </linearGradient>

            <!-- Holographic Disc Rainbow Gradient -->
            <linearGradient id="holoDisc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="35%" stop-color="#ec4899" />
              <stop offset="70%" stop-color="#fbbf24" />
              <stop offset="100%" stop-color="#10b981" />
            </linearGradient>
          </defs>

          <!-- 1. Kiosk Scanner Deck Platform (The Caller) -->
          <!-- Base Kiosk Table / Glass Counter -->
          <rect
            x="25"
            y="165"
            width="235"
            height="24"
            rx="4"
            fill="#0f172a"
            stroke="#334155"
            stroke-width="1.5"
          />
          <line
            x1="30"
            y1="168"
            x2="255"
            y2="168"
            stroke="#64748b"
            stroke-width="2"
          />

          <!-- Optical Glass Scanner Window -->
          <rect
            x="75"
            y="152"
            width="135"
            height="13"
            rx="2"
            fill="#0369a1"
            fill-opacity="0.3"
            stroke="#38bdf8"
            stroke-width="1.5"
          />
          <text
            x="142"
            y="162"
            fill="#7dd3fc"
            font-size="2"
            font-family="monospace"
            text-anchor="middle"
          >
            OPTICAL RFID DECK
          </text>

          <!-- Overhead Barcode Scanner Head -->
          <path
            d="M 40,165 L 40,45 L 95,45 L 115,70 L 80,70 L 65,58 L 55,165 Z"
            fill="#1e293b"
            stroke="#475569"
            stroke-width="1.5"
          />
          <rect
            x="90"
            y="66"
            width="30"
            height="8"
            rx="2"
            fill="#0f172a"
            stroke="#ef4444"
            stroke-width="1"
          />
          <!-- Laser Beam Emitter Pulse -->
          <polygon
            points="95,74 115,74 185,152 75,152"
            fill="url(#laserBeam)"
            class="animate-pulse"
            style="animation-duration: 0.6s"
          />
          <line
            x1="90"
            y1="152"
            x2="180"
            y2="152"
            stroke="#ef4444"
            stroke-width="2"
            stroke-linecap="round"
          />

          <!-- ================= ITEM 1: PHYSICAL HARDCOVER BOOK ================= -->
          <g v-if="activeIndex === 0" transform="translate(90, 85)">
            <!-- Book Spine & Pages -->
            <!-- Back Cover -->
            <rect
              x="0"
              y="0"
              width="105"
              height="66"
              rx="4"
              fill="#1e1b4b"
              stroke="#4338ca"
              stroke-width="1.5"
            />
            <!-- White Book Pages -->
            <rect
              x="5"
              y="4"
              width="95"
              height="58"
              rx="2"
              fill="#f8fafc"
              stroke="#cbd5e1"
              stroke-width="1"
            />
            <!-- Spine Fold Lines -->
            <line
              x1="12"
              y1="4"
              x2="12"
              y2="62"
              stroke="#94a3b8"
              stroke-width="1"
            />

            <!-- Barcode on back -->
            <g transform="translate(20, 16)">
              <rect
                x="0"
                y="0"
                width="44"
                height="24"
                fill="#ffffff"
                stroke="#cbd5e1"
                stroke-width="0.8"
              />
              <!-- Barcode Stripes -->
              <line
                x1="4"
                y1="3"
                x2="4"
                y2="21"
                stroke="#0f172a"
                stroke-width="1.5"
              />
              <line
                x1="8"
                y1="3"
                x2="8"
                y2="21"
                stroke="#0f172a"
                stroke-width="0.8"
              />
              <line
                x1="12"
                y1="3"
                x2="12"
                y2="21"
                stroke="#0f172a"
                stroke-width="2"
              />
              <line
                x1="17"
                y1="3"
                x2="17"
                y2="21"
                stroke="#0f172a"
                stroke-width="1.2"
              />
              <line
                x1="22"
                y1="3"
                x2="22"
                y2="21"
                stroke="#0f172a"
                stroke-width="1.8"
              />
              <line
                x1="28"
                y1="3"
                x2="28"
                y2="21"
                stroke="#0f172a"
                stroke-width="0.9"
              />
              <line
                x1="33"
                y1="3"
                x2="33"
                y2="21"
                stroke="#0f172a"
                stroke-width="2"
              />
              <line
                x1="38"
                y1="3"
                x2="38"
                y2="21"
                stroke="#0f172a"
                stroke-width="1"
              />
            </g>

            <!-- Embedded Spine RFID Foil Tag (Deactivating) -->
            <g transform="translate(70, 16)">
              <rect
                x="0"
                y="0"
                width="26"
                height="34"
                rx="2"
                fill="#064e3b"
                stroke="#10b981"
                stroke-width="1.2"
              />
              <!-- Coil circuit -->
              <rect
                x="3"
                y="3"
                width="20"
                height="28"
                rx="1.5"
                fill="none"
                stroke="#34d399"
                stroke-width="1"
                stroke-dasharray="2 1.5"
              />
              <!-- RFID Green Deactivated Pulse -->
              <circle
                cx="13"
                cy="17"
                r="8"
                fill="#10b981"
                fill-opacity="0.3"
                class="animate-ping"
              />
              <text
                x="13"
                y="20"
                fill="#a7f3d0"
                font-size="2"
                font-family="monospace"
                text-anchor="middle"
                font-weight="bold"
              >
                RFID OK
              </text>
            </g>

            <!-- Printed Paper Receipt coming out -->
            <g transform="translate(18, 52)">
              <rect
                x="0"
                y="0"
                width="68"
                height="24"
                rx="1"
                fill="#fefce8"
                stroke="#ca8a04"
                stroke-width="0.8"
              />
              <text
                x="4"
                y="9"
                fill="#854d0e"
                font-size="2"
                font-family="monospace"
                font-weight="bold"
              >
                LOAN: 21 DAYS
              </text>
              <text
                x="4"
                y="18"
                fill="#a16207"
                font-size="2"
                font-family="monospace"
              >
                DUE: NOV 17
              </text>
            </g>
          </g>

          <!-- ================= ITEM 2: AUDIOBOOK CD (Case Unlock) ================= -->
          <g v-else-if="activeIndex === 1" transform="translate(85, 75)">
            <!-- Transparent Heavy Clamshell Box -->
            <rect
              x="0"
              y="0"
              width="115"
              height="80"
              rx="6"
              fill="#1e293b"
              fill-opacity="0.4"
              stroke="#f59e0b"
              stroke-width="1.8"
            />

            <!-- Spinning CD Disc with Rainbow Hologram -->
            <g
              transform="translate(52, 40)"
              class="animate-spin"
              style="animation-duration: 4s"
            >
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="url(#holoDisc)"
                stroke="#f8fafc"
                stroke-width="1"
                fill-opacity="0.85"
              />
              <!-- Disc Center Hole -->
              <circle
                cx="0"
                cy="0"
                r="10"
                fill="#0f172a"
                stroke="#cbd5e1"
                stroke-width="1.5"
              />
              <circle cx="0" cy="0" r="4" fill="#1e293b" />
            </g>

            <!-- Clamshell Locking Slider Bar on right -->
            <g transform="translate(100, 15)">
              <rect
                x="0"
                y="0"
                width="10"
                height="50"
                rx="3"
                fill="#0f172a"
                stroke="#10b981"
                stroke-width="1.5"
              />
              <!-- Slider Knob clicked to UNLOCKED -->
              <rect
                x="1"
                y="28"
                width="8"
                height="18"
                rx="2"
                fill="#10b981"
                class="animate-pulse"
                style="animation-duration: 0.8s"
              />
              <text
                x="5"
                y="22"
                fill="#10b981"
                font-size="2"
                font-family="monospace"
                text-anchor="middle"
                font-weight="bold"
              >
                OPEN
              </text>
            </g>

            <!-- Status Tag -->
            <rect
              x="8"
              y="6"
              width="38"
              height="12"
              rx="2"
              fill="#78350f"
              stroke="#fbbf24"
              stroke-width="0.8"
            />
            <text
              x="27"
              y="15"
              fill="#fef3c7"
              font-size="2"
              font-family="monospace"
              text-anchor="middle"
            >
              OPTICAL PASS
            </text>
          </g>

          <!-- ================= ITEM 3: DIGITAL E-READER (Cloud DRM Push) ================= -->
          <g v-else transform="translate(90, 78)">
            <!-- Modern Tablet Frame -->
            <rect
              x="0"
              y="0"
              width="110"
              height="76"
              rx="8"
              fill="#090d16"
              stroke="#06b6d4"
              stroke-width="2"
            />
            <!-- Tablet Screen Bezel -->
            <rect x="6" y="6" width="98" height="64" rx="4" fill="#0f172a" />

            <!-- WiFi Sync Radiation Wave Emitted from Deck -->
            <g transform="translate(55, -8)">
              <path
                d="M -22,0 Q 0,-14 22,0"
                fill="none"
                stroke="#22d3ee"
                stroke-width="2"
                stroke-linecap="round"
                class="animate-ping"
              />
              <path
                d="M -14,4 Q 0,-6 14,4"
                fill="none"
                stroke="#38bdf8"
                stroke-width="2"
                stroke-linecap="round"
              />
            </g>

            <!-- Screen UI: Book Download in Progress -->
            <g transform="translate(14, 14)">
              <!-- Mini Book Cover Thumbnail -->
              <rect
                x="0"
                y="0"
                width="22"
                height="30"
                rx="2"
                fill="#0284c7"
                stroke="#38bdf8"
                stroke-width="0.8"
              />
              <text
                x="11"
                y="16"
                fill="#ffffff"
                font-size="2"
                font-family="monospace"
                text-anchor="middle"
              >
                EPUB
              </text>

              <!-- Download Progress Bar -->
              <rect
                x="28"
                y="4"
                width="50"
                height="7"
                rx="3.5"
                fill="#1e293b"
              />
              <rect
                x="28"
                y="4"
                width="46"
                height="7"
                rx="3.5"
                fill="#06b6d4"
              />
              <text
                x="53"
                y="10"
                fill="#ffffff"
                font-size="2"
                font-family="monospace"
                text-anchor="middle"
                font-weight="bold"
              >
                92% SYNC
              </text>

              <!-- Cloud DRM Token Badge -->
              <rect
                x="28"
                y="16"
                width="52"
                height="16"
                rx="3"
                fill="#164e63"
                stroke="#22d3ee"
                stroke-width="0.8"
              />
              <text
                x="54"
                y="27"
                fill="#a5f3fc"
                font-size="2"
                font-family="monospace"
                text-anchor="middle"
                font-weight="bold"
              >
                DRM 7-DAY LEASE
              </text>
            </g>
          </g>

          <!-- 2. Right Side: Telemetry & Polymorphic Architecture Panel -->
          <g transform="translate(285, 20)">
            <!-- Container Box -->
            <rect
              x="0"
              y="0"
              width="295"
              height="162"
              rx="8"
              fill="#090d16"
              stroke="#1e293b"
              stroke-width="1.2"
            />

            <!-- Header: Implementation Details -->
            <rect
              x="8"
              y="10"
              width="275"
              height="24"
              rx="4"
              fill="#0f172a"
              stroke="#334155"
              stroke-width="1"
            />
            <circle cx="20" cy="22" r="4" :fill="currentLibrary.color" />
            <text
              x="32"
              y="26"
              fill="#f8fafc"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
            >
              {{ currentLibrary.implClass }}
            </text>

            <!-- Invocation Line -->
            <text
              x="12"
              y="52"
              fill="#94a3b8"
              font-size="2"
              font-family="monospace"
            >
              Invoked via:
              <tspan fill="#38bdf8">kiosk.checkout(item)</tspan>
            </text>

            <rect
              x="10"
              y="60"
              width="275"
              height="24"
              rx="4"
              fill="#1e1b4b"
              stroke="#4338ca"
              stroke-width="1"
            />
            <text
              x="20"
              y="76"
              fill="#a5b4fc"
              font-size="2"
              font-family="monospace"
              font-weight="bold"
            >
              &gt; {{ currentLibrary.methodCall }}
            </text>

            <!-- Checkout Mechanics -->
            <text
              x="12"
              y="102"
              fill="#cbd5e1"
              font-size="2"
              font-family="monospace"
            >
              Action:
              <tspan :fill="currentLibrary.color" font-weight="bold">
                {{ currentLibrary.mechanics }}
              </tspan>
            </text>

            <text
              x="12"
              y="122"
              fill="#94a3b8"
              font-size="2"
              font-family="sans-serif"
            >
              Status:
              <tspan fill="#e2e8f0" font-weight="bold">
                {{ currentLibrary.actionText }}
              </tspan>
            </text>

            <!-- Polymorphic Anti-Pattern Comparison -->
            <rect
              x="10"
              y="132"
              width="275"
              height="22"
              rx="4"
              fill="#0f172a"
              stroke="#1e293b"
              stroke-width="1"
            />
            <text
              x="18"
              y="147"
              fill="#10b981"
              font-size="2"
              font-family="monospace"
            >
              &check; Encapsulated lending rules &bull; No type checking
            </text>
          </g>
        </svg>

        <!-- Floating Live Status Badge -->
        <div
          class="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] font-mono flex items-center gap-2 backdrop-blur-sm"
        >
          <span
            :class="[currentLibrary.icon, currentLibrary.textColor]"
            class="w-3.5 h-3.5"
          ></span>
          <span class="text-white font-bold">{{ currentLibrary.title }}</span>
          <span class="text-slate-500">|</span>
          <span class="text-slate-300">{{ currentLibrary.resultBadge }}</span>
        </div>
      </div>

      <!-- Bottom Polymorphic Architectural Comparison -->
      <div class="grid grid-cols-12 gap-2 text-xs font-mono">
        <div
          class="col-span-6 p-2 rounded-lg bg-slate-900/90 border border-indigo-500/30 flex flex-col items-start justify-start"
        >
          <span
            class="text-[10px] text-indigo-400 font-bold flex items-center gap-1"
          >
            <span class="i-lucide-code-2 w-3.5 h-3.5"></span>
            <span>Caller Code:</span>
          </span>
          <span class="text-[10.5px] text-slate-200 font-mono">
            kiosk.scan(item) { item.processCheckout(patron); }
          </span>
        </div>

        <div
          class="col-span-6 p-2 rounded-lg bg-slate-900/90 border border-emerald-500/30 flex flex-col items-start justify-between"
        >
          <span
            class="text-[10px] text-emerald-400 font-bold flex items-center gap-1"
          >
            <span class="i-lucide-check-circle-2 w-3.5 h-3.5"></span>
            <span>Core Lesson:</span>
          </span>
          <span class="text-[10px] text-slate-300">
            Kiosk doesn't write if-else statements. Item owns its checkout.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes flowDash {
  to {
    stroke-dashoffset: -20;
  }
}

.animate-flow {
  animation: flowDash 0.8s linear infinite;
}
</style>
