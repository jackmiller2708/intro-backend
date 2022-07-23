import { UsersController } from './users/users.controller';
import { RepoModule } from 'src/repo/repo.module';
import { Module } from '@nestjs/common';
import { RolesController } from './roles/roles.controller';
import { UsersService } from './users/users.service';
import { RolesService } from './roles/roles.service';

@Module({
  imports: [RepoModule],
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService],
  exports: [UsersService]
})
export class AdminModule {}
