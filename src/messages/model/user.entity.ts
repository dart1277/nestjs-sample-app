import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from "./user.dto";

@Entity('user_table')
// @Unique('constraint_name', ['col_one', 'col_two'])
export class User {
  constructor(dto: Partial<UserDto>) {
    Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}
