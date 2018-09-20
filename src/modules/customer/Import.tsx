import React from 'react'
import ImportSteps from '@/modules/common/import-steps'
class Main extends React.Component {
  public config = [
    {
      title: '1、导入设置',
      component: <div>111</div>
    },
    {
      title: '2、上传文件',
      component: <div>222</div>
    },
    {
      title: '3、执行结果',
      component: <div>333</div>
    }
  ]
  public render () {
    return (
      <div>
        <ImportSteps step={1} config={this.config} />
      </div>
    )
  }
}
export default Main
