import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface AlertBannerProps {
  message: string;
  type?: 'emergency' | 'info';
  onClose?: () => void;
}

export function AlertBanner({ message, type = 'info', onClose }: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const isEmergency = type === 'emergency';

  return (
    <div
      className={`${
        isEmergency ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
      } px-4 py-3`}
      role="alert"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Close alert"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
