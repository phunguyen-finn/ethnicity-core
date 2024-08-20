import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from "next";
import "@/app/globals.css";
import { getMessages } from "next-intl/server";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavigationMenu from "../ui/common/NavigationMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethnicity Vietnam",
}
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <AntdRegistry>
          <body className={inter.className}>
            <NavigationMenu color="white" locale={locale as any} />
            {children}
          </body>
        </AntdRegistry>
      </NextIntlClientProvider>
    </html>
  );
}
