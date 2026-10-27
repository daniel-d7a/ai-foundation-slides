<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import SpeechBubble from "./SpeechBubble.vue";

const currentStep = ref(0);
const isPlaying = ref(true);
const autoLoop = ref(false);
const chatRightRef = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setTimeout> | null = null;

const totalSteps = 6;

function scrollToBottom() {
  nextTick(() => {
    if (chatRightRef.value) {
      chatRightRef.value.scrollTop = chatRightRef.value.scrollHeight;
    }
  });
}

function runStep(s: number) {
  currentStep.value = s;
  scrollToBottom();

  if (!isPlaying.value) return;

  if (s < totalSteps) {
    const delay = s === 1 ? 950 : 850;
    timer = setTimeout(() => {
      runStep(s + 1);
    }, delay);
  } else if (autoLoop.value) {
    timer = setTimeout(() => {
      replay();
    }, 3500);
  }
}

function startAnimation() {
  if (timer) clearTimeout(timer);
  isPlaying.value = true;
  currentStep.value = 0;
  timer = setTimeout(() => {
    runStep(1);
  }, 400);
}

function replay() {
  if (timer) clearTimeout(timer);
  isPlaying.value = true;
  startAnimation();
}

function togglePlay() {
  if (isPlaying.value) {
    if (timer) clearTimeout(timer);
    isPlaying.value = false;
  } else {
    isPlaying.value = true;
    if (currentStep.value >= totalSteps) {
      replay();
    } else {
      runStep(currentStep.value + 1);
    }
  }
}

function jumpToStep(s: number) {
  if (timer) clearTimeout(timer);
  isPlaying.value = false;
  currentStep.value = s;
  scrollToBottom();
}

onMounted(() => {
  startAnimation();
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div class="flex flex-col gap-2.5 text-left w-full max-w-full">
    <!-- Top Control Bar -->
    <div
      class="flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800"
    >
      <div class="flex items-center gap-2 text-xs font-mono text-slate-400">
        <span
          class="w-2 h-2 rounded-full"
          :class="isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'"
        ></span>
        <span
          class="text-slate-300 font-semibold uppercase tracking-wider text-[11px]"
          >Live Cognitive Interaction Trace</span
        >
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-2">
        <!-- Step Badges -->
        <div class="flex items-center gap-1 mr-2">
          <button
            v-for="i in totalSteps"
            :key="i"
            @click="jumpToStep(i)"
            class="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono transition-all cursor-pointer"
            :class="[
              currentStep >= i
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-800 text-slate-500 hover:text-slate-300',
            ]"
            :title="`Step ${i}`"
          >
            {{ i }}
          </button>
        </div>

        <button
          @click="togglePlay"
          class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
        >
          <span
            v-if="isPlaying"
            class="i-lucide-pause w-3 h-3 text-amber-400"
          ></span>
          <span v-else class="i-lucide-play w-3 h-3 text-emerald-400"></span>
          <span>{{ isPlaying ? "Pause" : "Play" }}</span>
        </button>

        <button
          @click="replay"
          class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
        >
          <svg class="w-3 h-3 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          <span>Replay</span>
        </button>

        <button
          @click="autoLoop = !autoLoop"
          class="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border"
          :class="
            autoLoop
              ? 'bg-indigo-950/60 border-indigo-500/80 text-indigo-300'
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
          "
        >
          <span class="i-lucide-repeat w-3 h-3"></span>
          <span>Loop</span>
        </button>
      </div>
    </div>

    <!-- Side-by-Side Comparison -->
    <div class="grid grid-cols-2 gap-3.5">
      <!-- 1. LEFT: Passive / Oracle Dump -->
      <div
        class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/60 flex flex-col justify-between h-[340px]"
      >
        <div>
          <!-- Header -->
          <div
            class="flex items-center justify-between pb-2 mb-2 border-b border-slate-800"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded-lg bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-rose-400"
              >
                <span class="i-lucide-file-x w-3.5 h-3.5"></span>
              </div>
              <span class="text-sm font-bold text-white font-serif"
                >The Oracle Mindset (Textbook Dump)</span
              >
            </div>
            <span
              class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 font-semibold"
            >
              1 Turn
            </span>
          </div>

          <!-- Chat Canvas -->
          <div
            class="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 h-[270px] flex flex-col justify-start gap-2.5 overflow-hidden relative"
          >
            <!-- Student Question Bubble -->
            <SpeechBubble
              v-if="currentStep >= 1"
              :is-user="true"
              theme="slate"
              :lines="['w-28', 'w-16']"
              badge-icon="i-lucide-help-circle"
              badge-text="Question Prompt"
            />

            <!-- Typing indicator for step 1 -->
            <div
              v-if="currentStep === 1"
              class="flex items-center gap-1.5 px-3 py-2 rounded-2xl rounded-tl-xs bg-rose-950/30 border border-rose-500/30 w-16 text-rose-400 self-start"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"
              ></span>
              <span
                class="w-1.5 h-1.5 rounded-full bg-rose-400/80 animate-pulse delay-150"
              ></span>
              <span
                class="w-1.5 h-1.5 rounded-full bg-rose-400/60 animate-pulse delay-300"
              ></span>
            </div>

            <!-- Massive Monolithic Wall of Speech Bubble -->
            <SpeechBubble
              v-if="currentStep >= 2"
              :is-user="false"
              theme="red"
              dense
              :lines="[
                'w-[96%]',
                'w-[100%]',
                'w-[94%]',
                'w-[98%]',
                'w-[88%]',
                'w-[92%]',
                'w-[75%]',
                'w-[0%]',
                'w-[60%]',
                'w-[82%]',
                'w-[77%]',
              ]"
              badge-icon="i-lucide-scroll-text"
              badge-color="text-rose-400"
              badge-text="Monolithic Wall of Text (400 words)"
            />
          </div>
        </div>
      </div>

      <!-- 2. RIGHT: Active / Socratic Sparring -->
      <div
        class="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 shadow-lg shadow-emerald-950/20 flex flex-col justify-between h-[340px]"
      >
        <div>
          <!-- Header -->
          <div
            class="flex items-center justify-between pb-2 mb-2 border-b border-slate-800"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded-lg bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400"
              >
                <span class="i-lucide-brain-circuit w-3.5 h-3.5"></span>
              </div>
              <span class="text-sm font-bold text-white font-serif"
                >Socratic Tutor (Active Inquiry &amp; Mastery)</span
              >
            </div>
            <span
              class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-semibold"
            >
              Multi-Turn
            </span>
          </div>

          <!-- Chat Canvas -->
          <div
            ref="chatRightRef"
            class="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-2.5 h-[270px] flex flex-col gap-1.5 overflow-y-auto scroll-smooth relative"
          >
            <!-- Turn 1: Student Question Bubble -->
            <SpeechBubble
              v-if="currentStep >= 1"
              :is-user="true"
              theme="slate"
              :lines="['w-24', 'w-14']"
              badge-icon="i-lucide-help-circle"
              badge-text="Question Prompt"
            />

            <!-- Turn 2: Tutor AI Guides with Question (?) -->
            <SpeechBubble
              v-if="currentStep >= 2"
              :is-user="false"
              theme="emerald"
              :lines="['w-36', 'w-22']"
              badge-icon="i-lucide-help-circle"
              badge-color="text-emerald-400"
              badge-text="Guided Inquiry (?)"
            />

            <!-- Turn 3: Student Formulates Hypothesis (💡) -->
            <SpeechBubble
              v-if="currentStep >= 3"
              :is-user="true"
              theme="indigo"
              :lines="['w-28', 'w-16']"
              badge-icon="i-lucide-lightbulb"
              badge-color="text-amber-300"
              badge-text="Hypothesis Deduction"
            />

            <!-- Turn 4: Tutor AI Points to Edge Case (🔍) -->
            <SpeechBubble
              v-if="currentStep >= 4"
              :is-user="false"
              theme="emerald"
              :lines="['w-32', 'w-20']"
              badge-icon="i-lucide-compass"
              badge-color="text-emerald-400"
              badge-text="Probing Edge Case"
            />

            <!-- Turn 5: Student Discovers Solution (🎯) -->
            <SpeechBubble
              v-if="currentStep >= 5"
              :is-user="true"
              theme="indigo"
              :lines="['w-24', 'w-14']"
              badge-icon="i-lucide-target"
              badge-color="text-emerald-300"
              badge-text="First-Principles Discovery"
            />

            <!-- Turn 6: Tutor AI Confirms & Synthesizes (✨) -->
            <SpeechBubble
              v-if="currentStep >= 6"
              :is-user="false"
              theme="emerald"
              :lines="['w-36', 'w-22']"
              badge-icon="i-lucide-sparkles"
              badge-color="text-emerald-300"
              badge-text="Conceptual Synthesis"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
