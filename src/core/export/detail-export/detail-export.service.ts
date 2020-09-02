import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DetailExportInterface } from './detail-export.model';
import { DetailExportResponseInterface } from '../../../interface/export/detail-export/detail-export.response';

@Injectable()
export class DetailExportService {

  constructor(@InjectModel('detail-exports') private readonly model: Model<DetailExportInterface>,) {}

  /* Additional functions */
  async findDetail(id: string): Promise<DetailExportInterface> {
    let detailDoc;
    try {
      // Find Product document by id
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
  async create( exportId: string,
                productId: string,
                unitProductId: string,
                quantity: number,
                price: number): Promise<DetailExportResponseInterface> {

    try {
      // Create new export document
      const newDetail = new this.model({exportId, productId, unitProductId, quantity, price});
      return await newDetail.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<DetailExportResponseInterface[]> {
    try {
      // Find documents
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<DetailExportResponseInterface> {
      // Find detail-export document by id
      return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    // Check export is existing
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

  async getDetailExport(exportId: string): Promise<DetailExportResponseInterface[]> {
    try {
      // Then find documents that same exportId
      return await this.model.find({ exportId : exportId, deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAllSoftDelete(): Promise<DetailExportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async realDummyData() {
    const arrData = [
      {
        "exportId" : "5f43d875b751df3274327f4e",
        "productId" : "5f3e08a73a3804451c193843",
        "unitProductId" : "5f3e05547ec568307c95b712",
        "quantity" : 632000,
        "price" : 100000000
      }, {
        "exportId" : "5f43d875b751df3274327f4f",
        "productId" : "5f3e08a73a3804451c193843",
        "unitProductId" : "5f3e05547ec568307c95b712",
        "quantity" : 632000,
        "price" : 50002304
      }, {
        "exportId" : "5f43d875b751df3274327f50",
        "productId" : "5f3e08a73a3804451c193844",
        "unitProductId" : "5f3e05547ec568307c95b712",
        "quantity" : 632000,
        "price" : 9666666
      }, {
        "exportId" : "5f43d875b751df3274327f51",
        "productId" : "5f3e08a73a3804451c193845",
        "unitProductId" : "5f3e05547ec568307c95b712",
        "quantity" : 632000,
        "price" : 800000022
      }, {
        "exportId" : "5f43d875b751df3274327f51",
        "productId" : "5f3e08a73a3804451c193846",
        "unitProductId" : "5f3e05547ec568307c95b712",
        "quantity" : 632000,
        "price" : 4555555556
      }, {
        "exportId" : "5f43d875b751df3274327f50",
        "productId" : "5f3e08a73a3804451c193847",
        "unitProductId" : "5f3e05547ec568307c95b712",
        "quantity" : 632000,
        "price" : 1111112000
      }, {
        "exportId" : "5f43d875b751df3274327f52",
        "productId" : "5f3e08a73a3804451c193848",
        "unitProductId" : "5f3e05547ec568307c95b712",
        "quantity" : 632000,
        "price" : 33333333333
      }, {
        "exportId" : "5f43d875b751df3274327f52",
        "productId" : "5f3e08a73a3804451c193848",
        "unitProductId" : "5f3e05547ec568307c95b712",
        "quantity" : 632000,
        "price" : 7777777777
      }, {
        "exportId" : "5f43d875b751df3274327f53",
        "productId" : "5f3e08a73a3804451c193849",
        "unitProductId" : "5f3e05547ec568307c95b712",
        "quantity" : 632000,
        "price" : 888888888
      }, {
        "exportId" : "5f43d875b751df3274327f53",
        "productId" : "5f3e08a73a3804451c193849",
        "unitProductId" : "5f3e05547ec568307c95b712",
        "quantity" : 632000,
        "price" : 3333333333
      }
    ];
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
