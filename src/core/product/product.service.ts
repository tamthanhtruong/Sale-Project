import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './product.model';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category/category.service';
import { ProductResponseInterface } from '../../interface/product/product.response';
import { UnitProductService } from '../unit-product/unit-product.service';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly model: Model<ProductInterface>,
              private readonly categoryService: CategoryService,
              private readonly unitProductService: UnitProductService) {}

  async create( categoryId: string,
                unitProductId: string,
                name: string,
                code: string,
                originPrice: number,
                price: number,
                image: string,
                information: string,
                evaluation: string,
                status: string ): Promise<ProductResponseInterface> {

    // Check Category is existing
    await this.categoryService.findId(categoryId);
    // Check Unit-Product is existing
    await this.unitProductService.findId(unitProductId);
    // Create the new product
    const newProduct = new this.model({categoryId, unitProductId, name, code, originPrice, price, image, information, evaluation, status});
    return await newProduct.save();
  }

  async getAll(): Promise<ProductInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<ProductResponseInterface> {
    // Finds a single document by id
    return this.model.findById(id);
  }

  async update( id: string,
                categoryId: string,
                unitProductId: string,
                originPrice: number,
                price: number,
                image: string,
                information: string,
                evaluation: string,
                status: string): Promise<ProductResponseInterface> {

    // Find product document by id
    const findProduct = await this.model.findById(id);
    if (!findProduct) throw new HttpException(`Not found productId ${id}`, HttpStatus.NOT_FOUND);
    // Then update
    findProduct.categoryId = categoryId;
    findProduct.unitProductId = unitProductId;
    findProduct.originPrice = originPrice;
    findProduct.price = price;
    findProduct.image = image;
    findProduct.information = information;
    findProduct.evaluation = evaluation;
    findProduct.status = status;
    findProduct.updatedAt = Date.now();

    return await findProduct.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find product document by id
    const findProduct = await this.model.findById(id);
    if (!findProduct) throw new HttpException(`Not found productId ${id}`, HttpStatus.NOT_FOUND);
    // Add deletedAt field
    findProduct.deletedAt = Date.now();
    await findProduct.save();
    return true;
  }

  /* Additional functions */
  async findId(id: string): Promise<ProductResponseInterface> {
    // Find Import document by id
    const productInfo = await this.model.findById(id);
    if(!productInfo) throw new NotFoundException(`productInfo [${id}] not exist.`);

    return productInfo;
  }
}
