import { defineConfig, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Plus Jakarta Sans:400,500,600,700,800',
        mono: 'JetBrains Mono:400,500,600',
      },
    }),
  ],
  shortcuts: {
    'glass-card': 'bg-slate-900/70 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-xl',
    'glass-card-hover': 'transition-all duration-200 hover:border-indigo-500/60 hover:shadow-indigo-500/10 hover:shadow-2xl',
    'badge-indigo': 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full px-2.5 py-0.5 text-xs font-mono',
    'badge-emerald': 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full px-2.5 py-0.5 text-xs font-mono',
    'badge-amber': 'bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full px-2.5 py-0.5 text-xs font-mono',
    'badge-cyan': 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 rounded-full px-2.5 py-0.5 text-xs font-mono',
  },
})
