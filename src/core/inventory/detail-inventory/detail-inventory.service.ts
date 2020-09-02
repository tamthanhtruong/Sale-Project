import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DetailInventoryInterface } from './detail-inventory.model';
import { DetailInventoryResponseInterface } from '../../../interface/inventory/detail-inventory/detail-inventory.response';

@Injectable()
export class DetailInventoryService {

  constructor(@InjectModel('detail-inventories') private readonly model: Model<DetailInventoryInterface>,) {}

  /* Additional functions */
  async findDetail(id: string): Promise<DetailInventoryInterface> {
    let detailDoc;
    try {
      // Find Detail-Inventory document by id
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
  async create( inventoryId: string,
                productId: string,
                unitProductId: string,
                quantity: number,
                price: number ): Promise<DetailInventoryResponseInterface> {

    try {
      // Create new inventory document
      const newDetail = new this.model({inventoryId, productId, unitProductId, quantity, price});
      return await newDetail.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<DetailInventoryResponseInterface[]> {
    try {
      // Find documents
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<DetailInventoryResponseInterface> {
      // Find detail-inventory document by id
      return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    // Check inventory is existing
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

  async getDetailInventory(inventoryId: string): Promise<DetailInventoryResponseInterface[]> {
    try {
      // Then find documents that same inventoryId
      return await this.model.find({ inventoryId : inventoryId, deletedAt: null  }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAllSoftDelete(): Promise<DetailInventoryResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async realDummyData() {
    const arrData = [
      {
        "inventoryId" : "5f43dc815934e13b508f3c49",
        "productId" : "5f3e08a73a3804451c193843",
        "unitProductId" : "5f3e05167ec568307c95b70c",
        "quantity" : 360,
        "price" : 40003020
      }, {
        "inventoryId" : "5f43dc815934e13b508f3c4a",
        "productId" : "5f3e08a73a3804451c193843",
        "unitProductId" : "5f3e05167ec568307c95b70c",
        "quantity" : 360,
        "price" : 40003020
      }, {
        "inventoryId" : "5f43dc815934e13b508f3c4a",
        "productId" : "5f3e08a73a3804451c193844",
        "unitProductId" : "5f3e051b7ec568307c95b70d",
        "quantity" : 360,
        "price" : 40003020
      }, {
        "inventoryId" : "5f43dc815934e13b508f3c4b",
        "productId" : "5f3e08a73a3804451c193844",
        "unitProductId" : "5f3e051b7ec568307c95b70d",
        "quantity" : 360,
        "price" : 40003020
      }, {
        "inventoryId" : "5f43dc815934e13b508f3c4c",
        "productId" : "5f3e08a73a3804451c193845",
        "unitProductId" : "5f3e05267ec568307c95b70e",
        "quantity" : 360,
        "price" : 40003020
      }, {
        "inventoryId" : "5f43dc815934e13b508f3c4c",
        "productId" : "5f3e08a73a3804451c193845",
        "unitProductId" : "5f3e05267ec568307c95b70e",
        "quantity" : 360,
        "price" : 40003020
      }, {
        "inventoryId" : "5f43dc815934e13b508f3c4d",
        "productId" : "5f3e08a73a3804451c193846",
        "unitProductId" : "5f3e05387ec568307c95b70f",
        "quantity" : 360,
        "price" : 40003020
      }, {
        "inventoryId" : "5f43dc815934e13b508f3c4d",
        "productId" : "5f3e08a73a3804451c193846",
        "unitProductId" : "5f3e05387ec568307c95b70f",
        "quantity" : 360,
        "price" : 40003020
      }, {
        "inventoryId" : "5f43dc815934e13b508f3c4d",
        "productId" : "5f3e08a73a3804451c193847",
        "unitProductId" : "5f3e05417ec568307c95b710",
        "quantity" : 360,
        "price" : 40003020
      }, {
        "inventoryId" : "5f43dc815934e13b508f3c4d",
        "productId" : "5f3e08a73a3804451c193847",
        "unitProductId" : "5f3e05417ec568307c95b710",
        "quantity" : 360,
        "price" : 40003020
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
