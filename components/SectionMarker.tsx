interface SectionMarkerProps {
  number: string;
  label: string;
}

export function SectionMarker({ number, label }: SectionMarkerProps) {
  return (
    <div className="space-y-2">
      <p className="font-serif font-light italic text-[24px] leading-none text-ink">
        — {number}
      </p>
      <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-gray-600">
        {label}
      </p>
    </div>
  );
}
