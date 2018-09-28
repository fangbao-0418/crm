/**
 * 消息服务
 */
import Service from '@/modules/common/services/service'

class WorkOrderService extends Service {
  constructor () {
    super()
  }

  public getListByUserid (userid: any = '') {
    return Service.http(`./xxx/list/${userid}`)
  }
}

export default new WorkOrderService()
