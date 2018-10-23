interface User {
    uid?: any
    username?: string
}
interface TaskItem {
    id?: any // id   
    subId?: any // 子任务时，id居然是关系表id
    code?: string // 编号 
    name?: string // 名称 
    productId?: string, // 绑定商品id
    productName?: string, // 绑定的商品名称
    category?: string // 分类 同通办任务分类
    customerId?: number // 客户id 
    customerName?: string // 客户名称   
    orderId?: number // 订单id    
    orderNo?: string // 订单编号    
    summary?: string // 备注  
    templateId?: number // 模板id 通办任务id
    parentId?: number // 父节点id  
    userId?: number // 用户id 
    userName?: string // 用户 
    areaId?: number // 区域id 
    priority?: string // 是否优先
    areaName?: string // 区域名称   
    status?: string // 状态   
    startTime?: string // 开始时间  
    endTime?: string // 结束时间    
    workId?: number // 工单id 
    workNo?: string // 工单编号 
    officeId?: number // 机构id   
    officeName?: string // 机构名称 
    contacter?: any // 后台暂不确定
    sort?: any,
    subList?: Array<TaskItem> // 子任务集合  类型为task
    /** 取消原因 */
    cancelReason?: string
    imageUrl?: string
}
type TaskList = Array<TaskItem>

type Func = (...args: Array<any>) => any
type Map<T> = {[index: string]: T}
export {
    TaskItem,
    TaskList,
    Func,
    Map
}
