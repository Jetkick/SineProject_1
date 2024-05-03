import { Module } from '@nestjs/common';
import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { SignUpsService } from '../signUp/signUps.service';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';
import { User } from '../signUp/entities/signUp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cart, //
      Product,
      User,
    ]),
  ],
  providers: [
    CartsResolver, //
    CartsService,
    ProductsService,
    SignUpsService,
  ],
})
export class CartsModule {}
