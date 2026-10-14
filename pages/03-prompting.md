---
layout: section
---

# Module 03
<div class="text-3xl font-bold text-white font-serif">
  Speaking to the Machine
</div>
<p class="text-slate-300 mt-2 font-sans">
  Prompt Engineering, Context Windows, Agent Tooling, and Applied Workflows.
</p>

---

# Why Most Prompts Fail: The Ambiguity Trap
LLMs are probabilistic token predictors: under-specified inputs guarantee generic corporate clichés.

<div class="grid grid-cols-2 gap-5 mt-6">
  <div v-click class="p-5 rounded-xl bg-slate-900/90 border-2 border-red-500/50 flex flex-col justify-between">
    <div>
      <div class="text-xs font-mono text-red-400 font-bold uppercase tracking-wider mb-2">Passive Vague Instruction</div>
      <div class="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-sm text-red-300 font-bold">
        "Write a marketing email for my study app."
      </div>
      <div class="mt-4 space-y-2.5 text-sm text-slate-200 font-sans">
        <div class="flex items-start gap-2">
          <span class="i-lucide-x-circle w-4 h-4 text-red-400 shrink-0 mt-0.5"></span>
          <span><strong>Zero Audience Persona:</strong> Model falls back on corporate filler words ("unleash", "synergy").</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="i-lucide-x-circle w-4 h-4 text-red-400 shrink-0 mt-0.5"></span>
          <span><strong>Unbounded Output Space:</strong> Generates either 6 rambling paragraphs or a useless 2-line snippet.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="i-lucide-x-circle w-4 h-4 text-red-400 shrink-0 mt-0.5"></span>
          <span><strong>No Reasoning Constraints:</strong> Model guesses answers without validating logical deduction.</span>
        </div>
      </div>
    </div>
    <div class="mt-4 pt-3 border-t border-red-900/40 text-xs font-mono text-red-400">
      Result: Unusable zero-shot filler
    </div>
  </div>

  <div v-click class="p-5 rounded-xl bg-slate-900/90 border-2 border-emerald-500/50 flex flex-col justify-between">
    <div>
      <div class="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-2">Deterministic Structured Architecture</div>
      <div class="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-sm text-emerald-300 font-bold">
        [Persona] + [Context] + [Task] + [Constraints] + [Format] + [CoT]
      </div>
      <div class="mt-4 space-y-2.5 text-sm text-slate-200 font-sans">
        <div class="flex items-start gap-2">
          <span class="i-lucide-check-circle-2 w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></span>
          <span><strong>Domain Role Authority:</strong> Forces precise vocabulary, tone calibration, and perspective.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="i-lucide-check-circle-2 w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></span>
          <span><strong>Strict Output Schemas:</strong> Enforces tables, Markdown codeblocks, JSON, or step sequences.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="i-lucide-check-circle-2 w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></span>
          <span><strong>Chain of Thought:</strong> Requires intermediate deductive reasoning before generating final tokens.</span>
        </div>
      </div>
    </div>
    <div class="mt-4 pt-3 border-t border-emerald-900/40 text-xs font-mono text-emerald-300">
      Result: Deterministic, production-ready output
    </div>
  </div>
</div>

---

# The 6 Pillars of a Master Prompt
Every elite prompt decomposes into these 6 modular architectural building blocks.

<div class="grid grid-cols-3 gap-3.5 mt-5 text-xs">
  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-purple-500/40 flex flex-col justify-between h-44">
    <div>
      <h3 class="text-base font-bold text-white font-serif min-h-[2.5rem] flex items-center">1. Persona</h3>
      <p class="text-slate-300 font-sans mt-1">Defines seniority, domain authority, perspective, and voice calibration.</p>
    </div>
    <div class="font-mono text-[11px] text-purple-300 bg-purple-950/30 p-1.5 rounded border border-purple-500/30">
      "Act as a Principal Staff Engineer..."
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-blue-500/40 flex flex-col justify-between h-44">
    <div>
      <h3 class="text-base font-bold text-white font-serif min-h-[2.5rem] flex items-center">2. Context</h3>
      <p class="text-slate-300 font-sans mt-1">Background environment, user constraints, target audience, and project state.</p>
    </div>
    <div class="font-mono text-[11px] text-blue-300 bg-blue-950/30 p-1.5 rounded border border-blue-500/30">
      "Building for 1st-year biology students..."
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40 flex flex-col justify-between h-44">
    <div>
      <h3 class="text-base font-bold text-white font-serif min-h-[2.5rem] flex items-center">3. Task</h3>
      <p class="text-slate-300 font-sans mt-1">The unambiguous, verb-driven primary mission to be completed.</p>
    </div>
    <div class="font-mono text-[11px] text-emerald-300 bg-emerald-950/30 p-1.5 rounded border border-emerald-500/30">
      "Construct a 3-part onboarding sequence..."
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/40 flex flex-col justify-between h-44">
    <div>
      <h3 class="text-base font-bold text-white font-serif min-h-[2.5rem] flex items-center">4. Instructions</h3>
      <p class="text-slate-300 font-sans mt-1">Strict guardrails on banned buzzwords, tone rules, and scope limitations.</p>
    </div>
    <div class="font-mono text-[11px] text-cyan-300 bg-cyan-950/30 p-1.5 rounded border border-cyan-500/30">
      "Ban buzzwords ('supercharge'). Under 150 words."
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-amber-500/40 flex flex-col justify-between h-44">
    <div>
      <h3 class="text-base font-bold text-white font-serif min-h-[2.5rem] flex items-center">5. Format</h3>
      <p class="text-slate-300 font-sans mt-1">Enforces concrete output structure: Markdown tables, JSON, or codeblocks.</p>
    </div>
    <div class="font-mono text-[11px] text-amber-300 bg-amber-950/30 p-1.5 rounded border border-amber-500/30">
      "Output strictly as a 4-column Markdown table."
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-pink-500/40 flex flex-col justify-between h-44">
    <div>
      <h3 class="text-base font-bold text-white font-serif min-h-[2.5rem] flex items-center">6. Chain of Thought</h3>
      <p class="text-slate-300 font-sans mt-1">Forces step-by-step intermediate deduction before rendering final output.</p>
    </div>
    <div class="font-mono text-[11px] text-pink-300 bg-pink-950/30 p-1.5 rounded border border-pink-500/30">
      "First diagnose student pain points, then write."
    </div>
  </div>
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

<div class="grid grid-cols-4 gap-4 mt-6 text-xs">
  <div v-click class="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/40 flex flex-col justify-between h-72">
    <div>
      <div class="text-xs font-mono text-indigo-400 font-bold uppercase mb-1">TOOL 01</div>
      <h3 class="text-base font-bold text-white font-serif min-h-[2.5rem] flex items-center">Web Search Engine</h3>
      <p class="text-slate-300 font-sans mt-2 leading-relaxed">
        Autonomous query dispatching to live search indexes to retrieve real-time data beyond model cutoff dates.
      </p>
      <ul class="text-[11px] text-slate-300 mt-3 space-y-1 font-mono">
        <li>• Retrieves live API documentation</li>
        <li>• Validates recent regulatory changes</li>
        <li>• Emits direct URL citations</li>
      </ul>
    </div>
    <div class="text-[10px] font-mono text-indigo-300 border-t border-slate-800 pt-2">
      Perplexity, Gemini Google Search
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex flex-col justify-between h-72">
    <div>
      <div class="text-xs font-mono text-emerald-400 font-bold uppercase mb-1">TOOL 02</div>
      <h3 class="text-base font-bold text-white font-serif min-h-[2.5rem] flex items-center">Code Interpreter</h3>
      <p class="text-slate-300 font-sans mt-2 leading-relaxed">
        Spins up an isolated sandboxed Python REPL to execute calculations and verify code assertions in real time.
      </p>
      <ul class="text-[11px] text-slate-300 mt-3 space-y-1 font-mono">
        <li>• Exact math calculation without hallucination</li>
        <li>• In-memory Pandas dataframe operations</li>
        <li>• Renders Matplotlib &amp; Seaborn charts</li>
      </ul>
    </div>
    <div class="text-[10px] font-mono text-emerald-300 border-t border-slate-800 pt-2">
      ChatGPT ADA, Claude Artifacts
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex flex-col justify-between h-72">
    <div>
      <div class="text-xs font-mono text-cyan-400 font-bold uppercase mb-1">TOOL 03</div>
      <h3 class="text-base font-bold text-white font-serif min-h-[2.5rem] flex items-center">Visual Diagramming</h3>
      <p class="text-slate-300 font-sans mt-2 leading-relaxed">
        Synthesizes Mermaid diagrams, SVG flowcharts, and architecture maps to communicate complex topologies.
      </p>
      <ul class="text-[11px] text-slate-300 mt-3 space-y-1 font-mono">
        <li>• Sequence &amp; distributed system traces</li>
        <li>• Database ERD entity modeling</li>
        <li>• State transition diagrams</li>
      </ul>
    </div>
    <div class="text-[10px] font-mono text-cyan-300 border-t border-slate-800 pt-2">
      Mermaid.js, SVG canvas rendering
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 flex flex-col justify-between h-72">
    <div>
      <div class="text-xs font-mono text-amber-400 font-bold uppercase mb-1">TOOL 04</div>
      <h3 class="text-base font-bold text-white font-serif min-h-[2.5rem] flex items-center">Function Calling</h3>
      <p class="text-slate-300 font-sans mt-2 leading-relaxed">
        Emits strict validated JSON payloads matching OpenAPI schemas to invoke backend databases and webhooks.
      </p>
      <ul class="text-[11px] text-slate-300 mt-3 space-y-1 font-mono">
        <li>• Executes SQL database transactions</li>
        <li>• Dispatches webhook payloads to n8n</li>
        <li>• Authenticates third-party API mutations</li>
      </ul>
    </div>
    <div class="text-[10px] font-mono text-amber-300 border-t border-slate-800 pt-2">
      OpenAPI Tools, Anthropic Tool Use
    </div>
  </div>
</div>

---

# Applied AI: Production Scenarios & Live Prompts
Full, battle-tested prompt templates ready to copy and test live across your workflows.

<div class="grid grid-cols-2 gap-4 mt-4 text-xs">
  <div v-click class="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/40 flex flex-col justify-between h-54">
    <div>
      <h3 class="text-sm font-bold text-white font-serif min-h-[1.75rem] flex items-center">Marketing Persona &amp; Angle Generation</h3>
      <div class="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[10.5px] text-slate-300 leading-relaxed overflow-y-auto max-h-32">
Act as a Senior Conversion Strategist. We are launching an AI-powered code review assistant. Generate 3 distinct developer buyer personas: 1) Overwhelmed Startup CTO, 2) Junior Bootcamper afraid of PR rejections, 3) Staff Engineer enforcing compliance. For each persona, provide: Primary Anxiety, Unvarnished Internal Monologue, and a 1-Sentence High-Converting Value Prop.
      </div>
    </div>
  </div>

  <div v-click class="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex flex-col justify-between h-54">
    <div>
      <h3 class="text-sm font-bold text-white font-serif min-h-[1.75rem] flex items-center">Data Analysis &amp; Anomaly Extraction</h3>
      <div class="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[10.5px] text-slate-300 leading-relaxed overflow-y-auto max-h-32">
I have uploaded server_latency_logs.csv with columns [timestamp, endpoint, status_code, latency_ms]. Run a Python analysis to calculate the p50, p95, and p99 latency by endpoint. Identify any endpoints exhibiting statistical latency degradation after 14:00 UTC, and output a markdown table accompanied by a line plot code snippet.
      </div>
    </div>
  </div>

  <div v-click class="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex flex-col justify-between h-54">
    <div>
      <h3 class="text-sm font-bold text-white font-serif min-h-[1.75rem] flex items-center">Code Debugging &amp; Test Generation</h3>
      <div class="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[10.5px] text-slate-300 leading-relaxed overflow-y-auto max-h-32">
Act as a Principal Node.js Engineer. Review the attached async function. 1) Pinpoint the unhandled Promise rejection race condition causing memory leaks, 2) Write a minimal reproduction unit test using Vitest that fails on current code, 3) Provide the refactored production function with exponential backoff retry.
      </div>
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 flex flex-col justify-between h-54">
    <div>
      <h3 class="text-sm font-bold text-white font-serif min-h-[1.75rem] flex items-center">Custom Daily Intelligence Aggregator</h3>
      <div class="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[10.5px] text-slate-300 leading-relaxed overflow-y-auto max-h-32">
Search the web for the top 5 technical announcements or open-source releases regarding LLM inference optimization published in the last 24 hours. Filter out promotional press releases. For each breakthrough, output: Headline, 2-Sentence Technical Mechanism Summary, Architectural Trade-off, and Primary Source URL.
      </div>
    </div>
  </div>
</div>
