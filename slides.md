---
theme: default
title: AI Foundations Course
info: |
  Interactive Master Deck for the AI Foundations Course
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
aspectRatio: '16/9'
css: unocss
colorSchema: dark
controls: false
---

<div class="relative h-full flex flex-col justify-center items-center overflow-hidden">
  <div 
    v-motion
    :initial="{ opacity: 0, y: -30 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    class="px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4"
  >
    AI FOUNDATIONS CURRICULUM • MASTER DECK
  </div>

  <h1 
    v-motion
    :initial="{ opacity: 0, scale: 0.92 }"
    :enter="{ opacity: 1, scale: 1, transition: { delay: 200, duration: 600 } }"
    class="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-400 bg-clip-text text-transparent"
  >
    From AI Consumer to AI Architect
  </h1>

  <p 
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: 400, duration: 600 } }"
    class="mt-3 text-lg text-slate-400 max-w-2xl"
  >
    Mastering the landscape, the modern toolbox, prompt engineering, accelerated learning, and visual automation.
  </p>

  <div class="grid grid-cols-5 gap-3 mt-10 w-full max-w-4xl text-left">
    <div v-click class="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-indigo-500/50 transition-all">
      <div class="text-[10px] font-mono text-indigo-400">MODULE 01</div>
      <div class="font-bold text-xs mt-1 text-white">The AI Landscape</div>
      <div class="text-[10px] text-slate-400 mt-1">Evolution & Ecosystem</div>
    </div>
    <div v-click class="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-emerald-500/50 transition-all">
      <div class="text-[10px] font-mono text-emerald-400">MODULE 02</div>
      <div class="font-bold text-xs mt-1 text-white">Modern Toolbox</div>
      <div class="text-[10px] text-slate-400 mt-1">Tools for Every Major</div>
    </div>
    <div v-click class="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-amber-500/50 transition-all">
      <div class="text-[10px] font-mono text-amber-400">MODULE 03</div>
      <div class="font-bold text-xs mt-1 text-white">Prompting</div>
      <div class="text-[10px] text-slate-400 mt-1">6 Pillars & Context</div>
    </div>
    <div v-click class="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-pink-500/50 transition-all">
      <div class="text-[10px] font-mono text-pink-400">MODULE 04</div>
      <div class="font-bold text-xs mt-1 text-white">AI for Learning</div>
      <div class="text-[10px] text-slate-400 mt-1">Socratic Framework</div>
    </div>
    <div v-click class="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/50 transition-all">
      <div class="text-[10px] font-mono text-cyan-400">MODULE 05</div>
      <div class="font-bold text-xs mt-1 text-white">n8n Automation</div>
      <div class="text-[10px] text-slate-400 mt-1">Autonomous Pipelines</div>
    </div>
  </div>
</div>

---
src: ./pages/01-landscape.md
---

---
src: ./pages/02-toolbox.md
---

---
src: ./pages/03-prompting.md
---

---
src: ./pages/04-learning.md
---

---
src: ./pages/05-automation.md
---

---
layout: default
class: text-center
---

<div class="relative h-full flex flex-col justify-center items-center">
  <div class="text-xs font-mono text-emerald-400 mb-2">COURSE SUMMARY & CONCLUSION</div>
  <h2 class="text-4xl font-extrabold text-white">
    The Future Belongs to the Orchestrators
  </h2>
  <p class="text-sm text-slate-400 max-w-xl mt-3 leading-relaxed">
    AI doesn't replace thinkers—it amplifies the curious. Master the fundamentals, experiment continuously, and automate the mundane so you can focus on high-leverage creation.
  </p>

  <div class="flex gap-4 mt-8">
    <div class="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/40 text-left w-64">
      <div class="text-xs font-bold text-white mb-1">🎓 Knowledge Acquired</div>
      <div class="text-xs text-slate-300">5 Modules mastered, 6 interactive labs completed, capstone ready.</div>
    </div>
    <div class="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40 text-left w-64">
      <div class="text-xs font-bold text-white mb-1">🚀 Next Step</div>
      <div class="text-xs text-slate-300">Deploy your first live n8n workflow and share it with the class!</div>
    </div>
  </div>
</div>
