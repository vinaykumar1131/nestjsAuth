import { BadRequestException, forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import mongoose, { Model, ObjectId, UpdateWriteOpResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,


  ) { }

  async signup(
    user: any
  ) {
    return this.userModel.create(user).then(async (newUser: UserDocument) => {
      delete newUser.password;
      return newUser;
    });
  }

  async login(user: any): Promise<User> {
    console.log(user);
    
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  async findOne(name) {
    return await this.userModel.findOne({ email: name }).select('+password');

  }

  async findAll() {
    return await this.userModel.find();
  }


}