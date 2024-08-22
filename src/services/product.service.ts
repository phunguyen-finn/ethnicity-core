import { collection, doc, getDoc, getDocs, orderBy, query, startAfter, limit, Timestamp } from "firebase/firestore/lite";
import { Db } from "@/services/firebase";

const MAX_PRODUCTS = 9;

export enum LANGUAGE {
    VI = 'vi',
    EN = 'en',
}

export interface Product {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    hdUrl: string;
    purchaseUrl: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    language: LANGUAGE;
}

export const ProductService = {
    getProducts: async (cursor: Timestamp | undefined): Promise<[Product[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "products"),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_PRODUCTS));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        const hasMore = products.length === MAX_PRODUCTS;
        if (products.length === 0) return [[], undefined, false];
        return [products, products[products.length - 1].createdAt, hasMore];
    },
    getProductsByLanguage: async (language: LANGUAGE, cursor?: Timestamp): Promise<[Product[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "products"),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_PRODUCTS));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        const hasMore = products.length === MAX_PRODUCTS;
        if (products.length === 0) return [[], undefined, false];
        return [products, products[products.length - 1].createdAt, hasMore];
    },
    getProduct: async (id: string): Promise<Product | null> => {
        const product = await getDoc(doc(Db, "products", id));
        if (!product.exists()) return Promise.resolve(null);
        return { id: product.id, ...product.data(), createdAt: product.data().createdAt.toDate(), updatedAt: product.data().updatedAt.toDate() } as any;
    },
};

export default ProductService; 