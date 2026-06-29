import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export function SignInView() {
  return (
    <div className={cn('rounded-xl border bg-card text-card-foreground shadow-lg shadow-black/5')}>
      <div className='flex flex-col space-y-2 p-6 pb-3 pt-8 text-center'>
        <h1 className='text-xl font-semibold tracking-tight'>
          Sign in to Next Shadcn Dashboard
        </h1>
        <p className='text-sm text-muted-foreground'>
          Welcome back! Please sign in to continue.
        </p>
      </div>
      <div className='px-6 pb-3'>
        <Separator className='my-4' />
      </div>
    </div>
  );
}
