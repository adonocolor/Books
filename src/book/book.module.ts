import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subscription } from "../subscription/entities/subscription.entity";
import { Book } from "./entities/book.entity";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Subscription])],
  exports: [TypeOrmModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
