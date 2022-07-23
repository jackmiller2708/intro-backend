import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateRoleDTO, UpdateRoleDTO } from './roles.model';
import { AppPermissions, Permission } from 'src/shared/auth/permissions';
import { RolesService } from './roles.service';
import { Role } from 'src/repo/schemas/role.schema';
import { Authorize } from 'src/shared/decorator/Authorize.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('permissions')
  getAllPermissions(): Permission {
    return this.rolesService.getPermissions();
  }

  @Get()
  @Authorize(AppPermissions.PAGES_ROLE)
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAll();
  }

  @Post()
  @Authorize(AppPermissions.PAGES_ROLE_CREATE)
  async addRole(@Body() role: CreateRoleDTO) {
    if (!role.name) {
      throw new HttpException('Invalid Params', HttpStatus.BAD_REQUEST);
    }

    return this.rolesService.createRole(role);
  }

  @Put(':id')
  @Authorize(AppPermissions.PAGES_ROLE_UPDATE)
  async updateRole(@Param('id') id: string, @Body() newInfo: UpdateRoleDTO) {
    if (!id || !newInfo || (newInfo?.permissions && !newInfo.permissions.length)) {
      throw new HttpException('Invalid Params', HttpStatus.BAD_REQUEST);
    }

    const permissionEntries = Object.entries(AppPermissions).map(([,code]) => code);
    const { permissions } = newInfo;
    const isPermissionsValid = permissions.every(code => permissionEntries.includes(code as AppPermissions));

    if (!isPermissionsValid) {
      throw new HttpException('Invalid Params', HttpStatus.BAD_REQUEST);
    }

    const { acknowledged, modifiedCount } =  await this.rolesService.updateRole(id, newInfo);

    return acknowledged && !!modifiedCount;
  }
}
