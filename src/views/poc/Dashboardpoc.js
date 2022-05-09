import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
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
import DataTable from 'react-data-table-component'
import { AiOutlineEdit } from 'react-icons/ai'
import './dashboard.css'
import contactform from './assets/img/contact-form.png'
import idea from './assets/img/idea.png'
import laptop from './assets/img/laptop.png'
import speech from './assets/img/speech-bubble.png'
import submit from './assets/img/submit.png'
import process from './assets/img/process.png'
import feature from './assets/img/feature.png'
const Dashboardpoc = () => {
  /*//Data Table
  const [loan, setLoan] = useState()
  var id, name, credit, title, appraisal, employment, date, decision

  //Kaleido endpoint for Lender node
  const URL = 'https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io'
  var t = [] //array to save loan id

  //Header for fetch request
  let requestOptions = {
    method: 'GET',
    headers: {
      Authorization:
        'Basic dTBqbW1mam12NTphNGV3WjZuNVh1bHBSVElmMXNKX2FWa1pYQjZ3RGtLaFVhSVFUMEVNbVJF',
      'Content-Type': 'application/json',
    },
  }

  //Use effect for retrieving data from Kaleido
  useEffect(() => {
    async function get_topics() {
      const message = await fetch(
        `${URL}/api/v1/namespaces/default/messages?limit=100`,
        requestOptions,
      )
      const data = await message.json()
      var topics = []

      //store topics values
      for (let i = 0; i < data.length; i++) {
        topics.push(data[i].header.topics[0])
      }

      //create a new object with filtered topic because previous response returned repeated topics
      let result = topics.filter((item, index) => {
        return topics.indexOf(item) == index
      })
      const check = []
      const l = []

      //Request to kaleido all messages with the topic stored in result
      for (let i = 0; i < result.length; i++) {
        const loan = await fetch(
          `${URL}/api/v1/namespaces/default/messages?topics=${result[i]}&limit=100`,
          requestOptions,
        )
        check.push(await loan.json())
      }

      //Check what is inside of all those messages to verify if tcredit run, appraisal... are done
      const forLoop = async (_) => {
        for (let i = 0; i < check.length; i++) {
          for (let j = 0; i < check[i].length; j++) {
            let r = await fetch(
              `https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/messages/${check[i][j].header.id}/data`,
              requestOptions,
            )
            let a = await r.json()
            id = a[0].header.topics[0]
            if ('body' in a[0].value) {
              if ('employment_verified' in a[0].value.body) {
                employment = a[0].value.body.employment_verified
              } else {
                if ('title_run_done' in a[0].value.body) {
                  title = a[0].value.body.title_run_done
                } else {
                  if ('appraisal_done' in a[0].value.body) {
                    appraisal = a[0].value.body.appraisal_done
                  } else {
                    if ('credit_check_ran' in a[0].value.body) {
                      credit = a[0].value.body.credit_check_ran
                    }
                  }
                }
              }
            }
          }
        }
      }
      console.log(check)
    }

    get_topics()
  }, [])*/

  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
    },
    {
      name: 'Year',
      selector: (row) => row.year,
    },
  ]

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ]

  return (
    <>
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <h1>Dashboard</h1>
          </CCol>
        </CRow>
        <CRow>
          <CCol className="mb-3" xs={4}>
            <CCard className="text-center mb-3 border-top-2">
              {/*Pie Chart*/}
              <CRow>
                <CCardBody className="text-center">
                  <CCol>
                    <CCardHeader>
                      <h3>Loans Summary</h3>
                    </CCardHeader>
                    <CChartPie
                      data={{
                        labels: ['Submitted', 'In process', 'Decisioned'],
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
                </CCardBody>
              </CRow>
            </CCard>
          </CCol>
          <CCol xs={5}>
            <CCard>
              <CCardBody>
                <CCardTitle>Welcome User</CCardTitle>
                <CCardText>Loan applications percentages for this month</CCardText>
                <CWidgetStatsF
                  className="mb-3"
                  color="info"
                  padding={false}
                  icon={<img src={submit}></img>}
                  title="Submitted Loan Applications"
                  value="89.9%"
                />
                <CWidgetStatsF
                  className="mb-3"
                  color="primary"
                  padding={false}
                  icon={<img src={process}></img>}
                  title="In Process Loan Applications"
                  value="89.9%"
                />
                <CWidgetStatsF
                  className="mb-3"
                  color="success"
                  padding={false}
                  icon={<img src={feature}></img>}
                  title="Decisioned Loan Applications"
                  value="89.9%"
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={3}>
            <CCard>
              <CCardBody>
                <CCardTitle>Shortcuts</CCardTitle>

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
                        <div className="button-text">Decision Analysis</div>
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

          <CRow>
            <CCol sm={12}>
              <CCard className="mb-3 border-top-2">
                <CCardHeader>
                  <h3>Loans Data Table</h3>
                </CCardHeader>
                <CCardBody>
                  <DataTable columns={columns} data={data} />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CRow>
      </CContainer>
    </>
  )
}

export default Dashboardpoc
