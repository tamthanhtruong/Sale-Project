import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './product.model';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ProductResponseInterface } from '../../interface/product/product.response';

@Injectable()
export class ProductService {

  constructor(@InjectModel('products') private readonly model: Model<ProductInterface>,) {}

  /* Additional functions */
  async findProduct(id: string): Promise<ProductInterface> {
    let productDoc;
    try {
      // Find Product document by id
      productDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` ProductID: ${id} is not exist `); // 404
    }
    if(!productDoc) throw new NotFoundException(` ProductID: ${id} is not exist `); // 404

    return productDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */

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

    // Create the new product
    // try {
      const newProduct = new this.model({categoryId, unitProductId, name, code, originPrice, price, image, information, evaluation, status});
      return await newProduct.save();
    // } catch(e) {
    //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    // }
  }

  async getAll(): Promise<ProductResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
      // return await this.model.find({ deletedAt: null }, null, {sort: {'createdAt': -1}, limit:1000}).exec();
      // return await this.model.find({ deletedAt: null }).sort({'createdAt': -1}).limit(1000).exec();
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<ProductResponseInterface> {
      // Finds a single document by id
      return await this.findProduct(id);
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
    const product = await this.findProduct(id);
    try {
      // Then update
      product.categoryId = categoryId;
      product.unitProductId = unitProductId;
      product.originPrice = originPrice;
      product.price = price;
      product.image = image;
      product.information = information;
      product.evaluation = evaluation;
      product.status = status;
      product.updatedAt = Date.now();

      return await product.save();
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find product document by id
    const product = await this.findProduct(id);
    try {
      // Add deletedAt field
      product.deletedAt = Date.now();
      await product.save();
      return true;
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAllSoftDelete(): Promise<ProductResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async realDummyData() {
    const arrData = [{"categoryId" : "5f44da6b29b56c11b081f51f",
      "unitProductId" : "5f44dbb629b56c11b081f53e",
      "name" : "Hp",
      "code" : "2",
      "originPrice" : 12.365,
      "price" : 1000,
      "image" : "trắng",
      "information" : "bb",
      "evaluation" : "444",
      "status" : "Exist"},
      {"categoryId" : "5f44da8329b56c11b081f520",
        "unitProductId" : "5f44dbbe29b56c11b081f53f",
        "name" : "Hp",
        "code" : "2",
        "originPrice" : 12.365,
        "price" : 1000,
        "image" : "Tím",
        "information" : "bb",
        "evaluation" : "444",
        "status" : "Exist"},
      {"categoryId" : "5f44da8f29b56c11b081f521",
        "unitProductId" : "5f44dbc629b56c11b081f540",
        "name" : "Hp",
        "code" : "2",
        "originPrice" : 12.365,
        "price" : 1000,
        "image" : "trắng",
        "information" : "bb",
        "evaluation" : "444",
        "status" : "Exist"},
      {"categoryId" : "5f44dad429b56c11b081f522",
        "unitProductId" : "5f44dbc729b56c11b081f541",
        "name" : "Hp",
        "code" : "2",
        "originPrice" : 12.365,
        "price" : 1000,
        "image" : "trắng",
        "information" : "bb",
        "evaluation" : "444",
        "status" : "Exist"},
      {"categoryId" : "5f44dadb29b56c11b081f523",
        "unitProductId" : "5f44dbca29b56c11b081f542",
        "name" : "Hp",
        "code" : "2",
        "originPrice" : 12.365,
        "price" : 1000,
        "image" : "trắng",
        "information" : "bb",
        "evaluation" : "444",
        "status" : "Exist"},
      {"categoryId" : "5f44dae629b56c11b081f524",
        "unitProductId" : "5f44dbcb29b56c11b081f543",
        "name" : "Hp",
        "code" : "2",
        "originPrice" : 12.365,
        "price" : 1000,
        "image" : "Vàng",
        "information" : "bb",
        "evaluation" : "444",
        "status" : "Exist"},
      {"categoryId" : "5f44daf329b56c11b081f525",
        "unitProductId" : "5f44dbcc29b56c11b081f544",
        "name" : "Hp",
        "code" : "2",
        "originPrice" : 12.365,
        "price" : 1000,
        "image" : "Vàng",
        "information" : "bb",
        "evaluation" : "444",
        "status" : "Exist"},
      {"categoryId" : "5f44db1429b56c11b081f526",
        "unitProductId" : "5f44dbcd29b56c11b081f545",
        "name" : "Hp",
        "code" : "2",
        "originPrice" : 12.365,
        "price" : 1000,
        "image" : "Xám",
        "information" : "bb",
        "evaluation" : "444",
        "status" : "Exist"},
      {"categoryId" : "5f44db2929b56c11b081f527",
        "unitProductId" : "5f44dbcf29b56c11b081f546",
        "name" : "Hp",
        "code" : "2",
        "originPrice" : 12.365,
        "price" : 1000,
        "image" : "Đen",
        "information" : "bb",
        "evaluation" : "444",
        "status" : "Exist"},
      {"categoryId" : "5f44db3529b56c11b081f528",
        "unitProductId" : "5f44dbd029b56c11b081f547",
        "name" : "Hp",
        "code" : "2",
        "originPrice" : 12.365,
        "price" : 1000,
        "image" : "trắng",
        "information" : "bb",
        "evaluation" : "444",
        "status" : "Exist"},
    ];
    let i = 0;
    while(i<1000) {
      await this.model.insertMany(arrData, function(err) {
        if(err) throw err;
      });
      i++;
    }

     return true;
  };

}
