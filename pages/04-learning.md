---
layout: default
---

<ModuleTitleCard
  moduleNo="MODULE 04"
  title="AI for Learning"
  subtitle="From Passive Copying to Active Practice: The AI Tutor Framework."
  image="/images/04-learning.jpg"
  color="pink"
/>

---
layout: default
---

<LectureOutcomes :module="4" />

---

# Two Approaches to AI in Learning

Use AI as a study partner that tests your knowledge instead of a tool that only provides answers.

<div class="grid grid-cols-2 gap-5 mt-6">
  <div v-click class="p-5 rounded-xl bg-slate-900/90 border-2 border-red-500/40 flex flex-col justify-between h-90">
    <div>
      <h3 class="text-xl font-bold text-white font-serif min-h-[2.5rem] flex items-center">The Oracle Method ("Give me the code")</h3>
      <div class="mt-2.5 p-3 rounded-lg bg-red-950/40 border border-red-500/30 font-mono text-xs text-red-200">
        "Write the code to implement a binary search tree in Python with insert and delete."
      </div>
      <div class="text-[11px] text-slate-300 mt-4 space-y-2 font-mono">
        <div class="flex items-center gap-2">
          <span class="i-lucide-circle-x w-3.5 h-3.5 text-red-400 shrink-0"></span>
          <span>No active recall practice</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="i-lucide-triangle-alert w-3.5 h-3.5 text-red-400 shrink-0"></span>
          <span>Creates immediate dependence on the tool</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="i-lucide-slash w-3.5 h-3.5 text-red-400 shrink-0"></span>
          <span>Causes failure during exams and technical interviews</span>
        </div>
      </div>
    </div>
    <div class="pt-2 border-t border-red-900/40 text-xs font-mono text-red-400">
      Outcome: Surface familiarity and weak retention
    </div>
  </div>

  <div v-click class="p-5 rounded-xl bg-slate-900/90 border-2 border-emerald-500/40 flex flex-col justify-between h-84">
    <div>
      <h3 class="text-xl font-bold text-white font-serif min-h-[2.5rem] flex items-center">The Coach Method ("Guide my reasoning")</h3>
      <div class="mt-2.5 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 font-mono text-xs text-emerald-200">
        "Do not give me code. Test my understanding of BST node deletion and point out missing edge cases."
      </div>
      <div class="text-[11px] text-slate-300 mt-4 space-y-2 font-mono">
        <div class="flex items-center gap-2">
          <span class="i-lucide-circle-check w-3.5 h-3.5 text-emerald-400 shrink-0"></span>
          <span>Consistent active recall practice</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="i-lucide-target w-3.5 h-3.5 text-emerald-400 shrink-0"></span>
          <span>Quick detection of conceptual errors</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="i-lucide-sparkles w-3.5 h-3.5 text-emerald-400 shrink-0"></span>
          <span>Deep understanding of core principles</span>
        </div>
      </div>
    </div>
    <div class="pt-2 border-t border-emerald-900/40 text-xs font-mono text-emerald-300">
      Outcome: Independent problem-solving skills
    </div>
  </div>
</div>

---

# The Socratic Method in Practice

Compare passive text summaries with interactive question-driven study.

<SocraticToggle />

---

# Explain Concepts with Analogies

Connect complex programming concepts to real-world systems you already understand.

<AnalogyEngine />

---

# What is RAG?

Retrieval-Augmented Generation: Giving the AI an open-book exam with your own course materials.

<RagExplainer />

---

# Standard LLM vs. RAG

Why generic chatbots struggle with study materials, and how grounded retrieval fixes it.

<RagComparison />

---

# How We Use RAG

From raw study materials to verified answers in three simple steps.

<RagWorkflow />

---

# The AI Study Framework

RAG is the foundation of effective studying. Here is how we put it into action.

<RagStudySegue />

---

# Study Method: Grounded Ingestion

Step 1: Connect AI tools to course materials to prevent incorrect facts and generate audio notes.

<div class="mt-2">
  <StudyPipelineStep :step="1" />
</div>

---

# Study Method: Active Recall

Step 2: Convert lecture slides into spaced-repetition flashcards and quiz questions.

<div class="mt-2">
  <StudyPipelineStep :step="2" />
</div>

---

# Study Method: Interactive Drills

Step 3: Build interactive exercises to test abstract concepts directly.

<div class="mt-2">
  <StudyPipelineStep :step="3" />
</div>

---

# Study Method: Real-World Drill (Cooking)

Step 3: Test everyday skills — interactive kitchen heat & timing technique.

<div class="mt-2">
  <StudyPipelineStep :step="3" domain="cooking" />
</div>


---

# Identify Knowledge Gaps

Diagnose and fix conceptual errors before exam day.

<GapAnalysis />

<!--
PRESENTER NOTES - CONCRETE EXAMPLES FOR GAP ANALYSIS:

Use this 5-stage loop when coaching students who are stuck on concepts despite re-reading notes.

EXAMPLE 1: OOP & INHERITANCE (Design Patterns)
- Benchmark: "Design a simulation with Birds, Ducks, and Penguins. How do you model Flying behavior?"
- Student Attempt (Scratchpad): "Make parent Bird class with fly(), inherit Penguin and override fly() to throw an exception or return null."
- AI Diagnosis: Penguin is a Bird, but cannot Fly. Forcing inheritance violates Liskov Substitution (LSP) and causes runtime exceptions. Root cause: using inheritance for code reuse instead of composition.
- AI Help / Prescription: Apply Strategy Pattern or CanFly ability interface ("Favor composition over inheritance").
- Again / Drill: "Now model a toy drone, an ostrich, and a bat. Which classes share flight without shared parentage?"
- Diagnostic Prompt: "Act as a CS Tutor. Here is my OOP code where Penguin inherits from Bird and overrides fly() to throw an error. Explain why this breaks Liskov Substitution and demonstrate the composition alternative."

EXAMPLE 2: DATA STRUCTURES (Stacks vs Queues)
- Benchmark: "Implement an 'Undo' feature for a text editor. Which data structure stores previous keystrokes?"
- Student Attempt (Scratchpad): "Use a FIFO Queue because actions must be processed in the order they occurred."
- AI Diagnosis: Queue reverses operations in First-In, First-Out order, undoing your initial keystroke from an hour ago! Undo requires Last-In, First-Out (LIFO = Stack).
- AI Help / Prescription: Trace Stack push/pop timeline on 3 keystrokes; build twin-stack Undo/Redo pattern.
- Again / Drill: "Contrast browser Back/Forward navigation vs print spooler queuing."
- Diagnostic Prompt: "I confused Stacks and Queues when building an undo feature. Provide 2 intuitive real-world analogies and 2 quick drills to cement LIFO vs FIFO."

EXAMPLE 3: RECURSION & BASE CASES
- Benchmark: "Write a recursive function to calculate the sum of numbers in a list."
- Student Attempt (Scratchpad): "return list[0] + sum(list[1:]) without if-checks because the slice naturally shrinks."
- AI Diagnosis: Implicit termination without explicit base case. When list becomes empty [], list[0] raises IndexError / RecursionError call stack overflow.
- AI Help / Prescription: Always write base condition first (if not list: return 0); visualize expanding/collapsing stack frames.
- Again / Drill: "Write recursive factorial and palindrome checks with explicit base guards."
- Diagnostic Prompt: "Review my recursive list sum that crashed with RecursionError. Walk me through the missing base case and trace the call stack step-by-step."
-->
