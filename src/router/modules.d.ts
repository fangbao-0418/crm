import { RouteComponentProps } from 'react-router'
type RouteComponent = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
interface ModuleProps {
  Login: RouteComponent
  Logout: RouteComponent
  Index: RouteComponent
  /** 我的客户 */
  Customer: RouteComponent
  /** 商机 */
  Business: RouteComponent
  /** 我的预约 */
  Appointment: RouteComponent
  /** 签约 */
  Signed: RouteComponent
  /** 公海 */
  Open: RouteComponent
  /** 客户设置 */
  CustomerSet: RouteComponent
  /** 分客设置 */
  CustomerSetAssign: RouteComponent
  /** 中心管理 */
  CenterAccount: RouteComponent
  CenterDepartment: RouteComponent
  CenterPermission: RouteComponent
  CenterRole: RouteComponent
  /** 机构 */
  Organ: RouteComponent
  /** 用户中心 */
  UserManage: RouteComponent
  MessageList: RouteComponent
  WorkorderList: RouteComponent
  WorkorderShow: RouteComponent
  TaskList: RouteComponent
  TaskShow: RouteComponent
  TaskForm: RouteComponent
  TasktplList: RouteComponent
  TasktplForm: RouteComponent
  TasktplSublist: RouteComponent
  TasktplSubform: RouteComponent
  PerformList: RouteComponent
  TaskDataOverview: RouteComponent
  TaskDataDetail: RouteComponent
  /** 配置中心 */
  Configure: RouteComponent
  /** 操作日志 */
  OperateLog: RouteComponent
  /** 操作日志详情 */
  OperateLogDetail: RouteComponent
  /** 404 */
  Unfound: RouteComponent
}
/** 组件模块 */
declare const modules: ModuleProps
export default modules