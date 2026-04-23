import Link from "next/link";

interface TextButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function TextButton({ href, children, onClick }: TextButtonProps) {
  const classes =
    "inline-flex items-center gap-2 text-interactive underline underline-offset-2 decoration-[1px] hover:decoration-2 transition-all duration-150 body-sm font-sans";

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children} <span aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children} <span aria-hidden="true">→</span>
    </button>
  );
}
