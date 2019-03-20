import React from 'react'
import { Table, Cascader, Select, Tooltip, Button } from 'antd'
import Content from '@/modules/common/content'
import { Modal } from 'pilipa'
import SettingPanel from './panel'
import { fetchAllRegion, getAgencylist, getList } from './api'
interface State {
  dataSource: Setting.ItemProps[]
  options: Setting.RegionProps[]
  agencyList: Setting.AgencyProps[]
  selectedRowKeys: string[]
  pagination: {
    total: number
    current: number
    pageSize: number
  }
}
class Main extends React.Component {
  public params: Setting.SearchParams = {
    pageSize: 15,
    pageCurrent: 1
  }
  public pageSizeOptions = ['15', '30', '50', '80', '100', '200']
  public columns = [
    {
      title: '省市',
      dataIndex: 'provinceName',
      width: 200,
      render: (val: string, record: Setting.ItemProps) => {
        return (
          <span>{record.provinceName}-{record.cityName}</span>
        )
      }
    },
    {
      title: '机构',
      width: 300,
      dataIndex: 'agencyName'
    },
    {
      title: '呼叫供应商',
      dataIndex: 'tqType',
      render: (val: string) => {
        return (
          (APP.dictionary[`EnumTqType-${val}`])
        )
      }
    },
    {
      title: '自动分配',
      dataIndex: 'isAutoDistribute',
      render: (val: string) => {
        if (String(val) === '1') {
          return (<span>已启用</span>)
        } else {
          return (<span></span>)
        }
      }
    },
    {
      title: (
        <span>
          分配权值
          <Tooltip placement='top' title='自动分配客户量会根据分配权值比例来分，输入范围（1-10）'>
            <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
          </Tooltip>
        </span>
      ),
      dataIndex: 'autoDistributeWeight'
    },
    {
      title: (
        <span>
          日分配上限
          <Tooltip placement='top' title='自动分配客户量若达到日最大值上限，则系统不再自动分与该代理商，输入范围 （1-99999）'>
            <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
          </Tooltip>
        </span>
      ),
      dataIndex: 'autoDistributeMaxNum'
    },
    {
      title: '操作',
      dataIndex: 'agencyId',
      render: (val: string, record: Setting.ItemProps) => {
        return (
          <span
            className='href'
            onClick={() => {
              this.showPanel(record)
            }}
          >
            设置
          </span>
        )
      }
    }
  ]
  public state: State = {
    pagination: {
      total: 0,
      current: this.params.pageCurrent,
      pageSize: this.params.pageSize
    },
    dataSource: [
      {
        regionName: 'xxxxx'
      },
      {
        tqType: 'TQ云呼叫'
      }
    ],
    options: [],
    agencyList: [],
    selectedRowKeys: []
  }
  public componentWillMount () {
    this.getAllArea()
    this.getAgencyList()
    this.fetchlist()
  }
  public getAllArea () {
    fetchAllRegion().then((res) => {
      this.setState({
        options: res
      })
    })
  }
  public getAgencyList () {
    getAgencylist().then((res) => {
      this.setState({
        agencyList: res.data
      })
    })
  }
  public fetchlist () {
    const pagination = this.state.pagination
    getList(this.params).then((res) => {
      pagination.total = res.pageTotal
      pagination.pageSize = res.pageSize
      pagination.current = res.pageCurrent
      this.setState({
        pagination,
        dataSource: res.data,
        selectedRowKeys: []
      })
    })
  }
  public handlePageChange (page: number) {
    const { pagination } = this.state
    pagination.current = page
    this.params.pageCurrent = page
    this.setState({
      pagination,
      selectedRowKeys: []
    }, () => {
      this.fetchlist()
    })
  }
  public onShowSizeChange (current: number, size: number) {
    const { pagination } = this.state
    pagination.current = current
    this.params.pageCurrent = current
    this.params.pageSize = size
    pagination.pageSize = size
    this.setState({
      pagination
    }, () => {
      this.fetchlist()
    })
  }
  public onSelectAllChange (selectedRowKeys: string[]) {
    this.setState({ selectedRowKeys })
  }
  public showPanel (record?: Setting.ItemProps) {
    this.setState({
      selectedRowKeys: []
    })
    const modal = new Modal({
      title: `${record.agencyName}`,
      content: <SettingPanel record={record}/>,
      footer: null,
      maskClosable: false,
      onCancel: () => {
        this.fetchlist()
      }
    })
    modal.show()
  }
  public showPanelBatch () {
    const modal = new Modal({
      title: 'CRM设置',
      content: <SettingPanel selectedRowKeys={this.state.selectedRowKeys}/>,
      maskClosable: false,
      footer: null,
      onCancel: () => {
        this.fetchlist()
      }
    })
    modal.show()
  }
  public render () {
    const { options, pagination } = this.state
    function filter (inputValue: string, path: any) {
      console.log(inputValue, path)
      return (
        path.some((option: any) => (option.name).toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
      )
    }
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <Content
        title='CRM设置'
      >
        <div className='mb20'>
          <Cascader
            className='mr5'
            style={{width: 200  }}
            options={options}
            onChange={(value) => {
              console.log(value)
              this.params.pageCurrent = 1
              this.params.cityCode = value[1]
              this.fetchlist()
            }}
            placeholder='请选省市'
            fieldNames={{label: 'name', value: 'code', children: 'regionList'}}
            showSearch={{ filter }}
          />
          <Select
            style={{width: 200}}
            showSearch
            allowClear={true}
            placeholder='请选择机构'
            className='mr5'
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value: string) => {
              console.log(value, 'value')
              this.params.pageCurrent = 1
              this.params.agencyId = value
              this.fetchlist()
            }}
          >
            {
              this.state.agencyList.map((item) => {
                return (
                  <Select.Option key={item.agencyId}>{item.agencyName}</Select.Option>
                )
              })
            }
          </Select>
          <Select
            style={{width: 200}}
            allowClear={true}
            placeholder='请选择呼叫供应商'
            className='mr5'
            onChange={(value: string) => {
              console.log(value)
              this.params.pageCurrent = 1
              this.params.tqType = value
              this.fetchlist()
            }}
          >
            {
              APP.keys.EnumTqType.map((item) => {
                return (
                  <Select.Option key={item.value}>
                    {item.label}
                  </Select.Option>
                )
              })
            }
          </Select>
          <Select
            style={{width: 200}}
            allowClear={true}
            placeholder='是否启用分配'
            className='mr5'
            onChange={(value: string) => {
              console.log(value)
              this.params.pageCurrent = 1
              this.params.isAutoDistribute = value
              this.fetchlist()
            }}
          >
            <Select.Option key='1'>启用</Select.Option>
            <Select.Option key='0'>不启用</Select.Option>
          </Select>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          rowKey='agencyId'
          pagination={{
            onChange: this.handlePageChange.bind(this),
            onShowSizeChange: this.onShowSizeChange.bind(this),
            total: pagination.total,
            current: pagination.current,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            size: 'small',
            pageSizeOptions: this.pageSizeOptions,
            showTotal (total) {
              return `共计 ${total} 条`
            }
          }}
        />
        <div style={{position: 'relative', top: '-45px', width: 200}}>
          <Button disabled={this.state.selectedRowKeys.length === 0} type='primary' onClick={this.showPanelBatch.bind(this)} hidden={!APP.hasPermission('crm_set_auto_distribute_save_bulk_store') || !APP.hasPermission('crm_set_auto_distribute_save_bulk_distribute')}>批量设置</Button>
          {/* <Button disabled={this.state.selectedRowKeys.length === 0} type='primary' onClick={this.showPanelBatch.bind(this)} >批量设置</Button> */}
        </div>
      </Content>
    )
  }
}
export default Main
