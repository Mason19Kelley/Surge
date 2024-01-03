
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { OrganizationsModule } from '../organizations/organizations.module';
import { RolesModule } from '../roles/roles.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), OrganizationsModule, RolesModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
