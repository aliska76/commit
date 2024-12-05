// user.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  })
  _id!: string

  @Prop({ required: true })
  name!: string

  @Prop({ required: true })
  email!: string

  @Prop({ required: false, default: 0 })
  albumCount: number = 0

  @Prop({ required: false, type: Date, default: Date.now })
  createdAt: Date = new Date

  @Prop({ required: false, type: Date, default: Date.now })
  updatedAt: Date = new Date
}

export const UserSchema = SchemaFactory.createForClass(User)