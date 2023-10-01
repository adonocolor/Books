import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: "Имя пользователя", nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;
}
