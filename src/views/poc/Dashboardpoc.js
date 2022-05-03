import React from 'react'
import { CCard, CCardHeader, CCardText, CRow, CCol } from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'

const Dashboardpoc = () => {
  return (
    <>
      <CRow>
        <CCol>
          <CCard xs={12}>
            <CCardHeader>
              <h2>Dashboard</h2>
            </CCardHeader>
            <CRow>
              <CCol xs={6}>
                <CCardText>Dashboard</CCardText>
              </CCol>
              <CCol xs={6}>
                <CChartPie
                  data={{
                    labels: ['Red', 'Green', 'Yellow'],
                    datasets: [
                      {
                        data: [300, 50, 100],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      },
                    ],
                  }}
                />
              </CCol>
            </CRow>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboardpoc
