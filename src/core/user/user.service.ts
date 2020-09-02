import { UserInterface } from './user.model';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserResponseInterface } from '../../interface/user/user.response';

@Injectable()
export class UserService {

  constructor(@InjectModel('users') private readonly model: Model<UserInterface>,) {}

  /* Additional functions */
  async findUser(id: string): Promise<UserInterface> {
    let userDoc;
    try {
      // Find User document by id
      userDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` UserID: ${id} is not exist `); // 404
    }
    if(!userDoc) throw new NotFoundException(` UserID: ${id} is not exist `); // 404

    return userDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create(roleId: string,
               account: string,
               password: string,
               name: string,
               sex: string,
               email: string,
               dateOfBirth: string,
               address: string,
               phone: string,
               status: string ): Promise<UserResponseInterface> {
    try {
      // Create the new user
      const newUser = new this.model({roleId, account, password, name, sex, email, dateOfBirth, address, phone, status});
      return await newUser.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<UserResponseInterface[]> {
    try {
      // Find documents
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<UserResponseInterface> {
      // Finds a single document by id
      return await this.findUser(id);
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
                status?:string ): Promise<UserResponseInterface> {

    //Find user document by id
    const user = await this.findUser(id);

    try {
      // Then update
      user.roleId = roleId;
      user.account = account;
      user.password = password;
      user.name = name;
      user.sex = sex;
      user.email = email;
      user.dateOfBirth = dateOfBirth;
      user.address = address;
      user.phone = phone;
      user.status = status;
      user.updatedAt = Date.now();

      return await user.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find user document by id
    const user = await this.findUser(id);
    try {
      // Add deletedAt field
      user.deletedAt = Date.now();
      await user.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAllSoftDelete(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async realDummyData() {
    const arrData = [{
      "roleId" : "5f3a2d6e965c4f207897009a",
      "account": "loi123",
      "password": "987",
      "name": "Tài Lợi",
      "sex" : "Male",
      "email" : "linh@gmail.com",
      "dateOfBirth" : "1/1/1990",
      "address" : "Bình Thủy",
      "phone" : "123456",
      "status": "Inactive"
    },{
      "roleId" : "5f3a2d6e965c4f207897009a",
      "account": "loi123",
      "password": "987",
      "name": "Tài Lợi",
      "sex" : "Male",
      "email" : "linh@gmail.com",
      "dateOfBirth" : "1/1/1990",
      "address" : "Bình Thủy",
      "phone" : "123456",
      "status": "Inactive"
    }, {
      "roleId" : "5f3953380af83c1da4a5fc68",
      "account": "loi123",
      "password": "987",
      "name": "Tài Lợi",
      "sex" : "Male",
      "email" : "linh@gmail.com",
      "dateOfBirth" : "1/1/1990",
      "address" : "Bình Thủy",
      "phone" : "123456",
      "status": "Inactive"
    }, {
      "roleId" : "5f3953380af83c1da4a5fc68",
      "account": "loi123",
      "password": "987",
      "name": "Tài Lợi",
      "sex" : "Male",
      "email" : "linh@gmail.com",
      "dateOfBirth" : "1/1/1990",
      "address" : "Bình Thủy",
      "phone" : "123456",
      "status": "Inactive"
    }, {
      "roleId" : "5f3953420af83c1da4a5fc69",
      "account": "loi123",
      "password": "987",
      "name": "Tài Lợi",
      "sex" : "Male",
      "email" : "linh@gmail.com",
      "dateOfBirth" : "1/1/1990",
      "address" : "Bình Thủy",
      "phone" : "123456",
      "status": "Inactive"
    }, {
      "roleId" : "5f3953420af83c1da4a5fc69",
      "account": "loi123",
      "password": "987",
      "name": "Tài Lợi",
      "sex" : "Male",
      "email" : "linh@gmail.com",
      "dateOfBirth" : "1/1/1990",
      "address" : "Bình Thủy",
      "phone" : "123456",
      "status": "Inactive"
    }, {
      "roleId" : "5f3953a5755024303410e0aa",
      "account": "loi123",
      "password": "987",
      "name": "Tài Lợi",
      "sex" : "Male",
      "email" : "linh@gmail.com",
      "dateOfBirth" : "1/1/1990",
      "address" : "Bình Thủy",
      "phone" : "123456",
      "status": "Active"
    }, {
      "roleId" : "5f3953a5755024303410e0aa",
      "account": "loi123",
      "password": "987",
      "name": "Tài Lợi",
      "sex" : "Male",
      "email" : "linh@gmail.com",
      "dateOfBirth" : "1/1/1990",
      "address" : "Bình Thủy",
      "phone" : "123456",
      "status": "Active"
    }, {
      "roleId" : "5f3953b2755024303410e0ab",
      "account": "loi123",
      "password": "987",
      "name": "Tài Lợi",
      "sex" : "Male",
      "email" : "linh@gmail.com",
      "dateOfBirth" : "1/1/1990",
      "address" : "Bình Thủy",
      "phone" : "123456",
      "status": "Inactive"
    }, {
      "roleId" : "5f3953b2755024303410e0ab",
      "account": "loi123",
      "password": "987",
      "name": "Tài Lợi",
      "sex" : "Male",
      "email" : "linh@gmail.com",
      "dateOfBirth" : "1/1/1990",
      "address" : "Bình Thủy",
      "phone" : "123456",
      "status": "Active"
    }];
    let i = 0;
    while(i<100) {
      await this.model.insertMany(arrData, function(err) {
        if(err) throw err;
      });
      i++;
    }

    return true;
  };
}
