import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import {
  ICartsServiceCreate,
  ICartsServiceDelete,
  ICartsServiceFindOneByCartId,
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

  async createCart({ productId, createCartInput, user }: ICartsServiceCreate) {
    const userId = await this.signUpsService.findOneByUserId({
      userId: user,
    });

    if (!userId) throw new UnprocessableEntityException('유저가 없습니다!');

    const userIdId = userId.id;

    const product = await this.productsSerivce.findOneByProductId({
      productId,
    });

    if (!product) throw new UnprocessableEntityException('제품이 없습니다!');

    const productValidate = await this.cartsRepository
      .createQueryBuilder('cart')
      .select('product.id')
      .innerJoin('cart.productId', 'product')
      .where('cart.userId = :userIdId', { userIdId })
      .getRawOne();

    if (productValidate) {
      throw new UnprocessableEntityException(
        '장바구니에 이미 제품이 있습니다.',
      );
    }

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
