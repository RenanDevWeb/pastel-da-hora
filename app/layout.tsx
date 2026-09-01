import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Pastel da Hora",
    default: "Pastel da Hora",
  },
  description: "Cardápio digital do Pastel da Hora — fresquinho e crocante.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // getLocale() lê o locale definido pelo proxy (next-intl) no contexto do request
  const locale = await getLocale();

  return (
    // suppressHydrationWarning evita mismatch do next-themes ao aplicar classe de tema
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
