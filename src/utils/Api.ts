import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { BASE_URL } from 'store/api';

const getAccessToken = () => {
  const data: any = localStorage.getItem('tokenObj');
  return JSON.parse(data)?.accessToken;
};

const setTokenInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: any) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => Promise.reject(error)
  );
};

export class Api {
  static instance: Api;

  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 30000,
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setTokenInterceptors(this.axiosInstance);
  }

  static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  static getAxios(): AxiosInstance {
    return Api.getInstance().axiosInstance;
  }
  static setAuthToken(token: string | null) {
    //@ts-ignore
    Api.getAxios().defaults.headers.Authorization = `Bearer ${token}`;
  }
  static get<T = any>(url: string, params: Record<string, any> = {}, config: AxiosRequestConfig = {}): AxiosPromise<T> {
    return Api.getAxios().get(url, { params, ...config });
  }

  static delete<T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise<T> {
    return Api.getAxios().delete(url, { params, ...config });
  }

  static post<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().post(url, data, config);
  }

  static put<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().put(url, data, config);
  }

  static patch<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().patch(url, data, config);
  }
}
