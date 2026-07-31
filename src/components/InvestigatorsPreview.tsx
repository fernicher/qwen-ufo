import { Globe, BookOpen, Award } from 'lucide-react';
import { investigators } from '../data/investigators';

const cred: any = {
  referente: { label: 'Referente Mundial', color: 'text-cyan-400 border-cyan-400/40' },
  activo: { label: 'Investigador Activo', color: 'text-green-400 border-green-400/40' },
  histórico: { label: 'Figura Histórica', color: 'text-amber-400 border-amber-400/40' },
  controvertido: { label: 'Controvertido', color: 'text-orange-400 border-orange-400/40' },
};

export default function InvestigatorsPreview() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Mentes Detrás del Fenómeno</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Investigadores Destacados</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investigators.map((inv) => {
            const c = cred[inv.credibility] || { label: inv.credibility, color: 'text-gray-400 border-gray-400/40' };
            return (
              <div key={inv.id} className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 hover:border-aurora-cyan/30 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-aurora-cyan/20 to-blue-600/20 border border-aurora-cyan/20 flex items-center justify-center">
                    <span className="text-xl font-display font-bold text-aurora-cyan">{inv.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-aurora-cyan">{inv.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400"><Globe className="w-3 h-3" />{inv.country}</div>
                  </div>
                </div>
                <p className="text-xs text-aurora-cyan/80 font-semibold uppercase tracking-wider mb-2">{inv.specialty}</p>
                <p className="text-sm text-gray-300 line-clamp-3 mb-4">{inv.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {inv.works.slice(0, 2).map((w) => <span key={w} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5 flex items-center gap-1"><BookOpen className="w-2.5 h-2.5" />{w.split('(')[0].trim()}</span>)}
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${c.color}`}><Award className="w-3 h-3 inline mr-1" />{c.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}