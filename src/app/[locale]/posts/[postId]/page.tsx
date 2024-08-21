import PostService from "@/services/post.service";
import { redirect } from "@/app/navigation";
import PostPage from "@/app/ui/pages/Posts/PostPage";
import sanitizeHtml from 'sanitize-html';
import { Timestamp } from "firebase/firestore/lite";

export const Post: React.FC = async ({ params: { locale, postId } }: any) => {
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

export default Post;
