import * as React from 'react';
import Link from 'next/link';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  href?: string;
  className?: string;
};

export function Button({ asChild, href, children, className, ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
    "transition-colors border border-transparent focus:outline-none focus:ring-2 " +
    "focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  if (asChild && href) {
    return (
      <Link href={href} className={className ?? base}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className ?? base} {...props}>
      {children}
    </button>
  );
}