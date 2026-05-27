import React, { useState } from 'react'
import { Input, Button, Card, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { createTodo } from '../api'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!title.trim()) {
      message.warning('请输入任务内容')
      return
    }
    setLoading(true)
    try {
      await createTodo(title)
      message.success('创建成功')
      navigate('/')
    } catch {
      message.error('创建失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', padding: '0 16px' }}>
      <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} style={{ padding: 0, marginBottom: 16 }}>
        返回列表
      </Button>
      <Card title="新建任务">
        <Input.TextArea
          rows={3}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="输入任务内容..."
          onPressEnter={handleSubmit}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          style={{ marginTop: 16 }}
          block
        >
          创建
        </Button>
      </Card>
    </div>
  )
}

export default Add