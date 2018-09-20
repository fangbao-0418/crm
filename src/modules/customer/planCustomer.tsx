import React from 'react'
import { Table } from 'antd'
import ChooseOrganization from './chooseOrganization'
import ChooseSales from './chooseSales'
import ImportResult from './importResult'
import Record from './Record'
class Main extends React.Component {
  public render () {
    return (
      <div>
        <ChooseOrganization/>
        <ChooseSales/>
        <ImportResult/>
        <Record />
      </div>
    )
  }
}
export default Main
