import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "@/app/globals.css";
import { getMessages, getTranslations } from "next-intl/server";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { unstable_setRequestLocale } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: any): Promise<any> {
  const t = await getTranslations('home');

  return {
    title: params.locale == 'en' ? "Ethnicity Vietnam" : "Ethnicity Việt Nam",
    description: t('recognition.body'),
    icon: '/capture.jpg',
    robots: 'index, follow',
    openGraph: {
      title: "Ethnicity Vietnam",
      description: t('recognition.body'),
      images: ['/capture.jpg']
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <AntdRegistry>
          <body className={inter.className} style={{ overflowX: 'hidden' }}>
            <NextTopLoader showSpinner={false} />
            {children}
          </body>
        </AntdRegistry>
      </NextIntlClientProvider>
    </html>
  );
}
