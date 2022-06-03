import React, { useState } from 'react'
import {
  CModal,
  CButton,
  CModalTitle,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'

const SendMessage = ({ title, button, size }: Props) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <CButton onClick={() => setVisible(!visible)} variant="outline" size={size}>
        {button}
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={2}>
              <CFormLabel>To</CFormLabel>
            </CCol>
            <CCol>
              <CFormInput></CFormInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={2} className="mt-2">
              <CFormLabel>Subject</CFormLabel>
            </CCol>
            <CCol className="mt-2">
              <CFormInput></CFormInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CFormTextarea
                id="exampleFormControlTextarea1"
                rows="5"
                label="Message"
              ></CFormTextarea>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Send</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default SendMessage
