import { Link } from "@/app/navigation";
import { ProductsList } from "@/app/ui/pages/Products/ProductsList";
import ProductService from "@/services/product.service";
import { Breadcrumb } from "antd";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export default async function Patterns({ params: { locale } }: Readonly<{
    params: { locale: 'vi' | 'en' }
}>) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('breadcrumbs');
    const [initProducts, initCursor, initHasMore] = await ProductService.getProductsByLanguage(locale as any);
    return <div
        style={{ minHeight: 'max(800px, 100vh)' }}
        className='w-screen overflow-y-auto flex flex-col items-center relative max-w-[1920px] m-auto pt-[100px] pb-[5px] bg-white'>
        <div className="w-11/12 xl:w-8/12 flex flex-col relative">
            <Breadcrumb items={
                [
                    { title: <Link href="/">{t('home')}</Link> },
                    { title: t('products') }
                ]
            } />
            <ProductsList initProducts={initProducts} locale={locale as any} initCursor={initCursor} initHasMore={initHasMore} />
        </div>
    </div>
}