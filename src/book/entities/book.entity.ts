import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Book {
  constructor(title: string, description: string, yearOfRelease : number) {
    this.title = title;
    this.description = description;
    this.yearOfRelease = yearOfRelease;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  description: string;

  @ManyToOne(type => User, user => user.books, {
    cascade: true,
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn()
  user: User;

  // вполне может быть такое, что год издания\создания книги неизвестен
  @Column({nullable: true})
  yearOfRelease: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;
}
