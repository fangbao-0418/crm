interface OrderItem {
    id?: string
    workNo?: string
    customerName?: string
    createTime?: string
    creatName?: string
    name?: string
    status?: string
    managerName?:string
}
type OrderList = Array<OrderItem>

export {
    OrderItem
}