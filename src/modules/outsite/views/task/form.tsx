import React from 'react'
import monent, { Moment } from 'moment'
import { Tabs } from 'antd'
import HCframe from '@/modules/common/components/HCframe'
import SearchOrder from '@/modules/outsite/components/SearchOrder'
import Mission from '@/modules/outsite/views/task/mission'
import Other from '@/modules/outsite/views/task/other'
const TabPane = Tabs.TabPane
function callback (key: string) {
  console.log(key)
}

const styles = require('@/modules/outsite/styles/form.styl')

// 列表
class Main extends React.Component {
  public constructor (props: any, state: any) {
    super({})
  }

  public render () {
    return (
    <div>
      <HCframe title='新增外勤任务'>
        <Tabs defaultActiveKey='1' onChange={callback} className={styles.add}>
            <TabPane tab='通办任务' key='1'>
              <Mission/>
            </TabPane>
            <TabPane tab='其他任务' key='2'>
              <Other/>
            </TabPane>
          </Tabs>
          <div>
              <SearchOrder/>
          </div>
      </HCframe>
    </div>
    )
  }
}
export default Main
