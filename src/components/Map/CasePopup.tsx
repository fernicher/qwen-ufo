import { Calendar, MapPin, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { UFOCase } from '../../data/cases';
import { hynekMeta } from '../../data/hynek';
import { caseTypeMeta } from '../../data/caseTypes';

export default function CasePopup({ caseData }: { caseData: UFOCase }) {
  const cred: any = { A: 'text-cyan-400 border-cyan-400/40', B: 'text-blue-400 border-blue-400/40', C: 'text-purple-400 border-purple-400/40' };
  const credLabel: any = { A: 'Evidencia Alta', B: 'Evidencia Media', C: 'Testimonial' };
  const place = caseData.city
    ? [caseData.city, caseData.region, caseData.country].filter(Boolean).join(', ')
    : caseData.country;
  const hynek = caseData.hynek ? hynekMeta[caseData.hynek] : null;
  return (
    <div className="w-72 p-1">
      <div className="bg-aurora-charcoal rounded-lg border border-white/10 p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-white text-base">{caseData.title}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${cred[caseData.credibility]}`}>{credLabel[caseData.credibility]}</span>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-aurora-cyan" />{caseData.date.split('-')[0]}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-aurora-cyan" />{place}</span>
          <span className="flex items-center gap-1" style={{ color: caseTypeMeta[caseData.type].color }}><Shield className="w-3 h-3" />{caseTypeMeta[caseData.type].label}</span>
        </div>
        {hynek && (
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded border mb-3"
            style={{ color: hynek.color, borderColor: `${hynek.color}66`, background: `${hynek.color}1a` }}
            title={hynek.description}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: hynek.color }} />
            {hynek.label} · {hynek.name}
          </span>
        )}
        <p className="text-xs text-gray-300 line-clamp-4">{caseData.description}</p>
        <Link
          to={`/expedientes/${caseData.id}`}
          className="mt-3 flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-aurora-cyan/15 border border-aurora-cyan/40 text-aurora-cyan text-xs font-semibold hover:bg-aurora-cyan/25 transition-colors"
        >
          Ver expediente completo <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
