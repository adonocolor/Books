import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { SubscriptionService } from "../subscription/subscription.service";

@Injectable()
export class UserService {
  constructor(private readonly subscriptionService: SubscriptionService,
  ) {}

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    let user = new User(createUserDto.name);
    let createdUser = await this.userRepository.save(user);
    await this.subscriptionService.create(createdUser);
    return createdUser;
  }

  async findAll() {
    return await this.userRepository.find({
      select: {
        id: true,
        name: true,
      }
    })
  }

  async findOne(id: number) {
    let foundUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        books: {
          id: true,
          title: true,
        }
      },
      relations: {
        books: true
      }
    })

    if (!foundUser) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let foundUser = await this.userRepository.findOneBy({ id: id });
    if (!foundUser) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    foundUser.name = updateUserDto.name;
    return this.userRepository.save({ ...foundUser });
  }

  async remove(id: number) {
    let foundUser = await this.userRepository.delete(id);
    if (!foundUser) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
  }
}
