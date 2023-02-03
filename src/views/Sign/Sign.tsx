import React, { useState } from 'react'
import { Descriptions, Button, Tag, Calendar, Row, Space, Select } from 'antd'
import "dayjs/locale/zh-cn"
import locale from 'antd/es/date-picker/locale/zh_CN'
 
import styles from './Sign.module.scss'

const date = new Date()

export default function Sign() {
  const [month, setMonth] = useState(date.getMonth())

  return (
    <div>
      <Descriptions className={styles['descriptions']} layout="vertical" column={9} bordered>
        <Descriptions.Item label="月份">{month + 1}月</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="操作">
          <Button type="primary" ghost size="small">查看详情</Button>
        </Descriptions.Item>
        <Descriptions.Item label="考勤状态">
          <Tag color="success">正常</Tag>
        </Descriptions.Item>
      </Descriptions>
      <Calendar locale={locale} headerRender={({ value, type, onChange, onTypeChange }) => {
        
        const monthOptions = []

        for (let i = 0; i < 12; i++) {
          monthOptions.push( <Select.Option key={i} value={i}>{i+1}月</Select.Option> )
        }

        return (
          <Row className={styles['calendar-header']} justify="space-between" align="middle">
            <Button type="primary">在线签到</Button>
            <Space>
              <Button>{value.year()}年</Button>
              <Select value={month}>{ monthOptions }</Select>
            </Space>
          </Row>
        )
      }} />
    </div>
  )
}
