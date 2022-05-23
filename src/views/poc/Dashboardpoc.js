import React from 'react'
import { useEffect, useState } from 'react'
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
import contactform from './assets/img/contact-form.png'
import idea from './assets/img/idea.png'
import laptop from './assets/img/laptop.png'
import speech from './assets/img/speech-bubble.png'
import submit from './assets/img/submit.png'
import process from './assets/img/process.png'
import feature from './assets/img/feature.png'
const Dashboardpoc = () => {
  //table style

  return (
    <>
      <CContainer>
        <h2>Welcome User</h2>
        <CRow>
          <CCol xs={12} className="mb-3">
            <CCard>
              <CCardBody>
                <div className="shortcut-buttons">
                  <CNavLink to="/homeequity" component={NavLink}>
                    <CButton shape="rounded-pill" variant="ghost">
                      <div className="button-content">
                        <div className="button-icon">
                          <img src={contactform} />
                        </div>
                        <div className="button-text">Application Form</div>
                      </div>
                    </CButton>
                  </CNavLink>

                  <CNavLink to="/decisionanalysis" component={NavLink}>
                    <CButton shape="rounded-pill" variant="ghost">
                      <div className="button-content">
                        <div className="button-icon">
                          <img src={idea} />
                        </div>
                        <div className="button-text">Underwriting Analysis</div>
                      </div>
                    </CButton>
                  </CNavLink>

                  <CNavLink to="/reporting" component={NavLink}>
                    <CButton shape="rounded-pill" variant="ghost">
                      <div className="button-content">
                        <div className="button-icon">
                          <img src={laptop} />
                        </div>
                        <div className="button-text">Reporting</div>
                      </div>
                    </CButton>
                  </CNavLink>

                  <CNavLink to="/messages" component={NavLink}>
                    <CButton shape="rounded-pill" variant="ghost">
                      <div className="button-content">
                        <div className="button-icon">
                          <img src={speech} />
                        </div>
                        <div className="button-text">Messages</div>
                      </div>
                    </CButton>
                  </CNavLink>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow>
          <CCol className="mb-3" xs={4}>
            <CCard className="text-center mb-3 border-top-2">
              {/*Pie Chart*/}
              <CRow>
                <CCardBody>
                  <CCol>
                    <CCardTitle>Pipeline Summary</CCardTitle>
                    <CChartPie
                      data={{
                        labels: ['Point of Sale', 'In process', 'Underwrited'],
                        datasets: [
                          {
                            data: [300, 50, 100],
                            backgroundColor: [
                              'rgba(194, 159, 250,1)',
                              'rgba(163, 112, 247,1)',
                              'rgb(133, 64, 245, 1)',
                            ],
                            hoverBackgroundColor: [
                              'rgba(194, 159, 250,0.9)',
                              'rgba(163, 112, 247,0.9)',
                              'rgb(133, 64, 245,0.9)',
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
                </CCardBody>
              </CRow>
            </CCard>
          </CCol>
          <CCol xs={8} className="mb-3">
            <CCard>
              <CCardBody>
                <CCardText> Loan Application Pipeline Percentages</CCardText>
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
            <CCard className="mb-3 border-top-2">
              <CCardHeader>
                <h5>Loan Details</h5>
              </CCardHeader>

              <CCardBody>
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
