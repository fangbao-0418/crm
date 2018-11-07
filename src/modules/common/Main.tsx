import React from 'react'
import { connect } from 'react-redux'
import Route from '@/components/Route'
import Iframe from 'pilipa-terrace/libs/iframe'
import modules from '@/router/modules'
class Main extends React.Component<Common.Props> {
  public render () {
    return (
      <Iframe
        env={APP.env}
        token={APP.token}
        onChange={(user) => {
          APP.user = user
        }}
      >
        <Route hidden={!APP.hasPermission('track_outside_task_list')} path='/outsite/task/list' component={modules.TaskList}/>
        <Route path='/outsite/task/show/:id' component={modules.TaskShow}/>
        <Route hidden={!APP.hasPermission('track_outside_task_add')} path='/outsite/task/form' component={modules.TaskForm}/>
        <Route hidden={!APP.hasPermission('track_outside_tasktemplate_main')} path='/outsite/tasktpl/list' component={modules.TasktplList}/>
        <Route path='/outsite/tasktpl/form/:id?' component={modules.TasktplForm}/>
        <Route hidden={!APP.hasPermission('track_outside_tasktemplate_sub')} path='/outsite/tasktpl/sublist' component={modules.TasktplSublist}/>
        <Route path='/outsite/tasktpl/subform/:id?' component={modules.TasktplSubform}/>
        <Route hidden={!APP.hasPermission('track_outside_reward_config')} path='/outsite/perform/list' component={modules.PerformList}/>
        <Route hidden={!APP.hasPermission('track_outside_data_overview')} path='/outsite/data-overview' component={modules.TaskDataOverview}/>
        <Route hidden={!APP.hasPermission('track_outside_data_detail')} path='/outsite/data-detail' component={modules.TaskDataDetail}/>
      </Iframe>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.common
})(Main)
