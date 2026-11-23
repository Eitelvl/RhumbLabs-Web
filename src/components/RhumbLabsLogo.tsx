import { SafeImage } from './SafeImage';

interface Props {
  className?: string;
  showText?: boolean;
}

export default function RhumbLabsLogo({ className = '', showText = true }: Props) {
  return (
    <SafeImage
      src={showText ? '/images/rhumb-labs-logo.png' : '/images/rhumb-labs-card-icon.png'}
      alt="Rhumb Labs"
      className={className}
    />
  );
}
