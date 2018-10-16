declare namespace CustomerSet {
  export interface SpecialAssetsProps {
    key?: number
    sourceId?: string
    sourceName?: string
    salesperson: {salespersonId: string, salespersonName: string}[]
    disabled?: boolean
  }
  export interface Props {
    spicalAssetsList: SpecialAssetsProps[]
  }
}