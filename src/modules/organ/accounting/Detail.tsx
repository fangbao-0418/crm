import React from 'react'
import { Form, Row, Col, Input, Tree, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchAccountingInfo, fetchAccountingProvince } from '../api'
import { TreeNode } from 'antd/lib/tree-select'
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
  public areaMapper: {[id: string]: UserManage.OwnAreaProps} = {}
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
        const key: any = item.id
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
  // 根据id获取信息
  public getAccountingInfo (id: number) {
    fetchAccountingInfo(id)
      .then((res) => {
        // this.setState({info: res})
      })
  }
  public getFinalTreeData (ids: any[] = []) {
    // return res
  }
  // 点击保存按钮
  public save = () => {
    if (this.props.onOk) {
      this.props.form.validateFields((err, vals) => {
        console.log(vals)
        this.getFinalTreeData(vals.region)
        if (err) {return}
        // vals.region = []
        // this.props.onOk(vals)
      })
    }
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
            <FormItem
              {...formItemLayout}
              label='核算地区范围：'
            >
              {
                getFieldDecorator(
                  'region'
                )(
                  <Tree
                    defaultExpandAll={true}
                    autoExpandParent={true}
                    checkable={true}
                    onCheck={(checkedKeys) => {
                      console.log(checkedKeys)
                      this.props.form.setFieldsValue({
                        region: checkedKeys
                      })
                    }}
                  >
                    {this.renderRegionTreeNodes(this.state.areaList)}
                  </Tree>
                )
              }
            </FormItem>
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
