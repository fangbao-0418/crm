/**
 * 消息服务
 */
import Service from '@/modules/common/services/service'

class ModuleService extends Service {
  // 有全局配置后，再用全局配置
  public pageConf: any = {}
  public taskNameDict: {[index: string]: string} = {
    SHUIWU: '税务',
    GONGSHANG: '工商',
    QITA: '其他',
    TESHU: '特殊'
  }
  constructor () {
    super()
    this.pageConf.pageSize = 10
  }

  public delListByIds (ids: Array<any> = []) {
    return Service.http(`api/remind`, 'DELETE', {ids})
  }

  public getCurrentByUserid (userid: any = '') {
    return Service.http(`api/remind/unread/last/${userid}`)
  }

  public getItemById (id: any = '') {
    return Service.http(`api/remind/${id}`)
  }

  public getListByUserid (userid: any = '', pageConf: any = {pageCurrent: 1}) {
    return Service.http(
      `api/remind/page?
      recipient=${userid}&
      pageCurrent=${pageConf.pageCurrent}&
      pageSize=${this.pageConf.pageSize}`
    )
  }
}

export default new ModuleService()
