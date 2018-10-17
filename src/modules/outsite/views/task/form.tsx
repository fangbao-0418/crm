import React from 'react'
import { withRouter, RouteProps } from 'react-router'
import monent, { Moment } from 'moment'
import { Tabs, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd'
import HCframe from '@/modules/common/components/HCframe'
import SearchOrder from '@/modules/outsite/components/SearchOrder'
import Mission from '@/modules/outsite/views/task/mission'
import Other from '@/modules/outsite/views/task/other'
import Service from '@/modules/outsite/services'
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
