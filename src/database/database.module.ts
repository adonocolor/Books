import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Book } from "../book/entities/book.entity";
import { Subscription } from "../subscription/entities/subscription.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ado',
      database: 'books',
      entities: [User, Book, Subscription],
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {
}