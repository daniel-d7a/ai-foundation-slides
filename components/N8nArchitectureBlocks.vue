<script setup lang="ts">
import { ref } from 'vue'

interface SoftwareApp {
  name: string
  icon: string
}

interface Block {
  id: string
  num: string
  name: string
  role: string
  icon: string
  theme: 'cyan' | 'indigo' | 'amber' | 'emerald'
  summary: string
  software: SoftwareApp[]
  examples: { name: string; icon: string; detail: string }[]
}

const blocks: Block[] = [
  {
    id: 'trigger',
    num: '01',
    name: 'Trigger Node',
    role: 'The Spark (Event Listener)',
    icon: 'i-lucide-zap',
    theme: 'cyan',
    summary: 'Listens 24/7 for events. Starts pipeline execution when an event occurs.',
    software: [
      { name: 'Telegram', icon: 'i-logos-telegram' },
      { name: 'Gmail', icon: 'i-logos-google-gmail' },
      { name: 'Stripe', icon: 'i-logos-stripe' },
      { name: 'GitHub', icon: 'i-logos-github-icon' },
    ],
    examples: [
      { name: 'Webhook', icon: 'i-lucide-globe', detail: 'Instant HTTP POST from external app' },
      { name: 'Cron Schedule', icon: 'i-lucide-clock', detail: 'Runs on fixed timer (e.g., daily 8 AM)' },
      { name: 'App Listener', icon: 'i-lucide-inbox', detail: 'New email in Gmail or Telegram message' },
    ],
  },
  {
    id: 'transform',
    num: '02',
    name: 'Logic & Transform',
    role: 'The Router (Control Flow)',
    icon: 'i-lucide-git-branch',
    theme: 'indigo',
    summary: 'Filters, reformats, and routes data through conditional if/then logic.',
    software: [
      { name: 'JavaScript', icon: 'i-logos-javascript' },
      { name: 'Python', icon: 'i-logos-python' },
      { name: 'Node.js', icon: 'i-logos-nodejs-icon' },
      { name: 'JSON', icon: 'i-logos-json' },
    ],
    examples: [
      { name: 'If / Switch Node', icon: 'i-lucide-split', detail: 'Branch logic: VIP lead vs standard lead' },
      { name: 'Code / Set Node', icon: 'i-lucide-code-2', detail: 'Clean and format data fields' },
      { name: 'Merge & Aggregate', icon: 'i-lucide-layers', detail: 'Combine multiple data streams into one' },
    ],
  },
  {
    id: 'ai',
    num: '03',
    name: 'AI Agent Node',
    role: 'The Brain (Cognitive Core)',
    icon: 'i-lucide-cpu',
    theme: 'amber',
    summary: 'Ingests messy unstructured inputs, reasons with an LLM, and calls tools.',
    software: [
      { name: 'OpenAI', icon: 'i-logos-openai-icon' },
      { name: 'Claude', icon: 'i-logos-anthropic-icon' },
      { name: 'Gemini', icon: 'i-logos-google-gemini' },
      { name: 'Ollama', icon: 'i-lucide-bot' },
    ],
    examples: [
      { name: 'Model Selector', icon: 'i-lucide-sparkles', detail: 'Connects Claude, Gemini, or ChatGPT' },
      { name: 'Prompt & Memory', icon: 'i-lucide-book-open', detail: 'Maintains system rules and conversation history' },
      { name: 'Tools & Functions', icon: 'i-lucide-wrench', detail: 'Web search, SQL queries, calculator' },
    ],
  },
  {
    id: 'output',
    num: '04',
    name: 'Action & Sink Node',
    role: 'The Hands (Side Effects)',
    icon: 'i-lucide-send',
    theme: 'emerald',
    summary: 'Writes results to databases, notifies teams, and synchronizes services.',
    software: [
      { name: 'Slack', icon: 'i-logos-slack-icon' },
      { name: 'Notion', icon: 'i-logos-notion-icon' },
      { name: 'Airtable', icon: 'i-logos-airtable' },
      { name: 'PostgreSQL', icon: 'i-logos-postgresql' },
    ],
    examples: [
      { name: 'Database Sink', icon: 'i-lucide-database', detail: 'Insert or update PostgreSQL, Airtable, Notion' },
      { name: 'Team Alert', icon: 'i-lucide-message-square', detail: 'Send rich messages to Slack or Discord' },
      { name: 'Outbound API', icon: 'i-lucide-external-link', detail: 'Trigger external payment, email, or webhook' },
    ],
  },
]

const activeBlockId = ref('trigger')
const activeBlock = ref(blocks[0])

function selectBlock(b: Block) {
  activeBlockId.value = b.id
  activeBlock.value = b
}
</script>

<template>
  <div class="w-full max-w-5xl mx-auto h-[385px] flex flex-col justify-between select-none font-sans">
    
    <!-- Top Interactive Pipeline Architecture Visualizer -->
    <div class="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl">
      <div class="text-[9.5px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
        <span class="flex items-center gap-1.5 font-bold text-white">
          <span class="i-lucide-workflow w-3.5 h-3.5 text-cyan-400"></span>
          n8n Workflow Anatomy: Click a building block to inspect
        </span>
        <span class="text-cyan-400 font-mono">Sequential Flow &bull; Event Driven</span>
      </div>

      <!-- 4 Connected Nodes Pipeline Ribbon -->
      <div class="grid grid-cols-4 gap-2.5 relative">
        <div
          v-for="b in blocks"
          :key="b.id"
          @click="selectBlock(b)"
          class="p-2.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between"
          :class="activeBlockId === b.id
            ? (b.theme === 'cyan' ? 'bg-cyan-950/60 border-cyan-400 shadow-md ring-2 ring-cyan-500/30 scale-102' :
               b.theme === 'indigo' ? 'bg-indigo-950/60 border-indigo-400 shadow-md ring-2 ring-indigo-500/30 scale-102' :
               b.theme === 'amber' ? 'bg-amber-950/60 border-amber-400 shadow-md ring-2 ring-amber-500/30 scale-102' :
               'bg-emerald-950/60 border-emerald-400 shadow-md ring-2 ring-emerald-500/30 scale-102')
            : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'"
        >
          <div class="flex items-center justify-between">
            <span
              class="w-6 h-6 rounded-md flex items-center justify-center text-xs"
              :class="b.theme === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                      b.theme === 'indigo' ? 'bg-indigo-500/20 text-indigo-400' :
                      b.theme === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'"
            >
              <span :class="b.icon" class="w-3.5 h-3.5"></span>
            </span>
            <span class="text-[9px] font-mono text-slate-500 font-bold">{{ b.num }}</span>
          </div>

          <div class="mt-2">
            <div class="text-[11px] font-bold text-white font-serif leading-tight">{{ b.name }}</div>
            <div
              class="text-[9px] font-mono leading-tight mt-0.5 truncate"
              :class="b.theme === 'cyan' ? 'text-cyan-300' :
                      b.theme === 'indigo' ? 'text-indigo-300' :
                      b.theme === 'amber' ? 'text-amber-300' :
                      'text-emerald-300'"
            >
              {{ b.role }}
            </div>

            <!-- Mini Software Primitives Icons -->
            <div class="flex items-center gap-1.5 mt-2 pt-1 border-t border-slate-800/80">
              <span
                v-for="sw in b.software"
                :key="sw.name"
                :class="sw.icon"
                class="w-3 h-3 opacity-75 hover:opacity-100 transition-opacity"
                :title="sw.name"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Deep Dive: Selected Block Detail with Visual Diagram Cards -->
    <div
      class="flex-1 my-2 p-3.5 rounded-2xl border bg-slate-950/90 flex flex-col justify-between shadow-xl transition-all"
      :class="activeBlock.theme === 'cyan' ? 'border-cyan-500/40 shadow-cyan-950/20' :
              activeBlock.theme === 'indigo' ? 'border-indigo-500/40 shadow-indigo-950/20' :
              activeBlock.theme === 'amber' ? 'border-amber-500/40 shadow-amber-950/20' :
              'border-emerald-500/40 shadow-emerald-950/20'"
    >
      <div>
        <!-- Title & Role Banner with Software Icons across from primitive name -->
        <div class="flex items-center justify-between pb-2 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span
              class="w-7 h-7 rounded-lg flex items-center justify-center p-1 border shrink-0"
              :class="activeBlock.theme === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' :
                      activeBlock.theme === 'indigo' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' :
                      activeBlock.theme === 'amber' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                      'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'"
            >
              <span :class="activeBlock.icon" class="w-4 h-4"></span>
            </span>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-white font-serif">{{ activeBlock.name }}</span>
              <span
                class="text-[9px] font-mono px-1.5 py-0.2 rounded border"
                :class="activeBlock.theme === 'cyan' ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300' :
                        activeBlock.theme === 'indigo' ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300' :
                        activeBlock.theme === 'amber' ? 'bg-amber-950/60 border-amber-500/40 text-amber-300' :
                        'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'"
              >
                {{ activeBlock.role }}
              </span>
            </div>
          </div>

          <!-- Software Primitive Icons across from Primitive Name -->
          <div class="flex items-center gap-1.5">
            <span class="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Software:</span>
            <div class="flex items-center gap-1">
              <div
                v-for="sw in activeBlock.software"
                :key="sw.name"
                class="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 shadow-sm"
              >
                <span :class="sw.icon" class="w-3.5 h-3.5 shrink-0"></span>
                <span class="text-[9.5px] font-medium text-slate-200">{{ sw.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Paragraph -->
        <p class="text-[11px] text-slate-300 my-2 leading-relaxed font-sans">
          {{ activeBlock.summary }}
        </p>

        <!-- 3 Visual Example Connectors -->
        <div class="grid grid-cols-3 gap-2.5 mt-2">
          <div
            v-for="(ex, i) in activeBlock.examples"
            :key="i"
            class="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5"
          >
            <div
              class="w-7 h-7 rounded-lg flex items-center justify-center p-1 shrink-0 mt-0.5"
              :class="activeBlock.theme === 'cyan' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/80' :
                      activeBlock.theme === 'indigo' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800/80' :
                      activeBlock.theme === 'amber' ? 'bg-amber-950 text-amber-400 border border-amber-800/80' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-800/80'"
            >
              <span :class="ex.icon" class="w-3.5 h-3.5"></span>
            </div>
            <div class="min-w-0">
              <div class="text-[11px] font-bold text-white font-serif leading-tight">{{ ex.name }}</div>
              <div class="text-[9.5px] text-slate-400 leading-tight mt-1">{{ ex.detail }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Takeaway -->
      <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span class="flex items-center gap-1.5">
          <span class="i-lucide-check-circle-2 w-3.5 h-3.5 text-emerald-400"></span>
          <span>Every n8n workflow combines these 4 primitives to turn manual labor into 24/7 background automation.</span>
        </span>
        <span class="text-slate-500">n8n Modular Primitives</span>
      </div>
    </div>

  </div>
</template>
