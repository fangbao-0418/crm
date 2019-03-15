import http from '@/utils/http'
export const makeCall = (payload: {
  customerId: any
  customerName: string
  contactPhone: string
  contactName: string
}) => {
  const query = $.param(payload)
  return http(`/crm-manage/v1/api/makecall?${query}`, 'POST')
}

// 获取TQ配置信息
export const fetchTQconfig = (): JQuery._Promise<{
  status: number,
  message: string,
  data: {
    appid: string,
    access_token: string
    uin: string
    strid: string
    admin_uin: string
    version: number
    errcode: any
  }
}> => {
  return http(`/crm-manage/v1/api/jssdk-token`).then((res) => {
    APP.isConfigTQ = true
    try {
      res.data = JSON.parse(res.data)
    } catch (e) {
      res.data = {}
    }
    return res
  }, (err) => {
    APP.isConfigTQ = false
    return err
  })
}

// TQ通话结束后回调
export const calledCallBack = (payload: {
  callerId: string
  customerId: string
  customerName: string
  contactPhone: string
  contactName: string
}) => {
  return http(`/crm-manage/v1/api/phone/callback`, 'GET', payload)
}

export const mobilCall = (payload: {
  customerId: any,
  customerName: string,
  contactPhone: string,
  contactName: string
}) => {
  const query = $.param(payload)
  return http(`/crm-manage/v1/api/work-mobile/makecall?${query}`, 'POST')
}
