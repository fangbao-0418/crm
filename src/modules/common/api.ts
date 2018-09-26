import http from '@/utils/http'
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
