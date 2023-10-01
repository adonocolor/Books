import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Book } from "../book/entities/book.entity";
import { Subscription } from "../subscription/entities/subscription.entity";
import { SubscriptionService } from "../subscription/subscription.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Subscription])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService, SubscriptionService],
})
export class UserModule {}
