import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserCreateRequest,
  UserDeleteRequest,
  UserGetSingleRequest,
  UserUpdateRequest,
} from '../../interface/user/user.request';
import { UserResponseInterface } from '../../interface/user/user.response';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() req: UserCreateRequest): Promise<UserResponseInterface> {
    return await this.service.create( req.roleId,
                                      req.account,
                                      req.password,
                                      req.name,
                                      req.sex,
                                      req.email,
                                      req.dateOfBirth,
                                      req.address,
                                      req.phone,
                                      req.status);
  }

  @Get()
  async getAll(): Promise<UserResponseInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param() req: UserGetSingleRequest): Promise<UserResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: UserUpdateRequest): Promise<UserResponseInterface> {
    return await this.service.update( id,
                                      req.roleId,
                                      req.account,
                                      req.password,
                                      req.name,
                                      req.sex,
                                      req.email,
                                      req.dateOfBirth,
                                      req.address,
                                      req.phone,
                                      req.status);
  }

  @Delete(':id')
  async delete(@Param() req: UserDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  @Get('get-all/soft-deleted')
  async getAllSoftDelete(): Promise<UserResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }

  @Get('create/real-dummy-data')
  async realDummyData() {
    return await this.service.realDummyData();
  }
}
