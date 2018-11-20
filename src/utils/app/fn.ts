import moment from 'moment'
import { md5 } from 'pilipa'
import { Wrapper as OSS } from 'ali-oss'
import { fetchOssToken } from '@/modules/common/api'
import { fetchTQconfig } from '@/modules/customer/api'
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
export const ossUpload = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetchOssToken().then((res) => {
      // console.log(res, 'res')
      const store = OSS({
        region: 'oss-cn-beijing',
        accessKeyId: res.credentials.accessKeyId,
        accessKeySecret: res.credentials.accessKeySecret,
        stsToken: res.credentials.securityToken,
        bucket: res.bucket
      })
      const name = generateFileName(file, res.pathPrefix)
      store.put<any, any>(name, file).then((res2: any) => {
        resolve(res2)
      })
    })
  })
}

export const generateKey = <T extends {key?: number}>(arr: T[]): T[] => {
  let key = 0
  const noKeyArr: T[] = []
  arr.map((item) => {
    if (item.key !== undefined) {
      if (item.key > key) {
        key = item.key
      }
    } else {
      noKeyArr.push(item)
    }
  })
  noKeyArr.map((item) => {
    key += 1
    item.key = key
  })
  return arr
}

export const objectToArray = (sourceObject: {[key: string]: any}): {key: string, value: any}[] => {
  const data: {key: string, value: any}[] = []
  for (const key in sourceObject) {
    if (sourceObject.hasOwnProperty(key)) {
      console.log(sourceObject, 'sourceObject')
      data.push({
        key,
        value: sourceObject[key]
      })
    }
  }
  return data
}
export const jsmcInit = (reinit = false) => {
  // APP.jsmc.destroy()
  return fetchTQconfig().then((res) => {
    const data = res.data
    const initOptions = {
      debug: APP.env === 'development',
      uin: data.uin, // tq号 ；与strid其中一个必填
      admin_uin: data.admin_uin, // 管理员TQ号;必填
      appid: '42714805-dd53-4cf3-a470-8e7963971d60', // 开发者id；必填
      access_token: data.access_token, // 秘钥，需从服务器获取；必填
      // server_url: '/sys/crm-manage/v1/api/jsmc'
      server_url: 'http://vip.sh.tq.cn' // ip:port //服务器地址；必填
      // reconnectPeriod: 1000 * 60
    }
    if (reinit) {
      APP.jsmc.reinit(initOptions)
    } else {
      APP.jsmc.init(initOptions)
    }
    return res
  })
}
export const makecall = (phone: string) => {
  return new Promise((resolve, reject) => {
    const makeCallOption = {
      phone, // 外呼电话号码
      error (ret: any) {
        APP.error(ret.errmsg)
        reject(ret)
      },
      success (ret: any) {
        resolve(ret)
      }
    }
    const makeCallCallBack = (ret: any, jsonObject: any) => {
      console.log(ret, jsonObject, 'make call back')
      if (String(ret.errcode) !== '0') {
        if (ret.errmsg === 'USER_BUSY') {
          APP.error('用户繁忙')
        } else {
          APP.error(ret.errmsg)
        }
        reject(ret)
      }
    }
    APP.jsmc.invokeEvent('makecall', makeCallOption, makeCallCallBack)
  })
}

export const round = (num: number, float: number = 2) => {
  const base = Math.pow(10, float)
  return Math.round(num * base) / base
}

export const formatDuration = (second: number, arr: any[] = []): string => {
  const m = 60 * 1000
  const h = m * 60
  const d = h * 24
  let day = 0
  let dif = 0
  let hours = 0
  let minute = 0
  if (second / d >= 1) {
    day = Math.floor(second / d)
    arr.push(`${day}d`)
    dif = second - day * d
    formatDuration(dif, arr)
  } else if (second / h >= 1) {
    hours = Math.floor(second / h)
    arr.push(`${hours}h`)
    dif = second - hours * h
    formatDuration(dif, arr)
  } else if (second / m >= 1) {
    minute = Math.floor(second / m)
    arr.push(`${minute}m`)
    dif = second - minute * m
    formatDuration(dif, arr)
  } else {
    arr.push(`${APP.fn.round((second / 1000), 0)}s`)
  }
  return arr.join(':').replace(/(:0+[dhms])/g, '')
}
