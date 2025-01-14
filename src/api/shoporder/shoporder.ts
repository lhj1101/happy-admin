import { Get } from "@/utils/http/server"
import { BaseRequestParamsGet } from '@/types/http'

export const userApi = (params = {}) => {
  return Get<BaseRequestParamsGet>({
    url: '/xxx/xxx',
    params
  })
}

