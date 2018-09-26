export { default as loadIndex } from 'bundle-loader?lazy&name=[name]!@/modules'
export { default as loadCustomer } from 'bundle-loader?lazy&name=[name]!@/modules/customer'
export { default as loadBusiness } from 'bundle-loader?lazy&name=[name]!@/modules/business'
export { default as loadAppointment } from 'bundle-loader?lazy&name=[name]!@/modules/appointment'
export { default as loadOpen } from 'bundle-loader?lazy&name=[name]!@/modules/open'
export { default as loadSigned } from 'bundle-loader?lazy&name=[name]!@/modules/signed'
export { default as loadSet } from 'bundle-loader?lazy&name=[name]!@/modules/set'

// 中心用户管理
export { default as loadCenterAccount } from 'bundle-loader?lazy&name=[name]!@/modules/center-user-manage/account' // 账户
export { default as loadCenterDepartment } from 'bundle-loader?lazy&name=[name]!@/modules/center-user-manage/department' // 部门
export { default as loadCenterPermission } from 'bundle-loader?lazy&name=[name]!@/modules/center-user-manage/permission' // 权限
export { default as loadCenterRole } from 'bundle-loader?lazy&name=[name]!@/modules/center-user-manage/role' // 角色

// 用户管理
export { default as loadAgentAccount } from 'bundle-loader?lazy&name=[name]!@/modules/user-manage/agent-account' // 代理商账号
export { default as loadDirectAccount } from 'bundle-loader?lazy&name=[name]!@/modules/user-manage/direct-account' // 直营账号

// 消息
export { default as loadMessageList } from 'bundle-loader?lazy&name=[name]!@/modules/message/views/list' // 消息列表

// 工单
export { default as loadWorkorderList } from 'bundle-loader?lazy&name=[name]!@/modules/workorder/views/list' // 工单列表
export { default as loadWorkorderShow } from 'bundle-loader?lazy&name=[name]!@/modules/workorder/views/show' // 工单展示
