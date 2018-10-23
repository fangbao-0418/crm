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

  /*
  UNDISTRIBUTED 未分配
  DISTRIBUTED 已分配
  WAITING	已接受/待处理
  FINISHED 已完成（外勤主管审批交付通过）
  REFUSED	已驳回 (外勤主管审批交付不通过)
  RUNNING 进行中
  SUBMITED 已交付
  CANCELUNAPPROVED 待审批（取消）
  REJECTUNAPPROVED	待审批（拒绝）
  CANCELED	已取消(外勤主管审批取消通过)
  */

  // 任务服务状态
  public taskStatusDict: Map<string> = {
    /* @181019 太扯了，所有状态都改了！对应的列表、状态和动作映射全部重写！
    UNDISTRIBUTED: '未分配', // 驳回
    DISTRIBUTED: '已分配', // 初始
    WAITING: '待处理', // 已接收
    APPROVED: '已完成', // （外勤主管审核通过）', // 审批通过
    REFUSED: '已驳回', // （外勤/会计主管驳回）审批不通过
    RUNNING: '进行中', // 接受
    FINISHED: '已交付', // 子任务完成
    CANCELLED: '已取消' // 取消
    */
    UNDISTRIBUTED: '未分配',
    DISTRIBUTED: '已分配',
    // WAITING: '已接受/待处理', @181019 第二次修改该处状态
    COLLECTING: '收集资料',
    FINISHED: '已完成', // （外勤主管审批交付通过）
    REFUSED: '已驳回', // (外勤主管审批交付不通过)
    RUNNING: '进行中',
    SUBMITED: '已交付',
    CANCELUNAPPROVED: '待审批', // （取消）
    REJECTUNAPPROVED: '待审批', // （拒绝）
    COMMITED: '已提交', // 已提交 // @181020 后端开始补充
    CANCELED: '已取消' // (外勤主管审批取消通过)
  }

  // 子任务服务状态
  public subStatusDict: Map<string> = {
    /*
    WAITING: '待处理', // 第二个任务初始
    DISTRIBUTED: '已分配', // 第一个任务初始
    RUNNING: '进行中', // 接受
    FINISHED: '已完成', // 完成
    UNAPPROVED: '待审批', // 取消
    REFUSED: '已拒绝', // 取消审批拒绝
    CANCELLED: '已取消' // 取消审批通过
    */
    WAITING: '待处理',
    DISTRIBUTED: '已分配',
    UNDISTRIBUTED: '未分配',
    RUNNING: '进行中',
    FINISHED: '已完成',
    UNAPPROVED: '待审批',
    CANCELED: '已取消'
  }

  // 任务模板分类
  public taskTplCateDict: Map<string> = {
    TAX: '税务',
    BUSINESS: '工商',
    OTHERS: '其他',
    SPECIAL: '特殊'
  }
  // 任务类别（主任务、子任务)
  public taskTypeDict: Map<string> = {
    MAIN: '主任务',
    SUB:  '子任务'
  }
  // 状态是否启用
  public taskTplStatusDict: Map<string> = {
    NORMAL:     '启用', // '正常',
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

  /*
  ACCEPT 接受
  REFUSE 驳回
  REFUSEAPPROVE 驳回审批通过
  REFUSEUNAPPROVE 驳回审批不通过
  CANCEL 取消
  CANCELAPPROVE 取消审批通过
  CANCELUNAPPROVE 取消审批不通过
  ------ 以上废弃
  ACCEPT 接受 已分配
  REJECT 拒绝(外勤人员app拒绝)	已分配
  REJECTAPPROVE	拒绝审批通过 拒绝待审批
  REJECTUNAPPROVE 拒绝审批不通过 拒绝待审批
  CANCEL 取消 已分配
  CANCELAPPROVE 取消审批通过 取消待审批
  CANCELUNAPPROVE 取消审批不通过 取消待审批
  SUBMITAPPROVE	提交审批通过	已提交
  SUBMITUNAPPROVE	提交审批不通过	已提交

  状态 -》 动作 对应关系
  ACCEPT 接受 已分配
REFUSE 驳回	已分配
REFUSEAPPROVE	驳回审批通过 已驳回
REFUSEUNAPPROVE 驳回审批不通过 已驳回
CANCEL 取消 除已完成都可以
CANCELAPPROVE 取消审批通过 已取消
CANCELUNAPPROVE 取消审批不通过 已取消
SUBMITAPPROVE	提交审批通过	已提交
SUBMITUNAPPROVE	提交审批不通过	已提交
------- 以前对应关系 废弃
ACCEPT 接受 已分配
REJECT 拒绝(外勤人员app拒绝)	已分配
REJECTAPPROVE	拒绝审批通过 拒绝待审批
REJECTUNAPPROVE 拒绝审批不通过 拒绝待审批
CANCEL 取消 已分配
CANCELAPPROVE 取消审批通过 取消待审批
CANCELUNAPPROVE 取消审批不通过 取消待审批
SUBMITAPPROVE	提交审批通过	已提交
SUBMITUNAPPROVE	提交审批不通过	已提交
  */
  // 根据任务状态，获取当前能进行的操作
  public getActionByStatus (status: string = '') {
    const status2act: Map<any> = {
      // 驳回审批
      REJECTPENDING: {
        YES: 'REJECTAPPROVE',
        NO: 'REJECTUNAPPROVE'
      },
      // 取消审批
      CANCELLED: {
        YES: 'CANCELAPPROVE',
        NO: 'CANCELUNAPPROVE'
      },
      // 完成审批
      SUBMITED: {
        YES: 'SUBMITAPPROVE',
        NO: 'SUBMITUNAPPROVE'
      }
    }
    return status2act[status]
  }
  // 审批：取消、驳回、完成
  public auditTaskByTaskidStatus (id: any = '', status: string = '', rst: 'YES' | 'NO' = 'YES') {
    // act: 'REFUSE' | 'REFUSEAPPROVE' | 'REFUSEUNAPPROVE' | 'CANCEL' | 'ACCEPT' | 'CANCELAPPROVE' | 'CANCELUNAPPROVE') {
    let act = this.getActionByStatus(status)
    if (!act) {return}
    act = act[rst]
    return Service.http(`/${this.moduleName}/v1/api/outside/task/status/changemain`, 'PUT', {id, status: act})
  }

  // 根据订单号，模糊查询
  /*
  {
    'orderCode': 'TJxdfdsafds',
    'customerOrgId': 341341431,
    'customerOrgName': '天津小菜有限公司',
    'cityCode' : '201000',

    'cityName' : '天津'
    'countyCode': '201001',
    'countyName':'蓟县'
  }
  */
  public getOrderItemByOrderNO (orderCode: string = '') {
    const item = {
      orderCode: 'TJxdfdsafds',
      customerOrgId: 341341431,
      customerOrgName: '天津小菜有限公司',
      cityCode : '201000',
      cityName: '天津',
      countyCode: '201001',
      countyName:'蓟县'
    }
    return Service.http(`/shop-order/v1/api/shop/order/orders/like?orderCode=${orderCode}`).then((res: any) => {
      // return res && res.data ? res.data.records : []
      const arr = ['a1', 'a2', 'a3', 'a4', 'a5']
      console.log(arr)
      return arr.map((x: any) => {
        const y = _.clone(item)
        y.orderCode = x
        return y
      })
    })
  }

  // 获取当前登录人可操作的商品列表
  public getProductList () {
    return Service.http(`/${this.moduleName}/v1/api/outside/task/template/product/list`)
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
  public getItemByTaskid (taskid: string) {
    return Service.http(`/${this.moduleName}/v1/api/outside/task/get/${taskid}`)
  }

  // 外勤任务跟进日志
  public getLogByTaskid (taskid: string) {
    return Service.http(`/${this.moduleName}/v1/api/outside/task/record/${taskid}`)
  }

  // 外勤工单信息详情
  public getWorkorderByTaskid (taskid: any) {
    return Service.http(`/${this.moduleName}/v1/api/order/${taskid}`)
  }

  // 外勤工单信息详情
  public auditTaskSure (payload: {
    id: number,
    status: string
  }) {
    return Service.http(`/${this.moduleName}/v1/api/outside/task/status/changesub`, 'PUT', payload)
  }

  // 转接任务
  public transferTasksPer (payload: {
    userid: number,
    ids: number[]
  }) {
    const ids = payload.ids.join(',')
    return Service.http(`/${this.moduleName}/v1/api/outside/task/user/${payload.userid}?ids=${ids}`, 'PUT')
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
  public getTplSublist (conf: Map<string> = {}) {
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
