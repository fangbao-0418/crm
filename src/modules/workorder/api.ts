/**
 * 工单
 */
import http from '@/utils/http'
class Service {
  // 有全局配置后，再用全局配置
  public pageConf: any = {}
  constructor () {
    this.pageConf.pageSize = 10
  }

  public delListByIds (ids: Array<any> = []) {
    return http(`api/remind`, 'DELETE', {ids})
  }

  public getCurrentByUserid (userid: any = '') {
    return http(`api/remind/unread/last/${userid}`)
  }

  public getItemById (id: any = '') {
    return http(`api/remind/${id}`)
  }

  public getWorkOrderList () {
    return http(
      `/work/v1/api/order/list`
    )
  }
}

export default new Service()
