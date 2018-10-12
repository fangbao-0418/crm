declare namespace APP {
  interface CustomHistory {
    push: (path: string, state?: any) => void
    go (n: number): void
    goBack (): void
    goForward (): void
  }
  export type ActionType =
   'change user info' | 'change customer data' | 'change business data'
  interface DispatchAction<T = any> {
    type: ActionType
    payload?: T
  }
  export interface EnumProps {
    EnumIntentionality?: Array<{label: string, value: string}>
    EnumContactStatus?: Array<{label: string, value: string}>
    EnumContactSource?: Array<{label: string, value: string}>
    EnumCustomerNameType?: Array<{label: string, value: string}>
    EnumCustomerSearchType?: Array<{label: string, value: string}>
    EnumCustomerSource?: Array<{label: string, value: string}>
    EnumCustomerStatus?: Array<{label: string, value: string}>
    EnumCustomerType?: Array<{label: string, value: string}>
    EnumIsValid?: Array<{label: string, value: string}>
    EnumPayTaxesNature?: Array<{label: string, value: string}>
    EnumSignCustomerSearchType?: Array<{label: string, value: string}>
    EnumNeedStatus?: Array<{label: string, value: string}>
    EnumFollowWay?: Array<{label: string, value: string}>
  }
  type GlobalSessionName = 'token'
  interface StorageProps {
    getItem<P> (key: GlobalSessionName): P
    setItem<P> (key: GlobalSessionName, value: P | string): void
    removeItem (key: GlobalSessionName): void
    clear (): void
  }
  interface DictProps {
    [key: string]: string
  }
  interface GlobalFnProps {
    getDateSection (day: number, refer?: Date, format?: string): {startDate: string, endDate: string}
  }
  export const fn: GlobalFnProps
  export let history: CustomHistory
  export let dispatch: <T>(action: DispatchAction<T>) => DispatchAction<T>
  export const success: (msg: string) => void
  export const error: (msg: string) => void
  export let keys: EnumProps
  export let dictionary: DictProps
  export const env: 'development' | 'production'
  export let token: string
  export let user: Common.UserProps
}

