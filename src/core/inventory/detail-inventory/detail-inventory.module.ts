import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../../product/product.module';
import { UnitProductModule } from '../../unit-product/unit-product.module';
import { DetailInventorySchema } from './detail-inventory.model';
import { InventoryModule } from '../inventory.module';
import { DetailInventoryController } from './detail-inventory.controller';
import { DetailInventoryService } from './detail-inventory.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'detail-inventories', schema: DetailInventorySchema}]), InventoryModule, ProductModule, UnitProductModule],
  controllers: [DetailInventoryController],
  providers: [DetailInventoryService],
  exports: [DetailInventoryService],
})
export class DetailInventoryModule {}
