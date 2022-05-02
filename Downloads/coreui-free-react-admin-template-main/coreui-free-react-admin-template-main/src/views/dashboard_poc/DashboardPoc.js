import React from 'react'
import { useState } from 'react'
import { CCard, CCardHeader, CCardBody, CCol, CRow, CFormInput } from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'
import DataTable from 'react-data-table-component'
function DashboardPoc() {
  const data = [
    {
      product: 'Home Equity',
      date: '4/01/2022',
      loan_id: 'AAA-FFF-GGG-JJJJ',
      client: 'John Doe',
      credit_score: '800',
      title_run: 'Done',
      appraisal: 'In process',
      employment_status: 'Pending',
      final_decision: 'No',
    },
  ]
  const columns = [
    {
      name: 'Product',
      selector: 'product',
      sortable: true,
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      right: true,
    },
    {
      name: 'Loan ID',
      selector: 'loan_id',
      sortable: true,
      right: true,
    },
    {
      name: 'Client',
      selector: 'client',
      sortable: true,
      right: true,
    },
    {
      name: 'Credit Score',
      selector: 'credit_score',
      sortable: true,
      right: true,
    },
    {
      name: 'Tite Run',
      selector: 'title_run',
      sortable: true,
      right: true,
    },
    {
      name: 'Appraisal',
      selector: 'appraisal',
      sortable: true,
      right: true,
    },
    {
      name: 'Employment Status',
      selector: 'employment_status',
      sortable: true,
      right: true,
    },
    {
      name: 'Final Decision',
      selector: 'final_decision',
      sortable: true,
      right: true,
    },
  ]
  return (
    <div>
      <CCard>
        <CRow>
          <CCol xs="12">
            <CCardHeader>
              <h1>Dashboard</h1>
            </CCardHeader>
          </CCol>
        </CRow>
        <CCardBody>
          <CRow>
            <CCol xs={9}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </CCol>
            <CCol xs={3}>
              <CChartPie
                data={{
                  labels: ['Done', 'In Progress', 'Pending'],
                  datasets: [
                    {
                      backgroundColor: ['#26580F', '#FA9C1B', '#00FF00'],
                      data: [40, 20, 80],
                    },
                  ],
                }}
                width={100}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={4}>
              <CFormInput
                type="input"
                id="searchTable"
                label="Search by Client"
                placeholder="Search by client"
                //text="Must be 8-20 characters long."
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <DataTable title="Loan Applications" columns={columns} data={data}></DataTable>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  )
}
export default DashboardPoc
