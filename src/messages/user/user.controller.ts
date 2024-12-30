import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from '../model/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';
import { runOnTransactionCommit, Transactional } from 'typeorm-transactional';

@Controller('user')
export class UserController {
  //constructor(private repository: UserRepository) {}
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  @Post()
  @Transactional()
  async createUser(@Body() user: UserDto): Promise<UserDto> {
    const existingUser = await this.repository.findOne({
      where: { id: user.id },
    });
    if (!existingUser) {
      return this.repository.save(user); // TODO check concurrency issues, since this probably will not work
    }
  }

  @Put()
  @Transactional()
  async updateUser(@Body() user: UserDto): Promise<UserDto> {
    //const oldUser = this.repository.findOne(user.id);
    const res = this.repository.save(user);
    runOnTransactionCommit(() =>
      console.log('Successfully updated user', user),
    );
    // runOnTransactionRollback(cb: Callback): void
    return res;
  }
}
