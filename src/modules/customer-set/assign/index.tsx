import React from 'react'
import { Button } from 'antd'
import AddButton from '@/modules/common/content/AddButton'
import Content from '@/modules/common/content'
import Card from '@/components/Card'
import General from './General'
import Special from './Special'
class Main extends React.Component {
  public render () {
    return (
      <Content title='分客设置'>
        <Card
          title='一般资源分客策略'
          showFold
          rightContent={(
            <Button type='primary' >编辑</Button>
          )}
        >
          <General />
        </Card>
        <Card
          title='特殊资源分客策略'
          showFold
          rightContent={(
            <AddButton
              title='新增'
            />
          )}
        >
          <Special />
        </Card>
      </Content>
    )
  }
}
export default Main
