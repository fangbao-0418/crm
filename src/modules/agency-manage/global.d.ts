declare namespace Organ {
  export interface DirectSearchPayload {
    companyType?: 'Agent' | 'DirectCompany'
    pageCurrent?: number
    pageSize?: number
    regionCity?: number
    name?: string
  }
  export interface AgentItemProps {}
  export interface DirectItemProps {
    name?: string
    regionProvince?: number
    regionCity?: number
    regionProvinceName?: string
    regionCityName?: string
    companyStatus?: string
    address?: string
    email?: string
    /** 开户行 */
    openingBank?: string
    /** 开户支行 */
    branchBank?: string
    /** 开户名称 */
    openingName?: string
    legal?: string
    /** 银行账号 */
    bankNo?: string
    /** 注册资金 */
    assureMoney?: string
    /** 身份证图片路径 */
    cardNoPath?: string
    /** 资质图片路径 */
    qualificationsPath?: string
    /** 营业执照路径 */
    businessLicensePath?: string
    phone?: string
    companyType?: 'Agent' | 'System' | 'DirectCompany'
  }
  export interface PaginationProps {
    total: number
    current: number
    pageSize: number
  }
  export interface Props {
    agent?: {
      dataSource: AgentItemProps[]
      pagination: PaginationProps
    },
    selectedTab?: 'direct' | 'agent' | 'accounting'
  }
}