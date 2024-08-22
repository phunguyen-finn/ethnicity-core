
'use client';

import Divider from 'antd/es/divider';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Product } from '@/services/product.service';

export default function ProductPage({ product }: { product: Product }) {
    const t = useTranslations();

    return <><div className='flex flex-col h-full sm:grid sm:grid-cols-3 items-left w-full py-6 gap-x-4'>
        <div className='sm:col-span-1'>
            <Image src={product.hdUrl} alt={product.name} width={800} height={800} style={{
                width: '100%',
                height: 'auto',
            }} />
        </div>
        <div className='sm:col-span-2 flex flex-col break-all'>
            <h1 className='mt-3 font-bold '>{product.name}</h1>
            <p className='text-gray-600'>{t('products.createdAt')} {product.createdAt.toLocaleDateString()}</p>
            <Divider style={{ margin: '10px 0px' }} />
            <div className='flex w-full'><p>{product.description}</p></div>
            <a target='_blank' href={product.purchaseUrl}>
                <button className='mt-5 p-2 w-full bg-red-600 text-white rounded-lg hover:bg-red-400 sm:w-[150px]'>{t('products.purchase')}</button>
            </a>
        </div>
    </div>
    </>
}