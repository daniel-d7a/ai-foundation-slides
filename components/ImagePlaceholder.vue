<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    caption?: string
    hint?: string
    aspect?: string
  }>(),
  {
    src: '',
    alt: '',
    caption: 'Image Placeholder',
    hint: 'Add image path',
    aspect: 'auto',
  }
)

const hasError = ref(false)

watch(() => props.src, () => {
  hasError.value = false
})
</script>

<template>
  <div
    class="relative rounded-xl overflow-hidden border transition-all duration-200 flex flex-col items-center justify-center p-3 text-center group w-full h-full select-none"
    :class="[
      src && !hasError
        ? 'border-slate-700/80 bg-slate-950'
        : 'border-2 border-dashed border-slate-700/70 hover:border-indigo-500/50 bg-slate-900/40 hover:bg-slate-900/60'
    ]"
  >
    <!-- Actual Image if provided and valid -->
    <template v-if="src && !hasError">
      <img
        :src="src"
        :alt="alt || caption"
        class="w-full h-full object-cover rounded-lg"
        @error="hasError = true"
      />
      <div
        v-if="caption"
        class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-2 text-left"
      >
        <span class="text-[11px] font-sans text-slate-200 font-medium block truncate">{{ caption }}</span>
      </div>
    </template>

    <!-- Placeholder State -->
    <template v-else>
      <div class="flex flex-col items-center justify-center gap-1.5 p-2 max-w-full">
        <div class="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:border-indigo-400 transition-all duration-150">
          <span class="i-lucide-image text-lg"></span>
        </div>
        <div class="font-serif font-bold text-xs text-slate-200 group-hover:text-white transition-colors line-clamp-2 px-1">
          {{ caption }}
        </div>
        <div class="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
          <span class="i-lucide-plus text-[10px]"></span>
          <span>{{ hint }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
