import { Schema, model } from 'mongoose'

import { IUser } from './user'
import { IAnswer } from './answer'

export interface IPost {
  id: number,
  creator: object,
  content: string,
  language: string,
  isSolved: boolean,
  answers: IAnswer[],
  createdAt: Date,
}

const PostSchema = new Schema<IPost>({
  creator: {
    type: Object,
  },
  content: {
    type: String,
  },
  language: {
    type: String,
  },
  isSolved: {
    type: Boolean,
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