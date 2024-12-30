import { Injectable } from '@nestjs/common';
import { UserDto } from "../model/user.dto";
import { User } from "../model/user.entity";

@Injectable()
export class UserRepository {
  async save(user: UserDto): Promise<User> {
    return undefined;
  }
}
