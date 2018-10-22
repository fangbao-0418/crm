import React from 'react'
import { Button } from 'antd'
import AddButton from '@/modules/common/content/AddButton'
import Content from '@/modules/common/content'
import Card from '@/components/Card'
import _ from 'lodash'
import General from './General'
import Special from './Special'
import { connect } from 'react-redux'
import { saveGeneralCapacity } from '../api'
import { getSalesByCompany } from '@/modules/common/api'
interface State {
  diabled: boolean
  sales: Array<{id?: string, name?: string, salespersonId?: string, salespersonName?: string}>
  salesPerson?: Array<{salespersonId: string, salespersonName: string}>
  selectRadio?: number
}
class Main extends React.Component<Customer.Props, State> {
  public state: State = {
    diabled: true,
    sales: [],
    salesPerson: [],
    selectRadio: 0
  }
  public componentWillMount () {
    this.getSalesList()
  }
  public getSalesList () {
    const companyId = APP.user.companyId
    const saleslist: Array<{ id?: string, name?: string, salespersonId?: string, salespersonName?: string}> = []
    getSalesByCompany(companyId).then((res) => {
      for (const i in res) {
        if (res[i]) {
          saleslist.push({
            salespersonId: res[i].id,
            salespersonName: res[i].name
          })
        }
      }
      this.setState({
        // sales: saleslist
        sales: [{ salespersonId: '1', salespersonName: '销售1' }, { salespersonId: '2', salespersonName: '销售2' }]
      })
    })
  }
  public render () {
    return (
      <Content title='分客设置'>
        <Card
          title='一般资源分客策略'
          showFold
          rightContent={(
            <Button
              type='primary'
              onClick={() => {
                console.log(this.state.diabled, 'this.state.diabled')
                if (!this.state.diabled) {
                  console.log(this.state.salesPerson, 'this.state.salesPerson')
                  if (this.state.selectRadio === 2 && !this.state.salesPerson) { // 自定义的时候销售不能为空
                    APP.error('请选择销售')
                    return
                  } 
                  if (this.state.selectRadio === 1) {
                    this.state.salesPerson = []
                  }
                  saveGeneralCapacity(this.state.salesPerson).then(() => {
                    APP.success('操作成功')
                  })
                }
                this.setState({
                  diabled: !this.state.diabled
                })
              }}
            >
              {this.state.diabled ? '编辑' : '保存'}
            </Button>
          )}
        >
          <General
            disabled={this.state.diabled}
            sales={this.state.sales}
            onChange={(values) => {
              console.log(values, 'values')
              this.setState({
                salesPerson: values.salesPerson,
                selectRadio: values.selectradio
              })
            }}
          />
        </Card>
        <Card
          title='特殊资源分客策略'
          showFold
          rightContent={(
            <AddButton
              title='新增'
              onClick={() => {
                const spicalAssetsList = this.props.spicalAssetsList
                let key = _.last(spicalAssetsList) !== undefined ? _.last(spicalAssetsList).key : -1
                key += 1
                spicalAssetsList.push({
                  key,
                  salesperson: []
                })
                APP.dispatch({
                  type: 'change customer data',
                  payload: {
                    spicalAssetsList
                  }
                })
              }}
            />
          )}
        >
          <Special
            sales={this.state.sales}
            disabled={this.state.diabled}
          />
        </Card>
      </Content>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
