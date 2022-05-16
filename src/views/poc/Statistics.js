import React from 'react'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import { CContainer, CCard, CCardBody, CCardTitle, CRow, CCol, CWidgetStatsE } from '@coreui/react'
const Statistics = () => (
  <div>
    <CContainer>
      <CRow>
        <CCol>
          <CRow>
            <CWidgetStatsE
              className="mb-3"
              chart={
                <CChartBar
                  className="mx-auto"
                  style={{ height: '40px', width: '80px' }}
                  data={{
                    labels: [
                      'M',
                      'T',
                      'W',
                      'T',
                      'F',
                      'S',
                      'S',
                      'M',
                      'T',
                      'W',
                      'T',
                      'F',
                      'S',
                      'S',
                      'M',
                    ],
                    datasets: [
                      {
                        backgroundColor: '#321fdb',
                        borderColor: 'transparent',
                        borderWidth: 1,
                        data: [41, 78, 51, 66, 74, 42, 89, 97, 87, 84, 78, 88, 67, 45, 47],
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        display: false,
                      },
                      y: {
                        display: false,
                      },
                    },
                  }}
                />
              }
              title="Widget title"
              value="89.9%"
            />
          </CRow>
          <CRow>
            <CWidgetStatsE
              className="mb-3"
              chart={
                <CChartBar
                  className="mx-auto"
                  style={{ height: '40px', width: '80px' }}
                  data={{
                    labels: [
                      'M',
                      'T',
                      'W',
                      'T',
                      'F',
                      'S',
                      'S',
                      'M',
                      'T',
                      'W',
                      'T',
                      'F',
                      'S',
                      'S',
                      'M',
                    ],
                    datasets: [
                      {
                        backgroundColor: '#321fdb',
                        borderColor: 'transparent',
                        borderWidth: 1,
                        data: [41, 78, 51, 66, 74, 42, 89, 97, 87, 84, 78, 88, 67, 45, 47],
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        display: false,
                      },
                      y: {
                        display: false,
                      },
                    },
                  }}
                />
              }
              title="Widget title"
              value="89.9%"
            />
          </CRow>
        </CCol>
        <CCol className="mb-3" xs={6}>
          <CCard>
            <CCardBody>
              <CChartBar
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'GitHub Commits',
                      backgroundColor: '#AB9FD7',
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                  ],
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CChartLine
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'rgba(220, 220, 220, 0.2)',
                      borderColor: 'rgba(224, 207, 252, 0.5)',
                      pointBackgroundColor: 'rgba(220, 220, 220, 0.1)',
                      pointBorderColor: '#C29FFA',
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                    {
                      label: 'My Second dataset',
                      borderColor: 'rgba(24,19,98, 0.6)',
                      pointBackgroundColor: 'rgba(24, 19, 98, 0.6)',
                      pointBorderColor: '#181362',
                      data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
)

export default Statistics
