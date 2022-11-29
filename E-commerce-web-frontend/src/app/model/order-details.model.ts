import { OrderQuantity } from './order-quantity.model';

export class OrderDetails {
  fullName: string;
  fullAddress: string;
  contactNumber: string;
  altContactNumber: string;
  orderProductQuantityList: OrderQuantity[];

  constructor() {
    this.orderProductQuantityList = [];
  }
}
