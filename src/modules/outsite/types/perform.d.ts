interface User {
    uid?: any
    username?: string
}
interface PerfromItem {
    id?: number                 // 主键id
    companyId?: number              // 公司ID
    productId?: number            // 商品ID
    productName?: string         // 商品名称
    productPrice?: number             // 商品价格
    reward?: number             // 绩效
    total?:number              //总记录数
    size?: number               //每页显示条数
    current?: number              // 当前页数，从1开始
    pages?: number               //总页数
    records?:any                 //数据集合
    status?: any
}
type PerformList = Array<PerfromItem>

type Func = (...args: Array<any>) => any

export {
    Func,
    PerfromItem,
    PerformList
}