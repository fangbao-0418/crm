import React from 'react'
import { Tabs } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import SetAuto from '@/modules/outsite/components/SetAuto'
import SetCapacity from '@/modules/outsite/components/SetCapacity'
import { connect } from 'react-redux'
const TabPane = Tabs.TabPane

class Main extends React.Component<OutSide.Props> {

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
      <Tabs
        onChange={(key: any) => {
          APP.dispatch<OutSide.Props>({
            type: 'change outside data',
            payload: {
              config: {
                common: {
                  tab: key
                }
              }
            }
          })
        }}
        defaultActiveKey={this.props.config.common.tab}
      >
        <TabPane tab='系统任务' key='1'>
          {this.props.config.common.tab === '1' && <SetAuto/>}
        </TabPane>
        <TabPane tab='自定义任务' key='2'>
          {this.props.config.common.tab === '2' && <SetCapacity />}
        </TabPane>
      </Tabs>
    </ContentBox>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.outside
})(Main)
