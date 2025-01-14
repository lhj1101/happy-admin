/**
 * 导入所需的依赖和类型定义
 */
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios'
import { API_CONFIG } from './config'
import { handleRequestHeader, handleAuth, handleAuthError, handleGeneralError, handleNetworkError } from './tool'
import { 
  BaseRequestParamsGet, 
  BaseRequestParamsPost,
  ApiResponse, 
} from '@/types/http'

/**
 * 创建axios实例,应用基础配置
 */
const axiosInstance = axios.create({
  ...API_CONFIG
})

/**
 * 请求拦截器
 * 在发送请求之前做一些处理
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = new AxiosHeaders(config.headers || {});
    config = handleRequestHeader(config) as InternalAxiosRequestConfig;  // 处理请求头
    config = handleAuth(config) as InternalAxiosRequestConfig;          // 处理认证信息
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 在接收响应后做一些处理
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
  if (response.status !== 200) return Promise.reject(response.data)
    handleAuthError(response.data.code)         // 处理认证错误
    handleGeneralError(response.data.code, response.data.message)  // 处理一般错误
    return response
  },
  (error) => {
    handleNetworkError(error)  // 处理网络错误
    return Promise.reject(error)
  }
)

/**
 * GET请求方法
 * @param url 请求地址
 * @param params 请求参数
 * @param config 请求配置
 * @returns Promise<(ApiResponse<T> | undefined)>
 */
export const Get = <T = any>(
  { url, params = {}, config }: BaseRequestParamsGet
): Promise<(ApiResponse<T> | undefined)> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, { 
        params,
        ...config 
      })
      .then((result) => {
        resolve(result.data as ApiResponse<T>)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * POST请求方法
 * @param url 请求地址
 * @param data 请求数据
 * @param config 请求配置
 * @returns Promise<(ApiResponse<T> | undefined)>
 */
export const Post = <T = any>(
  { url, data = {}, config }: BaseRequestParamsPost
): Promise<(ApiResponse<T> | undefined)> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data, config)
      .then((result) => {
        resolve(result.data as ApiResponse<T>)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default axiosInstance