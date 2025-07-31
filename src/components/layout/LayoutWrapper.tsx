import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function LayoutWrapper({ children, className }: Props) {
  return (
    <div
      className={cn('mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10', className)}
    >
      {children}
    </div>
  );
}
