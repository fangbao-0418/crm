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
  export let history: CustomHistory
  export let dispatch: (action: DispatchAction) => DispatchAction
}

