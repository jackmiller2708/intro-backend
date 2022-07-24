import { ProfileController } from './profile/profile.controller';
import { PostsController } from './posts/posts.controller';
import { ProfileService } from './profile/profile.service';
import { PostsService } from './posts/posts.service';
import { RepoModule } from 'src/repo/repo.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepoModule],
  controllers: [PostsController, ProfileController],
  providers: [PostsService, ProfileService]
})
export class UserModule {}
