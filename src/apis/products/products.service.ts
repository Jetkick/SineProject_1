import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import {
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFetchProduct,
  IProductsServiceFetchProducts,
  IProductsServiceFindOneByProductId,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
  ) {}

  async findOneByProductId({
    productId,
  }: IProductsServiceFindOneByProductId): Promise<Product> {
    const result = await this.productsRepository.findOne({
      where: { id: productId },
    });

    return result;
  }

  async fetchProducts({
    productCategory,
    productSubCategory,
  }: IProductsServiceFetchProducts): Promise<Product[]> {
    const result = await this.productsRepository.find({
      where: {
        productCategory: productCategory,
        productSubCategory: productSubCategory,
      },
    });

    return result;
  }

  async fetchProduct({
    productId,
  }: IProductsServiceFetchProduct): Promise<Product> {
    const result = await this.findOneByProductId({ productId });

    if (!result)
      throw new UnprocessableEntityException('제품을 찾을 수 없습니다');

    return result;
  }

  async createProduct({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.create({
      ...createProductInput,
    });

    return await this.productsRepository.save(result);
  }

  async updateProduct({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    const product = await this.findOneByProductId({ productId });

    if (!product)
      throw new UnprocessableEntityException('제품을 찾을 수 없습니다');

    const result = this.productsRepository.merge(product, {
      ...updateProductInput,
    });

    return await this.productsRepository.save(result);
  }

  async deleteProduct({ productId }: IProductsServiceDelete): Promise<boolean> {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
