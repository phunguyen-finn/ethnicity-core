'use client'

import Drawer from 'antd/es/drawer';
import Menu from "antd/es/menu";
import Switch from 'antd/es/switch';
import { Link, usePathname, useRouter } from "@/app/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const items = [
    {
        key: 'home',
        to: '/',
    },
    {
        key: 'library',
        to: '/library',
    },
    {
        key: 'discover',
        to: '/posts',
    },
    {
        key: 'store',
        to: '/products',
    },
    {
        key: 'contact',
        to: '/contact'
    }
]

const Burger = (props: any) => {
    return <svg width="30px" height="30px" viewBox="0 0 12 12" enableBackground="new 0 0 12 12" version="1.1" {...props}>
        <g>
            <rect fill="#1D1D1B" height="1" width="11" x="0.5" y="5.5" />
            <rect fill="#1D1D1B" height="1" width="11" x="0.5" y="2.5" />
            <rect fill="#1D1D1B" height="1" width="11" x="0.5" y="8.5" />
        </g>
    </svg>
};

export default function NavigationMenu({ color, locale, background }: { color: 'black' | 'white', locale: 'vi' | 'en', background?: boolean }) {
    const t = useTranslations("navigation");
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const onChangeLanguage = (checked: boolean) => {
        const locale = checked ? 'vi' : 'en';
        router.replace(pathname, { locale: locale });
    }

    return <div
        className={
            clsx("flex flex-row w-screen h-24 sm:h-24 justify-between px-6 sm:px-12 font-medium text-lg fixed top-0 left-0 z-10 max-w-[1920px] m-auto left-[50%] -translate-x-1/2",
                (background && color == 'white') ? 'bg-gradient-to-b from-slate-400 to-transparent' : null
            )}>
        <>
            <Image
                src="/logo.svg"
                width={200}
                height={76}
                alt='Ethnicity Vietnam logo'
                style={{ filter: `brightness(${color == 'black' ? '100%' : '1000%'})` }}
                className="hidden lg:block transition-all duration-1000"
            />
            <div className={clsx("justify-between lg:w-8/12 xl:w-1/2 items-center hidden lg:flex lg:flex-row transition-all duration-1000", color === 'black' ? 'text-black' : 'text-white')}>
                {items.map(({ key, to }) => <Link key={key} href={to} className='hover:text-blue-500'>{t(key)}</Link>)}
                <Switch checkedChildren="VI" unCheckedChildren="EN" onChange={onChangeLanguage} defaultValue={locale == 'vi'} />
            </div>
        </>

        <>
            <Image className="block lg:hidden transition-all duration-1000" src="/logo.svg" width={130} height={50} alt='Ethnicity Vietnam logo' style={{ filter: `brightness(${color == 'black' ? '100%' : '1000%'})` }} />
            <div className="flex flex-row justify-end w-1/2 items-center block lg:hidden transition-all duration-1000" style={{ filter: `brightness(${color == 'black' ? '0' : '1000%'})` }} >
                <Burger onClick={showDrawer} className="cursor-pointer" />
            </div>
            <Drawer onClose={onClose} open={open} width={200} styles={{ body: { padding: 0 } }}>
                <Menu>
                    {items.map(({ key, to }) => <Menu.Item key={key}><Link href={to}>{t(key)}</Link></Menu.Item>)}
                    <Menu.Item><Switch className="ml-5" checkedChildren="VI" unCheckedChildren="EN" onChange={onChangeLanguage} defaultValue={locale == 'vi'} /></Menu.Item>
                </Menu>
            </Drawer>
        </>
    </div>;
}