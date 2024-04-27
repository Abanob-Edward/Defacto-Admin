export interface IGetItem {
    entity: {
        id: number;
        isForDefacto: boolean;
        quantity: number;
        price: number;
        sizeName: string;
        colorName: string;
        productID: number;
     }[];
     count: number;
}
