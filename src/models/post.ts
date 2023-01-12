import { Schema, model } from 'mongoose'

import { IUser } from './user'
import { IAnswer } from './answer'

export interface IPost {
  id: string,
  creator: IUser,
  content: string,
  language: string,
  isSolved: boolean,
  answers: IAnswer[],
  createdAt: Date,
}

const PostSchema = new Schema<IPost>({
  id: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  isSolved: {
    type: Boolean,
    default: false,
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const Post = model<IPost>('Post', PostSchema, 'posts')

export default Post