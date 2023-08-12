import { IBook } from "./IBook";

export interface IOneBook {
    book: IBook | null;
    loading: boolean;
    pageLoading: boolean;
    items: string[];
    imageFile: any;
    imageUrl: string;
    rules: any;
}