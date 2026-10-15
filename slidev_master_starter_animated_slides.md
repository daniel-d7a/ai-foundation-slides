---
theme: default
title: AI Foundation Course
info: |
  Interactive Lecture Materials for the AI Foundation Course
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

<div class="relative h-full flex flex-col justify-center items-center overflow-hidden">
  <div 
    v-motion
    :initial="{ opacity: 0, y: -40 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    class="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-mono mb-6"
  >
    AI FOUNDATION CURRICULUM  MODULES 1–5
  </div>

  <h1 
    v-motion
    :initial="{ opacity: 0, scale: 0.9 }"
    :enter="{ opacity: 1, scale: 1, transition: { delay: 200, duration: 600 } }"
    class="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent"
  >
    From AI Consumer to AI Architect
  </h1>

  <p 
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: 500, duration: 600 } }"
    class="mt-4 text-xl text-slate-400 max-w-2xl"
  >
    Mastering the landscape, the modern toolbox, prompt engineering, accelerated learning, and visual automation.
  </p>

  <div class="grid grid-cols-5 gap-3 mt-12 w-full max-w-4xl text-left">
    <div v-click class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
      <div class="text-xs font-mono text-indigo-400">MODULE 01</div>
      <div class="font-bold text-sm mt-1">The AI Landscape</div>
    </div>
    <div v-click class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
      <div class="text-xs font-mono text-emerald-400">MODULE 02</div>
      <div class="font-bold text-sm mt-1">Modern Toolbox</div>
    </div>
    <div v-click class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
      <div class="text-xs font-mono text-amber-400">MODULE 03</div>
      <div class="font-bold text-sm mt-1">Prompt Engineering</div>
    </div>
    <div v-click class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
      <div class="text-xs font-mono text-pink-400">MODULE 04</div>
      <div class="font-bold text-sm mt-1">AI for Learning</div>
    </div>
    <div v-click class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
      <div class="text-xs font-mono text-cyan-400">MODULE 05</div>
      <div class="font-bold text-sm mt-1">n8n Automation</div>
    </div>
  </div>
</div>

---

transition: fade-out
---

# Module 3: Live Prompt Evolution

Watch how adding structured layers transforms a vague request into a precision instruction using **Magic Move**.

````md magic-move {lines: true}
```text
Write a marketing campaign for our new study app.
```

```text
[PERSONA]
Act as a Senior Growth Marketer specializing in EdTech for Gen-Z university students.

[TASK]
Write a marketing campaign for our new study app.
```

```text
[PERSONA]
Act as a Senior Growth Marketer specializing in EdTech for Gen-Z university students.

[CONTEXT]
We are launching "FocusFlow", a mobile app that turns messy lecture PDFs into 5-minute daily quizzes. Our audience is overwhelmed during exam season and ignores traditional ads.

[TASK]
Write a 3-part launch campaign.
```

```text
[PERSONA]
Act as a Senior Growth Marketer specializing in EdTech for Gen-Z university students.

[CONTEXT]
We are launching "FocusFlow", a mobile app that turns messy lecture PDFs into 5-minute daily quizzes. Our audience is overwhelmed during exam season and ignores traditional ads.

[TASK]
Write a 3-part launch campaign.

[INSTRUCTIONS & FORMAT]
- Avoid corporate buzzwords ("revolutionary", "synergy").
- Output as a Markdown table with columns: Hook, Visual Concept, and Call-to-Action.

[CHAIN OF THOUGHT]
First, list 3 core emotional anxieties students feel 48 hours before an exam. Then, map each campaign angle directly to one anxiety.
```
````

<div v-click class="mt-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
  ✨ Notice how <span v-mark.underline.orange="4">Zero-Shot guessing</span> is replaced by deterministic constraints.
</div>

---

layout: default
---

# Interactive Lab: Build Your Prompt

Toggle the building blocks below to see how an LLM's output changes in real time.

<PromptLegoBuilder />
