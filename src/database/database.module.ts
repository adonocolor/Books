import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Book } from "../book/entities/book.entity";
import { Subscription } from "../subscription/entities/subscription.entity";
import * as process from "process";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [User, Book, Subscription],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {
}