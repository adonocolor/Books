import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { Subscription } from "./entities/subscription.entity";

@Injectable()
export class SubscriptionService {
  @InjectRepository(Subscription)
  private readonly subscriptionRepository: Repository<Subscription>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(user: User) {
    let subscription = new Subscription(user);
    return await this.subscriptionRepository.save(subscription);
  }

  async refresh(userId: number, months: number) {
    let subscription = await this.subscriptionRepository.findOne({
      where: {
        user: {
          id: userId
        }
      },
      relations: {
        user: true
      }
    });

    if (!subscription) {
      throw new HttpException("No user found!", HttpStatus.NOT_FOUND);
    }

    if (!subscription.expDate || subscription.expDate < new Date()) {
      let curDate = new Date().setMonth(new Date().getMonth() + months);
      subscription.expDate = new Date(curDate);
      return await this.subscriptionRepository.save(subscription);
    }

    // in case exp date bigger than cur time

    subscription.expDate.setMonth(subscription.expDate.getMonth() + months);
    return await this.subscriptionRepository.save(subscription);
  }
}
