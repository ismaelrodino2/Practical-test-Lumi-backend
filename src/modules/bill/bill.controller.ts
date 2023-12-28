import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Bill } from '@prisma/client';
import { BillService } from './bill.service';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  @UseInterceptors(FileInterceptor('pdfFile'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: Bill) {
    return this.billService.create(file);
  }

  @Get('all')
  async findAll() {
    return this.billService.findAll();
  }

  @Get('group')
  async find(@Query() query: Record<string, string>) {
    return this.billService.findGroup(query['clientNumber']);
  }
}
