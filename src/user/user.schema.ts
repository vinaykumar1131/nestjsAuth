import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { BaseEntity, ObjectIdColumn } from 'typeorm';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User extends BaseEntity {
  @ObjectIdColumn({ primary: true })
  _id: ObjectId;
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ select: false, required: false })
  password: string;

  @Prop({ select: false, required: false })
  phoneNumber: string;

  @Prop({ select: false, required: false })
  address: string;

  @Prop({ select: false, required: false })
  pinCode: string;

  @Prop({
    default: false
  })
  isDeleted: boolean

}


export const UserSchema = SchemaFactory.createForClass(User);
