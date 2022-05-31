import React from 'react'
import 'antd/dist/antd.variable.min.css'
import { Table, Button, Input, Space } from 'antd'
import { SearchOutlined, RollbackOutlined, DeleteOutlined } from '@ant-design/icons'
import { CButton, CContainer, CRow, CCol, CCard, CCardBody, CTooltip } from '@coreui/react'
import SendMessage from './SendMessage'
import './table.css'

const Messages = () => {
  function renderMessage() {
    return <SendMessage title="Reply" />
  }

  const dataSource = [
    {
      key: '1',
      date: '4/01/2022',
      from: 'John Doe',
      subject: 'New loan application',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2',
      date: '4/01/2022',
      from: 'Ann Richards',
      subject: 'Underwriting Results',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
  ]

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      width: 200,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      width: 200,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.from.length - b.from.length,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Type here"
              onPressEnter={() => {
                confirm()
              }}
              onBlur={() => {
                confirm()
              }}
              style={{ marginBottom: 8, display: 'block' }}
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }}
            />
            <Space>
              <Button
                type="primary"
                size="small"
                style={{ width: 90 }}
                onClick={() => {
                  confirm()
                }}
              >
                Search
              </Button>
              <Button
                type="danger"
                size="small"
                style={{ width: 90 }}
                onClick={() => {
                  clearFilters()
                }}
              >
                Reset
              </Button>
            </Space>
          </div>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.from.toLowerCase().includes(value.toLowerCase())
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: 600,
      // eslint-disable-next-line no-undef
      align: 'left',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.subject.localeCompare(b.subject),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Type here"
              onPressEnter={() => {
                confirm()
              }}
              onBlur={() => {
                confirm()
              }}
              style={{ marginBottom: 8, display: 'block' }}
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }}
            />
            <Space>
              <Button
                type="primary"
                size="small"
                style={{ width: 90 }}
                onClick={() => {
                  confirm()
                }}
              >
                Search
              </Button>
              <Button
                type="danger"
                size="small"
                style={{ width: 90 }}
                onClick={() => {
                  clearFilters()
                }}
              >
                Reset
              </Button>
            </Space>
          </div>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.subject.toLowerCase().includes(value.toLowerCase())
      },
    },
    Table.SELECTION_COLUMN,
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 200,
      align: 'center',
      key: 'actions',
      render: (action) => {
        return (
          <>
            <Space>
              <CTooltip content="Reply" placement="bottom">
                <SendMessage button={<RollbackOutlined />} size="sm" title="Reply" />
              </CTooltip>
              <CTooltip content="Delete" placement="top">
                <CButton size="sm" color="danger" variant="outline">
                  <DeleteOutlined />
                </CButton>
              </CTooltip>
            </Space>
          </>
        )
      },
    },
  ]

  return (
    <div>
      <CContainer>
        <h2>Messages</h2>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol>
                <SendMessage title="New Message" button={`New Message`} />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <Table
                  style={{ display: 'flex', flex: 1, marginTop: 10 }}
                  dataSource={dataSource}
                  columns={columns}
                  expandable={{
                    expandedRowRender: (record) => (
                      <p style={{ margin: 0 }}>{record.description}</p>
                    ),
                  }}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default Messages
