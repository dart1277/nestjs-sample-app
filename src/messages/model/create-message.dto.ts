import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @MinLength(1)
  content: string;
}
