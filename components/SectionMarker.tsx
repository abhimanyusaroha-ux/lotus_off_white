interface SectionMarkerProps {
  label: string;
}

export function SectionMarker({ label }: SectionMarkerProps) {
  return (
    <div className="space-y-2">
      <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-gray-600">
        {label}
      </p>
    </div>
  );
}
