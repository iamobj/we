import { fetch as $fetch } from '@/plugins'

export const reqNoticeList = params => $fetch.get('/v1/notice', { params })
