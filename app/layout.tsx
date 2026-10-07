import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gokul Das KM | AI Content Creator",
  description:
    "AI content creator, AI video producer and AI UGC creator making advertising and social-first creative for global brands.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
