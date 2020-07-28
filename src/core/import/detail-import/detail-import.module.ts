import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DetailImportSchema } from './detail-import.model';
import { ImportModule } from '../import.module';
import { ProductModule } from '../../product/product.module';
import { UnitProductModule } from '../../unit-product/unit-product.module';
import { DetailImportController } from './detail-import.controller';
import { DetailImportService } from './detail-import.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'detail-imports', schema: DetailImportSchema}]), ImportModule, ProductModule, UnitProductModule],
  controllers: [DetailImportController],
  providers: [DetailImportService],
  exports: [DetailImportService],
})
export class DetailImportModule {}
