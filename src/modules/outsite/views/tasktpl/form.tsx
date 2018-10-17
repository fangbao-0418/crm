import {  Icon, Form, Checkbox, Input, Select, Row, Col, Table, Button } from 'antd'
import React from 'react'
import { withRouter } from 'react-router'
import HCframe from '@/modules/common/components/HCframe'
import Service from '@/modules/outsite/services'
import { Map } from '@/modules/outsite/types/outsite'
import { isArray } from 'util'
import _ from 'lodash'
import { TaskItem } from '@/modules/outsite/types/outsite'

const styles = require('@/modules/outsite/styles/tpllist.styl')
const FormItem = Form.Item
const Option = Select.Option

interface States {
  modalVisible: boolean,
  personID: string
}

const vlist: any = [
  {
    id: 1,
    mainId: 1,
    subId: 2,
    sort: null,
    name: '核名',
    status: 'normal',
    type: 'sub',
    category: 'tax',
    delFlag: 0,
    priority: 'close'
  }, {
    id: 2,
    mainId: 1,
    subId: 3,
    sort: null,
    name: '网上申请',
    status: 'normal',
    type: 'sub',
    category: 'tax',
    delFlag: 0,
    priority: 'close'
  }, {
    id: 3,
    mainId: 1,
    subId: 4,
    sort: null,
    name: '网上申请3',
    status: 'normal',
    type: 'sub',
    category: 'tax',
    delFlag: 0,
    priority: 'close'
  }, {
    id: 4,
    mainId: 1,
    subId: 5,
    sort: null,
    name: '网上申请4',
    status: 'normal',
    type: 'sub',
    category: 'tax',
    delFlag: 0,
    priority: 'close'
  }]

/*编辑系统任务   未完成*/
class Main extends React.Component<any, any> {
  public params: Map<string> = {}
  // 全部的子任务 key id, val item
  public suballMap: Map<any> = {}
  public suballList: Array<any> = []
  constructor (props: any) {
    super(props)
    // 从接口获取
    // this.suballList = vlist // this.initDecoratorData(vlist)
    // this.suballMap = this.arr2map(this.suballList, 'id')

    this.state = {
      dataSource:{
        id: '1211',
        customerName:'北京爱康鼎科技有限公司',
        workNo:'XX10001',
        startTime:'2018-09-25'
      },
      modalVisible: false,
      personID: '',
      subList: [], // 全部子任务列表
      subMap: {}, // 子任务id: item map
      subGroup: {}, // 按分类分组子任务列表
      formdata:{
        name: '',
        priority: '',
        productId: '',
        productName: '',
        subList: [] // vlist
      },
      checkedIdMap: {} // this.arr2map(vlist, 'id') // 默认配置选中项
    }
  }

  public componentWillMount () {
    this.params = this.props.match.params
    this.getSublist()
    console.log('params::', this.params, APP.user)
  }

  // 初始化数据
  public initDecoratorData (data: any) {
    return data.map((item: any) => {
      return {
        ...item,
        sort: item.sort === null ? 1 : item.sort
      }
    })
  }

  // 获取当前任务
  public getItem () {
    if (!this.params.id) {
      return
    }
    Service.getTplItemById(this.params.id).then((item: TaskItem) => {
      this.setState({
        formdata: item
      })
    })
  }

  // 获取子任务列表
  public getSublist () {
    return Service.getTplSublist({}).then((data: any) => {
      data.map((item: any, i: number) => {
        data[i].subId = item.id
      })
      this.setState({
        subList: data,
        subMap: this.arr2map(data),
        subGroup: Service.getTplSublistGroupByCate(data)
      }, () => {
        console.log('get list::', this.state)
      })
    })
  }

  // 数组转map
  public arr2map (arr: Array<any>, key: string = 'id', val: any = '') {
    const rst: Map<any> = {}
    if (isArray(arr)) {
      arr.map((item: any) => {
        rst[item[key]] = val ? item[val] : item
      })
    }
    return rst
  }

  // 根据字典生成下拉
  public dict2list (dict: Map<any>) {
    const clist: any = []
    for (const i in dict) {
      if (i) {
        clist.push({
          key: i,
          val: dict[i]
        })
      }
    }
    return clist
  }
  public dict2options (dict: Map<any>) {
    return this.dict2list(dict).map((item: any) => {
      return (
        <Option key={`option-${item.key}`} value={item.key}>{item.val}</Option>
      )
    })
  }

  public onChange () {
    console.log('form change::', arguments)
  }

  public sortData () {
    let { formdata } = this.state
    const subList = _.sortBy(formdata.subList, (item: TaskItem) => {
      return item.sort
    })
    formdata = {
      ...formdata,
      subList
    }
    this.setState({
      formdata
    })
  }

  // 选择子任务
  public onCheckItem (e: any) {
    let { formdata } = this.state
    const { checkedIdMap } = this.state
    let { subList } = formdata
    const val = e.target.value
    if (e.target.checked) {
      if (checkedIdMap && !checkedIdMap[val]) {
        // 缓存已经选中的子任务
        checkedIdMap[val] = this.state.subMap[e.target.value]
        const nitem = checkedIdMap[val]
        console.log('new item::', val, nitem)
        nitem.sort = subList.length + 1
        subList.push(nitem)
        formdata = {
          ...formdata,
          subList
        }
        this.setState({
          checkedIdMap,
          formdata
        })
      }
    } else {
      delete checkedIdMap[val]
      subList = _.filter(subList, (item: TaskItem) => {
        console.log(val, item.id, item.subId, item)
        return item.subId !== val
      })
      subList.map((item: TaskItem, i: number) => {
        subList[i].sort = i + 1
        checkedIdMap[item.subId] = item
      })
      formdata = {
        ...formdata,
        subList
      }
      this.setState({
        formdata,
        checkedIdMap
      })
    }
    /*
    const { checkedIdMap } = this.state
    if (e.target.checked) {
      // 缓存已经选中的子任务
      checkedIdMap[e.target.value] = this.state.subMap[e.target.value]
    } else {
      delete checkedIdMap[e.target.value]
    }
    console.log('........', e.target.value, this.state.checkedIdMap, e.target)
    this.setState({
      checkedIdMap
    }, () => {
      // 排序
      this.sortData()
    })
    console.log('checked::', e, this.state.checkedIdMap)
    */
  }

  // 切换排序
  public sortItem (item: any, action: 'up' | 'down') {
    console.log('sort item::', item)
    const {checkedIdMap} = this.state
    if (action === 'up') {
      if (item.sort !== 1) {
        const nitem = this.state.formdata.subList[item.sort - 2]
        nitem.sort = nitem.sort + 1
        item.sort = item.sort - 1
        checkedIdMap[item.id] = item
        checkedIdMap[nitem.id] = nitem
      }
    }
    if (action === 'down') {
      if (item.sort !== this.state.formdata.subList.length) {
        const nitem = this.state.formdata.subList[item.sort]
        nitem.sort = nitem.sort - 1
        item.sort = item.sort + 1
        checkedIdMap[item.id] = item
        checkedIdMap[nitem.id] = nitem
      }
    }
    this.setState({
      checkedIdMap
    }, () => {
      this.sortData()
    })
  }

  public syncFormdata (k: string, v: any) {
    console.log('sync::', k, v)
    const { formdata } = this.state
    formdata[k] = v
    this.setState({
      formdata
    })
  }

  // 保存
  public onSave () {
    // console.log('save::', this.state.formdata)
    const {formdata} = this.state
    formdata.subList.map((subitem: TaskItem, i: number) => {
      formdata.subList[i] = {
        subId: subitem.subId ? subitem.subId : subitem.id,
        sort: subitem.sort
      }
    })
    console.log('save::', formdata)
    Service.addTplItem(formdata).then(() => {
      APP.success('保存成功')
      // APP.history.push('/outsite/tasktpl/list')
    })
  }

  public render () {
    console.log('state::', this.state)
    const cols: any = [{
      title: '顺序',
      dataIndex: 'sort',
      render: (k: any, item: any) => {
        return item.sort ? item.sort : 1
      }
    }, {
      title: '名称',
      dataIndex: 'name'
    }, {
      title: '排序',
      dataIndex: 'take',
      render: (k: any, item: any) => {
        return (
          <span>
            <span
              className={`likebtn ${item.sort === 1 ? styles.disabled : ''}`}
              onClick={() => {
                if (item.sort === 1) {
                  return
                }
                this.sortItem.bind(this)(item, 'up')
              }}
            >
              <Icon type='caret-up' />
            </span>
            <span
              className={`likebtn ${item.sort === this.state.formdata.subList.length ? styles.disabled : ''}`}
              onClick={() => {
                if (item.sort === this.state.formdata.subList.length) {
                  return
                }
                this.sortItem.bind(this)(item, 'down')
              }}
            >
              <Icon type='caret-down' />
            </span>
          </span>
        )
      }
    }]
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    return (
            <div className={styles.container}>
              <HCframe title='编辑系统任务'>
              <Form
                onChange={this.onChange.bind(this)}
              >
                <Row>
                  <Col span={5}>
                    <FormItem label='任务名称' {...formItemLayout}>
                      <Input
                        name='name'
                        placeholder={`任务名称`}
                        onChange={(ev: any) => {
                          this.syncFormdata('name', ev.target.value)
                        }}
                      />
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem label='是否优先级' {...formItemLayout}>
                      <Select
                        placeholder={`是否优先级`}
                        onChange={(val: any) => {
                          this.syncFormdata('priority', val)
                        }
                        }
                      >
                        {this.dict2options(Service.taskTplPriorityDict)}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem label='关联商品' {...formItemLayout}>
                      <Select
                        placeholder={`关联商品`}
                        onChange={(val: any) => {
                          this.syncFormdata('productId', val)
                        }
                        }
                      >
                        {this.dict2options({
                          1: '商品1',
                          2: '商品2'
                        })}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>

                <Row>
                    <Col span={14}>
                      {
                        // 遍历分类
                        this.dict2list(Service.taskTplCateDict).map((item: any, index: number) => {
                          return (
                            <div key={`cate-${index}`} className={styles['page-hc']}>
                              <div className={styles['hc-h']}>
                                {item.val}
                              </div>
                              <div className={styles['hc-c']}>
                              {
                                this.state.subGroup[item.key] && this.state.subGroup[item.key].map((checkitem: any, i: number) => {
                                  return (
                                    <Checkbox
                                      key={`checkbox-${index}-${i}`}
                                      indeterminate={this.state.indeterminate}
                                      value={checkitem.id}
                                      onChange={this.onCheckItem.bind(this)}
                                      checked={this.state.checkedIdMap[checkitem.id]} // 根据回传结果设置
                                    >
                                      {checkitem.name}
                                    </Checkbox>
                                  )
                                })
                              }
                              </div>
                            </div>
                          )
                        })
                      }
                    </Col>
                    <Col span={10}>
                      <Table
                        bordered={false}
                        size={`small`}
                        rowClassName={(record, index) => {
                          return index % 2 === 0 ? styles.roweven : styles.rowodd
                        }}
                        columns={cols}
                        dataSource={this.state.formdata.subList}
                        pagination={false}
                      />
                      <div className={styles.actbtns}>
                        <Button onClick={this.onSave.bind(this)} type={`primary`}>保存</Button>
                      </div>
                    </Col>
                </Row>
              </Form>
              </HCframe>
            </div>
    )
  }
}
export default withRouter(Main)
