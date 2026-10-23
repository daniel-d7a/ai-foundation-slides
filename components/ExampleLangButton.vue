<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
  }>(),
  {
    modelValue: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    type="button"
    @click.stop="toggle"
    @pointerdown.stop
    @mousedown.stop
    class="w-7 h-7 rounded-lg flex items-center justify-center font-bold transition-all cursor-pointer border shadow-sm select-none"
    :class="modelValue
      ? 'bg-emerald-950/90 border-emerald-500/80 text-emerald-300 hover:bg-emerald-900 shadow-emerald-950/40 text-sm font-sans'
      : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500/60 hover:bg-slate-800 text-xs font-mono'"
    :title="modelValue ? 'Switch example to English' : 'ترجمة نص المثال إلى العربية الفصحى'"
  >
    {{ modelValue ? 'ع' : 'E' }}
  </button>
</template>
