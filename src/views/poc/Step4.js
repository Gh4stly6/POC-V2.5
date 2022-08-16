import { React, useState, useRef } from 'react'
import './step4.css'
import './errors.css'
import Modal from './Modal'
import { CFormCheck } from '@coreui/react'
import Dropzone from './Dropzone'
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
import PLaidSS from '../poc/assets/img/PlaidSS.png'

//* Validate files
export var filesid = new Array()
export var income_files
export let uploads = []
const Step4 = () => {
  const [isDigital, setIsDigital] = useState(false)
  const [isManual, setIsManual] = useState(false)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([]) //store the files uploaded to Kaleido
  const [show, setShow] = useState(false)
  const [type, setType] = useState('')

  const fileRef = useRef()
  //* Scroll Height of step 4
  //* File validation

  //reset oinput file
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
                  body={
                    <img
                      src={PLaidSS}
                      style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                    />
                  }
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
                <Dropzone />
              </CCardBody>
            </CCard>
          </CRow>
        )}
      </CContainer>
    </div>
  )
}

export default Step4
