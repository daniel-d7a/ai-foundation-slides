<script setup lang="ts">
import { computed, ref } from "vue";
import ExampleLangButton from "./ExampleLangButton.vue";

interface PromptPart {
  label: string;
  labelAr: string;
  key: string;
  bg: string;
  border: string;
  text: string;
  icon: string;
  content: string;
  contentAr: string;
}

interface ProductionPrompt {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  icon: string;
  parts: PromptPart[];
}

const isArabic = ref(false);

const prompts: ProductionPrompt[] = [
  {
    id: "marketing",
    title: "Marketing Persona & Angle Gen",
    titleAr: "توليد زوايا وشخصيات التسويق",
    category: "Growth & Strategy",
    icon: "i-lucide-megaphone",
    parts: [
      {
        key: "persona",
        label: "Persona",
        labelAr: "الدور",
        bg: "bg-purple-500/20 hover:bg-purple-500/35",
        border: "border-purple-500/60 hover:border-purple-400",
        text: "text-purple-200",
        icon: "i-lucide-user-check",
        content: "Act as a Senior Conversion Strategist.",
        contentAr: "تصرّف كخبير استراتيجي أول لزيادة التحويل والمبيعات.",
      },
      {
        key: "context",
        label: "Context",
        labelAr: "السياق",
        bg: "bg-blue-500/20 hover:bg-blue-500/35",
        border: "border-blue-500/60 hover:border-blue-400",
        text: "text-blue-200",
        icon: "i-lucide-compass",
        content: "We are launching an AI-powered code review assistant.",
        contentAr:
          "نحن بصدد إطلاق مساعد ذكي لمراجعة الشيفرات البرمجية مدعوم بالذكاء الاصطناعي.",
      },
      {
        key: "task",
        label: "Task",
        labelAr: "المهمة",
        bg: "bg-emerald-500/20 hover:bg-emerald-500/35",
        border: "border-emerald-500/60 hover:border-emerald-400",
        text: "text-emerald-200",
        icon: "i-lucide-target",
        content:
          "Generate 3 distinct developer buyer personas: 1) Overwhelmed Startup CTO, 2) Junior Bootcamper afraid of PR rejections, 3) Staff Engineer enforcing compliance.",
        contentAr:
          "أنشئ 3 شخصيات مشترين مميزة من المطورين: 1) مدير تقني لشركة ناشئة مرهق بالمهام، 2) مطور مبتدئ خريج معسكر تدريبي يخشى رفض طلبات السحب (PRs)، 3) مهندس برمجيات رئيسي يفرض معايير الامتثال والجودة.",
      },
      {
        key: "instructions",
        label: "Instructions",
        labelAr: "التعليمات",
        bg: "bg-cyan-500/20 hover:bg-cyan-500/35",
        border: "border-cyan-500/60 hover:border-cyan-400",
        text: "text-cyan-200",
        icon: "i-lucide-shield-alert",
        content:
          "Avoid corporate buzzwords. Base psychological anxieties on realistic developer friction.",
        contentAr:
          "تجنّب المصطلحات التسويقية المستهلكة، واعتمد في بناء المخاوف النفسية على التحديات اليومية الحقيقية للمطورين.",
      },
      {
        key: "format",
        label: "Format",
        labelAr: "الصيغة",
        bg: "bg-amber-500/20 hover:bg-amber-500/35",
        border: "border-amber-500/60 hover:border-amber-400",
        text: "text-amber-200",
        icon: "i-lucide-layout-grid",
        content:
          "For each persona provide: Primary Anxiety, Unvarnished Internal Monologue, and a 1-Sentence High-Converting Value Prop.",
        contentAr:
          "لكل شخصية قدّم: القلق الأساسي، ومونولوجاً داخلياً واقعياً دون تجميل، وقيمة مقترحة مقنعة في جملة واحدة ذات معدل تحويل عالٍ.",
      },
    ],
  },
  {
    id: "analytics",
    title: "Data Analysis & Anomaly Extraction",
    titleAr: "تحليل البيانات واستخراج الخلل",
    category: "Engineering & Data",
    icon: "i-lucide-bar-chart-2",
    parts: [
      {
        key: "persona",
        label: "Persona",
        labelAr: "الدور",
        bg: "bg-purple-500/20 hover:bg-purple-500/35",
        border: "border-purple-500/60 hover:border-purple-400",
        text: "text-purple-200",
        icon: "i-lucide-user-check",
        content: "Act as a Senior Site Reliability & Data Engineer.",
        contentAr: "تصرّف كمهندس أول لموثوقية المواقع (SRE) وهندسة البيانات.",
      },
      {
        key: "context",
        label: "Context",
        labelAr: "السياق",
        bg: "bg-blue-500/20 hover:bg-blue-500/35",
        border: "border-blue-500/60 hover:border-blue-400",
        text: "text-blue-200",
        icon: "i-lucide-compass",
        content:
          "I have uploaded server_latency_logs.csv with columns [timestamp, endpoint, status_code, latency_ms].",
        contentAr:
          "قمت برفع ملف server_latency_logs.csv بالأعمدة [timestamp, endpoint, status_code, latency_ms].",
      },
      {
        key: "task",
        label: "Task",
        labelAr: "المهمة",
        bg: "bg-emerald-500/20 hover:bg-emerald-500/35",
        border: "border-emerald-500/60 hover:border-emerald-400",
        text: "text-emerald-200",
        icon: "i-lucide-target",
        content:
          "Run a Python analysis to calculate the p50, p95, and p99 latency by endpoint. Identify endpoints exhibiting statistical latency degradation after 14:00 UTC.",
        contentAr:
          "قم بإجراء تحليل بايثون لحساب معدلات زمن الاستجابة p50 وp95 وp99 لكل نقطة نهاية (endpoint). حدد نقاط النهاية التي تُظهر تدهوراً إحصائياً في زمن الاستجابة بعد الساعة 14:00 بتوقيت UTC.",
      },
      {
        key: "instructions",
        label: "Instructions",
        labelAr: "التعليمات",
        bg: "bg-cyan-500/20 hover:bg-cyan-500/35",
        border: "border-cyan-500/60 hover:border-cyan-400",
        text: "text-cyan-200",
        icon: "i-lucide-shield-alert",
        content:
          "Filter out healthcheck polling endpoints. Isolate anomalies with >20% spike.",
        contentAr:
          "استبعد نقاط نهاية الفحص الدوري للحالة (healthcheck polling). اعزل حالات الخلل التي تتجاوز فيها القفزة 20%.",
      },
      {
        key: "format",
        label: "Format",
        labelAr: "الصيغة",
        bg: "bg-amber-500/20 hover:bg-amber-500/35",
        border: "border-amber-500/60 hover:border-amber-400",
        text: "text-amber-200",
        icon: "i-lucide-layout-grid",
        content:
          "Output a clean markdown comparison table accompanied by executable Matplotlib line plot code snippet.",
        contentAr:
          "اعرض النتيجة في جدول مقارنة ماركداون منظم مرفقاً بشفرة برمجية تنفيذية لرسم خطي باستخدام Matplotlib.",
      },
    ],
  },
  {
    id: "code-review",
    title: "Code Debugging & Test Generation",
    titleAr: "تصحيح الشفرة وإنشاء الاختبارات",
    category: "Software Dev",
    icon: "i-lucide-terminal",
    parts: [
      {
        key: "persona",
        label: "Persona",
        labelAr: "الدور",
        bg: "bg-purple-500/20 hover:bg-purple-500/35",
        border: "border-purple-500/60 hover:border-purple-400",
        text: "text-purple-200",
        icon: "i-lucide-user-check",
        content: "Act as a Principal Node.js Systems Engineer.",
        contentAr: "تصرّف كمهندس نظم رئيسي متخصص في Node.js.",
      },
      {
        key: "context",
        label: "Context",
        labelAr: "السياق",
        bg: "bg-blue-500/20 hover:bg-blue-500/35",
        border: "border-blue-500/60 hover:border-blue-400",
        text: "text-blue-200",
        icon: "i-lucide-compass",
        content:
          "Review the attached async queue consumer function failing in high-load production.",
        contentAr:
          "راجع دالة استهلاك طابور المهام غير المتزامن المرفقة والتي تفشل في بيئة الإنتاج ذات الحمل العالي.",
      },
      {
        key: "task",
        label: "Task",
        labelAr: "المهمة",
        bg: "bg-emerald-500/20 hover:bg-emerald-500/35",
        border: "border-emerald-500/60 hover:border-emerald-400",
        text: "text-emerald-200",
        icon: "i-lucide-target",
        content:
          "1) Pinpoint the unhandled Promise rejection race condition causing memory leaks. 2) Write a minimal reproduction unit test using Vitest that fails on current code. 3) Provide the refactored production function with exponential backoff retry.",
        contentAr:
          "1) حدد بدقة حالة السباق (race condition) لرفض الـ Promise غير المعالج والمسببة لتسريب الذاكرة. 2) اكتب اختبار وحدة مصغراً باستخدام Vitest يفشل على الشفرة الحالية لإثبات الخلل. 3) قدّم الدالة بعد إعادة هيكلتها للإنتاج مدعومة بآلية إعادة المحاولة مع التراجع الأسي (exponential backoff).",
      },
      {
        key: "instructions",
        label: "Instructions",
        labelAr: "التعليمات",
        bg: "bg-cyan-500/20 hover:bg-cyan-500/35",
        border: "border-cyan-500/60 hover:border-cyan-400",
        text: "text-cyan-200",
        icon: "i-lucide-shield-alert",
        content:
          "Do not introduce third-party libraries. Keep retry loop purely native asynchronous.",
        contentAr:
          "لا تضف أي مكتبات خارجية إضافية، واجعل حلقة إعادة المحاولة غير متزامنة وأصلية بالكامل.",
      },
      {
        key: "format",
        label: "Format",
        labelAr: "الصيغة",
        bg: "bg-amber-500/20 hover:bg-amber-500/35",
        border: "border-amber-500/60 hover:border-amber-400",
        text: "text-amber-200",
        icon: "i-lucide-layout-grid",
        content:
          "Present breakdown in 3 titled Markdown code sections: [Bug Root Cause], [Vitest Spec], [Hardened Code].",
        contentAr:
          "قسّم المخرج إلى 3 أقسام برمجية معنونة في ماركداون: [السبب الجذري للخلل]، [مواصفات اختبار Vitest]، [الشفرة المحصنة].",
      },
    ],
  },
  {
    id: "research",
    title: "Daily Intelligence Aggregator",
    titleAr: "مجمّع المعلومات التقنية اليومية",
    category: "Autonomous Research",
    icon: "i-lucide-globe",
    parts: [
      {
        key: "persona",
        label: "Persona",
        labelAr: "الدور",
        bg: "bg-purple-500/20 hover:bg-purple-500/35",
        border: "border-purple-500/60 hover:border-purple-400",
        text: "text-purple-200",
        icon: "i-lucide-user-check",
        content:
          "Act as an AI Research Director evaluating inference engineering breakthroughs.",
        contentAr:
          "تصرّف كمدير أبحاث ذكاء اصطناعي يُقيّم الإنجازات والابتكارات في هندسة الاستدلال (Inference Engineering).",
      },
      {
        key: "context",
        label: "Context",
        labelAr: "السياق",
        bg: "bg-blue-500/20 hover:bg-blue-500/35",
        border: "border-blue-500/60 hover:border-blue-400",
        text: "text-blue-200",
        icon: "i-lucide-compass",
        content:
          "Tracking state-of-the-art open-source LLM runtime optimizations over the past 24 hours.",
        contentAr:
          "تتبع أحدث تحسينات بيئات تشغيل النماذج اللغوية مفتوحة المصدر خلال الـ 24 ساعة الماضية.",
      },
      {
        key: "task",
        label: "Task",
        labelAr: "المهمة",
        bg: "bg-emerald-500/20 hover:bg-emerald-500/35",
        border: "border-emerald-500/60 hover:border-emerald-400",
        text: "text-emerald-200",
        icon: "i-lucide-target",
        content:
          "Search the web for top 5 technical announcements or open-source releases regarding LLM inference optimization published in the last 24 hours.",
        contentAr:
          "ابحث في الويب عن أهم 5 إعلانات تقنية أو إصدارات مفتوحة المصدر تتعلق بتحسين استدلال النماذج اللغوية الكبيرة تم نشرها خلال الـ 24 ساعة الماضية.",
      },
      {
        key: "instructions",
        label: "Instructions",
        labelAr: "التعليمات",
        bg: "bg-cyan-500/20 hover:bg-cyan-500/35",
        border: "border-cyan-500/60 hover:border-cyan-400",
        text: "text-cyan-200",
        icon: "i-lucide-shield-alert",
        content:
          "Strictly filter out promotional press releases, funding noise, and marketing fluff.",
        contentAr:
          "استبعد تماماً البيانات الصحفية الدعائية، وأخبار التمويل الاستثماري، والضجيج التسويقي.",
      },
      {
        key: "format",
        label: "Format",
        labelAr: "الصيغة",
        bg: "bg-amber-500/20 hover:bg-amber-500/35",
        border: "border-amber-500/60 hover:border-amber-400",
        text: "text-amber-200",
        icon: "i-lucide-layout-grid",
        content:
          "For each breakthrough output: Headline, 2-Sentence Technical Mechanism Summary, Architectural Trade-off, and Primary Source URL.",
        contentAr:
          "لكل ابتكار اذكر: العنوان، وملخصاً للآلية التقنية في جملتين، والمفاضلة المعمارية (Trade-off)، ورابط المصدر الأصلي.",
      },
    ],
  },
];

const selectedId = ref("marketing");
const activePart = ref<string | null>(null);
const copied = ref(false);

const currentPrompt = computed(() => {
  return prompts.find((p) => p.id === selectedId.value) || prompts[0];
});

const fullPromptText = computed(() => {
  return currentPrompt.value.parts
    .map((p) => (isArabic.value ? p.contentAr : p.content))
    .join(" ");
});

function copyPrompt() {
  navigator.clipboard.writeText(fullPromptText.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1800);
}
</script>

<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none">
    <!-- Header Action Bar (Language Toggle + Copy) -->
    <div class="flex items-center justify-between gap-2">
      <span
        class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold"
      >
        Production Scenarios:
      </span>

      <div class="flex items-center gap-2">
        <ExampleLangButton v-model="isArabic" />

        <button
          @click.stop="copyPrompt"
          @pointerdown.stop
          @mousedown.stop
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <span
            :class="
              copied
                ? 'i-lucide-check text-emerald-400'
                : 'i-lucide-copy text-slate-400'
            "
            class="w-3 h-3"
          ></span>
          <span>{{ copied ? "Copied" : "Copy Prompt" }}</span>
        </button>
      </div>
    </div>

    <!-- 100% Width Tab Titles (Each 25%) -->
    <div
      class="w-full grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800"
    >
      <button
        v-for="p in prompts"
        :key="p.id"
        @click="
          selectedId = p.id;
          activePart = null;
        "
        :class="[
          'w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[10.5px] font-medium transition-all duration-150 cursor-pointer text-center',
          selectedId === p.id
            ? 'bg-slate-800 text-white font-semibold border border-slate-600 shadow-sm'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent',
        ]"
      >
        <span :class="[p.icon, 'w-3.5 h-3.5 shrink-0']"></span>
        <span class="truncate">{{ isArabic ? p.titleAr : p.title }}</span>
      </button>
    </div>

    <!-- Dissected Prompt in Continuous Flowing Paragraph -->
    <div
      class="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-xl flex flex-col gap-3"
    >
      <!-- Single Paragraph with Colored Highlight Cells -->
      <div
        class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 leading-relaxed"
        :class="
          isArabic
            ? 'text-right font-sans text-[12.5px] font-medium arabic-code-example'
            : 'font-mono text-xs'
        "
        :dir="isArabic ? 'rtl' : 'ltr'"
      >
        <p class="inline">
          <template v-for="(part, idx) in currentPrompt.parts" :key="part.key">
            <span
              @mouseenter="activePart = part.key"
              @mouseleave="activePart = null"
              :class="[
                'inline rounded-md border px-2 py-0.5 mx-0.5 cursor-pointer transition-all duration-150 box-decoration-clone',
                part.bg,
                part.border,
                part.text,
                activePart === part.key
                  ? 'brightness-150 ring-2 ring-white/60 shadow-lg font-semibold'
                  : 'hover:brightness-125',
              ]"
              >{{ isArabic ? part.contentAr : part.content }}</span
            >
            <span
              v-if="idx < currentPrompt.parts.length - 1"
              class="text-transparent select-none"
            >
            </span>
          </template>
        </p>
      </div>

      <!-- Interactive Legend Bar -->
      <div
        class="flex items-center justify-between gap-2 flex-wrap pt-1 text-[11px] font-mono text-slate-400"
      >
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="text-slate-500 uppercase text-[10px] font-bold">
            Parts:
          </span>
          <button
            v-for="part in currentPrompt.parts"
            :key="part.key"
            @mouseenter="activePart = part.key"
            @mouseleave="activePart = null"
            :class="[
              'flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] transition-all',
              part.bg,
              part.border,
              part.text,
              activePart === part.key
                ? 'ring-1 ring-white/70 scale-105 brightness-150 font-bold'
                : 'opacity-85 hover:opacity-100',
            ]"
          >
            <span :class="[part.icon, 'w-3 h-3']"></span>
            <span>{{ isArabic ? part.labelAr : part.label }}</span>
          </button>
        </div>

        <div class="flex items-center gap-2 text-slate-400 text-[10px]">
          <span class="i-lucide-sparkles w-3 h-3 text-amber-400"></span>
          <span
            >Domain:
            <strong class="text-slate-200">{{
              currentPrompt.category
            }}</strong></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
