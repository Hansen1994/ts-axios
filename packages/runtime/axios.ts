import { AxiosInstance } from './types';
import Axios from './core/Axios';
import { extend } from '@axios/share';

function createInstance(): AxiosInstance {
  const context = new Axios();
  // 指向问题
  const instance = Axios.prototype.request.bind(context);
  // 把所有的内容合并到instance里面并全部返回
  extend(instance, context);
  return instance as AxiosInstance;
}

const axios = createInstance();
console.log(axios, 15);
export default axios;
