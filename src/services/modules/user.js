import { fetch as $fetch } from '@/plugins'

// 登录
export const reqUserLogin = params => $fetch.post('/v1/user/access/login', params)

// 获取个人信息
export const reqUserInfo = params => $fetch.get('/v1/user/access/getUserInfo', { params })
