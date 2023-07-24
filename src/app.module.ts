import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  ScheduleModule.forRoot(),
  MongooseModule.forRoot('mongodb://0.0.0.0:27017/Auth'),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UserModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
