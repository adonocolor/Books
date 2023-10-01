import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from "@nestjs/common";
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Patch()
  refresh(@Query('userId', ParseIntPipe) userId: string, @Query('months', ParseIntPipe) months: string) {
    return this.subscriptionService.refresh(+userId, +months);
  }
}
