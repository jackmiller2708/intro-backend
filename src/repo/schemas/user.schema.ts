import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Post } from './post.schema';
import { Role } from './role.schema';

import mongoose, { Document } from 'mongoose';

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  username: string;

  @Prop({ set: (password: string) => hashSync(password, 10) })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

type UserDocument = User & Document;
const UserSchema = SchemaFactory.createForClass(User);

export { UserDocument, UserSchema };
