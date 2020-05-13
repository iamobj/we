import { fetch as $fetch } from '@/plugins'

// 登录用户获取we信息
export const reqWeInfo = params => $fetch.get('/v1/we/access/getWeInfo')
