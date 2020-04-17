import { fetch as $fetch } from '@/plugins'
// import { extractObj } from '@/utils/utils'

// 获取时光
export const reqDailyList = params => $fetch.get('/v1/daily', { params })

// 发布时光
export const reqReleaseDaily = params => $fetch.post('/v1/daily', params)

// 查看时光详情
export const reqDailyDetail = dailyId => $fetch.get(`/v1/daily/${dailyId}`)

// 评论时光
export const reqDailyComment = params => $fetch.post('/v1/dailyComment', params)
