import http from '@/utils/http'
export const fetchList = (payload: {
  beginDate?: string
  endDate?: string
  customerName?: string
  cityCode?: string
  contactPerson?: string
  contactPhone?: string
  payTaxesNature?: string
  customerSource?: string
  pageSize?: number
  pageCurrent?: number
}) => {
  return http(`/crm-manage/v1/api/customer/list`, 'GET', payload)
}
export const addCustomer = (payload: Customer.DetailProps) => {
  return http(`/crm-manage/v1/api/customer/entry`, 'POST', {
    data: payload
  })
}
export const addBusinessCustomer = (payload: Customer.DetailProps) => {
  return http(`/crm-manage/v1/api/business-opportunity/entry`, 'POST', {
    data: payload
  })
}
export const allotCustomer = (payload: {
  agencyId?: string
  customerIds?: string[]
  salesPerson?: Array<{
    id: string
    name: string
  }>
}, type?: number) => {
  return http(`/crm-manage/v1/api/customer/allocate/${type}`, 'PUT', {data: payload})
}
export const getSaleCapacity = (payload: {
  agencyId?: string
  customerNum?: number
  salesPersons?: string
}) => {
  return http(`/crm-manage/v1/api/storage_capacity/residue`, 'GET', {data: payload})
}
export const deleteCustomer = (payload: string) => {
  return http(`/crm-manage/v1/api/customer/by-ids?customerIds=${payload}`, 'DELETE')
}
export const viewCustomer = (id: string) => {
  return http(`/crm-manage/v1/api/open-ocean/${id}`)
}
export const updateCustomer = (id: string, payload: Customer.DetailProps) => {
  payload.currentSalesperson = ''
  return http(`/crm-manage/v1/api/customer/${id}`, 'PUT', {
    data: payload
  })
}
export const fetchCityCount = () => {
  return http(`/crm-manage/v1/api/customer/stats/by-city`)
}
export const importFile = (file: File, query: {
  c?: string,
  cityName?: string,
  agencyId?: string,
  salesPersonIds: string,
  salesPersonNames: string,
  customerSource: string,
  [field: string]: string
}, type: string) => {
  const data = new FormData()
  // const q = $.param(query)
  data.append('file', file)
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      data.append(key, query[key])
    }
  }
  return http(`/crm-manage/v1/api/customer/upload/${type}`, 'POST', {
    contentType: false,
    processData: false,
    data
  })
}
export const fetchTrackRecords = (id: string, payload: {
  pageNum?: number
  pageSize?: number
}) => {
  return http(`/crm-manage/v1/api/track-record/${id}`, 'GET', payload)
}
export const fetchClueRecords = (id: string, payload: {
  pageNum?: number
  pageSize?: number
}) => {
  return http(`/crm-manage/v1/api/clue-records/${id}`, 'GET', payload)
}
// 通话记录
export const fetchCallRecords = (id: string, payload: {
  pageNum?: number
  pageSize?: number
}) => {
  return http(`/crm-manage/v1/api/call-details/${id}`, 'GET', payload)
}
export const allocateAuto = (payload: Array<{id: string, customerName: string, cityCode: string, customerSource: string}>
) => {
  return http(`/crm-manage/v1/api/customer/allocate-auto`, 'PUT', payload)
}
// 根据城市获取机构列表
export const getCompanyByCitycode = (citycode: string) => {
  return http(`/user/v1/api/company/list/region/region_city/${citycode}`)
}
// 获取所有机构列表直营代理商
export const getAllCompany = () => {
  return http(`/user/v1/api/company/list/all`)
}
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
