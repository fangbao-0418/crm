import React from 'react'
import { Button } from 'antd'
const styles = require('./index.styl')
class Main extends React.Component {
  public render () {
    return (
      <div className={styles.content}>
        <div>应导入100条，实际导入80条，已分配80条，20条公司信息已经存在</div>
        <div>公司1：已经存在！</div>
        <div>公司1：已经存在！</div>
        <div className={styles.info}>是否删除已重复客户?</div>
        <div>
          <Button type='primary' className='mr10'>删除</Button>
        </div>
      </div>
    )
  }
}
export default Main