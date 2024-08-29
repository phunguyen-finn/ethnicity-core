import { collection, doc, getDoc, getDocs, where, orderBy, query, startAfter, limit, Timestamp } from "firebase/firestore/lite";
import { Db } from "@/services/firebase";

const MAX_POSTS = 5;

export enum POST_CATEGORY {
    MEDIA = 'media',
    SERVICE = 'service',
    PROJECT = 'project',
    DISCOVER = 'discover',
    UPDATE = 'update',
}

export enum POST_STATUS {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived',
}

export enum LANGUAGE {
    VI = 'vi',
    EN = 'en',
}

export interface Post {
    id: string;
    title: string
    description: string
    content: string
    thumbnailUrl: string;
    createdAt: Date;
    updatedAt: Date;
    category: POST_CATEGORY;
    status: POST_STATUS;
    createdBy: string;
    language: LANGUAGE;
}

export const PostService = {
    getPostsByStatus: async (status: POST_STATUS, cursor?: Timestamp): Promise<[Post[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "posts"),
            where("status", "==", status),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_POSTS));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        const hasMore = posts.length === MAX_POSTS;
        if (posts.length === 0) return [[], undefined, false];
        return [posts, posts[posts.length - 1].createdAt, hasMore];
    },
    getPostsByCategoryAndLang: async (category: POST_CATEGORY, lang: LANGUAGE): Promise<Post[]> => {
        const q = query(collection(Db, "posts"),
            where("category", "==", category),
            where("status", "==", POST_STATUS.PUBLISHED),
            where("language", "==", lang),
            orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        return posts;
    },
    getPostsByLang: async (lang: LANGUAGE, cursor?: Timestamp): Promise<[Post[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "posts"),
            where("language", "==", lang),
            where("status", "==", POST_STATUS.PUBLISHED),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_POSTS));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        const hasMore = posts.length === MAX_POSTS;
        if (posts.length === 0) return [[], undefined, false];
        return [posts, posts[posts.length - 1].createdAt, hasMore];
    },
    getPost: async (id: string): Promise<Post | null> => {
        const post = await getDoc(doc(Db, "posts", id));
        if (!post.exists()) return Promise.resolve(null);
        return { id: post.id, ...post.data(), createdAt: post.data().createdAt.toDate(), updatedAt: post.data().updatedAt.toDate() } as any;
    },
};

export default PostService;