import { Link, redirect } from "@/app/navigation";
import ProductPage from "@/app/ui/pages/Products/ProductPage";
import ProductService, { Product } from "@/services/product.service";
import { Breadcrumb } from "antd";
import { getTranslations } from "next-intl/server";

export default async function Page({ params: { productId } }: { params: { productId: string } }) {
    const product = await ProductService.getProduct(productId);
    const t = await getTranslations('breadcrumbs');

    if (!product) {
        redirect('/');
        return;
    }

    return <>
        <Breadcrumb items={
            [
                { title: <Link href="/">{t('home')}</Link> },
                { title: <Link href="/products">{t('products')}</Link> },
                { title: product.name }
            ]
        } />
        <ProductPage product={product as Product} />
    </>
}