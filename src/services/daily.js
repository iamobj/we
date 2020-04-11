import { fetch as $fetch } from '@/plugins'
import { extractObj } from '@/utils/utils'

// 获取日常
export const reqDailyList = params => {
  const query = extractObj({
    obj: params,
    keys: ['pageSize', 'pageNo'],
    delKey: true
  })
  $fetch.get(`/v1/daily/${params.weId}`, { params: query })
}
