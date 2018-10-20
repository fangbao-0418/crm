import React from 'react'
import { Form, Row, Col, Input, Tree, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchAccountingProvince } from '../api'
import { TreeNode } from 'antd/lib/tree-select'
import _ from 'lodash'
const FormItem = Form.Item
const TreeNode = Tree.TreeNode

interface Props extends FormComponentProps {
  item?: Organ.AccountingItemProps
  onOk: (val: any) => void
  onCancel: () => void
}
interface State {
  areaList: UserManage.OwnAreaProps[]
}
class Main extends React.Component<Props, State> {
  public state: State = {
    areaList: []
  }
  public areaMapper: {[code: string]: UserManage.OwnAreaProps} = {}
  public componentWillMount () {
    this.fetchProvince()
  }

  // 获取负责区域信息
  public fetchProvince () {
    fetchAccountingProvince().then((res) => {
      this.setState({areaList: this.handleOwnAreaData(res)})
    })
  }
  public handleOwnAreaData (data: UserManage.OwnAreaProps[]): any[] {
    data.map((item) => {
      item.value = item.code
      item.title = item.name
      item.children = item.regionList
      if (item.children instanceof Array && item.children.length > 0) {
        this.handleOwnAreaData(item.children)
      }
    })
    return data
  }
  public renderRegionTreeNodes (data: UserManage.OwnAreaProps[]): any[] {
    return data.map((item) => {
      if (item) {
        const key = item.code
        this.areaMapper[key] = item
        if (item.regionList instanceof Array && item.regionList.length > 0) {
          return (
            <TreeNode title={item.name} key={key} dataRef={item}>
              {this.renderRegionTreeNodes(item.regionList)}
            </TreeNode>
          )
        }
        return (
          <TreeNode key={key} {...item} />
        )
      }
    })
  }

  public getRegion (ids: any[] = []) {
    const areaMapper = _.cloneDeep(this.areaMapper)
    const arr: Common.RegionProps[] = []
    ids.map((id) => {
      delete areaMapper[id].regionList
      arr.push(areaMapper[id])
    })
    return arr
  }
  // 点击保存按钮
  public save = () => {
    if (this.props.onOk) {
      this.props.form.validateFields((err, vals) => {
        console.log(vals, 'vals')
        vals.regionList = this.getRegion(vals.regionList)
        if (err) {return}
        this.props.onOk(vals)
      })
    }
  }
  public getRegionIds (region: Common.RegionProps[] = []): any[] {
    const res: string[] = []
    region.map((item) => {
      res.push(item.code)
    })
    return res
  }
  public render () {
    const { getFieldDecorator } = this.props.form
    const item = this.props.item || {}
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    return (
      <Form>
        <Row>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label='机构名称：'
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入机构名称!'
                }],
                initialValue: item.name
              })(
                <Input placeholder='请输入'/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            {
              this.state.areaList.length > 0 && (
              <FormItem
                {...formItemLayout}
                label='核算地区范围：'
              >
                {
                  this.state.areaList.length > 0 && getFieldDecorator(
                    'regionList',
                    {
                      initialValue: this.getRegionIds(item.regionList)
                    }
                  )(
                    <Tree
                      defaultCheckedKeys={this.getRegionIds(item.regionList)}
                      // defaultExpandAll={true}
                      // autoExpandParent={true}
                      checkable={true}
                      onCheck={(checkedKeys) => {
                        console.log(checkedKeys)
                        this.props.form.setFieldsValue({
                          regionList: checkedKeys
                        })
                      }}
                    >
                      {this.renderRegionTreeNodes(this.state.areaList)}
                    </Tree>
                  )
                }
              </FormItem>
              )
            }
          </Col>
        </Row>
        <div style={{justifyContent: 'flex-end', display: 'flex'}}>
          <Button
            type='primary'
            style={{marginRight: '10px'}}
            onClick={() => {this.save()}}
          >
            保存
          </Button>
          <Button onClick={() => {this.props.onCancel()}}>取消</Button>
        </div>
      </Form>
    )
  }
}
export default Form.create()(Main)
