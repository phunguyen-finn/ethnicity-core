'use client'

import useMediaQuery from "@/app/hooks/useMediaQuery";
import Drawer from 'antd/es/drawer';
import Menu from "antd/es/menu";
import Switch from 'antd/es/switch';
import { Link, usePathname, useRouter } from "@/app/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Suspense, useState } from "react";
import { default as AbsoluteLink } from "next/link";

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

export default function NavigationMenu({ color, locale }: { color: 'black' | 'white', locale: 'vi' | 'en' }) {
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

    return <div className="flex flex-row w-screen h-12 md:h-24 justify-between px-6 sm:px-12 font-medium text-lg fixed top-0 left-0">
        <>
            <Image
                src="./logo.svg"
                width={200}
                height={76}
                alt='Ethnicity Vietnam logo'
                style={{ filter: `brightness(${color == 'black' ? '0' : '1000%'})` }}
                className="hidden xl:block"
            />
            <div className={clsx("justify-between w-1/2 items-center hidden xl:flex xl:flex-row", color === 'black' ? 'text-black' : 'text-white')}>
                {items.map(({ key, to }) => <Link key={key} href={to}>{t(key)}</Link>)}
                <Switch checkedChildren="VI" unCheckedChildren="EN" onChange={onChangeLanguage} defaultValue={locale == 'vi'} />
            </div>
        </>

        <>
            <Image className="block xl:hidden" src="./logo.svg" width={130} height={50} alt='Ethnicity Vietnam logo' style={{ filter: `brightness(${color == 'black' ? '0' : '1000%'})` }} />
            <div className="flex flex-row justify-end w-1/2 items-center block xl:hidden" style={{ filter: `brightness(${color == 'black' ? '0' : '1000%'})` }} >
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