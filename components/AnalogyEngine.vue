<script setup lang="ts">
import { ref, computed } from 'vue'

const concepts = [
  { id: 'attention', name: 'Self-Attention (Transformers)' },
  { id: 'embeddings', name: 'Vector Embeddings' },
  { id: 'backprop', name: 'Backpropagation' },
]

const domains = [
  { id: 'cooking', name: 'Culinary Arts / Kitchen', icon: '🍳' },
  { id: 'sports', name: 'Football (Soccer)', icon: '⚽' },
  { id: 'music', name: 'Music Production / Mixing', icon: '🎧' },
]

const selectedConcept = ref(concepts[0].id)
const selectedDomain = ref(domains[0].id)

const analogies: Record<string, Record<string, string>> = {
  attention: {
    cooking: 'Imagine a master chef preparing a delicate risotto. While stirring the rice, they constantly glance across the kitchen to coordinate the simmer time with the seared scallops, white wine reduction, and garnish plate. Every ingredient "pays attention" to all other ingredients simultaneously to reach harmonious flavor.',
    sports: 'Think of a world-class midfielder scanning the pitch before receiving a pass. They don\'t just look at the ball; their eyes weight the positions of the sprinting winger (high attention), the pressing defender (medium attention), and the goalkeeper (background context) to choose the lethal pass.',
    music: 'Like a master mixing engineer setting multi-track volume faders. When the lead vocal kicks in, the system dynamically ducks the rhythm guitars and boosts the snare snap so every frequency layer adapts dynamically based on what else is playing at that exact millisecond.',
  },
  embeddings: {
    cooking: 'A spice rack organized by flavor coordinates (Sweetness, Acidity, Heat, Umami). Cinnamon and Nutmeg sit right next to each other in 3D space, while Cayenne Pepper is far away on the heat axis, allowing the chef to mathematically substitute related flavors.',
    sports: 'A scout\'s radar chart plotting players across coordinates: Sprint Speed, Tactical Vision, Physical Strength. Two players close together in this coordinate space can replace each other in a tactical lineup regardless of their jersey number.',
    music: 'A massive vinyl record crate organized by BPM, key signature, and mood. Two tracks with 128 BPM in A-Minor that both have dark synths sit in the exact same corner, making harmonic DJ mixing instant.',
  },
  backprop: {
    cooking: 'You taste the finished soup and it is slightly too salty and lacks acidity. You trace backwards through the cooking steps: "I reduced the broth for 20 minutes instead of 10, and added lemon 5 minutes too late." You adjust those specific valve dial timings for the next batch.',
    sports: 'Reviewing game tape after conceding a goal on a counter-attack. The coach rewinds frame-by-frame: "The striker lost the duel at minute 72, which forced the left-back out of position, leaving space for the opponent." The team recalibrates defensive positioning.',
    music: 'Listening to the final master on cheap earbuds and hearing muddy bass. You trace backwards through the FX chain: reduce the low-end boost on the compressor by 2dB, and lower the reverb decay time until the final audio output is crystal clear.',
  },
}

const currentAnalogy = computed(() => {
  return analogies[selectedConcept.value]?.[selectedDomain.value] || 'Select an option...'
})
</script>

<template>
  <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-left">
    <div class="flex items-center gap-2 mb-2">
      <span class="text-xs font-mono text-pink-400">Concept Deconstruction Matrix</span>
    </div>

    <!-- Selectors -->
    <div class="grid grid-cols-12 gap-3 mb-3">
      <div class="col-span-6">
        <label class="block text-[11px] font-mono text-slate-400 mb-1">1. Complex AI Mechanism:</label>
        <div class="flex flex-col gap-1">
          <button
            v-for="c in concepts"
            :key="c.id"
            @click="selectedConcept = c.id"
            class="text-left px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer"
            :class="selectedConcept === c.id ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200' : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'"
          >
            {{ c.name }}
          </button>
        </div>
      </div>

      <div class="col-span-6">
        <label class="block text-[11px] font-mono text-slate-400 mb-1">2. Familiar Student Background:</label>
        <div class="flex flex-col gap-1">
          <button
            v-for="d in domains"
            :key="d.id"
            @click="selectedDomain = d.id"
            class="flex items-center gap-2 text-left px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer"
            :class="selectedDomain === d.id ? 'bg-pink-600/30 border-pink-500 text-pink-200' : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'"
          >
            <span>{{ d.icon }}</span>
            <span>{{ d.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Analogy Result Display -->
    <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
      <div class="text-[10px] font-mono text-pink-400 uppercase tracking-wider mb-1">
        Synthesized Mental Model:
      </div>
      <p class="text-slate-200 leading-relaxed italic">
        "{{ currentAnalogy }}"
      </p>
    </div>
  </div>
</template>
