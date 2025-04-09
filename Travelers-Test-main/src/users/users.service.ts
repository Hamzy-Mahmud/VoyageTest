import { Injectable } from '@nestjs/common';
export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
          userId: 1,
          username: 'travel',
          password: '2022travel',
        },
        {
          userId: 2,
          username: 'admin',
          password: 'weakpassword',
        },
        {
          userId: 3,
          username: 'superadmin',
          password: '#_2hTgd)=!',
        },
      ];
    
      async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }
}
