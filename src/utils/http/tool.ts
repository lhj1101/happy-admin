import { AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { CONTENT_TYPE } from './config';

/**
 * HTTP错误消息枚举
 * 用于统一管理HTTP请求可能出现的错误提示信息
 */
export enum ErrorMessage {
  BAD_REQUEST = '错误的请求',
  UNAUTHORIZED = '未授权，请重新登录',
  FORBIDDEN = '拒绝访问',
  NOT_FOUND = '请求错误,未找到该资源',
  METHOD_NOT_ALLOWED = '请求方法未允许',
  TIMEOUT = '请求超时',
  SERVER_ERROR = '服务器端出错',
  NETWORK_ERROR = '网络错误',
  SERVICE_UNAVAILABLE = '服务不可用',
  GATEWAY_TIMEOUT = '网络超时',
  HTTP_VERSION_ERROR = 'HTTP版本不支持该请求'
}

/**
 * 处理请求头配置
 * @param config - Axios请求配置对象
 * @returns 更新后的请求配置
 */
export const handleRequestHeader = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers = new AxiosHeaders({
    'Content-Type': CONTENT_TYPE.JSON
  });
  return config;
}

/**
 * 处理请求认证
 * 如果本地存储中有token，则将其添加到请求头中
 * @param config - Axios请求配置对象
 * @returns 更新后的请求配置
 */
export const handleAuth = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = new AxiosHeaders({
      'Content-Type': CONTENT_TYPE.JSON,
      'Authorization': `Bearer ${token}`
    });
  }
  return config;
}

/**
 * 处理网络错误
 * 根据错误状态码返回对应的错误信息
 * @param error - Axios错误对象
 * @returns 错误提示信息
 */
export const handleNetworkError = (error: AxiosError): string => {
  const status = error.response?.status;
  const errMessage = status ? 
    (ErrorMessage[status as unknown as keyof typeof ErrorMessage] || `其他连接错误 --${status}`) : 
    '无法连接到服务器！';
  console.error('Network Error:', errMessage);
  return errMessage;
}

/**
 * 认证错误码映射表
 * 用于统一管理认证相关的错误提示信息
 */
export const AUTH_ERROR_MAP = {
  '10031': '登录失效，需要重新登录', // token 失效
  '10032': '您太久没登录，请重新登录~', // token 过期
  '10033': '账户未绑定角色，请联系管理员绑定角色',
  '10034': '该用户未注册，请联系管理员注册用户',
  '10035': 'code 无法获取对应第三方平台用户',
  '10036': '该账户未关联员工，请联系管理员做关联',
  '10037': '账号已无效',
  '10038': '账号未找到'
} as const;

/**
 * 处理认证错误
 * 检查错误码是否存在于认证错误映射表中，如果存在则输出对应错误信息
 * @param code - 错误码
 * @returns 如果是认证错误返回false，否则返回true
 */
export const handleAuthError = (code: string): boolean => {
  if (code in AUTH_ERROR_MAP) {
    console.error('Auth Error:', AUTH_ERROR_MAP[code as keyof typeof AUTH_ERROR_MAP]);
    // TODO: 在这里处理登出逻辑
    return false;
  }
  return true;
}

/**
 * 处理一般错误
 * 检查响应状态码，如果不是200则视为错误
 * @param code - 响应状态码
 * @param message - 错误信息
 * @returns 如果有错误返回false，否则返回true
 */
export const handleGeneralError = (code: number, message: string): boolean => {
  if (code !== 200) {
    console.error('General Error:', message);
    return false;
  }
  return true;
}