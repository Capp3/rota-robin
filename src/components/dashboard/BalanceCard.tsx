import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BalanceCardProps {
  title: string;
  hours: number;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'accent';
}

export const BalanceCard = ({ title, hours, icon: Icon, variant = 'default' }: BalanceCardProps) => {
  const days = (hours / 8).toFixed(1);

  const variantStyles = {
    default: 'border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10',
    success: 'border-success/20 bg-gradient-to-br from-success/5 to-success/10',
    warning: 'border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10',
    accent: 'border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10',
  };

  const iconStyles = {
    default: 'text-primary bg-primary/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    accent: 'text-accent bg-accent/10',
  };

  return (
    <Card className={cn('transition-all duration-300 hover:shadow-elevated', variantStyles[variant])}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn('rounded-full p-2', iconStyles[variant])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-foreground">{hours}h</div>
          <p className="text-xs text-muted-foreground">{days} days</p>
        </div>
      </CardContent>
    </Card>
  );
};
