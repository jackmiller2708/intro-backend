import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Role {
  @Prop()
  name: string;

  @Prop({ default: [] })
  permissions: string[];
}

type RoleDocument = Role & Document;
const RoleSchema = SchemaFactory.createForClass(Role);

export { RoleDocument, RoleSchema };
