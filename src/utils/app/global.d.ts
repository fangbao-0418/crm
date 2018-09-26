declare namespace APP {
  interface CustomHistory {
    push: (path: string, state?: any) => void
    go (n: number): void
    goBack (): void
    goForward (): void
  }
  export type ActionType =
    'change customer data' | 'change customer set auto data' | 'change customer set capacity data'
  interface DispatchAction<P = any> {
    type: ActionType
    payload?: Customer.ActionPayload | P
  }
  export interface EnumProps {
    EnumContactSource?: {[index: number]: string}
    EnumCustomerNameType?: {[index: number]: string}
    EnumCustomerSearchType?: {[index: number]: string}
    EnumCustomerSource?: {[index: number]: string}
    EnumCustomerStatus?: {[index: number]: string}
    EnumCustomerType?: {[index: number]: string}
    EnumIsValid?: {[index: number]: string}
    EnumPayTaxesNature?: {[index: number]: string}
    EnumSignCustomerSearchType?: {[index: number]: string}
  }
  export let history: CustomHistory
  export let dispatch: (action: DispatchAction) => DispatchAction
  export const success: (msg: string) => void
  export const error: (msg: string) => void
  export let keys: EnumProps
}

