import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import models from './schemas/index';

@Module({
  imports: [MongooseModule.forFeature(models)],
  exports: [MongooseModule]
})
export class RepoModule {

}
