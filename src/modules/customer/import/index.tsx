import React from 'react'
import ImportSteps from '@/modules/common/import-steps'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
class Main extends React.Component {
  public state = {
    step: 1
  }
  public config = [
    {
      title: '1、导入设置',
      component: (
        <Step1
          onOk={() => {
            this.setState({
              step: 2
            })
          }}
        />
      )
    },
    {
      title: '2、上传文件',
      component: (
        <Step2
          onOk={() => {
            this.setState({
              step: 3
            })
          }}
        />
      )
    },
    {
      title: '3、执行结果',
      component: <Step3 />
    }
  ]
  public render () {
    return (
      <div>
        <ImportSteps step={this.state.step} config={this.config} />
      </div>
    )
  }
}
export default Main
