import { Stage } from '@/lib/types';
import { cn } from '@/lib/utils';

const stageStyles: Record<Stage, string> = {
  'Pre-Seed': 'bg-stage-preseed/15 text-stage-preseed border-stage-preseed/30',
  'Seed': 'bg-primary/15 text-primary border-primary/30',
  'Series A': 'bg-info/15 text-info border-info/30',
  'Series B': 'bg-warning/15 text-warning border-warning/30',
  'Series C+': 'bg-destructive/15 text-destructive border-destructive/30',
};

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border', stageStyles[stage])}>
      {stage}
    </span>
  );
}
