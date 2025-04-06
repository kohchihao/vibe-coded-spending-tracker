import DynamicIcon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

type Props = {
  color?: string | null;
  icon?: string | null;
};

const CategoryIcon = ({ color = 'gray', icon = 'sparkles' }: Props) => {
  return (
    <div
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full ',
        color ? `bg-${color}-900` : '',
        ''
      )}
    >
      <DynamicIcon
        name={(icon as any) ?? 'sparkles'}
        className={cn('h-5 w-5 ', color ? `text-${color}-500` : '')}
      />
    </div>
  );
};

export default CategoryIcon;
