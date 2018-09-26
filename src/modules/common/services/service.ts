/**
 * 基础服务类
 */
// import http from '@/utils/http'
const http = (url: string, method: string = 'GET', data: any = {}) => {
  return $.ajax({
    url,
    method,
    data
  })
}

class Service {
  public static http = http
  constructor () {
  }
}
export default Service
