import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CompanyLogoProps {
  name: string;
  logo: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6 text-[10px]',
  md: 'h-8 w-8 text-xs',
  lg: 'h-16 w-16 text-xl',
};

function getInitials(name: string) {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

// Generate a consistent hue from the company name
function nameToHue(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function CompanyLogo({ name, logo, size = 'md', className }: CompanyLogoProps) {
  const [failed, setFailed] = useState(false);
  const initials = getInitials(name);
  const hue = nameToHue(name);

  if (failed || !logo) {
    return (
      <div
        className={cn(
          'rounded-lg flex items-center justify-center font-semibold shrink-0',
          sizeClasses[size],
          className
        )}
        style={{
          backgroundColor: `hsl(${hue}, 40%, 25%)`,
          color: `hsl(${hue}, 60%, 75%)`,
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      className={cn('rounded-lg bg-secondary object-contain shrink-0', sizeClasses[size], className)}
      onError={() => setFailed(true)}
    />
  );
}
