<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'

interface PromptBlock {
  key: string
  label: string
  badgeClass: string
  snippet: string
}

interface PromptPreset {
  id: string
  name: string
  iconClass: string
  blocks: PromptBlock[]
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
  },
  {
    id: 'coding',
    name: 'CS Architecture & Refactor',
    iconClass: 'i-lucide-code',
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
  },
]

const currentPresetId = ref('marketing')
const currentPreset = computed(() => presets.find(p => p.id === currentPresetId.value) || presets[0])

const activeBlocks = ref<Record<string, boolean>>({
  persona: true,
  context: true,
  task: true,
  instructions: false,
  format: false,
  cot: false,
})

const copied = ref(false)
let copyTimeout: ReturnType<typeof setTimeout> | null = null

async function copyPrompt() {
  const text = compiledPrompt.value
  if (!text) return
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  } catch {
    const el = document.createElement('textarea')
    el.value = text
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  copied.value = true
  if (copyTimeout) clearTimeout(copyTimeout)
  copyTimeout = setTimeout(() => {
    copied.value = false
  }, 2000)
}

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
  copied.value = false
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

const qualityLabel = computed(() => {
  const count = Object.values(activeBlocks.value).filter(Boolean).length
  if (count === 0) return 'Empty Input'
  if (count <= 2) return 'Raw / Unconstrained'
  if (count <= 4) return 'Calibrated & Contextualized'
  if (count === 5) return 'Strictly Structured'
  return 'Production-Grade (Fully Constrained)'
})

// Dynamic simulated output generator responding to every toggle
function getMarketingOutput(b: Record<string, boolean>): string {
  const activeCount = Object.values(b).filter(Boolean).length
  if (activeCount === 0) {
    return '(No pillars active: LLM is idle awaiting instruction prompt...)'
  }

  const parts: string[] = []

  // 1. Chain of Thought block
  if (b.cot) {
    parts.push(
      `[THINKING / REASONING]\n` +
      `1. Target Psychology: 48h pre-midterms = peak cortisol + guilt from procrastination.\n` +
      `2. Cognitive Trap: Passive rereading feels productive but fails active recall.\n` +
      `3. Strategy: Validate 2 AM exhaustion -> contrast with 5-min active flashcard solution.`
    )
  }

  const isPersona = b.persona
  const isContext = b.context
  const isInstructions = b.instructions
  const isFormat = b.format

  if (isFormat) {
    const slide1Hook = isInstructions 
      ? `"It's 2 AM and you have 200 slides left."`
      : isContext 
        ? `"Struggling with exam fatigue? FocusPulse is here!"`
        : `"Ready to revolutionize your study habits today?"`

    const slide1Caption = isInstructions
      ? `Stop rereading highlighted lines that won't stick on test day.`
      : isContext
        ? `FocusPulse turns messy college lectures into instant flashcards.`
        : `Unleash your full potential with our game-changing AI study tool!`

    const slide2Hook = isInstructions
      ? `"Your brain can't digest 40 pages at once."`
      : `"Study smarter, not harder."`

    const slide2Caption = isInstructions
      ? `Active recall in 10s: convert raw PDF summaries into exam-ready questions.`
      : isContext
        ? `Built for undergraduate midterms: 5-minute study sprints.`
        : `Synergize your productivity with intelligent automated features.`

    const slide3Hook = isInstructions
      ? `"Sleep 6 hours. Still pass."`
      : `"Join the waitlist today!"`

    const slide3Caption = isInstructions
      ? `Focus on the 20% of concepts that drive 80% of exam points.`
      : isContext
        ? `Download FocusPulse before tomorrow's lecture.`
        : `Unlock academic excellence with cutting-edge AI.`

    const cta = isInstructions
      ? `CTA: Link in bio. First 500 campus testers get free lifetime access.`
      : isContext
        ? `CTA: Link in bio to join the FocusPulse student beta!`
        : `CTA: Tap the link to transform your studies now! #StudyGram #AI`

    const personaHeader = isPersona 
      ? `[GROWTH CAMPAIGN: RETENTION & CONVERSION ANGLE]\n`
      : ``

    parts.push(
      `${personaHeader}` +
      `| Slide | Visual Direction | On-Screen Hook | Caption |\n` +
      `|---|---|---|---|\n` +
      `| 1 | Dark room, illuminated laptop | ${slide1Hook} | ${slide1Caption} |\n` +
      `| 2 | Split-screen: Messy PDF -> 3 flashcards | ${slide2Hook} | ${slide2Caption} |\n` +
      `| 3 | Minimal mobile UI, green checkmarks | ${slide3Hook} | ${slide3Caption} |\n\n` +
      `${cta}`
    )
  } else {
    let headline = isPersona 
      ? `[SENIOR COPYWRITER STRATEGY: EMPATHY-FIRST CONVERSION]\n`
      : ``

    if (isInstructions) {
      const product = isContext ? 'FocusPulse' : 'the study app'
      parts.push(
        `${headline}` +
        `Hook: It's 2 AM. You're staring at 140 lecture slides, highlighting sentences you won't remember at 9 AM.\n\n` +
        `Body: Passive rereading is why cramming feels exhausting. ${product} converts raw lecture slides into 5-minute active recall drills so you can sleep and still pass.\n\n` +
        `CTA: Tap the bio link to test the beta before your next midterm.`
      )
    } else if (isContext) {
      parts.push(
        `${headline}` +
        `Are you an undergraduate student feeling exhausted by midterm exams? Introducing FocusPulse!\n\n` +
        `FocusPulse is the revolutionary AI study companion that turns your messy lecture notes into 5-minute flashcards. Study smarter and unleash your peak academic potential!\n\n` +
        `Link in bio to join the student waitlist! #CollegeLife #FocusPulse #EdTech`
      )
    } else if (isPersona) {
      parts.push(
        `${headline}` +
        `Conversion Angle: Address user anxiety directly.\n` +
        `Value Proposition: Turn hours of unstructured study material into verified recall.\n` +
        `Call to Action: Click through to access the launch sprint.`
      )
    } else {
      parts.push(
        `Here is an Instagram post for your app:\n\n` +
        `Want to ace your exams? Try this revolutionary new study tool to unlock your potential and study smarter, not harder! Boost your productivity and unleash success. Link in bio! #StudyGram #College #Productivity`
      )
    }
  }

  return parts.join('\n\n')
}

function getCodingOutput(b: Record<string, boolean>): string {
  const activeCount = Object.values(b).filter(Boolean).length
  if (activeCount === 0) {
    return '(No pillars active: LLM is idle awaiting instruction prompt...)'
  }

  const parts: string[] = []

  if (b.cot) {
    parts.push(
      `[ARCHITECTURAL REASONING / COT]\n` +
      `1. Concurrency Root Cause: Under traffic bursts, synchronous DB writes lock rows while awaiting Stripe ACK.\n` +
      `2. Deadlock Vector: Connection pool saturation triggers unhandled Promise timeouts (4% dropped events).\n` +
      `3. Pattern: Decouple ingestion from persistence -> ACK Stripe <20ms, queue payload via Redis/BullMQ.`
    )
  }

  const isPersona = b.persona
  const isContext = b.context
  const isInstructions = b.instructions
  const isFormat = b.format

  if (isFormat) {
    const seq = 
`[SYSTEM TOPOLOGY]\n` +
`\`\`\`mermaid\n` +
`sequenceDiagram\n` +
`  Stripe->>WebhookHandler: POST /webhook (Event ID)\n` +
`  WebhookHandler->>Redis: SADD idempotency:events (Event ID)\n` +
`  WebhookHandler-->>Stripe: 200 OK (Immediate ACK <15ms)\n` +
`  WebhookHandler->>BullMQ: Add job to payment-queue\n` +
`  BullMQ Worker->>Postgres: Process payment transaction\n` +
`\`\`\``

    const typeDef = isInstructions
      ? `import type { Request, Response } from 'express'\nimport { Queue } from 'bullmq'\n\nconst paymentQueue = new Queue('payment-processing')\n\n`
      : `const { Queue } = require('bullmq')\n\n`

    const code =
`[PRODUCTION ROUTE HANDLER]\n` +
`\`\`\`typescript\n` +
`${typeDef}export async function handleStripeWebhook(req: Request, res: Response): Promise<void> {\n` +
`  const eventId = req.headers['stripe-signature'] as string;\n` +
`  \n` +
`  // 1. Immediate ACK to prevent Stripe retry storms\n` +
`  res.status(200).json({ received: true });\n` +
`  \n` +
`  // 2. Offload to idempotent Redis queue (BullMQ)\n` +
`  await paymentQueue.add('process-event', req.body, {\n` +
`    jobId: eventId,\n` +
`    attempts: 3,\n` +
`    backoff: { type: 'exponential', delay: 1000 },\n` +
`  });\n` +
`}\n` +
`\`\`\``

    const test =
`[CONCURRENCY TEST SUITE]\n` +
`\`\`\`typescript\n` +
`describe('Webhook Concurrency', () => {\n` +
`  it('handles 1,000 burst events with 0 dropped locks', async () => {\n` +
`    const bursts = Array.from({ length: 1000 }, (_, i) => postWebhook(i));\n` +
`    const results = await Promise.all(bursts);\n` +
`    expect(results.every(r => r.status === 200)).toBe(true);\n` +
`  });\n` +
`});\n` +
`\`\`\``

    parts.push(seq)
    parts.push(code)
    parts.push(test)
  } else {
    let prefix = isPersona 
      ? `[PRINCIPAL ARCHITECT ASSESSMENT]\nDecoupling ingestion from execution via message-broker topology.\n\n`
      : ``

    if (isInstructions) {
      parts.push(
        `${prefix}` +
        `// Express Webhook Handler (Strict TypeScript)\n` +
        `app.post('/webhook', async (req: Request, res: Response): Promise<void> => {\n` +
        `  // Immediate 200 prevents Stripe retries during traffic spikes\n` +
        `  res.status(200).send({ received: true });\n` +
        `  \n` +
        `  // Enqueue event asynchronously into BullMQ\n` +
        `  await redisQueue.add('stripe-event', req.body, { jobId: req.body.id });\n` +
        `});`
      )
    } else if (isContext) {
      parts.push(
        `${prefix}` +
        `To fix the 4% Stripe event drop rate caused by DB locks, offload writes to Redis:\n\n` +
        `app.post('/webhook', async (req, res) => {\n` +
        `  await redis.lpush('payment_events', JSON.stringify(req.body));\n` +
        `  res.send('ok');\n` +
        `});\n\n` +
        `// Background worker processes 'payment_events' independently from web server.`
      )
    } else if (isPersona) {
      parts.push(
        `${prefix}` +
        `Architecture recommendation: Introduce an asynchronous worker pattern using Redis as an ingest buffer. ` +
        `Synchronous database writes within webhook controllers introduce cascading connection starvation.`
      )
    } else {
      parts.push(
        `To fix Stripe webhook issues, you should use Redis. Here is some code:\n\n` +
        `app.post("/webhook", async (req, res) => {\n` +
        `  await db.save(req.body)\n` +
        `  res.send("ok")\n` +
        `})`
      )
    }
  }

  return parts.join('\n\n')
}

function getHealthOutput(b: Record<string, boolean>): string {
  const activeCount = Object.values(b).filter(Boolean).length
  if (activeCount === 0) {
    return '(No pillars active: LLM is idle awaiting instruction prompt...)'
  }

  const parts: string[] = []

  if (b.cot) {
    parts.push(
      `[ATTENDING CLINICAL REASONING / COT]\n` +
      `1. Presentation: Acute pleuritic chest pain + unilateral calf swelling (3cm difference) post-14h flight.\n` +
      `2. Clinical Risk: High Wells Score for Pulmonary Embolism (DVT symptoms + tachycardia + immobility).\n` +
      `3. Pedagogical Constraint: Student tends to guess CT angiogram without computing pre-test probability.\n` +
      `4. Next Action: Probe for bedside risk score calculation before revealing imaging findings.`
    )
  }

  const isPersona = b.persona
  const isContext = b.context
  const isInstructions = b.instructions
  const isFormat = b.format

  if (isFormat) {
    const vitals =
`[PATIENT VITALS]\n` +
`BP: 105/70 mmHg | HR: 112 bpm (Sinus tachycardia) | RR: 24/min | SpO2: 91% (Room Air) | Temp: 37.1°C`

    const scenario = isContext
      ? `[CLINICAL SCENARIO]\n` +
        `A 58-year-old male presents to the Emergency Department with sudden-onset sharp right-sided chest pain ` +
        `that worsens on deep inspiration. He returned yesterday from a 14-hour transpacific flight. ` +
        `Physical exam reveals a warm, tender right calf measured 3.2 cm larger in circumference than the left.`
      : `[CLINICAL SCENARIO]\n` +
        `A patient presents with sudden chest pain and leg swelling following travel.`

    let question = ''
    if (isInstructions) {
      question =
`[SOCRATIC PROMPT QUESTION (ATTENDING)]\n` +
`"Before we order any diagnostic imaging or draw labs: Walk me through your clinical pre-test probability calculation. ` +
`What validated scoring system are you computing at the bedside right now, and which criteria are positive in this patient?"`
    } else {
      question =
`[ATTENDING ASSESSMENT]\n` +
`"This clinical picture is highly concerning for acute pulmonary embolism secondary to deep vein thrombosis. ` +
`Order a stat CT Pulmonary Angiogram (CTPA) and start therapeutic anticoagulation."`
    }

    parts.push(vitals)
    parts.push(scenario)
    parts.push(question)
  } else {
    let attendingTone = isPersona
      ? `[ATTENDING PHYSICIAN TO MEDICAL STUDENT]\n"Welcome to rounds. Pay close attention to this patient's vitals."\n\n`
      : ``

    if (isInstructions) {
      parts.push(
        `${attendingTone}` +
        `A 58-year-old male presents with acute pleuritic chest pain and a warm, swollen right calf after a long-haul flight. HR is 112, SpO2 is 91%.\n\n` +
        `I will not give you the diagnosis. Before ordering imaging: What bedside clinical score must you calculate right now to determine pre-test probability?`
      )
    } else if (isContext) {
      parts.push(
        `${attendingTone}` +
        `Case: 58-year-old with acute pleuritic chest pain and 3cm calf asymmetry after a 14-hour flight.\n\n` +
        `Diagnosis: The patient has a Pulmonary Embolism (PE) secondary to Deep Vein Thrombosis (DVT) caused by prolonged venous stasis. Order a CT angiogram immediately.`
      )
    } else if (isPersona) {
      parts.push(
        `${attendingTone}` +
        `As clinicians, our job is not to jump to conclusions based on textbook intuition. ` +
        `We must systematically rule out life-threatening differential diagnoses using validated scoring systems.`
      )
    } else {
      parts.push(
        `The patient likely has a pulmonary embolism (PE) caused by deep vein thrombosis (DVT) after prolonged immobility on the airplane. Order a CT angiogram immediately.`
      )
    }
  }

  return parts.join('\n\n')
}

const simulatedOutput = computed(() => {
  const b = activeBlocks.value
  if (currentPresetId.value === 'coding') {
    return getCodingOutput(b)
  }
  if (currentPresetId.value === 'health') {
    return getHealthOutput(b)
  }
  return getMarketingOutput(b)
})

const renderedSimulatedOutput = computed(() => {
  return marked.parse(simulatedOutput.value, { breaks: true, gfm: true })
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
        <span class="text-[10px] font-mono text-slate-400">Constraint Level:</span>
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
      <!-- Left: Constructed Instruction -->
      <div class="col-span-6 flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Constructed Instruction:</span>
          <button
            @click="copyPrompt"
            type="button"
            class="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-all duration-150 cursor-pointer select-none"
            :class="[
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
            ]"
            :title="copied ? 'Copied to clipboard!' : 'Copy prompt to clipboard'"
          >
            <span :class="copied ? 'i-lucide-check text-emerald-400' : 'i-lucide-copy text-indigo-400'" class="w-3 h-3"></span>
            <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
          </button>
        </div>
        <div class="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono whitespace-pre-wrap h-60 overflow-y-auto leading-relaxed text-slate-200 text-[11px]">
          {{ compiledPrompt || 'Select pillars above to assemble prompt...' }}
        </div>
      </div>

      <!-- Right: Simulated Model Output -->
      <div class="col-span-6 flex flex-col gap-1">
        <div class="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center justify-between">
          <span>Simulated Model Output:</span>
          <span class="text-[8px] font-mono text-slate-400">{{ qualityLabel }}</span>
        </div>
        <div
          class="p-3 rounded-lg bg-slate-950 border border-indigo-500/30 h-60 overflow-y-auto leading-relaxed text-slate-300 text-[11px] markdown-body"
          v-html="renderedSimulatedOutput"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.markdown-body table) {
  width: 100%;
  border-collapse: collapse;
  margin: 4px 0;
  font-size: 10px;
}
:deep(.markdown-body th),
:deep(.markdown-body td) {
  border: 1px solid rgba(148, 163, 184, 0.25);
  padding: 3px 6px;
  text-align: left;
}
:deep(.markdown-body th) {
  background-color: rgba(30, 41, 59, 0.85);
  color: #38bdf8;
  font-weight: 600;
}
:deep(.markdown-body td) {
  color: #cbd5e1;
}
:deep(.markdown-body code) {
  background-color: rgba(15, 23, 42, 0.9);
  padding: 1px 4px;
  border-radius: 4px;
  color: #34d399;
  font-family: monospace;
}
:deep(.markdown-body pre) {
  background-color: rgba(2, 6, 23, 0.95);
  padding: 6px 8px;
  border-radius: 6px;
  overflow-x: auto;
  border: 1px solid rgba(51, 65, 85, 0.5);
  font-size: 10px;
  color: #e2e8f0;
  margin: 4px 0;
}
:deep(.markdown-body pre code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
}
:deep(.markdown-body p) {
  margin: 4px 0;
}
:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 1.2rem;
  margin: 4px 0;
}
:deep(.markdown-body blockquote) {
  border-left: 2px solid #818cf8;
  padding-left: 8px;
  color: #a5b4fc;
  margin: 4px 0;
}
</style>
