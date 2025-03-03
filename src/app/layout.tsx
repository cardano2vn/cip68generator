import type { Metadata } from "next";
import { Lexend as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/utils";
import { PropsWithChildren } from "react";
import { siteMetadata } from "@/constants/site-metadata";
import AppProviders from "@/components/providers";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: { default: siteMetadata.title, template: `%s | ${siteMetadata.title}` },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "./", types: { "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml` } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  twitter: { title: siteMetadata.title, card: "summary_large_image", images: [siteMetadata.socialBanner] },
};
const fontSans = FontSans({ subsets: ["latin"], weight: ["400", "500", "700"] });

const RootLayout = async function ({ children }: Readonly<PropsWithChildren>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="76x76" href={`/images/common/logo.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`/images/common/logo.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`/images/common/logo.png`} />
      <link rel="manifest" href={`/favicons/site.webmanifest`} />
      <link rel="mask-icon" href={`/images/common/logo.png`} color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <body className={cn(fontSans.className)}>
        <AppProviders session={session}>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
