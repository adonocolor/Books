import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from "@nestjs/common";
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Patch('/give')
  give(@Query('userId', ParseIntPipe) userId: string, @Query('bookId', ParseIntPipe) bookId : string) {
    return this.bookService.give(+userId, +bookId);
  }

  @Patch('/return')
  return(@Query('userId', ParseIntPipe) userId : string, @Query('bookId', ParseIntPipe) bookId: string) {
    return this.bookService.return(+userId, +bookId);
  }
}
