import { UserInterface } from './user.model';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleService } from './role/role.service';
import { UserResponseInterface } from '../../interface/user/user.response';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly model: Model<UserInterface>,
              private readonly roleService: RoleService) {}

  async create(roleId, account, password, name, sex, email, dateOfBirth, address, phone, status): Promise<UserResponseInterface> {
    // Check roleId is existing
    await this.roleService.findId(roleId);
    // Create the new user
    const newUser = new this.model({roleId, account, password, name, sex, email, dateOfBirth, address, phone, status});
    return await newUser.save();
  }

  async getAll(): Promise<UserInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<UserResponseInterface> {
    // Finds a single document by id
    return this.model.findById(id);
  }

  async update( id:string,
                roleId:string,
                account:string,
                password:string,
                name:string,
                sex:string,
                email:string,
                dateOfBirth:string,
                address:string,
                phone:string,
                status?:string): Promise<UserResponseInterface> {

    //Find user document by id
    const findUser = await this.model.findById(id);
    if(!findUser) throw new HttpException(`Not found userId ${id}`, HttpStatus.NOT_FOUND);
    // Then update
    findUser.roleId = roleId;
    findUser.account = account;
    findUser.password = password;
    findUser.name = name;
    findUser.sex = sex;
    findUser.email = email;
    findUser.dateOfBirth = dateOfBirth;
    findUser.address = address;
    findUser.phone = phone;
    findUser.status = status;
    findUser.updatedAt = Date.now();

    return await findUser.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find user document by id
    const findUser = await this.model.findById(id);
    if(!findUser) throw new HttpException(`Not found userId ${id}`, HttpStatus.NOT_FOUND);
    // Add deletedAt field
    findUser.deletedAt = Date.now();
    await findUser.save();
    return true;
  }
}
