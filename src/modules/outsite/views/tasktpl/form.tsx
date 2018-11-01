import {  Form, Checkbox, Input, Select, Row, Col } from 'antd'
import React from 'react'
import { withRouter } from 'react-router'
import ContentBox from '@/modules/common/content'
import Service from '@/modules/outsite/services'
import { isArray } from 'util'
import _ from 'lodash'
import TaskSort from './TaskSort'
const styles = require('@/modules/outsite/styles/tpllist.styl')
const FormItem = Form.Item
const Option = Select.Option
type Map<T> = OutSide.Map<T>
interface States {
  item: OutSide.TaskItem
  /** 选中的子任务 */
  checkedIdMap?: Map<OutSide.SubTaskItem>
  /** 子任务列表 */
  subList?: OutSide.SubTaskItem[]
  /** 子任务分组 */
  subGroup: Map<OutSide.TaskItem[]>
  /** 子任务mapper */
  subMap: Map<OutSide.SubTaskItem>
  goods: OutSide.GoodProps[]
}

/*编辑系统任务   未完成*/
class Main extends React.Component<any, States> {
  public state: States = {
    item: {
      subList: []
    },
    checkedIdMap: {},
    subList: [],
    subGroup: {},
    subMap: {},
    goods: []
  }
  public titles = {
    '0' : '编辑自定义任务',
    '1': '编辑系统任务',
    '-1': '新增自定义任务'
  }
  public params: Map<string> = {}
  public componentWillMount () {
    this.params = this.props.match.params
    this.getSublist()
    this.getItem()
    this.getProductList()
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

  // 获取商品列表
  public getProductList () {
    Service.getProductList('OTHERS').then((res) => {
      console.log(res)
      this.setState({
        goods: res || []
      })
    })
  }

  // 获取当前任务
  public getItem () {
    if (!this.params.id) {
      const item = this.state.item
      item.systemFlag = '-1'
      this.setState({
        item
      })
      return
    }
    let checkedIdMap: Map<OutSide.SubTaskItem> = {}
    Service.getTplItemById(this.params.id).then((item: OutSide.TaskItem) => {
      item.subList.map((subitem, index) => {
        subitem.sort = index + 1
      })
      checkedIdMap = this.arr2map(item.subList, 'subId')
      this.setState({
        item,
        checkedIdMap
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
  public arr2map<T = any> (arr: Array<T>, key: string = 'id', val: string = ''): Map<T> {
    const rst: Map<T> = {}
    if (isArray(arr)) {
      arr.map((item: any) => {
        rst[item[key]] = val ? item[val] : item
      })
    }
    return rst
  }

  // 根据字典生成下拉
  public dict2list (dict: Map<string>): Array<{key: string, val: string}> {
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

  // 选择子任务
  public onCheckItem (e: any) {
    let { item } = this.state
    const { checkedIdMap } = this.state
    let { subList } = item
    const val = e.target.value
    if (e.target.checked) {
      if (checkedIdMap && !checkedIdMap[val]) {
        // 缓存已经选中的子任务
        checkedIdMap[val] = this.state.subMap[e.target.value]
        const nitem = checkedIdMap[val]
        nitem.sort = subList.length + 1
        subList.push(nitem)
        item = {
          ...item,
          subList
        }
        this.setState({
          checkedIdMap,
          item
        })
      }
    } else {
      delete checkedIdMap[val]
      subList = _.filter(subList, (v) => {
        return v.subId !== val
      })
      subList.map((v, i) => {
        subList[i].sort = i + 1
        checkedIdMap[v.subId] = v
      })
      item = {
        ...item,
        subList
      }
      this.setState({
        item,
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
  public syncFormdata (k: string, v: any) {
    console.log('sync::', k, v)
    const { item } = this.state
    item[k] = v
    this.setState({
      item
    })
  }

  // 保存
  public onSave (data: OutSide.SubTaskItem[], sync: boolean) {
    const { item } = this.state
    item.subList = data
    item.status = 'NORMAL'
    item.systemFlag = item.systemFlag === '1' ? '1' : '0'
    if (!item.name) {
      APP.error('任务名不能为空')
      return
    }
    if (item.subList.length === 0) {
      APP.error('请选择子任务')
      return
    }
    if (sync) {
      Service.taskSave2sync(item).then(() => {
        APP.dispatch<OutSide.Props>({
          type: 'change outside data',
          payload: {
            config: {
              common: {
                tab: item.systemFlag === '1' ? '1' : '2'
              }
            }
          }
        })
        APP.success('保存并同步成功')
        APP.history.push(`/outsite/tasktpl/list`)
      })
    } else {
      Service.addTplItem(item).then(() => {
        APP.dispatch<OutSide.Props>({
          type: 'change outside data',
          payload: {
            config: {
              common: {
                tab: item.systemFlag === '1' ? '1' : '2'
              }
            }
          }
        })
        APP.success('保存成功')
        APP.history.push(`/outsite/tasktpl/list`)
      })
    }
  }

  public render () {
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
    const selectValue: any = {key: this.state.item.productId}
    return (
      <ContentBox title={this.titles[this.state.item.systemFlag]} className={styles.container}>
        <Form
          onChange={this.onChange.bind(this)}
        >
          <Row>
            <Col span={5}>
              <FormItem label='任务名称' {...formItemLayout}>
                <Input
                  name='name'
                  value={this.state.item.name}
                  placeholder={`任务名称`}
                  onChange={(e) => {
                    this.syncFormdata('name', e.target.value)
                  }}
                />
              </FormItem>
            </Col>
            <Col span={7} hidden={this.state.item.systemFlag !== '1'}>
              <FormItem label='是否优先级' {...formItemLayout}>
                <Select
                  placeholder={`是否优先级`}
                  value={this.state.item.priority}
                  onChange={(val: any) => {
                    this.syncFormdata('priority', val)
                  }
                  }
                >
                  {this.dict2options(Service.taskTplPriorityDict)}
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='关联商品' {...formItemLayout}>
                <Select
                  placeholder={`关联商品`}
                  labelInValue
                  value={selectValue}
                  onChange={(val: any) => {
                    this.syncFormdata('productId', val.key)
                    this.syncFormdata('productName', val.label)
                  }}
                >
                  {
                    this.state.goods.map((item) => {
                      return (
                        <Option key={item.code}>
                          {item.name}
                        </Option>
                      )
                    })
                  }
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
                          this.state.subGroup[item.key] && this.state.subGroup[item.key].map((checkitem, i: number) => {
                            return (
                              <Checkbox
                                key={`checkbox-${index}-${i}`}
                                value={checkitem.id}
                                onChange={this.onCheckItem.bind(this)}
                                checked={!!this.state.checkedIdMap[checkitem.id]} // 根据回传结果设置
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
                <TaskSort
                  item={this.state.item}
                  onOk={this.onSave.bind(this)}
                />
              </Col>
          </Row>
        </Form>
      </ContentBox>
    )
  }
}
export default withRouter(Main)
