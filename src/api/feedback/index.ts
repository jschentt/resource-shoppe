import http from '@/libs/http/axios'
import type { CreateFeedbackParams } from '@/interfaces/feedback'

enum Api {
  // 创建反馈
  createFeedback = '/v1/web/auth/feedback'
}

/**
 * description: 创建反馈
 */
export function createFeedback(params: CreateFeedbackParams) {
  return http.request(
    {
      url: Api.createFeedback,
      method: 'POST',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}
