import { Role, RoleSchema } from './role.schema';
import { User, UserSchema } from './user.schema';
import { Post, PostSchema } from './post.schema';

const models = [
  { name: User.name, schema: UserSchema },
  { name: Role.name, schema: RoleSchema },
  { name: Post.name, schema: PostSchema },
];

export default models;
