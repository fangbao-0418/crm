declare namespace CustomerSet {
  export interface SpecialAssetsProps {
    sourceId?: string
    sourceName?: string
    salesPerson: {salespersonId: string, salespersonName: string}[]
    disabled?: boolean
  }
}