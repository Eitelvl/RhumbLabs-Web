import { SafeImage } from './SafeImage';

export function DeviceMockup({ imageSrc, alt }: {
  imageSrc: string;
  alt: string;
}) {
  return (
    <div className="phone-frame">
      <SafeImage src={imageSrc} alt={alt} width={738} height={1600} />
    </div>
  );
}
