import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DetailImportInterface } from './detail-import.model';
import { Model } from 'mongoose';
import { DetailImportResponseInterface } from '../../../interface/import/detail-import/detail-import.response';

@Injectable()
export class DetailImportService {

  constructor(@InjectModel('detail-imports') private readonly model: Model<DetailImportInterface>,) {}

  /* Additional functions */
  async findDetail(id: string): Promise<DetailImportInterface> {
    let detailDoc;
    try {
      // Find Detail-Import document by id
      detailDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` DetailID: ${id} is not exist `); // 404
    }
    if(!detailDoc) throw new NotFoundException(` DetailID: ${id} is not exist `); // 404

    return detailDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create( importId: string,
                productId: string,
                unitProductId: string,
                quantity: number,
                price: number ): Promise<DetailImportResponseInterface> {
    try {
      // Create new import document
      const newDetail = new this.model({importId, productId, unitProductId, quantity, price});
      return await newDetail.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<DetailImportResponseInterface[]> {
    try {
      // Find documents
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<DetailImportResponseInterface> {
      // Find detail-import document by id
      return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    // Check import is existing
    const detail = await this.findDetail(id);
    try {
      // Add deletedAt field
      detail.deletedAt = Date.now();
      await detail.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getDetailImport(importId: string): Promise<DetailImportResponseInterface[]> {
    try {
      // Find documents that same importId
      return await this.model.find({ importId : importId , deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAllSoftDelete(): Promise<DetailImportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async realDummyData() {
    const arrData = [{
      "importId" : "5f3e2d9e148e84170cdcc879",
      "productId" : "5f3e08a73a3804451c193843",
      "unitProductId" : "5f3e05267ec568307c95b70e",
      "quantity" : 20,
      "price" : 5000000
    }, {
      "importId" : "5f3e2c8aad0dd845b487ec06",
      "productId" : "5f3e08a73a3804451c193844",
      "unitProductId" : "5f3e051b7ec568307c95b70d",
      "quantity" : 20,
      "price" : 5000000
    }, {
      "importId" : "5f3e2d9e148e84170cdcc87a",
      "productId" : "5f3e08a73a3804451c193845",
      "unitProductId" : "5f3e05167ec568307c95b70c",
      "quantity" : 20,
      "price" : 5000000
    }, {
      "importId" : "5f3e2d9e148e84170cdcc87b",
      "productId" : "5f3e08a73a3804451c193846",
      "unitProductId" : "5f3e05387ec568307c95b70f",
      "quantity" : 20,
      "price" : 5000000
    }, {
      "importId" : "5f3e2d9e148e84170cdcc87c",
      "productId" : "5f3e08a73a3804451c193847",
      "unitProductId" : "5f3e05417ec568307c95b710",
      "quantity" : 20,
      "price" : 5000000
    }, {
      "importId" : "5f3e2d9e148e84170cdcc87d",
      "productId" : "5f3e08a73a3804451c193848",
      "unitProductId" : "5f3e054a7ec568307c95b711",
      "quantity" : 20,
      "price" : 5000000
    }, {
      "importId" : "5f3e2d9e148e84170cdcc87e",
      "productId" : "5f3e08a73a3804451c193849",
      "unitProductId" : "5f3e05547ec568307c95b712",
      "quantity" : 20,
      "price" : 5000000
    }, {
      "importId" : "5f3e2d9e148e84170cdcc87f",
      "productId" : "5f3e08a73a3804451c19384a",
      "unitProductId" : "5f3e05657ec568307c95b713",
      "quantity" : 20,
      "price" : 5000000
    }, {
      "importId" : "5f3e2d9e148e84170cdcc880",
      "productId" : "5f3e08a73a3804451c19384b",
      "unitProductId" : "5f3e056c7ec568307c95b714",
      "quantity" : 20,
      "price" : 5000000
    }, {
      "importId" : "5f3e2d9e148e84170cdcc881",
      "productId" : "5f3e08a73a3804451c19384c",
      "unitProductId" : "5f3e057b7ec568307c95b715",
      "quantity" : 20,
      "price" : 5000000
    }
    ];
    let i = 0;
    while(i<10) {
      await this.model.insertMany(arrData, function(err) {
        if(err) throw err;
      });
      i++;
    }

    return true;
  };
}
