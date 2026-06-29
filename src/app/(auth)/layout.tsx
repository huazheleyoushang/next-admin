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
          'relative hidden h-full w-[40%] flex-col justify-between overflow-hidden border-r lg:flex',
          'bg-[oklch(0.98_0.005_60)] dark:bg-[oklch(0.97_0.01_65)]'
        )}
      >
        {/* Logo */}
        <div className='absolute top-4 left-4 z-20 flex items-center gap-2 text-lg font-medium'>
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

        {/* Interactive grid pattern */}
        <div className='absolute inset-0'>
          <InteractiveGridPattern
            className={cn(
              'mask-[radial-gradient(400px_circle_at_center,white,transparent)]',
              'inset-x-0 inset-y-[5%] h-[95%] skew-y-12 opacity-40'
            )}
          />
        </div>

        {/* Testimonial */}
        <div className='relative z-20 mb-8 ml-10'>
          <blockquote className='space-y-2'>
            <p className='text-sm/relaxed text-muted-foreground/80'>
              &ldquo;This starter template has saved me countless hours of work and helped me
              deliver projects to my clients faster than ever before.&rdquo;
            </p>
            <footer className='text-xs text-muted-foreground/60'>Random Dude</footer>
          </blockquote>
        </div>
      </div>

      {/* Right form column */}
      <div className='flex w-full flex-col lg:w-[60%]'>{children}</div>
    </div>
  );
}
