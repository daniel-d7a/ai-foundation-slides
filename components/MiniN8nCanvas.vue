<script setup lang="ts">
import { ref } from 'vue'

const rawIdea = ref('5 tips for college freshmen using AI without cheating')
const workflowState = ref<'idle' | 'running_node1' | 'running_node2' | 'completed'>('idle')

interface WorkflowResult {
  xThreadHook: string
  linkedInSummary: string
  imagePrompt: string
}

const result = ref<WorkflowResult | null>(null)

function runWorkflow() {
  workflowState.value = 'running_node1'
  result.value = null

  setTimeout(() => {
    workflowState.value = 'running_node2'
    setTimeout(() => {
      workflowState.value = 'completed'
      result.value = {
        xThreadHook: `🧵 Most freshmen use AI to write essays (and get caught).\n\nHere are 5 ethical ways high-GPA students use AI to actually cut study hours in half: ⬇️`,
        linkedInSummary: `How should modern students navigate AI in the classroom?\n\nRather than treating AI as an oracle for answers, top learners use it as a Socratic sparring partner to stress-test their mental models.\n\nKey takeaways: Active recall > passive copy-pasting. Full breakdown in comments!`,
        imagePrompt: `Minimalist 3D isometric render of an illuminated open book with glowing neural network filaments connecting to a college desk, clean modern lighting, 8k --ar 16:9`,
      }
    }, 1200)
  }, 700)
}
</script>

<template>
  <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/60 text-left">
    <!-- Header & Trigger Input -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
        <span class="text-xs font-mono font-bold text-slate-200">Interactive n8n Pipeline Canvas</span>
      </div>
      <button
        @click="runWorkflow"
        :disabled="workflowState !== 'idle' && workflowState !== 'completed'"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-bold text-white transition-all cursor-pointer shadow-md"
        :class="[
          workflowState === 'idle' || workflowState === 'completed'
            ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-cyan-500/20'
            : 'bg-slate-700 opacity-60 cursor-not-allowed'
        ]"
      >
        <span>⚡</span>
        <span>{{ workflowState === 'idle' || workflowState === 'completed' ? 'Execute Workflow' : 'Processing Nodes...' }}</span>
      </button>
    </div>

    <!-- 3 Connected Nodes -->
    <div class="grid grid-cols-12 gap-3 items-center relative my-2">
      <!-- Node 1: Trigger -->
      <div
        class="col-span-4 p-3 rounded-xl border transition-all duration-300"
        :class="[
          workflowState === 'running_node1'
            ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20'
            : 'bg-slate-950 border-slate-800'
        ]"
      >
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[10px] font-mono uppercase text-cyan-400 font-bold">1. Trigger (Webhook)</span>
          <span class="w-2 h-2 rounded-full" :class="workflowState === 'running_node1' ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'"></span>
        </div>
        <div class="text-[11px] text-slate-400 mb-1">Incoming Content Idea:</div>
        <input
          v-model="rawIdea"
          class="w-full text-xs p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
        />
      </div>

      <!-- Connector 1 -->
      <div class="col-span-1 flex justify-center">
        <div class="h-0.5 w-full relative bg-slate-800">
          <div
            v-if="workflowState === 'running_node1' || workflowState === 'running_node2' || workflowState === 'completed'"
            class="absolute top-[-3px] w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 transition-all duration-500"
            :class="workflowState === 'running_node1' ? 'left-0' : 'right-0'"
          ></div>
        </div>
      </div>

      <!-- Node 2: AI Agent -->
      <div
        class="col-span-3 p-3 rounded-xl border transition-all duration-300"
        :class="[
          workflowState === 'running_node2'
            ? 'bg-indigo-950/40 border-indigo-400 ring-2 ring-indigo-400/40 shadow-lg shadow-indigo-500/20'
            : 'bg-slate-950 border-slate-800'
        ]"
      >
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[10px] font-mono uppercase text-indigo-400 font-bold">2. AI Transform</span>
          <span class="w-2 h-2 rounded-full" :class="workflowState === 'running_node2' ? 'bg-indigo-400 animate-ping' : 'bg-slate-700'"></span>
        </div>
        <div class="text-[11px] text-slate-300 font-semibold">Claude 3.7 + Structured Parser</div>
        <div class="text-[10px] text-slate-400 mt-1">Converts raw idea into multi-platform JSON output.</div>
      </div>

      <!-- Connector 2 -->
      <div class="col-span-1 flex justify-center">
        <div class="h-0.5 w-full relative bg-slate-800">
          <div
            v-if="workflowState === 'running_node2' || workflowState === 'completed'"
            class="absolute top-[-3px] w-2 h-2 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400 transition-all duration-500"
            :class="workflowState === 'running_node2' ? 'left-0' : 'right-0'"
          ></div>
        </div>
      </div>

      <!-- Node 3: Publish Output -->
      <div
        class="col-span-3 p-3 rounded-xl border transition-all duration-300"
        :class="[
          workflowState === 'completed'
            ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-500/20'
            : 'bg-slate-950 border-slate-800'
        ]"
      >
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[10px] font-mono uppercase text-emerald-400 font-bold">3. Action Node</span>
          <span class="w-2 h-2 rounded-full" :class="workflowState === 'completed' ? 'bg-emerald-400' : 'bg-slate-700'"></span>
        </div>
        <div class="text-[11px] text-slate-300 font-semibold">Social Multi-Publisher</div>
        <div class="text-[10px] text-slate-400 mt-1">Broadcasts to X, LinkedIn & Image Queue.</div>
      </div>
    </div>

    <!-- Live Execution Results Display -->
    <div v-if="result" class="grid grid-cols-12 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
      <div class="col-span-4 p-2 rounded-lg bg-slate-950 border border-slate-800">
        <div class="text-[10px] font-mono text-cyan-400 uppercase mb-1">Generated X/Twitter Post</div>
        <p class="text-[11px] text-slate-300 whitespace-pre-wrap leading-tight">{{ result.xThreadHook }}</p>
      </div>

      <div class="col-span-5 p-2 rounded-lg bg-slate-950 border border-slate-800">
        <div class="text-[10px] font-mono text-indigo-400 uppercase mb-1">Generated LinkedIn Article</div>
        <p class="text-[11px] text-slate-300 whitespace-pre-wrap leading-tight">{{ result.linkedInSummary }}</p>
      </div>

      <div class="col-span-3 p-2 rounded-lg bg-slate-950 border border-slate-800">
        <div class="text-[10px] font-mono text-amber-400 uppercase mb-1">Midjourney Prompt</div>
        <p class="text-[10px] font-mono text-slate-400 leading-tight">{{ result.imagePrompt }}</p>
      </div>
    </div>
    <div v-else class="text-center py-2 text-xs text-slate-500 font-mono">
      Click "Execute Workflow" to trigger the automated event pipeline.
    </div>
  </div>
</template>
