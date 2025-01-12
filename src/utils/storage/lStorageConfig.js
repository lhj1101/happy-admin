export const lStorageConfig = {
  state: {
    name: import.meta.env.VITE_LS_STORAGE_KEY + '-' || 'SYSTEM-', // 系统前缀
    expireTimeList: import.meta.env.VITE_LS_STORAGE_KEY + '-EXPIRE-TIME-LIST' || 'SYSTEM-EXPIRE-TIME-LIST', // ls过期时间合集
    time: 86400, // 单位秒，默认一天
  },
  // 需要配置key才能setls
  keys: {
    token: 'token',
    name: 'name',
    password: 'password',
  }
}