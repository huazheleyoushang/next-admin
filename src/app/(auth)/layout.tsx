import { InteractiveGridPattern } from '@/features/auth/interactive-grid';
import { cn } from '@/lib/utils';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex min-h-screen w-full'>
      {/* Left brand column — hidden on mobile */}
      <div
        className={cn(
          'relative hidden w-1/2 flex-col overflow-hidden border-r lg:flex lg:min-h-0 lg:grow',
          'bg-[oklch(0.98_0.005_60)] dark:bg-[oklch(0.97_0.01_65)]'
        )}
      >
        {/* Interactive grid pattern — fills entire left panel */}
        <div className='absolute inset-0'>
          <InteractiveGridPattern
            className={cn(
              'mask-[radial-gradient(400px_circle_at_center,white,transparent)]',
              'h-full w-full skew-y-12 opacity-40'
            )}
          />
        </div>

        {/* Logo — top left */}
        <div className='relative z-20 flex items-center gap-2 p-6 text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          Logo
        </div>
      </div>

      {/* Right form column */}
      <div className='flex w-full flex-col items-center justify-center gap-6 p-6 lg:w-1/2 lg:p-10'>
        {children}
      </div>
    </div>
  );
}
