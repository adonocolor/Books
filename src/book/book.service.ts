import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Book } from "./entities/book.entity";
import { Subscription } from "../subscription/entities/subscription.entity";
import { Repository } from "typeorm";

@Injectable()
export class BookService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Book)
  private readonly bookRepository: Repository<Book>;

  @InjectRepository(Subscription)
  private readonly subscriptionRepository: Repository<Subscription>;

  async create(createBookDto: CreateBookDto) {
    let book = new Book(createBookDto.title, createBookDto.description);
    return await this.bookRepository.save(book);
  }

  async give(userId: number, bookId: number) {
    let user = await this.userRepository.findOne({
        where: {
          id: userId
        },
        relations: {
          books: true,
        }
      });

    let subscription = await this.subscriptionRepository.findOne({
      where: {
        user: {
          id: userId
        }
      }
    });

    if (!user) {
      throw new HttpException("No user like this!", HttpStatus.NOT_FOUND);
    }

    if (user.books.length === 5) {
      throw new HttpException("User got enough books to handle!", HttpStatus.BAD_REQUEST);
    }

    if (!subscription.expDate) {
      throw new HttpException("Bro never had a subscription!", HttpStatus.BAD_REQUEST);
    }

    if (subscription.expDate < new Date()) {
      throw new HttpException("User's subscription has expired!", HttpStatus.BAD_REQUEST);
    }

    let book = await this.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw new HttpException("No book like this!", HttpStatus.NOT_FOUND);
    }

    if (book.user) {
      throw new HttpException("Some user have already picked this book!", HttpStatus.BAD_REQUEST);
    }

    user.books = [...user.books, book];

    return await this.userRepository.save(user);
  }

  async return(userId: number, bookId: number) {
    let book = await this.bookRepository.findOne({
      where: {
        id: bookId,
        user: {
          id: userId
        }
      },
      relations: {
        user: true
      }
    });

    if (!book) {
      throw new HttpException("No book is matching to the parameters!", HttpStatus.NOT_FOUND);
    }

    book.user = null;
    return await this.bookRepository.save(book);
  }
}
