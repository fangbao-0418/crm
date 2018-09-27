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
    EnumContactSource?: Array<{label: string, value: string}>
    EnumCustomerNameType?: Array<{label: string, value: string}>
    EnumCustomerSearchType?: Array<{label: string, value: string}>
    EnumCustomerSource?: Array<{label: string, value: string}>
    EnumCustomerStatus?: Array<{label: string, value: string}>
    EnumCustomerType?: Array<{label: string, value: string}>
    EnumIsValid?: Array<{label: string, value: string}>
    EnumPayTaxesNature?: Array<{label: string, value: string}>
    EnumSignCustomerSearchType?: Array<{label: string, value: string}>
    [type: string]: Array<{label: string, value: string}>
  }
  export let history: CustomHistory
  export let dispatch: (action: DispatchAction) => DispatchAction
  export const success: (msg: string) => void
  export const error: (msg: string) => void
  export let keys: EnumProps
}

