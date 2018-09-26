import React from 'react'
import { Table, Button } from 'antd'
import moment from 'moment'
import { ColumnProps } from 'antd/lib/table'
import { PaginationConfig } from 'antd/lib/pagination'
import Modal from 'pilipa/libs/modal'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import ContentBox from '@/modules/common/content'
import SearchName from '@/modules/common/search/SearchName'
import AddButton from '@/modules/common/content/AddButton'
import Provider from '@/components/Provider'
import Allot from '@/modules/customer/allot'
import Result from './Result'
import Detail from './detail'
import { fetchList, fetchCityCustomerList } from './api'
import BaseInfo from '@/modules/customer/BaseInfo'
import Import from '@/modules/customer/import'
type DetailProps = Customer.DetailProps
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
  pagination: PaginationConfig
}
class Main extends React.Component {
  public state: States = {
    dataSource: [{
      customerName: 'xxx'
    }],
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize: 15,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['15', '30', '50', '80', '100', '200'],
      showTotal (total) {
        return `共计 ${total} 条`
      }
    }
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
          value: '1'
        },
        {
          label: '7天',
          value: '7'
        },
        {
          label: '30天',
          value: '30'
        }
      ],
      type: 'date'
    },
    {
      label: ['所属城市'],
      value: '110110',
      field: 'cityCode',
      options: [
        {
          label: '北京(100)',
          value: '110110'
        },
        {
          label: '上海(100)',
          value: '120110'
        },
        {
          label: '南京(100)',
          value: '130110'
        },
        {
          label: '天津(100)',
          value: '140110'
        }
      ]
    }
  ]
  public params: any = {}
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
  public handleSearch (values: any) {
    let beginDate
    let endDate
    if (values.date === 'all') {
      beginDate = ''
      endDate = ''
    } else if (values.date.indexOf('至') > -1) {
      beginDate = values.date.split('至')[0]
      endDate = values.date.split('至')[1]
    } else {
      beginDate = moment().format('YYYY-MM-DD')
      endDate = moment().startOf('day').add(values.date, 'day').format('YYYY-MM-DD')
    }
    this.params.cityCode = values.cityCode
    this.params.beginDate = beginDate
    this.params.endDate = endDate
    console.log(beginDate, endDate)
  }
  public handleSearchType (values: any) {
    console.log(values, 'values')
  }
  public add () {
    const modal = new Modal({
      style: 'width: 800px',
      content: (
        <Provider><BaseInfo /></Provider>
      ),
      footer: null,
      title: '新增',
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
        <Provider><Import onClose={() => {modal.hide()}}/></Provider>
      ),
      footer: null,
      title: '导入',
      mask: true,
      onOk: () => {

      },
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
        <Result onCancel={() => {modal.hide()}}/>
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
        <Provider><Allot onClose={() => {modal.hide()}}/></Provider>
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
              title='查看'
              onClick={() => {
                this.show()
              }}
            />
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
              onChange={this.handleSearch}
            />
          </div>
          <div className='fr' style={{ width: 290 }}>
            <SearchName
              style={{paddingTop: '5px'}}
              placeholder={'请输入关键字'}
              onChange={this.handleSearchType}
            />
          </div>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          bordered
          rowKey={'customerId'}
          pagination={this.state.pagination}
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
