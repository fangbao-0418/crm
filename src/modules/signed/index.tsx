import React from 'react'
import { Button, Tabs, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import Modal from 'pilipa/libs/modal'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SelectSearch from './SelectSearch'
import SearchName from '@/modules/common/search/SearchName'
import Provider from '@/components/Provider'
import View from './detail'
import { fetchList, toOther, fetchWorkers } from './api'
import _ from 'lodash'
import moment from 'moment'
import Appointment from './Appointment'
import Expiration from './Expiration'
import Mysign from './Mysign'

type DetailProps = Signed.DetailProps
const Option = Select.Option
interface States {
  defaultActiveKey: string
  tab: string
}

interface ValueProps {
  agencyId?: string
}

class Main extends React.Component {
  public values: ValueProps = {}
  public curSale: {key: string, label: string} = { key: '', label: ''}
  public state: States = {
    defaultActiveKey: '',
    tab: ''
  }
  public componentWillMount () {
    this.setDefaultActiveTab()
  }
  public setDefaultActiveTab () {
    if (APP.hasPermission('crm_sign_myself_list_select')) {
      this.setState({
        defaultActiveKey: '1',
        tab: '1'
      })
    } else if (!APP.hasPermission('crm_sign_myself_list_select') && APP.hasPermission('crm_sign_huifang')) {
      this.setState({
        defaultActiveKey: '2',
        tab: '2'
      })
    } else if (!APP.hasPermission('crm_sign_myself_list_select') && !APP.hasPermission('crm_sign_huifang') && APP.hasPermission('crm_sign_xufei')) {
      this.setState({
        defaultActiveKey: '3',
        tab: '3'
      })
    }
  }
  // public toSale (id?: string) {
  //   console.log(id, 'id')
  //   if (!id && !this.state.selectedRowKeys.length) {
  //     APP.error('请选择客户！')
  //     return false
  //   }
  //   const modal = new Modal({
  //     content: (
  //       <div>
  //         <span>请选择跟进人：</span>
  //         <Select
  //           showSearch
  //           optionFilterProp='children'
  //           filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
  //           labelInValue
  //           style={{width:'200px'}}
  //           onChange={(val: {key: '', label: ''}) => {
  //             this.curSale = val
  //           }}
  //         >
  //           {
  //             this.state.worders.map((item, index) => {
  //               return (
  //                 <Option key={item.id}>{item.name}</Option>
  //               )
  //             })
  //           }
  //         </Select>
  //       </div>
  //     ),
  //     title: '销售',
  //     mask: true,
  //     onOk: () => {
  //       const params = {
  //         customerIdArr: id ? [id] : this.state.selectedRowKeys,
  //         principalsId: this.curSale.key,
  //         principals: this.curSale.label
  //       }
  //       toOther(params).then(() => {
  //         APP.success('操作成功')
  //         this.setDefaultActiveTab()
  //         modal.hide()
  //       })
  //     },
  //     onCancel: () => {
  //       modal.hide()
  //     }
  //   })
  //   modal.show()
  // }
  // public detail (record: Signed.DetailProps, defaultKey?: string) {
  //   console.log(defaultKey)
  //   const modal = new Modal({
  //     content: (
  //       <Provider>
  //         <View
  //           type='signed'
  //           defaultKey={defaultKey}
  //           customerId={record.id}
  //           customerName={record.customerName}
  //           onClose={() => {
  //             this.setDefaultActiveTab()
  //             modal.hide()
  //           }}
  //         />
  //       </Provider>
  //     ),
  //     header: null,
  //     footer: null,
  //     mask: true,
  //     maskClosable: false,
  //     onCancel: () => {
  //       modal.hide()
  //     }
  //   })
  //   modal.show()
  // }
  // public onSelectAllChange (selectedRowKeys: string[]) {
  //   this.setState({ selectedRowKeys })
  // }
  // 搜索框折叠
  // public handleSwitch () {
  //   this.setState({
  //     extshow: !this.state.extshow
  //   })
  // }

  public callBack (value: any) {
    this.setState({
      tab: value
    })
  }

  public render () {
    // const rowSelection = {
    //   selectedRowKeys: this.state.selectedRowKeys,
    //   onChange: this.onSelectAllChange.bind(this)
    // }
    // const { pagination } = this.state
    return (
      <ContentBox
        title='签约客户'
      >
        <div className='mb12'>
        <Tabs
          animated={false}
          defaultActiveKey={this.state.defaultActiveKey}
          onChange={this.callBack.bind(this)}
        >
          {
            APP.hasPermission('crm_sign_myself_list_select') &&
            <Tabs.TabPane tab='我的签约' key='1'>
              {
                this.state.tab === '1' &&
                <Mysign/>
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
        {/* <div style={{ position: 'relative', bottom: '48px', width: '50%'}}>
          {
            (this.state.tab === '1' && APP.hasPermission('crm_sign_myself_list_principals')) &&
            <Button disabled={this.state.selectedRowKeys.length === 0} type='primary' onClick={this.toSale.bind(this, '')}>转跟进人</Button>
          }
          {
            (this.state.tab === '3' && APP.hasPermission('crm_sign_xufei_list_principals')) &&
            <Button disabled={this.state.selectedRowKeys.length === 0} type='primary' onClick={this.toSale.bind(this, '')}>转跟进人</Button>
          }
        </div> */}
      </ContentBox>
    )
  }
}
export default Main
