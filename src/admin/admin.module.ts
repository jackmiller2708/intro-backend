import { UsersController } from './users/users.controller';
import { RepoModule } from 'src/repo/repo.module';
import { Module } from '@nestjs/common';
import { RolesController } from './roles/roles.controller';

@Module({
  imports: [RepoModule],
  controllers: [UsersController, RolesController],
})
export class AdminModule {}
