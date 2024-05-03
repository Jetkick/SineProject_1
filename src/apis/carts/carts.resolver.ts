import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cart } from './entities/cart.entity';
import { CartsService } from './carts.service';
import { IContext } from 'src/common/interfaces/context';
import { CreateCartInput } from './dto/create-cart.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UpdateCartInput } from './dto/update-cart.input';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';

@Resolver()
export class CartsResolver {
  constructor(
    private readonly cartsService: CartsService, //

    private readonly productsService: ProductsService,
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Cart)
  createCart(
    @Args('productId') productId: string,
    @Args('createCartInput') createCartInput: CreateCartInput,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.cartsService.createCart({ productId, createCartInput, user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Cart)
  updateCart(
    @Args('cartId') cartId: string,
    @Args('updateCartInput') updateCartInput: UpdateCartInput,
    @Context() context: IContext,
  ): Promise<Cart> {
    const user = context.req.user;
    return this.cartsService.updateCart({ cartId, updateCartInput, user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteCart(
    @Args('cartId') cartId: string, //
  ): Promise<boolean> {
    return this.cartsService.deleteCart({ cartId });
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findOneByProductId({ productId });
  }
}
