import axios from 'axios'
// import { message } from 'antd'
import {	handleRequestHeader,	handleAuth,	handleAuthError,	handleGeneralError,	handleNetworkError} from './tool'

type Fn = (data: FcResponse<any>) => unknown

interface IAnyObj {
  [index: string]: unknown
}

interface FcResponse<T> {
  errno: string
  errmsg: string
  data: T
}

const baseURL = 'https://www.novlyb.com'

axios.create({
  baseURL: baseURL, // 替换为您的 API 地址
  timeout: 60000 // 请求超时时间
})

axios.interceptors.request.use((config) => {
  console.log('request', config);
  config = handleRequestHeader(config)
  config = handleAuth(config)
  return config
})
axios.interceptors.response.use(
  (response) => {
    console.log('response', response);
    if (response.status !== 200) return Promise.reject(response.data)
    handleAuthError(response.data.errno)
    handleGeneralError(response.data.errno, response.data.errmsg)
    return response
  },
  (err) => {
    console.log('response-err', err);
    handleNetworkError(err.response.status)
    Promise.reject(err.response)
  })

export const Get = <T,>(url: string, params: IAnyObj = {}, clearFn?: Fn) => {
  console.log('get', url, params);
  return new Promise((resolve) => {
    axios
      .get(url, { params })
      .then((result) => {
        let res: FcResponse<T>
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>
        } else {
          res = result?.data as FcResponse<T>
        }
        resolve([null, res as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export const Post = <T,>(url: string, data: IAnyObj, params: IAnyObj = {}) => {
  return new Promise((resolve) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        console.log('result-POST', result);
        
        resolve([null, result?.data as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}