import React, { useState, useEffect } from 'react'
import { Descriptions, Button, Tag, Calendar, Row, Space, Select, message } from 'antd'
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import type { Dayjs } from 'dayjs'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

import styles from './Sign.module.scss'
import { useAppDispatch, useAppSelector } from '../../store'
import { getTimeAction, putTimeAction, updateInfos } from '../../store/modules/signs'
import type { Infos } from '../../store/modules/signs'
import { toZero } from '../../utils/common'

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
  text: '正常' ? '正常' : '异常',
}

export default function Sign() {
  const [month, setMonth] = useState(date.getMonth())
  const navigate = useNavigate()
  const signsInfos = useAppSelector((s) => s.signs.infos)
  const usersInfos = useAppSelector((s) => s.users.infos)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (_.isEmpty(signsInfos)) {
      dispatch(getTimeAction({ userid: usersInfos._id as string })).then((action) => {
        const { errcode, infos } = (action.payload as { [index: string]: unknown })
          .data as {
          [index: string]: unknown
        }

        if (errcode === 0) {
          dispatch(updateInfos(infos as Infos))
        }
      })
    }
  }, [signsInfos, usersInfos, dispatch])

  const handlePutTime = () => {
    dispatch(putTimeAction({ userid: usersInfos._id as string })).then((action) => {
      const { errcode, infos } = (action.payload as { [index: string]: unknown })
        .data as {
        [index: string]: unknown
      }

      if (errcode === 0) {
        dispatch(updateInfos(infos as Infos))
        message.success('签到成功')
      }
    })
  }

  const handleToException = () => {
    navigate('/exception')
  }

  const dateCellRender = (value: Dayjs) => {
    const month =
      signsInfos.time &&
      (signsInfos.time as { [index: string]: unknown })[toZero(value.month() + 1)]
    const date = month && (month as { [index: string]: unknown })[toZero(value.date())]
    let ret = ''

    if (Array.isArray(date)) {
      ret = date.join(' - ')
    }

    return <div className={styles['show-time']}>{ret}</div>
  }

  return (
    <div>
      <Descriptions
        className={styles['descriptions']}
        layout='vertical'
        column={9}
        bordered
      >
        <Descriptions.Item label='月份'>{month + 1}月</Descriptions.Item>
        {Object.entries(DetailKey).map((v) => (
          <Descriptions.Item key={v[0]} label={v[1]}>
            {originDetailValue[v[0] as keyof typeof DetailKey]}
          </Descriptions.Item>
        ))}
        <Descriptions.Item label='操作'>
          <Button type='primary' onClick={handleToException} ghost size='small'>
            查看详情
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label='考勤状态'>
          <Tag color={detailState.type}>{detailState.text}</Tag>
        </Descriptions.Item>
      </Descriptions>
      <Calendar
        locale={locale}
        dateCellRender={dateCellRender}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const monthOptions = []

          for (let i = 0; i < 12; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i}>
                {i + 1}月
              </Select.Option>
            )
          }

          return (
            <Row
              className={styles['calendar-header']}
              justify='space-between'
              align='middle'
            >
              <Button type='primary' onClick={handlePutTime}>
                在线签到
              </Button>
              <Space>
                <Button>{value.year()}年</Button>
                <Select
                  value={month}
                  onChange={(newMonth) => {
                    setMonth(newMonth)
                    onChange(value.clone().month(newMonth))
                  }}
                >
                  {monthOptions}
                </Select>
              </Space>
            </Row>
          )
        }}
      />
    </div>
  )
}
