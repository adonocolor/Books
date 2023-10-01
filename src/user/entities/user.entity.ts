import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../../book/entities/book.entity";
import { Subscription } from "../../subscription/entities/subscription.entity";

@Entity()
export class User {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(type => Book, book => book.user)
  books: Book[];

  @OneToOne(() => Subscription, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: false
  })
  subscription: Subscription;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;
}
