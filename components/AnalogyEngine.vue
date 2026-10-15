<script setup lang="ts">
import { ref, computed } from 'vue'

const concepts = [
  { 
    id: 'poly', 
    name: 'Polymorphism & Interfaces',
    badge: 'Same Interface -> Different Behaviors',
  },
  { 
    id: 'algorithms', 
    name: 'Algorithms & Efficiency (Big-O)',
    badge: 'Minimizing Step Count & Time',
  },
  { 
    id: 'recursion', 
    name: 'Recursion & Base Cases',
    badge: 'Self-Similar Sub-Problems',
  },
]

const domains = [
  { id: 'cooking', name: 'Cooking & Kitchen', iconClass: 'i-lucide-utensils' },
  { id: 'maps', name: 'GPS & Google Maps', iconClass: 'i-lucide-navigation' },
  { id: 'library', name: 'Library & Bookshelves', iconClass: 'i-lucide-book-open' },
]

const selectedConcept = ref(concepts[0].id)
const selectedDomain = ref(domains[0].id)

const analogies: Record<string, Record<string, string>> = {
  poly: {
    cooking: 'Think of blender motor attachments. The blender base defines the interface (`.blend()`). Whether you attach a smoothie cup, a food processor bowl, or a spice grinder, the base motor doesn\'t need to know how each works internally—it simply spins the drive shaft.',
    maps: 'Think of "Directions" in Google Maps. The interface is universal: `.getRoute(from, to)`. Whether you select Driving, Walking, Biking, or Transit, the app triggers the same action, but each mode calculates speeds, turns, and paths differently under the hood.',
    library: 'Think of the library checkout scanner. The scanner defines a single contract (`.checkout()`). Whether you scan a physical hardcover book, a DVD, an audiobook CD, or an e-reader barcode, the circulation system processes the loan through the exact same workflow.',
  },
  algorithms: {
    cooking: 'Finding a specific spice in your kitchen. If jars are scattered randomly, you must inspect every jar one-by-one (Linear Search: slow O(n)). If spices are alphabetized on a tiered rack, you instantly jump to "O" for Oregano in seconds (Indexed Search: fast O(1)).',
    maps: 'Finding the fastest route home during rush hour. Checking every single street in the city would take hours. Navigation algorithms (like A* / Dijkstra) intelligently explore only promising roads toward your destination, pruning traffic jams to calculate the optimal path in milliseconds.',
    library: 'Looking up a book among 100,000 titles. Binary Search: opening the shelves right at the middle letter "M". If your author starts with "T", you instantly discard the first 50,000 books without looking at them, repeating the split until you find the exact book in under 17 checks.',
  },
  recursion: {
    cooking: 'Peeling an onion or folding puff pastry. You take the dough, fold it in half, chill it, and then repeat the exact same folding action on the smaller dough. The process calls itself repeatedly until you reach the base condition: 1,000 microscopic flaky layers.',
    maps: 'Zooming in on a digital map. The screen starts at continent level. When you zoom in, the application runs the exact same rendering logic on a smaller sub-quadrant, calling itself repeatedly until you reach street level (base case: individual house numbers visible).',
    library: 'Dewey Decimal categorization. Science (500) contains Physics (530), which contains Electricity (537). The classification rule applies identically inside each nested sub-shelf until you reach an individual single book on the shelf (base case: stop dividing).',
  },
}

const currentAnalogy = computed(() => {
  return analogies[selectedConcept.value]?.[selectedDomain.value] || 'Select options above...'
})

// 1. Interactive Polymorphism Data
const activePolyIndex = ref(0)
const polyConfigs: Record<string, Array<{ name: string; icon: string; method: string; impl: string; metric: string; color: string }>> = {
  cooking: [
    { name: 'Smoothie Cup', icon: 'i-lucide-glass-water', method: 'blender.blend()', impl: 'High-speed vortex blending', metric: '24,000 RPM', color: 'text-pink-400' },
    { name: 'Food Processor', icon: 'i-lucide-scissors', method: 'blender.blend()', impl: 'Pulse-action coarse chopping', metric: '3,200 RPM', color: 'text-amber-400' },
    { name: 'Spice Grinder', icon: 'i-lucide-sparkles', method: 'blender.blend()', impl: 'Impact pulverizing blade', metric: '18,500 RPM', color: 'text-cyan-400' },
  ],
  maps: [
    { name: 'Drive Route', icon: 'i-lucide-car', method: 'router.navigate()', impl: 'Highway graph with live traffic', metric: '32 mins (Fastest)', color: 'text-pink-400' },
    { name: 'Transit Route', icon: 'i-lucide-train-track', method: 'router.navigate()', impl: 'Subway schedule & platform transfers', metric: '24 mins (Fixed)', color: 'text-amber-400' },
    { name: 'Walking Route', icon: 'i-lucide-footprints', method: 'router.navigate()', impl: 'Pedestrian park walkways & crossings', metric: '1h 10m (0 emissions)', color: 'text-cyan-400' },
  ],
  library: [
    { name: 'Hardcover Book', icon: 'i-lucide-book', method: 'scanner.checkout()', impl: 'Physical RFID tag antenna deactivation', metric: '21-day loan', color: 'text-pink-400' },
    { name: 'Audiobook CD', icon: 'i-lucide-disc', method: 'scanner.checkout()', impl: 'Optical barcode scan & case unlock', metric: '14-day loan', color: 'text-amber-400' },
    { name: 'E-Book License', icon: 'i-lucide-tablet', method: 'scanner.checkout()', impl: 'Cryptographic DRM token issuance', metric: '7-day auto-expiry', color: 'text-cyan-400' },
  ],
}

// 2. Interactive Algorithms Data
const algoMode = ref<'naive' | 'optimal'>('optimal')
const algoConfigs: Record<string, {
  target: string
  naive: { name: string; complexity: string; steps: string; time: string; badge: string }
  optimal: { name: string; complexity: string; steps: string; time: string; badge: string }
}> = {
  cooking: {
    target: 'Oregano Jar',
    naive: { name: 'Linear Jumble Search', complexity: 'O(n) Linear', steps: '12 checks', time: '1,200 ms', badge: 'Checks every jar one-by-one' },
    optimal: { name: 'Indexed Alphabetical Rack', complexity: 'O(1) Direct Lookup', steps: '1 check', time: '40 ms', badge: 'Jumps directly to "O" slot' },
  },
  maps: {
    target: 'Optimal Commute Route',
    naive: { name: 'Exhaustive City Search', complexity: 'O(V!) Brute Force', steps: '4,800 streets', time: '4,500 ms', badge: 'Evaluates every dead-end alley' },
    optimal: { name: 'A* Heuristic Graph Search', complexity: 'O(E log V) Directed', steps: '14 segments', time: '12 ms', badge: 'Prunes paths moving away from target' },
  },
  library: {
    target: 'Tolkien: The Hobbit',
    naive: { name: 'Linear Shelf Walk', complexity: 'O(n) Linear', steps: '54,200 books', time: '3.8 hours', badge: 'Flips through covers from entrance to back' },
    optimal: { name: 'Binary Dewey Decimal Split', complexity: 'O(log n) Logarithmic', steps: '17 shelf cuts', time: '6 seconds', badge: 'Discards 50% of the collection per step' },
  },
}

// 3. Interactive Recursion Data
const recurseStep = ref(1)
const recursionConfigs: Record<string, {
  functionName: string
  steps: Array<{ depth: number; label: string; state: string; isBase: boolean }>
}> = {
  cooking: {
    functionName: 'foldPastry(layers, target=1024)',
    steps: [
      { depth: 1, label: 'Call fold(1)', state: '1 fold -> 2 layers', isBase: false },
      { depth: 2, label: 'Call fold(2)', state: '2 folds -> 4 layers', isBase: false },
      { depth: 3, label: 'Call fold(3)', state: '3 folds -> 8 layers', isBase: false },
      { depth: 4, label: 'Call fold(10) [BASE CASE]', state: '1,024 microscopic flaky layers reached! STOP.', isBase: true },
    ],
  },
  maps: {
    functionName: 'renderMap(zoomLevel, max=4)',
    steps: [
      { depth: 1, label: 'renderMap(Zoom 1)', state: 'Continent view (macro level)', isBase: false },
      { depth: 2, label: 'renderMap(Zoom 2)', state: 'Metro region & highways', isBase: false },
      { depth: 3, label: 'renderMap(Zoom 3)', state: 'Neighborhood streets', isBase: false },
      { depth: 4, label: 'renderMap(Zoom 4) [BASE CASE]', state: 'Street building & door number reached! STOP.', isBase: true },
    ],
  },
  library: {
    functionName: 'locateItem(categoryDepth, code)',
    steps: [
      { depth: 1, label: 'locate(500)', state: 'Section 500: Pure Sciences', isBase: false },
      { depth: 2, label: 'locate(530)', state: 'Sub-section 530: Physics', isBase: false },
      { depth: 3, label: 'locate(537)', state: 'Row 537: Electricity & Magnetism', isBase: false },
      { depth: 4, label: 'locate(537.2) [BASE CASE]', state: 'Exact volume in hand! STOP.', isBase: true },
    ],
  },
}
</script>

<template>
  <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/60 text-left">
    <!-- Top Compact Selectors -->
    <div class="grid grid-cols-12 gap-3 mb-2.5">
      <!-- Concept Selector -->
      <div class="col-span-6">
        <label class="block text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold mb-1">
          1. Computer Science Concept:
        </label>
        <div class="grid grid-cols-3 gap-1.5">
          <button
            v-for="c in concepts"
            :key="c.id"
            @click="selectedConcept = c.id; activePolyIndex = 0; recurseStep = 1"
            class="px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all cursor-pointer text-center"
            :class="[
              selectedConcept === c.id
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            ]"
          >
            <div class="font-bold truncate">{{ c.name.split('&')[0] }}</div>
          </button>
        </div>
      </div>

      <!-- Domain Selector -->
      <div class="col-span-6">
        <label class="block text-[10px] font-mono text-pink-400 uppercase tracking-wider font-bold mb-1">
          2. Real-World Domain:
        </label>
        <div class="grid grid-cols-3 gap-1.5">
          <button
            v-for="d in domains"
            :key="d.id"
            @click="selectedDomain = d.id; activePolyIndex = 0; recurseStep = 1"
            class="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all cursor-pointer text-center"
            :class="[
              selectedDomain === d.id
                ? 'bg-pink-600 border-pink-400 text-white shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            ]"
          >
            <span :class="d.iconClass" class="w-3.5 h-3.5 text-pink-200 shrink-0"></span>
            <span class="font-bold truncate">{{ d.name.split('&')[0] }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content: Left Narrative + Right Interactive Visual -->
    <div class="grid grid-cols-12 gap-3">
      <!-- Left Narrative (5 cols) -->
      <div class="col-span-5 p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono text-pink-400 uppercase tracking-wider font-bold">Mental Model Synthesis</span>
            <span class="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
              {{ concepts.find(c => c.id === selectedConcept)?.name.split('&')[0] }}
            </span>
          </div>
          <p class="text-slate-200 leading-relaxed font-sans text-xs">
            {{ currentAnalogy }}
          </p>
        </div>

        <div class="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-indigo-300 flex items-center gap-1.5">
          <span class="i-lucide-zap w-3.5 h-3.5 text-indigo-400 shrink-0"></span>
          <span><strong>Takeaway:</strong> Same abstraction, varied physical reality.</span>
        </div>
      </div>

      <!-- Right Interactive Visual (7 cols) -->
      <div class="col-span-7 p-3 rounded-xl bg-slate-950 border border-indigo-500/30 flex flex-col justify-between">
        <!-- Visual 1: Polymorphism Interactive Visualizer -->
        <div v-if="selectedConcept === 'poly'" class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
              Interactive Polymorphic Dispatch
            </span>
            <span class="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
              Click attachment to swap
            </span>
          </div>

          <!-- 3 Polymorphic Implementation Buttons -->
          <div class="grid grid-cols-3 gap-1.5">
            <button
              v-for="(item, idx) in polyConfigs[selectedDomain]"
              :key="idx"
              @click="activePolyIndex = idx"
              class="p-2 rounded-lg border text-left transition-all cursor-pointer flex flex-col gap-1"
              :class="activePolyIndex === idx ? 'bg-indigo-950/60 border-indigo-400 text-white shadow-sm' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'"
            >
              <div class="flex items-center gap-1.5">
                <span :class="[item.icon, item.color]" class="w-3.5 h-3.5 shrink-0"></span>
                <span class="text-[10.5px] font-bold truncate">{{ item.name }}</span>
              </div>
              <div class="text-[9.5px] font-mono text-slate-400 truncate">{{ item.metric }}</div>
            </button>
          </div>

          <!-- Dynamic Execution Chamber -->
          <div class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
            <div class="flex items-center justify-between text-[10px]">
              <span class="text-slate-400">Caller Contract Interface:</span>
              <span class="text-indigo-400 font-bold">{{ polyConfigs[selectedDomain][activePolyIndex].method }}</span>
            </div>
            <div class="flex items-center justify-between text-[10px]">
              <span class="text-slate-400">Active Concrete Object:</span>
              <span class="text-white font-bold">{{ polyConfigs[selectedDomain][activePolyIndex].name }}</span>
            </div>
            <div class="p-1.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-emerald-300 flex items-center gap-1.5">
              <span class="i-lucide-play w-3.5 h-3.5 text-emerald-400 shrink-0"></span>
              <span class="truncate"><strong>Execution:</strong> {{ polyConfigs[selectedDomain][activePolyIndex].impl }}</span>
            </div>
          </div>
        </div>

        <!-- Visual 2: Algorithms Efficiency Simulator -->
        <div v-else-if="selectedConcept === 'algorithms'" class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold truncate max-w-[200px]">
              Target: {{ algoConfigs[selectedDomain].target }}
            </span>
            <div class="flex p-0.5 rounded bg-slate-900 border border-slate-800">
              <button
                @click="algoMode = 'naive'"
                class="px-2 py-0.5 rounded text-[9.5px] font-mono transition-all cursor-pointer"
                :class="algoMode === 'naive' ? 'bg-red-500/20 text-red-300 font-bold' : 'text-slate-500 hover:text-slate-300'"
              >
                Brute Force
              </button>
              <button
                @click="algoMode = 'optimal'"
                class="px-2 py-0.5 rounded text-[9.5px] font-mono transition-all cursor-pointer"
                :class="algoMode === 'optimal' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-500 hover:text-slate-300'"
              >
                Optimized
              </button>
            </div>
          </div>

          <!-- Comparison Telemetry Card -->
          <div class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-slate-400 text-[10px]">Active Strategy:</span>
              <span class="font-bold text-[10.5px]" :class="algoMode === 'optimal' ? 'text-emerald-400' : 'text-red-400'">
                {{ algoConfigs[selectedDomain][algoMode].name }}
              </span>
            </div>

            <div class="grid grid-cols-3 gap-1.5 text-center pt-1 border-t border-slate-800">
              <div class="p-1 rounded bg-slate-950 border border-slate-800">
                <div class="text-[8.5px] text-slate-500">Complexity</div>
                <div class="text-[10px] font-bold text-white">{{ algoConfigs[selectedDomain][algoMode].complexity.split(' ')[0] }}</div>
              </div>
              <div class="p-1 rounded bg-slate-950 border border-slate-800">
                <div class="text-[8.5px] text-slate-500">Operations</div>
                <div class="text-[10px] font-bold" :class="algoMode === 'optimal' ? 'text-emerald-400' : 'text-red-400'">
                  {{ algoConfigs[selectedDomain][algoMode].steps }}
                </div>
              </div>
              <div class="p-1 rounded bg-slate-950 border border-slate-800">
                <div class="text-[8.5px] text-slate-500">Cost / Time</div>
                <div class="text-[10px] font-bold" :class="algoMode === 'optimal' ? 'text-emerald-400' : 'text-red-400'">
                  {{ algoConfigs[selectedDomain][algoMode].time }}
                </div>
              </div>
            </div>

            <div class="text-[9.5px] text-slate-300 bg-slate-950/70 p-1 rounded border border-slate-800 flex items-center gap-1.5">
              <span class="i-lucide-timer w-3.5 h-3.5 text-amber-400 shrink-0"></span>
              <span class="truncate">{{ algoConfigs[selectedDomain][algoMode].badge }}</span>
            </div>
          </div>
        </div>

        <!-- Visual 3: Recursion Call Stack Stepper -->
        <div v-else class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase tracking-wider text-pink-400 font-bold">
              Call Stack Depth: {{ recurseStep }} / 4
            </span>
            <div class="flex gap-1.5">
              <button
                @click="recurseStep = Math.min(4, recurseStep + 1)"
                :disabled="recurseStep === 4"
                class="px-2 py-0.5 rounded text-[10px] font-mono bg-pink-600/30 border border-pink-500 text-pink-200 hover:bg-pink-600/50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                + Push Stack
              </button>
              <button
                @click="recurseStep = 1"
                class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          <!-- Stack Frames Display -->
          <div class="space-y-1">
            <div
              v-for="idx in recurseStep"
              :key="idx"
              class="p-1.5 rounded border text-[10px] font-mono flex items-center justify-between transition-all"
              :class="recursionConfigs[selectedDomain].steps[idx - 1].isBase
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                : 'bg-slate-900 border-indigo-500/40 text-slate-300'"
            >
              <div class="flex items-center gap-1.5">
                <span class="px-1 py-0.2 rounded text-[8.5px] font-bold" :class="recursionConfigs[selectedDomain].steps[idx - 1].isBase ? 'bg-emerald-500 text-slate-950' : 'bg-indigo-500 text-white'">
                  #{{ idx }}
                </span>
                <span class="text-[9.5px]">{{ recursionConfigs[selectedDomain].steps[idx - 1].label }}</span>
              </div>
              <span class="text-[9.5px] truncate max-w-[160px]" :class="recursionConfigs[selectedDomain].steps[idx - 1].isBase ? 'text-emerald-300 font-bold' : 'text-slate-400'">
                {{ recursionConfigs[selectedDomain].steps[idx - 1].state }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
