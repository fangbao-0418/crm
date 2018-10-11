import { ConditionOptionProps } from '@/modules/common/search/Condition'
const all = [{
  label: '全部',
  value: ''
}]
const data: ConditionOptionProps[] = [
  {
    field: 'date',
    value: '',
    label: ['入库时间', '创建时间', '最后跟进时间'],
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '今天',
        value: '1'
      },
      {
        label: '7天',
        value: '7'
      },
      {
        label: '30天',
        value: '30'
      }
    ],
    type: 'date'
  },
  {
    label: ['意向度'],
    value: '',
    field: 'intention',
    options: all.concat(APP.keys.EnumIntentionality)
  },
  {
    field: 'telephoneStatus',
    value: '',
    label: ['电话状态'],
    options: all.concat(APP.keys.EnumContactStatus)
  }
]
export default data
