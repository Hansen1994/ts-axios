import { isPlainObject } from './utils';

export function transFormRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}
