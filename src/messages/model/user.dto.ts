import { IsEmail, IsNotEmpty, IsNumber, MaxLength } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @MaxLength(128)
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MaxLength(128)
  password: string;
}
