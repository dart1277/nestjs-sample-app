import { IsEmail, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { Exclude, Expose } from "class-transformer";

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @MaxLength(128)
  @IsEmail()
  @Expose()
  email: string;
  @IsNotEmpty()
  @MaxLength(128)
  // @Exclude()
  password: string;
}
