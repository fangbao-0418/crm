import React from 'react'
import { Table, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import Modal from 'pilipa/libs/modal'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import ContentBox from '@/modules/common/content'
import SearchName from '@/modules/common/search/SearchName'
import AddButton from '@/modules/common/content/AddButton'
import Provider from '@/components/Provider'
import AllotCustomer from './AllotCustomer'
import Result from './Result'
import Detail from './detail'
import { fetchList, fetchCityCustomerList } from './api'
import BaseInfo from '@/modules/customer/BaseInfo'
import Import from '@/modules/customer/import'
type DetailProps = Customer.DetailProps
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
}
class Main extends React.Component {
  public state: States = {
    dataSource: [],
    selectedRowKeys: []
  }
  public data: ConditionOptionProps[] = [
    {
      field: 'date',
      value: 'all',
      label: ['入库时间', '创建时间'],
      options: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '今天',
          value: 'today'
        },
        {
          label: '7天',
          value: '7d'
        },
        {
          label: '30天',
          value: '30d'
        }
      ],
      type: 'date'
    },
    {
      label: ['所属城市'],
      value: 'all',
      field: 'telephoneStatus',
      options: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '北京',
          value: 'wxdh'
        },
        {
          label: '上海',
          value: 'zjjj'
        }
      ]
    }
  ]
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName',
    render: (val) => {
      return (
        <a onClick={this.show}>{val}</a>
      )
    }
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '联系电话',
    dataIndex: 'contactPhone'
  }, {
    title: '空置天数',
    dataIndex: 'vacantDays'
  }, {
    title: '城市',
    dataIndex: 'cityName'
  }, {
    title: '客户来源',
    dataIndex: 'customerSource'
  }, {
    title: '入库时间',
    dataIndex: 'enterStorageTime'
  }]
  public componentWillMount () {
    fetchList().then((res) => {
      this.setState({
        dataSource: res.data
      })
    })
    fetchCityCustomerList().then((res) => {
      console.log(res)
    })
  }
  public onSelectAllChange (selectedRowKeys: string[]) {
    console.log(selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  public add () {
    const modal = new Modal({
      style: 'width: 800px',
      content: (
        <Provider><BaseInfo /></Provider>
      ),
      footer: null,
      title: '录入客资',
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public import () {
    const modal = new Modal({
      style: 'width: 800px',
      content: (
        <Provider><Import /></Provider>
      ),
      footer: null,
      title: '导入客资',
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public show () {
    const modal = new Modal({
      style: 'width: 840px',
      content: (
        <Provider><Detail /></Provider>
      ),
      footer: null,
      header: null,
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public showResult () {
    const modal = new Modal({
      content: (
        <Result/>
      ),
      footer: null,
      title: '执行结果',
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public toOrganizationAuto () {
    const modal = new Modal({
      content: (
        <div>你确定要应用自动分配吗？</div>
      ),
      title: '自动分配客资',
      mask: true,
      onOk: () => {
        this.showResult()
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public toOrganizationByHand () {
    const modal = new Modal({
      content: (
        <Provider><AllotCustomer/></Provider>
      ),
      title: '分配客资',
      footer: null,
      mask: true,
      onOk: () => {
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <ContentBox
        title='我的客资'
        rightCotent={(
          <div>
            <AddButton
              style={{marginRight: '10px'}}
              title='新增'
              onClick={() => {
                this.add()
              }}
            />
            <AddButton
              title='导入'
              onClick={() => {
                this.import()
              }}
            />
          </div>
        )}
      >
        <div className='mt12' style={{ overflow: 'hidden' }}>
          <div className='fl' style={{ width: 740 }}>
            <Condition
              dataSource={this.data}
              onChange={(values) => {
                console.log(values)
              }}
            />
          </div>
          <div className='fr' style={{ width: 290 }}>
            <SearchName
              style={{paddingTop: '5px'}}
              options={[
                {label: '客户名称', value: '0'},
                {label: '联系人', value: '1'},
                {label: '客户来源', value: '2'},
                {label: '所属销售', value: '3'},
                {label: '联系电话', value: '4'},
                {label: '纳税人类别', value: '5'}
              ]}
              placeholder={''}
              onChange={(value) => {
                console.log(value)
              }}
            />
          </div>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          bordered
          rowKey={'customerId'}
        />
        <div className='mt40'>
          <Button type='primary' className='mr10'>全选</Button>
          <Button type='primary' className='mr10' onClick={this.toOrganizationByHand.bind(this)}>手工分配</Button>
          <Button type='primary' className='mr10' onClick={this.toOrganizationAuto.bind(this)}>应用自动分配</Button>
        </div>
      </ContentBox>
    )
  }
}
export default Main
