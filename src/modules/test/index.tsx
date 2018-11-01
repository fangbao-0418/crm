import React from 'react'
import { Table, Button, Tooltip, Divider } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
// import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'

export default class Main extends React.Component {
	public render () {
		return (
			<ContentBox
				title='我的模板'
				rightCotent={
					<div>
						<AddButton
							title='新增'
							style={{marginRight: '10px'}}
						/>			
						<AddButton
							title='导入'
						/>
					</div>
				}
			>
				<div>
					搜索
					{/* <Condition /> */}
					查询
					<SearchName 
						style={{width: 290, paddingTop: 10}}
						options={[
							{ value: '', label: '客户名称'},
							{ value: '', label: '联系人'},
							{ value: '', label: '联系电话'}
						]}
						placeholder={'请输入客户名称'}
					/>
				</div>
				<Table />
				<div>
					<Button type='primary'>模板1</Button>
					<Button type='primary'>模板2</Button>
				</div>
			</ContentBox>
		)
	}
}
