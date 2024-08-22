import PostService from "@/services/post.service";
import PostsPage from "@/app/ui/pages/Posts/PostsPage";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Posts({ params: { locale } }: any) {
    unstable_setRequestLocale(locale);
    const [initPosts, initCursor, initHasMore] = await PostService.getPostsByLang(locale);

    return <PostsPage
        initPosts={initPosts}
        initCursor={initCursor}
        initHasMore={initHasMore}
        lang={locale}
    />;
};