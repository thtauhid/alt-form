import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import Header from "./Header";
import "./globals.css";
import { Providers } from "./providers";

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
      <body className="">
        <Header />
        <Providers>
          <div className="bg-[#e0f0ea] px-40 py-32 min-h-[100vh]">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
