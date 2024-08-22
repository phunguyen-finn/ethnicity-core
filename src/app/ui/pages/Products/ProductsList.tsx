'use client';

import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Timestamp } from "firebase/firestore/lite";
import Image from "next/image";
import Divider from "antd/es/divider";
import { SmileOutlined } from "@ant-design/icons";
import Result from "antd/es/result";
import { Link } from "@/app/navigation";
import Badge from "antd/es/badge";
import ProductService, { LANGUAGE, Product } from "@/services/product.service";


interface ProductsListProps {
    initProducts: Product[];
    locale: LANGUAGE;
    initCursor?: Timestamp;
    initHasMore: boolean;
}

export function ProductsList({ initProducts, locale, initCursor, initHasMore }: ProductsListProps) {
    const t = useTranslations('products');
    const [products, setProducts] = useState(initProducts);
    const [cursor, setCursor] = useState<undefined | Timestamp>(initCursor);
    const [hasMore, setHasMore] = useState(initHasMore);

    const handleLoadMore = async () => {
        const [newproducts, newCursor, newHasMore] = await ProductService.getProductsByLanguage(locale, cursor);
        setProducts([...products, ...newproducts]);
        setCursor(newCursor);
        setHasMore(newHasMore);
    }

    return <>
        {
            products.length == 0 && <Result
                icon={<SmileOutlined />}
                title={t('noItems')}
            />
        }
        {
            products.length > 0 && <div id="scrollableDiv" className="w-full no-scrollbar">
                <InfiniteScroll
                    dataLength={products.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={<h4>{t('loading')}</h4>}
                    endMessage={<Divider plain>{t('noMoreProducts')}</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className="w-full grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mt-5 sm:gap-2 gap-2">
                        {
                            products.map((product) => (
                                <Link href={`/products/${product.id}`} key={product.id} className="group col-span-1 aspect-square flex flex-col items-center justify-center relative">
                                    <div className="w-full h-full">
                                        <Image
                                            src={product.thumbnailUrl}
                                            alt={product.name}
                                            width={300}
                                            height={300}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                    </div>
                                    <span className="group-hover:text-blue-500 overflow-hidden text-ellipsis w-full max-w-full max-h-[50px] line-clamp-1 text-center mt-2 text-sm">{product.name}</span>
                                </Link>
                            ))
                        }
                    </div>
                </InfiniteScroll>
            </div>
        }
    </>
}