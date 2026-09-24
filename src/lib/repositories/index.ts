import { DataRepository } from './DataRepository';
import { JsonDataRepository } from './JsonDataRepository';
import { SupabaseRepository } from './SupabaseRepository';

let repositoryInstance: DataRepository | null = null;

export function getRepository(): DataRepository {
  if (!repositoryInstance) {
    const mode = process.env.DATA_MODE || 'json';
    if (mode === 'supabase') {
      repositoryInstance = new SupabaseRepository();
    } else {
      repositoryInstance = new JsonDataRepository();
    }
  }
  return repositoryInstance;
}

export type { DataRepository };
export { JsonDataRepository, SupabaseRepository };
