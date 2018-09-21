interface OrderItem {
    key?: string
    workOrder?: string
    name?: string
    creatDate?: string
    creatName?: string
    order?: string
    server?: string
    state?: string
}
type OrderList = Array<OrderItem>

export {
    OrderItem
}