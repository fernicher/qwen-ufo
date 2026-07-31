import { Calendar, MapPin, Shield } from 'lucide-react';
import type { UFOCase } from '../../data/cases';

export default function CasePopup({ caseData }: { caseData: UFOCase }) {
  const cred: any = { A: 'text-cyan-400 border-cyan-400/40', B: 'text-blue-400 border-blue-400/40', C: 'text-purple-400 border-purple-400/40' };
  const credLabel: any = { A: 'Evidencia Alta', B: 'Evidencia Media', C: 'Testimonial' };
  return (
    <div className="w-72 p-1">
      <div className="bg-aurora-charcoal rounded-lg border border-white/10 p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-white text-base">{caseData.title}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${cred[caseData.credibility]}`}>{credLabel[caseData.credibility]}</span>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-aurora-cyan" />{caseData.date.split('-')[0]}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-aurora-cyan" />{caseData.country}</span>
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-aurora-cyan" />{caseData.type}</span>
        </div>
        <p className="text-xs text-gray-300 line-clamp-4">{caseData.description}</p>
      </div>
    </div>
  );
}