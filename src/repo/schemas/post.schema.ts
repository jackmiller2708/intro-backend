import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  // @Prop()
  // password: string;
}

type PostDocument = Post & Document;
const PostSchema = SchemaFactory.createForClass(Post);

export { PostDocument, PostSchema };
