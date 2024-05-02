import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import Header from "./Header";
import "./globals.css";
import { Providers } from "./providers";
import AIBox from "./AIBox";

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
        <Providers>
          <Header />
          <main className="bg-[#caf0f8]/60 px-40 py-32 min-h-[100vh]">
            {children}
          </main>
          <Toaster />
          <AIBox />
        </Providers>
      </body>
    </html>
  );
}
