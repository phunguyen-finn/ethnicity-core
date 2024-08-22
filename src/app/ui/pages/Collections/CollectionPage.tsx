
'use client';

import Divider from 'antd/es/divider';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Collection } from '@/services/collection.service';
import { Pattern } from '@/services/pattern.service';
import { Link } from '@/app/navigation';
import { Badge } from 'antd';
import { patternCategoryToColorMap } from '../Patterns/const';

export default function CollectionPage({ collection, patterns }: { collection: Collection, patterns: Pattern[] }) {
    const t = useTranslations('collections');

    return <><div className='flex flex-col h-full sm:grid sm:grid-cols-3 items-left w-full py-6 gap-x-4'>
        <div className='sm:col-span-1'>
            <Image src={collection.thumbnailUrl} alt={collection.name} width={800} height={800} style={{
                width: '100%',
                height: 'auto',
            }} />
        </div>
        <div className='sm:col-span-2 flex flex-col break-all'>
            <h1 className='mt-3 font-bold '>{collection.name}</h1>
            <p className='text-gray-600'>{t('createdAt')} {collection.createdAt.toLocaleDateString()}</p>
            <Divider style={{ margin: '10px 0px' }} />
            <div className='flex w-full'><p>{collection.description}</p></div>
            <Divider style={{ margin: '10px 0px' }} />
            <h1 className='mt-3 font-bold '>{t('collectionsPatterns')}</h1>
            <div className="w-full grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mt-5 sm:gap-2 gap-2">
                {
                    patterns.map((pattern) => (
                        <Link href={`/patterns/${pattern.id}`} key={pattern.id} className="group col-span-1 aspect-square flex flex-col items-center justify-center relative">
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
                            <span className="group-hover:text-blue-500 overflow-hidden text-ellipsis w-full max-w-full max-h-[50px] line-clamp-1 text-center mt-2 text-sm">{pattern.name}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
    </div>
    </>
}