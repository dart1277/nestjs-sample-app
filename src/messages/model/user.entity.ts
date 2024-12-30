import {
  Column,
  Entity,
  ManyToOne, PrimaryColumn,
  PrimaryGeneratedColumn,
  VersionColumn
} from "typeorm";
import { UserDto } from './user.dto';

@Entity('user_table')
// @Unique('constraint_name', ['col_one', 'col_two'])
export class User {
  constructor(dto: Partial<UserDto>) {
    Object.assign(this, dto);
  }

  //@PrimaryGeneratedColumn() // in postgres additional unique constraint would be needed to ensure uniqueness
  @PrimaryColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  // http://typeorm.io/select-query-builder#set-locking
  // ? https://github.com/typeorm/typeorm/issues/2848#issuecomment-443143839
  // https://github.com/typeorm/typeorm/issues/3608

  // https://github.com/typeorm/typeorm/issues/7931

  // node_modules/typeorm/persistence/EntityPersistExecutor.js
  // await new SubjectDatabaseEntityLoader(queryRunner, subjects).load(this.mode);
  // then node_modules/typeorm/query-builder/InsertQueryBuilder.js
  //
  // column.isVersion

  @VersionColumn() // TODO check if it issues incorrect UPDATE statements on Postgres (lacks version in where clause)
  // i.e. UPDATE "user_table" SET "email" = ?, "version" = "version" + 1 WHERE "id" IN (11)
  version: number;
}
