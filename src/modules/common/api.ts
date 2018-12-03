import http from '@/utils/http'
export const userLogin = (payload: {
  phone: string,
  validCode?: string
}) => {
  return http(`/user/v1/api/login`, 'POST', {
    // contentType: 'application/x-www-form-urlencoded',
    // processData: true,
    // raw: true,
    data: payload
  })
}
export const companylist = (token: string) => {
  return http(`/user/v1/api/user/company/list?token=${token}`)
}
export const userLogout = () => {
  return http(`/user/v1/api/logout`, 'POST', {
    token: APP.token
  })
}
export const fetchSmsVerifyCode = (phone: string) => {
  return http(`/user/v1/api/short/message/send`, 'GET', {
    phone
  })
}
export const fetchUserInfo = () => {
  return Promise.all([
    http(`/user/v1/api/user/info?token=${APP.token}`),
    fetchPermissionCode()
  ]).then(([res, res2]) => {
    APP.user = res
    APP.user.codes = res2
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
/** 获取机构管理状态字典 */
export const fetchOrganStatus = () => {
  return http(`/user/v1/api/company/getCompanyStatus`)
}
export const fetchEnum = () => {
  return Promise.all([
    http(`/crm-manage/v1/api/code-text/list`),
    fetchOrganStatus()
  ]).then(([res, res2]) => {
    const data: any = {}
    res.data.EnumOrganAgentSource = res2
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
  id?: number
} = {
  level: 1
}) => {
  return http(`/config/v1/api/region`, payload)
}
/** 获取登录用户所负责的地区 */
export const fetchOwnRegion = () => {
  return http(`/user/v1/api/user/list/login/province/city`)
}
export const fetchTianYanCompanyList = (name: string) => {
  return http(`/crm-manage/v1/api/tianyan/list?name=${name}`).then((res) => {
    return {
      data: res,
      name
    }
  })
}
export const fetchTianYanDetail = (id: string) => {
  return http(`/crm-manage/v1/api/tianyan/${id}`)
}
export const fetchGovInfo = (url: string) => {
  return http(`/crm-manage/v1/api/gov?url=${url}`)
}
export const fetchOssToken = () => {
  const customerId = APP.user.companyId
  return http(`/crm-manage/v1/api/write-token/${customerId}`)
}
// 根据当前用户获取-->改成不需要传参数接口
export const getSalesList = () => {
  return http(`/user/v1/api/user/list/sale`)
}
/** 根据机构获取销售列表 */
export const getSalesByCompany = (companyId: string = APP.user.companyId) => {
  return http(`/user/v1/api/user/list/company/identity/${companyId}/saleAll`)
}
/** 绑定公司 */
export const bindCompany = (payload: {token: string, companyId: string}) => {
  return http(`/user/v1/api/user/company/bind`, 'POST', payload)
}
