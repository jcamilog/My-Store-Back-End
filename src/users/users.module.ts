import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';


import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';

import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
