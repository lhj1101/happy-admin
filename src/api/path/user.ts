import { error } from "console";
import { Get, Post } from "../server"
export function getUserInfo() {
  // return new Promise((resolve, reject) => {
  //   Post (
  //     '/api/userInfo',
  //     {}
  //   )
  //   // .then(res => {
  //   //   console.log('res11', res);
  //   //   resolve(res)
  //   // })
  //   // .catch(error=>{
  //   //   console.log('error22', error);
      
  //   // })
  //   // resolve(
      
  //   // )
  // })
  Get (
    '/dev/app-projectSavior/home/getBanners',
    {}
  )
}
export function getUserName() {
  Get (
    '/api/userInfo',
    {}
  )
}
export const userApi = {
  getUserInfo,
  getUserName
}