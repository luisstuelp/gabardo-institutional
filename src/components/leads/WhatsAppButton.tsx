import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import { formatWhatsAppLink } from '@/lib/format';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
  className?: string;
  variant?: 'default' | 'outline';
}

export function WhatsAppButton({ phone, message, className, variant = 'default' }: WhatsAppButtonProps) {
  const whatsappUrl = formatWhatsAppLink(phone, message);

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={cn("block", className)}>
      <Button
        variant={variant === 'outline' ? 'outline' : 'default'}
        className={cn(
          'w-full',
          variant === 'default' && 'bg-success hover:bg-success/90 text-success-foreground'
        )}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Falar no WhatsApp
      </Button>
    </a>
  );
}
