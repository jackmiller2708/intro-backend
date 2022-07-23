interface CreateRoleDTO {
  name: string;
}

interface UpdateRoleDTO {
  name?: string;
  permissions?: string[];
}

export { CreateRoleDTO, UpdateRoleDTO }