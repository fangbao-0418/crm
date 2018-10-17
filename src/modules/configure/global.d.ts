declare namespace Configure {
  export interface SearchPayload {
    pageCurrent?: number
    pageSize?: number
    typeCode?: string
    sysCode?: string
  }
  export interface TypeProps {
    typeCode: string
    typeName: string
  }
  export interface ItemProps {
    id?: number
    typeCode?: string
    typeName?: string
    value?: string
    name?: string
    sysCode?: string
    sysName?: string
    parentId?: string
    enabled?: boolean
    delFlag?: boolean
    createTime?: any
    updateTime?: any
    createUser?: string
    updateUser?: string
  }
}
