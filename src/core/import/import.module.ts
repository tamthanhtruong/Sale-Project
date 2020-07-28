import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportSchema } from './import.model';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'imports', schema: ImportSchema}]), UserModule],
  controllers: [ImportController],
  providers: [ImportService],
  exports: [ImportService],
})
export class ImportModule{}
