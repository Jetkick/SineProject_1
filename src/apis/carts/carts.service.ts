import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import {
  ICartsServiceCreate,
  ICartsServiceDelete,
  ICartsServiceFindOneByCartId,
  ICartsServiceFindOneByCartProductId,
  ICartsServiceUpdate,
} from './interfaces/carts-service.interface';
import { SignUpsService } from '../signUp/signUps.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartsRepository: Repository<Cart>,

    private readonly signUpsService: SignUpsService,

    private readonly productsSerivce: ProductsService,
  ) {}

  findOneByCartId({ cartId }: ICartsServiceFindOneByCartId): Promise<Cart> {
    const result = this.cartsRepository.findOne({ where: { id: cartId } });

    return result;
  }

  async findOneByCartProductId({
    userId,
    productId,
  }: ICartsServiceFindOneByCartProductId): Promise<Cart> {
    const result = await this.cartsRepository.findOne({
      where: { userId: userId[''], productId: productId[''] },
    });
    return result;
  }

  async createCart({ productId, createCartInput, user }: ICartsServiceCreate) {
    const userId = await this.signUpsService.findOneByUserId({
      userId: user,
    });

    if (!userId) throw new UnprocessableEntityException('유저가 없습니다!');

    const product = await this.productsSerivce.findOneByProductId({
      productId,
    });

    if (!product) throw new UnprocessableEntityException('제품이 없습니다!');

    // const a = await this.cartsRepository.findOne({
    //   where: { product
    // });

    const productValidate = await this.findOneByCartProductId({
      userId: userId.id,
      productId: product.id,
    });

    if (productValidate)
      throw new UnprocessableEntityException(
        '이미 장바구니에 제품이 있습니다!',
      );

    const result = this.cartsRepository.create({
      ...createCartInput,
      productId: product,
      userId: userId,
    });

    return this.cartsRepository.save(result);
  }

  async updateCart({
    cartId,
    updateCartInput,
    user,
  }: ICartsServiceUpdate): Promise<Cart> {
    const userId = await this.signUpsService.findOneByUserId({
      userId: user,
    });

    if (!userId)
      throw new UnprocessableEntityException('로그인을 다시 해주세요');

    const cart = await this.findOneByCartId({
      cartId,
    });

    if (!cart)
      throw new UnprocessableEntityException('장바구니에 제품이 없습니다!');

    const result = this.cartsRepository.merge(cart, {
      ...updateCartInput,
    });

    return await this.cartsRepository.save(result);
  }

  async deleteCart({ cartId }: ICartsServiceDelete): Promise<boolean> {
    const result = await this.cartsRepository.softDelete({ id: cartId });
    return result.affected ? true : false;
  }
}
