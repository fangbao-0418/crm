import {
  Input, Table, Divider, Select
} from 'antd'
import React from 'react'
import { Modal } from 'pilipa'
import { ColumnProps } from 'antd/lib/table'
import { connect } from 'react-redux'
import { fetchDepartmentAction } from '../action'
const styles = require('./style.styl')
import Detail from './detail'
import { addDepartment, updateDepartment, changeDepartmentStatus, deleteDepartment } from '../api'
interface Props extends UserManage.Props {
  type: UserManage.TypeProps
}
class Main extends React.Component<Props> {
  public loaded = false
  public companyCode: string
  public columns: ColumnProps<UserManage.DepartmentItemProps>[] = [
    { title: '部门名称', dataIndex: 'name', key: 'department',
      onHeaderCell: (column) => {
        return {
          style: {
            textIndent: '50px'
          }
        }
      }
    },
    { title: '操作', key: 'operation',
      width: 350,
      render: (text, record) => {
        if (record.status === 0) {
          return (
            <div>
              <span className='href' onClick={this.add.bind(this, record)}>添加子部门</span>
              <Divider type='vertical'/>
              <span className='href' onClick={this.update.bind(this, record)}>修改</span>
              <Divider type='vertical'/>
              <span className='href' onClick={this.changeStatus.bind(this, record)}>
                禁用
              </span>
              <Divider type='vertical'/>
              <span className='href' onClick={this.delete.bind(this, record)}>删除</span>
            </div>
          )
        } else {
          return (
            <div>
              <span>添加子部门</span>
              <Divider type='vertical'/>
              <span>修改</span>
              <Divider type='vertical'/>
              <span className='href' onClick={this.changeStatus.bind(this, record)}>
                已禁用
              </span>
              <Divider type='vertical'/>
              <span>删除</span>
            </div>
          )
        }
      },
      onHeaderCell: (column: any) => {
        return {
          style: {
            textAlign: 'center'
          }
        }
      }
    }
  ]
  public componentWillMount () {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        department: {
          dataSource: []
        }
        // companyCode: undefined
      }
    })
    if (this.props.companyCode) {
      this.fetchData(this.props.companyCode, this.props.type)
    }
  }
  public componentWillReceiveProps (props: Props) {
    if (props.onlyOne && props.department.dataSource.length === 0 && props.type && props.companyCode !== undefined && this.loaded === false) {
      this.fetchData(props.companyCode, props.type)
    }
  }
  public fetchData (
    companyCode: string = this.companyCode || this.props.companyCode,
    type: UserManage.TypeProps = this.props.type
  ) {
    this.loaded = true
    fetchDepartmentAction(companyCode, type)
  }
  public add (record: UserManage.DepartmentItemProps) {
    console.log(record, 'record')
    const modal = new Modal({
      title: '添加部门',
      content: (
        <Detail
          onOk={(value) => {
            addDepartment(
              {
                name: value.name,
                parentId: record.id,
                companyId: this.props.companyCode,
                organizationType: this.props.type
              }
            ).then((res) => {
              this.fetchData()
            })
            modal.hide()
          }}
          onCancel={() => {
            modal.hide()
          }}
        />
      ),
      footer: null
    })
    modal.show()
  }
  public update (record: UserManage.DepartmentItemProps) {
    const modal = new Modal({
      title: '修改部门',
      content: (
        <Detail
          value={record.name}
          onOk={(value) => {
            updateDepartment(
              {
                name: value.name,
                id: record.id
              }
            ).then((res) => {
              this.fetchData()
            })
            modal.hide()
          }}
          onCancel={() => {
            modal.hide()
          }}
        />
      ),
      footer: null
    })
    modal.show()
  }
  // 禁用部门
  public changeStatus = (record?: UserManage.DepartmentItemProps) => {
    let title = ''
    if (record.status === 0) {
      title = '禁用'
    } else {
      title = '启用'
    }
    const modal = new Modal({
      content: (
        <div>你确定{title}此部门吗？</div>
      ),
      title: `${title}部门`,
      mask: true,
      onOk: () => {
        changeDepartmentStatus({
          id: record.id,
          status: record.status === 0 ? 1 : 0
        }).then(() => {
          modal.hide()
          this.fetchData()
        })
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }

  // 删除部门
  public delete = (record: UserManage.DepartmentItemProps) => {
    deleteDepartment(record.id).then(() => {
      this.fetchData()
    })
  }
  public render () {
    const { dataSource } = this.props.department
    const { companyList, onlyOne, companyCode } = this.props
    const disabled = onlyOne
    const selectValue: any = companyCode !== undefined ? {key: String(companyCode)} : undefined
    return (
      <div>
        <div className={styles.formitem}>
          <Select
            disabled={disabled}
            value={selectValue}
            showSearch
            placeholder='请输入公司名称'
            className={styles.searchcondition}
            showArrow={false}
            labelInValue
            onSelect={(value: {key: string, label: any}) => {
              APP.dispatch<UserManage.Props>({
                type: 'change user manage data',
                payload: {
                  companyCode: value.key,
                  companyName: value.label
                }
              })
              this.companyCode = value.key
              this.fetchData()
            }}
          >
            {
              companyList.map((item) => {
                return (
                  <Select.Option key={item.id}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
        </div>
        <Table
          childrenColumnName='organizationList'
          className='components-table-demo-nested'
          columns={this.columns}
          dataSource={dataSource}
          pagination={false}
          defaultExpandAllRows={true}
        />
      </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.userManage
})(Main)
