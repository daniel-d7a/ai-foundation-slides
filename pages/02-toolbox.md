---
layout: section
---

# Module 02
<div class="text-3xl font-bold text-white font-serif">
  The Modern AI Toolbox
</div>
<p class="text-slate-300 mt-2 font-sans">
  Stop using one chatbot for everything: Selecting precision foundation engines.
</p>

---

# Foundation LLMs: The Core Landscape
All modern chat models share autoregressive transformer foundations, but diverge in specialization.

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-mono font-bold text-indigo-400">GOOGLE</span>
        <span class="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-bold">2M TOKENS</span>
      </div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Gemini 2.0 Flash / Pro</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Native multimodal processing designed to ingest hours of video, audio, and multi-thousand page documents without chunking.
      </p>
      <ul class="text-[11px] text-slate-300 mt-2.5 space-y-1 font-mono">
        <li>• Massive Context: Ingest entire repos</li>
        <li>• Multimodal: Audio/video understanding</li>
        <li>• Ecosystem: Deep Google Workspace sync</li>
      </ul>
    </div>
    <div class="mt-2 text-[11px] font-mono text-indigo-300 border-t border-slate-800 pt-2">
      Best for: Long-form document synthesis &amp; video QA
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-mono font-bold text-amber-400">ANTHROPIC</span>
        <span class="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">CODE &amp; REASON</span>
      </div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Claude 3.5 Sonnet</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Industry benchmark for software engineering, complex multi-step reasoning, and articulate academic prose.
      </p>
      <ul class="text-[11px] text-slate-300 mt-2.5 space-y-1 font-mono">
        <li>• Code Architecture: SOTA benchmark performance</li>
        <li>• Nuanced Prose: Eliminates corporate buzzwords</li>
        <li>• Artifacts: Live interactive UI canvas rendering</li>
      </ul>
    </div>
    <div class="mt-2 text-[11px] font-mono text-amber-300 border-t border-slate-800 pt-2">
      Best for: Programming, nuanced writing, system design
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-mono font-bold text-emerald-400">OPENAI</span>
        <span class="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">VOICE &amp; SANDBOX</span>
      </div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">ChatGPT-4o</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Versatile generalist platform featuring native low-latency voice dialogue and server-side Python runtime execution.
      </p>
      <ul class="text-[11px] text-slate-300 mt-2.5 space-y-1 font-mono">
        <li>• Python Sandbox: Run code on CSVs in-memory</li>
        <li>• Real-Time Voice: Interruption-capable audio</li>
        <li>• Custom GPTs: Tailored instruction workflows</li>
      </ul>
    </div>
    <div class="mt-2 text-[11px] font-mono text-emerald-300 border-t border-slate-800 pt-2">
      Best for: Data crunching, spoken coaching, daily versatility
    </div>
  </div>
</div>

---

# Grounded Research: Citations vs Hallucinations
Comparing real-time multi-source retrieval against document-grounded notebooks.

<div class="grid grid-cols-2 gap-4 mt-6">
  <div v-click class="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-mono font-bold text-cyan-400">WEB-GROUNDED RAG</span>
        <span class="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">LIVE SOURCES</span>
      </div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Perplexity AI</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Scrapes live search indexes, filters low-quality SEO farms, and summarizes multi-page findings with numbered superscript citations.
      </p>
      <div class="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
        <div><strong>Pipeline:</strong> Query &rarr; Web Crawl &rarr; Cross-Reference &rarr; Verified Citations</div>
        <div class="text-slate-400"><strong>Use Case:</strong> Competitive analysis, technical docs, market research.</div>
      </div>
    </div>
    <div class="mt-2 text-[11px] font-mono text-cyan-300 border-t border-slate-800 pt-2">
      Ensures zero stale data or fabricated URLs
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-mono font-bold text-indigo-400">SOURCE-CONSTRAINED NOTEBOOK</span>
        <span class="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-bold">ZERO HALLUCINATION</span>
      </div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Google NotebookLM</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Upload up to 50 textbook PDFs, raw notes, or transcripts. Answers are 100% constrained to uploaded corpus with exact paragraph quotes.
      </p>
      <div class="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
        <div><strong>Audio Overview:</strong> Generates two-host deep dive conversational podcast.</div>
        <div class="text-slate-400"><strong>Constraint:</strong> If missing from notes, model explicitly admits absence.</div>
      </div>
    </div>
    <div class="mt-2 text-[11px] font-mono text-indigo-300 border-t border-slate-800 pt-2">
      Guarantees grounded study guides and board exam synthesis
    </div>
  </div>
</div>

---

# Visual & Marketing AI Suite
Transforming natural language descriptions into production-ready visual assets and campaign creative.

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="text-xs font-mono font-bold text-pink-400">DIFFUSION ENGINE</div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Midjourney v6 &amp; Flux</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        SOTA image synthesis engines capable of photorealism, volumetric lighting, and precise typographical rendering inside images.
      </p>
      <div class="mt-3 p-2 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
        /imagine prompt: cinematic 35mm photograph of architectural model, studio rim lighting --ar 16:9 --v 6.1
      </div>
    </div>
    <div class="mt-2 text-[11px] font-mono text-pink-300 border-t border-slate-800 pt-2">
      Photorealistic rendering &amp; concept art
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="text-xs font-mono font-bold text-cyan-400">DESIGN AUTOMATION</div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Canva Magic Studio</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Converts text briefs directly into multi-slide presentations, multi-format social cards, background removal, and automated brand resizing.
      </p>
      <ul class="text-[11px] text-slate-300 mt-3 space-y-1 font-mono">
        <li>• Magic Switch: 1-click resize from 16:9 to 9:16</li>
        <li>• Magic Eraser: Instant background element cleanup</li>
        <li>• Brand Kit: Auto-applies institutional color palettes</li>
      </ul>
    </div>
    <div class="mt-2 text-[11px] font-mono text-cyan-300 border-t border-slate-800 pt-2">
      High-velocity marketing asset adaptation
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="text-xs font-mono font-bold text-amber-400">GENERATIVE VIDEO</div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Runway Gen-3 &amp; Kling</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Generates 5-10 second cinematic video clips from image keyframes or detailed physics prompts with motion camera controls.
      </p>
      <ul class="text-[11px] text-slate-300 mt-3 space-y-1 font-mono">
        <li>• Image-to-Video: Animate static graphics</li>
        <li>• Camera Pan/Tilt: Programmable trajectory</li>
        <li>• High FPS: Temporal frame consistency</li>
      </ul>
    </div>
    <div class="mt-2 text-[11px] font-mono text-amber-300 border-t border-slate-800 pt-2">
      Dynamic social video hooks &amp; b-roll
    </div>
  </div>
</div>

---

# Coding & Logic Engines
Agentic editors that move beyond simple inline autocomplete to whole-repository reasoning.

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="text-xs font-mono font-bold text-indigo-400">AGENTIC REPO IDE</div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Cursor IDE</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        VS Code fork with full-codebase vector embeddings. Evaluates symbols, references, and dependencies to perform multi-file diffs.
      </p>
      <div class="mt-3 p-2 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1">
        <div>• <strong>@codebase:</strong> Semantic AST graph indexing</div>
        <div>• <strong>Composer:</strong> Edits 10 files simultaneously</div>
      </div>
    </div>
    <div class="mt-2 text-[11px] font-mono text-indigo-300 border-t border-slate-800 pt-2">
      Standard for full-stack prototype construction
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="text-xs font-mono font-bold text-cyan-400">DEEP REASONING AGENT</div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">Google Antigravity</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Autonomous coding partner capable of subagent delegation, terminal execution, artifact generation, and verified self-correction.
      </p>
      <div class="mt-3 p-2 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1">
        <div>• <strong>Terminal Execution:</strong> Runs npm/git in sandbox</div>
        <div>• <strong>Subagent Teams:</strong> Parallel research &amp; write</div>
      </div>
    </div>
    <div class="mt-2 text-[11px] font-mono text-cyan-300 border-t border-slate-800 pt-2">
      Self-contained build &amp; verify workflows
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col justify-between h-72">
    <div>
      <div class="text-xs font-mono font-bold text-emerald-400">GHOST-TEXT AUTOCOMPLETE</div>
      <h3 class="font-bold text-lg text-white mt-1 font-serif min-h-[2.5rem] flex items-center">GitHub Copilot</h3>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
        Zero-friction inline code suggestion engine. Predicts repetitive boilerplate functions and unit tests as you type in your editor.
      </p>
      <div class="mt-3 p-2 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1">
        <div>• <strong>Tab Completion:</strong> Microsecond latency</div>
        <div>• <strong>Test Scaffolding:</strong> Fills repetitive assertions</div>
      </div>
    </div>
    <div class="mt-2 text-[11px] font-mono text-emerald-300 border-t border-slate-800 pt-2">
      Daily productivity booster for active developers
    </div>
  </div>
</div>

---

# AI for Every Major: Interactive Recommender
Select your domain and target objective to review the optimal tool stack and live production prompt.

<ToolRecommender />
