import type { Metadata } from "next";
// import { Inter } from 'next/font/google'
import { BaseTemplate } from "@/templates/BaseTemplate";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Home",
  description: "SCCS",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BaseTemplate>{children}</BaseTemplate>
      </body>
    </html>
  );
}
