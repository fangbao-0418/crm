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
    title: '创建时间',
    dataIndex: 'enterStorageTime'
  }, {
    title: '入库时间',
    dataIndex: 'enterStorageTime'
  }]
  public componentWillMount () {
    this.fetchList()
    // fetchCityCustomerList().then((res) => {
    //   console.log(res)
    // })
  }
  public fetchList () {
    const pagination = this.state.pagination
    this.params.pageSize = pagination.pageSize
    this.params.pageCurrent = pagination.current
    fetchList(this.params).then((res) => {
      const pagination2 = { ...this.state.pagination }
      pagination2.total = res.pageTotal
      this.setState({
        dataSource: res.data
      })
    })
  }
  public onSelectAllChange (selectedRowKeys: string[]) {
    console.log(selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  public handleSearch (values: any) {
    console.log(values, 'values')
    if (values.date.lable === '入库时间') {
      let storageBeginDate
      let storageEndDate
      if (values.date.value === 'all') {
        storageBeginDate = ''
        storageEndDate = ''
      } else if (values.date.value.indexOf('至') > -1) {
        storageBeginDate = values.date.split('至')[0]
        storageEndDate = values.date.split('至')[1]
      } else {
        storageBeginDate = moment().format('YYYY-MM-DD')
        storageEndDate = moment().startOf('day').add(values.date, 'day').format('YYYY-MM-DD')
      }
      this.params.storageBeginDate = storageBeginDate
      this.params.storageEndDate = storageEndDate
    } else if (values.date.lable === '创建时间') {
      let createBeginDate
      let createEndDate
      if (values.date.value === 'all') {
        createBeginDate = ''
        createEndDate = ''
      } else if (values.date.value.indexOf('至') > -1) {
        createBeginDate = values.date.split('至')[0]
        createEndDate = values.date.split('至')[1]
      } else {
        createBeginDate = moment().format('YYYY-MM-DD')
        createEndDate = moment().startOf('day').add(values.date, 'day').format('YYYY-MM-DD')
      }
      this.params.createBeginDate = createBeginDate
      this.params.createEndDate = createEndDate
    }
    this.params.cityCode = values.cityCode.value
    // this.fetchList()
  }
  public handleSearchType (values: any) {
    console.log(values, 'values')
    switch (values.type) {
    case '0':
      this.params.customerName = values.word
      break
    case '1':
      this.params.contactPerson = values.word
      break
    case '2':
      this.params.contactPhone = values.word
      break
    case '3':
      this.params.customerSource = values.word
      break
    case '4':
      this.params.payTaxesNature = values.word
      break
    }
    // this.fetchList()
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
              onChange={this.handleSearch.bind(this)}
            />
          </div>
          <div className='fr' style={{ width: 290 }}>
            <SearchName
              style={{paddingTop: '5px'}}
              options={[
                {word: '客户名称', type: '0'},
                {word: '联系人', type: '1'},
                {word: '联系电话', type: '2'},
                {word: '客户来源', type: '3'},
                {word: '纳税类别', type: '4'}
              ]}
              placeholder={''}
              // onChange={this.handleSearchType.bind(this)}
              onKeyDown={(e, val) => {
                if (e.keyCode === 13) {
                  console.log(val, 'onKeyDown')
                  this.handleSearchType(val)
                }
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
