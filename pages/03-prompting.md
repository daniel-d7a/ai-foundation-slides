---
layout: default
---

<ModuleTitleCard
  moduleNo="MODULE 03"
  title="Prompt Engineering"
  subtitle="Structured Prompts, Context Windows, External Tools, and Practical Tasks."
  image="/images/03-prompting.jpg"
  color="amber"
/>

---

# Why Unclear Prompts Fail

AI models predict words based on your input. Vague prompts cause generic answers. Structured prompts produce accurate results.

<div class="mt-2">
  <PromptComparison />
</div>

---

# The 6-Pillar Prompt Structure

Build reliable prompts with these 6 core parts.

<div class="grid grid-cols-3 gap-3 mt-3 w-full max-w-full text-left" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.75rem; width: 100%;">
  <div v-click class="p-3 rounded-xl bg-slate-900/85 border border-purple-500/40 flex flex-col justify-between min-h-[165px] h-full min-w-0">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-white font-serif flex items-center gap-1.5">
          <span class="i-lucide-user-check size-5 text-purple-400 shrink-0"></span>
          <span class="text-xl">1. Persona</span>
        </span>
      </div>
      <p class="text-[11px] text-slate-300 font-sans leading-snug">Specifies role, expertise level, and point of view.</p>
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
      <p class="text-[11px] text-slate-300 font-sans leading-snug">Specifies background details, user limits, and project status.</p>
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
      <p class="text-[11px] text-slate-300 font-sans leading-snug">The direct, clear action that the model must complete.</p>
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
      <p class="text-[11px] text-slate-300 font-sans leading-snug">Clear rules for scope, length, and prohibited words.</p>
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
      <p class="text-[11px] text-slate-300 font-sans leading-snug">Enforces exact output structure such as tables, JSON, or code blocks.</p>
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
          <span class="text-xl">6. Reasoning</span>
        </span>
      </div>
      <p class="text-[11px] text-slate-300 font-sans leading-snug">Requires step-by-step reasoning before generating the final answer.</p>
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

# Prompt Evolution: Step by Step

Observe how a basic request becomes a structured prompt across sequential steps.

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

# Interactive Lab: Build Your Prompt

Select prompt components across three domain scenarios to observe live output changes.

<PromptLegoBuilder />

---

# Context Limits in AI Models

AI models have finite context windows. Test memory limits and run context reduction.

<ContextGauge />

---

# What is an AI Tool?

Connect language models to external capabilities: calendars, maps, and scheduled actions.

<AgentToolExplainer />

---

# Tool &rarr; Workflow &rarr; Agent

From single atomic functions to automated pipelines and autonomous problem-solving loops.

<ToolWorkflowAgent />

---

# Agent Functions &amp; Tool Use

Modern AI models do not only generate text. They execute external tools to complete tasks.

<AgentRobotArms />

---

# Applied Prompts: Production Templates

Review complete prompt templates broken down into structured components.

<div class="mt-2">
  <PromptDissector />
</div>

