export enum AppPermissions {
  PAGES_USER = 'PAGES.USER',
  PAGES_USER_CREATE = 'PAGES.USER.CREATE',
  PAGES_USER_UPDATE = 'PAGES.USER.UPDATE',
  PAGES_USER_DELETE = 'PAGES.USER.DELETE',

  PAGES_ROLE = 'PAGES.ROLE',
  PAGES_ROLE_CREATE = 'PAGES.ROLE.CREATE',
  PAGES_ROLE_UPDATE = 'PAGES.ROLE.UPDATE',
  PAGES_ROLE_DELETE = 'PAGES.ROLE.DELETE',
}

export class Permission {
  readonly code: string;
  readonly name: string;
  readonly children: Permission[];

  constructor(code: string, name: string) {
    this.code = code;
    this.name = name;
    this.children = [];
  }

  createChildPermission(code: string, name: string): Permission {
    const permission = new Permission(code, name);

    this.children.push(permission);

    return permission;
  }
}