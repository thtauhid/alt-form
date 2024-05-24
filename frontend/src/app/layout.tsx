import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alt Form",
  description: "Create any form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="bg-[#caf0f8]/60 px-40 py-32 min-h-[100vh]">
          {children}
        </main>
      </body>
    </html>
  );
}
