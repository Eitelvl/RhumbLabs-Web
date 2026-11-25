import { SafeImage } from './SafeImage';

type DeviceMockupProps = {
  type: 'tablet' | 'phone' | 'window';
  imageSrc: string;
  alt: string;
  loading?: 'eager' | 'lazy';
};

export function DeviceMockup({ type, imageSrc, alt, loading = 'eager' }: DeviceMockupProps) {
  return (
    <div className={`device-mockup device-mockup-${type}`}>
      <SafeImage src={imageSrc} alt={alt} loading={loading} />
    </div>
  );
}
