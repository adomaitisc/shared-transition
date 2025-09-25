export function Badge({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <div className="bg-white/10 rounded-full px-3 py-1.5 text-sm font-medium text-white/90">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </div>
  );
}
