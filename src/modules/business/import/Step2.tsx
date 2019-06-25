import React from 'react'
import { Upload, Icon, message, Button } from 'antd'
import { importFile, checkFile } from '@/modules/customer/api'
const Dragger = Upload.Dragger
const styles = require('./style')
interface Props {
  onOk?: (value?: any) => void
  onPre?: () => void
  paramsValue?: {
    step1?: {
      customerSource?: string,
      salesPerson?: Array<{id: string, name: string}>
      type?: string
      /** 后缀 */
      customerNameSuffix?: string
    }
  }
}
interface State {
  info: any
  isCanCheck: boolean
  isCanExport: boolean
  signal: string
}
class Main extends React.Component<Props> {
  public state: State = {
    info: {},
    isCanCheck: false,
    isCanExport: false,
    signal: ''
  }
  // public downFile () {
  //   const fileUrl = require('@/assets/files/客资导入模板.xlsx')
  //   const el = document.createElement('a')
  //   el.setAttribute('href', fileUrl)
  //   el.setAttribute('download', '客资导入模版')
  //   el.click()
  // }
  public check () {
    const info = this.state.info
    const name = info.file.name
    const suffix = name.substr(name.lastIndexOf('.'))
    if (suffix !== '.xls' && suffix !== '.xlsx') {
      APP.error('请导入excel格式文件')
      return
    }
    console.log(this.props.paramsValue, 'paramsValue')
    const ids: string[] = []
    const salesNames: string[] = []
    if (this.props.paramsValue.step1.salesPerson instanceof Array) {
      this.props.paramsValue.step1.salesPerson.forEach((item, index) => {
        ids.push(item.id)
        salesNames.push(item.name)
      })
    }
    const paramsFile = {
      agencyId: APP.user.companyId, // 需要从登陆信息读取
      agencyName: APP.user.companyName,
      customerSource: this.props.paramsValue.step1.customerSource,
      salesPersonIds: ids.join(','),
      salesPersonNames: salesNames.join(','),
      cityCode: APP.user.cityCode || '', // 需要从登陆信息读取
      cityName: APP.user.city || '', // 需要从登陆信息读取APP.user.city
      type: this.props.paramsValue.step1.type,
      customerNameSuffix: this.props.paramsValue.step1.customerNameSuffix
    }
    console.log(paramsFile, 'paramsFile')
    return checkFile(info.file, paramsFile).then((res) => {
      if (res.status === 200) {
        APP.success('文件检测通过，请导入')
        this.setState({
          isCanExport: true,
          signal: res.data && res.data.signal
        })
      } else {
        APP.error(res.message)
        this.setState({
          isCanExport: false
        })
      }
    })
  }
  public uploadFile () {
    const info = this.state.info
    const name = info.file.name
    const suffix = name.substr(name.lastIndexOf('.'))
    if (suffix !== '.xls' && suffix !== '.xlsx') {
      APP.error('请导入excel格式文件')
      return
    }
    console.log(this.props.paramsValue, 'paramsValue')
    const ids: string[] = []
    const salesNames: string[] = []
    if (this.props.paramsValue.step1.salesPerson instanceof Array) {
      this.props.paramsValue.step1.salesPerson.forEach((item, index) => {
        ids.push(item.id)
        salesNames.push(item.name)
      })
    }
    const paramsFile = {
      agencyId: APP.user.companyId, // 需要从登陆信息读取
      agencyName: APP.user.companyName,
      customerSource: this.props.paramsValue.step1.customerSource,
      salesPersonIds: ids.join(','),
      salesPersonNames: salesNames.join(','),
      cityCode: APP.user.cityCode || '', // 需要从登陆信息读取
      cityName: APP.user.city || '', // 需要从登陆信息读取APP.user.city
      type: this.props.paramsValue.step1.type,
      signal: this.state.signal,
      customerNameSuffix: this.props.paramsValue.step1.customerNameSuffix
    }
    console.log(paramsFile, 'paramsFile')
    return importFile(info.file, paramsFile).then((res) => {
      if (res.status === 200) {
        if (this.props.onOk) {
          this.props.onOk(res.data)
        }
      } else {
        APP.error(res.message)
      }
    })
  }
  public render () {
    const props = {
      name: 'file',
      multiple: false,
      showUploadList: true,
      beforeUpload: () => {
        return false
      },
      onChange: (info: any) => {
        console.log(info, 'this.info')
        if (info.fileList.length === 0) {
          this.setState({
            isCanCheck: false,
            isCanExport: false
          })
        } else {
          this.setState({
            isCanCheck: true
          })
        }
        this.setState({
          info
        })
      }
    }
    return (
      <div>
        <div className={styles.step2}>
          <Dragger {...props}>
            <Button disabled={this.state.isCanCheck} type='primary' className='mr10'>上传文件</Button>
          </Dragger>
          {/* <Button className={styles.down} type='ghost' onClick={this.downFile.bind(this)}>下载客户模版</Button>
          {
            !this.state.disabled &&
            <p className='text-center'>
              导入说明：导入文件仅支持excel格式
            </p>
          } */}
        </div>
        <div className='text-right'>
          {/* <Button className='mr5' type='ghost' onClick={() => {this.props.onPre()}}>上一步</Button> */}
          <Button disabled={!this.state.isCanCheck} className='mr5' type='primary' onClick={() => this.check()}>检查</Button>
          <Button disabled={!this.state.isCanExport} type='primary' onClick={this.uploadFile.bind(this)}>导入</Button>
        </div>
      </div>
    )
  }
}
export default Main
