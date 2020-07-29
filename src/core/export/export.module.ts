import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { ExportSchema } from './export.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'exports', schema: ExportSchema}]), UserModule],
  controllers: [ExportController],
  providers: [ExportService],
  exports: [ExportService],
})
export class ExportModule{}
