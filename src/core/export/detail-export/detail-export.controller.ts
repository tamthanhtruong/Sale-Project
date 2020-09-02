import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  DetailExportCreateRequest,
  DetailExportDeleteRequest,
  DetailExportGetDetailExportRequest,
  DetailExportGetSingleRequest,
} from '../../../interface/export/detail-export/detail-export.request';
import { DetailExportResponseInterface } from '../../../interface/export/detail-export/detail-export.response';
import { DetailExportService } from './detail-export.service';

@Controller('detail-export')
export class DetailExportController {
  constructor(private readonly service: DetailExportService) {
  }

  @Post()
  async create(@Body() req: DetailExportCreateRequest): Promise<DetailExportResponseInterface> {
    return await this.service.create( req.exportId, req.productId, req.unitProductId, req.quantity, req.price );
  }

  @Get()
  async getAll(): Promise<DetailExportResponseInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param() req: DetailExportGetSingleRequest) {
      return await this.service.getSingle(req.id);
  }

  @Delete(':id')
  async delete(@Param() req: DetailExportDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  @Get('getDetailExport/:id')
  async getDetailExport(@Param() req: DetailExportGetDetailExportRequest): Promise<DetailExportResponseInterface[]> {
    return await this.service.getDetailExport(req.id);
  }

  @Get('get-all/soft-deleted')
  async getAllSoftDelete(): Promise<DetailExportResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }

  @Get('create/real-dummy-data')
  async realDummyData() {
    return await this.service.realDummyData();
  }
}
