import { Injectable } from '@nestjs/common';
import { Bill } from '@prisma/client';
import { BillRepository } from './bill.repository';

@Injectable()
export class BillService {
  constructor(private readonly billUsecase: BillRepository) {}

  async create(file: Express.Multer.File): Promise<Bill> {
    try {
      return this.billUsecase.create(file);
    } catch (error) {
      console.error('Error processing the file:', error);
    }
  }

  async findAll() {
    return this.billUsecase.findAll();
  }

  async findGroup(clientNumber: string) {
    return this.billUsecase.findGroup(clientNumber);
  }
}
