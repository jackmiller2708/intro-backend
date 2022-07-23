import { CreateUserDTO, UpdateUserDTO } from './users.model';
import { User, UserDocument } from 'src/repo/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(user: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(user);

    return newUser.save();
  }

  async update(id: string, updateInfo: UpdateUserDTO): Promise<any> {
    const filter = { _id: id };
    const query = this.userModel.updateOne(filter, updateInfo);

    return query.exec();
  }

  async getOneById(id: string): Promise<User> {
    const query = this.userModel
      .findById(id, { __v: 0, posts: 0 })
      .populate([{ path: 'roles', select: 'name' }]);

    return query.exec();
  }

  async getOne(filter: User): Promise<User> {
    const query = this.userModel
      .findOne(filter, { __v: 0, posts: 0 })
      .populate('roles');

    return query.exec();
  }

  async getAll(): Promise<User[]> {
    const query = this.userModel
      .find({}, { __v: 0, posts: 0, firstName: 0, lastName: 0, password: 0 })
      .populate([{ path: 'roles', select: 'name' }]);

    return query.exec();
  }
}
