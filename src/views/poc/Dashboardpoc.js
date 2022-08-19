import React from 'react'
import { NavLink } from 'react-router-dom'
import TableAntd from './TableAntd'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CIcon,
  CCardTitle,
  CCardText,
  CContainer,
  CNavLink,
  CWidgetStatsF,
  CButton,
} from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'
import './dashboard.css'
import application from './assets/img/application.png'
import idea from './assets/img/idea.png'
import report from './assets/img/report.png'
import email from './assets/img/email.png'
import submit from './assets/img/submit.png'
import process from './assets/img/process.png'
import feature from './assets/img/feature.png'
const Dashboardpoc = () => {
  //table style

  return (
    <>
      <CContainer>
        <CRow>
          <CCol xs={12} className="mb-3">
            <div className="shortcut-buttons">
              <CNavLink to="/homeequity" component={NavLink}>
                <button className="shortcuts">
                  <div className="button-content">
                    <div className="button-icon">
                      <img src={application} height={50} />
                    </div>
                    <div className="button-text">Home Equity Application</div>
                  </div>
                </button>
              </CNavLink>

              <CNavLink to="/underwritinganalysis" component={NavLink}>
                <button className="shortcuts">
                  <div className="button-content">
                    <div className="button-icon">
                      <img src={idea} height={50} />
                    </div>
                    <div className="button-text">Underwriting Analysis</div>
                  </div>
                </button>
              </CNavLink>

              <CNavLink to="/reporting" component={NavLink}>
                <button className="shortcuts">
                  <div className="button-content">
                    <div className="button-icon">
                      <img src={report} height={50} />
                    </div>
                    <div className="button-text">Reporting</div>
                  </div>
                </button>
              </CNavLink>

              <CNavLink to="/messages" component={NavLink}>
                <button className="shortcuts">
                  <div className="button-content">
                    <div className="button-icon">
                      <img src={email} height={50} />
                    </div>
                    <div className="button-text">Messages</div>
                  </div>
                </button>
              </CNavLink>
            </div>
            <hr />
          </CCol>
        </CRow>

        <CRow>
          <CCol className="mb-3" xs={4}>
            {/*Pie Chart*/}
            <CRow>
              <CCol>
                <CCardTitle>Pipeline Summary</CCardTitle>
                <CChartPie
                  data={{
                    labels: ['Point of Sale', 'In process', 'Underwrited'],
                    datasets: [
                      {
                        data: [300, 50, 100],
                        backgroundColor: [
                          'rgba(0,113,207,1)',
                          'rgba(0,168,225,1)',
                          'rgb(1,170,201, 1)',
                        ],
                        hoverBackgroundColor: [
                          'rgba(0,113,207,.8)',
                          'rgba(0,168,225,.5)',
                          'rgb(1,170,201, .5)',
                        ],
                      },
                    ],
                    options: {
                      tooltips: {
                        callbacks: {
                          label: function (tooltipItem, data) {
                            return (
                              data['labels'][tooltipItem['index']] +
                              ': ' +
                              data['datasets'][0]['data'][tooltipItem['index']] +
                              '%'
                            )
                          },
                        },
                      },
                    },
                  }}
                />
              </CCol>
            </CRow>
          </CCol>
          <CCol xs={8} className="mb-3">
            <CCard>
              <CCardBody>
                <CCardTitle> Loan Application Pipeline Percentages</CCardTitle>
                <CWidgetStatsF
                  className="mb-3"
                  padding={false}
                  icon={<img src={submit}></img>}
                  title="Point of sale Loan Applications"
                  value="89.9%"
                />
                <CWidgetStatsF
                  className="mb-3"
                  padding={false}
                  icon={<img src={process} color="red"></img>}
                  title="In Process Loan Applications"
                  value="89.9%"
                />
                <CWidgetStatsF
                  className="mb-3"
                  padding={false}
                  icon={<img src={feature}></img>}
                  title="Underwriting Results"
                  value="89.9%"
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={12}>
            <CCard className="mb-3 border-top-1">
              <CCardBody>
                <CCardTitle className="mx-auto">Loan Details</CCardTitle>
                <TableAntd />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Dashboardpoc
