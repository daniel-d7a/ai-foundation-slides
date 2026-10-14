<script setup lang="ts">
import { ref, computed } from 'vue'

const concepts = [
  { 
    id: 'poly', 
    name: 'Polymorphism & Interfaces',
    summary: 'Allowing different underlying data types to be invoked through a uniform shared contract.',
  },
  { 
    id: 'async', 
    name: 'Asynchronous Event Loop & Promises',
    summary: 'Non-blocking I/O execution where long tasks run in background while main thread continues.',
  },
  { 
    id: 'recursion', 
    name: 'Recursion & Call Stack Frames',
    summary: 'A function that solves a problem by repeatedly invoking smaller instances of itself until a base case is hit.',
  },
]

const domains = [
  { id: 'cooking', name: 'Commercial Kitchen / Culinary', iconClass: 'i-lucide-utensils' },
  { id: 'sports', name: 'Football (Soccer) Tactics', iconClass: 'i-lucide-trophy' },
  { id: 'music', name: 'Music Production / Mixing Desk', iconClass: 'i-lucide-headphones' },
]

const selectedConcept = ref(concepts[0].id)
const selectedDomain = ref(domains[0].id)

const analogies: Record<string, Record<string, string>> = {
  poly: {
    cooking: 'Think of standard electrical power outlets in a commercial kitchen. The outlet defines the contract (Interface: "Provide 220V power"). Whether you plug in an industrial dough mixer, an immersion blender, or a sous-vide circulator (Concrete Implementations), the kitchen wall does not need to know how the machine operates internally. It simply executes `.powerOn()`.',
    sports: 'Consider a manager yelling "Take the set piece!" on the pitch. The tactical interface requires any player who takes it to deliver the ball into the penalty box. Whether the left-winger bends it with curve, the center-back drives it with power, or the playmaker chips it softly, the team structure accommodates different styles through the same command.',
    music: 'Think of a MIDI keyboard controller connected to your DAW. The keyboard emits universal MIDI note messages (Note C3 at Velocity 100). Whether the track instrument is an acoustic Steinway piano plugin, an 808 sub-bass synth, or orchestral violins, they all receive `.playNote()` and express it in their own unique sonic timbre.',
  },
  async: {
    cooking: 'A line cook taking an order for a 45-minute roasted chicken. They do not freeze in place staring at the oven for 45 minutes (blocking execution). Instead, they set an oven timer (Promise), place the chicken inside, immediately chop onions and sear fish for other tables (Event Loop), and when the oven timer rings (resolve), they plate the chicken.',
    sports: 'A center-back playing a long through-ball into space for a sprinting winger. The defender doesn\'t stand frozen waiting for the ball to land; they immediately rotate backwards and reorganize the defensive line (main thread). When the winger catches up to the ball down the wing (Promise resolved), the attack resumes.',
    music: 'A producer rendering an audio stem while mixing a live track. Instead of freezing the playback engine, background threads process the heavy audio convolution reverb calculations, allowing the producer to keep adjusting volume faders and listening to the beat in real time without audio glitches.',
  },
  recursion: {
    cooking: 'Making classical puff pastry (mille-feuille). You take dough, fold in butter, chill, and fold it again. You repeat the exact same folding function on a smaller, layered version of the dough until you reach the base condition: 1,000 microscopic laminated layers.',
    sports: 'A penalty shootout tournament where two teams shoot one round of spot kicks. If tied, the referee triggers another round on the remaining players. The rules of each round are identical, repeatedly calling itself until one team gains the advantage (base case satisfied).',
    music: 'A tape delay echo effect. An audio signal is fed into a magnetic tape loop, re-recorded at 50% volume, and routed back into the tape head. The signal calls itself in a recursive decay cycle until the amplitude drops below the noise floor (base condition).',
  },
}

const currentAnalogy = computed(() => {
  return analogies[selectedConcept.value]?.[selectedDomain.value] || 'Select options above...'
})
</script>

<template>
  <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 text-left">
    <!-- Selectors -->
    <div class="grid grid-cols-12 gap-4 mb-3">
      <!-- Concept Selector -->
      <div class="col-span-6">
        <label class="block text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-bold mb-1.5">
          1. Abstract Programming Concept:
        </label>
        <div class="flex flex-col gap-1.5">
          <button
            v-for="c in concepts"
            :key="c.id"
            @click="selectedConcept = c.id"
            class="text-left px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer"
            :class="[
              selectedConcept === c.id
                ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            ]"
          >
            <div class="font-serif font-bold text-slate-200">{{ c.name }}</div>
            <div class="text-[10px] text-slate-400 mt-0.5 font-sans leading-tight">{{ c.summary }}</div>
          </button>
        </div>
      </div>

      <!-- Domain Selector -->
      <div class="col-span-6">
        <label class="block text-[11px] font-mono text-pink-400 uppercase tracking-wider font-bold mb-1.5">
          2. Familiar Real-World Domain:
        </label>
        <div class="flex flex-col gap-1.5">
          <button
            v-for="d in domains"
            :key="d.id"
            @click="selectedDomain = d.id"
            class="flex items-center gap-2.5 text-left px-3 py-3 rounded-lg border text-xs font-medium transition-all cursor-pointer"
            :class="[
              selectedDomain === d.id
                ? 'bg-pink-600/30 border-pink-500 text-white shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            ]"
          >
            <span :class="d.iconClass" class="w-4 h-4 text-pink-400"></span>
            <span class="font-serif font-bold">{{ d.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Analogy Result Display -->
    <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
      <div class="text-[10px] font-mono text-pink-400 uppercase tracking-wider font-bold mb-1">
        Targeted Mental Model Synthesis:
      </div>
      <p class="text-slate-200 leading-relaxed font-sans text-xs">
        {{ currentAnalogy }}
      </p>
    </div>
  </div>
</template>
