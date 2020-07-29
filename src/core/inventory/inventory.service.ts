import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { UserService } from '../user/user.service';
import { InventoryInterface } from './inventory.model';
import { InventoryResponseInterface } from '../../interface/inventory/inventory.response';

@Injectable()
export class InventoryService {
  constructor(@InjectModel('inventories') private readonly model: Model<InventoryInterface>,
              private readonly userService: UserService) {}

  async create( invoiceNumber: number,
                note: string,
                createdUserId: string,
                status: string) {

    // Check createdUser is existing
    await this.userService.findId(createdUserId);
    // Create new inventory document
    const newInventory = new this.model({invoiceNumber,note,createdUserId,status});
    return await newInventory.save();
  }

  async getAll(): Promise<InventoryInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<InventoryResponseInterface> {
    // Finds a single document by id
    const inventoryInfo = await this.model.findById(id);
    if(!inventoryInfo) throw new HttpException(`Not found inventoryInfo ${id}`, HttpStatus.NOT_FOUND);
    return inventoryInfo;
  }

  async update(  id: string,
                 invoiceNumber: number,
                 note: string,
                 createdUserId: string,
                 status: string ): Promise<InventoryResponseInterface> {

    // Find export document by id
    const findInventory = await this.model.findById(id);
    if (!findInventory) throw new HttpException(`Not found findInventory ${id}`, HttpStatus.NOT_FOUND);
    // Check createdUser is existing
    await this.userService.findId(createdUserId);

    // Then update
    findInventory.invoiceNumber = invoiceNumber;
    findInventory.note = note;
    findInventory.createdUserId = createdUserId;
    findInventory.status = status;
    findInventory.updatedAt = Date.now();

    return await findInventory.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find export document by id
    const findInventory =  await this.model.findById(id);
    if (!findInventory) throw new HttpException(`Not found findInventory ${id}`, HttpStatus.NOT_FOUND);
    // Add deletedAt field
    findInventory.deletedAt = Date.now();
    await findInventory.save();
    return true;
  }

  /* Additional functions */
  async findId(id: string): Promise<InventoryResponseInterface> {
    // Find Export document by id
    const inventoryInfo = await this.model.findById(id);
    if(!inventoryInfo) throw new NotFoundException(`inventoryId [${id}] not exist.`);

    return inventoryInfo;
  }
}
