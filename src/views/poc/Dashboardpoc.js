import React from 'react'
import { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CCardTitle,
  CCardText,
  CContainer,
} from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'
import DataTable from 'react-data-table-component'

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
          <CCol className="mb-3">
            <CCard className="text-center mb-3 border-top-primary border-top-3">
              {/*Pie Chart*/}
              <CRow>
                <CCardBody>
                  <CRow>
                    <CCol sm={8}>
                      <CCardText>Loans Summary description</CCardText>
                    </CCol>
                    <CCol sm={4}>
                      <CCardTitle>Loans Summary</CCardTitle>
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
                </CCardBody>
              </CRow>
            </CCard>
          </CCol>
          <CRow>
            <CCol sm={12}>
              <CCard className="mb-3 border-top-primary border-top-3">
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
