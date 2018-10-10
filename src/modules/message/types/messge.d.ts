interface User {
    uid?: any
    username?: string
}
interface MessageItem {
    id?: string                 // 主键id
    title?: string              // 消息标题
    content?: string            // 消息内容
    read?: boolean            // 是否已读（true:已读）
    targetType?: string         // 消息类型，工单为:TRACK_WORK
    target?: string             // 目标消息类型编号,如果是催单，则为工单编号
    action?: string             // 行为，催单为：REMINDER
    sender?: User               // 发送人，uid:用户主键 username:用户名称
    recipient?: User            // 接受人，uid:用户主键 username:用户名称
    createdAt?: any              // 发送时间
}
type MessageList = Array<MessageItem>

type Func = (...args: Array<any>) => any

export {
    Func,
    MessageItem,
    MessageList
}