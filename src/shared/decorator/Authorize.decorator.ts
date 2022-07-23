import { AppPermissions } from '../auth/permissions';
import { SetMetadata } from '@nestjs/common';

const PERMISSION_KEY = 'permissions';
const Authorize = (...permissions: AppPermissions[]) => SetMetadata(PERMISSION_KEY, permissions);

export { PERMISSION_KEY, Authorize }