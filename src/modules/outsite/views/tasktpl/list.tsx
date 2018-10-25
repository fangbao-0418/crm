import React from 'react'
import { Tabs } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import SetAuto from '@/modules/outsite/components/SetAuto'
import SetCapacity from '@/modules/outsite/components/SetCapacity'

const TabPane = Tabs.TabPane

class Main extends React.Component {

  /*新增自定义任务未修改，这里是方法*/
  public add () {
    APP.history.push('/outsite/tasktpl/form')
  }

  public render () {
    return (
    <ContentBox
      title='通办任务配置'
      rightCotent={(
        <div>
          <AddButton
            style={{marginRight: '10px', color: '#3B91F7'}}
            title='新增自定义任务'
            onClick={() => {
              this.add()
            }}
          />
        </div>
      )}
    >
      <Tabs defaultActiveKey='1'>
      <TabPane tab='系统任务' key='1'>
        <SetAuto/>
      </TabPane>
      <TabPane tab='自定义任务' key='2'>
        <SetCapacity />
      </TabPane>
      </Tabs>
    </ContentBox>
    )
  }
}

export default Main
