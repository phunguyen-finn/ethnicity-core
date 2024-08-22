import PostService from "@/services/post.service";
import PostsPage from "@/app/ui/pages/Posts/PostsPage";

export const Posts: React.FC = async ({ params: { locale } }: any) => {
    const [initPosts, initCursor, initHasMore] = await PostService.getPostsByLang(locale);

    return <PostsPage
        initPosts={initPosts}
        initCursor={initCursor}
        initHasMore={initHasMore}
        lang={locale}
    />;
};

export default Posts;
