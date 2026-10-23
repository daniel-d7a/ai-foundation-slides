<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'
import ExampleLangButton from './ExampleLangButton.vue'

interface ExpectedPoint {
  icon: string
  label: string
  text: string
}

interface TaskOption {
  id: string
  title: string
  iconClass: string
  samplePrompt: string
  samplePromptAr: string
  expectedSummary: string
  expectedSummaryAr: string
  expectedPoints: ExpectedPoint[]
  expectedPointsAr: ExpectedPoint[]
  outputPreview: string
  outputPreviewAr: string
}

interface MajorOption {
  id: string
  name: string
  iconClass: string
  tasks: TaskOption[]
}

const isArabic = ref(false)

const majors: MajorOption[] = [
  {
    id: 'business',
    name: 'Business & Marketing',
    iconClass: 'i-lucide-briefcase',
    tasks: [
      {
        id: 'campaign',
        title: 'Launch a Multi-Channel Campaign',
        iconClass: 'i-lucide-megaphone',
        samplePrompt: 'Act as a Senior Growth Strategist. We are launching an AI productivity app for undergraduate students. Create a 3-part Instagram launch angle focusing on exam cramming anxiety. Return output as a table: [Hook] | [Visual Scene] | [CTA]. Do not use corporate buzzwords.',
        samplePromptAr: 'تصرّف كخبير استراتيجي أول لنمو الأعمال. نحن بصدد إطلاق تطبيق إنتاجية مدعوم بالذكاء الاصطناعي لطلاب المرحلة الجامعية. أنشئ زاوية تسويقية لإطلاق التطبيق على إنستغرام من 3 أجزاء تركّز على قلق التكديس الدراسي ليلة الامتحان. اعرض النتيجة في جدول: [العنصر الجاذب] | [المشهد البصري] | [دعوة لاتخاذ إجراء]. تجنّب العبارات التسويقية المبتذلة تماماً.',
        expectedSummary: 'A structured 3-part campaign table with zero corporate jargon, focused on relatable student exam anxiety.',
        expectedSummaryAr: 'جدول حملة منظّم من 3 أجزاء خالٍ تماماً من المصطلحات المبتذلة، ويركّز بواقعية على قلق الطلاب ليلة الامتحان.',
        expectedPoints: [
          { icon: 'i-lucide-table', label: '3-Part Schema', text: 'Outputs strict Markdown table: [Hook] | [Visual Scene] | [CTA].' },
          { icon: 'i-lucide-sparkles', label: 'Relatable Tone', text: 'Focuses on 2 AM study panic rather than generic buzzwords.' },
          { icon: 'i-lucide-send', label: 'High-Converting CTA', text: 'Transitions each scene into a low-friction mobile action hook.' },
        ],
        expectedPointsAr: [
          { icon: 'i-lucide-table', label: 'هيكل من 3 أعمدة', text: 'جدول ماركداون دقيق: [العنصر الجاذب] | [المشهد البصري] | [دعوة لاتخاذ إجراء].' },
          { icon: 'i-lucide-sparkles', label: 'نبرة واقعية', text: 'يخاطب ذعر المذاكرة عند 2 صباحاً بدلاً من الكلمات الرنانة المستهلكة.' },
          { icon: 'i-lucide-send', label: 'دعوة فعّالة للإجراء', text: 'ينقل كل مشهد إلى إجراء سريع وسهل عبر الهاتف المحمول.' },
        ],
        outputPreview: '| Hook | Visual Scene | CTA |\n|---|---|---|\n| 80 slides in 3 hours? Don\'t panic. | Student staring at highlighted PDF at 2 AM | Sync FocusPulse before midterms |\n| Stop rewriting lecture notes manually | Split screen: Messy scribbles -> 5 Anki cards | Try free 5-min prep |',
        outputPreviewAr: '| العنصر الجاذب | المشهد البصري | دعوة لاتخاذ إجراء |\n|---|---|---|\n| 80 شريحة خلال 3 ساعات؟ لا داعي للذعر. | طالب يحدق بملف PDF مظلل في الساعة 2 صباحاً | فعّل تطبيق FocusPulse قبل الامتحانات النصفية |\n| توقف عن كتابة ملاحظات المحاضرات يدوياً | شاشة منقسمة: خربشات غير منظمة -> 5 بطاقات استذكار | جرّب الإعداد المجاني في 5 دقائق |',
      },
      {
        id: 'analysis',
        title: 'Analyze Customer Retention CSV',
        iconClass: 'i-lucide-chart-bar',
        samplePrompt: 'I have uploaded customer_orders.csv. Clean missing values in the "churn_status" column, calculate the 30-day retention rate by acquisition source, and generate a seaborn bar chart showing top 3 drop-off points.',
        samplePromptAr: 'قمت برفع ملف customer_orders.csv. قم بمعالجة القيم المفقودة في عمود "churn_status"، واحسب معدل الاحتفاظ بالعملاء لمدة 30 يوماً حسب مصدر الاستقطاب، وأنشئ رسماً بيانياً شريطياً باستخدام مكتبة seaborn يوضح أعلى 3 نقاط انقطاع.',
        expectedSummary: 'A rigorous statistical churn breakdown with automated data cleaning and executed chart code.',
        expectedSummaryAr: 'تحليل إحصائي دقيق لمعدلات توقف العملاء مع تنظيف آلي للبيانات وشفرة برمجية منفذة للرسم البياني.',
        expectedPoints: [
          { icon: 'i-lucide-filter', label: 'Data Cleaning Log', text: 'Explicitly handles and imputes null values before computing metrics.' },
          { icon: 'i-lucide-table', label: 'Retention Cohorts', text: 'Calculates 30-day retention rates grouped by acquisition channel.' },
          { icon: 'i-lucide-chart-bar', label: 'Visual Plot', text: 'Executes Python code rendering an inline Seaborn drop-off chart.' },
        ],
        expectedPointsAr: [
          { icon: 'i-lucide-filter', label: 'سجل تنظيف البيانات', text: 'معالجة واستكمال القيم المفقودة صراحةً قبل حساب المؤشرات.' },
          { icon: 'i-lucide-table', label: 'مجموعات الاحتفاظ', text: 'حساب معدل الاحتفاظ لـ 30 يوماً مصنفاً حسب قناة الاستقطاب.' },
          { icon: 'i-lucide-chart-bar', label: 'مخطط بياني', text: 'تنفيذ شفرة بايثون لإنشاء رسم بياني شريطي عبر Seaborn لنقاط الانقطاع.' },
        ],
        outputPreview: '[Data Cleaning]: Imputed 14 null records in churn_status (98.6% valid).\n[Cohort Retention]: Organic: 68.4% | Referral: 74.2% | Paid: 41.1%\n[Seaborn Plot]: Horizontal bar chart pinpointing Day-7 onboarding drop-off.',
        outputPreviewAr: '[تنظيف البيانات]: استكمال 14 سجلاً مفقوداً في churn_status (صحة البيانات 98.6%).\n[معدل الاحتفاظ]: طبيعي: 68.4% | إحالة: 74.2% | إعلانات مدفوعة: 41.1%\n[مخطط Seaborn]: رسم شريطي أفقي يبرز نقطة الانقطاع الرئيسية في اليوم السابع من التهيئة.',
      },
    ],
  },
  {
    id: 'stem',
    name: 'CS & Engineering',
    iconClass: 'i-lucide-code',
    tasks: [
      {
        id: 'build',
        title: 'Build Full-Stack Prototype',
        iconClass: 'i-lucide-layers',
        samplePrompt: 'Analyze the authentication middleware in @server/auth.ts. Refactor the JWT token validation to support refresh token rotation, update the unit tests in @tests/auth.test.ts, and ensure no breaking changes in existing route handlers.',
        samplePromptAr: 'حلّل وسيط المصادقة البرمجي في @server/auth.ts. أعد هيكلة التحقق من رمز JWT ليدعم تدوير رموز التحديث (refresh token rotation)، وحدّث اختبارات الوحدة في @tests/auth.test.ts، وتأكد من عدم وجود أي تغييرات مخلة بالتوافقية مع مسارات الـ API الحالية.',
        expectedSummary: 'Production-ready TypeScript refactor with dual-token rotation and backward-compatible test assertions.',
        expectedSummaryAr: 'إعادة هيكلة برمجية بلغة TypeScript جاهزة للإنتاج تدعم تدوير الرموز مع اختبارات وحدة متوافقة عكسياً.',
        expectedPoints: [
          { icon: 'i-lucide-file-code', label: 'Atomic Code Diff', text: 'Short-lived access JWT paired with revolving HTTP-only refresh cookie.' },
          { icon: 'i-lucide-shield-check', label: 'Unit Test Suite', text: 'Updated tests verifying expired token rejection and replay defense.' },
          { icon: 'i-lucide-workflow', label: 'API Compatibility', text: 'Guarantees verifyAuth() signature remains unchanged for routes.' },
        ],
        expectedPointsAr: [
          { icon: 'i-lucide-file-code', label: 'تعديل برمجي دقيق', text: 'رمز JWT قصير المدى مقترن بملف تعريف ارتباط HTTP-only دوّار للتحديث.' },
          { icon: 'i-lucide-shield-check', label: 'حزمة اختبارات الوحدة', text: 'اختبارات محدّثة للتحقق من رفض الرموز منتهية الصلاحية ومنع هجمات إعادة الإرسال.' },
          { icon: 'i-lucide-workflow', label: 'توافقية الـ API', text: 'ضمان بقاء واجهة دالة verifyAuth() كما هي دون كسر المسارات القائمة.' },
        ],
        outputPreview: '// auth.ts refactor:\nexport async function rotateRefreshToken(token: string) {\n  const payload = verify(token, REFRESH_SECRET);\n  await revokeToken(payload.jti);\n  return generateTokenPair(payload.userId);\n}\n// Tests passed: 14/14 in @tests/auth.test.ts',
        outputPreviewAr: '// إعادة هيكلة auth.ts:\nexport async function rotateRefreshToken(token: string) {\n  const payload = verify(token, REFRESH_SECRET);\n  await revokeToken(payload.jti);\n  return generateTokenPair(payload.userId);\n}\n// اجتازت جميع الاختبارات: 14/14 في @tests/auth.test.ts',
      },
      {
        id: 'debug',
        title: 'Debug Distributed Trace Logs',
        iconClass: 'i-lucide-bug',
        samplePrompt: 'Attached is a 400KB server stack trace and our order processing worker. Scan for deadlocks occurring between Redis lock acquisition and PostgreSQL commit. Pinpoint the exact line of failure and explain the fix.',
        samplePromptAr: 'مرفق سجل تتبع أخطاء الخادم (stack trace) بحجم 400 كيلوبايت ومُعالج معالجة الطلبات. افحص بحثاً عن حالات الجمود التام (Deadlocks) بين اكتساب قفل Redis وتثبيت معاملات PostgreSQL. حدد سطر الخطأ بدقة واشرح الحل البرمجي.',
        expectedSummary: 'Precise line-level root-cause analysis of concurrency deadlock with execution trace and verified patch.',
        expectedSummaryAr: 'تحليل دقيق للسبب الجذري على مستوى السطر للجمود التام أثناء التزامن، مع مسار التنفيذ والترقيع البرمجي الموثق.',
        expectedPoints: [
          { icon: 'i-lucide-bug', label: 'Root-Cause Pinpoint', text: 'Pins exact lock inversion between Redis mutex and Postgres worker.' },
          { icon: 'i-lucide-git-commit-horizontal', label: 'Trace Breakdown', text: 'Timeline explanation of worker starvation under concurrent load.' },
          { icon: 'i-lucide-file-code', label: 'Production Patch', text: 'Patched transaction block moving Redis lock release outside DB scope.' },
        ],
        expectedPointsAr: [
          { icon: 'i-lucide-bug', label: 'تحديد السبب الجذري', text: 'تحديد دقيق لنقطة انعكاس الأقفال بين قفل Redis ومُعالج Postgres.' },
          { icon: 'i-lucide-git-commit-horizontal', label: 'تتبع زمني للمسار', text: 'تفسير زمني لتجويع المُعالج عند ارتفاع الحمل المتزامن.' },
          { icon: 'i-lucide-file-code', label: 'ترقيع برمجي معتمد', text: 'تصحيح معاملة قاعدة البيانات لنقل تحرير قفل Redis خارج نطاق المعاملة.' },
        ],
        outputPreview: '[Root Cause]: Deadlock at worker.ts:84.\nThread holds open Postgres transaction while awaiting Redis lock acquisition.\n[Fix]: Release Redis lock prior to db.transaction() commit.',
        outputPreviewAr: '[السبب الجذري]: جمود تام (Deadlock) في السطر worker.ts:84.\nالخيط البرمجي يُبقي معاملة Postgres مفتوحة أثناء انتظار اكتساب قفل Redis.\n[الحل]: تحرير قفل Redis قبل تثبيت db.transaction().',
      },
    ],
  },
  {
    id: 'humanities',
    name: 'Humanities & Health',
    iconClass: 'i-lucide-book-open',
    tasks: [
      {
        id: 'literature',
        title: 'Synthesize 30 Research Papers',
        iconClass: 'i-lucide-file-text',
        samplePrompt: 'Based exclusively on the 8 clinical study PDFs uploaded to this notebook, synthesize the reported efficacy of cognitive behavioral therapy vs SSRIs in adolescent insomnia. Include clickable citation anchors for each finding.',
        samplePromptAr: 'استناداً حصرياً إلى ملفات PDF الثمانية للدراسات السريرية المرفوعة في هذا الدفتر، لخص الفعالية المسجلة للعلاج السلوكي المعرفي (CBT) مقارنة بمثبطات استرداد السيروتونين الانتقائية (SSRIs) في أرق المراهقين. أرفق مراجع استشهادية موثقة لكل نتيجة.',
        expectedSummary: 'Strictly grounded clinical synthesis restricted to source PDFs with inline excerpt citations.',
        expectedSummaryAr: 'تلخيص سريري موثق بدقة مقتصر حصرياً على ملفات PDF المصدرية مع استشهادات نصية مدرجة.',
        expectedPoints: [
          { icon: 'i-lucide-bookmark', label: 'Grounded Evidence', text: 'Direct comparison of CBT-I vs SSRI outcomes from provided files only.' },
          { icon: 'i-lucide-link-2', label: 'Inline Citations', text: 'Every claim anchored to study pages (e.g., [Study 2, p. 14]).' },
          { icon: 'i-lucide-circle-alert', label: 'Honest Boundary', text: 'Explicitly discloses missing data parameters without hallucinating.' },
        ],
        expectedPointsAr: [
          { icon: 'i-lucide-bookmark', label: 'أدلة موثقة بالمصدر', text: 'مقارنة مباشرة بين نتائج CBT-I وSSRIs مستمدة من الملفات المرفقة فقط.' },
          { icon: 'i-lucide-link-2', label: 'استشهادات نصية مدرجة', text: 'ربط كل نتيجة بصفحات الدراسة المحددة (مثال: [الدراسة 2، ص 14]).' },
          { icon: 'i-lucide-circle-alert', label: 'أمانة علمية صارمة', text: 'التنويه صراحةً بأي بيانات مفقودة دون أي افتراضات أو اختلاق.' },
        ],
        outputPreview: '"CBT-I demonstrated 68% sustained remission at 12 weeks [Paper A, p. 14], outperforming SSRI monotherapy (44%) [Paper C, p. 8].\nNote: None of the 8 studies evaluated 24-month relapse rates."',
        outputPreviewAr: '"أظهر العلاج السلوكي المعرفي للأرق (CBT-I) تحسناً مستداماً بنسبة 68% عند الأسبوع 12 [الدراسة أ، ص 14] متفوقاً على العلاج الأحادي بـ SSRI بنسبة (44%) [الدراسة ج، ص 8].\nملاحظة: لم تقيّم أي من الدراسات الثماني معدلات الانتكاس بعد 24 شهراً."',
      },
      {
        id: 'exam',
        title: 'Socratic Medical Board Prep',
        iconClass: 'i-lucide-brain',
        samplePrompt: 'Act as a clinical attending physician preparing a resident for USMLE Step 2. Present a patient case history with acute shortness of breath. Do not give the diagnosis. Ask me for my diagnostic workup plan first.',
        samplePromptAr: 'تصرّف كطبيب استشاري يُعد طبيباً مقيماً لاختبار البورد الطبي (USMLE Step 2). اعرض حالة سريرية لمريض يعاني من ضيق حاد في التنفس. لا تذكر التشخيص النهائي، بل اطلب مني أولاً خطة الفحوصات التشخيصية.',
        expectedSummary: 'Interactive attending-physician vignette that probes clinical reasoning without giving away answers.',
        expectedSummaryAr: 'حالة سريرية تفاعلية بأسلوب الطبيب الاستشاري تختبر التفكير السريري دون إفشاء الإجابة.',
        expectedPoints: [
          { icon: 'i-lucide-activity', label: 'Clinical Vignette', text: 'Realistic 48-year-old patient presentation with vital signs and history.' },
          { icon: 'i-lucide-shield-check', label: 'Zero Answer Leak', text: 'Strictly withholds the underlying diagnosis and imaging answers.' },
          { icon: 'i-lucide-circle-help', label: 'Socratic Inquiry', text: 'Prompts you for top 3 differential diagnoses and initial workup plan.' },
        ],
        expectedPointsAr: [
          { icon: 'i-lucide-activity', label: 'سيناريو سريري واقعي', text: 'عرض واقعي لمريض يبلغ 48 عاماً مع مؤشراته الحيوية وتاريخه المرضي.' },
          { icon: 'i-lucide-shield-check', label: 'حجب تام للتشخيص', text: 'حجب التشخيص الأساسي ونتائج الأشعة لتحفيز الاستنتاج الطبي.' },
          { icon: 'i-lucide-circle-help', label: 'استجواب سقراطي', text: 'سؤال موجه لطلب أعلى 3 تشخيصات تفريقية وخطة الفحوصات الأولية.' },
        ],
        outputPreview: '"A 48-year-old male presents with acute dyspnea, SpO2 88%, pleuritic chest pain.\nAttending: \'Before I disclose the imaging findings: What are your top 3 differential diagnoses, and what immediate diagnostic workup will you order?\'"',
        outputPreviewAr: '"مريض يبلغ من العمر 48 عاماً يعاني من ضيق حاد في التنفس، وتشبع الأكسجين SpO2 88%، مع ألم صدري جنبي.\nالاستشاري: \'قبل أن أكشف لك عن نتائج الأشعة: ما هي أهم 3 تشخيصات تفريقية تشك بها، وما هي خطة الفحوصات التشخيصية الفورية التي ستطلبها؟\'"',
      },
    ],
  },
]

const selectedMajor = ref(majors[0].id)
const activeMajorObj = computed(() => majors.find(m => m.id === selectedMajor.value) || majors[0])

const selectedTask = ref(activeMajorObj.value.tasks[0].id)

const activeTaskObj = computed(() => {
  return activeMajorObj.value.tasks.find(t => t.id === selectedTask.value) || activeMajorObj.value.tasks[0]
})

function setMajor(id: string) {
  selectedMajor.value = id
  const m = majors.find(x => x.id === id)
  if (m) selectedTask.value = m.tasks[0].id
  copied.value = false
}

const currentPrompt = computed(() => {
  return isArabic.value && activeTaskObj.value.samplePromptAr
    ? activeTaskObj.value.samplePromptAr
    : activeTaskObj.value.samplePrompt
})

const currentSummary = computed(() => {
  return isArabic.value && activeTaskObj.value.expectedSummaryAr
    ? activeTaskObj.value.expectedSummaryAr
    : activeTaskObj.value.expectedSummary
})

const currentPoints = computed(() => {
  return isArabic.value && activeTaskObj.value.expectedPointsAr
    ? activeTaskObj.value.expectedPointsAr
    : activeTaskObj.value.expectedPoints
})

const currentOutputPreview = computed(() => {
  return isArabic.value && activeTaskObj.value.outputPreviewAr
    ? activeTaskObj.value.outputPreviewAr
    : activeTaskObj.value.outputPreview
})

const copied = ref(false)
let copyTimeout: ReturnType<typeof setTimeout> | null = null

async function copyPrompt() {
  const text = currentPrompt.value
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

const renderedOutput = computed(() => {
  return marked.parse(currentOutputPreview.value, { breaks: true, gfm: true })
})
</script>

<template>
  <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 text-left">
    <!-- Step 1: Select Major + Language Toggle -->
    <div class="flex items-center justify-between mb-2.5">
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono text-indigo-400 uppercase tracking-wider font-bold">1. Select Domain:</span>
        <div class="flex gap-2">
          <button
            v-for="m in majors"
            :key="m.id"
            @click="setMajor(m.id)"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer"
            :class="[
              selectedMajor === m.id
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
            ]"
          >
            <span :class="m.iconClass" class="w-3.5 h-3.5"></span>
            <span class="font-serif font-bold">{{ m.name }}</span>
          </button>
        </div>
      </div>

      <!-- Reusable Language Toggle -->
      <ExampleLangButton v-model="isArabic" />
    </div>

    <!-- Step 2: Select Task -->
    <div class="flex items-center gap-3 mb-3">
      <span class="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">2. Specific Task:</span>
      <div class="flex gap-2">
        <button
          v-for="t in activeMajorObj.tasks"
          :key="t.id"
          @click="selectedTask = t.id; copied = false"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer"
          :class="[
            selectedTask === t.id
              ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
          ]"
        >
          <span :class="t.iconClass" class="w-3.5 h-3.5"></span>
          <span>{{ t.title }}</span>
        </button>
      </div>
    </div>

    <!-- Production Prompt & Expected Output Grid -->
    <div class="grid grid-cols-12 h-72 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
      <!-- Left: Sample Prompt Template -->
      <div class="col-span-6 flex flex-col justify-between pr-3 border-r border-slate-800">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
              {{ isArabic ? 'قالب التوجيه الهندسي (Prompt)' : 'Production-Ready Prompt Template' }}
            </span>
            <button
              @click.stop="copyPrompt"
              @pointerdown.stop
              @mousedown.stop
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
              <span>{{ copied ? (isArabic ? 'تم النسخ!' : 'Copied!') : (isArabic ? 'نسخ' : 'Copy') }}</span>
            </button>
          </div>
          <div
            class="p-3 rounded-lg bg-slate-900 border border-indigo-500/30 text-slate-200 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto transition-all"
            :class="isArabic ? 'text-right font-sans text-[12.5px] font-medium arabic-code-example' : 'font-mono text-[11px]'"
            :dir="isArabic ? 'rtl' : 'ltr'"
          >
            {{ currentPrompt }}
          </div>
        </div>
      </div>

      <!-- Right: Example Output & What to Expect -->
      <div class="col-span-6 flex flex-col justify-between pl-2">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              {{ isArabic ? 'المخرجات المتوقعة وسلوك النموذج' : 'What to Expect (Example Output)' }}
            </span>
            <span class="text-[10px] font-mono text-slate-400">
              {{ isArabic ? 'سلوك النموذج' : 'Model behavior' }}
            </span>
          </div>
          <div
            class="p-2.5 rounded-lg bg-slate-900 border border-cyan-500/30 h-60 overflow-y-auto space-y-2"
            :dir="isArabic ? 'rtl' : 'ltr'"
            :class="isArabic ? 'text-right' : ''"
          >
            <!-- Summary -->
            <div
              class="text-slate-200 font-sans leading-snug"
              :class="isArabic ? 'text-[12px] font-medium' : 'text-[11px]'"
            >
              {{ currentSummary }}
            </div>

            <!-- Key points with icons -->
            <div class="space-y-1 pt-1.5 border-t border-slate-800 font-sans" :class="isArabic ? 'text-[11px]' : 'text-[10.5px]'">
              <div v-for="(pt, idx) in currentPoints" :key="idx" class="flex items-start gap-1.5">
                <span :class="pt.icon" class="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5"></span>
                <span class="text-slate-300">
                  <strong class="text-white">{{ pt.label }}:</strong> {{ pt.text }}
                </span>
              </div>
            </div>

            <!-- Output Preview Snippet rendered as Markdown -->
            <div
              class="mt-1.5 p-2 rounded bg-slate-950 border border-slate-800/80 text-emerald-300 markdown-body leading-relaxed max-h-28 overflow-y-auto"
              :class="isArabic ? 'text-[11px] arabic-code-example font-sans' : 'text-[10px]'"
              :dir="isArabic ? 'rtl' : 'ltr'"
              v-html="renderedOutput"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.markdown-body table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2px 0;
  font-size: 9.5px;
}
:deep(.markdown-body th),
:deep(.markdown-body td) {
  border: 1px solid rgba(148, 163, 184, 0.25);
  padding: 3px 5px;
  text-align: inherit;
}
:deep(.markdown-body th) {
  background-color: rgba(30, 41, 59, 0.85);
  color: #38bdf8;
  font-weight: 600;
}
:deep(.markdown-body td) {
  color: #6ee7b7;
}
:deep(.markdown-body code) {
  background-color: rgba(15, 23, 42, 0.9);
  padding: 1px 3px;
  border-radius: 3px;
  color: #6ee7b7;
  font-family: monospace;
}
:deep(.markdown-body pre) {
  background-color: rgba(2, 6, 23, 0.95);
  padding: 4px 6px;
  border-radius: 4px;
  overflow-x: auto;
  border: 1px solid rgba(51, 65, 85, 0.5);
  font-size: 9.5px;
  color: #6ee7b7;
  margin: 2px 0;
}
:deep(.markdown-body p) {
  margin: 2px 0;
}
</style>
