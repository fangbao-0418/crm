import http, { AjaxConfigProps } from '@/utils/http'
export const fetchEnum = () => {
  return http(`/api/code-text/list`).then((res) => {
    const data: APP.EnumProps = {}
    for (const key in res.data) {
      if (res.data.hasOwnProperty(key)) {
        data[key] = []
        for (const key2 in res.data[key]) {
          if (res.data[key].hasOwnProperty(key2)) {
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
  return http(`/api/tags`)
}
export const fetchRegion = (payload: {
  level: number,
  parentId?: string,
  code?: string,
  id?: number
} = {
  level: 1
}) => {
  return http(`/v1/api/region`, payload)
}