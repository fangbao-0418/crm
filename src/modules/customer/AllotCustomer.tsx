import React from 'react'
import { Table } from 'antd'
import ChooseOrganization from './chooseOrganization'
import ChooseSales from './chooseSales'
import Record from './Record'
import Import from '@/modules/customer/import'
class Main extends React.Component {
  public render () {
    return (
      <div>
        <Import />
      </div>
    )
  }
}
export default Main
