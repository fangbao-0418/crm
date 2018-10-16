declare namespace Organ {
  export interface AgentItemProps {}
  export interface PaginationProps {
    total: number
    current: number
    pageSize: number
  }
  export interface Props {
    agent: {
      dataSource: AgentItemProps[]
      pagination: PaginationProps
    },
    selectedTab: 'direct' | 'agent' | 'accounting'
  }
}