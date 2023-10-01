import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Patch()
  refresh(@Query('userId') userId: number, @Query('months') months: number) {
    return this.subscriptionService.refresh(+userId, +months);
  }
}
