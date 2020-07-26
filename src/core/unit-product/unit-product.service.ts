import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UnitProductInterface } from './unit-product.model';
import { Model } from 'mongoose';
import { UnitProductResponseInterface } from '../../interface/unit-product/unit-product.response';

@Injectable()
export class UnitProductService {
  constructor(@InjectModel('Unit-Product') private readonly model: Model<UnitProductInterface>) {}

  async create(name: string): Promise<UnitProductResponseInterface> {
    // Create the new unit-product
    const newUnit = new this.model(name);
    return await newUnit.save();
  }

  async getAll(): Promise<UnitProductResponseInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<UnitProductResponseInterface> {
    // Finds a single document by id
    return this.model.findById(id);
  }

  async update(id: string, name: string): Promise<UnitProductResponseInterface> {
    // Find unit-product document by id
    const findUnit = await this.model.findById(id);
    if(!findUnit) throw new HttpException(`Not found unitProductId ${id}`, HttpStatus.NOT_FOUND);
    // Then update
    findUnit.name = name;
    findUnit.updatedAt = Date.now();

    return await findUnit.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find unit-product document by id
    const unitProduct = await this.model.findById(id);
    if(!unitProduct)  throw new HttpException(`Not found unitProductId ${id}`, HttpStatus.NOT_FOUND);
    // Add deletedAt field
    unitProduct.deletedAt = Date.now();
    await unitProduct.save();
    return true;
  }

  /* Additional functions */
  async findId(id: string): Promise<UnitProductResponseInterface> {
    // Find unit-product document by id
    const unitInfo = await this.model.findById(id);
    if(!unitInfo) throw new NotFoundException(`unitProductId [${id}] not exist.`);

    return unitInfo;
    // return this.model.findById(model => model._id === id); // error at _id
  }
}
