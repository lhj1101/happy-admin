import { Get, Post } from "@/utils/http/server"
import { BaseRequestParamsGet, BaseRequestParamsPost } from '@/types/http'

export const userApi = (params = {}) => {
  return Get<BaseRequestParamsGet>({
    url: '/xxx/xxx',
    params
  })
}

