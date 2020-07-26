import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryInterface } from './category.model';
import { CategoryResponseInterface } from '../../../interface/product/category/category.response';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly model: Model<CategoryInterface>,) {}

  async create(name: string, status: string): Promise<CategoryResponseInterface> {
    // Create the new category
    const newCategory = new this.model({name, status});
    return await newCategory.save();
  }

  async getAll(): Promise<CategoryInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<CategoryResponseInterface> {
    // Finds a single document by id
    return this.model.findById(id);
  }

  async update(id: string, name : string, status: string): Promise<CategoryResponseInterface> {
    // Find Category document by id
    const findCategory = await this.model.findById(id);
    if(!findCategory) throw new HttpException(`Not found categoryId ${id}`, HttpStatus.NOT_FOUND);
    // Then update
    findCategory.name = name;
    findCategory.status = status;
    findCategory.updatedAt = Date.now();

    return await findCategory.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find Category document by id
    const findCategory = await this.model.findById(id);
    if (!findCategory) throw new HttpException(`Not found findCategory ${id}`, HttpStatus.NOT_FOUND);
    // Add deletedAt field
    findCategory.deletedAt = Date.now();
    await findCategory.save();
    return true;
  }

  /* Additional functions */
  async findId(id: string): Promise<CategoryResponseInterface> {
    // Find Category document by id
    const categoryInfo = await this.model.findById(id);
    if(!categoryInfo) throw new NotFoundException(`categoryId [${id}] not exist.`);

    return categoryInfo;
  }
}
