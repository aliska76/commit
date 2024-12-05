import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

@Schema({ timestamps: true })
export class Image extends Document {
  @Prop({
    type: String,
    default: uuidv4,
    required: true,
    unique: true
  })
  _id!: string
  
  @Prop({ required: true })
  albumId!: string

  @Prop({
    required: true,
    type: String,
    ref: 'User'
  })
  userId!: string

  @Prop({ required: true })
  url!: string

  @Prop({ required: true })
  alt!: string

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date

  @Prop({ type: Date, default: Date.now })
  updatedAt!: Date
}

export const ImageSchema = SchemaFactory.createForClass(Image)