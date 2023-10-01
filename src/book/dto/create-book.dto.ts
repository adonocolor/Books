import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
  @ApiProperty({ description: "Название книги", nullable: false })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ description: "Описание книги", nullable: false })
  @IsString()
  @IsNotEmpty()
  description: string;
}
