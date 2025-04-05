import Link from "next/link";

interface BreadcrumbProps {
  paths: string[];
}

export default function Breadcrumb({ paths }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      {paths.map((path, index) => (
        <span key={index}>
          {index > 0 && " > "}
          {index === 0 ? <Link href="/">{path}</Link> : <span className="capitalize">{path}</span>}
        </span>
      ))}
    </nav>
  );
}
