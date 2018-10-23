import React from 'react'
import { withRouter } from 'react-router'
import IFrom from '@/modules/outsite/views/task/inform'

class Form extends React.Component {
  constructor (props: any) {
    super(props)
  }

  public render () {
    return <IFrom {...this.props} />
  }
}

export default withRouter(Form)
