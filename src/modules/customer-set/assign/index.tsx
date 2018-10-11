import React from 'react'
import { Button } from 'antd'
import AddButton from '@/modules/common/content/AddButton'
import Content from '@/modules/common/content'
import Card from '@/components/Card'
import General from './General'
import Special from './Special'
import { connect } from 'react-redux'

class Main extends React.Component<Customer.Props> {
  public state = {
    diabled: true
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
                this.setState({
                  diabled: !this.state.diabled
                })
              }}
            >
              {this.state.diabled ? '编辑' : '保存'}
            </Button>
          )}
        >
          <General disabled={this.state.diabled} />
        </Card>
        <Card
          title='特殊资源分客策略'
          showFold
          rightContent={(
            <AddButton
              title='新增'
              onClick={() => {
                const spicalAssetsList = this.props.spicalAssetsList
                spicalAssetsList.push({
                  salesPersons: []
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
          <Special disabled={this.state.diabled} />
        </Card>
      </Content>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
