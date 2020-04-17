import { fetch as $fetch } from '@/plugins'
// import { extractObj } from '@/utils/utils'

// 获取日常
export const reqDailyList = params => $fetch.get('/v1/daily', { params })

// 发布日常
export const reqReleaseDaily = params => $fetch.post('/v1/daily', params)
