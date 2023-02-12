import React, { useEffect, useState } from 'react'
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Table,
  Select,
  DatePicker,
  message,
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import _ from 'lodash'
import locale from 'antd/es/date-picker/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'

import styles from './Apply.module.scss'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  getApplyAction,
  postApplyAction,
  updateApplyList,
} from '../../store/modules/checks'
import type { Infos } from '../../store/modules/checks'

interface FormInfos {
  approvername: string
  note: string
  reason: string
  time: [string, string]
}

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

export default function Apply() {
  const [approverType, setApproverType] = useState(defaultType)
  const [searchWord, setSearchWord] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const usersInfos = useAppSelector((s) => s.users.infos)
  const applyList = useAppSelector((s) => s.checks.applyList).filter(
    (v) =>
      (v.state === approverType || defaultType === approverType) &&
      (v.note as string).includes(searchWord)
  )
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

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

  const approverTypeChanger = (ev: RadioChangeEvent) => {
    setApproverType(ev.target.value)
  }

  const searchWordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(ev.target.value)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    handleReset()
  }

  const onFinish = (values: FormInfos) => {
    values.time[0] = dayjs(values.time[0]).format('YYYY-MM-DD hh:mm:ss')
    values.time[1] = dayjs(values.time[1]).format('YYYY-MM-DD hh:mm:ss')
    const applyList = {
      ...values,
      applicantid: usersInfos._id as string,
      applicantname: usersInfos.name as string,
      approverid:
        Array.isArray(usersInfos.approver) &&
        usersInfos.approver.find((item) => item.name === values.approvername)
          ._id,
    }
    dispatch(postApplyAction(applyList)).then((action) => {
      const { errcode } = (action.payload as { [index: string]: unknown })
        .data as { [index: string]: unknown }

      if (errcode === 0) {
        message.success('添加审批成功')
        handleCancel()
        dispatch(
          getApplyAction({ applicantid: usersInfos._id as string })
        ).then((action) => {
          const { errcode, rets } = (
            action.payload as { [index: string]: unknown }
          ).data as {
            [index: string]: unknown
          }

          if (errcode === 0) {
            dispatch(updateApplyList(rets as Infos[]))
          }
        })
      }
    })
  }

  const onFinishFailed = ({ values }: { values: any }) => {
    console.log('Failed:', values)
  }

  const handleReset = () => {
    form.resetFields()
  }

  return (
    <div>
      <Row justify='space-between' className={styles['apply-title']}>
        <Button type='primary' onClick={showModal}>
          添加审批
        </Button>
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
        className={styles['spply-table']}
        dataSource={applyList}
        columns={columns}
        size='small'
        pagination={{ defaultPageSize: 5 }}
      />
      <Modal
        title='添加审批'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name='basic'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          className={styles['apply-form']}
          form={form}
        >
          <Form.Item
            label='审批人'
            name='approvername'
            rules={[{ required: true, message: '请选择审批人' }]}
          >
            <Select allowClear placeholder='请选择审批人'>
              {Array.isArray(usersInfos.approver) &&
                usersInfos.approver.map((item) => (
                  <Select.Option key={item._id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='审批事由'
            name='reason'
            rules={[{ required: true, message: '请选择审批人' }]}
          >
            <Select
              allowClear
              placeholder='请选择请假事由'
              options={[
                { value: '年假', label: '年假' },
                { value: '事假', label: '事假' },
                { value: '病假', label: '病假' },
                { value: '外出', label: '外出' },
                { value: '补签卡', label: '补签卡' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label='时间'
            name='time'
            rules={[{ required: true, message: '请选择审批时间' }]}
          >
            <DatePicker.RangePicker showTime locale={locale} />
          </Form.Item>
          <Form.Item
            label='备注'
            name='note'
            rules={[{ required: true, message: '请输入备注' }]}
          >
            <Input.TextArea rows={4} placeholder='请输入备注' />
          </Form.Item>
          <Row justify='end'>
            <Space>
              <Button onClick={handleReset}>重置</Button>
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}
