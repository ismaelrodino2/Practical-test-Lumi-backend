import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SupabaseController } from 'src/database/supabase/supabase';
import { SupabaseRepository } from 'src/database/supabase/supabase.repository';
import { BillController } from './bill.controller';
import { BillRepository, BillUsecase } from './bill.repository';
import { BillService } from './bill.service';
import { PdfParser } from './pdf-parser.service';

@Module({
  controllers: [BillController],
  providers: [
    BillService,
    PrismaService,
    PdfParser,
    BillUsecase,
    { provide: SupabaseRepository, useClass: SupabaseController },
    { provide: BillRepository, useClass: BillUsecase },
  ],
})
export class BillModule {}
