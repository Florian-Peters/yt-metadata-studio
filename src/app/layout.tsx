import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "yt-metadata-studio",
  description: "Generate reusable YouTube and social metadata for music and video creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
