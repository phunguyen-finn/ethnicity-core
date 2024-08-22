import { collection, doc, getDoc, getDocs, orderBy, query, startAfter, limit, Timestamp, where } from "firebase/firestore/lite";
import { Db } from "@/services/firebase";

const MAX_COLLECTIONS = 9;

export enum LANGUAGE {
    VI = 'vi',
    EN = 'en',
}

export interface Collection {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    language: LANGUAGE;
}

export const CollectionService = {
    getCollections: async (cursor: Timestamp | undefined): Promise<[Collection[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "collections"),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_COLLECTIONS));
        const snapshot = await getDocs(q);
        const collections = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        const hasMore = collections.length === MAX_COLLECTIONS;
        if (collections.length === 0) return [[], undefined, false];
        return [collections, collections[collections.length - 1].createdAt, hasMore];
    },
    getCollectionsByLanguage: async (language: LANGUAGE, cursor?: Timestamp): Promise<[Collection[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "collections"),
            where("language", "==", language),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_COLLECTIONS));
        const snapshot = await getDocs(q);
        const collections = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        const hasMore = collections.length === MAX_COLLECTIONS;
        if (collections.length === 0) return [[], undefined, false];
        return [collections, collections[collections.length - 1].createdAt, hasMore];
    },
    getAllCollections: async (): Promise<Collection[]> => {
        const q = query(collection(Db, "collections"),
            orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const collections = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        return collections;
    },
    getCollection: async (id: string): Promise<Collection | null> => {
        const result = await getDoc(doc(Db, "collections", id));
        if (!result.exists()) return Promise.resolve(null);
        return { id: result.id, ...result.data(), createdAt: result.data().createdAt.toDate(), updatedAt: result.data().updatedAt.toDate() } as any;
    }
};

export default CollectionService; 