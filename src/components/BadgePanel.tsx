import { Award } from 'lucide-react';
import { badges } from '../data/badges';
import type { ProgressState } from '../types';

export function BadgePanel({ progress }: { progress: ProgressState }) {
  return (
    <section className="rounded-[2rem] bg-white/85 p-4 shadow-soft ring-1 ring-slate-200/70">
      <div className="mb-4 flex items-center gap-2">
        <Award className="h-5 w-5 text-amber-500" />
        <h2 className="text-lg font-black text-ink">我的徽章</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {badges.map((badge) => {
          const earned = progress.earnedBadges.includes(badge.id);
          return (
            <div key={badge.id} className={`rounded-3xl p-4 ring-1 ${earned ? 'bg-amber-50 ring-amber-200' : 'bg-slate-50 ring-slate-200 opacity-70'}`}>
              <div className="text-3xl">{badge.icon}</div>
              <h3 className="mt-2 font-black text-ink">{badge.title}</h3>
              <p className="text-sm text-slate-600">{badge.description}</p>
              <p className={`mt-2 text-xs font-black ${earned ? 'text-amber-600' : 'text-slate-400'}`}>{earned ? '已获得' : '继续努力'}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
