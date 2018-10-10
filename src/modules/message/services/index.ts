/**
 * 消息服务
 */
import Service from '@/modules/common/services/service'

class MessageService extends Service {
  // 删除
  public delListByIds (ids: Array<any> = []) {
    return Service.http(`notification/v1/api/remind`, 'DELETE', {
      data:ids
    })
  }
  // 标记已读
  public readListByIds (ids: Array<any> = []) {
    return Service.http(`notification/v1/api/remind/read`, 'PUT', {
      data: ids
    })
  }
  // 未读消息数
  public countUnreadedByUserid (userid: any = '') {
    return Service.http(`notification/v1/api/remind/unread/${userid}`)
  }
  // 最新消息
  public getCurrentByUserid (userid: any = '') {
    // return Service.http(`notification/v1/api/remind/unread/last/${userid}`) // @181010 变更接口
    return Service.http(`notification/v1/api/remind/prompt/last/${userid}`)
  }
  // 详细详情
  public getItemById (id: any = '') {
    return Service.http(`notification/v1/api/remind/${id}`)
  }
  // 消息列表
  public getListByUserid (userid: any = '', createAt: any = '', pageCurrent: any = '1', pageSize: any = '10') {
    return Service.http(
      `notification/v1/api/remind/page?` +
      `recipient=${userid}&` +
      `createAt=${createAt}&` +
      `pageCurrent=${pageCurrent}&` +
      `pageSize=${pageSize}`
    )
  }
}

export default new MessageService()
