---
layout: default
---

<ModuleTitleCard
  moduleNo="MODULE 03"
  title="Speaking to the Machine"
  subtitle="Prompt Engineering, Context Windows, Agent Tooling, and Applied Workflows."
  image="/images/03-prompting.jpg"
  color="amber"
/>

---

# Why Most Prompts Fail: The Ambiguity Trap

LLMs are probabilistic token predictors: raw gibberish guarantees generic hallucinations, while modular blocks engineer precision.

<div class="mt-2">
  <PromptComparison />
</div>

---

# The 6 Pillars of a Master Prompt

Every elite prompt decomposes into these 6 modular architectural building blocks.

<div class="grid grid-cols-3 gap-3 mt-3 w-full max-w-full text-left" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.75rem; width: 100%;">
  <div v-click class="p-3 rounded-xl bg-slate-900/85 border border-purple-500/40 flex flex-col justify-between min-h-[165px] h-full min-w-0">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-white font-serif flex items-center gap-1.5">
          <span class="i-lucide-user-check size-5 text-purple-400 shrink-0"></span>
          <span class="text-xl">1. Persona</span>
        </span>
      </div>
      <p class="text-[11px] text-slate-300 font-sans leading-snug">Defines seniority, domain authority, perspective, and voice calibration.</p>
    </div>
    <div class="font-mono text-[10px] text-purple-300 bg-purple-950/40 p-2 rounded border border-purple-500/30 mt-2 break-words leading-tight">
      "Act as a Principal Staff Engineer..."
    </div>
  </div>

  <div v-click class="p-3 rounded-xl bg-slate-900/85 border border-blue-500/40 flex flex-col justify-between min-h-[165px] h-full min-w-0">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-white font-serif flex items-center gap-1.5">
          <span class="i-lucide-compass size-5 text-blue-400 shrink-0"></span>
          <span class="text-xl">2. Context</span>
        </span>
      </div>
      <p class="text-[11px] text-slate-300 font-sans leading-snug">Background environment, user constraints, target audience, and project state.</p>
    </div>
    <div class="font-mono text-[10px] text-blue-300 bg-blue-950/40 p-2 rounded border border-blue-500/30 mt-2 break-words leading-tight">
      "Building for 1st-year biology students..."
    </div>
  </div>

  <div v-click class="p-3 rounded-xl bg-slate-900/85 border border-emerald-500/40 flex flex-col justify-between min-h-[165px] h-full min-w-0">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-white font-serif flex items-center gap-1.5">
          <span class="i-lucide-check-circle-2 size-5 text-emerald-400 shrink-0"></span>
          <span class="text-xl">3. Task</span>
        </span>
      </div>
      <p class="text-[11px] text-slate-300 font-sans leading-snug">The unambiguous, verb-driven primary mission to be completed.</p>
    </div>
    <div class="font-mono text-[10px] text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-500/30 mt-2 break-words leading-tight">
      "Construct a 3-part onboarding sequence..."
    </div>
  </div>

  <div v-click class="p-3 rounded-xl bg-slate-900/85 border border-cyan-500/40 flex flex-col justify-between min-h-[165px] h-full min-w-0">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-white font-serif flex items-center gap-1.5">
          <span class="i-lucide-shield-alert size-5 text-cyan-400 shrink-0"></span>
          <span class="text-xl">4. Instructions</span>
        </span>
      </div>
      <p class="text-[11px] text-slate-300 font-sans leading-snug">Strict guardrails on banned buzzwords, tone rules, and scope limitations.</p>
    </div>
    <div class="font-mono text-[10px] text-cyan-300 bg-cyan-950/40 p-2 rounded border border-cyan-500/30 mt-2 break-words leading-tight">
      "Ban buzzwords ('synergy'). Max 150 words."
    </div>
  </div>

  <div v-click class="p-3 rounded-xl bg-slate-900/85 border border-amber-500/40 flex flex-col justify-between min-h-[165px] h-full min-w-0">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-white font-serif flex items-center gap-1.5">
          <span class="i-lucide-layout-grid size-5 text-amber-400 shrink-0"></span>
          <span class="text-xl">5. Format</span>
        </span>
      </div>
      <p class="text-[11px] text-slate-300 font-sans leading-snug">Enforces concrete output structure: Markdown tables, JSON, or codeblocks.</p>
    </div>
    <div class="font-mono text-[10px] text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-500/30 mt-2 break-words leading-tight">
      "Output strictly as a 4-column Markdown table."
    </div>
  </div>

  <div v-click class="p-3 rounded-xl bg-slate-900/85 border border-pink-500/40 flex flex-col justify-between min-h-[165px] h-full min-w-0">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-white font-serif flex items-center gap-1.5">
          <span class="i-lucide-git-commit size-5 text-pink-400 shrink-0"></span>
          <span class="text-xl">6. Reasoning (CoT)</span>
        </span>
      </div>
      <p class="text-[11px] text-slate-300 font-sans leading-snug">Forces step-by-step intermediate deduction before rendering final output.</p>
    </div>
    <div class="font-mono text-[10px] text-pink-300 bg-pink-950/40 p-2 rounded border border-pink-500/30 mt-2 break-words leading-tight">
      "First diagnose student pain points, then write."
    </div>
  </div>
</div>

---
clicks: 3
---

<script setup>
import { ref } from 'vue'

const isArabic = ref(false)
</script>

<div class="absolute top-8 right-12 z-20">
  <ExampleLangButton v-model="isArabic" />
</div>

# Live Evolution: Morphing with Magic Move

Watch a basic request evolve into an engineered prompt across sequential clicks.

<div v-if="!isArabic">

````md magic-move {lines: true}
```text
Write a launch campaign for our new study app.
```

```text
[PERSONA]
Act as an EdTech Growth Marketer specializing in Gen-Z university students.

[TASK]
Write a launch campaign for our new study app.
```

```text
[PERSONA]
Act as an EdTech Growth Marketer specializing in Gen-Z university students.

[CONTEXT]
Launching "FocusPulse", an app turning messy lecture notes into 5-minute flashcards.
Audience is exhausted by midterms and ignores traditional ads.

[TASK]
Write a 3-part social campaign.
```

```text
[PERSONA]
Act as an EdTech Growth Marketer specializing in Gen-Z university students.

[CONTEXT]
Launching "FocusPulse", an app turning messy lecture notes into 5-minute flashcards.
Audience is exhausted by midterms and ignores traditional ads.

[TASK]
Write a 3-part social campaign.

[INSTRUCTIONS & FORMAT]
- Eliminate clichés ("revolutionize", "game-changer").
- Format as a Markdown table: [Slide] | [Visual] | [Hook] | [CTA].

[CHAIN OF THOUGHT]
First, outline 3 emotional anxieties students feel 48 hours before an exam.
Then, map each slide directly to alleviate one anxiety.
```
````

</div>

<div v-else dir="rtl" class="text-right arabic-code-example">

````md magic-move {at: 0, lines: true}
```text
اكتب حملة إطلاق لتطبيقنا الدراسي الجديد.
```

```text
[الدور - Persona]
تصرّف كخبير نمو تسويقي في تكنولوجيا التعليم متخصص في طلاب الجامعات من الجيل Z.

[المهمة - Task]
اكتب حملة إطلاق لتطبيقنا الدراسي الجديد.
```

```text
[الدور - Persona]
تصرّف كخبير نمو تسويقي في تكنولوجيا التعليم متخصص في طلاب الجامعات من الجيل Z.

[السياق - Context]
نطلق تطبيق "FocusPulse"، وهو تطبيق يحول مذكرات المحاضرات غير المنظمة إلى بطاقات استذكار في 5 دقائق.
الجمهور مستنزف من الامتحانات النصفية ويتجاهل الإعلانات التقليدية.

[المهمة - Task]
اكتب حملة إعلانية عبر وسائل التواصل من 3 أجزاء.
```

```text
[الدور - Persona]
تصرّف كخبير نمو تسويقي في تكنولوجيا التعليم متخصص في طلاب الجامعات من الجيل Z.

[السياق - Context]
نطلق تطبيق "FocusPulse"، وهو تطبيق يحول مذكرات المحاضرات غير المنظمة إلى بطاقات استذكار في 5 دقائق.
الجمهور مستنزف من الامتحانات النصفية ويتجاهل الإعلانات التقليدية.

[المهمة - Task]
اكتب حملة إعلانية عبر وسائل التواصل من 3 أجزاء.

[التعليمات والصيغة - Instructions & Format]
- استبعد العبارات المبتذلة ("أحدث ثورة"، "غيّر قواعد اللعبة").
- نسّق المخرج كجدول ماركداون: [الشريحة] | [المشهد البصري] | [العنصر الجاذب] | [دعوة لاتخاذ إجراء].

[تسلسل التفكير - Chain of Thought]
أولاً، حدد 3 مخاوف وضغوط يشعر بها الطلاب قبل 48 ساعة من الامتحان.
ثم، اربط كل شريحة مباشرة بمعالجة أحد هذه المخاوف.
```
````

</div>

---

# Interactive Lab: Construct Your Prompt

Toggle building blocks across three real-world domain scenarios to observe live output changes.

<PromptLegoBuilder />

---

# Chatbot Mechanics: The Context Window

LLM working memory is finite. Test memory saturation and trigger context compaction.

<ContextGauge />

---

# Agent Abilities & Tool Use

Modern foundation models don't just generate text: they orchestrate external tools autonomously.

<AgentRobotArms />

---

# Applied AI: Production Scenarios & Live Prompts

Full, battle-tested prompt templates dissected into their architectural building blocks.

<div class="mt-2">
  <PromptDissector />
</div>

