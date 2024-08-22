import PostService from "@/services/post.service";
import { redirect } from "@/app/navigation";
import PostPage from "@/app/ui/pages/Posts/PostPage";
import sanitizeHtml from 'sanitize-html';
import { Timestamp } from "firebase/firestore/lite";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata(
    { params }: any
): Promise<any> {
    const post = await PostService.getPost(params.postId);

    if (!post) {
        return {
            title: '404',
        }
    }

    return {
        title: post!.title,
        description: post!.description,
        robots: 'index, follow',
        openGraph: {
            title: post!.title,
            description: post!.description,
            images: [post!.thumbnailUrl],
            type: 'article',
            locale: post!.language,
            publishedTime: post!.createdAt.toISOString(),
            modifiedTime: post!.updatedAt.toISOString(),
        },
    }
}

export default async function Post({ params: { locale, postId } }: any) {
    unstable_setRequestLocale(locale);
    const post = await PostService.getPost(postId);
    if (!post || post.language !== locale)
        redirect('/');

    let [morePosts, _] = await PostService.getPostsByLang(locale, Timestamp.fromDate(post!.createdAt));

    if (morePosts.length == 0) {
        [morePosts, _] = await PostService.getPostsByLang(locale);
    }

    return <PostPage post={{
        ...post, content: sanitizeHtml(post!.content, {
            allowedTags: false,
            allowedAttributes: false,
            exclusiveFilter: (frame) => {
                return frame.tag == 'script';
            }
        })
    } as any}
        morePosts={morePosts.slice(0, 3)}
    />
};
