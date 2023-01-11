import { Schema, model } from 'mongoose';

import { IPost } from './post';
import { IAnswer } from './answer';

export interface IUser {
  id: string,
  name: string,
  email: string,
  password: string,
  age: number,
  friends: IUser[],
  posts: IPost[],
  answers: IAnswer[],
  createdAt: Date,
}

const UserSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
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
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

export const User = model<IUser>('User', UserSchema, 'users')

export default User