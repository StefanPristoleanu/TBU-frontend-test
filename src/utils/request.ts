import axios, { AxiosRequestHeaders, Method } from 'axios';
type Options = {
  headers?: AxiosRequestHeaders;
  params?: object;
  data?: object;
};

const OptionsDefaults: Options = {
  headers: {},
  params: {},
};

async function request<T = any>(
  method: Method,
  path: string,
  headers: AxiosRequestHeaders = {},
  params: object = {}
): Promise<T> {
  return axios.request({
    method,
    url: path,
    headers,
    params,
  });
}
export class ApiBridge {
  public static get<T = any>(
    path: string,
    options: Options = OptionsDefaults
  ): Promise<T> {
    return request('GET', path, options.headers, options.params);
  }
}
