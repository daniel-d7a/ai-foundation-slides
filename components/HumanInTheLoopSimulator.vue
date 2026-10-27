<script setup lang="ts">
import { ref } from "vue";

type ApprovalState = "pending" | "approved" | "rejected";

const state = ref<ApprovalState>("pending");
const isExecuting = ref(false);

function handleDecision(decision: "approved" | "rejected") {
  if (isExecuting.value) return;
  isExecuting.value = true;
  setTimeout(() => {
    state.value = decision;
    isExecuting.value = false;
  }, 450);
}

function resetSimulation() {
  state.value = "pending";
  isExecuting.value = false;
}
</script>

<template>
  <div
    class="w-full max-w-5xl mx-auto h-[385px] flex flex-col justify-between select-none font-sans"
  >
    <!-- Top Concept Banner: The HITL Pattern -->
    <div
      class="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-sm"
    >
      <div class="flex items-center gap-2.5">
        <div
          class="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0"
        >
          <span class="i-lucide-shield-alert w-4 h-4 text-amber-400"></span>
        </div>
        <div>
          <span class="text-xs font-bold text-white font-serif"
            >Human-in-the-Loop Guardrails:</span
          >
          <span class="text-[11px] text-slate-300 ml-1.5"
            >Why autonomous AI needs human approval for high-stake
            actions.</span
          >
        </div>
      </div>

      <!-- Reset Simulation Button -->
      <button
        type="button"
        @click="resetSimulation"
        class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-[10px] font-mono text-slate-300 transition-all cursor-pointer"
        title="Reset simulation"
      >
        <span class="i-lucide-rotate-ccw w-3 h-3"></span>
        <span>Reset Flow</span>
      </button>
    </div>

    <!-- Main Grid: Left = Workflow Architecture Diagram, Right = Live Interactive Slack Card -->
    <div class="grid grid-cols-12 gap-3.5 flex-1 my-2">
      <!-- LEFT: Visual Pipeline Diagram (5 Cols) -->
      <div
        class="col-span-5 rounded-2xl bg-slate-950/90 border border-slate-800 p-3 flex flex-col justify-between shadow-lg"
      >
        <div
          class="text-[9.5px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1.5 flex items-center justify-between"
        >
          <span class="font-bold text-white flex items-center gap-1">
            <span class="i-lucide-workflow w-3 h-3 text-cyan-400"></span>
            Pipeline Execution State
          </span>
          <span
            class="px-1.5 py-0.2 rounded text-[8.5px]"
            :class="
              state === 'pending'
                ? 'bg-amber-950 text-amber-300 border border-amber-500/40 animate-pulse'
                : state === 'approved'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-950 text-rose-300 border border-rose-500/40'
            "
          >
            {{
              state === "pending"
                ? "PAUSED: Awaiting Click"
                : state === "approved"
                  ? "RESUMED: Approved"
                  : "ROUTED: Escalated"
            }}
          </span>
        </div>

        <!-- Vertical Flow Sequence -->
        <div class="space-y-2 my-auto">
          <!-- Step 1: Inbound Webhook -->
          <div
            class="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px]"
          >
            <span
              class="i-lucide-inbox w-3.5 h-3.5 text-cyan-400 shrink-0"
            ></span>
            <div class="min-w-0">
              <span class="font-bold text-white font-mono">1. Webhook:</span>
              <span class="text-slate-400 ml-1"
                >Dispute ticket #4928 received</span
              >
            </div>
          </div>

          <!-- Step 2: AI Reasoning -->
          <div
            class="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px]"
          >
            <span
              class="i-lucide-cpu w-3.5 h-3.5 text-indigo-400 shrink-0"
            ></span>
            <div class="min-w-0">
              <span class="font-bold text-white font-mono">2. AI Model:</span>
              <span class="text-slate-400 ml-1"
                >Validates ledger & drafts $2,400 refund</span
              >
            </div>
          </div>

          <!-- Step 3: Wait Node (HITL Gate) -->
          <div
            class="flex items-center gap-2 p-1.5 rounded-lg border transition-all text-[10px]"
            :class="
              state === 'pending'
                ? 'bg-amber-950/60 border-amber-500/60 ring-2 ring-amber-500/20'
                : 'bg-slate-900/60 border-slate-800 opacity-70'
            "
          >
            <span
              class="w-3.5 h-3.5 shrink-0"
              :class="
                state === 'pending'
                  ? 'i-lucide-pause-circle text-amber-400 animate-pulse'
                  : 'i-lucide-check text-slate-400'
              "
            ></span>
            <div class="min-w-0">
              <span class="font-bold text-amber-300 font-mono"
                >3. Wait Node:</span
              >
              <span class="text-slate-300 ml-1"
                >Suspends pipeline until human clicks button</span
              >
            </div>
          </div>

          <!-- Step 4: Branching Resume Result -->
          <div
            class="flex items-center gap-2 p-1.5 rounded-lg border transition-all text-[10px]"
            :class="
              state === 'approved'
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                : state === 'rejected'
                  ? 'bg-rose-950/80 border-rose-500/60 text-rose-200'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
            "
          >
            <span
              class="w-3.5 h-3.5 shrink-0"
              :class="
                state === 'approved'
                  ? 'i-lucide-credit-card text-emerald-400'
                  : state === 'rejected'
                    ? 'i-lucide-user-x text-rose-400'
                    : 'i-lucide-clock text-slate-600'
              "
            ></span>
            <div class="min-w-0 truncate">
              <template v-if="state === 'approved'">
                <strong class="font-mono text-emerald-300">4. Resumed:</strong>
                Stripe $2,400 refund executed
              </template>
              <template v-else-if="state === 'rejected'">
                <strong class="font-mono text-rose-300">4. Rerouted:</strong>
                Escalated to Senior Finance Director
              </template>
              <template v-else>
                <span class="font-mono">4. Awaiting decision:</span> Stripe
                action blocked
              </template>
            </div>
          </div>
        </div>

        <div
          class="pt-1.5 border-t border-slate-800 text-[9px] font-mono text-slate-500"
        >
          Pattern: n8n Wait Node + Webhook Callback
        </div>
      </div>

      <!-- RIGHT: Interactive Slack / Telegram Action Card (7 Cols) -->
      <div
        class="col-span-7 rounded-2xl bg-slate-950/95 border border-slate-800 p-3.5 flex flex-col justify-between shadow-xl"
      >
        <div>
          <!-- Slack Channel Header -->
          <div
            class="flex items-center justify-between pb-2 border-b border-slate-800"
          >
            <div class="flex items-center gap-2">
              <span class="i-logos-slack-icon w-4 h-4"></span>
              <span class="text-xs font-bold text-white font-mono"
                >#finance-approvals</span
              >
            </div>
            <span class="text-[9px] font-mono text-slate-500"
              >Today at 10:42 AM</span
            >
          </div>

          <!-- Message Body -->
          <div
            class="mt-2.5 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800"
          >
            <div class="flex items-start gap-2.5">
              <div
                class="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 font-bold font-mono text-xs"
              >
                AI
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs text-white font-serif"
                    >High-Value Refund Request ($2,400)</span
                  >
                  <span
                    class="text-[9px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-500/30"
                    >Requires Human Signoff</span
                  >
                </div>
                <div
                  class="text-[10px] text-slate-300 mt-1 font-sans leading-tight"
                >
                  Customer
                  <strong class="text-white"
                    >Alex Mercer (Enterprise Pro)</strong
                  >
                  reported double charge for annual license renewal.
                </div>

                <!-- AI Analysis Card -->
                <div
                  class="mt-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-[9.5px] font-mono space-y-0.5"
                >
                  <div class="text-slate-400">
                    <strong class="text-indigo-400">AI Verification:</strong>
                    Duplicate payment confirmed in Stripe ledger (Invoice
                    #9042).
                  </div>
                  <div class="text-slate-400">
                    <strong class="text-cyan-400">Proposed Action:</strong>
                    Refund $2,400 via Stripe API & send confirmation email.
                  </div>
                </div>
              </div>
            </div>

            <!-- Pending State: Prompt + Icon-Only Action Buttons -->
            <div
              v-if="state === 'pending'"
              class="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between gap-3"
            >
              <div
                class="text-[9.5px] font-mono text-slate-400 flex items-center gap-1.5"
              >
                <span
                  class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"
                ></span>
                <span>Select human decision to continue pipeline:</span>
              </div>

              <div class="flex items-center gap-2">
                <!-- Approve Button (Icon only) -->
                <button
                  type="button"
                  @click="handleDecision('approved')"
                  :disabled="isExecuting"
                  aria-label="Approve refund"
                  title="Approve Refund ($2,400)"
                  class="flex items-center justify-center w-8 h-8 rounded-lg transition-all cursor-pointer border border-emerald-500/50 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-emerald-100 active:scale-95 disabled:opacity-50 shadow-sm"
                >
                  <span
                    class="w-4 h-4"
                    :class="
                      isExecuting
                        ? 'i-lucide-refresh-cw animate-spin text-emerald-400'
                        : 'i-lucide-check'
                    "
                  ></span>
                </button>

                <!-- Reject Button (Icon only) -->
                <button
                  type="button"
                  @click="handleDecision('rejected')"
                  :disabled="isExecuting"
                  aria-label="Reject or escalate"
                  title="Reject and Escalate to Finance"
                  class="flex items-center justify-center w-8 h-8 rounded-lg transition-all cursor-pointer border border-rose-500/50 bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-rose-100 active:scale-95 disabled:opacity-50 shadow-sm"
                >
                  <span
                    class="w-4 h-4"
                    :class="
                      isExecuting
                        ? 'i-lucide-refresh-cw animate-spin text-rose-400'
                        : 'i-lucide-x'
                    "
                  ></span>
                </button>
              </div>
            </div>

            <!-- Post-Action Result: Buttons Removed, Result Text Displayed -->
            <div
              v-else
              class="mt-3 pt-2.5 border-t border-slate-800 transition-all duration-300"
            >
              <div
                v-if="state === 'approved'"
                class="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-sm shadow-emerald-950/40"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="i-lucide-check-circle-2 w-4 h-4 text-emerald-400 shrink-0"
                  ></span>
                  <div class="text-[10px] font-mono leading-tight">
                    <span class="font-bold text-white"
                      >Refund Approved ($2,400):</span
                    >
                    <span class="text-emerald-300 ml-1"
                      >Stripe payment reversed &bull; Apology email dispatched
                      to Alex Mercer</span
                    >
                  </div>
                </div>
              </div>

              <div
                v-else-if="state === 'rejected'"
                class="flex items-center justify-between px-3 py-2 rounded-lg bg-rose-950/80 border border-rose-500/60 text-rose-300 shadow-sm shadow-rose-950/40"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="i-lucide-shield-alert w-4 h-4 text-rose-400 shrink-0"
                  ></span>
                  <div class="text-[10px] font-mono leading-tight">
                    <span class="font-bold text-white"
                      >Action Rejected &bull; Escalated:</span
                    >
                    <span class="text-rose-300 ml-1"
                      >Forwarded to Finance Director for manual ledger review
                      &bull; Ticket held</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Metric Footer -->
        <div
          class="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400"
        >
          <span class="flex items-center gap-1.5">
            <span
              class="i-lucide-shield-check w-3.5 h-3.5 text-emerald-400"
            ></span>
            <span
              >Zero catastrophic errors &bull; 90% less manual data entry for
              operators.</span
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
