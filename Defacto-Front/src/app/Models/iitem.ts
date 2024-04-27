export interface IItem {
  id: number;
  isForDefacto: boolean;
  quantity: number;
  price: number;
  sizeID?: number |null ;
  sizeName: string;
  sizeCode: string;
  colorID: number;
  colorName: string;
  colorHEX: string;
  productID: number;
 }
