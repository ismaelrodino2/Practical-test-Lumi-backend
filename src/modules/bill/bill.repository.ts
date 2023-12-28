import { Injectable } from '@nestjs/common';
import { Bill } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { SupabaseRepository } from '../../database/supabase/supabase.repository';
import { PdfParser } from './pdf-parser.service';

export abstract class BillRepository {
  abstract create(file: Express.Multer.File): Promise<Bill>;
  abstract findAll(): Promise<Bill[]>;
  abstract findGroup(clientNumber: string): Promise<Bill[]>;
}

@Injectable()
export class BillUsecase extends BillRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pdfParser: PdfParser,
    private readonly supabase: SupabaseRepository,
  ) {
    super();
  }

  async create(file: Express.Multer.File): Promise<Bill> {
    try {
      const pdfInfo = await this.pdfParser.handleParse(file.buffer);

      const { path, publicUrl } = await this.supabase.uploadNewFile(file);

      return this.prisma.bill.create({
        data: {
          ...pdfInfo,
          fileKey: path,
          fileUrl: publicUrl,
        },
      });
    } catch (error) {
      console.error('Error processing the file:', error);
    }
  }

  async findAll() {
    try {
      return this.prisma.bill.findMany();
    } catch (error) {
      console.error('Error finding bills:', error);
    }
  }

  async findGroup(clientNumber: string) {
    try {
      return this.prisma.bill.findMany({
        where: {
          clientNumber: clientNumber,
        },
      });
    } catch (error) {
      console.error('Error finding bills:', error);
    }
  }
}
