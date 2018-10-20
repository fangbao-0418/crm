import React from 'react'
import { Cascader } from 'antd'
import { CascaderProps } from 'antd/lib/cascader'
import { fetchRegion } from '@/modules/common/api'
interface Props {
  onChange?: (options?: Common.RegionProps[]) => void
  value?: any[]
  style?: React.CSSProperties
}
interface State {
  options: Common.RegionProps[]
}

class Main extends React.Component<Props, State> {
  public state: State = {
    options: []
  }
  public componentWillMount () {
    const value = this.props.value || []
    let selectedOptions: Common.RegionProps[] = []
    fetchRegion().then((res) => {
      res.map((item: Common.RegionProps) => {
        item.isLeaf = false
        if (value.length === 2) {
          if (item.code === String(value[0])) {
            selectedOptions = [item]
          }
        }
      })
      this.setState({
        options: res
      }, () => {
        if (selectedOptions.length > 0) {
          this.loadCityData(selectedOptions)
        }
      })
    })
  }
  public loadCityData (selectedOptions: Common.RegionProps[]) {
    // console.log(selectedOptions, 'selectedOptions')
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    const current = selectedOptions[0]
    fetchRegion({
      parentId: current.code,
      level: 2
    }).then((res) => {
      targetOption.loading = false
      targetOption.children = res
      this.setState({
        options: [...this.state.options]
      })
    })
  }
  public render () {
    const { options } = this.state
    return (
      <Cascader
        style={this.props.style}
        fieldNames={{
          label: 'name',
          value: 'code'
        }}
        placeholder='请选择省份城市'
        options={options}
        loadData={this.loadCityData.bind(this)}
        onChange={(value, selectedOptions: Common.RegionProps[]) => {
          if (this.props.onChange) {
            this.props.onChange(selectedOptions)
          }
        }}
        defaultValue={this.props.value}
        changeOnSelect
      />
    )
  }
}
export default Main
