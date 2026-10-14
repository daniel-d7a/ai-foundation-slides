---
layout: section
---

# Module 01
<div class="text-3xl font-bold bg-gradient-to-r from-indigo-300 via-white to-indigo-400 bg-clip-text text-transparent">
  The AI Landscape
</div>
<p class="text-slate-400 mt-2">
  From Symbolic Rules to Foundation Models: Building a True Mental Model.
</p>

---

# The Evolution of AI
How we moved from hardcoded logic to learning directly from representations.

<div class="grid grid-cols-4 gap-3 mt-8">
  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between">
    <div>
      <div class="text-xs font-mono text-indigo-400">1950s - 1980s</div>
      <h3 class="font-bold text-base text-white mt-1">Symbolic AI</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed">
        Rule-based "expert systems" and logical trees. Humans handcraft every "if-then" rule.
      </p>
    </div>
    <div class="mt-3 text-[11px] font-mono text-slate-400">Chess engines, ELIZA</div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between">
    <div>
      <div class="text-xs font-mono text-emerald-400">1990s - 2000s</div>
      <h3 class="font-bold text-base text-white mt-1">Machine Learning</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed">
        Algorithms learn statistical patterns from tabular datasets without hardcoded rules.
      </p>
    </div>
    <div class="mt-3 text-[11px] font-mono text-slate-400">Spam filters, Random Forest</div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between">
    <div>
      <div class="text-xs font-mono text-cyan-400">2010s</div>
      <h3 class="font-bold text-base text-white mt-1">Deep Learning</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed">
        Multi-layered neural networks inspired by the human brain trained on massive unstructured data.
      </p>
    </div>
    <div class="mt-3 text-[11px] font-mono text-slate-400">ImageNet, AlphaGo, Siri</div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/60 shadow-lg shadow-indigo-500/10 flex flex-col justify-between">
    <div>
      <div class="text-xs font-mono text-amber-400">2020s - Present</div>
      <h3 class="font-bold text-base text-white mt-1">Generative AI</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed">
        Transformer foundation models that generate multimodal content (text, code, audio, 3D).
      </p>
    </div>
    <div class="mt-3 text-[11px] font-mono text-amber-300">Gemini, Claude, Midjourney</div>
  </div>
</div>

---

# Types of AI: The Capability Spectrum
Understanding where today's systems actually stand vs science fiction.

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="p-4 rounded-xl bg-indigo-950/20 border-2 border-indigo-500 shadow-xl shadow-indigo-500/10 flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold text-indigo-400">STAGE 1</span>
        <span class="text-[10px] font-mono bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full">REALITY TODAY</span>
      </div>
      <h3 class="text-lg font-bold text-white mt-2">ANI: Narrow AI</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed">
        Systems designed to excel at specific bounded tasks. They lack general common sense or self-awareness.
      </p>
      <ul class="text-xs text-slate-300 mt-3 space-y-1">
        <li>• Large Language Models (Gemini, Claude)</li>
        <li>• Self-driving car perception</li>
        <li>• Medical diagnostic algorithms</li>
      </ul>
    </div>
    <div class="mt-4 pt-2 border-t border-indigo-500/30 text-[11px] text-indigo-300 font-semibold">
      100% of commercial AI today is ANI.
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between opacity-80">
    <div>
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold text-amber-400">STAGE 2</span>
        <span class="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">IN RESEARCH</span>
      </div>
      <h3 class="text-lg font-bold text-white mt-2">AGI: General AI</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed">
        Hypothetical software capable of matching human intellectual performance across any domain without retraining.
      </p>
      <ul class="text-xs text-slate-400 mt-3 space-y-1">
        <li>• Autonomous scientific research</li>
        <li>• Cross-domain transference of intuition</li>
      </ul>
    </div>
    <div class="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
      Debated timeline (3–10+ years).
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between opacity-50">
    <div>
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold text-pink-400">STAGE 3</span>
        <span class="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">THEORETICAL</span>
      </div>
      <h3 class="text-lg font-bold text-white mt-2">ASI: Superintelligence</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed">
        An intellect that far surpasses the cognitive performance of humans in virtually all domains including scientific creativity and social skills.
      </p>
    </div>
    <div class="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-500">
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
Four pillars powering 95% of real-world AI applications.

<div class="grid grid-cols-2 gap-4 mt-4">
  <SlideCard title="Computer Vision (CV)" subtitle="Visual Perception" accent="indigo" hoverEffect>
    <p>Enabling computers to process, analyze, and understand digital images and videos.</p>
    <div class="mt-2 text-slate-400">
      <strong>Core Concepts:</strong> Object detection (YOLO), segmentation, facial recognition, OCR (optical character reading).
    </div>
  </SlideCard>

  <SlideCard title="Natural Language Processing (NLP)" subtitle="Language & Semantics" accent="emerald" hoverEffect>
    <p>Allowing computers to read, decipher, and extract semantic meaning from human languages.</p>
    <div class="mt-2 text-slate-400">
      <strong>Core Concepts:</strong> Tokenization, POS tagging, named entity recognition, sentiment analysis, embeddings.
    </div>
  </SlideCard>

  <SlideCard title="Large Language Models (LLMs)" subtitle="Foundation Generators" accent="amber" hoverEffect>
    <p>Massive autoregressive transformers trained on trillions of tokens predicting the next token in sequence.</p>
    <div class="mt-2 text-slate-400">
      <strong>Core Concepts:</strong> Attention mechanism, context window, RLHF, alignment, zero-shot reasoning.
    </div>
  </SlideCard>

  <SlideCard title="Automation (The Hands)" subtitle="Workflow Execution" accent="cyan" hoverEffect>
    <p>Connecting AI reasoning engines to APIs, databases, webhooks, and enterprise applications.</p>
    <div class="mt-2 text-slate-400">
      <strong>Core Concepts:</strong> n8n, webhooks, triggers, actions, function calling, autonomous tool loops.
    </div>
  </SlideCard>
</div>

---

# Demystifying the AI Ecosystem (Jobs & Fields)
Explore which AI technologies drive real industry sectors and modern career titles.

<EcosystemFilter />
