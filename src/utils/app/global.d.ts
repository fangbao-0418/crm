declare namespace APP {
  interface CustomHistory {
    push: (path: string, state?: any) => void
    go (n: number): void
    goBack (): void
    goForward (): void
  }
  export type ActionType =
    'change customer data'
  interface DispatchAction {
    type: ActionType
    payload?: Customer.ActionPayload
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
    [type: string]: Array<{label: string, value: string}>
  }
  interface GlobalFnProps {
    getDateSection (day: number, refer?: Date, format?: string): {startDate: string, endDate: string}
  }
  export const fn: GlobalFnProps
  export let history: CustomHistory
  export let dispatch: (action: DispatchAction) => DispatchAction
  export const success: (msg: string) => void
  export const error: (msg: string) => void
  export let keys: EnumProps
}

