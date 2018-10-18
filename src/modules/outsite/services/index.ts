/**
 * 外勤数据服务
 */
import Service from '@/modules/common/services/service'
import { Map } from '@/modules/outsite/types/outsite'
import _ from 'lodash'

class ModuleService extends Service {
  // 模块名称
  public moduleName: string = 'outside'

  // 有全局配置后，再用全局配置
  public pageConf: any = {}

  // 任务服务状态
  public taskStatusDict: Map<string> = {
    UNDISTRIBUTED: '未分配', // 驳回
    DISTRIBUTED: '已分配', // 初始
    WAITING: '待处理', // 已接收
    APPROVED: '已完成', // （外勤主管审核通过）', // 审批通过
    REFUSED: '已驳回', // （外勤/会计主管驳回）审批不通过
    RUNNING: '进行中', // 接受
    FINISHED: '已交付', // 子任务完成
    CANCELLED: '已取消' // 取消
  }

  // 子任务服务状态
  public subStatusDict: Map<string> = {
    WAITING: '待处理', // 第二个任务初始
    DISTRIBUTED: '已分配', // 第一个任务初始
    RUNNING: '进行中', // 接受
    FINISHED: '已完成', // 完成
    UNAPPROVED: '待审批', // 取消
    REFUSED: '已拒绝', // 取消审批拒绝
    CANCELLED: '已取消' // 取消审批通过
  }

  // 任务模板分类
  public taskTplCateDict: Map<string> = {
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
  public taskTplStatusDict: Map<string> = {
    NORMAL:     '正常',
    FORBIDDEN:  '禁用'
  }
  // 优先级
  public taskTplPriorityDict: Map<string> = {
    OPEN: '是', // '开', // 后台配置 和 前台显示不一致，前台使用 是否
    CLOSE: '否' // '关'
  }

  constructor () {
    super()
    this.pageConf.pageSize = 10
  }

  // 获取外勤人员
  public getWorkerList () {
    return Service.http(`/user/v1/api/user/list/outWorker`)
  }

  // 添加外勤任务
  public addTaskItem (data: any = {}) {
    return Service.http(`/${this.moduleName}/v1/api/outside/task/add`, 'POST', data)
  }

  // 批量删除
  public delListByIds (ids: Array<any> = []) {
    return Service.http(`api/remind`, 'DELETE', {ids})
  }

  // 获取单个任务
  public getItemByTaskid (taskid: any = '') {
    return Service.http(`/${this.moduleName}/v1/api/outside/task/get/${taskid}`)
  }

  // 外勤任务跟进日志
  public getLogByTaskid (taskid: any) {
    return Service.http(`/${this.moduleName}/v1/api/outside/task/logs/${taskid}`)
  }

  // 外勤工单信息详情
  public getWorkorderByTaskid (taskid: any) {
    return Service.http(`/${this.moduleName}/v1/api/order/${taskid}`)
  }

  // 外勤工单信息详情
  public AuditTaskSure (params: any) {
    return Service.http(`/${this.moduleName}/v1/api/outside/task/status/changesub`, 'PUT', params)
  }

  // 获取外勤任务列表
  public getListByCond (conf: Map<string> = {}) {
    const cond = {
      pageSize: 10,
      pageCurrent: 1,
      name: '',
      status: '',
      priority: '',
      origId: ''
    }
    conf = _.extend(cond, conf)
    return Service.http(
      this.createUrl(`/${this.moduleName}/v1/api/outside/task/list`, conf) // ?pageCurrent=当前页码&pageSize=每页显示条数&name=注册公司&status=&priority=OPEN&orgId=1`
    )
  }

  // 获取全部任务列表
  public getTplList (systemFlag: string = '') {
    return Service.http(`${this.moduleName}/v1/api/outside/task/template/all?status=NORMAL&priority=&sytemFlag=${systemFlag}`)
  }

  // 获取任务模板列表
  public getTplListByCond (conf: Map<string> = {}) {
    const cond = {
      pageSize: 10,
      pageCurrent: 1,
      name: '',
      status: '',
      priority: '',
      origId: '',
      systemFlag: '' // 空，全部；0 自定义任务； 1 系统任务
    }
    conf = _.extend(cond, conf)
    return Service.http(
      this.createUrl(`/${this.moduleName}/v1/api/outside/task/template/list`, conf) // ?pageCurrent=当前页码&pageSize=每页显示条数&name=注册公司&status=&priority=OPEN&orgId=1`
    )
  }

  // 获取任务
  public getTplItemById (id: any) {
    return Service.http(
      `/${this.moduleName}/v1/api/outside/task/template/get/${id}`
    )
  }

  // 添加、修改任务模板
  public addTplItem (data: any) {
    if (data.id) {
      return Service.http(
        `/${this.moduleName}/v1/api/outside/task/template/update`,
        'PUT',
        data
      )
    } else {
      return Service.http(
        `/${this.moduleName}/v1/api/outside/task/template/add`,
        'POST',
        data
      )
    }
  }

  // 获取全部子任务列表
  public getTplSublist (conf: Map<string>) {
    const cond = {
      name: '',
      status: 'NORMAL',
      priority: ''
    }
    conf = _.extend(cond, conf)
    return Service.http(
      this.createUrl(`/${this.moduleName}/v1/api/outside/subtask/template/all`, conf) // ?pageCurrent=当前页码&pageSize=每页显示条数&name=注册公司&status=&priority=OPEN&orgId=1`
    ).then((data: any) => {
      data.map((item: any, i: number) => {
        data[i].sort = 0
      })
      return data
    })
  }

  // 按分类分组子任务
  public getTplSublistGroupByCate (data: any) {
    const rst: Map<Array<any>> = {}
    _.forEach(this.taskTplCateDict, (item: any, k: string) => {
      rst[k] = []
    })
    data.map((item: any, i: number) => {
      rst[item.category].push(item)
    })
    console.log('group::', data, rst)
    return rst
  }

  // 获取子任务列表
  public getTplSublistByCond (conf: Map<string> = {}) {
    const cond = {
      pageSize: 10,
      pageCurrent: 1,
      name: '',
      status: '',
      priority: '',
      origId: ''
    }
    conf = _.extend(cond, conf)

    return Service.http(
      this.createUrl(`/${this.moduleName}/v1/api/outside/subtask/template/list`, conf) // ?pageCurrent=当前页码&pageSize=每页显示条数&name=注册公司&status=&priority=OPEN&orgId=1`
    )
  }

  // 获取子任务
  public getTplSubItemById (id: any) {
    // /v1/api/outside/subtask/template/get/{id}
    return Service.http(`/${this.moduleName}/v1/api/outside/subtask/template/get/${id}`) // ?pageCurrent=当前页码&pageSize=每页显示条数&name=注册公司&status=&priority=OPEN&orgId=1`
  }

  // 添加子任务
  public addTplSubItem (data: any) {
    if (data.id) {
      return Service.http(
        `/${this.moduleName}/v1/api/outside/subtask/template/update`,
        'PUT',
        data
      )
    } else {
      return Service.http(
        `/${this.moduleName}/v1/api/outside/subtask/template/add`,
        'POST',
        data
      )
    }
  }

}

export default new ModuleService()
