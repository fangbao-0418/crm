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

export const makecall = (phone: string) => {
  // APP.tq.destroy()
  const initOptions = {
    debug: true, // default:false 是否开启调试模式
    strid: '9817482', // 用户名；与uin其中一个必填
    // uin: '9817482', // tq号 ；与strid其中一个必填
    admin_uin: '9786987', // 管理员TQ号;必填
    appid: '42714805-dd53-4cf3-a470-8e7963971d60', // 开发者id；必填
    access_token: '649EEB3D1C87337F48C251FD73783B61CDF10E9EC5024142E3DB231C92263214779A95275F87ABB31193CF7321A25EC4', // 秘钥，需从服务器获取；必填
    server_url: 'http://vip.sh.tq.cn', // ip:port //服务器地址；必填
    reconnectPeriod: 1000 * 60
  }
  APP.tq.init(initOptions)
  const makeCallOption = {
    phone, // 外呼电话号码
    error (ret: any) {
      console.log(ret, 'error')
    },
    success (ret: any) {
      console.log(ret, 'success')
      // 参数ret ：{"errcode":"0","errmsg":" 操作成功! "}
    }
  }
  const makeCallCallBack = (ret: any, jsonObject: any) => {
    console.log(ret, 'make call back')
    // 返回值ret示例：
    // {"call_id":"7f9d0fac-28c0-11e7-9b0b-a7bde87e7c89","errcode":0,"errmsg":"OK"}};
    // jsonObject对象示例：
    // {"strid":"seat01","uin":8000001,"admin_uin":8000000,"phone":"13711110000"}
  }
  APP.tq.invokeEvent('makecall', makeCallOption, makeCallCallBack)
}
