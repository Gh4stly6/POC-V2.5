import { CButton, CFormCheck } from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './step4.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './errors.css'

export let uploads = []
export var filesid = new Array()

function Dropzone() {
  const [type, setType] = useState('')
  const [error, setError] = useState(false)
  const [fileError, setFileError] = useState(false)
  const [show, setShow] = useState(false)
  const { getRootProps, getInputProps, acceptedFiles, isDragActive, fileRejections } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg'], 'application/pdf': [] },
  })
  var fileFormat

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  //store files in fileObjects
  let formData = new FormData()

  const fileObjects = acceptedFiles.map((file) => {
    console.log(file)
    fileFormat = file.type
    formData.append('autometa', 'true')
    formData.append('file', file)
  })

  //console.log(formData.getAll('file'))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ))

  //send file to kaleido

  async function sendFile(Type) {
    setShow(true)
    var myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      'Basic dTBnYzBvZTBvdTpoYjJPd3pEUzR1bTlKNmF0WENFMXg2eUlHQ0U5Yy1DaDg3bkk4WTBjN2sw',
    )
    console.log(myHeaders)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    }
    try {
      if (Type === 'Bank Statement' || Type === 'Pay Stub') {
        setError(false)
        setFileError(false)

        const request = await fetch(
          'https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/data',
          requestOptions,
        )
        const response = await request.json()

        if (!request.ok) {
          setFileError(true)
        }
        console.log(response)
        console.log('sent')
        console.log(response.value.filename)

        //set the files sended to kaleido in array
        uploads.push(response.value.filename)
        console.log(uploads)
        const file_metadata = {
          data_uuid: response.id,
          metadata: {
            step: 'income_verification',
            filename: response.value.filename,
            mimeType: fileFormat,
            type: Type,
          },
        }

        filesid.push(file_metadata)
        console.log(filesid)
      } else {
        setError(true)
      }
      setShow(false)
    } catch (e) {
      console.log('error', e)
    }
  }

  //radio Button validation

  return (
    <div className="container">
      <CFormCheck
        type="radio"
        name="type"
        id="type1"
        value="Bank Statement"
        label="Bank Statement"
        onChange={(e) => {
          setType(e.target.value)
          //console.log(fileType.values.type)
        }}
      />
      <CFormCheck
        type="radio"
        name="type"
        id="type1"
        value="Pay Stub"
        label="Pay Stub"
        onChange={(e) => {
          setType(e.target.value)
          //console.log(fileType.values.type)
        }}
      />
      {
        /* Show radio error */
        error && <p className="error">Please choose a file type</p>
      }
      <div {...getRootProps({ className: 'dropzone' })}>
        <input className="input-zone" {...getInputProps()} />

        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">Release to drop the files here</p>
          ) : (
            <p className="dropzone-content">
              Drag and drop a files here, or click to select a file
            </p>
          )}
        </div>
        <button type="button" className="btnDropzone">
          Click to select files
        </button>
        {
          /* Show upload error */
          fileError && <p className="error">Please choose a file</p>
        }
      </div>
      <aside>
        <ul>{files}</ul>
        <ul>{fileRejectionItems}</ul>
      </aside>
      <div>
        {uploads.map((file) => (
          <li style={{ color: '#B39CD0' }} key={file}>
            {file}
          </li>
        ))}
      </div>
      <CButton
        disabled={show}
        onClick={() => {
          sendFile(type)
        }}
      >
        Send File
      </CButton>
    </div>
  )
}

export default Dropzone
