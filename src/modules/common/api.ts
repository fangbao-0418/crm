import http from '@/utils/http'
export const userLogin = (payload: {
  phone: string,
  validCode?: string
  phoneValidCode?: string
}) => {
  return http(`/user/v1/api/login`, 'POST', {
    contentType: 'application/x-www-form-urlencoded',
    processData: true,
    raw: true,
    data: payload
  })
}
export const companylist = (token: string) => {
  return http(`/user/v1/api/user/company/list?token=${token}`)
}
export const userLogout = () => {
  return http(`/user/v1/api/logout`, 'POST')
}
export const fetchSmsVerifyCode = (phone: string) => {
  return http(`/user/v1/api/short/message/send`, 'GET', {
    phone
  })
}
export const fetchUserInfo = () => {
  return http(`/user/v1/api/user/info?token=${APP.token}`).then((res) => {
    fetchPermissionCode().then((res2) => {
      console.log(res2)
    })
    APP.user = res
    APP.dispatch({
      type: 'change user info',
      payload: {
        user: res
      }
    })
    return res
  }, () => {
    APP.token = ''
    APP.history.push('/login')
  })
}
export const fetchPermissionCode = () => {
  return http(`/user/v1/api/authority/code?token=${APP.token}`)
}
export const fetchEnum = () => {
  return http(`/crm-manage/v1/api/code-text/list`).then((res) => {
    const data: any = {}
    for (const key in res.data) {
      if (res.data.hasOwnProperty(key)) {
        data[key] = []
        for (const key2 in res.data[key]) {
          if (res.data[key].hasOwnProperty(key2)) {
            APP.dictionary[`${key}-${key2}`] = res.data[key][key2]
            data[key].push({
              label: res.data[key][key2],
              value: key2
            })
          }
        }
      }
    }
    APP.keys = data
    return data
  })
}
export const fetchTags = () => {
  return http(`/crm-manage/v1/api/tags`)
}
export const fetchRegion = (payload: {
  /** 级别 */
  level: number,
  /** 父级id */
  parentId?: string,
  code?: string,
  id?: number
} = {
  level: 1
}) => {
  return http(`/config/v1/api/region`, payload)
}
export const fetchTianYanCompanyList = (name: string) => {
  return http(`/crm-manage/v1/api/tianyan/list?name=${name}`)
}
export const fetchTianYanDetail = (id: string) => {
  return http(`/crm-manage/v1/api/tianyan/${id}`)
}
export const fetchGovInfo = (url: string) => {
  return http(`/crm-manage/v1/api/gov?url=${url}`)
}
export const fetchOssToken = () => {
  const payload = {
    prefix: 'pilipa-crm',
    bucket: 'pilipa-ml',
    durationSeconds: 60 * 60
  }
  const query = $.param(payload)
  return http(`/oss/api/v1/oss/write-token?${query}`)
}
// 根据当前用户获取-->改成不需要传参数接口
export const getSalesList = () => {
  return http(`/user/v1/api/user/list/sale`)
}
// 根据机构获取销售列表
export const getSalesByCompany = (companyid: string) => {
  return http(`/user/v1/api/user/list/company/identity/${companyid}/sale`)
}
