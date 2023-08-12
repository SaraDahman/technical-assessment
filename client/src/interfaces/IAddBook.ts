export interface IAddBook {
    title: string;
    author: string;
    description: string;
    category: string;
    imageUrl: null | string;
    image: any;
    loading: boolean;
    rules: any;
    items: string[];
}