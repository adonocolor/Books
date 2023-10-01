import { Controller, Post, Body, Patch, Query, ParseIntPipe, HttpStatus, HttpException } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Books")
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {
  }

  @ApiOperation({
    summary: "Метод для добавления книги",
    description: `Отходя от ТЗ, я бы добавил еще одну сущность - жанры. Сделал бы ее ManyToMany по отношению к книгам и соответствующие методы для роли 'администратора' веб-сервиса (изменение, создание & удаление)`
  })
  @ApiBody({type: CreateBookDto, description: `'тело' книги`})
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Year of release does not correspond to the reality!' })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @ApiOperation({ summary: "Метод для добавления книги к пользователю (когда выдаем книгу пользователю)" })
  @ApiQuery({name: 'userId', type: 'number', description: 'Идентификатор пользователя'})
  @ApiQuery({name: 'bookId', type: 'number', description: 'Идентификатор добавляемой пользователю книги'})
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `No user like this!
  No book like this!` })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: `User got enough books to handle!
  Bro never had a subscription!
  User's subscription has expired!
  Some user have already picked this book!`  })
  @Patch("/give")
  give(@Query("userId", ParseIntPipe) userId: number, @Query("bookId", ParseIntPipe) bookId: number) {
    return this.bookService.give(+userId, +bookId);
  }

  @ApiOperation({ summary: "Метод для \"возвращения книги\" (когда пользователь отдает книгу обратно)" })
  @ApiQuery({name: 'userId', type: 'number', description: 'Идентификатор пользователя'})
  @ApiQuery({name: 'bookId', type: 'number', description: 'Идентификатор возвращаемой книги'})
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No book is matching to the parameters!'  })
  @Patch("/return")
  return(@Query("userId", ParseIntPipe) userId: number, @Query("bookId", ParseIntPipe) bookId: number) {
    return this.bookService.return(+userId, +bookId);
  }
}
