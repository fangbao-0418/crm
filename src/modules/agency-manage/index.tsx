import React from 'react'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'

const styles = require('./style')

class Main extends React.Component {

  public render () {
    return (
      <ContentBox
        title='机构管理'
        rightCotent={(
          <AddButton
            title='增加'
            onClick={() => {}}
          />
        )}
      >

      </ContentBox>
    )
  }
}

export default Main
