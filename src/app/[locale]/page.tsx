import { unstable_setRequestLocale } from "next-intl/server";
import HomePage from "../ui/pages/Home";
import { locales } from "@/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default function Page({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  return <HomePage locale={locale as any} />
}