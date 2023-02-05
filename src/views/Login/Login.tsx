import React from 'react'
import { useNavigate } from 'react-router-dom'
import { message, Button, Form, Input, Row, Col } from 'antd'
import classnames from 'classnames'

import { useAppDispatch } from '../../store'
import { loginAction, updateToken } from '../../store/modules/users'
import styles from './Login.module.scss'

interface User {
  email: string
  pass: string
}

const testUsers: User[] = [
  {
    email: 'huangrong@imooc.com',
    pass: 'huangrong',
  },
  {
    email: 'hongqigong@imooc.com',
    pass: 'hongqigong',
  },
]

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [form] = Form.useForm()

  const onFinish = (values: User) => {
    dispatch(loginAction(values)).then((action) => {
      const { errcode, token } = (
        action.payload as { [index: string]: unknown }
      ).data as { [index: string]: unknown }

      if (errcode === 0 && typeof token === 'string') {
        dispatch(updateToken(token))
        message.success('登录成功')
        navigate('/')
      } else {
        message.error('登录失败')
      }
    })
  }

  const onFinishFailed = ({ values }: { values: User }) => {
    console.log('Failed:', values)
  }

  const autoLogin = (user: User) => {
    return () => {
      form.setFieldsValue(user) // 设置数据的回显
      onFinish(user)
    }
  }

  return (
    <div className={styles['login']}>
      <div className={styles['header']}>
        <span className={styles['header-logo']}>
          <i
            className={classnames('iconfont icon-react', styles['icon-react'])}
          ></i>
          <i
            className={classnames(
              'iconfont icon-icon-test',
              styles['icon-icon-test']
            )}
          ></i>
          <i
            className={classnames(
              'iconfont icon-typescript',
              styles['icon-typescript']
            )}
          ></i>
        </span>
        <span className={styles['header-title']}>在线考勤系统</span>
      </div>
      <div className={styles.desc}>React + Typescript</div>
      <Form
        name='basic'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className={styles.main}
        form={form}
      >
        <Form.Item
          label='邮箱'
          name='email'
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入正确的邮箱地址' },
          ]}
        >
          <Input placeholder='请输入邮箱' />
        </Form.Item>

        <Form.Item
          label='密码'
          name='pass'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder='请输入密码' visibilityToggle={false} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type='primary' htmlType='submit'>
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.users}>
        <Row gutter={20}>
          {testUsers.map((v) => (
            <Col span={12} key={v.email}>
              <h3>
                测试账号，
                <Button onClick={autoLogin({ email: v.email, pass: v.pass })}>
                  一键登录
                </Button>
              </h3>
              <p>邮箱：{v.email}</p>
              <p>密码：{v.pass}</p>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Login
