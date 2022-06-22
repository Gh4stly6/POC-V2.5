import { React, useState, useRef } from 'react'
import './step4.css'
import './errors.css'
import Modal from './Modal'
import {
  CContainer,
  CFormInput,
  CFormLabel,
  CCard,
  CCardBody,
  CCardTitle,
  CRow,
  CCol,
  CForm,
  CButton,
  CAlert,
  CFormSelect,
} from '@coreui/react'
import * as yup from 'yup'
import { Formik } from 'formik'
import PlaidSignIn from '../poc/assets/img/PlaidSignIn.jpg'
import swal from 'sweetalert'
import { ConsoleSqlOutlined } from '@ant-design/icons'

//* Validate files
var filesid = new Array()
const Step4 = () => {
  const [isDigital, setIsDigital] = useState(false)
  const [isManual, setIsManual] = useState(false)
  const [loading, setLoading] = useState(false)
  //* Scroll Height of step 4
  //* File validation
  const validation = yup.object().shape({
    paystubs: yup.mixed().test('type', 'We only support pdf files', (value) => {
      return value && value.type === 'application/pdf'
    }),
  })

  return (
    <div>
      <CContainer>
        <CRow>
          <CAlert color="primary" style={{ fontWeight: 'bold', fontSize: '12pt' }}>
            Choose a type of income verification to submit
          </CAlert>
          <CFormSelect
            aria-label="Default select example"
            options={[
              'Open this select menu',
              { label: 'Digital Verification (Plaid)', value: '1' },
              { label: 'Manual Verification', value: '2' },
            ]}
            onChange={(e) => {
              console.log(e.target.value)

              if (e.target.value === '1') {
                setIsDigital(true)
                setIsManual(false)
              } else {
                if (e.target.value === '2') {
                  setIsManual(true)
                  setIsDigital(false)
                }
              }
            }}
          />
        </CRow>
        {isDigital && (
          <CRow>
            <CCard>
              <CCardBody>
                <CCardTitle> Digital Verification of Income and Assets</CCardTitle>
                <Modal
                  buttonLabel="Connect to Plaid"
                  title="Plaid"
                  body={<img src={PlaidSignIn} />}
                />
              </CCardBody>
            </CCard>
          </CRow>
        )}

        {isManual && (
          <CRow>
            <CCard>
              <CCardBody>
                <CCardTitle> Manual Verification of Income and Assets</CCardTitle>
                <Formik
                  initialValues={{ paystubs: '' }}
                  onSubmit={(values) => {
                    setLoading(true)
                    //console.log(values)
                    let data = new FormData()
                    data.append('autometa', 'true')
                    data.append('file', values.paystubs)
                    var myHeaders = new Headers()
                    myHeaders.append(
                      'Authorization',
                      'Basic dTBnYzBvZTBvdTpoYjJPd3pEUzR1bTlKNmF0WENFMXg2eUlHQ0U5Yy1DaDg3bkk4WTBjN2sw',
                    )
                    var requestOptions = {
                      method: 'POST',
                      headers: myHeaders,
                      body: data,
                      redirect: 'follow',
                    }

                    async function sendFile() {
                      try {
                        const response = await fetch(
                          'https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/data',
                          requestOptions,
                        )
                        const res = await response.json()
                        console.log(res.id)
                        filesid.push(res.id)
                        console.log(filesid)
                        swal('Your file was uploaded')
                        setLoading(false)
                      } catch (error) {
                        console.log('error', error)
                      }
                    }

                    sendFile()
                  }}
                  validationSchema={validation}
                >
                  {(formProps) => (
                    <CForm>
                      <CRow>
                        <CCol>
                          <CFormLabel htmlFor="paystubs" className="required">
                            Upload Pay stubs or Bank Statements
                          </CFormLabel>
                          <CFormInput
                            disabled={loading}
                            type="file"
                            className="mb-2"
                            name="paystubs"
                            id="paystubs"
                            accept="application/pdf"
                            onChange={(event) =>
                              formProps.setFieldValue('paystubs', event.target.files[0])
                            }
                          />
                          {
                            /* Show paystubs error */
                            formProps.errors.paystubs && (
                              <div className="error">{formProps.errors.paystubs}</div>
                            )
                          }
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          {/* <CFormLabel htmlFor="bank_statements" className="required">
                            Upload Bank Statements
                          </CFormLabel>
                          <CFormInput
                            type="file"
                            id="bank_statements"
                            name="bank_statements"
                            accept="application/pdf"
                            onChange={(event) =>
                              formProps.setFieldValue('bank_statements', event.target.files[0])
                            }
                          /> */}
                          {
                            /* Show paystubs error */
                            // formProps.errors.bank_statements && (
                            //   <div className="error">{formProps.errors.bank_statements}</div>
                            // )
                          }
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <CButton disabled={loading} onClick={formProps.handleSubmit}>
                            Upload File
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  )}
                </Formik>
              </CCardBody>
            </CCard>
          </CRow>
        )}
      </CContainer>
    </div>
  )
}

export default Step4
