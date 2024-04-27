export interface ICategoryResponse {
    id: number;
    name: string;
    ar_Name?: string | null;
    ar_Description?: string | null;
    description?: string | null;
    subCategory: number;
    image?: string | null;
    categoryImage: File | null;
}
