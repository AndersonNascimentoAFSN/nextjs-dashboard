export enum Operations {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  UPSERT = 'upsert'
}

interface UpdateItems {
  operation: Operations;
  key: string;
  value: string | number | boolean;
}