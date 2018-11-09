import { RouteComponentProps } from 'react-router'
type RouteComponent = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
interface ModuleProps {
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
  /** 404 */
  Unfound: RouteComponent
}
/** 组件模块 */
declare const modules: ModuleProps
export default modules