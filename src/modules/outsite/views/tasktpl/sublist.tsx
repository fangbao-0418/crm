import React from 'react'
import { Tabs} from 'antd'
import { fetchRegion } from '@/modules/common/api'
import ContentBox from '@/modules/common/content'
import AddButton from "@/modules/common/content/AddButton";
import Modal from "pilipa/libs/modal";
import Provider from "@/components/Provider";
import BaseInfo from "@/modules/customer/BaseInfo";
import SetAuto from "@/modules/outsite/views/tasktpl/SetAuto";
import SetCapacity from "@/modules/outsite/views/tasktpl/SetCapacity";
const TabPane = Tabs.TabPane;
function callback(key: string) {
    console.log(key);
}
function onShowSizeChange(current:any, pageSize:any) {
    console.log(current, pageSize);
}
class Main extends React.Component {
    public componentWillMount () {
        fetchRegion().then((res) => {
            console.log(res)
        })
    }

    /*新增自定义任务未修改，这里是方法*/
    public add () {
        const modal = new Modal({
            style: 'width: 800px',
            content: (
                <Provider><BaseInfo onClose={() => {modal.hide()}}/></Provider>
            ),
            footer: null,
            title: '新增',
            mask: true,
            onCancel: () => {
                modal.hide()
            }
        })
        modal.show()
    }
    public callback (key: string) {
        console.log('key', key)
    }
    public render () {
        return (
            <ContentBox
                title='通办任务配置'
                rightCotent={(
                    <div>
                        <AddButton
                            style={{marginRight: '10px',color:'#3B91F7'}}
                            title='新增自定义任务'
                            onClick={() => {
                                this.add()
                            }}
                        />
                    </div>
                )}
            >
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="系统任务" key="1">
                        <SetAuto />
                    </TabPane>
                    <TabPane tab="自定义任务" key="2">
                        <SetCapacity />
                    </TabPane>
                </Tabs>
            </ContentBox>
        )
    }
}
export default Main
