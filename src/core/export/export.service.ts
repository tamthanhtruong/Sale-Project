import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { ExportResponseInterface } from '../../interface/export/export.response';
import { ExportInterface } from './export.model';

@Injectable()
export class ExportService {

  constructor(@InjectModel('exports') private readonly model: Model<ExportInterface>,) {}

  /* Additional functions */
  async findExport(id: string): Promise<ExportInterface> {
    let exportDoc;
    try {
      // Find Product document by id
      exportDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` ExportID: ${id} is not exist `); // 404
    }
    if(!exportDoc) throw new NotFoundException(` ExportID: ${id} is not exist `); // 404

    return exportDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create( receiver: string,
                invoiceNumber: number,
                note: string,
                createdUserId: string,
                accountantUserId: string,
                accConfirmedDate: number,
                stockKeeperUserId: string,
                stockConfirmedDate: number,
                status: string): Promise<ExportResponseInterface> {

    try {
      // Create new import document
      const newExport = new this.model({receiver,invoiceNumber,note,createdUserId,accountantUserId,accConfirmedDate,stockKeeperUserId,stockConfirmedDate,status});
      return await newExport.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<ExportResponseInterface[]> {
    try {
      // Find documents
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<ExportResponseInterface> {
      // Finds a single document by id
      return await this.findExport(id);
  }

  async update(  id: string,
                 receiver: string,
                 invoiceNumber: number,
                 note: string,
                 createdUserId: string,
                 accountantUserId: string,
                 accConfirmedDate: number,
                 stockKeeperUserId: string,
                 stockConfirmedDate: number,
                 status: string ): Promise<ExportResponseInterface> {

    // Find export document by id
    const exportDoc = await this.findExport(id);
    try {
      // Then update
      exportDoc.receiver = receiver;
      exportDoc.invoiceNumber = invoiceNumber;
      exportDoc.note = note;
      exportDoc.createdUserId = createdUserId;
      exportDoc.accountantUserId = accountantUserId;
      exportDoc.accConfirmedDate = accConfirmedDate;
      exportDoc.stockKeeperUserId = stockKeeperUserId;
      exportDoc.stockConfirmedDate = stockConfirmedDate;
      exportDoc.status = status;
      exportDoc.updatedAt = Date.now();

      return await exportDoc.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find export document by id
    const exportDoc =  await this.findExport(id);
    try {
      // Add deletedAt field
      exportDoc.deletedAt = Date.now();
      await exportDoc.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAllSoftDelete(): Promise<ExportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async realDummyData() {
    const arrData = [
      {
        "receiver" : "Hoa",
        "invoiceNumber" : 3,
        "note" : "Giao hàng",
        "createdUserId" : "5f3e2b01aa5c8b2f64fb1e54",
        "accountantUserId" : "5f3e2b01aa5c8b2f64fb1e54",
        "accConfirmedDate" : 2020,
        "stockKeeperUserId" : "5f3e2b01aa5c8b2f64fb1e54",
        "stockConfirmedDate" : 2020,
        "status" : "Lock"
      }, {
        "receiver" : "Tim",
        "invoiceNumber" : 3,
        "note" : "Giao hàng",
        "createdUserId" : "5f3e2b01aa5c8b2f64fb1e56",
        "accountantUserId" : "5f3e2b01aa5c8b2f64fb1e56",
        "accConfirmedDate" : 2020,
        "stockKeeperUserId" : "5f3e2b01aa5c8b2f64fb1e56",
        "stockConfirmedDate" : 2020,
        "status" : "Lock"
      }, {
        "receiver" : "Lan",
        "invoiceNumber" : 3,
        "note" : "Giao hàng",
        "createdUserId" : "5f3e2b01aa5c8b2f64fb1e57",
        "accountantUserId" : "5f3e2b01aa5c8b2f64fb1e57",
        "accConfirmedDate" : 2020,
        "stockKeeperUserId" : "5f3e2b01aa5c8b2f64fb1e57",
        "stockConfirmedDate" : 2020,
        "status" : "Lock"
      }, {
        "receiver" : "Hồng",
        "invoiceNumber" : 3,
        "note" : "Giao hàng",
        "createdUserId" : "5f3e2b01aa5c8b2f64fb1e57",
        "accountantUserId" : "5f3e2b01aa5c8b2f64fb1e57",
        "accConfirmedDate" : 2020,
        "stockKeeperUserId" : "5f3e2b01aa5c8b2f64fb1e57",
        "stockConfirmedDate" : 2020,
        "status" : "Lock"
      }, {
        "receiver" : "Đào",
        "invoiceNumber" : 3,
        "note" : "Giao hàng",
        "createdUserId" : "5f3e2b01aa5c8b2f64fb1e57",
        "accountantUserId" : "5f3e2b01aa5c8b2f64fb1e57",
        "accConfirmedDate" : 2020,
        "stockKeeperUserId" : "5f3e2b01aa5c8b2f64fb1e57",
        "stockConfirmedDate" : 2020,
        "status" : "Lock"
      }, {
        "receiver" : "Kim",
        "invoiceNumber" : 3,
        "note" : "Giao hàng",
        "createdUserId" : "5f3e2b01aa5c8b2f64fb1e58",
        "accountantUserId" : "5f3e2b01aa5c8b2f64fb1e58",
        "accConfirmedDate" : 2020,
        "stockKeeperUserId" : "5f3e2b01aa5c8b2f64fb1e58",
        "stockConfirmedDate" : 2020,
        "status" : "Lock"
      }, {
        "receiver" : "Hạnh",
        "invoiceNumber" : 3,
        "note" : "Giao hàng",
        "createdUserId" : "5f3e2b01aa5c8b2f64fb1e58",
        "accountantUserId" : "5f3e2b01aa5c8b2f64fb1e58",
        "accConfirmedDate" : 2020,
        "stockKeeperUserId" : "5f3e2b01aa5c8b2f64fb1e58",
        "stockConfirmedDate" : 2020,
        "status" : "Lock"
      }, {
        "receiver" : "Ngọc",
        "invoiceNumber" : 3,
        "note" : "Giao hàng",
        "createdUserId" : "5f3e2b01aa5c8b2f64fb1e59",
        "accountantUserId" : "5f3e2b01aa5c8b2f64fb1e59",
        "accConfirmedDate" : 2020,
        "stockKeeperUserId" : "5f3e2b01aa5c8b2f64fb1e59",
        "stockConfirmedDate" : 2020,
        "status" : "Lock"
      }, {
        "receiver" : "Hoa",
        "invoiceNumber" : 3,
        "note" : "Giao hàng",
        "createdUserId" : "5f3e2b01aa5c8b2f64fb1e59",
        "accountantUserId" : "5f3e2b01aa5c8b2f64fb1e59",
        "accConfirmedDate" : 2020,
        "stockKeeperUserId" : "5f3e2b01aa5c8b2f64fb1e59",
        "stockConfirmedDate" : 2020,
        "status" : "Lock"
      }, {
        "receiver" : "Long",
        "invoiceNumber" : 3,
        "note" : "Giao hàng",
        "createdUserId" : "5f3e2b01aa5c8b2f64fb1e59",
        "accountantUserId" : "5f3e2b01aa5c8b2f64fb1e59",
        "accConfirmedDate" : 2020,
        "stockKeeperUserId" : "5f3e2b01aa5c8b2f64fb1e59",
        "stockConfirmedDate" : 2020,
        "status" : "Lock"
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
