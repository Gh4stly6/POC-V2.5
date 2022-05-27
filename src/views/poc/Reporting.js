import React from 'react'
import { DatePicker, Space, Tabs } from 'antd'
import 'antd/dist/antd.variable.min.css'
import { Pie } from '@ant-design/plots'
import { CCard, CRow, CCol, CContainer, CCardBody } from '@coreui/react'

const { RangePicker } = DatePicker
const { TabPane } = Tabs

const Reporting = () => {
  const data = [
    {
      type: 'A',
      value: 27,
    },
    {
      type: 'B',
      value: 25,
    },
    {
      type: 'C',
      value: 18,
    },
    {
      type: 'D',
      value: 15,
    },
    {
      type: 'F',
      value: 10,
    },
    {
      type: 'G',
      value: 5,
    },
  ]
  const config = {
    appendPadding: 5,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.5,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: function content(_ref) {
        return ''.concat(_ref.value, '%')
      },
      style: {
        textAlign: 'center',
        fontSize: 10,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 12,
        },
        content: 'AntV\nG2Plot',
      },
    },
  }
  return (
    <div>
      <CContainer>
        <h2>Reporting</h2>
        <CCard>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  <RangePicker />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Approved Loans" key="1">
                      Approved Loans
                    </TabPane>
                    <TabPane tab="Rejected Loans" key="2">
                      Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                      Content of Tab Pane 3
                    </TabPane>
                  </Tabs>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCard>
      </CContainer>
    </div>
  )
}

export default Reporting
