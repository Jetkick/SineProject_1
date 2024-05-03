import { Module } from '@nestjs/common';
import { SignUpsModule } from './apis/signUp/signUps.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './apis/users/users.module';
import { SupportsModule } from './apis/supports/supports.module';
import { UsersInquiriesModule } from './apis/usersInquiry/usersInquiry.module';
import { NotifiesModule } from './apis/notifies/notifies.module';
import { ShippingInstructionModule } from './apis/shippingInstruction/shippingInstruction.module';
import { AuthModule } from './apis/auth/auth.module';
import { ProductsModule } from './apis/products/products.module';
import { CartsModule } from './apis/carts/carts.module';
import { PaymentsMoudle } from './apis/payments/payments.module';
import { UsersAddressModule } from './apis/usersAddress/usersAddress.module';

@Module({
  imports: [
    AuthModule, //
    CartsModule,
    NotifiesModule,
    ProductsModule,
    PaymentsMoudle,
    ShippingInstructionModule,
    SignUpsModule,
    SupportsModule,
    UsersModule,
    UsersAddressModule,
    UsersInquiriesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
