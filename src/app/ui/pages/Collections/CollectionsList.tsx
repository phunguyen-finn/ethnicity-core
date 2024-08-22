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
import CollectionService, { Collection, LANGUAGE } from "@/services/collection.service";

interface CollectionsListProps {
    initCollections: Collection[];
    locale: LANGUAGE;
    initCursor?: Timestamp;
    initHasMore: boolean;
}

export function CollectionsList({ initCollections, locale, initCursor, initHasMore }: CollectionsListProps) {
    const t = useTranslations('collections');
    const [collections, setCollections] = useState(initCollections);
    const [cursor, setCursor] = useState<undefined | Timestamp>(initCursor);
    const [hasMore, setHasMore] = useState(initHasMore);

    const handleLoadMore = async () => {
        const [newCollections, newCursor, newHasMore] = await CollectionService.getCollectionsByLanguage(locale, cursor);
        setCollections([...collections, ...newCollections]);
        setCursor(newCursor);
        setHasMore(newHasMore);
    }

    return <>
        {
            collections.length == 0 && <Result
                icon={<SmileOutlined />}
                title={t('noItems')}
            />
        }
        {
            collections.length > 0 && <div id="scrollableDiv" className="w-full no-scrollbar">
                <InfiniteScroll
                    dataLength={collections.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={<h4>{t('loading')}</h4>}
                    endMessage={<Divider plain>{t('noMoreCollections')}</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className="w-full grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mt-5 sm:gap-2 gap-2">
                        {
                            collections.map((collection) => (
                                <Link href={`/collections/${collection.id}`} key={collection.id} className="col-span-1 aspect-square flex flex-col items-center justify-center relative">
                                    <div className="w-full h-full">
                                        <Image
                                            src={collection.thumbnailUrl}
                                            alt={collection.name}
                                            width={300}
                                            height={300}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                    </div>
                                    <span className="overflow-hidden text-ellipsis w-full max-w-full max-h-[50px] line-clamp-1 text-center mt-2 text-sm">{collection.name}</span>
                                </Link>
                            ))
                        }
                    </div>
                </InfiniteScroll>
            </div>
        }
    </>
}