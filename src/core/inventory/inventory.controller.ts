import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  InventoryCreateRequest, InventoryDeleteRequest,
  InventoryGetSingleRequest,
  InventoryUpdateRequest,
} from '../../interface/inventory/inventory.request';
import { InventoryResponseInterface } from '../../interface/inventory/inventory.response';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {
  }

  @Post()
  async create(@Body() req: InventoryCreateRequest): Promise<InventoryResponseInterface> {
    return await this.service.create(req.invoiceNumber, req.note, req.createdUserId, req.status);
  }

  @Get()
  async getAll(): Promise<InventoryResponseInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param() req: InventoryGetSingleRequest): Promise<InventoryResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: InventoryUpdateRequest): Promise<InventoryResponseInterface> {
    return await this.service.update(id, req.invoiceNumber,req.note,req.createdUserId,req.status);
  }

  @Delete(':id')
  async delete(@Param() req: InventoryDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  @Get('get-all/soft-deleted')
  async getAllSoftDelete(): Promise<InventoryResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }

  @Get('create/real-dummy-data')
  async realDummyData() {
    return await this.service.realDummyData();
  }
}
