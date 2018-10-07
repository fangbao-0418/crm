// common
export { default as loadLogin } from 'bundle-loader?lazy&name=[name]!@/modules/login'

// crm
export { default as loadIndex } from 'bundle-loader?lazy&name=[name]!@/modules'
export { default as loadCustomer } from 'bundle-loader?lazy&name=[name]!@/modules/customer'
export { default as loadBusiness } from 'bundle-loader?lazy&name=[name]!@/modules/business'
export { default as loadAppointment } from 'bundle-loader?lazy&name=[name]!@/modules/appointment'
export { default as loadOpen } from 'bundle-loader?lazy&name=[name]!@/modules/open'
export { default as loadSigned } from 'bundle-loader?lazy&name=[name]!@/modules/signed'
export { default as loadCustomerSet } from 'bundle-loader?lazy&name=[name]!@/modules/customer-set/main'
export { default as loadCustomerSetAssign } from 'bundle-loader?lazy&name=[name]!@/modules/customer-set/assign'

// 中心用户管理
export { default as loadCenterAccount } from 'bundle-loader?lazy&name=[name]!@/modules/center-user-manage/account' // 账户
export { default as loadCenterDepartment } from 'bundle-loader?lazy&name=[name]!@/modules/center-user-manage/department' // 部门
export { default as loadCenterPermission } from 'bundle-loader?lazy&name=[name]!@/modules/center-user-manage/permission' // 权限
export { default as loadCenterRole } from 'bundle-loader?lazy&name=[name]!@/modules/center-user-manage/role' // 角色

// 用户管理
export { default as loadAgentAccount } from 'bundle-loader?lazy&name=[name]!@/modules/user-manage/agent-account' // 代理商账号
export { default as loadDirectAccount } from 'bundle-loader?lazy&name=[name]!@/modules/user-manage/direct-account' // 直营账号

// 机构管理
export { default as loadAgencyManage } from 'bundle-loader?lazy&name=[name]!@/modules/agency-manage' // 机构管理

// 消息
export { default as loadMessageList } from 'bundle-loader?lazy&name=[name]!@/modules/message/views/list' // 消息列表

// 工单
export { default as loadWorkorderList } from 'bundle-loader?lazy&name=[name]!@/modules/workorder/views/list' // 工单列表
export { default as loadWorkorderShow } from 'bundle-loader?lazy&name=[name]!@/modules/workorder/views/show' // 工单展示

// 外勤
export { default as loadTaskList } from 'bundle-loader?lazy&name=[name]!@/modules/outsite/views/task/list' // 任务列表
export { default as loadTaskShow } from 'bundle-loader?lazy&name=[name]!@/modules/outsite/views/task/show' // 任务详情
export { default as loadTaskForm } from 'bundle-loader?lazy&name=[name]!@/modules/outsite/views/task/form' // 添加任务
export { default as loadTasktplList } from 'bundle-loader?lazy&name=[name]!@/modules/outsite/views/tasktpl/list' // 其他任务配置
export { default as loadTasktplForm } from 'bundle-loader?lazy&name=[name]!@/modules/outsite/views/tasktpl/form' // 其他任务配置展示
export { default as loadTasktplSublist } from 'bundle-loader?lazy&name=[name]!@/modules/outsite/views/tasktpl/sublist' // 通办任务配置
export { default as loadTasktplSubform } from 'bundle-loader?lazy&name=[name]!@/modules/outsite/views/tasktpl/subform' // 新增通办任务配置
export { default as loadPerformList } from 'bundle-loader?lazy&name=[name]!@/modules/outsite/views/perform' // 绩效配置
export { default as loadTaskDataOverview } from 'bundle-loader?lazy&name=[name]!@/modules/data-overview' // 数据总览
export { default as loadTaskDataDetail } from 'bundle-loader?lazy&name=[name]!@/modules/data-detail' // 数据明细
