/**
 * 消息服务
 */
import Service from '@/modules/common/services/service'
import { Map } from '@/modules/outsite/types/outsite'

class ModuleService extends Service {
  // 有全局配置后，再用全局配置
  public pageConf: any = {}
  // 任务分类
  public taskCateDict: Map<string> = {
    TAX:      '税务',
    BUSINESS: '工商',
    OTHERS:   '其他',
    SPECIAL:  '特殊'
  }
  // 任务类别（主任务、子任务)
  public taskTypeDict: Map<string> = {
    MAIN: '主任务',
    SUB:  '子任务'
  }
  // 状态是否启用
  public taskStatusDict: Map<string> = {
    NORMAL:     '正常',
    FORBIDDEN:  '禁用'
  }
  // 优先级
  public taskPriorityDict: Map<string> = {
    OPEN: '是', // '开', // 后台配置 和 前台显示不一致，前台使用 是否
    CLOSE: '否' // '关'
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
