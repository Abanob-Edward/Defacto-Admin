export interface ICategory {
    id: number;
    name: string;
    ar_Name?: string | null;
    ar_Description?: string | null;
    description?: string | null;
    subCategory?: number|null;
    image?: string | null;
    categoryImage?: File | null;
}
