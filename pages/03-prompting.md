---
layout: section
---

# Module 03
<div class="text-3xl font-bold bg-gradient-to-r from-amber-300 via-white to-amber-400 bg-clip-text text-transparent">
  Speaking to the Machine
</div>
<p class="text-slate-400 mt-2">
  Prompt Engineering, Context Windows, Agent Tooling, and Applied Workflows.
</p>

---

# Why Most Prompts Fail: The Ambiguity Trap
LLMs are probabilistic pattern matchers: vague prompts yield generic corporate clichés.

<div class="grid grid-cols-2 gap-4 mt-6">
  <div class="p-4 rounded-xl bg-red-950/20 border border-red-500/40">
    <div class="text-xs font-mono text-red-400 font-bold uppercase mb-2">❌ What 90% of Users Type</div>
    <div class="p-3 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
      "Write a marketing email for my study app."
    </div>
    <div class="text-xs text-slate-400 mt-3 space-y-1">
      <div>• No audience context -> Defaults to generic buzzwords</div>
      <div>• No length constraints -> Output is either too long or rambling</div>
      <div>• Zero tone guidance -> Sounds robotic and impersonal</div>
    </div>
  </div>

  <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40">
    <div class="text-xs font-mono text-emerald-400 font-bold uppercase mb-2">✅ Deterministic Architecture</div>
    <div class="p-3 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
      [Persona] + [Context] + [Task] + [Constraints] + [Format] + [CoT]
    </div>
    <div class="text-xs text-slate-300 mt-3 space-y-1">
      <div>• Pinpoints the exact cognitive role required</div>
      <div>• Constrains output space to deterministic schema</div>
      <div>• Directs the model to reason before generating</div>
    </div>
  </div>
</div>

---

# The 6 Pillars of a Master Prompt
Every elite prompt decomposes into these 6 modular building blocks.

<div class="grid grid-cols-3 gap-3 mt-4 text-xs">
  <SlideCard title="1. Persona & Role" subtitle="Who is answering?" accent="purple">
    Defines perspective, seniority, domain authority, and pedagogical tone.
    <div class="mt-1 font-mono text-[11px] text-purple-300">"Act as a Principal Staff Engineer..."</div>
  </SlideCard>

  <SlideCard title="2. Context" subtitle="Background facts" accent="indigo">
    Supplies constraints, target audience profile, raw notes, or project environment.
    <div class="mt-1 font-mono text-[11px] text-indigo-300">"We are building for non-technical biology majors..."</div>
  </SlideCard>

  <SlideCard title="3. Task" subtitle="The clear objective" accent="emerald">
    The unambiguous, verb-driven command to accomplish.
    <div class="mt-1 font-mono text-[11px] text-emerald-300">"Create a 3-part onboarding email sequence."</div>
  </SlideCard>

  <SlideCard title="4. Instructions" subtitle="Guardrails" accent="cyan">
    Strict rules on what to avoid, styling tone, and banned clichés.
    <div class="mt-1 font-mono text-[11px] text-cyan-300">"Avoid jargon ('unleash', 'supercharge'). Limit to 150 words."</div>
  </SlideCard>

  <SlideCard title="5. Format" subtitle="Output schema" accent="amber">
    Enforces Markdown tables, JSON schemas, checklists, or code snippets.
    <div class="mt-1 font-mono text-[11px] text-amber-300">"Return output strictly as a 4-column Markdown table."</div>
  </SlideCard>

  <SlideCard title="6. Chain of Thought" subtitle="Reason first" accent="pink">
    Instructs the LLM to write out intermediate deduction steps before final answer.
    <div class="mt-1 font-mono text-[11px] text-pink-300">"First diagnose student pain points, then write the hook."</div>
  </SlideCard>
</div>

---

# Live Evolution: Morphing with Magic Move
Watch a basic request evolve into an engineered prompt across sequential clicks.

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

<div v-click class="mt-4 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
  ✨ <strong>Key Insight:</strong> Specifying constraints and Chain of Thought eliminates 90% of model hallucinations.
</div>

---

# Interactive Lab: Construct Your Prompt
Toggle building blocks to see how output specificity and determinism jump in real time.

<PromptLegoBuilder />

---

# Chatbot Mechanics: The Context Window
LLM working memory is finite. See what happens when token capacity is exceeded.

<ContextGauge />

---

# Agent Abilities & Tool Use
Modern LLMs aren't just text generators—they orchestrate external tools autonomously.

<div class="grid grid-cols-4 gap-3 mt-6 text-xs">
  <div class="p-3 rounded-xl bg-slate-900 border border-indigo-500/30">
    <div class="text-xs font-mono text-indigo-400 font-bold mb-1">1. Web Search</div>
    <p class="text-slate-300">Pulls real-time data, stock prices, news, and cites source URLs dynamically.</p>
  </div>

  <div class="p-3 rounded-xl bg-slate-900 border border-emerald-500/30">
    <div class="text-xs font-mono text-emerald-400 font-bold mb-1">2. Code Interpreter</div>
    <p class="text-slate-300">Spins up a sandboxed Python runtime to execute math, process CSVs, and render charts.</p>
  </div>

  <div class="p-3 rounded-xl bg-slate-900 border border-cyan-500/30">
    <div class="text-xs font-mono text-cyan-400 font-bold mb-1">3. Diagramming</div>
    <p class="text-slate-300">Generates Mermaid or SVG architecture diagrams to visually represent systems.</p>
  </div>

  <div class="p-3 rounded-xl bg-slate-900 border border-amber-500/30">
    <div class="text-xs font-mono text-amber-400 font-bold mb-1">4. Function Calling</div>
    <p class="text-slate-300">Emits structured JSON to invoke APIs, database queries, and external webhook triggers.</p>
  </div>
</div>

<div class="mt-4 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200">
  🔄 <strong>Agentic Loop:</strong> Thought $\rightarrow$ Action (Call Tool) $\rightarrow$ Observation (Read Tool Result) $\rightarrow$ Final Output.
</div>

---

# Applied AI: 4 Production Scenarios
Real-world workflows demonstrating the power of structured prompting.

<div class="grid grid-cols-2 gap-3 mt-3 text-xs">
  <SlideCard title="1. Marketing & Personas" subtitle="Audience Intelligence" accent="purple">
    Feed high-level product specs to generate 3 segmented demographic personas, along with customized value propositions and pain-point ad hooks.
  </SlideCard>

  <SlideCard title="2. Data Analysis & Trends" subtitle="CSV to Insights" accent="emerald">
    Upload raw transactional CSVs directly to Claude/ChatGPT. Prompt: <em>"Analyze customer churn by region, highlight top 3 anomalies, and generate a chart."</em>
  </SlideCard>

  <SlideCard title="3. Coding & Refactoring" subtitle="Developer Leverage" accent="cyan">
    Paste buggy code + error stack trace. Prompt: <em>"Explain root cause, provide unit test reproducing the bug, and output the patched function."</em>
  </SlideCard>

  <SlideCard title="4. Daily News Aggregator" subtitle="Personalized Intelligence" accent="amber">
    Prompt template combining Perplexity or Gemini web search: <em>"Scan the web for top 5 breakthroughs in [Topic] in past 24h. Output 3-bullet executive briefs."</em>
  </SlideCard>
</div>
