import React from 'react'
import { Tabs } from 'antd'
import ContentBox from '@/modules/common/content'
import { RouteComponentProps } from 'react-router'
import _ from 'lodash'
import Appointment from './Appointment'
import Expiration from './Expiration'
import Mysign from './Mysign'

interface States {
  tab: string
  infoComplete?: boolean
}

interface ValueProps {
  agencyId?: string
}
type Props = RouteComponentProps
class Main extends React.Component<Props, States> {
  public values: ValueProps = {}
  public curSale: {key: string, label: string} = { key: '', label: ''}
  public state: States = {
    tab: ''
  }
  public componentWillMount () {
    console.log(this.props.location, 'this.props.location')
    console.log(this.props.location.search, 'search')
    if (this.props.location && this.props.location.search) {
      this.setState({
        infoComplete: true
      })
    }
    this.setDefaultActiveTab()
  }
  public setDefaultActiveTab () {
    if (APP.hasPermission('crm_sign_myself_list_select')) {
      this.setState({
        tab: '1'
      })
    } else if (APP.hasPermission('crm_sign_huifang')) {
      this.setState({
        tab: '2'
      })
    } else if (APP.hasPermission('crm_sign_xufei')) {
      this.setState({
        tab: '3'
      })
    }
  }

  public callBack (value: any) {
    this.setState({
      tab: value
    })
  }

  public render () {
    return (
      <ContentBox
        title='签约客户'
      >
        <div className='mb12'>
        <Tabs
          animated={false}
          onChange={this.callBack.bind(this)}
        >
          {
            APP.hasPermission('crm_sign_myself_list_select') &&
            <Tabs.TabPane tab='我的签约' key='1'>
              {
                this.state.tab === '1' &&
                <Mysign infoComplete={this.state.infoComplete}/>
              }
            </Tabs.TabPane>
          }
          {
            APP.hasPermission('crm_sign_huifang') &&
            <Tabs.TabPane tab='预约回访' key='2'>
              {
                this.state.tab === '2' &&
                <Appointment />
              }
            </Tabs.TabPane>
          }
          {
            APP.hasPermission('crm_sign_xufei') &&
            <Tabs.TabPane tab='到期续费' key='3'>
              {
                this.state.tab === '3' &&
                <Expiration />
              }
            </Tabs.TabPane>
          }
        </Tabs>
        </div>
      </ContentBox>
    )
  }
}
export default Main
