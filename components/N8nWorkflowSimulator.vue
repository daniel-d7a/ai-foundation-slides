<script setup lang="ts">
import { ref, computed } from 'vue'

interface ActionTarget {
  name: string
  app: string
  logo: string
  task: string
}

interface Scenario {
  id: string
  title: string
  icon: string
  badgeColor: string
  // Trigger
  triggerName: string
  triggerApp: string
  triggerLogo: string
  triggerDetail: string
  // AI
  aiModel: string
  aiProvider: string
  aiLogo: string
  aiPrompt: string
  // Actions
  actions: ActionTarget[]
}

const scenarios: Scenario[] = [
  {
    id: 'leads',
    title: 'Lead Ingestion & CRM',
    icon: 'i-lucide-user-plus',
    badgeColor: 'border-cyan-500/50 text-cyan-300 bg-cyan-950/40',
    triggerName: 'Inbound Inquiry Email',
    triggerApp: 'Gmail',
    triggerLogo: 'i-logos-google-gmail',
    triggerDetail: 'New high-priority lead from enterprise prospect',
    aiModel: 'Claude 3.7 Sonnet',
    aiProvider: 'Anthropic',
    aiLogo: 'i-logos-claude-icon',
    aiPrompt: 'Classify intent, extract budget & generate CRM JSON',
    actions: [
      { name: 'Lead Channel Alert', app: 'Slack', logo: 'i-logos-slack-icon', task: 'Post alert to #sales-pipeline with summary' },
      { name: 'Record Creation', app: 'HubSpot', logo: 'i-logos-hubspot', task: 'Create deal & assign sales representative' },
    ],
  },
  {
    id: 'study',
    title: 'Study & Flashcard Engine',
    icon: 'i-lucide-book-open',
    badgeColor: 'border-indigo-500/50 text-indigo-300 bg-indigo-950/40',
    triggerName: 'Lecture Voice / Note',
    triggerApp: 'Telegram',
    triggerLogo: 'i-logos-telegram',
    triggerDetail: 'Student sends 3-min audio note on bio midterm',
    aiModel: 'Gemini 2.5 Flash',
    aiProvider: 'Google AI',
    aiLogo: 'i-logos-google-gemini',
    aiPrompt: 'Digest voice audio & synthesize 5 active-recall flashcards',
    actions: [
      { name: 'Study Deck Sync', app: 'Notion', logo: 'i-logos-notion-icon', task: 'Insert toggle flashcards into Bio 101 notebook' },
      { name: 'Schedule Review', app: 'Airtable', logo: 'i-logos-airtable', task: 'Queue spaced repetition dates (Day 1, 3, 7)' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps Incident Sentinel',
    icon: 'i-lucide-terminal',
    badgeColor: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/40',
    triggerName: 'Sentry 500 Webhook',
    triggerApp: 'GitHub / Sentry',
    triggerLogo: 'i-logos-github-icon',
    triggerDetail: 'POST /checkout DB connection pool timeout',
    aiModel: 'DeepSeek R1',
    aiProvider: 'DeepSeek',
    aiLogo: 'i-logos-deepseek-icon',
    aiPrompt: 'Diagnose trace, determine root cause & draft hotfix',
    actions: [
      { name: 'War Room Alert', app: 'Discord', logo: 'i-logos-discord-icon', task: 'Broadcast incident severity & diagnosis to on-call' },
      { name: 'Audit Log Ingest', app: 'PostgreSQL', logo: 'i-logos-postgresql', task: 'Write structured incident payload to db' },
    ],
  },
  {
    id: 'billing',
    title: 'Churn Guard & Billing',
    icon: 'i-lucide-credit-card',
    badgeColor: 'border-amber-500/50 text-amber-300 bg-amber-950/40',
    triggerName: 'Failed Charge Webhook',
    triggerApp: 'Stripe',
    triggerLogo: 'i-logos-stripe',
    triggerDetail: 'Subscription renewal declined on enterprise account',
    aiModel: 'GPT-4o Omnimodal',
    aiProvider: 'OpenAI',
    aiLogo: 'i-logos-openai-icon brightness-0 invert text-white',
    aiPrompt: 'Analyze customer churn risk & draft empathetic retention plan',
    actions: [
      { name: 'Customer Recovery', app: 'Gmail', logo: 'i-logos-google-gmail', task: 'Dispatch personal 1-click update link to billing contact' },
      { name: 'Account Exec Ping', app: 'Slack', logo: 'i-logos-slack-icon', task: 'Alert VIP account manager in #client-success' },
    ],
  },
]

const currentId = ref('leads')
const activeScenario = computed(() => scenarios.find(s => s.id === currentId.value) || scenarios[0])

type FlowState = 'idle' | 'triggering' | 'reasoning' | 'dispatching' | 'completed'
const flowState = ref<FlowState>('idle')

function runFlow() {
  if (flowState.value !== 'idle' && flowState.value !== 'completed') return
  flowState.value = 'triggering'

  setTimeout(() => {
    flowState.value = 'reasoning'
    setTimeout(() => {
      flowState.value = 'dispatching'
      setTimeout(() => {
        flowState.value = 'completed'
      }, 700)
    }, 800)
  }, 600)
}

function selectScenario(id: string) {
  currentId.value = id
  flowState.value = 'idle'
}
</script>

<template>
  <div class="relative w-full text-left font-sans select-none">
    
    <!-- Top Control Bar: Scenario Selectors + Run Action -->
    <div class="flex items-center justify-between gap-2 mb-2.5">
      <div class="flex items-center gap-1.5 overflow-x-auto py-0.5">
        <button
          v-for="s in scenarios"
          :key="s.id"
          type="button"
          @click="selectScenario(s.id)"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer border"
          :class="currentId === s.id
            ? `${s.badgeColor} font-bold shadow-sm scale-102`
            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'"
        >
          <span :class="s.icon" class="w-3.5 h-3.5"></span>
          <span>{{ s.title }}</span>
        </button>
      </div>

      <!-- Trigger Pipeline Button -->
      <button
        type="button"
        @click="runFlow"
        :disabled="flowState !== 'idle' && flowState !== 'completed'"
        class="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-md active:scale-95 disabled:opacity-50"
        :class="flowState === 'idle' || flowState === 'completed'
          ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white border border-cyan-400/40'
          : 'bg-slate-800 text-slate-400 border border-slate-700'"
      >
        <span
          class="w-3.5 h-3.5"
          :class="flowState === 'idle' || flowState === 'completed' ? 'i-lucide-play' : 'i-lucide-refresh-cw animate-spin'"
        ></span>
        <span>{{ flowState === 'idle' || flowState === 'completed' ? 'Trigger Event' : 'Running...' }}</span>
      </button>
    </div>

    <!-- n8n Canvas Surface -->
    <div
      class="w-full h-[285px] rounded-2xl bg-slate-950/80 border border-slate-800/90 relative overflow-hidden flex items-center justify-between px-6 shadow-2xl"
      style="background-image: radial-gradient(#334155 1px, transparent 1px); background-size: 16px 16px;"
    >
      <!-- Background Ambient Glow for active flow -->
      <div
        class="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        :class="flowState !== 'idle' ? 'opacity-100' : 'opacity-0'"
      >
        <div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Connecting SVG Cables -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <!-- Cable Gradients -->
          <linearGradient id="cable1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#06b6d4" />
            <stop offset="100%" stop-color="#6366f1" />
          </linearGradient>
          <linearGradient id="cable2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#6366f1" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
        </defs>

        <!-- Cable 1: Trigger to AI (Center line) -->
        <path
          d="M 230,142 C 290,142 320,142 380,142"
          fill="none"
          stroke="#334155"
          stroke-width="3"
        />
        <path
          v-if="flowState === 'triggering' || flowState === 'reasoning' || flowState === 'dispatching' || flowState === 'completed'"
          d="M 230,142 C 290,142 320,142 380,142"
          fill="none"
          stroke="url(#cable1)"
          stroke-width="3"
          stroke-dasharray="6 4"
          class="animate-pulse"
        />

        <!-- Cable 2: AI to Action 1 (Top branch) -->
        <path
          d="M 570,142 C 630,142 640,88 700,88"
          fill="none"
          stroke="#334155"
          stroke-width="3"
        />
        <path
          v-if="flowState === 'dispatching' || flowState === 'completed'"
          d="M 570,142 C 630,142 640,88 700,88"
          fill="none"
          stroke="url(#cable2)"
          stroke-width="3"
          stroke-dasharray="6 4"
          class="animate-pulse"
        />

        <!-- Cable 3: AI to Action 2 (Bottom branch) -->
        <path
          d="M 570,142 C 630,142 640,196 700,196"
          fill="none"
          stroke="#334155"
          stroke-width="3"
        />
        <path
          v-if="flowState === 'dispatching' || flowState === 'completed'"
          d="M 570,142 C 630,142 640,196 700,196"
          fill="none"
          stroke="url(#cable2)"
          stroke-width="3"
          stroke-dasharray="6 4"
          class="animate-pulse"
        />
      </svg>

      <!-- NODE 1: Inbound Trigger Node -->
      <div
        class="w-52 rounded-xl bg-slate-900/95 border p-3 z-10 transition-all duration-300 shadow-xl"
        :class="flowState === 'triggering'
          ? 'border-cyan-400 ring-2 ring-cyan-500/50 scale-103 shadow-cyan-900/50'
          : 'border-cyan-500/40 hover:border-cyan-400'"
      >
        <div class="flex items-center justify-between pb-1.5 border-b border-slate-800">
          <span class="text-[9px] font-mono font-bold tracking-wider text-cyan-400 uppercase flex items-center gap-1">
            <span class="i-lucide-zap w-3 h-3 text-cyan-400"></span>
            1. Trigger Node
          </span>
          <span
            class="w-2 h-2 rounded-full"
            :class="flowState === 'triggering' ? 'bg-cyan-400 animate-ping' : 'bg-cyan-500/40'"
          ></span>
        </div>

        <div class="flex items-center gap-2.5 mt-2.5">
          <div class="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
            <span :class="activeScenario.triggerLogo" class="w-6 h-6 block"></span>
          </div>
          <div class="min-w-0">
            <div class="font-bold text-xs text-white truncate">{{ activeScenario.triggerApp }}</div>
            <div class="text-[10px] text-cyan-300 font-mono truncate">{{ activeScenario.triggerName }}</div>
          </div>
        </div>

        <div class="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 leading-tight">
          {{ activeScenario.triggerDetail }}
        </div>
      </div>

      <!-- NODE 2: AI Reasoning Transform Node -->
      <div
        class="w-56 rounded-xl bg-slate-900/95 border p-3 z-10 transition-all duration-300 shadow-xl"
        :class="flowState === 'reasoning'
          ? 'border-indigo-400 ring-2 ring-indigo-500/50 scale-103 shadow-indigo-900/50'
          : 'border-indigo-500/40 hover:border-indigo-400'"
      >
        <div class="flex items-center justify-between pb-1.5 border-b border-slate-800">
          <span class="text-[9px] font-mono font-bold tracking-wider text-indigo-400 uppercase flex items-center gap-1">
            <span class="i-lucide-cpu w-3 h-3 text-indigo-400"></span>
            2. AI Transform
          </span>
          <span
            class="w-2 h-2 rounded-full"
            :class="flowState === 'reasoning' ? 'bg-indigo-400 animate-ping' : 'bg-indigo-500/40'"
          ></span>
        </div>

        <div class="flex items-center gap-2.5 mt-2.5">
          <div class="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
            <span :class="activeScenario.aiLogo" class="w-6 h-6 block"></span>
          </div>
          <div class="min-w-0">
            <div class="font-bold text-xs text-white truncate">{{ activeScenario.aiModel }}</div>
            <div class="text-[10px] text-indigo-300 font-mono truncate">{{ activeScenario.aiProvider }}</div>
          </div>
        </div>

        <div class="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] text-slate-300 font-sans leading-tight">
          <strong class="text-indigo-400">Mission:</strong> {{ activeScenario.aiPrompt }}
        </div>
      </div>

      <!-- NODE 3: Action Nodes Stack (2 Branch Destinations) -->
      <div class="flex flex-col gap-3 z-10 w-56">
        <div
          v-for="(act, idx) in activeScenario.actions"
          :key="idx"
          class="rounded-xl bg-slate-900/95 border p-2.5 transition-all duration-300 shadow-xl"
          :class="flowState === 'dispatching' || flowState === 'completed'
            ? 'border-emerald-400 ring-2 ring-emerald-500/40 shadow-emerald-950/40'
            : 'border-emerald-500/40 hover:border-emerald-400'"
        >
          <div class="flex items-center justify-between pb-1 border-b border-slate-800">
            <span class="text-[8px] font-mono font-bold tracking-wider text-emerald-400 uppercase flex items-center gap-1">
              <span class="i-lucide-share-2 w-2.5 h-2.5 text-emerald-400"></span>
              3.{{ idx + 1 }} Action Node
            </span>
            <span
              v-if="flowState === 'completed'"
              class="i-lucide-check-circle-2 w-3 h-3 text-emerald-400"
            ></span>
            <span
              v-else
              class="w-1.5 h-1.5 rounded-full"
              :class="flowState === 'dispatching' ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500/40'"
            ></span>
          </div>

          <div class="flex items-center gap-2 mt-1.5">
            <div class="w-7 h-7 rounded bg-slate-800/80 border border-slate-700/80 flex items-center justify-center p-1 shrink-0">
              <span :class="act.logo" class="w-4.5 h-4.5 block"></span>
            </div>
            <div class="min-w-0">
              <div class="font-bold text-[11px] text-white truncate">{{ act.app }}</div>
              <div class="text-[9px] text-emerald-300 font-mono truncate">{{ act.name }}</div>
            </div>
          </div>

          <div class="mt-1.5 pt-1 border-t border-slate-800/80 text-[9px] text-slate-400 truncate">
            {{ act.task }}
          </div>
        </div>
      </div>

    </div>

    <!-- Live Execution Status Bar -->
    <div class="mt-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
      <div class="flex items-center gap-2">
        <span class="flex h-2 w-2 relative">
          <span
            v-if="flowState !== 'idle'"
            class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            :class="flowState === 'completed' ? 'bg-emerald-400' : 'bg-cyan-400'"
          ></span>
          <span
            class="relative inline-flex rounded-full h-2 w-2"
            :class="flowState === 'completed' ? 'bg-emerald-500' : (flowState === 'idle' ? 'bg-slate-500' : 'bg-cyan-500')"
          ></span>
        </span>
        <span class="text-slate-300">
          <template v-if="flowState === 'idle'">Ready: click "Trigger Event" to execute pipeline</template>
          <template v-else-if="flowState === 'triggering'">[Step 1/3] Ingesting {{ activeScenario.triggerApp }} event payload...</template>
          <template v-else-if="flowState === 'reasoning'">[Step 2/3] {{ activeScenario.aiModel }} reasoning & structuring JSON...</template>
          <template v-else-if="flowState === 'dispatching'">[Step 3/3] Broadcasting actions to {{ activeScenario.actions.map(a => a.app).join(' & ') }}...</template>
          <template v-else-if="flowState === 'completed'">Pipeline executed successfully: 3 nodes in 380ms &bull; 0 human touchpoints</template>
        </span>
      </div>

      <div class="flex items-center gap-2 text-[10px] text-slate-400">
        <span>Latency: <strong class="text-white">380ms</strong></span>
        <span>&bull;</span>
        <span>Cost: <strong class="text-emerald-400">$0.0012</strong></span>
      </div>
    </div>

  </div>
</template>
