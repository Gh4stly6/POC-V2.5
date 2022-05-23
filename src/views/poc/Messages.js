import React from 'react'
import 'antd/dist/antd.variable.min.css'
import { Table, Button, Input, Space } from 'antd'
import { SearchOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import './table.css'

const Messages = () => {
  const dataSource = [
    {
      key: '1',
      product: 'Home Equity',
      date: '4/01/2022',
      loan_id: '944ce9de-c296-4937-9e85-f3574d782c43',
      borrower: 'John Doe',
      credit_score: '800',
      title_run: 'Done',
      appraisal: 'In process',
      employment_status: 'In process',
      final_Desicion: 'Make',
    },
    {
      key: '2',
      product: 'Home Equity',
      date: '3/22/2022',
      loan_id: '944ce9de-c296-4937-9e85-f3574d7825855',
      borrower: 'Alice Smith',
      credit_score: '700',
      title_run: 'Done',
      appraisal: 'Done',
      employment_status: 'Done',
      final_Desicion: 'No',
    },
  ]

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.product.length - b.product.length,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Loan ID',
      dataIndex: 'loan_id',
      key: 'loan_id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.loan_id.localeCompare(b.loan_id),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Type Loan ID here"
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
        return record.loan_id.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'Borrower',
      dataIndex: 'borrower',
      key: 'borrower',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.borrower.length - b.borrower.length,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Type borrower here"
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
        return record.borrower.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'Credit Score',
      dataIndex: 'credit_score',
      key: 'credit_score',
      sorter: (a, b) => a.credit_score - b.credit_score,
    },
    {
      title: 'Title Run',
      dataIndex: 'title_run',
      key: 'title_run',
      sorter: (a, b) => a.title_run.localeCompare(b.title_run),
      render: (tag) =>
        tag === 'In process' ? (
          <CloseCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="red" />
        ) : (
          <CheckCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="#52c41a" />
        ),
    },
    {
      title: 'Appraisal',
      dataIndex: 'appraisal',
      key: 'appraisal',
      sorter: (a, b) => a.appraisal.localeCompare(b.appraisal),
      render: (tag) =>
        tag === 'In process' ? (
          <CloseCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="red" />
        ) : (
          <CheckCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="#52c41a" />
        ),
    },
    {
      title: 'Employment Status',
      dataIndex: 'employment_status',
      key: 'employment_status',
      sorter: (a, b) => a.employment_status.localeCompare(b.employment_status),
      render: (tag) =>
        tag === 'In process' ? (
          <CloseCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="red" />
        ) : (
          <CheckCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="#52c41a" />
        ),
    },
    {
      title: 'Final Desicion',
      dataIndex: 'final_Desicion',
      key: 'final_Desicion',
      sorter: (a, b) => a.final_Desicion.localeCompare(b.final_Desicion),
      render: (row) =>
        row !== 'Yes' && row !== 'No' ? (
          <Button value="small">Make Final Decision</Button>
        ) : (
          <b>{row}</b>
        ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Type borrower here"
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
        return record.final_Desicion.toLowerCase().includes(value.toLowerCase())
      },
    },
  ]

  return (
    <div>
      <Table
        style={{ display: 'flex', flex: 1, margin: 10 }}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  )
}

export default Messages
