import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

@Schema({ timestamps: true })
export class Album extends Document {
  @Prop({
    type: String,
    default: uuidv4,
    required: true,
    unique: true
  })
  _id!: string

  @Prop({ required: true })
  title!: string

  @Prop({
    required: true,
    type: String,
    ref: 'User'
  })
  userId!: string

  @Prop({ required: false, type: [String], default: [] }) // Array of image IDs
  images!: string[]

  @Prop({ required: false, default: 0 })
  imageCount: number = 0

  @Prop({ required: false, type: Date, default: Date.now })
  createdAt: Date = new Date()

  @Prop({ required: false, type: Date, default: Date.now })
  updatedAt: Date = new Date()
}

export const AlbumSchema = SchemaFactory.createForClass(Album)