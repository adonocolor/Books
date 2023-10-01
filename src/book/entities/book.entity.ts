import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Book {
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(type => User, user => user.books, {
    cascade: true,
    onDelete: "SET NULL"
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;
}
