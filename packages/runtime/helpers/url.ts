import { isDate, isPlainObject } from '@axios/share';

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url;
  }
  const parts: string[] = [];

  Object.keys(params).forEach((key) => {
    const val = params[key];
    if (val === null || typeof val === 'undefined') {
      return;
    }
    let values = [];
    // 下面就是做多层的转化
    if (Array.isArray(val)) {
      values = val;
      key += '[]';
    } else {
      values = [val];
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString();
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val);
      }
      parts.push(`${encode(key)}=${encode(val)}`);
    });
  });
  // 再进行一个拼接
  let serializedParams = parts.join('&');

  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    // 将每个字符串组拼接起来
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}
