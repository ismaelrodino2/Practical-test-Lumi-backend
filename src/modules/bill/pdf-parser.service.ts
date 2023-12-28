import { Bill } from '@prisma/client';

const CLIENT_NUMBER = 'Nº DO CLIENTE';
const BILL_DATE = 'Referente a';
const DUE_DATE = 'Vencimento';
const ELECTRICITY = 'Energia Elétrica';
const SCEEEE = 'Energia SCEE s/ ICMS';
const GDI_ENERGY = 'Energia compensada GD I';
const CONTRIBUITION = 'Contrib Ilum Publica Municipal';
const months = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

export class PdfParser {
  private getClientNumber(i: number, data: string[]): string {
    return data
      .slice(i + 1)[0]
      .trim()
      .replace(' ', ',')
      .split(',')[0];
  }

  private getBillDate(i: number, data: string[]): string {
    const date = data
      .slice(i + 2)[0]
      .trim()
      .replace(' ', ',')
      .split(',')[0];

    return `${months.indexOf(date.split('/')[0].toLowerCase())}/${
      date.split('/')[1]
    }`;
  }

  private getDueDate(i: number, data: string[]): string {
    return data
      .slice(i + 4)[0]
      .trim()
      .replace(' ', ',')
      .split(',')[0];
  }

  private findValues(data: string[]): Omit<Bill, 'id' | 'fileUrl' | 'fileKey'> {
    let clientNumber = '';
    let billDate = '';
    let dueDate = '';
    let electricityConsumption = 0;
    let electricityCost = 0;
    let sceeeeConsumption = 0;
    let sceeeeCost = 0;
    let gdiEnergyConsumption = 0;
    let gdiEnergyCost = 0;
    let publicContribution = 0;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.trim().includes(CLIENT_NUMBER)) {
        clientNumber = this.getClientNumber(i, data);
      }

      if (item.trim().includes(BILL_DATE)) {
        billDate = this.getBillDate(i, data);
      }

      if (item.trim() == DUE_DATE) {
        dueDate = this.getDueDate(i, data);
      }

      if (item.trim() == ELECTRICITY) {
        electricityConsumption += Number(data[i + 2]);
        electricityCost += Number(data[i + 4].replace(',', '.'));
      }

      if (item.trim() == SCEEEE) {
        sceeeeConsumption += Number(data[i + 2]);
        sceeeeCost += Number(data[i + 4].replace(',', '.'));
      }

      if (item.trim() == GDI_ENERGY) {
        gdiEnergyConsumption += Number(data[i + 2]);
        gdiEnergyCost += Number(data[i + 4].replace(',', '.'));
      }

      if (item.trim() == CONTRIBUITION) {
        publicContribution = Number(data[i + 1].trim().replace(',', '.'));
      }
    }

    return {
      clientNumber,
      date: billDate,
      dueDate,
      eletricityConsumption: electricityConsumption,
      eletricityCost: electricityCost,
      sceeeeConsumption,
      sceeeeCost,
      gdiEnergyConsumption,
      gdiEnergyCost,
      publicContribution,
    };
  }

  async handleParse(
    pdfPath: Express.Multer.File['buffer'],
  ): Promise<Omit<Bill, 'id' | 'fileUrl' | 'fileKey'>> {
    try {
      const reader = await import('pdfreader');
      const pdfReader = new reader.PdfReader({ debug: true });

      const entries = [];
      const entriesPromise = new Promise((resolve, reject) => {
        pdfReader.parseBuffer(pdfPath, (err, item) => {
          if (err) reject(err);
          else if (!item) resolve(entries);
          else if (item.text) entries.push(item.text);
        });
      });

      await entriesPromise;

      return this.findValues(entries);
    } catch (error) {
      console.error('Erro ao processar o PDF:', error);
      throw error;
    }
  }

  async parseLocalFile(
    localFilePath: string,
  ): Promise<Omit<Bill, 'id' | 'fileUrl' | 'fileKey'>> {
    try {
      const reader = await import('pdfreader');
      const pdfReader = new reader.PdfReader({ debug: true });

      const entries = [];
      const entriesPromise = new Promise((resolve, reject) => {
        pdfReader.parseFileItems(localFilePath, (err, item) => {
          if (err) reject(err);
          else if (!item) resolve(entries);
          else if (item.text) entries.push(item.text);
        });
      });

      await entriesPromise;

      return this.findValues(entries);
    } catch (error) {
      console.error('Erro ao processar o PDF:', error);
      throw error;
    }
  }
}
