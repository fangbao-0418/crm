interface OrderItem {
    id?: string
    name?: string
    priority?: string
    status?: string
    type?: string
    category?: string
    subList?: string
    delFlag?:string
}
type OrderList = Array<OrderItem>

export {
    OrderItem
}