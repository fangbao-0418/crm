import React from 'react'
import ContentBox from '@/modules/common/content'
import { Tabs } from 'antd'
import AddButton from '@/modules/common/content/AddButton'
import Direct from './direct'
import DirectDetail from './direct/detail'
import Agent from './agent'
import Accounting from './accounting'
import Modal from 'pilipa/libs/modal'
import AccountingDetail from './accounting/Detail'
import { changeCompanyInfo, changeAccounting } from './api'
const TabPane = Tabs.TabPane
interface States {
  defaultActiveKey: 'direct' | 'agent' | 'accounting'
  showAccountingModal: number // 用于核算中心添加窗口的显示
  showAccounting: boolean
}
class Main extends React.Component<null, States> {
  public state: States = {
    defaultActiveKey: 'direct',
    showAccountingModal: 0,
    showAccounting: true
  }
  public callback (value?: 'direct' | 'agent' | 'accounting') {
    console.log(value, '11111')
    this.setState({
      defaultActiveKey: value
    })
  }
  public add () {
    if (this.state.defaultActiveKey === 'direct') {
      this.addAgent()
    }
    if (this.state.defaultActiveKey === 'agent') { this.addAgent() }
    if (this.state.defaultActiveKey === 'accounting') {
      this.addAccounting()
    }
  }
  public addAgent () {
    const defaultActiveKey = this.state.defaultActiveKey
    const title = defaultActiveKey === 'direct' ? '新增直营公司' : '新增代理商'
    const modal = new Modal({
      content: (
        <DirectDetail
          type={defaultActiveKey}
          onOk={(value) => {
            value.companyType = defaultActiveKey === 'direct' ? 'DirectCompany' : 'Agent'
            changeCompanyInfo(value).then(() => {
              APP.success('操作成功')
              this.setState({
                showAccounting: false
              })
              this.setState({
                showAccounting: true
              })
            })
            modal.hide()
          }}
          onCancel={() => {
            modal.hide()
          }}
        />
      ),
      title,
      mask: true,
      footer: null
    })
    modal.show()
  }
  public addAccounting () {
    const modal = new Modal({
      content: (
        <AccountingDetail
          onOk={(value) => {
            changeAccounting(value).then(() => {
              APP.success('操作成功')
              this.setState({
                showAccounting: false
              })
              this.setState({
                showAccounting: true
              })
              modal.hide()
            })
          }}
          onCancel={() => {
            modal.hide()
          }}
        />
      ),
      title: '新增核算中心',
      mask: true,
      footer: null
    })
    modal.show()
  }
  public render () {
    return (
      <ContentBox
        title='机构管理'
        rightCotent={(
          <AddButton
            hidden={!APP.hasPermission('direct_company_add')}
            title='添加'
            onClick={() => {
              this.add()
            }}
          />
        )}
      >
        <Tabs
          animated={false}
          defaultActiveKey='direct'
          onChange={this.callback.bind(this)}
        >
          <TabPane tab='直营' key='direct'>
            {
              this.state.showAccounting &&
              <Direct />
            }
          </TabPane>
          <TabPane tab='代理商' key='agent'>
            {
              this.state.showAccounting &&
              <Agent />
            }
          </TabPane>
          <TabPane tab='核算中心' key='accounting'>
            {
              this.state.showAccounting &&
              <Accounting showAccountingModal={this.state.showAccountingModal} />
            }
          </TabPane>
        </Tabs>
      </ContentBox>
    )
  }
}

export default Main
