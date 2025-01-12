/**
 * API配置对象
 * 用于配置axios实例的基本参数
 */
export const API_CONFIG = {
  baseURL: '/api', // 统一使用 /api 前缀，将通过 vite 代理转发
  timeout: 60000, // 请求超时时间,单位毫秒
  // withCredentials: true, // 跨域请求时是否需要使用凭证
} as const;

/**
 * 内容类型常量
 * 用于设置HTTP请求的Content-Type头
 */
export const CONTENT_TYPE = {
  JSON: 'application/json', // JSON格式
  FORM_DATA: 'multipart/form-data', // 文件上传格式
  URL_ENCODED: 'application/x-www-form-urlencoded', // URL编码格式
} as const; 