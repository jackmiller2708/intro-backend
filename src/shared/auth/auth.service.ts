import { User, UserDocument } from 'src/repo/schemas/user.schema';
import { UsersService } from 'src/admin/users/users.service';
import { compareSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.getOne({ username } as User);

    if (user && compareSync(password, user.password)) return user;

    return null;
  }

  async login(user: UserDocument) {
    const { username, _id, roles } = user;
    const permissions = [].concat(...roles.map(({ permissions }) => permissions));
    const payload = { username, sub: String(_id), permissions };

    return { access_token: this.jwtService.sign(payload) };
  }
}
