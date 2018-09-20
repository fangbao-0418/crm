interface CustomHistory {
  push: (path: string, state?: any) => void
  go (n: number): void
  goBack (): void
  goForward (): void
}
declare const APP: {
  history: CustomHistory
  dispatch: <A extends {type: any}>(action: A) => A
}
