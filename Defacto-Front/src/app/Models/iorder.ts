export interface IOrder {
  entities: {
    id: number;
    quantity: number;
    price: number;
    sizeName: string;
    colorName: string;
    productName: string;
  }[];
  count: number;
}
