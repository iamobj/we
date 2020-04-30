import { fetch as $fetch } from '@/plugins'
import { extractObj } from '@/utils/utils'

// 请求消息通知列表
export const reqNoticeList = params => $fetch.get('/v1/notice', { params })

// 更新消息通知数据状态
export const reqNoticeUpdate = params => {
  const query = extractObj({
    obj: params,
    keys: ['id'],
    delKey: true
  })
  return $fetch.put(`/v1/notice/${query.id}`, params)
}

// 获取未读消息通知数量
export const reqNoticeNew = params => $fetch.get('/v1/notice/new', { params })
