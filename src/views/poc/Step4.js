import { React, useState, useRef } from 'react'
import './step4.css'
import './errors.css'
import Modal from './Modal'
import { CFormCheck } from '@coreui/react'
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
import { BlockOutlined } from '@ant-design/icons'
//import swal from 'sweetalert'

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

  const fileRef = useRef()
  //* Scroll Height of step 4
  //* File validation

  //reset oinput file
  const reset = () => {
    fileRef.current.value = ''
  }
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'application/pdf', 'image/png']
  const validation = yup.object().shape({
    document: yup
      .mixed()
      .test(
        'type',
        'Only support jpg, jpeg, png, pdf files',
        (value) => value && SUPPORTED_FORMATS.includes(value.type),
      ),
    type: yup.string().required('You must select a document type'),
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
                <Formik
                  initialValues={{ document: '', type: '' }}
                  onSubmit={(values, { resetForm }) => {
                    setLoading(true)
                    setFiles((files) => [...files, values.document['name']])
                    uploads.push(values.document['name'])
                    console.log(uploads)

                    setShow(true)
                    let data = new FormData()
                    data.append('autometa', 'true')
                    data.append('file', values.document)

                    var myHeaders = new Headers()
                    myHeaders.append(
                      'Authorization',
                      'Basic dTBnYzBvZTBvdTpoYjJPd3pEUzR1bTlKNmF0WENFMXg2eUlHQ0U5Yy1DaDg3bkk4WTBjN2sw',
                    )
                    console.log(myHeaders)
                    var requestOptions = {
                      method: 'POST',
                      headers: myHeaders,
                      body: data,
                      redirect: 'follow',
                    }
                    //setLoading(false)
                    async function sendFile() {
                      try {
                        const response = await fetch(
                          'https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/data',
                          requestOptions,
                        )
                        const res = await response.json()
                        const file_metadata = {
                          data_uuid: res.id,
                          metadata: {
                            step: 'income_verification',
                            filename: values.document['name'],
                            type: values.type,
                          },
                        }
                        filesid.push(file_metadata)
                        console.log(filesid)
                        console.log(response.json())
                        //swal('Your file was uploaded')
                        setShow(true)
                        setLoading(false)
                        resetForm()
                        console.log('sent')
                        reset()
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
                          <CFormLabel htmlFor="document" className="required">
                            Choose a type of document to upload
                          </CFormLabel>

                          <CFormCheck
                            type="radio"
                            name="type"
                            id="type1"
                            value="Bank Statement"
                            label="Bank Statement"
                            onChange={(e) => {
                              formProps.setFieldValue('type', e.target.value)
                              console.log(e.target.value)
                            }}
                          />
                          <CFormCheck
                            type="radio"
                            name="type"
                            id="type1"
                            value="Pay Stub"
                            label="Pay Stub"
                            onChange={(e) => {
                              formProps.setFieldValue('type', e.target.value)
                              console.log(e.target.value)
                            }}
                          />
                          {formProps.errors.type && (
                            <div className="error">{formProps.errors.type}</div>
                          )}
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <CFormInput
                            ref={fileRef}
                            disabled={loading}
                            type="file"
                            className="mb-2"
                            name="document"
                            id="document"
                            accept="application/pdf ,image/png, image/jpeg"
                            onChange={(event) =>
                              formProps.setFieldValue('document', event.target.files[0])
                            }
                          />

                          {
                            /* Show paystubs error */
                            formProps.errors.document && (
                              <div className="error">{formProps.errors.document}</div>
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
                        <CCol xs={12} style={{ textAlign: 'center' }}>
                          <CButton
                            disabled={loading}
                            onClick={() => {
                              formProps.handleSubmit()
                            }}
                          >
                            Upload File
                          </CButton>
                        </CCol>
                      </CRow>
                      <CRow>
                        {show && (
                          <CCol>
                            <table>
                              {/* <thead>
                                <th>Uploaded files</th>
                              </thead> */}
                              <tbody>
                                {uploads.map((item) => (
                                  <tr key={item}>
                                    <th style={{ color: '#B39CD0' }}>{item}</th>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </CCol>
                        )}
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
