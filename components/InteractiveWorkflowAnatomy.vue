<script setup lang="ts">
import { ref } from 'vue'

interface WorkflowStep {
  id: string
  name: string
  role: string
  iconClass: string
  theme: 'cyan' | 'indigo' | 'emerald'
  activeClass: string
  inactiveClass: string
  textClass: string
  borderClass: string
  badgeClass: string
  description: string
  services: { name: string; icon: string; category: string; badgeColor: string }[]
  formattedJson: { key: string; val: string; type: 'string' | 'object' | 'boolean' | 'number' }[]
}

const steps: WorkflowStep[] = [
  {
    id: 'trigger',
    name: '1. The Trigger Node',
    role: 'The Senses ("When this happens...")',
    iconClass: 'i-lucide-zap',
    theme: 'cyan',
    activeClass: 'bg-cyan-950/70 border-cyan-500 shadow-md text-white',
    inactiveClass: 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-200',
    textClass: 'text-cyan-400',
    borderClass: 'border-cyan-500/50 shadow-cyan-950/40',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40',
    description: 'Listens 24/7 for inbound events. Without a trigger, a workflow never executes. Can be scheduled on a timer or react instantly to webhooks.',
    services: [
      { name: 'Webhook', icon: 'i-lucide-globe', category: 'HTTP POST listener', badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40' },
      { name: 'Telegram', icon: 'i-lucide-send', category: 'Incoming text or voice note', badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40' },
      { name: 'Cron Schedule', icon: 'i-lucide-clock', category: 'Every morning at 08:00 AM', badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40' },
      { name: 'GitHub', icon: 'i-lucide-git-pull-request', category: 'New PR or issue created', badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40' },
      { name: 'Stripe', icon: 'i-lucide-credit-card', category: 'Successful payment event', badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40' },
    ],
    formattedJson: [
      { key: '"event"', val: '"message.received"', type: 'string' },
      { key: '"sender"', val: '"student_492"', type: 'string' },
      { key: '"raw_text"', val: '"Summarize bio lecture slides for midterm"', type: 'string' },
      { key: '"timestamp"', val: '1728948120', type: 'number' },
      { key: '"authenticated"', val: 'true', type: 'boolean' },
    ],
  },
  {
    id: 'ai',
    name: '2. The AI Reasoning Node',
    role: 'The Brain ("Reason, structure & decide...")',
    iconClass: 'i-lucide-cpu',
    theme: 'indigo',
    activeClass: 'bg-indigo-950/70 border-indigo-500 shadow-md text-white',
    inactiveClass: 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-indigo-500/40 hover:text-indigo-200',
    textClass: 'text-indigo-400',
    borderClass: 'border-indigo-500/50 shadow-indigo-950/40',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40',
    description: 'Takes messy raw unstructured text or files, parses them through an LLM, and formats the output into strict, validated JSON fields.',
    services: [
      { name: 'Claude', icon: 'i-lucide-sparkles', category: 'Complex reasoning & tone', badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40' },
      { name: 'ChatGPT', icon: 'i-lucide-bot', category: 'General translation & schemas', badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40' },
      { name: 'Gemini', icon: 'i-lucide-layers', category: 'Long documents & audio digestion', badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40' },
      { name: 'Ollama / Local', icon: 'i-lucide-terminal', category: 'Private offline LLM inference', badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40' },
    ],
    formattedJson: [
      { key: '"summary"', val: '"Mitochondrial electron transport chain"', type: 'string' },
      { key: '"flashcards_generated"', val: '5', type: 'number' },
      { key: '"difficulty_level"', val: '"Hard (Undergraduate)"', type: 'string' },
      { key: '"urgency"', val: '"high"', type: 'string' },
      { key: '"confidence_score"', val: '0.98', type: 'number' },
    ],
  },
  {
    id: 'action',
    name: '3. The Action Node',
    role: 'The Hands ("Execute side-effects...")',
    iconClass: 'i-lucide-share-2',
    theme: 'emerald',
    activeClass: 'bg-emerald-950/70 border-emerald-500 shadow-md text-white',
    inactiveClass: 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-200',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/50 shadow-emerald-950/40',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
    description: 'Pushes the structured data to databases, internal communication channels, social media schedulers, or email clients automatically.',
    services: [
      { name: 'Notion Database', icon: 'i-lucide-file-text', category: 'Create new structured study page', badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40' },
      { name: 'Slack / Discord', icon: 'i-lucide-message-circle', category: 'Send interactive review card', badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40' },
      { name: 'PostgreSQL', icon: 'i-lucide-database', category: 'Insert row with atomic transaction', badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40' },
      { name: 'LinkedIn / X', icon: 'i-lucide-share-2', category: 'Draft scheduled social campaign', badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40' },
    ],
    formattedJson: [
      { key: '"status"', val: '"success"', type: 'string' },
      { key: '"notion_page_id"', val: '"page_9824_bio"', type: 'string' },
      { key: '"slack_notification"', val: 'true', type: 'boolean' },
      { key: '"duration_ms"', val: '482', type: 'number' },
      { key: '"retry_count"', val: '0', type: 'number' },
    ],
  },
]

const activeStep = ref<WorkflowStep>(steps[0])
</script>

<template>
  <div class="flex flex-col gap-2.5 text-left">
    <!-- Pipeline Stepper Bar with Connecting Arrows -->
    <div class="grid grid-cols-11 items-center gap-2">
      <!-- Step 1: Trigger -->
      <button
        @click="activeStep = steps[0]"
        class="col-span-3 flex items-start gap-2 p-2 rounded-xl border transition-all cursor-pointer text-left"
        :class="activeStep.id === steps[0].id ? steps[0].activeClass : steps[0].inactiveClass"
      >
        <div class="p-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 shrink-0 mt-0.5">
          <span class="i-lucide-zap w-3.5 h-3.5 text-cyan-400"></span>
        </div>
        <div class="text-start truncate">
          <div class="font-bold font-serif text-white text-[11px] leading-tight truncate">{{ steps[0].name }}</div>
          <div class="text-[9px] text-cyan-300 font-mono mt-0.5">1. Listen &amp; Fire</div>
        </div>
      </button>

      <!-- Arrow 1 -> 2 -->
      <div class="col-span-1 flex justify-center">
        <span class="i-lucide-arrow-right w-4 h-4 text-cyan-400/80"></span>
      </div>

      <!-- Step 2: AI Reasoning -->
      <button
        @click="activeStep = steps[1]"
        class="col-span-3 flex items-start gap-2 p-2 rounded-xl border transition-all cursor-pointer text-left"
        :class="activeStep.id === steps[1].id ? steps[1].activeClass : steps[1].inactiveClass"
      >
        <div class="p-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 shrink-0 mt-0.5">
          <span class="i-lucide-cpu w-3.5 h-3.5 text-indigo-400"></span>
        </div>
        <div class="text-start truncate">
          <div class="font-bold font-serif text-white text-[11px] leading-tight truncate">{{ steps[1].name }}</div>
          <div class="text-[9px] text-indigo-300 font-mono mt-0.5">2. Parse &amp; Reason</div>
        </div>
      </button>

      <!-- Arrow 2 -> 3 -->
      <div class="col-span-1 flex justify-center">
        <span class="i-lucide-arrow-right w-4 h-4 text-indigo-400/80"></span>
      </div>

      <!-- Step 3: Action -->
      <button
        @click="activeStep = steps[2]"
        class="col-span-3 flex items-start gap-2 p-2 rounded-xl border transition-all cursor-pointer text-left"
        :class="activeStep.id === steps[2].id ? steps[2].activeClass : steps[2].inactiveClass"
      >
        <div class="p-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 shrink-0 mt-0.5">
          <span class="i-lucide-share-2 w-3.5 h-3.5 text-emerald-400"></span>
        </div>
        <div class="text-start truncate">
          <div class="font-bold font-serif text-white text-[11px] leading-tight truncate">{{ steps[2].name }}</div>
          <div class="text-[9px] text-emerald-300 font-mono mt-0.5">3. Output &amp; Sync</div>
        </div>
      </button>
    </div>

    <!-- Active Step Deep Dive Card with Dynamic Color Border -->
    <transition name="fade" mode="out-in">
      <div
        :key="activeStep.id"
        class="grid grid-cols-12 gap-4 p-3.5 rounded-xl bg-slate-900/95 border transition-all"
        :class="activeStep.borderClass"
      >
        <!-- Left: Description and Ecosystem Integrations -->
        <div class="col-span-7 flex flex-col justify-between pr-3 border-r border-slate-800">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-[11px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-md" :class="activeStep.badgeClass">
                {{ activeStep.role }}
              </span>
            </div>
            <p class="text-xs text-slate-200 leading-relaxed font-sans mb-3">
              {{ activeStep.description }}
            </p>

            <div class="text-[10px] font-mono uppercase tracking-wider font-bold mb-2" :class="activeStep.textClass">
              Common {{ activeStep.name.split('. ')[1] }} Connectors:
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="srv in activeStep.services"
                :key="srv.name"
                class="flex items-start gap-2 p-2 rounded-lg bg-slate-950/80 border transition-all"
                :class="srv.badgeColor"
              >
                <span :class="srv.icon" class="w-3.5 h-3.5 shrink-0 mt-0.5"></span>
                <div class="truncate">
                  <div class="font-serif font-bold text-white text-xs truncate">{{ srv.name }}</div>
                  <div class="text-[9.5px] text-slate-300 font-sans leading-tight truncate mt-0.5">{{ srv.category }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Colorful JSON Data Payload Visualizer -->
        <div class="col-span-5 flex flex-col justify-between pl-1">
          <div>
            <!-- Terminal Title Bar -->
            <div class="flex items-center justify-between mb-1.5 px-1">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-red-400/80"></span>
                <span class="w-2 h-2 rounded-full bg-amber-400/80"></span>
                <span class="w-2 h-2 rounded-full bg-emerald-400/80"></span>
                <span class="text-[10px] font-mono text-slate-400 ml-1">Payload:</span>
              </div>
              <span class="text-[10px] font-mono font-bold" :class="activeStep.textClass" v-text="'{{ $json }}'"></span>
            </div>

            <!-- Syntax-colored JSON Body -->
            <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] leading-relaxed space-y-1">
              <div class="text-slate-500 font-bold" v-text="'{' "></div>
              <div
                v-for="(item, idx) in activeStep.formattedJson"
                :key="idx"
                class="pl-4 flex items-center justify-between gap-1 text-[10.5px]"
              >
                <span class="text-sky-300 font-semibold" v-text="item.key + ':'"></span>
                <span
                  v-if="item.type === 'string'"
                  class="text-emerald-300 truncate max-w-[170px]"
                  v-text="item.val + (idx !== activeStep.formattedJson.length - 1 ? ',' : '')"
                ></span>
                <span
                  v-else-if="item.type === 'number'"
                  class="text-amber-300 font-bold"
                  v-text="item.val + (idx !== activeStep.formattedJson.length - 1 ? ',' : '')"
                ></span>
                <span
                  v-else
                  class="text-purple-300 font-bold"
                  v-text="item.val + (idx !== activeStep.formattedJson.length - 1 ? ',' : '')"
                ></span>
              </div>
              <div class="text-slate-500 font-bold" v-text="'}'"></div>
            </div>

            <!-- Footer Badge -->
            <div class="mt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between px-1">
              <span>Schema status:</span>
              <span class="text-emerald-400 flex items-center gap-1">
                <span class="i-lucide-check-circle-2 w-3 h-3 text-emerald-400"></span>
                <span>Validated JSON Output</span>
              </span>
            </div>
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
