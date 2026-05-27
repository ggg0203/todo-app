import React, { useState, useEffect } from 'react'
import { List, Checkbox, Button, Input, Popconfirm, Tag, Typography, Spin, Empty, message } from 'antd'
import { PlusOutlined, DeleteOutlined, LogoutOutlined } from '@ant-design/icons'
import { getTodos, updateTodo, deleteTodo } from './api'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const App = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchTodos = async () => {
    try {
      const res = await getTodos()
      setTodos(res.data)
    } catch {
      message.error('无法连接后端服务')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTodos() }, [])

  const handleToggle = async (todo) => {
    await updateTodo(todo.id, { completed: !todo.completed })
    fetchTodos()
  }

  const handleDelete = async (id) => {
    await deleteTodo(id)
    message.success('已删除')
    fetchTodos()
  }

  const pending = todos.filter(t => !t.completed)
  const done = todos.filter(t => t.completed)

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>待办事项</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add')}>
          新建任务
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60 }}><Spin size="large" /></div>
      ) : todos.length === 0 ? (
        <Empty description="暂无任务，点击右上角新建" />
      ) : (
        <>
          {pending.length > 0 && (
            <List
              header={<Tag color="blue">待完成 ({pending.length})</Tag>}
              dataSource={pending}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Popconfirm title="确定删除？" onConfirm={() => handleDelete(item.id)}>
                      <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>,
                  ]}
                >
                  <Checkbox checked={item.completed} onChange={() => handleToggle(item)}>
                    {item.title}
                  </Checkbox>
                </List.Item>
              )}
              style={{ marginBottom: 16 }}
            />
          )}
          {done.length > 0 && (
            <List
              header={<Tag color="green">已完成 ({done.length})</Tag>}
              dataSource={done}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Popconfirm title="确定删除？" onConfirm={() => handleDelete(item.id)}>
                      <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>,
                  ]}
                >
                  <Checkbox checked={item.completed} onChange={() => handleToggle(item)}>
                    <span style={{ textDecoration: 'line-through', color: '#999' }}>{item.title}</span>
                  </Checkbox>
                </List.Item>
              )}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App