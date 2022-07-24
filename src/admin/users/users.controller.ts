import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO, ValidateCreateUserDTO, UpdateUserDTO } from './users.model';
import { AppPermissions } from 'src/shared/auth/permissions';
import { UsersService } from './users.service';
import { Authorize } from 'src/shared/decorator/Authorize.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Authorize(AppPermissions.PAGES_USER)
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Post()
  @Authorize(AppPermissions.PAGES_USER_CREATE)
  async addUser(@Body() user: CreateUserDTO): Promise<string> {
    const isDTOInvalid = ValidateCreateUserDTO(user)
      .toSeq()
      .some((val) => val === 'unknown');

    if (isDTOInvalid) throw new HttpException('Invalid Params', HttpStatus.BAD_REQUEST);

    return ((await this.userService.create(user)) as any)._id;
  }

  @Get(':id')
  @Authorize(AppPermissions.PAGES_USER)
  async getUser(@Param('id') id: string) {
    if (!id) throw new HttpException('Invalid Params', HttpStatus.BAD_REQUEST)

    return this.userService.getOneById(id);
  }

  @Put(':id')
  @Authorize(AppPermissions.PAGES_ROLE_UPDATE)
  async updateUser(@Param('id') id: string,  @Body() newInfo: UpdateUserDTO): Promise<boolean> {
    if (!id) throw new HttpException('Invalid Params', HttpStatus.BAD_REQUEST)

    const { acknowledged, modifiedCount } = await this.userService.update(id, newInfo);

    return acknowledged && !!modifiedCount;
  }

  @Delete(':id')
  @Authorize(AppPermissions.PAGES_USER_DELETE)
  async deleteUser(@Param('id') id: string) {
    return `deleted ${id}`;
  }
}
