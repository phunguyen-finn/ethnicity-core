
'use client';

import Divider from 'antd/es/divider';
import Badge from 'antd/es/badge';
import { Pattern } from "@/services/pattern.service";
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { patternCategoryToColorMap } from './const';


export default function PatternPage({ pattern }: { pattern: Pattern }) {
    const t = useTranslations('patterns');

    return <><div className='flex flex-col h-full sm:grid sm:grid-cols-3 items-left w-full py-6 gap-x-4'>
        <div className='sm:col-span-1'>
            <Badge.Ribbon text={t(pattern.category)} color={patternCategoryToColorMap[pattern.category]}>
                <Image src={pattern.hdUrl} alt={pattern.name} width={800} height={800} style={{
                    width: '100%',
                    height: 'auto',
                }} />
            </Badge.Ribbon>
        </div>
        <div className='sm:col-span-2 flex flex-col break-all'>
            <h1 className='mt-3 font-bold '>{pattern.name}</h1>
            <p className='text-gray-600'>{t('createdAt')} {pattern.createdAt.toLocaleDateString()}</p>
            <Divider style={{ margin: '10px 0px' }} />
            <div className='flex w-full'><p>{pattern.description}</p></div>
            <a target='_blank' href={pattern.fileUrl}>
                <button className='mt-5 p-2 w-full bg-red-600 text-white rounded-lg hover:bg-red-400 sm:w-[150px]'>{t('download')}</button>
            </a>
        </div>
    </div>
    </>
}