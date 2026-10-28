---
layout: default
---

<ModuleTitleCard
  moduleNo="MODULE 02"
  title="The Modern AI Toolbox"
  subtitle="Do not use one chatbot for all tasks. Select the correct tool for each job."
  image="/images/02-toolbox.jpg"
  color="emerald"
/>

---
layout: default
---

<LectureOutcomes :module="2" />

---

# Foundation Models: Compare Costs and Features

Many models now offer similar base quality. Select models by cost, context limit, and data control.

<div class="grid grid-cols-2 gap-4 mt-5 w-full text-left" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <div v-click class="p-4 rounded-xl bg-slate-900/85 border border-indigo-500/50 flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[11px] font-mono font-bold text-indigo-400 tracking-wider">AMERICAN MODELS</span>
      </div>
      <h3 class="font-bold text-base text-white font-serif">Frontier Models &amp; Cloud Platforms</h3>
      <div class="flex items-center gap-2 mt-2.5">
        <AppIconTooltip name="ChatGPT (OpenAI)" icon="i-logos-openai-icon brightness-0 invert text-white" size="size-6" />
        <AppIconTooltip name="Claude (Anthropic)" icon="i-logos-claude-icon" size="size-6" />
        <AppIconTooltip name="Gemini (Google)" icon="i-logos-google-gemini" size="size-6" />
        <AppIconTooltip name="Llama (Meta)" icon="i-logos-meta-icon" size="size-6" />
      </div>
      <div class="mt-3.5 space-y-2 text-xs text-slate-200 font-sans">
        <div class="flex items-start gap-2">
          <span class="i-lucide-sparkles w-4 h-4 text-indigo-400 shrink-0 mt-0.5"></span>
          <span><strong>Advanced Reasoning:</strong> Built early transformers, extended test compute, and created computer control.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="i-lucide-layers w-4 h-4 text-indigo-400 shrink-0 mt-0.5"></span>
          <span><strong>Large Context:</strong> Process long video, audio, and code inputs with multi-million token windows.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="i-lucide-shield-check w-4 h-4 text-indigo-400 shrink-0 mt-0.5"></span>
          <span><strong>Enterprise Security:</strong> Support cloud deployment (Azure, AWS, Google Cloud) and security compliance.</span>
        </div>
      </div>
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/85 border border-emerald-500/50 flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[11px] font-mono font-bold text-emerald-400 tracking-wider">CHINESE MODELS</span>
      </div>
      <h3 class="font-bold text-base text-white font-serif">Low-Cost Models &amp; Open Weights</h3>
      <div class="flex items-center gap-2 mt-2.5">
        <AppIconTooltip name="DeepSeek" icon="i-logos-deepseek-icon" size="size-6" />
        <AppIconTooltip name="Qwen (Alibaba)" icon="i-logos-qwen-icon" size="size-6" />
        <AppIconTooltip name="Kimi (Moonshot AI)" icon="i-logos-moonshot-ai-icon brightness-0 invert text-white" size="size-6" />
        <AppIconTooltip name="GLM (Zhipu AI)" icon="glm text-blue-400" size="size-6" />
        <AppIconTooltip name="MiniMax" icon="i-logos-minimax-icon" size="size-6" />
      </div>
      <div class="mt-3.5 space-y-2 text-xs text-slate-200 font-sans">
        <div class="flex items-start gap-2">
          <span class="i-lucide-zap w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></span>
          <span><strong>High Efficiency:</strong> Use efficient model architectures to reduce API costs.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="i-lucide-server w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></span>
          <span><strong>Open Weights:</strong> Provide full weights for local, private hosting with no external data transfer.</span>
        </div>
        <div class="flex items-start gap-2">
          <span class="i-lucide-repeat w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></span>
          <span><strong>Fast Adaptation:</strong> Provide open reasoning models to developers worldwide.</span>
        </div>
      </div>
    </div>
  </div>
</div>

---

# Grounded Research: Web Search &amp; Document Notes

Compare live web search tools with private document notebooks.

<div class="grid grid-cols-2 gap-4 mt-5 w-full text-left" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <div v-click class="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40">
    <div class="flex items-center gap-3 mb-2">
      <AppIconTooltip name="Perplexity AI" icon="i-logos-perplexity-icon" size="size-7" />
      <div>
        <h3 class="font-bold text-xl text-white font-serif">Perplexity AI</h3>
        <div class="text-xs text-cyan-300/80 font-mono">Live Web Search Tool</div>
      </div>
    </div>
    <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
      An AI search tool that searches web sources and provides verified citations.
    </p>
    <div class="mt-3 space-y-2 text-xs font-sans">
      <div class="flex items-start gap-2.5">
        <span class="i-lucide-globe w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></span>
        <div>
          <strong class="text-white block">Live Web Search</strong>
          <span class="text-[11px] text-slate-400">Searches current web pages and removes low-quality results.</span>
        </div>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="i-lucide-link-2 w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></span>
        <div>
          <strong class="text-white block">Inline Citations</strong>
          <span class="text-[11px] text-slate-400">Links every fact to a verifiable web source.</span>
        </div>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="i-lucide-filter w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></span>
        <div>
          <strong class="text-white block">Focus Filters</strong>
          <span class="text-[11px] text-slate-400">Limits search to academic papers, videos, or discussions.</span>
        </div>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="i-lucide-search w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></span>
        <div>
          <strong class="text-white block">Deep Research</strong>
          <span class="text-[11px] text-slate-400">Runs multi-step searches to create detailed reports.</span>
        </div>
      </div>
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/40">
    <div class="flex items-center gap-3 mb-2">
      <AppIconTooltip name="Google NotebookLM" icon="notebooklm text-indigo-400" size="size-7" />
      <div>
        <h3 class="font-bold text-xl text-white font-serif">Google NotebookLM</h3>
        <div class="text-xs text-indigo-300/80 font-mono">Document-Based Analysis Tool</div>
      </div>
    </div>
    <p class="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
      A research assistant that answers questions only from your uploaded files.
    </p>
    <div class="mt-3 space-y-2 text-xs font-sans">
      <div class="flex items-start gap-2.5">
        <span class="i-lucide-shield-check w-4 h-4 text-indigo-400 shrink-0 mt-0.5"></span>
        <div>
          <strong class="text-white block">Accurate Answers</strong>
          <span class="text-[11px] text-slate-400">Answers only from your uploaded files with no external assumptions.</span>
        </div>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="i-lucide-bookmark w-4 h-4 text-indigo-400 shrink-0 mt-0.5"></span>
        <div>
          <strong class="text-white block">Direct Excerpts</strong>
          <span class="text-[11px] text-slate-400">Links answers directly to excerpts in your documents.</span>
        </div>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="i-lucide-circle-alert w-4 h-4 text-indigo-400 shrink-0 mt-0.5"></span>
        <div>
          <strong class="text-white block">Clear Limits</strong>
          <span class="text-[11px] text-slate-400">States clearly when an answer is not in your documents.</span>
        </div>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="i-lucide-headphones w-4 h-4 text-indigo-400 shrink-0 mt-0.5"></span>
        <div>
          <strong class="text-white block">Audio Summaries</strong>
          <span class="text-[11px] text-slate-400">Creates two-speaker audio summaries from your documents.</span>
        </div>
      </div>
    </div>
  </div>
</div>

---

# Visual &amp; Media AI Tools

Generate images, video clips, and audio files from text descriptions.

<div class="grid grid-cols-3 gap-4 mt-6 w-full text-left" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-pink-500/30 flex flex-col justify-start">
    <div class="text-[11px] font-mono font-bold text-pink-400 uppercase tracking-wider mb-1">Image Generation</div>
    <h3 class="font-bold text-lg text-white font-serif">Image Creation</h3>
    <div class="flex flex-wrap items-center gap-2 mt-2.5">
      <AppIconTooltip name="Midjourney" icon="i-logos-midjourney brightness-0 invert text-white" size="size-5.5" />
      <AppIconTooltip name="Flux (Black Forest Labs)" icon="flux text-white" size="size-5.5" />
      <AppIconTooltip name="Ideogram" icon="ideogram text-[#FF2E93]" size="size-5.5" />
      <AppIconTooltip name="Recraft" icon="recraft text-[#FF4438]" size="size-5.5" />
      <AppIconTooltip name="Adobe Firefly" icon="i-logos-adobe-icon" size="size-5.5" />
    </div>
    <div class="space-y-3 mt-4 text-xs font-medium text-slate-200 font-sans">
      <div class="flex items-center gap-2">
        <span class="i-lucide-camera w-4 h-4 text-pink-400 shrink-0"></span>
        <span>Photorealistic Concept Images</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-type w-4 h-4 text-pink-400 shrink-0"></span>
        <span>Text and Typography in Images</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-pen-tool w-4 h-4 text-pink-400 shrink-0"></span>
        <span>Vector Icons and Brand Graphics</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-wand-sparkles w-4 h-4 text-pink-400 shrink-0"></span>
        <span>Image Expansion and Editing</span>
      </div>
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 flex flex-col justify-start">
    <div class="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">Video Generation</div>
    <h3 class="font-bold text-lg text-white font-serif">Video Creation</h3>
    <div class="flex flex-wrap items-center gap-2 mt-2.5">
      <AppIconTooltip name="Kling AI" icon="kling text-[#00C8FF]" size="size-5.5" />
      <AppIconTooltip name="Runway (Gen-3)" icon="runway text-white" size="size-5.5" />
      <AppIconTooltip name="Luma Dream Machine" icon="luma text-[#8B5CF6]" size="size-5.5" />
      <AppIconTooltip name="Hailuo AI (MiniMax)" icon="hailuo text-[#0066FF]" size="size-5.5" />
      <AppIconTooltip name="Sora (OpenAI)" icon="sora text-white" size="size-5.5" />
    </div>
    <div class="space-y-3 mt-4 text-xs font-medium text-slate-200 font-sans">
      <div class="flex items-center gap-2">
        <span class="i-lucide-film w-4 h-4 text-amber-400 shrink-0"></span>
        <span>Image-to-Video Animation</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-camera w-4 h-4 text-amber-400 shrink-0"></span>
        <span>Camera Movement Controls</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-sparkles w-4 h-4 text-amber-400 shrink-0"></span>
        <span>Realistic Physical Motion</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-clapperboard w-4 h-4 text-amber-400 shrink-0"></span>
        <span>Short Background Video Clips</span>
      </div>
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex flex-col justify-start">
    <div class="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">Creative Suite</div>
    <h3 class="font-bold text-lg text-white font-serif">Design &amp; Audio</h3>
    <div class="flex flex-wrap items-center gap-2 mt-2.5">
      <AppIconTooltip name="Canva" icon="canva text-[#00C4CC]" size="size-5.5" />
      <AppIconTooltip name="CapCut" icon="capcut text-white" size="size-5.5" />
      <AppIconTooltip name="ElevenLabs" icon="i-logos-elevenlabs-icon brightness-0 invert text-white" size="size-5.5" />
      <AppIconTooltip name="Magnific AI" icon="magnific text-[#9333EA]" size="size-5.5" />
      <AppIconTooltip name="Topaz Labs" icon="topaz text-[#0066FF]" size="size-5.5" />
    </div>
    <div class="space-y-3 mt-4 text-xs font-medium text-slate-200 font-sans">
      <div class="flex items-center gap-2">
        <span class="i-lucide-refresh-cw w-4 h-4 text-cyan-400 shrink-0"></span>
        <span>Automatic Multi-Format Resizing</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-mic w-4 h-4 text-cyan-400 shrink-0"></span>
        <span>Voice Cloning and Audio Dubbing</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-maximize w-4 h-4 text-cyan-400 shrink-0"></span>
        <span>Image and Video Resolution Upscaling</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-scissors w-4 h-4 text-cyan-400 shrink-0"></span>
        <span>Automated Short Video Clips</span>
      </div>
    </div>
  </div>
</div>

---

# Coding Tools: Agents &amp; App Builders

Use autonomous agents to edit entire code repositories and build full applications.

<div class="grid grid-cols-2 gap-4 mt-6 w-full text-left" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30 flex flex-col justify-start">
    <div class="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider mb-1">Code Agents &amp; Editors</div>
    <h3 class="font-bold text-lg text-white font-serif">Code Agents</h3>
    <div class="flex flex-wrap items-center gap-2 mt-2.5">
      <AppIconTooltip name="Claude Code" icon="i-logos-claude-icon" size="size-5.5" />
      <AppIconTooltip name="Cursor" icon="cursor text-white" size="size-5.5" />
      <AppIconTooltip name="Antigravity" icon="antigravity text-[#38BDF8]" size="size-5.5" />
      <AppIconTooltip name="Codex (OpenAI)" icon="i-logos-openai-icon brightness-0 invert text-white" size="size-5.5" />
      <AppIconTooltip name="OpenCode" icon="opencode text-emerald-400" size="size-5.5" />
    </div>
    <div class="space-y-3 mt-4 text-xs font-medium text-slate-200 font-sans">
      <div class="flex items-center gap-2">
        <span class="i-lucide-folder-git-2 w-4 h-4 text-indigo-400 shrink-0"></span>
        <span>Refactor Multi-File Code Repositories</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-terminal w-4 h-4 text-indigo-400 shrink-0"></span>
        <span>Run Terminal Commands and Automated Tests</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-bug w-4 h-4 text-indigo-400 shrink-0"></span>
        <span>Analyze Stack Traces and Fix Errors</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-git-pull-request w-4 h-4 text-indigo-400 shrink-0"></span>
        <span>Create Code Diffs and Pull Requests</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-users w-4 h-4 text-indigo-400 shrink-0"></span>
        <span>Delegate Tasks to Specialized Subagents</span>
      </div>
    </div>
  </div>

  <div v-click class="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 flex flex-col justify-start">
    <div class="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">AI App Builders</div>
    <h3 class="font-bold text-lg text-white font-serif">Full-Stack App Builders</h3>
    <div class="flex flex-wrap items-center gap-2 mt-2.5">
      <AppIconTooltip name="Lovable" icon="lovable text-[#FF2E93]" size="size-5.5" />
      <AppIconTooltip name="Replit Agent" icon="i-logos-replit-icon" size="size-5.5" />
      <AppIconTooltip name="Bolt.new" icon="bolt text-white" size="size-5.5" />
      <AppIconTooltip name="v0 (Vercel)" icon="v0 text-white" size="size-5.5" />
    </div>
    <div class="space-y-3 mt-4 text-xs font-medium text-slate-200 font-sans">
      <div class="flex items-center gap-2">
        <span class="i-lucide-sparkles w-4 h-4 text-emerald-400 shrink-0"></span>
        <span>Generate Web Applications from Text Prompts</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-database w-4 h-4 text-emerald-400 shrink-0"></span>
        <span>Configure Databases, Authentication, and APIs</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-rocket w-4 h-4 text-emerald-400 shrink-0"></span>
        <span>Deploy Applications with One Click</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-layout w-4 h-4 text-emerald-400 shrink-0"></span>
        <span>Edit UI Elements Through Interactive Chat</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="i-lucide-code w-4 h-4 text-emerald-400 shrink-0"></span>
        <span>Export Standard Source Code</span>
      </div>
    </div>
  </div>
</div>

---

# AI Tools by Field: Interactive Tool

Select your field and goal to see the recommended prompt and result.

<ToolRecommender />
