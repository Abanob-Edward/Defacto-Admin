
import { ApiIProduct } from "./api-iproduct";
import { ApiItem } from "./api-item";

export interface ItemWithProductName {
  item:ApiItem;
  product: ApiIProduct;
}
