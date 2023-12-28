export abstract class SupabaseRepository {
  abstract uploadFile(file: Express.Multer.File): Promise<string>;
  abstract readFile(file: Express.Multer.File): Promise<string>;
  abstract uploadNewFile(
    file: Express.Multer.File,
  ): Promise<{ path: string; publicUrl: string }>;
}

export const SupabaseRepositoryToken = Symbol('SupabaseRepository');
