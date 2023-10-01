import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus } from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Subscription")
@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {
  }

  @ApiOperation({
    summary: "метод для установки того что пользователь купил абонемент",
    description: "Изучив предметную область с доменными-экспертами в лице моего друга, работающего админом в спортзале, и репрезентаций вариаций подписок на аудио-стриминговых сервисах, я пришел к выводу, что лучшим методом продления подписки является указание количества месяцев"
  })
  @ApiQuery({name: 'userId', type: 'number', description: 'Идентификатор пользователя'})
  @ApiQuery({name: 'months', type: 'number', description: 'Количество месяцев'})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No user found!' })
  @ApiResponse({ status: HttpStatus.OK })
  @Patch()
  refresh(@Query("userId", ParseIntPipe) userId: number, @Query("months", ParseIntPipe) months: number) {
    return this.subscriptionService.refresh(+userId, +months);
  }
}
