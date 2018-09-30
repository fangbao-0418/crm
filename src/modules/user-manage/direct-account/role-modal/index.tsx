import { Checkbox, Form, Input, Modal, Select } from 'antd'
import React from 'react'

const FormItem = Form.Item
const Option = Select.Option
const styles = require('./style')
const CheckboxGroup = Checkbox.Group

const list = [
  {label: '增加', value: '111'},
  {label: '删除', value: '222'},
  {label: '修改', value: '333'},
  {label: '查看', value: '333'}
]

class Main extends React.Component<any, any> {

  public state = {
    title: ''
  }

  public componentWillMount () {
    const {mode} = this.props
    let title
    if (mode === 'view') {
      title = '查看权限'
    } else if (mode === 'add') {
      title = '添加权限'
    } else if (mode === 'modify') {
      title = '修改权限'
    }
    this.setState({title})
  }

  public onOk = () => {
    this.props.onOk()
  }

  public onCancel = () => {
    this.props.onCancel()
  }

  public render () {
    const { mode } = this.props
    return (
      <Modal
        title={this.state.title}
        visible={true}
        className={styles.wrap}
        width={1200}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form layout='inline'>
          <FormItem className={styles.input} label='角色名称' required>
            <Input disabled={mode === 'view'} size='small' />
          </FormItem>
          <FormItem className={styles.input} label='数据共享' required>
            <Select disabled={mode === 'view'} size='small' style={{width: '160px'}} placeholder='请选择是否数据共享'>
              <Option value={1}>是</Option>
              <Option value={0}>否</Option>
            </Select>
          </FormItem>
        </Form>

        <div className={styles.content}>
          <div className={styles.contentWrap}>
            <div className={styles.title}>中心运营系统权限：</div>
            <div className={styles.contentBox}>
              <div className={styles.selectAll}><Checkbox>全选</Checkbox></div>
              <div className={styles.item}>
                <Checkbox className={styles.itemTitle}>渠道</Checkbox>
                <CheckboxGroup className={styles.itemOption} options={list}></CheckboxGroup>
              </div>
            </div>
          </div>
        </div>

      </Modal>
    )
  }
}

export default Form.create()(Main)
