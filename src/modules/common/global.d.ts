declare namespace Common {
  export interface UserProps {
    companyName: string
    email: string
    phone: string
    username: string
  }
  export type ActionPayload = Props
  export interface RegionProps {
    code: string
    name: string
    level: number
    id: number
  }
  export interface Props {
    ajaxCount?: number
    user?: UserProps
  }
}