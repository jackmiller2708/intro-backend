import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './services/users/users.service';
import { RolesService } from './services/roles/roles.service';
import { Module } from '@nestjs/common';

import models from './schemas/index';

@Module({
  imports: [MongooseModule.forFeature(models)],
  providers: [UsersService, RolesService],
  exports: [UsersService, RolesService]
})
export class RepoModule {

}
