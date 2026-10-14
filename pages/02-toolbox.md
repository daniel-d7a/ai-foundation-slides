---
layout: section
---

# Module 02
<div class="text-3xl font-bold bg-gradient-to-r from-emerald-300 via-white to-emerald-400 bg-clip-text text-transparent">
  The Modern AI Toolbox
</div>
<p class="text-slate-400 mt-2">
  Stop using one chatbot for everything: Pick the precision tool for the job.
</p>

---

# Chat & Ideation: The Big Three
Each foundation model has evolved distinct cognitive strengths and optimal use cases.

<div class="grid grid-cols-3 gap-4 mt-6">
  <SlideCard title="Gemini (Google)" subtitle="Multimodal & Scale" accent="indigo" hoverEffect>
    <div class="text-xs space-y-2">
      <div class="p-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-[11px]">
        Superpower: 1M–2M Token Context Window
      </div>
      <p>Seamlessly digests 2-hour video recordings, 1,000-page book PDFs, or entire repositories in a single prompt.</p>
      <div class="text-[11px] text-slate-400">
        <strong>Best for:</strong> Long-form analysis, multimodal reasoning, Google Workspace integration.
      </div>
    </div>
  </SlideCard>

  <SlideCard title="Claude (Anthropic)" subtitle="Nuance & Reasoning" accent="amber" hoverEffect>
    <div class="text-xs space-y-2">
      <div class="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[11px]">
        Superpower: Natural Writing & Artifacts
      </div>
      <p>Exceptional tone calibration, human-grade prose, and interactive frontend rendering in side-panel Artifacts.</p>
      <div class="text-[11px] text-slate-400">
        <strong>Best for:</strong> Academic writing, complex coding architectures, deep reasoning tasks.
      </div>
    </div>
  </SlideCard>

  <SlideCard title="ChatGPT (OpenAI)" subtitle="The Ecosystem Pioneer" accent="emerald" hoverEffect>
    <div class="text-xs space-y-2">
      <div class="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[11px]">
        Superpower: Advanced Voice & Data Analysis
      </div>
      <p>Real-time conversational voice mode, Python code execution sandbox, and a massive ecosystem of custom GPTs.</p>
      <div class="text-[11px] text-slate-400">
        <strong>Best for:</strong> Spoken tutoring, rapid data crunching with CSVs, versatile daily assistant.
      </div>
    </div>
  </SlideCard>
</div>

---

# Research & Writing: Grounded Intelligence
Moving from open-web guessing to hallucination-free, citation-backed knowledge.

<div class="grid grid-cols-2 gap-4 mt-6">
  <div class="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/40">
    <div class="flex items-center justify-between mb-2">
      <h3 class="font-bold text-base text-cyan-300">Perplexity AI</h3>
      <span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">Real-Time Web RAG</span>
    </div>
    <p class="text-xs text-slate-300 leading-relaxed mb-3">
      Replaces traditional search engines by synthesizing live web pages and providing direct inline superscript citations for every claim made.
    </p>
    <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono">
      Query -> Multi-source search -> Rerank sources -> Synthesize with footnotes
    </div>
  </div>

  <div class="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/40">
    <div class="flex items-center justify-between mb-2">
      <h3 class="font-bold text-base text-indigo-300">NotebookLM (Google)</h3>
      <span class="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">Source-Grounded Notebook</span>
    </div>
    <p class="text-xs text-slate-300 leading-relaxed mb-3">
      Upload up to 50 PDFs, lecture slides, or audio files. Answers are strictly constrained to your notes with clickable source quotes, plus podcast-style Audio Overviews.
    </p>
    <div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono">
      Zero hallucination: If it's not in your uploaded notes, it won't invent it.
    </div>
  </div>
</div>

---

# Visual, Marketing & Coding Engines
Transforming ideas into high-fidelity visual media and software codebases.

<div class="grid grid-cols-2 gap-4 mt-4">
  <SlideCard title="Visual & Marketing Suite" subtitle="Midjourney & Canva AI" accent="pink" hoverEffect>
    <ul class="space-y-2 text-xs">
      <li>
        <strong class="text-pink-300">Midjourney v6:</strong> Photorealistic imagery, cinematic lighting, and conceptual art generation via Discord and web interfaces.
      </li>
      <li>
        <strong class="text-pink-300">Canva Magic Studio:</strong> Instantly converts text briefs into social carousels, slide presentations, background removal, and multi-channel asset resizing.
      </li>
    </ul>
  </SlideCard>

  <SlideCard title="Coding & Logic Suite" subtitle="Cursor, Antigravity, Copilot" accent="cyan" hoverEffect>
    <ul class="space-y-2 text-xs">
      <li>
        <strong class="text-cyan-300">Cursor / Antigravity:</strong> Next-gen agentic code editors with full-repo semantic indexing, multi-file atomic edits, and terminal execution.
      </li>
      <li>
        <strong class="text-cyan-300">GitHub Copilot:</strong> Real-time ghost text code autocomplete integrated into everyday developer environments.
      </li>
    </ul>
  </SlideCard>
</div>

---

# AI for Every Major: Interactive Recommender
Select your field and objective to determine your optimal modern AI stack.

<ToolRecommender />
