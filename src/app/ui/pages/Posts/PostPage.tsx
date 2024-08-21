'use client';

import { Link } from "@/app/navigation";
import { Post } from "@/services/post.service";
import Divider from "antd/es/divider";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function PostPage({ post, morePosts }: { post: Post, morePosts: Post[] }) {
    const t = useTranslations('posts');
    return <div className="w-screen max-w-[1920px] m-auto h-screen overflow-y-auto bg-white pt-[90px] flex flex-col items-center">
        <div className="w-11/12 md:w-8/12 lg:w-[700px]">
            <h1 className="text-xl md:text-4xl text-black font-bold">{post.title}</h1>
            <p className="text-sm md:text-sm text-black text-gray-600">{t("createdAt")} {post.createdAt.toLocaleDateString()}</p>

            <p className="text-sm md:text-sm text-black text-gray-600 italic mb-5 mt-2">{post.description}</p>
            <Divider />
            <div className="mb-5" dangerouslySetInnerHTML={{ __html: post.content }} />
            <Divider />
            <h1 className="text-xl md:text-4xl text-black font-bold mb-10" >{t('more')}</h1>
            {
                morePosts.map((post, index) => (
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
                        {index !== morePosts.length - 1 && <Divider className="w-full m-0" key={post.id} />}
                    </React.Fragment>
                ))
            }
            <div className="mt-10" />
            <Link href="/contact" className="bg-red-600 h-[32px] md:h-[40px] w-full flex flex-col items-center justify-center">
                <span className="text-white text-xs md:text-lg">{t('contact')}</span>
            </Link>
        </div>
    </div>
}
