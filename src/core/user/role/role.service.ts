import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleInterface } from './role.model';
import { Model } from 'mongoose';
import { RoleResponseInterface } from '../../../interface/user/role/role.response';

@Injectable()
export class RoleService {
  constructor(@InjectModel('roles') private readonly model: Model<RoleInterface>) {
  }

  async create(name: string, description: string, status: string): Promise<RoleResponseInterface> {
    // Create the new role
    const newRole = new this.model({name, description, status});
    return await newRole.save();
  }

  async getAll(): Promise<RoleInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<RoleResponseInterface> {
    // Finds a single document by id
    return this.model.findById(id);
  }

  async update(id: string, name:string, description: string, status: string): Promise<RoleResponseInterface> {
    // Find role document by id - cần await - để biết name, description thuộc role document
    const findRole = await this.model.findById(id);
    if(!findRole) throw new HttpException(`Not found roleId ${id}`, HttpStatus.NOT_FOUND);
    // Then update
    findRole.name = name;
    findRole.description = description;
    findRole.status = status;
    findRole.updatedAt = Date.now();

    return await findRole.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find role document by id
    const findRole = await this.model.findById(id);
    if(!findRole) throw new HttpException(`Not found roleId ${id}`, HttpStatus.NOT_FOUND);
    // Add deletedAt property
    findRole.deletedAt = Date.now();
    await findRole.save();
    return true;
  }

  /* additional functions */
  async findId(id: string): Promise<RoleResponseInterface> {
    // Find role document by id
    const roleInfo = await this.model.findById(id);
    if(!roleInfo) throw new NotFoundException(`roleId [${id}] not exist.`);

    return roleInfo;
  }
}
