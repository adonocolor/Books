import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Subscription {
  constructor(user: User) {
    this.user = user;
    this.expDate = null;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ nullable: true})
  expDate: Date;

  @OneToOne(() => User, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  user: User;
}
