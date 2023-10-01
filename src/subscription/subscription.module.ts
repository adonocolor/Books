import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Book } from "../book/entities/book.entity";
import { Subscription } from "./entities/subscription.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Subscription])],
  exports: [TypeOrmModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
