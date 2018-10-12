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
export const fetchUserInfo = () => {
  return http(`/user/v1/api/user/info`)
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
    console.log(APP.dictionary)
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
