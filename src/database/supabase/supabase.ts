import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseRepository } from './supabase.repository';

@Injectable()
export class SupabaseController extends SupabaseRepository {
  static supabaseUrl = process.env.SUPABASE_URL;
  static supabaseKey = process.env.SUPABASE_ANON_KEY;

  constructor() {
    super();
  }

  private readonly client: SupabaseClient = new SupabaseClient(
    SupabaseController.supabaseUrl,
    SupabaseController.supabaseKey,
  );

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const request = await this.client.storage
        .from('pdfs')
        .upload(file.originalname, file.buffer, {
          contentType: 'application/pdf',
          upsert: true,
        });

      return request.data.path;
    } catch (error) {
      throw error;
    }
  }

  async readFile(file: Express.Multer.File): Promise<string> {
    try {
      const path = await this.uploadFile(file);
      const { data: url } = this.client.storage.from('pdfs').getPublicUrl(path);

      return url.publicUrl;
    } catch (error) {
      throw error;
    }
  }

  async uploadNewFile(
    file: Express.Multer.File,
  ): Promise<{ path: string; publicUrl: string }> {
    try {
      const path = await this.uploadFile(file);
      const publicUrl = await this.readFile(file);

      return { path, publicUrl };
    } catch (error) {
      throw error;
    }
  }
}
