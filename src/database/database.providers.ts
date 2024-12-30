import { Sequelize } from 'sequelize-typescript';
import User from './model/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'cx',
        password: 'okok',
        database: 'msg',
        schema: 'web',
        models: [__dirname + '/model'],
        //logging: (...msg) => console.debug(msg),
        logging: console.log,
      });
      //sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

/*
database: 'msg',
  schema: 'web',
  port: 5432,
  host: 'localhost',
  username: 'cx',
  password: 'okok',
*/
