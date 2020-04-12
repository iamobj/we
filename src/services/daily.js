import { fetch as $fetch } from '@/plugins'
// import { extractObj } from '@/utils/utils'

// 获取日常
export const reqDailyList = params => {
  return $fetch.get('/v1/daily', { params })
}
