import { CreatePostDTO, UpdatePostDTO } from './posts.model';
import { PostDocument, Post } from 'src/repo/schemas/post.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async getAllByUserId(author: string): Promise<Post[]> {
    const query = this.postModel.find({ author }, { author: 0 });

    return query.exec();
  }

  async getOneById(id: string): Promise<Post> {
    const query = this.postModel.findById(id).populate('author');

    return query.exec();
  }

  async getAll(): Promise<Post[]> {
    const query = this.postModel.find().populate('author');

    return query.exec();
  }

  async create(author: string, post: CreatePostDTO): Promise<Post> {
    const newPost = new this.postModel({ ...post, author });

    return newPost.save();
  }

  async update(id: string, updateInfo: UpdatePostDTO): Promise<any> {
    const query = this.postModel.findByIdAndUpdate(id, updateInfo);

    return query.exec();
  }

  delete(): void {}
}
