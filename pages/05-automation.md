---
layout: section
---

# Module 05
<div class="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-white to-cyan-400 bg-clip-text text-transparent">
  Putting It on Autopilot
</div>
<p class="text-slate-400 mt-2">
  From Prompting to Autonomous Systems: Visual Automation with n8n.
</p>

---

# Chatting vs. Automating
The fundamental paradigm shift from manual intervention to proactive software.

<div class="grid grid-cols-2 gap-4 mt-6 text-xs">
  <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
    <div class="text-xs font-mono text-slate-400 font-bold uppercase mb-2">💬 Manual Chatbot Prompting</div>
    <ul class="space-y-2 text-slate-300">
      <li>• <strong>Reactive:</strong> Nothing happens until a human types a prompt.</li>
      <li>• <strong>Manual Copy/Paste:</strong> You must transfer outputs to Slack, Gmail, or Notion by hand.</li>
      <li>• <strong>Linear & Single-Session:</strong> Limited to one conversation thread.</li>
      <li>• <strong>High Friction:</strong> Scales linearly with human time.</li>
    </ul>
  </div>

  <div class="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/40">
    <div class="text-xs font-mono text-cyan-400 font-bold uppercase mb-2">⚡ Visual Workflow Automation</div>
    <ul class="space-y-2 text-slate-200">
      <li>• <strong>Proactive & Event-Driven:</strong> Runs on webhooks, schedules, or database updates.</li>
      <li>• <strong>System Orchestration:</strong> Connects LLMs directly to 400+ apps without coding.</li>
      <li>• <strong>Multi-Step Pipelines:</strong> Routes data, makes decisions, and executes side effects.</li>
      <li>• <strong>Zero Human Overhead:</strong> Runs continuously 24/7 in the cloud.</li>
    </ul>
  </div>
</div>

---

# Anatomy of an n8n Workflow
Workflows are built from 3 core node types linked together.

<div class="grid grid-cols-3 gap-3 mt-6 text-xs">
  <div class="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/40">
    <div class="flex items-center gap-2 mb-2">
      <span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
      <h3 class="font-bold text-sm text-cyan-300">1. Trigger Node</h3>
    </div>
    <div class="text-[11px] font-mono text-slate-400 mb-2">"When this happens..."</div>
    <p class="text-slate-300 leading-relaxed">
      Starts the execution. Can be a Webhook, a schedule (every morning at 8 AM), an incoming email, or a Google Sheet row.
    </p>
  </div>

  <div class="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/40">
    <div class="flex items-center gap-2 mb-2">
      <span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
      <h3 class="font-bold text-sm text-indigo-300">2. AI Agent Node</h3>
    </div>
    <div class="text-[11px] font-mono text-slate-400 mb-2">"Reason & transform..."</div>
    <p class="text-slate-300 leading-relaxed">
      Passes the input data to Claude, Gemini, or OpenAI with a structured prompt to summarize, classify, or generate JSON.
    </p>
  </div>

  <div class="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40">
    <div class="flex items-center gap-2 mb-2">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
      <h3 class="font-bold text-sm text-emerald-300">3. Action Node</h3>
    </div>
    <div class="text-[11px] font-mono text-slate-400 mb-2">"Deliver the result..."</div>
    <p class="text-slate-300 leading-relaxed">
      Takes the AI's output and delivers it: sends a Slack notification, posts a LinkedIn update, or creates a Notion database page.
    </p>
  </div>
</div>

---

# Practical Pipeline: Interactive n8n Simulator
Test the automated content generation pipeline from raw idea to multi-channel post.

<MiniN8nCanvas />

---

# Step-by-Step n8n Build Guide
How to replicate this production workflow in the real n8n editor.

<div class="grid grid-cols-4 gap-3 mt-4 text-xs">
  <StepItem step="1" title="Set Up Trigger">
    Create a <strong>Webhook</strong> or <strong>Telegram Trigger</strong> node to receive incoming text ideas from your mobile device.
  </StepItem>

  <StepItem step="2" title="Attach AI Agent">
    Add an <strong>AI Agent Node</strong> with the <strong>OpenAI/Anthropic Chat Model</strong> sub-node and system prompt.
  </StepItem>

  <StepItem step="3" title="Map Variables">
    Extract fields using standard n8n expression syntax: <code class="text-indigo-300 font-mono text-[10px]">&#123;&#123; $json.idea &#125;&#125;</code>.
  </StepItem>

  <StepItem step="4" title="Publish Asset">
    Connect output to <strong>LinkedIn Node</strong> or <strong>Notion Node</strong> to store draft assets in your review calendar.
  </StepItem>
</div>

<div class="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
  💡 <strong>Pro-Tip:</strong> Always insert an optional human-in-the-loop approval step (e.g., Slack button <em>"Approve draft?"</em>) before publishing to live accounts.
</div>

---

# Capstone Challenge: Build Your Own Pipeline
Synthesize all 5 modules into a production workflow.

<div class="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/80 border border-indigo-500/40 mt-4 text-xs">
  <h3 class="font-bold text-sm text-white mb-2">The AI Architect Capstone:</h3>
  <p class="text-slate-300 leading-relaxed mb-3">
    Combine your knowledge of the modern AI toolbox, structured prompt engineering, and n8n to build an automated workflow that solves a real problem in your major or daily life:
  </p>
  <div class="grid grid-cols-3 gap-3">
    <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
      <div class="font-bold text-indigo-300 mb-1">Option A: Study Assistant</div>
      <p class="text-slate-400 text-[11px]">Auto-summarize new YouTube lecture videos into daily flashcards sent to Telegram.</p>
    </div>
    <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
      <div class="font-bold text-emerald-300 mb-1">Option B: Research Digest</div>
      <p class="text-slate-400 text-[11px]">Daily RSS paper monitor that generates 3-bullet executive briefs in a Notion database.</p>
    </div>
    <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
      <div class="font-bold text-amber-300 mb-1">Option C: Career Agent</div>
      <p class="text-slate-400 text-[11px]">Scrapes targeted job postings and drafts tailored resume match scores and cover letters.</p>
    </div>
  </div>
</div>
