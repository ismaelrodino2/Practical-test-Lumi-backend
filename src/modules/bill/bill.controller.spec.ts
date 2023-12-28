import { Test, TestingModule } from '@nestjs/testing';
import { Bill } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { SupabaseController } from '../../database/supabase/supabase';
import { SupabaseRepository } from '../../database/supabase/supabase.repository';
import { BillUsecase } from './bill.repository';
import { BillService } from './bill.service';
import { PdfParser } from './pdf-parser.service';
import {beforeEach, describe, expect, it, vi} from 'vitest'

const mockBill: Bill = {
  id: 0,
  clientNumber: '',
  date: '',
  dueDate: '',
  eletricityConsumption: 0,
  eletricityCost: 0,
  gdiEnergyConsumption: 0,
  gdiEnergyCost: 0,
  fileKey: '',
  fileUrl: '',
  publicContribution: 0,
  sceeeeConsumption: 0,
  sceeeeCost: 0,
};

const db = {
  bill: {
    findMany: vi.fn().mockResolvedValue([mockBill]),
    create: vi.fn().mockReturnValue(mockBill),
  },
};

describe('Bills Controller test', () => {
  let pdfParser: PdfParser;
  let supabase: SupabaseRepository;
  let prisma: PrismaService;
  let billUsecase: BillUsecase;
  let billService: BillService;

  beforeEach(async () => {
    supabase = new SupabaseController();
    pdfParser = new PdfParser();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);
    billUsecase = new BillUsecase(prisma, pdfParser, supabase);
    billService = new BillService(billUsecase);
  });

  describe('create', () => {
    it('insert new Bill and return it', async () => {
      // arrange
      const mockFile = {
        originalname: 'sample.name',
        mimetype: 'sample.type',
        path: 'sample.url',
        buffer: Buffer.from('whatever'),
      };

      vi
        .spyOn(billUsecase, 'create')
        .mockImplementation(async () => mockBill);
      // prepare
      const result = await billService.create(mockFile as Express.Multer.File);

      // assert
      expect(result).toBe(mockBill);
    });
  });

  describe('findAll', () => {
    it('should return an array with mockBill', async () => {
      const result: Bill[] = [mockBill];
      // arrange
      vi.spyOn(billUsecase, 'findAll').mockImplementation(async () => result);
      // prepare
      const request = await billService.findAll();

      // assert
      expect(request).toBe(result);
    });
  });

  describe('findGroup', () => {
    it('should return an empty array', async () => {
      const result: Bill[] = [mockBill];

      // arrange
      vi
        .spyOn(billUsecase, 'findGroup')
        .mockImplementation(async () => result);

      // prepare
      const request = await billService.findGroup('');

      expect(request).toBe(result);
    });
  });
});
