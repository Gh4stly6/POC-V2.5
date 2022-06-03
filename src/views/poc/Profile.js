import React from 'react'
import {
  Container,
  CCard,
  CImage,
  CCardBody,
  CCardTitle,
  CRow,
  CColumn,
  CContainer,
  CCardImage,
  CCol,
  CFormInput,
  CFormLabel,
  CButton,
  CCardText,
  CInputGroup,
  CInputGroupText,
  CFormFloating,
} from '@coreui/react'
import img5 from '../../assets/images/avatars/5.jpg'

const Profile = () => {
  return (
    <div>
      <CContainer>
        <CCard className="mb-3">
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <CCardTitle>
                  <h3>Profile</h3>
                </CCardTitle>
              </CCol>
              <CCol className="mb-3" xs={3}>
                <CImage rounded thumbnail src={img5} width={200} height={200} />
              </CCol>
              <CCol xs={3}>
                <CCardText>
                  <h6>Name</h6>
                  <p>Alice Doe</p>
                </CCardText>
                <CCardText>
                  <h6>Email</h6>
                  <p>alicedoe@example.com</p>
                </CCardText>
                <CCardText>
                  <h6>Phone Number</h6>
                  <p>000 1111-222</p>
                </CCardText>
              </CCol>
              <CCol xs={3}>
                <CCardText>
                  <h6>Zip Code</h6>
                  <p>93101</p>
                </CCardText>
                <CCardText>
                  <h6>State</h6>
                  <p>California</p>
                </CCardText>
                <CCardText>
                  <h6>City</h6>
                  <p>Los Angeles</p>
                </CCardText>
              </CCol>
              <CCol xs={3}>
                <CCardText>
                  <h6>Department</h6>
                  <p></p>
                </CCardText>
                <CCardText>
                  <h6>Position</h6>
                  <p>Loan Officer</p>
                </CCardText>
                <CCardText>
                  <h6>Join Date</h6>
                  <p>MM/DD/YY</p>
                </CCardText>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="mb-3" xs={3}>
                <CFormInput type="file" size="sm" />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CRow>
          <CCol xs={6} className="mb-3">
            <CCard>
              <CCardBody>
                <CCardTitle>Edit Profile</CCardTitle>
                <CFormFloating className="mt-2">
                  <CFormInput id="fist_name" type="text" size="sm" />
                  <CFormLabel htmlFor="first_name">First Name</CFormLabel>
                </CFormFloating>

                <CFormFloating className="mt-2">
                  <CFormInput id="last_name" type="text" size="sm" />
                  <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
                </CFormFloating>

                <CFormFloating className="mt-2">
                  <CFormInput id="email" type="email" size="sm" />
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                </CFormFloating>

                <CFormFloating className="mt-2">
                  <CFormInput type="phone" id="phone" size="sm" />
                  <CFormLabel htmlFor="phone">Phone Number</CFormLabel>
                </CFormFloating>

                <CFormFloating className="mt-2">
                  <CFormInput id="zip" size="sm" />
                  <CFormLabel htmlFor="zip">Zip Code</CFormLabel>
                </CFormFloating>

                <CFormFloating className="mt-2">
                  <CFormInput type="text" id="state" size="sm" />
                  <CFormLabel htmlFor="state">State</CFormLabel>
                </CFormFloating>

                <CFormFloating className="mt-2">
                  <CFormInput type="text" id="city" size="sm" />
                  <CFormLabel htmlFor="city">City</CFormLabel>
                </CFormFloating>

                <br />
                <CButton>Apply Changes</CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>Change Password</CCardTitle>
                <CCol>
                  <CFormFloating className="mt-2">
                    <CFormInput id="current_password" type="password" size="sm" />
                    <CFormLabel htmlFor="current_password">Current Password</CFormLabel>
                  </CFormFloating>

                  <CFormFloating className="mt-2">
                    <CFormInput name="new_password" type="password" size="sm" />
                    <CFormLabel htmlFor="new_password">New Password</CFormLabel>
                  </CFormFloating>

                  <CFormFloating className="mt-2">
                    <CFormInput type="password" name="confirm_password" size="sm" />
                    <CFormLabel htmlFor="confirm_password">Confirm Password</CFormLabel>
                  </CFormFloating>

                  <br />
                  <CButton>Apply Changes</CButton>
                </CCol>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Profile
