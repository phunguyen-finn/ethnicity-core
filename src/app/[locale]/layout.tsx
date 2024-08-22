import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from "next";
import "@/app/globals.css";
import { getMessages, getTranslations } from "next-intl/server";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales } from "@/config";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations('home');

  return {
    title: params.locale == 'en' ? "Ethnicity Vietnam" : "Ethnicity Việt Nam",
    description: t('recognition.body'),
    robots: 'index, follow',
    openGraph: {
      title: "Ethnicity Vietnam",
      description: t('recognition.body'),
      images: ['logo.svg']
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <AntdRegistry>
          <body className={inter.className} style={{ overflowX: 'hidden' }}>
            {children}
          </body>
        </AntdRegistry>
      </NextIntlClientProvider>
    </html>
  );
}
