import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { ConfigModule } from '@nestjs/config';
import databases from 'config/databases';
import { Dialect } from 'sequelize';
import { UserService } from './users/user.service';

const { dialect, host, port, username, password, database } =
  databases().mariadb;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databases],
    }),
    UserModule,
    SequelizeModule.forRoot({
      dialect: dialect as Dialect,
      host: host ?? 'localhost',
      port: Number(port ?? 3306),
      username: username ?? 'root',
      password: password ?? '',
      database: database ?? 'testdb',
      models: [User],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
