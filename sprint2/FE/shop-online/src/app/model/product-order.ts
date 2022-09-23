import {Product} from './product';
import {Customer} from './customer';

export interface ProductOrder {
  id?: number;
  quantity?: number;
  product?: Product;
  customer?: Customer;
  totalMoney?: number;
}
