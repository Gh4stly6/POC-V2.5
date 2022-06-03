import React from 'react'
import 'antd/lib/date-picker/style/css'
import 'antd/lib/tabs/style/css'
import { DatePicker, Tabs, Divider } from 'antd'
import { CCard, CCardBody, CCardTitle, CRow, CCol } from '@coreui/react'
const { RangePicker } = DatePicker
const { TabPane } = Tabs

const Reporting = () => {
  return (
    <div>
      <CRow>
        <CCol>
          <h2>Reporting</h2>
          <CCard title="Reporting">
            <CCardBody>
              <CCardTitle>Select a Date Range</CCardTitle>
              <RangePicker />
              <Divider />
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Tab 1" key="1">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Reporting
