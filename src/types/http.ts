import { AxiosRequestConfig } from 'axios'

// 基础请求参数接口
export interface BaseRequestParamsGet {
  url: string
  params?: Record<string, unknown>
  config?: Partial<RequestConfig>
}

export interface BaseRequestParamsPost {
  url: string
  data?: Record<string, unknown>
  config?: Partial<RequestConfig>
}

// 扩展的请求配置接口
export interface RequestConfig extends AxiosRequestConfig {
  skipErrorHandler?: boolean
  skipAuthCheck?: boolean
}

// API响应数据的通用接口
export interface ApiResponse<T = any> {
  code: string
  message: string
  data: T
  success: boolean
}

// 通用对象接口
export interface IAnyObj {
  [index: string]: unknown
} 