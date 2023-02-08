import React, { useState } from 'react'
import {
  Button,
  Divider,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Table,
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import styles from './Apply.module.scss'

const approverTypes = [
  { label: '全部', value: '全部' },
  { label: '待审批', value: '待审批' },
  { label: '已通过', value: '已通过' },
  { label: '未通过', value: '未通过' },
]

const defaultType = approverTypes[0].value

export default function Apply() {
  const [approverType, setApproverType] = useState(defaultType)

  const approverTypeChanger = (ev: RadioChangeEvent) => {
    setApproverType(ev.target.value)
  }

  const dataSource: any = []
  const columns: any = [
    {
      title: '申请人',
      dataIndex: 'applicantname',
      key: 'applicantname',
    },
    {
      title: '审批事由',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
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
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
  ]

  return (
    <div>
      <Row justify='space-between' className={styles['apply-title']}>
        <Button type='primary'>添加审批</Button>
        <Space>
          <Input placeholder='请输入关键词' />
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
        className={styles['spply-table']}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  )
}
