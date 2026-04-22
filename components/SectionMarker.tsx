interface SectionMarkerProps {
  number: string;
  label: string;
}

export function SectionMarker({ number, label }: SectionMarkerProps) {
  return (
    <span className="caption font-sans text-gray-600 uppercase tracking-[0.06em]">
      ({number}) {label}
    </span>
  );
}
