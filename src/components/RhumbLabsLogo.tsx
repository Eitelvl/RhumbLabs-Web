import { SafeImage } from './SafeImage';

interface Props {
  className?: string;
  showText?: boolean;
}

export default function RhumbLabsLogo({ className = '', showText = true }: Props) {
  return (
    <SafeImage
      src={showText ? '/images/rhumb-labs-wordmark-2026.png' : '/images/rhumb-labs-mark-2026.png'}
      alt="Rhumb Labs"
      className={className}
    />
  );
}
