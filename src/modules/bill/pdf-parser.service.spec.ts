import { Bill } from '@prisma/client';
import { PdfParser } from './pdf-parser.service';
import {beforeEach, describe, expect, it, vi} from 'vitest'


const mockBill: Bill = {
  id: 1,
  clientNumber: '7005400387',
  date: '7/2023',
  dueDate: '06/09/2023',
  eletricityConsumption: 50,
  eletricityCost: 47.31,
  gdiEnergyConsumption: 370,
  gdiEnergyCost: -180.31,
  fileKey: '',
  fileUrl: '',
  publicContribution: 49.43,
  sceeeeConsumption: 370,
  sceeeeCost: 186.84,
};

describe('Pdf parser test', () => {
  let pdfParser: PdfParser;
  let localFilePath: string;

  beforeEach(async () => {
    pdfParser = new PdfParser();
    localFilePath = 'src/modules/bill/test-file.pdf';
  });

  describe('Read local file', () => {
    it('Should read local file PDF and return the same as mockBill', async () => {
      // prepare
      const result = await pdfParser.parseLocalFile(localFilePath);
      const billEntity: Bill = { ...result, id: 1, fileKey: '', fileUrl: '' };

      // assert
      expect(result.clientNumber).toBe(mockBill.clientNumber);
      expect(billEntity).toStrictEqual(mockBill);
    });
  });
});
