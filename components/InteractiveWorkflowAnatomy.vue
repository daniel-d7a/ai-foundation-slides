<script setup lang="ts">
import { ref } from 'vue'

interface WorkflowStep {
  id: string
  name: string
  role: string
  iconClass: string
  color: string
  badgeClass: string
  description: string
  services: { name: string; icon: string; category: string }[]
  sampleData: string
}

const steps: WorkflowStep[] = [
  {
    id: 'trigger',
    name: '1. The Trigger Node',
    role: 'The Senses ("When this happens...")',
    iconClass: 'i-lucide-zap',
    color: 'text-cyan-400 border-cyan-500',
    badgeClass: 'bg-cyan-500/20 text-cyan-300',
    description: 'Listens 24/7 for inbound events. Without a trigger, a workflow never executes. Can be scheduled on a timer or react instantly to webhooks.',
    services: [
      { name: 'Webhook', icon: 'i-lucide-globe', category: 'HTTP POST listener' },
      { name: 'Telegram', icon: 'i-lucide-send', category: 'Incoming text or voice note' },
      { name: 'Cron Schedule', icon: 'i-lucide-clock', category: 'Every morning at 08:00 AM' },
      { name: 'GitHub', icon: 'i-lucide-git-pull-request', category: 'New PR or issue created' },
      { name: 'Stripe', icon: 'i-lucide-credit-card', category: 'Successful payment event' },
    ],
    sampleData: '{\n  "event": "message.received",\n  "sender": "student_492",\n  "raw_text": "Summarize the bio lecture slides for midterm prep"\n}',
  },
  {
    id: 'ai',
    name: '2. The AI Reasoning Node',
    role: 'The Brain ("Reason, structure & decide...")',
    iconClass: 'i-lucide-cpu',
    color: 'text-indigo-400 border-indigo-500',
    badgeClass: 'bg-indigo-500/20 text-indigo-300',
    description: 'Takes messy raw unstructured text or files, parses them through an LLM, and formats the output into strict, validated JSON fields.',
    services: [
      { name: 'Claude 3.5 Sonnet', icon: 'i-lucide-sparkles', category: 'Complex reasoning & tone' },
      { name: 'OpenAI GPT-4o', icon: 'i-lucide-bot', category: 'General translation & JSON schema' },
      { name: 'Gemini 2.0', icon: 'i-lucide-layers', category: 'Long document & video digestion' },
      { name: 'Ollama / Local', icon: 'i-lucide-terminal', category: 'Private offline LLM inference' },
    ],
    sampleData: '{\n  "summary": "Mitochondrial electron transport chain key points",\n  "flashcards": [\n    {"q": "Complex I donor?", "a": "NADH"},\n    {"q": "Terminal acceptor?", "a": "O2"}\n  ],\n  "urgency": "high"\n}',
  },
  {
    id: 'action',
    name: '3. The Action Node',
    role: 'The Hands ("Execute side-effects...")',
    iconClass: 'i-lucide-share-2',
    color: 'text-emerald-400 border-emerald-500',
    badgeClass: 'bg-emerald-500/20 text-emerald-300',
    description: 'Pushes the structured data to databases, internal communication channels, social media schedulers, or email clients automatically.',
    services: [
      { name: 'Notion Database', icon: 'i-lucide-file-text', category: 'Create new structured study page' },
      { name: 'Slack / Discord', icon: 'i-lucide-message-circle', category: 'Send interactive review card' },
      { name: 'PostgreSQL', icon: 'i-lucide-database', category: 'Insert row with atomic transaction' },
      { name: 'LinkedIn / X', icon: 'i-lucide-share-2', category: 'Draft scheduled social campaign' },
    ],
    sampleData: '{\n  "status": "success",\n  "notion_page_id": "page_9824_bio",\n  "slack_notification_sent": true,\n  "duration_ms": 482\n}',
  },
]

const activeStep = ref<WorkflowStep>(steps[0])
</script>

<template>
  <div class="flex flex-col gap-3 text-left">
    <!-- Step Selection Pills -->
    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="s in steps"
        :key="s.id"
        @click="activeStep = s"
        class="flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer"
        :class="[
          activeStep.id === s.id
            ? 'bg-slate-800 border-slate-500 text-white shadow-md'
            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
        ]"
      >
        <span :class="s.iconClass" class="w-4 h-4 text-indigo-400"></span>
        <div>
          <div class="font-bold font-serif">{{ s.name }}</div>
          <div class="text-[10px] text-slate-400 font-sans">{{ s.role.split(' (')[0] }}</div>
        </div>
      </button>
    </div>

    <!-- Active Step Deep Dive Card -->
    <transition name="fade" mode="out-in">
      <div :key="activeStep.id" class="grid grid-cols-12 gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700/60">
        <!-- Left: Description and Ecosystem Integrations -->
        <div class="col-span-7 flex flex-col justify-between pr-3 border-r border-slate-800">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-xs font-mono uppercase tracking-wider font-bold" :class="activeStep.badgeClass">
                {{ activeStep.role }}
              </span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed font-sans mb-3">
              {{ activeStep.description }}
            </p>

            <div class="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold mb-2">
              Common Ecosystem Connectors:
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="srv in activeStep.services"
                :key="srv.name"
                class="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800"
              >
                <span :class="srv.icon" class="w-4 h-4 text-indigo-400 shrink-0"></span>
                <div>
                  <div class="font-serif font-bold text-slate-200 text-xs">{{ srv.name }}</div>
                  <div class="text-[10px] text-slate-400 font-sans leading-tight">{{ srv.category }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: JSON Data Payload Visualizer -->
        <div class="col-span-5 flex flex-col justify-between pl-1">
          <div>
            <div class="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold mb-1.5 flex items-center justify-between">
              <span>Node I/O Payload:</span>
              <span class="text-indigo-400 font-mono text-[10px]" v-text="'{{ $json }}'"></span>
            </div>
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
              {{ activeStep.sampleData }}
            </div>
          </div>
          <div class="text-[11px] font-mono text-slate-400 mt-2">
            Data flows immutably from node to node via JSON graph references.
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
