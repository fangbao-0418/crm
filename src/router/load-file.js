export { default as loadIndex } from 'bundle-loader?lazy&name=[name]!@/modules'
export { default as loadCustomer } from 'bundle-loader?lazy&name=[name]!@/modules/customer'
export { default as loadBusiness } from 'bundle-loader?lazy&name=[name]!@/modules/business'
export { default as loadAppointment } from 'bundle-loader?lazy&name=[name]!@/modules/appointment'
export { default as loadOpen } from 'bundle-loader?lazy&name=[name]!@/modules/open'
export { default as loadSigned } from 'bundle-loader?lazy&name=[name]!@/modules/signed'
export { default as loadSet } from 'bundle-loader?lazy&name=[name]!@/modules/set'

// 中心用户管理
export { default as loadCenterAccount } from 'bundle-loader?lazy&name=[name]!@/modules/centerUserManage/account' // 账户
export { default as loadCenterDepartment } from 'bundle-loader?lazy&name=[name]!@/modules/centerUserManage/department' // 部门
export { default as loadCenterPermission } from 'bundle-loader?lazy&name=[name]!@/modules/centerUserManage/permission' // 权限
export { default as loadCenterRole } from 'bundle-loader?lazy&name=[name]!@/modules/centerUserManage/role' // 角色

// 用户管理
export { default as loadAgentAccount } from 'bundle-loader?lazy&name=[name]!@/modules/userManage/agentAccount' // 代理商账号
export { default as loadDirectAccount } from 'bundle-loader?lazy&name=[name]!@/modules/userManage/directAccount' // 直营账号
