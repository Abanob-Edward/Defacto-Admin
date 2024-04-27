export interface ApiReview {
  entities:{
    customerName: string | null;
    productTitle: string | null;
    reviewMessage: string;
    reviewRate: number | null;
    productID: number;
 }[];
 count: number;
}
