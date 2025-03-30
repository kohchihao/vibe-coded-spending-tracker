'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePrivacy } from '@/contexts/privacy-context';
import { Eye, EyeOff } from 'lucide-react';

export function PrivacyToggle() {
  const { privacyMode, togglePrivacyMode, isLoading } = usePrivacy();

  // Don't render anything while loading
  if (isLoading) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePrivacyMode}
            aria-label={privacyMode ? 'Show amounts' : 'Hide amounts'}
          >
            {privacyMode ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{privacyMode ? 'Show amounts' : 'Hide amounts'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
