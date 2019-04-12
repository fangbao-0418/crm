import React from 'react'
import { getSalesByCompany, fetchAllCompanyList } from '@/modules/common/api'
import DropDown from 'pilipa/libs/dropdown'
interface Props {
  onChange?: (value: {key: any, title: string}) => void
}
interface State {
  companies: any[]
  value: any
}
class Main extends React.Component<Props, State> {
  public state: State = {
    companies: [],
    value: {}
  }
  public componentWillMount () {
    this.getCompanies()
  }
  public getCompanies () {
    fetchAllCompanyList().then((res) => {
      this.setState({
        companies: res
      })
    })
  }
  public render () {
    const { companies } = this.state
    return (
      <DropDown
        style={{width: 150}}
        type='click'
        data={companies}
        filter
        setFields={{
          key: 'id',
          title: 'name'
        }}
        title={this.state.value.title}
        onChange={(value: {key: any, title: string}) => {
          this.setState({
            value
          })
          if (this.props.onChange) {
            this.props.onChange(value)
          }
        }}
      >
      </DropDown>
    )
  }
}
export default Main
