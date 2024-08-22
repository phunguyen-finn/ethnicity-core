'use client';

import Segmented from "antd/es/segmented"
import PatternService, { LANGUAGE, Pattern, PATTERN_CATEGORY } from "@/services/pattern.service";
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
import { patternCategoryToColorMap } from "./const";


interface PatternsListProps {
    initPatterns: Pattern[];
    locale: LANGUAGE;
    initCursor?: Timestamp;
    initHasMore: boolean;
}

export function PatternsList({ initPatterns, locale, initCursor, initHasMore }: PatternsListProps) {
    const t = useTranslations('patterns');
    const [category, setCategory] = useState<PATTERN_CATEGORY | 'all'>('all');
    const [patterns, setPatterns] = useState(initPatterns);
    const [cursor, setCursor] = useState<undefined | Timestamp>(initCursor);
    const [hasMore, setHasMore] = useState(initHasMore);

    const options: any = [{
        label: t('all') as any,
        value: "all"
    }, {
        label: t('preserve'),
        value: PATTERN_CATEGORY.PRESERVE
    }, {
        label: t('develop'),
        value: PATTERN_CATEGORY.DEVELOP
    }, {
        label: t('apply'),
        value: PATTERN_CATEGORY.APPLY
    }, {
        label: t('illustrate'),
        value: PATTERN_CATEGORY.ILLUSTRATION
    }];

    const handleCategoryChange = async (category: PATTERN_CATEGORY | 'all') => {
        setCategory(category);
        if (category === 'all') {
            const [newPatterns, newCursor, newHasMore] = await PatternService.getPatternsByLanguage(locale);
            setPatterns(newPatterns);
            setCursor(newCursor);
            setHasMore(newHasMore);
        } else {
            const [newPatterns, newCursor, newHasMore] = await PatternService.getPatternsByCategoryAndLanguage(category, locale);
            setPatterns(newPatterns);
            setCursor(newCursor);
            setHasMore(newHasMore);
        }
    }

    const handleLoadMore = async () => {
        const [newPatterns, newCursor, newHasMore] = await PatternService.getPatternsByCategoryAndLanguage(category as any, locale, cursor);
        setPatterns([...patterns, ...newPatterns]);
        setCursor(newCursor);
        setHasMore(newHasMore);
    }

    return <>
        <Segmented
            className="w-full"
            options={options}
            block
            defaultValue="all"
            onChange={handleCategoryChange}
        />
        {
            patterns.length == 0 && <Result
                icon={<SmileOutlined />}
                title={t('noItems')}
            />
        }
        {
            patterns.length > 0 && <div id="scrollableDiv" className="w-full">
                <InfiniteScroll
                    dataLength={patterns.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={<h4>{t('loading')}</h4>}
                    endMessage={<Divider plain>{t('noMorePatterns')}</Divider>}

                    scrollableTarget="scrollableDiv"
                >
                    <div className="w-full grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mt-5 sm:gap-2 gap-2">
                        {
                            patterns.map((pattern) => (
                                <Link href={`/patterns/${pattern.id}`} key={pattern.id} className="col-span-1 aspect-square flex flex-col items-center justify-center relative">
                                    <Badge.Ribbon text={t(pattern.category)} color={patternCategoryToColorMap[pattern.category]}>
                                        <div className="w-full h-full">
                                            <Image
                                                src={pattern.thumbnailUrl}
                                                alt={pattern.name}
                                                width={300}
                                                height={300}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                        </div>
                                    </Badge.Ribbon>
                                    <span className="overflow-hidden text-ellipsis w-full max-w-full max-h-[50px] line-clamp-1 text-center mt-2 text-sm">{pattern.name}</span>
                                </Link>
                            ))
                        }
                    </div>
                </InfiniteScroll>
            </div>
        }
    </>
}