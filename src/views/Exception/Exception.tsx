import React, { useState } from 'react'
import { Button, Card, Col, Empty, Row, Select, Space, Timeline } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'

import styles from './Exception.module.scss'

let date = new Date()
let year = date.getFullYear()

export default function Exception() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [month, setMonth] = useState(
    searchParams.get('month')
      ? Number(searchParams.get('month')) - 1
      : date.getMonth()
  )

  const handleChange = (value: number) => {
    setMonth(value)
    setSearchParams({ month: String(value + 1) })
  }

  const monthOptions = []
  for (let i = 0; i < 12; i++) {
    monthOptions.push(
      <Select.Option key={i} value={i}>
        {i + 1}月
      </Select.Option>
    )
  }

  return (
    <div className={styles.exception}>
      <Row justify='space-between' align='middle'>
        <Link to='/apply'>
          <Button type='primary'>异常处理</Button>
        </Link>
        <Space>
          <Button>2023年</Button>
          <Select value={month} onChange={handleChange}>
            {monthOptions}
          </Select>
        </Space>
      </Row>
      <Row className={styles['exception-line']} gutter={20}>
        <Col span={12}>
          {/* <Empty description='暂无异常考勤' imageStyle={{ height: 200 }} /> */}
          <Timeline>
            <Timeline.Item>
              <h3>2023/02/06</h3>
              <Card className={styles['exception-card']}>
                <Space>
                  <h4>旷工</h4>
                  <p>考勤详情：暂无打卡记录</p>
                </Space>
              </Card>
            </Timeline.Item>
          </Timeline>
          <Timeline>
            <Timeline.Item>
              <h3>2023/02/06</h3>
              <Card className={styles['exception-card']}>
                <Space>
                  <h4>旷工</h4>
                  <p>考勤详情：暂无打卡记录</p>
                </Space>
              </Card>
            </Timeline.Item>
          </Timeline>
        </Col>
        <Col span={12}>
          {/* <Empty description='暂无申请审批' imageStyle={{ height: 200 }} /> */}
          <Timeline>
            <Timeline.Item>
              <h3>事假</h3>
              <Card className={styles['exception-card']}>
                <h4>待审批</h4>
                <p className={styles['exception-content']}>
                  申请日期 2023-02-01 09:08:09 - 2023-02-06 09:09:12
                </p>
                <p className={styles['exception-content']}>申请详情 aaa</p>
              </Card>
            </Timeline.Item>
            <Timeline.Item>
              <h3>事假</h3>
              <Card className={styles['exception-card']}>
                <h4>待审批</h4>
                <p className={styles['exception-content']}>
                  申请日期 2023-02-01 09:08:09 - 2023-02-06 09:09:12
                </p>
                <p className={styles['exception-content']}>申请详情 aaa</p>
              </Card>
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </div>
  )
}
