import React from 'react'
import { Table } from 'antd'
import Steps from './steps'
import ChooseOrganization from './chooseOrganization'
import ChooseSales from './chooseSales'
import ImportResult from './importResult'
class Main extends React.Component {
  public render () {
    return (
      <div>
        <Steps/>
        <ChooseOrganization/>
        <ChooseSales/>
        <ImportResult/>
      </div>
    )
  }
}
export default Main
