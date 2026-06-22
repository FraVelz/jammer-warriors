import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-4 py-8">
      {children}
    </div>
  );
}
