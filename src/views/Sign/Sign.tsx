import React, { useState } from 'react'
import { Descriptions, Button, Tag, Calendar, Row, Space, Select } from 'antd'
import "dayjs/locale/zh-cn"
import locale from 'antd/es/date-picker/locale/zh_CN'
 
import styles from './Sign.module.scss'
import { useNavigate } from 'react-router-dom'

const date = new Date()

enum DetailKey {
  normal = '正常出勤',
  absent = '旷工',
  miss = '漏打卡',
  late = '迟到',
  early = '早退',
  lateAndEarly = '迟到并早退',
}

const originDetailValue: Record<keyof typeof DetailKey, number> = {
  normal: 0,
  absent: 0,
  miss: 0,
  late: 0,
  early: 0,
  lateAndEarly: 0,
}

const detailState = {
  type: 'success' ? 'success' : 'error',
  text: '正常' ? '正常' : '异常'
}

export default function Sign() {
  const [month, setMonth] = useState(date.getMonth())
  const navigate = useNavigate()
  const handleToException = () => {
    navigate('/exception<tab>')
  }

  return (
    <div>
      <Descriptions className={styles['descriptions']} layout="vertical" column={9} bordered>
        <Descriptions.Item label="月份">{month + 1}月</Descriptions.Item>
        {
          Object.entries(DetailKey).map((v) => (
            <Descriptions.Item key={v[0]} label={v[1]}>
              {originDetailValue[v[0] as keyof typeof DetailKey]}
            </Descriptions.Item>
          ))
        }
        <Descriptions.Item label="操作">
          <Button type="primary" onClick={handleToException} ghost size="small">查看详情</Button>
        </Descriptions.Item>
        <Descriptions.Item label="考勤状态">
          <Tag color={detailState.type}>{detailState.text}</Tag>
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
              <Select value={month} onChange={(newMonth) => {
                setMonth(newMonth)
                onChange(value.clone().month(newMonth))
              }}>{ monthOptions }</Select>
            </Space>
          </Row>
        )
      }} />
    </div>
  )
}
