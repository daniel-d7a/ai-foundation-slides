---
layout: section
---

# Module 01
<div class="text-3xl font-bold text-white font-serif">
  The AI Landscape
</div>
<p class="text-slate-300 mt-2 font-sans">
  From Symbolic Rules to Foundation Models: Building a True Mental Model.
</p>

---

# The Evolution of AI
How computing transitioned from manual deterministic rules to statistical pattern induction.

<div class="grid grid-cols-4 gap-3 mt-8">
  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-64">
    <div>
      <div class="text-xs font-mono text-indigo-400 font-bold">1950s - 1980s</div>
      <h3 class="font-bold text-base text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Symbolic AI</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Rule-based "expert systems" and logical trees. Humans handcraft every "if-then" rule explicitly.
      </p>
    </div>
    <div class="mt-3 text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-2">Chess engines, ELIZA</div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-64">
    <div>
      <div class="text-xs font-mono text-emerald-400 font-bold">1990s - 2000s</div>
      <h3 class="font-bold text-base text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Machine Learning</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Algorithms learn statistical patterns directly from tabular datasets without manual rule scripting.
      </p>
    </div>
    <div class="mt-3 text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-2">Spam filters, Random Forest</div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-64">
    <div>
      <div class="text-xs font-mono text-cyan-400 font-bold">2010s</div>
      <h3 class="font-bold text-base text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Deep Learning</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Multi-layered artificial neural networks capable of feature learning on raw unstructured images and audio.
      </p>
    </div>
    <div class="mt-3 text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-2">ImageNet, AlphaGo, Siri</div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/60 shadow-lg flex flex-col justify-between h-64">
    <div>
      <div class="text-xs font-mono text-amber-400 font-bold">2020s - Present</div>
      <h3 class="font-bold text-base text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Generative AI</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Autoregressive transformer foundation models that synthesize multimodal language, code, images, and audio.
      </p>
    </div>
    <div class="mt-3 text-[11px] font-mono text-amber-300 border-t border-slate-800 pt-2">Gemini, Claude, Midjourney</div>
  </div>
</div>

---

# Types of AI: The Capability Spectrum
Understanding where today's systems actually stand vs science fiction.

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="p-4 rounded-xl bg-slate-900/90 border-2 border-indigo-500 shadow-xl flex flex-col justify-between h-68">
    <div>
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold text-indigo-400">STAGE 1</span>
        <span class="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">REALITY TODAY</span>
      </div>
      <h3 class="text-lg font-bold text-white mt-2 font-serif min-h-[2rem] flex items-center">ANI: Narrow AI</h3>
      <p class="text-xs text-slate-300 mt-1.5 leading-relaxed font-sans">
        Systems engineered to excel at specific bounded tasks. They lack generalized intuition or autonomous self-awareness.
      </p>
      <ul class="text-xs text-slate-300 mt-3 space-y-1 font-mono">
        <li>• Foundation LLMs (Gemini, Claude)</li>
        <li>• Autonomous driving perception</li>
        <li>• Medical diagnostic classifiers</li>
      </ul>
    </div>
    <div class="mt-3 pt-2 border-t border-indigo-500/30 text-[11px] text-indigo-300 font-semibold font-sans">
      100% of commercial tools today are ANI.
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-68 opacity-80">
    <div>
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold text-amber-400">STAGE 2</span>
        <span class="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">IN RESEARCH</span>
      </div>
      <h3 class="text-lg font-bold text-white mt-2 font-serif min-h-[2rem] flex items-center">AGI: General AI</h3>
      <p class="text-xs text-slate-300 mt-1.5 leading-relaxed font-sans">
        Hypothetical software capable of matching human intellectual performance across any domain without domain-specific retraining.
      </p>
      <ul class="text-xs text-slate-400 mt-3 space-y-1 font-mono">
        <li>• Autonomous scientific research</li>
        <li>• Zero-shot transfer learning</li>
      </ul>
    </div>
    <div class="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-sans">
      Active research horizon.
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-68 opacity-60">
    <div>
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold text-pink-400">STAGE 3</span>
        <span class="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">THEORETICAL</span>
      </div>
      <h3 class="text-lg font-bold text-white mt-2 font-serif min-h-[2rem] flex items-center">ASI: Superintelligence</h3>
      <p class="text-xs text-slate-300 mt-1.5 leading-relaxed font-sans">
        An intellect that far surpasses the cognitive performance of human experts in virtually all domains including scientific breakthrough generation.
      </p>
    </div>
    <div class="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-500 font-sans">
      Speculative future paradigm.
    </div>
  </div>
</div>

---

# Concentric Rings: The AI Hierarchy
Click the rings below to explore how each layer nests inside the other.

<ConcentricAI />

---

# The Core Subfields at a Glance
Interactive architectural breakdown of visual perception, language, foundation models, and automation.

<SubfieldsTabs />

---

# Demystifying the AI Ecosystem (Jobs & Fields)
Explore which AI technologies drive real industry sectors and modern career titles.

<EcosystemFilter />
