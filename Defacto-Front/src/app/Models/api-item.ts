export interface ApiItem {
  entities: {
    id: number;
    isForDefacto: boolean;
    quantity: number;
    price: number;
    sizeID: number;
    sizeName: string;
    sizeCode: string;
    colorID: number;
    colorName: string;
    colorHEX: string;
    productID: number;
  }[];
  count: number;
}

