import moment from 'moment'
import { md5 } from 'pilipa'
import { Wrapper as OSS } from 'ali-oss'
import { fetchOssToken } from '@/modules/common/api'
// 获取时间区间
export const getDateSection = (str: string, refer: Date = new Date(), format: string = 'YYYY-MM-DD') => {
  const res = String(str).match((/^(\d+)(day|month)?$/))
  if (res === null) {
    return {
      startDate: moment(refer).format(format),
      endDate: moment(refer).format(format)
    }
  }
  const num: any = res[1]
  const type = res[2] || 'day'
  const start = moment(refer).startOf('day')
  const end = moment(refer).startOf('day').add(num, type)
  return {
    startDate: start.format(format),
    endDate: end.format(format)
  }
}

// 生成文件名
export const generateFileName = (file: File, dir: string = '/') => {
  const pattern = 'ABCDEFGHIJKLMNOPQRESUVWXYZabcdefghijklmnopqresuvwxyz1234567890'
  let i = 0
  let random
  let str = ''
  const suffix = file.type.replace('image/', '').replace('jpeg', 'jpg')
  while (i < 10) {
    random = Math.floor(Math.random() * 62)
    str += pattern.charAt(random)
    i++
  }
  const nowTime = new Date().getTime().toString()
  str = md5([file.name, nowTime, str].join('||'))
  return '/' + dir + '/' + str.toUpperCase() + '.' + suffix
}

// oss upload
export const ossUpload = (file: File) => {
  const name = generateFileName(file, '/pilipa-crm')
  fetchOssToken().then((res) => {
    const store = OSS({
      region: 'oss-cn-beijing',
      accessKeyId: res.credentials.accessKeyId,
      accessKeySecret: res.credentials.accessKeySecret,
      stsToken: res.credentials.securityToken,
      bucket: res.bucket
    })
    store.multipartUpload<any, any>(name, file)
  })
}
