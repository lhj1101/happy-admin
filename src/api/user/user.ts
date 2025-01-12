import { Get, Post } from "@/utils/http/server"
import { BaseRequestParams } from '@/types/http'

export const userApi = (data = {}) => {
  return Get<BaseRequestParams>({
    url: '/app-projectSavior/home/getBanners',
    data
  })
}

export const createUser = (data = {}) => {
  return Post<BaseRequestParams>({
    url: '/api/user/create',
    data
  })
}

