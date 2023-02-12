import React, { useState } from 'react'
import { Button, Divider, Input, Radio, Row, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { RadioChangeEvent } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import styles from './Check.module.scss'
import { useAppSelector, useAppDispatch } from '../../store'
import type { Infos } from '../../store/modules/checks'

const approverTypes = [
  { label: '全部', value: '全部' },
  { label: '待审批', value: '待审批' },
  { label: '已通过', value: '已通过' },
  { label: '未通过', value: '未通过' },
]
const defaultType = approverTypes[0].value

const columns: ColumnsType<Infos> = [
  {
    title: '申请人',
    dataIndex: 'applicantname',
    key: 'applicantname',
    width: 180,
  },
  {
    title: '审批事由',
    dataIndex: 'reason',
    key: 'reason',
    width: 180,
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    render(_) {
      return _.join('-')
    },
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: '审批人',
    dataIndex: 'approvername',
    key: 'approvername',
    width: 180,
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    width: 180,
  },
]

export default function Check() {
  const [approverType, setApproverType] = useState(defaultType)
  const [searchWord, setSearchWord] = useState('')
  const checkList = useAppSelector((s) => s.checks.checkList).filter(
    (v) =>
      (v.state === approverType || defaultType === approverType) &&
      (v.note as string).includes(searchWord)
  )

  const approverTypeChanger = (ev: RadioChangeEvent) => {
    setApproverType(ev.target.value)
  }

  const searchWordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(ev.target.value)
  }

  return (
    <div>
      <Row className={styles['check-title']} justify='space-between'>
        <Button type='primary'>添加审批</Button>
        <Space>
          <Input
            placeholder='请输入关键词'
            value={searchWord}
            onChange={searchWordChange}
          />
          <Button type='primary' icon={<SearchOutlined />}>
            搜索
          </Button>
          <Divider type='vertical' style={{ borderLeftColor: '#dcdfe6' }} />
          <Radio.Group
            options={approverTypes}
            optionType='button'
            buttonStyle='solid'
            value={approverType}
            onChange={approverTypeChanger}
          />
        </Space>
      </Row>
      <Table
        rowKey='_id'
        className={styles['check-table']}
        dataSource={checkList}
        columns={columns}
        size='small'
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  )
}
