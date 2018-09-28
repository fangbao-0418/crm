import moment from 'moment'
// 获取时间区间
export const getDateSection = (day: number, refer: Date = new Date(), format: string = 'YYYY-MM-DD') => {
  const start = moment(refer).startOf('day')
  const end = moment(refer).startOf('day').add(day, 'day')
  return {
    startDate: start.format(format),
    endDate: end.format(format)
  }
}
