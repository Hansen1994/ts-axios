import { buildURL, transFormRequest, processHeaders } from '@axios/helpers';
import { AxiosRequestConfig, AxiosPromise } from './types';
import xhr from './xhr';
function axios(config: AxiosRequestConfig): AxiosPromise {
  // TODO
  processConfig(config);
  return xhr(config);
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params);
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transFormRequest(config.data);
}

export default axios;
