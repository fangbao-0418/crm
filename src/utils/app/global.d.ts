declare namespace APP {
  interface CustomHistory {
    push: (path: string, state?: any) => void
    go (n: number): void
    goBack (): void
    goForward (): void
  }
  export type ActionType = 'change customer data'
  interface DispatchAction<P = any> {
    type: ActionType
    payload?: Customer.ActionPayload
  }
  export let history: CustomHistory
  export let dispatch: (action: DispatchAction) => DispatchAction
}

