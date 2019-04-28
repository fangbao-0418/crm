import React from 'react'
import { Button, Select } from 'antd'
import AddButton from '@/modules/common/content/AddButton'
import Content from '@/modules/common/content'
import Card from '@/components/Card'
import _ from 'lodash'
import General from './General'
import Special from './Special'
import { connect } from 'react-redux'
import { saveGeneralCapacity } from '../api'
import { getSalesByCompany, fetchAllCompanyList } from '@/modules/common/api'
import Company from '@/modules/common/content/Company'
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
    selectRadio: -1
  }
  public refs: {
    general: any,
    special: any
  }
  public special: any
  public companyId: any = APP.user.companyId
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
        sales: saleslist
      })
    })
  }
  public render () {
    return (
      <Content title='分客设置'>
        {APP.user.companyId === '0' && <div>
          <Company
            defaultValue={APP.user.companyId}
            type='all'
            onChange={(value) => {
              const key = value
              this.companyId = key
              this.refs.general.getSelectSaleList(key)
              this.special.fetchData(key)
            }}
          />
        </div>}
        <Card
          title='一般资源分客策略'
          showFold
          rightContent={(
            <Button
              type='primary'
              onClick={() => {
                if (!this.state.diabled) {
                  if (this.state.selectRadio === 3) { // 公海
                    saveGeneralCapacity(1, [], this.companyId).then(() => {
                      APP.success('操作成功')
                    })
                  } else {
                    if (this.state.selectRadio === 2 && !this.state.salesPerson) { // 自定义的时候销售不能为空
                      APP.error('请选择销售')
                      return
                    }
                    if (this.state.selectRadio === 1) {
                      this.state.salesPerson = []
                    }
                    if (this.state.selectRadio === 1 || this.state.selectRadio === 2) {
                      saveGeneralCapacity(0, this.state.salesPerson, this.companyId).then(() => {
                        APP.success('操作成功')
                      })
                    }
                  }
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
            ref='general'
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
                  disabled: false,
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
            getInstance={(ins) => {
              this.refs.special = ins
              this.special = ins
              console.log(this.refs, 'refs')
            }}
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
