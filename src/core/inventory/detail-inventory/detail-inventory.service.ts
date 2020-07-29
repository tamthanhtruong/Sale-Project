import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitProductService } from '../../unit-product/unit-product.service';
import { ProductService } from '../../product/product.service';
import { DetailInventoryInterface } from './detail-inventory.model';
import { DetailInventoryResponseInterface } from '../../../interface/inventory/detail-inventory/detail-inventory.response';
import { InventoryService } from '../inventory.service';

@Injectable()
export class DetailInventoryService {
  constructor(@InjectModel('detail-inventories') private readonly model: Model<DetailInventoryInterface>,
              private readonly inventoryService: InventoryService,
              private readonly productService: ProductService,
              private readonly unitProductService: UnitProductService) {}

  async create( inventoryId: string, productId: string, unitProductId: string, quantity: number, price: number): Promise<DetailInventoryResponseInterface> {
    // Check Inventory is existing
    await this.inventoryService.findId(inventoryId);
    // Check Product is existing
    await this.productService.findId(productId);
    // Check Unit-Product is existing
    await this.unitProductService.findId(unitProductId);
    // Create new inventory document
    const newDetail = new this.model({inventoryId, productId, unitProductId, quantity, price});
    return await newDetail.save();
  }

  async getAll(): Promise<DetailInventoryInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<DetailInventoryResponseInterface> {
    // Find detail-inventory document by id
    return this.model.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    // Find detail-inventory document by id
    const findDetail =  await this.model.findById(id);
    if (!findDetail) throw new HttpException(`Not findDetail ${id} in DB`, HttpStatus.NOT_FOUND);

    await this.model.deleteOne({_id: id}).exec();
    return true;
  }

  async getDetail(inventoryId: string): Promise<DetailInventoryInterface[]> {
    // Check inventory is existing
    await this.inventoryService.findId(inventoryId);

    return await this.model.find({ inventoryId : inventoryId }).exec();
  }
}
