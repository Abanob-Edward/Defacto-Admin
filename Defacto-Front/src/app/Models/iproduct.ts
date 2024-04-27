export interface IProduct {
  id: number;
  title: string;
  isApproved: boolean;
  productGender: number | null;
  categoryId: number;
  code?: string;
  description: string;
  vendorId: string;
  ar_Description:string;
  ar_Title:string;
  productImage1: File|null;
  productImage2: File|null;
  productImage3: File|null;
  productImage4: File|null;
}
