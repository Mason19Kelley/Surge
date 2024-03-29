import { Module } from '@nestjs/common';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './organizations.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Organization])],
    providers: [OrganizationsService],
    exports: [OrganizationsService],
    controllers: [OrganizationsController],
})
export class OrganizationsModule {}
