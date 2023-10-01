import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'метод для добавления пользователя'})
  @ApiBody({type: CreateUserDto, description: `'тело' с полями пользователя`})
  @ApiResponse({ status: HttpStatus.CREATED})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'метод для получения списка всех пользователей'})
  @ApiResponse({ status: HttpStatus.OK})
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'метод для получения конкретного пользователя (информация по пользователю + список взятых книг)'})
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор пользователя'})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found!'  })
  @ApiResponse({ status: HttpStatus.OK})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'метод для редактирования пользователя'})
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор пользователя'})
  @ApiBody({type: UpdateUserDto, description: `'тело' с полями пользователя`})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found!'  })
  @ApiResponse({ status: HttpStatus.OK})
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'метод для удаления пользователя'})
  @ApiParam({name: 'id', type: 'number', description: 'Идентификатор пользователя'})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found!'  })
  @ApiResponse({ status: HttpStatus.OK})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
