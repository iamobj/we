import { fetch as $fetch } from '@/plugins'

// 登录
export const reqUserLogin = params => $fetch.post('/v1/user/access/login', params)
