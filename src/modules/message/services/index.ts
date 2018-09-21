/**
 * 消息服务
 */
import Service from '@/modules/common/services/service'

class MessageService extends Service {
  constructor () {
    super()
  }

  public getCurrentByUserid (userid: any = '') {
    return Service.http(`./${userid}`)
  }

  public getListByUserid (userid: any = '') {
    return Service.http(`./xxx/list/${userid}`)
  }

  public getItemById (id: any = '') {
    return Service.http(`/123`)
  }
}

export default new MessageService()
