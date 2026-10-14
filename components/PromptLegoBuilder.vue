<script setup lang="ts">
import { ref, computed } from 'vue'

interface PromptPreset {
  id: string
  name: string
  iconClass: string
  blocks: {
    key: string
    label: string
    badgeClass: string
    snippet: string
  }[]
  genericOutput: string
  structuredOutput: string
}

const presets: PromptPreset[] = [
  {
    id: 'marketing',
    name: 'EdTech Growth Campaign',
    iconClass: 'i-lucide-megaphone',
    blocks: [
      {
        key: 'persona',
        label: 'Persona',
        badgeClass: 'bg-purple-500/20 border-purple-500 text-purple-300',
        snippet: 'Act as a Senior Conversion Copywriter & EdTech Growth Strategist.',
      },
      {
        key: 'context',
        label: 'Context',
        badgeClass: 'bg-blue-500/20 border-blue-500 text-blue-300',
        snippet: 'Launching "FocusPulse", an AI study companion for college students facing exam fatigue. Traditional ads are ignored.',
      },
      {
        key: 'task',
        label: 'Task',
        badgeClass: 'bg-emerald-500/20 border-emerald-500 text-emerald-300',
        snippet: 'Create a 3-part Instagram carousel script to drive app waitlist signups.',
      },
      {
        key: 'instructions',
        label: 'Instructions',
        badgeClass: 'bg-indigo-500/20 border-indigo-500 text-indigo-300',
        snippet: 'Eliminate corporate jargon ("unleash", "synergy"). Target the specific panic felt 48h before midterms.',
      },
      {
        key: 'format',
        label: 'Format',
        badgeClass: 'bg-amber-500/20 border-amber-500 text-amber-300',
        snippet: 'Format as a table with columns: [Slide #] | [Visual Direction] | [On-Screen Hook] | [Caption]. Include CTA at the end.',
      },
      {
        key: 'cot',
        label: 'Chain of Thought',
        badgeClass: 'bg-pink-500/20 border-pink-500 text-pink-300',
        snippet: 'First, diagnose 3 psychological obstacles of exhausted students. Then, craft each slide specifically addressing one obstacle.',
      },
    ],
    genericOutput: 'Here is an Instagram post for your app:\n\nWant to ace your exams? Try FocusPulse! The revolutionary AI tool to study faster and smarter. Link in bio! #StudyGram #CollegeLife #AI',
    structuredOutput: '[REASONING: 3 Student Friction Points]\n1. Overwhelm from 200-page slide decks\n2. Guilt over late cramming\n3. Fear of blanking on exam questions\n\n| Slide | Visual Direction | On-Screen Hook | Caption |\n|---|---|---|---|\n| 1 | Dark room, illuminated laptop | "It\'s 2 AM and you have 200 slides left." | Stop rereading highlighted lines that won\'t stick. |\n| 2 | Screen recording: PDF -> 3 flashcards | "Your brain can\'t digest 40 pages at once." | Turn raw notes into active recall in 10s. |\n| 3 | Minimal UI with green checkmarks | "Sleep 6 hours. Still pass." | Study the 20% that yields 80% of exam points. |\n\nCTA: Link in bio. First 500 campus testers get free lifetime access.',
  },
  {
    id: 'coding',
    name: 'CS Architecture & Refactor',
    iconClass: 'i-lucide-code-2',
    blocks: [
      {
        key: 'persona',
        label: 'Persona',
        badgeClass: 'bg-purple-500/20 border-purple-500 text-purple-300',
        snippet: 'Act as a Principal Systems Architect specializing in distributed Node.js backends.',
      },
      {
        key: 'context',
        label: 'Context',
        badgeClass: 'bg-blue-500/20 border-blue-500 text-blue-300',
        snippet: 'Our payment processing webhook is dropping 4% of Stripe events during traffic spikes due to unhandled database locks.',
      },
      {
        key: 'task',
        label: 'Task',
        badgeClass: 'bg-emerald-500/20 border-emerald-500 text-emerald-300',
        snippet: 'Refactor the express endpoint to use an idempotent message queue with Redis and BullMQ.',
      },
      {
        key: 'instructions',
        label: 'Instructions',
        badgeClass: 'bg-indigo-500/20 border-indigo-500 text-indigo-300',
        snippet: 'Enforce TypeScript strict mode. Return immediate HTTP 200 before queue ingestion to prevent Stripe retries.',
      },
      {
        key: 'format',
        label: 'Format',
        badgeClass: 'bg-amber-500/20 border-amber-500 text-amber-300',
        snippet: 'Provide: 1) System sequence diagram in Mermaid, 2) Complete TypeScript route handler, 3) Jest concurrency test.',
      },
      {
        key: 'cot',
        label: 'Chain of Thought',
        badgeClass: 'bg-pink-500/20 border-pink-500 text-pink-300',
        snippet: 'First analyze how deadlocks occur under transaction isolation level SERIALIZABLE, then architect the queue worker.',
      },
    ],
    genericOutput: 'To fix Stripe webhook issues, you should use Redis. Here is some code:\n\napp.post("/webhook", async (req, res) => {\n  await db.save(req.body)\n  res.send("ok")\n})',
    structuredOutput: '[ARCHITECTURAL ANALYSIS]\nDeadlocks occur because synchronous DB writes hold row locks while Stripe awaits HTTP 200. Under burst traffic, connection pools saturate.\n\n```mermaid\nsequenceDiagram\nStripe->>WebhookHandler: POST /webhook (Event ID)\nWebhookHandler->>Redis: SADD idempotency:events (Event ID)\nWebhookHandler-->>Stripe: 200 OK (Immediate ack <20ms)\nWebhookHandler->>BullMQ: Add job to payment-queue\nWorker->>Postgres: Process payment transaction asynchronously\n```\n\n[PRODUCTION HANDLER]\nexport async function handleStripeWebhook(req: Request, res: Response) {\n  const sig = req.headers["stripe-signature"];\n  // Verified signature, queued in Redis under 15ms\n}',
  },
  {
    id: 'health',
    name: 'Medical Socratic Tutor',
    iconClass: 'i-lucide-activity',
    blocks: [
      {
        key: 'persona',
        label: 'Persona',
        badgeClass: 'bg-purple-500/20 border-purple-500 text-purple-300',
        snippet: 'Act as an attending physician teaching a 3rd-year medical student on clinical rounds.',
      },
      {
        key: 'context',
        label: 'Context',
        badgeClass: 'bg-blue-500/20 border-blue-500 text-blue-300',
        snippet: 'The student understands basic pathology but jumps to conclusions without ruling out life-threatening differentials.',
      },
      {
        key: 'task',
        label: 'Task',
        badgeClass: 'bg-emerald-500/20 border-emerald-500 text-emerald-300',
        snippet: 'Present a 58-year-old presenting with acute pleuritic chest pain and calf swelling after a flight.',
      },
      {
        key: 'instructions',
        label: 'Instructions',
        badgeClass: 'bg-indigo-500/20 border-indigo-500 text-indigo-300',
        snippet: 'Never state the diagnosis directly. Ask one probing diagnostic question at a time. Demand their medical reasoning.',
      },
      {
        key: 'format',
        label: 'Format',
        badgeClass: 'bg-amber-500/20 border-amber-500 text-amber-300',
        snippet: 'Structure response as: [Patient Vitals] &rarr; [Clinical Scenario] &rarr; [Single Socratic Prompt Question].',
      },
      {
        key: 'cot',
        label: 'Chain of Thought',
        badgeClass: 'bg-pink-500/20 border-pink-500 text-pink-300',
        snippet: 'Determine whether PE Wells Score criteria are met, then guide the student to calculate pre-test probability first.',
      },
    ],
    genericOutput: 'The patient likely has a pulmonary embolism (PE) caused by deep vein thrombosis (DVT) after prolonged immobility on the airplane. Order a CT angiogram immediately.',
    structuredOutput: '[PATIENT VITALS]\nBP: 105/70 | HR: 112 bpm (Sinus tachycardia) | RR: 24 | SpO2: 91% on room air | Temp: 37.1°C\n\n[CLINICAL SCENARIO]\nA 58-year-old male arrives at the ED with sudden-onset sharp right-sided chest pain that worsens on deep inspiration. He returned yesterday from a 14-hour flight. His right calf is warm and measured 3cm larger than the left.\n\n[ATTENDING PHYSICIAN PROMPT]\n"Before we jump to imaging orders, walk me through your pre-test clinical probability calculation. What score are you calculating at the bedside right now, and what criteria are positive?"',
  },
]

const currentPresetId = ref('marketing')
const currentPreset = computed(() => presets.find(p => p.id === currentPresetId.value) || presets[0])

const activeBlocks = ref<Record<string, boolean>>({
  persona: true,
  context: true,
  task: true,
  instructions: true,
  format: false,
  cot: false,
})

function setPreset(id: string) {
  currentPresetId.value = id
  activeBlocks.value = {
    persona: true,
    context: true,
    task: true,
    instructions: false,
    format: false,
    cot: false,
  }
}

const compiledPrompt = computed(() => {
  return currentPreset.value.blocks
    .filter((b) => activeBlocks.value[b.key])
    .map((b) => `[${b.label.toUpperCase()}]\n${b.snippet}`)
    .join('\n\n')
})

const qualityScore = computed(() => {
  const count = Object.values(activeBlocks.value).filter(Boolean).length
  return Math.round((count / currentPreset.value.blocks.length) * 100)
})

const simulatedOutput = computed(() => {
  const count = Object.values(activeBlocks.value).filter(Boolean).length
  if (count <= 2) {
    return currentPreset.value.genericOutput
  }
  return currentPreset.value.structuredOutput
})
</script>

<template>
  <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/60 text-left">
    <!-- Preset Example Switcher -->
    <div class="flex items-center justify-between mb-2.5">
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">Example Scenario:</span>
        <div class="flex gap-1.5">
          <button
            v-for="p in presets"
            :key="p.id"
            @click="setPreset(p.id)"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer"
            :class="[
              currentPresetId === p.id
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            ]"
          >
            <span :class="p.iconClass" class="w-3.5 h-3.5"></span>
            <span class="font-serif font-bold">{{ p.name }}</span>
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-mono text-slate-400">Score:</span>
        <span class="font-mono font-bold text-xs" :class="qualityScore > 70 ? 'text-emerald-400' : 'text-amber-400'">
          {{ qualityScore }}%
        </span>
      </div>
    </div>

    <!-- Toggle Chips -->
    <div class="flex flex-wrap gap-1.5 mb-2.5">
      <button
        v-for="block in currentPreset.blocks"
        :key="block.key"
        @click="activeBlocks[block.key] = !activeBlocks[block.key]"
        class="px-2.5 py-1 rounded-md border text-[11px] font-medium transition-all duration-150 cursor-pointer"
        :class="
          activeBlocks[block.key]
            ? block.badgeClass + ' shadow-sm'
            : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60 hover:opacity-90'
        "
      >
        {{ activeBlocks[block.key] ? '✓ ' : '+ ' }}{{ block.label }}
      </button>
    </div>

    <!-- Grid: Compiled Prompt vs Live LLM Output -->
    <div class="grid grid-cols-12 gap-3 text-xs">
      <div class="col-span-6 flex flex-col gap-1">
        <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Constructed Instruction:</div>
        <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono whitespace-pre-wrap h-60 overflow-y-auto leading-relaxed text-slate-200 text-[11px]">
          {{ compiledPrompt || 'Select pillars above to assemble prompt...' }}
        </div>
      </div>

      <div class="col-span-6 flex flex-col gap-1">
        <div class="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center justify-between">
          <span>Simulated Model Output:</span>
          <span class="text-[10px] font-mono text-slate-400">{{ qualityScore > 50 ? 'Constrained & Structured' : 'Vague / Generic' }}</span>
        </div>
        <div class="p-3 rounded-lg bg-slate-950 border border-indigo-500/30 whitespace-pre-wrap h-60 overflow-y-auto leading-relaxed text-slate-300 text-[11px] font-mono">
          {{ simulatedOutput }}
        </div>
      </div>
    </div>
  </div>
</template>
