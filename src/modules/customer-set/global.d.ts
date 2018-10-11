declare namespace CustomerSet {
  export interface SpecialAssetsProps {
    sourceId?: number
    sourceName?: string
    salesPersons: {salesPersonId: string, salesPersonName: string}[]
    disabled?: boolean
  }
}