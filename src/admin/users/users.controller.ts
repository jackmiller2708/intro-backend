import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDTO, ValidateCreateUserDTO, UpdateUserDTO } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Post()
  async addUser(@Body() user: CreateUserDTO): Promise<string> {
    const isDTOInvalid = ValidateCreateUserDTO(user)
      .toSeq()
      .some((val) => val === 'unknown');

    if (isDTOInvalid) throw new HttpException('Invalid Params', HttpStatus.BAD_REQUEST);

    return ((await this.userService.create(user)) as any)._id;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    if (!id) throw new HttpException('Invalid Params', HttpStatus.BAD_REQUEST)

    return this.userService.getOne(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string,  @Body() newInfo: UpdateUserDTO): Promise<boolean> {
    if (!id) throw new HttpException('Invalid Params', HttpStatus.BAD_REQUEST)

    const { acknowledged, modifiedCount } = await this.userService.update(id, newInfo);

    return acknowledged && !!modifiedCount;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return `deleted ${id}`;
  }
}
