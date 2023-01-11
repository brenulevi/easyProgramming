import { Schema, model } from 'mongoose'

import { IUser } from './user'
import { IPost } from './post'

export interface IAnswer {
  id: number,
  post: IPost,
  creator: IUser,
  content: string,
  language: string,
  createdAt: Date,
}

const AnswerSchema = new Schema<IAnswer>({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
  },
  language: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const Answer = model<IAnswer>('Answer', AnswerSchema, 'answers')