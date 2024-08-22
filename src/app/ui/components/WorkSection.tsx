'use client';

import PostService, { Post, POST_CATEGORY } from "@/services/post.service";
import Drawer from "antd/es/drawer";
import Divider from "antd/es/divider";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { Link } from "@/app/navigation";
import { SmileOutlined } from "@ant-design/icons";
import Result from "antd/es/result"

export default function WorkSection({ handleWheel }: any) {
    const t = useTranslations('home.work');
    const [posts, setPosts] = useState<Post[]>([]);
    const [open, setOpen] = useState(false);

    const handleClick = (category: POST_CATEGORY) => {
        PostService.getPostsByCategory(category).then((posts) => {
            window.removeEventListener("wheel", handleWheel, true);
            setPosts(posts);
            setOpen(true);
        })
    }

    const handleClose = () => {
        setOpen(false);
        window.addEventListener("wheel", handleWheel, true);
    };

    return <div>
        <div className='relative h-screen w-screen flex flex-col justify-center items-center min-h-[600px] bg-white max-w-[1920px] m-auto'>
            <Image
                src="/images/work_background.svg"
                alt="Landing background"
                objectFit="cover"
                layout="fill"
                objectPosition="top left"
                className="absolute h-screen"
            />
            <Image
                src="/images/work_background.svg"
                alt="Landing background"
                objectFit="cover"
                layout="fill"
                objectPosition="bottom left"
                className="absolute h-screen"
            />
            <div className="h-10/12 relative w-11/12 sm:10/12 lg:w-7/12 flex flex-col justify-center items-center">
                <h1 className='text-black text-3xl sm:text-5xl leading-normal'>{t('title')}</h1>
                <Image
                    src="/images/work_decoration.png"
                    alt="Decoration"
                    width={1684}
                    height={318}
                    className="h-auto w-full md:w-full md:h-auto my-[20px] rounded-3xl"
                />
                <div className="w-full m-auto relative">
                    <div className="absolute w-full h-full t-0 flex flex-row justify-center z-10">
                        <div className="w-9/12 h-full flex flex-row justify-between">
                            <div
                                onClick={() => handleClick(POST_CATEGORY.PROJECT)}
                                className="group w-1/3 relative h-full flex flex-row items-center justify-center mr-2 cursor-pointer"
                            >
                                <Image
                                    src="/images/work_button.svg"
                                    objectFit="cover"
                                    layout="fill"
                                    alt="Projects"
                                    className="h-full w-auto grayscale group-hover:grayscale-0 group-hover:hue-rotate-[160deg] group-hover:saturate-[4]"
                                />
                                <p className="text-xs sm:text-sm lg:text-xl font-medium text-teal-400 z-10">{t('projects')}</p>
                            </div>
                            <div
                                onClick={() => handleClick(POST_CATEGORY.SERVICE)}
                                className="group w-1/3 relative h-full flex flex-row items-center justify-center mx-2 cursor-pointer"
                            >
                                <Image
                                    src="/images/work_button.svg"
                                    objectFit="cover"
                                    layout="fill"
                                    alt="Services"
                                    className="h-full w-auto grayscale group-hover:grayscale-0 group-hover:hue-rotate-[2deg] group-hover:saturate-[20]"
                                />
                                <p className="text-xs sm:text-sm lg:text-xl font-medium text-red-400 z-10">{t('services')}</p>
                            </div>
                            <div
                                onClick={() => handleClick(POST_CATEGORY.MEDIA)}
                                className="group w-1/3 relative h-full flex flex-row items-center justify-center text-center ml-2 cursor-pointer"
                            >
                                <Image
                                    src="/images/work_button.svg"
                                    objectFit="cover"
                                    layout="fill"
                                    alt="On Media"
                                    className="h-full w-auto grayscale group-hover:grayscale-0 group-hover:hue-rotate-[50deg] group-hover:saturate-[4.5] "
                                />
                                <p className="text-xs sm:text-sm lg:text-xl font-medium text-yellow-400 z-10">{t('media')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <Image
                            src="/images/work_button_decoration.svg"
                            width={1683}
                            height={229}
                            alt="Decoration"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
        <Drawer width="100vw" onClose={handleClose} open={open}>
            <div className="w-full max-w-[1920px] m-auto h-full overflow-y-auto no-scrollbar bg-white flex flex-col items-center">
                <div className="w-11/12 md:w-8/12 lg:w-[700px]">
                    {
                        posts.length === 0 && <Result
                            icon={<SmileOutlined />}
                            title={t('noPosts')}
                        />
                    }
                    {
                        posts.map((post, index) => (
                            <React.Fragment key={post.id}>
                                <Link href={`/posts/${post.id}`} className="group cursor-pointer w-full flex items-center h-[100px] sm:h-[130px] overflow-hidden text-ellipsis">
                                    <div className="w-[100px] min-w-[100px] sm:w-[130px] sm:min-w-[130px] h-full relative flex">
                                        <Image
                                            src={post.thumbnailUrl}
                                            alt={post.title}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-5">
                                        <h3 className="line-clamp-1 text-ellipsis font-bold max-h-[50px] text-xs sm:text-base group-hover:text-blue-500">{post.title}</h3>
                                        <p className="text-gray-400 text-xs sm:text-base">{t("createdAt")} {post.createdAt.toLocaleDateString()}</p>
                                        <p className="text-xs line-clamp-2 text-gray-600 max-w-full leading-none max-h-[50px] text-ellipsis overflow-hidden mt-5 sm:text-base">{post.description}</p>
                                    </div>
                                </Link>
                                {index !== posts.length - 1 && <Divider className="w-full m-0" key={post.id} />}
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
        </Drawer>
    </div>
}