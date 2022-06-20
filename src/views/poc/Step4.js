import { React, useState, useRef } from 'react'
import './step4.css'
import Modal from './Modal'
import {
  CContainer,
  CFormInput,
  CFormLabel,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CRow,
  CCol,
  CButton,
  CForm,
} from '@coreui/react'
import * as yup from 'yup'
import PlaidSignIn from '../poc/assets/img/PlaidSignIn.jpg'
import { useForm } from 'react-hook-form'

//* Validate files

const schema = yup.object().shape({
  paystubs: yup
    .mixed()
    .required('You need to provide a file')
    .test('type', 'We only support pdf files', (value) => {
      return value && value[0].type === 'application/pdf'
    }),

  bank_statements: yup
    .mixed()
    .required('You need to provide a file')
    .test('type', 'We only support pdf files', (value) => {
      return value && value[0].type === 'application/pdf'
    }),
})

const Step4 = () => {
  return (
    <div>
      <CContainer>
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

        <CRow>
          <CCard>
            <CCardBody>
              <CCardTitle> Manual Verification of Income and Assets</CCardTitle>
              <CForm>
                <CRow>
                  <CCol>
                    <CFormLabel htmlFor="paystubs">Upload Pay stubs</CFormLabel>
                    <CFormInput
                      type="file"
                      className="mb-2"
                      name="paystubs"
                      id="paystubs"
                      accept="application/pdf"
                      //ref={register}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormLabel htmlFor="bank_statements">Upload Bank Statements</CFormLabel>
                    <CFormInput
                      type="file"
                      id="bank_statements"
                      name="bank_statements"
                      accept="application/pdf"
                      //{register}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormInput type="submit" />
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Step4
