import { IAuthUser } from 'src/common/interfaces/context';
import { CreateCartInput } from '../dto/create-cart.input';
import { UpdateCartInput } from '../dto/update-cart.input';

export interface ICartsServiceFindOneByCartId {
  cartId: string;
}

export interface ICartsServiceFindOneByCartProductId {
  userId: string;
  productId: string;
}

export interface ICartsServiceCreate {
  productId: string;
  createCartInput: CreateCartInput;
  user: IAuthUser['user'];
}
export interface ICartsServiceUpdate {
  cartId: string;
  updateCartInput: UpdateCartInput;
  user: IAuthUser['user'];
}

export interface ICartsServiceDelete {
  cartId: string;
}
