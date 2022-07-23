import { CreateRoleDTO, UpdateRoleDTO } from './roles.model';
import { AppPermissions, Permission } from 'src/shared/auth/permissions';
import { Role, RoleDocument } from 'src/repo/schemas/role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  private readonly permissions: Permission;

  constructor(@InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>) {
    this.permissions = new Permission('PAGES', 'Pages')

    const user = this.permissions.createChildPermission(AppPermissions.PAGES_USER, 'Users');
    user.createChildPermission(AppPermissions.PAGES_USER_CREATE, 'Create User');
    user.createChildPermission(AppPermissions.PAGES_USER_UPDATE, 'Update User');
    user.createChildPermission(AppPermissions.PAGES_USER_DELETE, 'Delete User');

    const role = this.permissions.createChildPermission(AppPermissions.PAGES_ROLE, 'Roles');
    role.createChildPermission(AppPermissions.PAGES_ROLE_CREATE, 'Create Role');
    role.createChildPermission(AppPermissions.PAGES_ROLE_UPDATE, 'Update Role');
    role.createChildPermission(AppPermissions.PAGES_ROLE_DELETE, 'Delete Role');
  }

  getPermissions(): Permission {
    return this.permissions;
  }

  async getAll(): Promise<Role[]> {
    const query = this.roleModel.find({}, { __v: 0 });

    return query.exec();
  }

  async createRole(role: CreateRoleDTO): Promise<Role> {
    const newRole = new this.roleModel(role);

    return newRole.save();
  }

  async updateRole(id: string, updateInfo: UpdateRoleDTO) {
    const filter = { _id: id };
    const query = this.roleModel.updateOne(filter, updateInfo);

    return query.exec();
  }
}
