import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey, CreatedAt, UpdatedAt
} from "sequelize-typescript";

@Table({ modelName: 'users', version: true })
export default class User extends Model {
  @PrimaryKey
  /*  @Column({
      type: DataType.NUMBER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    })*/
  @Column(DataType.BIGINT)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  // https://github.com/sequelize/sequelize/issues/8216
  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  version: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
