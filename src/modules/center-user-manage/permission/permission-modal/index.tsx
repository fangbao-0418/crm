import React from 'react'
import { Form, Input, Modal, Checkbox, Tag } from 'antd'

const styles = require('./style')
const FormItem = Form.Item

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

  public render () {
    const {mode} = this.props
    return (
      <Modal
        className={styles.wrap}
        title={this.state.title}
        width={900}
        visible={true}
        onOk={() => {}}
        onCancel={() => {this.props.onCancel()}}
      >
        <Form>
          <FormItem
            className={styles.option}
            required
            label='页面权限名称'
            labelCol={{span: 4}}
            wrapperCol={{span: 10}}
          >
            <Input size='small' placeholder='请输入权限名称'/>
          </FormItem>
          <FormItem
            className={styles.option}
            required
            label='URL'
            labelCol={{span: 4}}
            wrapperCol={{span: 16}}
          >
            <Input size='small' placeholder='请输入URL'/>
          </FormItem>
          <FormItem
            className={styles.option}
            required
            label='操作权限名称'
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
          >
            <div className={styles.item}>
              <Checkbox>删除</Checkbox>
              <Input className={styles.url} size='small' placeholder='请输入URL'/>
            </div>
            <div className={styles.item}>
              <Checkbox>删除</Checkbox>
              <Input className={styles.url} size='small' placeholder='请输入URL'/>
            </div>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Main
