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

//* Validate files
const Step4 = () => {
  const [isDigital, setIsDigital] = useState(false)
  const [isManual, setIsManual] = useState(false)
  //* Scroll Height of step 4
  //* File validation
  const validation = yup.object().shape({
    paystubs: yup
      .mixed()
      .required('You need to provide a file')
      .test('type', 'We only support pdf files', (value) => {
        return value && value.type === 'application/pdf'
      }),
    bank_statements: yup
      .mixed()
      .required('You need to provide a file')
      .test('type', 'We only support pdf files', (value) => {
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
                  initialValues={{ paystubs: '', bank_statements: '' }}
                  onSubmit={(values) => {
                    console.log(values)
                  }}
                  validationSchema={validation}
                >
                  {(formProps) => (
                    <CForm>
                      <CRow>
                        <CCol>
                          <CFormLabel htmlFor="paystubs" className="required">
                            Upload Pay stubs
                          </CFormLabel>
                          <CFormInput
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
                          <CFormLabel htmlFor="bank_statements" className="required">
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
                          />
                          {
                            /* Show paystubs error */
                            formProps.errors.bank_statements && (
                              <div className="error">{formProps.errors.bank_statements}</div>
                            )
                          }
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <CButton onClick={formProps.handleSubmit}>Submit</CButton>
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
