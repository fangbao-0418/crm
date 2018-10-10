import React from 'react'
import { Table, Button } from 'antd'
import moment from 'moment'
import { ColumnProps } from 'antd/lib/table'
import Modal from 'pilipa/libs/modal'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import ContentBox from '@/modules/common/content'
import SearchName from '@/modules/common/search/SearchName'
import AddButton from '@/modules/common/content/AddButton'
import Provider from '@/components/Provider'
import Allot from '@/modules/customer/allot'
import AllotResult from './AllotResult'
import Detail from './detail'
import { fetchList, fetchCityCount } from './api'
import BaseInfo from '@/modules/customer/BaseInfo'
import Import from '@/modules/customer/import'
type DetailProps = Customer.DetailProps
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
  pagination: {
    total: number
    current: number
    pageSize: number
  }
  selectAll: boolean,
  cityList: any[]
  data: ConditionOptionProps[]
}
interface ParamsProps {
  cityCode?: string
  pageSize?: number
  pageCurrent?: number
  storageBeginDate?: string
  storageEndDate?: string
  createBeginDate?: string
  createEndDate?: string
  customerName?: string
  contactPerson?: string
  contactPhone?: string
  customerSource?: string
  /** 纳税类型 */
  payTaxesNature?: string
}
const data: ConditionOptionProps[] = [
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
    value: '110000',
    field: 'cityCode',
    type: 'select',
    options: [
      {
        label: '',
        value: ''
      }
    ]
  }
]
class Main extends React.Component<null, States> {
  public state: States = {
    dataSource: [],
    selectedRowKeys: [],
    selectAll: false,
    cityList: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    },
    data
  }
  public pageSizeOptions = ['15', '30', '50', '80', '100', '200']
  public params: ParamsProps = {cityCode: '110000'}
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName',
    render: (val, record) => {
      return (
        <span className='href' onClick={this.show.bind(this, record.customerId)}>{val}</span>
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
    fetchCityCount().then((res) => {
      const cityList: Array<{cityCode: string, cityName: string, rows: number}> = res.data
      const options: Array<{label: string, value: string}> = []
      cityList.forEach((item) => {
        options.push({
          label: `${item.cityName}(${item.rows})`,
          value: item.cityCode
        })
      })
      data[1].options = options
      this.setState({
        data
      })
    })
  }
  public fetchList () {
    const pagination = this.state.pagination
    this.params.pageSize = pagination.pageSize
    this.params.pageCurrent = pagination.current
    fetchList(this.params).then((res) => {
      pagination.total = res.pageTotal
      this.setState({
        pagination,
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
    this.fetchList()
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
    this.fetchList()
  }
  public add () {
    let ins: any
    const modal = new Modal({
      style: 'width: 800px',
      content: (
        <Provider>
          <BaseInfo
            reset
            ref={(ref: any) => { ins = ref.getWrappedInstance() }}
            onClose={() => {modal.hide()}}
          />
        </Provider>
      ),
      footer: (
        <div className='text-right mt10'>
          <Button
            className='mr5'
            type='primary'
            onClick={() => {
              console.log(ins.refs.wrappedComponent)
              ins.refs.wrappedComponent.save().then(() => {
                APP.success('保存成功')
                modal.hide()
                this.fetchList()
              }, () => {
                APP.error('保存失败')
              })
            }}
          >
            保存
          </Button>
        </div>
      ),
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
  public show (customerId: string) {
    const modal = new Modal({
      style: 'width: 840px',
      content: (
        <Provider><Detail customerId={customerId} isCustomer={true}/></Provider>
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
        <AllotResult onCancel={() => {modal.hide()}}/>
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
  public SelectAll () {
    this.setState({
      selectAll: true
    })
  }
  public toOrganizationAuto () {
    if (!this.state.selectedRowKeys.length && !this.state.selectAll) {
      APP.error('请选择需要分配客户')
      return
    }
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
    if (!this.state.selectedRowKeys.length && !this.state.selectAll) {
      APP.error('请选择需要分配客户')
      return
    }
    const modal = new Modal({
      content: (
        <Provider>
          <Allot
            onClose={() => {modal.hide()}}
            selectedRowKeys={this.state.selectedRowKeys}
            params={this.params}
            selectAll={this.state.selectAll}
            pagetotal={this.state.pagination.total}
          />
        </Provider>
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
  public handlePageChange (page: number) {
    const { pagination } = this.state
    pagination.current = page
    this.setState({
      pagination
    }, () => {
      this.fetchList()
    })
  }
  public onShowSizeChange (current: number, size: number) {
    const { pagination } = this.state
    pagination.current = current
    pagination.pageSize = size
    this.setState({
      pagination
    }, () => {
      this.fetchList()
    })
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    const { pagination } = this.state
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
        <div className='mb10 clear'>
          <div className='fl' style={{ width: 740 }}>
            <Condition
              dataSource={this.state.data}
              onChange={this.handleSearch.bind(this)}
            />
          </div>
          <div className='fr' style={{ width: 290 }}>
            <SearchName
              style={{paddingTop: '5px'}}
              options={[
                { value: '0', label: '客户名称'},
                { value: '1', label: '联系人'},
                { value: '2', label: '联系电话'},
                { value: '3', label: '客户来源'},
                { value: '4', label: '纳税类别'}
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
          pagination={{
            onChange: this.handlePageChange.bind(this),
            onShowSizeChange: this.onShowSizeChange.bind(this),
            total: pagination.total,
            current: pagination.current,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: this.pageSizeOptions,
            showTotal (total) {
              return `共计 ${total} 条`
            }
          }}
        />
        <div className='mt40'>
          <Button type='primary' onClick={this.SelectAll.bind(this)} className='mr5'>全选</Button>
          <Button type='primary' className='mr5' onClick={this.toOrganizationByHand.bind(this)}>手工分配</Button>
          <Button type='primary' className='mr5' onClick={this.toOrganizationAuto.bind(this)}>应用自动分配</Button>
        </div>
      </ContentBox>
    )
  }
}
export default Main
