import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
//import { UserRepository } from './user.repository';
import { UserDto } from '../model/user.dto';
import User from '../../database/model/user.entity';
//import { InjectRepository } from '@nestjs/typeorm';
//import { User } from '../model/user.entity';
//import { Repository } from 'typeorm';
//import { runOnTransactionCommit, Transactional } from 'typeorm-transactional';

@Controller('user')
export class UserController {
  // TypeOrm
  //constructor(private repository: UserRepository) {}
  /*  constructor(@InjectRepository(User) private repository: Repository<User>) {}
  
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
    }*/

  constructor(@Inject('USER_REPOSITORY') private repository: typeof User) {}

  @Post()
  async createUser(@Body() user: UserDto): Promise<UserDto> {
    if (!false) {
    }
    return this.repository.create({ ...user });
  }

  @Put()
  async updateUser(@Body() userDto: UserDto): Promise<UserDto> {
    const user = await this.repository.findByPk(userDto.id);
    if (!user) {
      throw new Error(`User ${user.id} not found`); // Handle user not found
    }
    const newUser = await user.update(userDto);
    return newUser;
  }
}
