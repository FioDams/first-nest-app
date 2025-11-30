import { Injectable } from '@nestjs/common';
import { UserService } from './users/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  async getHello(): Promise<string> {
    const users = await this.userService.findAll();
    console.log(JSON.stringify(users[0].firstName, null, 2));

    return users.length > 0
      ? `${users[0].id}: ${users[0].firstName} ${users[0].lastName} ${users[0].email}`
      : 'not found';
    return `Hello world`;
  }
}
