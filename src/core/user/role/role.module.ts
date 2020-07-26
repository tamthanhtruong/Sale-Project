import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleSchema } from './role.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'roles', schema: RoleSchema}]),],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
