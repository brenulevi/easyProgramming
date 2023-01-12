import { Schema, model } from 'mongoose';

import { IAnswer } from './answer';

export interface IUser {
  id: string,
  name: string,
  email: string,
  password: string,
  age: number,
  isPrivate: boolean,
  friends: IUser[],
  createdAt: Date,
}

const UserSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    maxlength: 100,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

export const User = model<IUser>('User', UserSchema, 'users')

export default User