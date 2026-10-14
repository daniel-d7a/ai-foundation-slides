<script setup lang="ts">
import { ref, computed } from 'vue'

interface WorkflowPreset {
  id: string
  title: string
  iconClass: string
  triggerTitle: string
  triggerIcon: string
  triggerPayload: string
  aiTitle: string
  aiModel: string
  aiPrompt: string
  actionTitle: string
  actionApp: string
  actionResult: string
}

const presets: WorkflowPreset[] = [
  {
    id: 'study',
    title: 'Study Lecture Pipeline',
    iconClass: 'i-lucide-book-open',
    triggerTitle: 'Telegram Voice / Note Webhook',
    triggerIcon: 'i-lucide-send',
    triggerPayload: '{\n  "source": "telegram_bot",\n  "note": "Biology chapter 4: Krebs cycle ATP yield & oxidative phosphorylation enzymes",\n  "student_id": "bio_101"\n}',
    aiTitle: 'Claude 3.5 Sonnet Extraction',
    aiModel: 'Anthropic Claude 3.5 Sonnet',
    aiPrompt: 'Extract 3 high-yield testable mechanisms with cloze deletion flashcards formatted for active recall study.',
    actionTitle: 'Notion Database Page Creation',
    actionApp: 'Notion API',
    actionResult: 'Created Page: "Krebs Cycle Master Study Guide"\n• Flashcard 1: Complex I oxidizes {{c1::NADH}} into {{c2::NAD+}}\n• Flashcard 2: Total ATP yield per glucose molecule is {{c1::30-32 ATP}}\n• Status: Synced to Notion Study Calendar',
  },
  {
    id: 'marketing',
    title: 'Marketing Content Engine',
    iconClass: 'i-lucide-megaphone',
    triggerTitle: 'Product Brief Webhook',
    triggerIcon: 'i-lucide-globe',
    triggerPayload: '{\n  "product": "FocusPulse App",\n  "target_audience": "College students 48h before midterms",\n  "key_feature": "Turns messy PDFs into 5-minute flashcards"\n}',
    aiTitle: 'Claude Structured Multi-Copy',
    aiModel: 'Anthropic Claude 3.5 Sonnet',
    aiPrompt: 'Generate a 2-part campaign: an attention-grabbing X thread hook and a LinkedIn article focusing on cramming anxiety.',
    actionTitle: 'Multi-Channel Social Dispatch',
    actionApp: 'Buffer / LinkedIn API',
    actionResult: '[X/Twitter Post]\nMost students spend 80% of study time re-reading highlighted notes that never stick.\nHere is how top GPA learners turn raw slides into 5-minute recall loops.\n\n[LinkedIn Post]\nHow to eliminate exam cram fatigue: moving from passive document reading to active retrieval loops.',
  },
  {
    id: 'devops',
    title: 'DevOps Error Triage Sentinel',
    iconClass: 'i-lucide-terminal',
    triggerTitle: 'Sentry HTTP 500 Webhook',
    triggerIcon: 'i-lucide-alert-triangle',
    triggerPayload: '{\n  "error": "DatabaseTimeoutError",\n  "endpoint": "POST /api/checkout",\n  "stack_trace": "Connection pool timeout after 5000ms at pg-pool.js:142"\n}',
    aiTitle: 'Gemini 2.0 Root Cause Analysis',
    aiModel: 'Google Gemini 2.0 Flash',
    aiPrompt: 'Diagnose server deadlock condition, provide root cause hypothesis, and draft immediate hotfix instructions.',
    actionTitle: 'Slack Incident Channel Alert',
    actionApp: 'Slack Webhook',
    actionResult: '🚨 [CRITICAL INCIDENT ALERT: #devops-war-room]\nRoot Cause: Unbounded connection leak in checkout transaction.\nMitigation: Kill idle transactions > 10s and increase pg-pool max connections from 20 to 50.',
  },
]

const currentPresetId = ref('study')
const activePreset = computed(() => presets.find(p => p.id === currentPresetId.value) || presets[0])

const workflowState = ref<'idle' | 'running_node1' | 'running_node2' | 'completed'>('idle')
const activeOutputTab = ref<'action' | 'ai' | 'trigger'>('action')

function selectPreset(id: string) {
  currentPresetId.value = id
  workflowState.value = 'idle'
  activeOutputTab.value = 'action'
}

function runWorkflow() {
  workflowState.value = 'running_node1'

  setTimeout(() => {
    workflowState.value = 'running_node2'
    setTimeout(() => {
      workflowState.value = 'completed'
      activeOutputTab.value = 'action'
    }, 900)
  }, 600)
}
</script>

<template>
  <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 text-left">
    <!-- Preset Selection Bar -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">Select Pre-Defined Pipeline:</span>
        <div class="flex gap-1.5">
          <button
            v-for="p in presets"
            :key="p.id"
            @click="selectPreset(p.id)"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer"
            :class="[
              currentPresetId === p.id
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            ]"
          >
            <span :class="p.iconClass" class="w-3.5 h-3.5"></span>
            <span class="font-serif font-bold">{{ p.title }}</span>
          </button>
        </div>
      </div>

      <!-- Execute Button -->
      <button
        @click="runWorkflow"
        :disabled="workflowState !== 'idle' && workflowState !== 'completed'"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-bold text-white transition-all cursor-pointer shadow-md"
        :class="[
          workflowState === 'idle' || workflowState === 'completed'
            ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500'
            : 'bg-slate-700 opacity-60 cursor-not-allowed'
        ]"
      >
        <span class="i-lucide-play w-3.5 h-3.5"></span>
        <span>{{ workflowState === 'idle' || workflowState === 'completed' ? 'Execute Pipeline' : 'Streaming Event...' }}</span>
      </button>
    </div>

    <!-- Visual 3-Node Connected Canvas -->
    <div class="grid grid-cols-12 gap-2 items-center relative my-2">
      <!-- Node 1: Trigger -->
      <div
        class="col-span-4 p-3 rounded-xl border transition-all duration-300 h-28 flex flex-col justify-between"
        :class="[
          workflowState === 'running_node1'
            ? 'bg-cyan-950/50 border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg'
            : 'bg-slate-950 border-slate-800'
        ]"
      >
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase text-cyan-400 font-bold">1. Trigger Node</span>
          <span class="w-2 h-2 rounded-full" :class="workflowState === 'running_node1' ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'"></span>
        </div>
        <div class="flex items-center gap-1.5">
          <span :class="activePreset.triggerIcon" class="w-4 h-4 text-cyan-400 shrink-0"></span>
          <span class="font-bold text-xs text-white font-serif leading-tight">{{ activePreset.triggerTitle }}</span>
        </div>
        <div class="text-[10px] font-mono text-slate-400">Inbound HTTP Webhook Event</div>
      </div>

      <!-- Connector 1 -->
      <div class="col-span-1 flex justify-center">
        <div class="h-0.5 w-full relative bg-slate-800">
          <div
            v-if="workflowState === 'running_node1' || workflowState === 'running_node2' || workflowState === 'completed'"
            class="absolute top-[-3px] w-2 h-2 rounded-full bg-cyan-400 transition-all duration-500"
            :class="workflowState === 'running_node1' ? 'left-0' : 'right-0'"
          ></div>
        </div>
      </div>

      <!-- Node 2: AI Processor -->
      <div
        class="col-span-3 p-3 rounded-xl border transition-all duration-300 h-28 flex flex-col justify-between"
        :class="[
          workflowState === 'running_node2'
            ? 'bg-indigo-950/50 border-indigo-400 ring-2 ring-indigo-400/40 shadow-lg'
            : 'bg-slate-950 border-slate-800'
        ]"
      >
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase text-indigo-400 font-bold">2. AI Transform</span>
          <span class="w-2 h-2 rounded-full" :class="workflowState === 'running_node2' ? 'bg-indigo-400 animate-ping' : 'bg-slate-700'"></span>
        </div>
        <div class="font-bold text-xs text-white font-serif leading-tight">{{ activePreset.aiTitle }}</div>
        <div class="text-[10px] font-mono text-slate-400">{{ activePreset.aiModel }}</div>
      </div>

      <!-- Connector 2 -->
      <div class="col-span-1 flex justify-center">
        <div class="h-0.5 w-full relative bg-slate-800">
          <div
            v-if="workflowState === 'running_node2' || workflowState === 'completed'"
            class="absolute top-[-3px] w-2 h-2 rounded-full bg-indigo-400 transition-all duration-500"
            :class="workflowState === 'running_node2' ? 'left-0' : 'right-0'"
          ></div>
        </div>
      </div>

      <!-- Node 3: Action Node -->
      <div
        class="col-span-3 p-3 rounded-xl border transition-all duration-300 h-28 flex flex-col justify-between"
        :class="[
          workflowState === 'completed'
            ? 'bg-emerald-950/50 border-emerald-400 ring-2 ring-emerald-400/40 shadow-lg'
            : 'bg-slate-950 border-slate-800'
        ]"
      >
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase text-emerald-400 font-bold">3. Action Node</span>
          <span class="w-2 h-2 rounded-full" :class="workflowState === 'completed' ? 'bg-emerald-400' : 'bg-slate-700'"></span>
        </div>
        <div class="font-bold text-xs text-white font-serif leading-tight">{{ activePreset.actionTitle }}</div>
        <div class="text-[10px] font-mono text-slate-400">{{ activePreset.actionApp }}</div>
      </div>
    </div>

    <!-- Tabbed Step-by-Step Output Panel (Zero Overflow) -->
    <div class="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <div class="flex gap-2">
          <button
            @click="activeOutputTab = 'action'"
            class="px-2.5 py-0.5 rounded text-xs font-mono font-bold transition-all cursor-pointer"
            :class="activeOutputTab === 'action' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-500 hover:text-slate-300'"
          >
            Delivered Action Output
          </button>
          <button
            @click="activeOutputTab = 'ai'"
            class="px-2.5 py-0.5 rounded text-xs font-mono font-bold transition-all cursor-pointer"
            :class="activeOutputTab === 'ai' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-500 hover:text-slate-300'"
          >
            AI Node Reasoning
          </button>
          <button
            @click="activeOutputTab = 'trigger'"
            class="px-2.5 py-0.5 rounded text-xs font-mono font-bold transition-all cursor-pointer"
            :class="activeOutputTab === 'trigger' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-500 hover:text-slate-300'"
          >
            Trigger Raw Payload
          </button>
        </div>
        <span class="text-[10px] font-mono text-slate-400">
          {{ workflowState === 'completed' ? 'Execution Complete (200 OK)' : 'Ready' }}
        </span>
      </div>

      <!-- Tab Content Area: Strictly Constrained Height -->
      <div class="h-28 overflow-y-auto text-xs font-mono text-slate-200 leading-relaxed pr-1">
        <div v-if="activeOutputTab === 'action'" class="whitespace-pre-wrap text-emerald-300 text-[11px]">
          {{ workflowState === 'completed' ? activePreset.actionResult : 'Click "Execute Pipeline" to view final delivered asset.' }}
        </div>

        <div v-else-if="activeOutputTab === 'ai'" class="text-indigo-200 text-[11px] space-y-1">
          <div><strong>System Prompt:</strong> "{{ activePreset.aiPrompt }}"</div>
          <div class="pt-1 text-slate-400">Model evaluated input parameters and returned valid JSON with latency 420ms.</div>
        </div>

        <div v-else class="whitespace-pre-wrap text-cyan-300 text-[11px]">
          {{ activePreset.triggerPayload }}
        </div>
      </div>
    </div>
  </div>
</template>
