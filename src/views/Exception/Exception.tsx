import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Empty, Row, Select, Space, Timeline } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import _ from 'lodash'

import styles from './Exception.module.scss'
import { useAppDispatch, useAppSelector } from '../../store'
import { getTimeAction, updateInfos } from '../../store/modules/signs'
import type { Infos } from '../../store/modules/signs'
import { toZero } from '../../utils/common'
import { getApplyAction, updateApplyList } from '../../store/modules/checks'

let date = new Date()
let year = date.getFullYear()

export default function Exception() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [month, setMonth] = useState(
    searchParams.get('month')
      ? Number(searchParams.get('month')) - 1
      : date.getMonth()
  )
  const signsInfos = useAppSelector((s) => s.signs.infos)
  const usersInfos = useAppSelector((s) => s.users.infos)
  const applyList = useAppSelector((s) => s.checks.applyList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (_.isEmpty(applyList)) {
      dispatch(getApplyAction({ applicantid: usersInfos._id as string })).then(
        (action) => {
          const { errcode, rets } = (
            action.payload as { [index: string]: unknown }
          ).data as {
            [index: string]: unknown
          }

          if (errcode === 0) {
            dispatch(updateApplyList(rets as Infos[]))
          }
        }
      )
    }
  }, [applyList, usersInfos, dispatch])

  useEffect(() => {
    if (_.isEmpty(signsInfos)) {
      dispatch(getTimeAction({ userid: usersInfos._id as string })).then(
        (action) => {
          const { errcode, infos } = (
            action.payload as { [index: string]: unknown }
          ).data as {
            [index: string]: unknown
          }

          if (errcode === 0) {
            dispatch(updateInfos(infos as Infos))
          }
        }
      )
    }
  }, [signsInfos, usersInfos, dispatch])

  let details
  if (signsInfos.detail) {
    const detailMonth = (signsInfos.detail as { [index: string]: unknown })[
      toZero(month + 1)
    ] as {
      [index: string]: string
    }
    details = Object.entries(detailMonth)
      .filter((v) => v[1] !== '正常出勤')
      .sort()
  }

  const applyListMonth = applyList.filter((v) => {
    const startTime = (v.time as string[])[0].split(' ')[0].split('-')
    const endTime = (v.time as string[])[1].split(' ')[0].split('-')
    return startTime[1] <= toZero(month + 1) && endTime[1] >= toZero(month + 1)
  })

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

  const renderTime = (date: string) => {
    const ret = (
      (signsInfos.time as { [index: string]: unknown })[toZero(month + 1)] as {
        [index: string]: unknown
      }
    )[date]

    if (Array.isArray(ret)) {
      return ret.join('-')
    } else {
      return '暂无打卡记录'
    }
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
          {details ? (
            <Timeline>
              {details.map((item) => {
                return (
                  <Timeline.Item key={item[0]}>
                    <h3>
                      {year}/{month + 1}/{item[0]}
                    </h3>
                    <Card className={styles['exception-card']}>
                      <Space>
                        <h4>{item[1]}</h4>
                        <p>考勤详情：{renderTime(item[0])}</p>
                      </Space>
                    </Card>
                  </Timeline.Item>
                )
              })}
            </Timeline>
          ) : (
            <Empty description='暂无异常考勤' imageStyle={{ height: 200 }} />
          )}
        </Col>
        <Col span={12}>
          {applyListMonth.length ? (
            <Timeline>
              {applyListMonth.map((item) => {
                return (
                  <Timeline.Item key={item._id as string}>
                    <h3>{item.reason as string}</h3>
                    <Card className={styles['exception-card']}>
                      <h4>{item.state as string}</h4>
                      <p className={styles['exception-content']}>
                        申请日期 {(item.time as string[])[0]} -{' '}
                        {(item.time as string[])[1]}
                      </p>
                      <p className={styles['exception-content']}>
                        申请详情 {item.note as string}
                      </p>
                    </Card>
                  </Timeline.Item>
                )
              })}
            </Timeline>
          ) : (
            <Empty description='暂无申请审批' imageStyle={{ height: 200 }} />
          )}
        </Col>
      </Row>
    </div>
  )
}
