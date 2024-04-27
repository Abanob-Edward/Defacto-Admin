export interface ApiIProduct {
  entities: {
    id: number;
    title: string;
    isApproved: boolean;
    productGender: number|null;
    code: string|null;
    description: string|null;
    imagesArr?: string[] | null;
    categoryName: string;
    categoryId: number|null;
    vendorName: string|null;
    vendorId: string|null;
    ar_Title: string|null;
    ar_Description: string|null;
  }[];
  count: number;
}
