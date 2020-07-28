import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DetailImportInterface } from './detail-import.model';
import { Model } from 'mongoose';
import { DetailImportResponseInterface } from '../../../interface/import/detail-import/detail-import.response';
import { ImportService } from '../import.service';
import { UnitProductService } from '../../unit-product/unit-product.service';
import { ProductService } from '../../product/product.service';

@Injectable()
export class DetailImportService {
  constructor(@InjectModel('detail-imports') private readonly model: Model<DetailImportInterface>,
                                                    private readonly importService: ImportService,
                                                    private readonly productService: ProductService,
                                                    private readonly unitProductService: UnitProductService) {}

  async create( importId: string, productId: string, unitProductId: string, quantity: number, price: number): Promise<DetailImportResponseInterface> {
    // Check Import is existing
    await this.importService.findId(importId);
    // Check Product is existing
    await this.productService.findId(productId);
    // Check Unit-Product is existing
    await this.unitProductService.findId(unitProductId);
    // Create new import document
    const newDetail = new this.model({importId, productId, unitProductId, quantity, price});
    return await newDetail.save();
  }

  async getAll(): Promise<DetailImportInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<DetailImportResponseInterface> {
    // Find detail-import document by id
    return this.model.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    // Find detail-import document by id
    const findDetail =  await this.model.findById(id);
    if (!findDetail) throw new HttpException(`Not findDetail ${id} in DB`, HttpStatus.NOT_FOUND);

    await this.model.deleteOne({_id: id}).exec();
    return true;
  }

  async getDetail(importId: string): Promise<DetailImportInterface[]> {
    // Check Import is existing
    await this.importService.findId(importId);

    return await this.model.find({ importId : importId }).exec();
  }
}
