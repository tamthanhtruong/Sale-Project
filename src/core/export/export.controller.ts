import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ExportCreateRequest, ExportDeleteRequest,
  ExportGetSingleRequest,
  ExportUpdateRequest,
} from '../../interface/export/export.request';
import { ExportResponseInterface } from '../../interface/export/export.response';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly service: ExportService) {}

  @Post()
  async create(@Body() req: ExportCreateRequest): Promise<ExportResponseInterface> {
    return await this.service.create( req.receiver,
                                      req.invoiceNumber,
                                      req.note,
                                      req.createdUserId,
                                      req.accountantUserId,
                                      req.accConfirmedDate,
                                      req.stockKeeperUserId,
                                      req.stockConfirmedDate,
                                      req.status);
  }

  @Get()
  async getAll(): Promise<ExportResponseInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param() req: ExportGetSingleRequest): Promise<ExportResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: ExportUpdateRequest) {
    return await this.service.update( id,
                                      req.receiver,
                                      req.invoiceNumber,
                                      req.note,
                                      req.createdUserId,
                                      req.accountantUserId,
                                      req.accConfirmedDate,
                                      req.stockKeeperUserId,
                                      req.stockConfirmedDate,
                                      req.status);
  }

  @Delete(':id')
  async delete(@Param() req: ExportDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  @Get('get-all/soft-deleted')
  async getAllSoftDelete(): Promise<ExportResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }

  @Get('create/real-dummy-data')
  async realDummyData() {
    return await this.service.realDummyData();
  }
}
