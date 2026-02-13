import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className }) => {
  // Access the icon from the namespace object
  const LucideIcon = (LucideIcons as any)[name];
  
  // Safe fallback if the icon name doesn't exist in the library
  // Note: Lucide v0.3+ renamed HelpCircle to CircleHelp
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    const Fallback = (LucideIcons as any)['CircleHelp'] || (LucideIcons as any)['HelpCircle'] || (LucideIcons as any)['AlertCircle'];
    
    if (Fallback) {
      return <Fallback size={size} className={className} />;
    }
    // Ultimate fallback if even the fallbacks fail
    return <div style={{ width: size, height: size, background: '#ccc', borderRadius: '50%' }} title="Icon Missing" />;
  }

  return <LucideIcon size={size} className={className} />;
};