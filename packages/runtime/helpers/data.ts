import { isPlainObject } from '@axios/share';

export function transFormRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

export function transformResponse(data: any) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data); // 数据转换为对象
    } catch (e) {
      // do nothing
    }
  }
  return data;
}
