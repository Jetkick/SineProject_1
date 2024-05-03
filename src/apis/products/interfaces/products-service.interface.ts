import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';

export interface IProductsServiceFindOneByProductId {
  productId: string;
}

export interface IProductsServiceFetchProducts {
  productCategory: string;
  productSubCategory: string;
}

export interface IProductsServiceFetchProduct {
  productId: string;
}

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

export interface IProductsServiceDelete {
  productId: string;
}
