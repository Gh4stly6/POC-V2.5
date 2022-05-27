import { React, useState, useRef } from 'react'
import swal from 'sweetalert'
import { v4 as uuidv4 } from 'uuid'
import { BsFillPersonFill } from 'react-icons/bs'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { FaCoins } from 'react-icons/fa'

import { CCard, CCardHeader, CCardBody, CRow, CCol } from '@coreui/react'
import './collapsible.css'

const ApplicationForm = () => {
  const [data, setData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    phone: '',
    phone_type: '',
    email: '',
    street: '',
    street_2: '',
    property_city: '',
    property_country: '',
    property_state: '',
    property_zip_code: '',
    tell_us_about_your_loan: '',
    property_location: '',
    property_use: '',
    property_value: '',
    line_of_credit: '',
    plans_for_the_funds: '',
    loan_used_for_business: '',
    suffix: '',
    time_at_address: '',
    best_time_to_call: '',
    secondary_phone_number: '',
    country_of_citizenship: '',
    country_of_residence: '',
    social_security_number: '',
    date_of_birth: '',
    marital_status: '',
    preferred_language: '',
    CWidgetStatsF: '',
    CButton: '',
    additional_income: '',
    coapplicant: '',
    //vendor: ''
    topics: uuidv4(),
  })

  // *Collapsible items hooks
  const [isPersonalOpen, setIsPersonalOpen] = useState(false)
  const [isPropertyOpen, setIsPropertyOpen] = useState(false)
  const [isIncomeOpen, setIsIncomeOpen] = useState(false)

  const personalRef = useRef()
  const propertyRef = useRef()
  const incomeRef = useRef()

  const personalInfoForm = useRef()

  //function for changing input values

  const handleInputChange = (e) => {
    console.log(e.target.value)
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''))
    setData({
      first_name: '',
      middle_name: '',
      last_name: '',
      phone: '',
      phone_type: '',
      email: '',
      street: '',
      street_2: '',
      property_city: '',
      property_country: '',
      property_state: '',
      property_zip_code: '',
      tell_us_about_your_loan: '',
      property_location: '',
      property_use: '',
      property_value: '',
      line_of_credit: '',
      plans_for_the_funds: '',
      loan_used_for_business: '',
      suffix: '',
      time_at_address: '',
      best_time_to_call: '',
      secondary_phone_number: '',
      country_of_citizenship: '',
      country_of_residence: '',
      social_security_number: '',
      date_of_birth: '',
      marital_status: '',
      preferred_language: '',
      employment_status: '',
      anual_income: '',
      source_of_income: '',
      additional_income: '',
      coapplicant: '',
      //vendor: ''
      topics: uuidv4(),
    })
  }

  // *function to open next collapsible element
  const openFirstCollapsible = (e) => {
    e.preventDefault()
    setIsPropertyOpen(true)
    setIsPersonalOpen(false)
  }

  const openSecondCollapsible = (e) => {
    e.preventDefault()
    setIsIncomeOpen(true)
    setIsPropertyOpen(false)
  }

  // *function to close collapsible element and go back to previous element

  const closeFirstCollapsible = (e) => {
    e.preventDefault()
    setIsPersonalOpen(true)
    setIsPropertyOpen(false)
  }

  const closeSecondCollapsible = (e) => {
    e.preventDefault()
    setIsIncomeOpen(false)
    setIsPropertyOpen(true)
  }

  // *Send Data to API
  function sendData(e) {
    e.preventDefault()

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    //myHeaders.append('Access-Control-Allow-Origin', '*')
    var fullName =
      data.first_name.trim() + ' ' + data.middle_name.trim() + ' ' + data.last_name.trim()

    var raw = JSON.stringify({
      name: fullName.trim(),
      phone: data.phone,
      email: data.email,
      street: data.street,
      street_2: data.street_2,
      property_city: data.property_city,
      property_country: data.property_country,
      property_state: data.property_state,
      property_zip_code: data.property_zip_code,
      tell_us_about_your_loan: '',
      property_location: data.property_location,
      property_use: 'Vacation',
      property_value: data.property_value,
      line_of_credit: data.line_of_credit,
      plans_for_the_funds: data.plans_for_the_funds,
      loan_used_for_business: data.loan_used_for_business,
      suffix: data.suffix,
      time_at_address: data.time_at_address,
      best_time_to_call: data.best_time_to_call,
      secondary_phone_number: data.secondary_phone_number,
      country_of_citizenship: data.country_of_citizenship,
      country_of_residence: data.country_of_residence,
      social_security_number: data.social_security_number,
      date_of_birth: data.date_of_birth,
      marital_status: data.marital_status,
      preferred_language: data.preferred_language,
      employment_status: data.employment_status,
      anual_income: data.anual_income,
      source_of_income: data.source_of_income,
      additional_income: data.additional_income,
      coapplicant: data.coapplicant,
      vendor: 'receive_borrower',
      topics: data.topics,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      //mode: 'no-cors',
      body: raw,
      redirect: 'follow',
    }

    console.log(fullName.trim())
    console.log(data.topics)

    fetchAWS(`https://mr9w0zhxw7.execute-api.us-east-1.amazonaws.com/prod`, requestOptions)
    /*try {
      const response = fetch(
        'https://mr9w0zhxw7.execute-api.us-east-1.amazonaws.com/prod',
        requestOptions,
      )
      if (response.ok) {
        swal({
          title: 'Loan ID',
          text: `${data.topics}`,
          icon: 'success',
        })
      } else {
        swal({
          title: 'Error',
          text: `Your application form wasn't submitted successfully`,
          icon: 'error',
        })
      }
    } catch (error) {
      swal({
        title: 'Error',
        text: `Your application form wasn't submitted successfully`,
        icon: 'error',
      })
      console.log('Error', error)
    }*/

    //* Reset form after submit
    handleReset()
    setIsPersonalOpen(false)
    setIsPropertyOpen(false)
    setIsIncomeOpen(false)
    console.log(data)
  }

  async function fetchAWS(endpoint, options) {
    try {
      const response = await fetch(endpoint, options)
      if (response.ok) {
        swal({
          title: 'Loan ID',
          text: `${data.topics}`,
          icon: 'success',
        })
      } else {
        swal({
          title: 'Error',
          text: `Your application form wasn't submitted successfully`,
          icon: 'error',
        })
      }
    } catch (error) {
      swal({
        title: 'Error',
        text: `Your application form wasn't submitted successfully`,
        icon: 'error',
      })
      console.log('Error', error)
    }
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <div className="container">
                <div className="property-select">
                  <label className="form-label" htmlFor="property-state">
                    Property state?
                  </label>
                  <input
                    className="form-select"
                    type="select"
                    name=""
                    id="property-state"
                    onChange={handleInputChange}
                  />
                </div>
                {/*Personal information section*/}
                <div className="collapsible">
                  <div className="headerOption">
                    <button className="toggle" onClick={() => setIsPersonalOpen(!isPersonalOpen)}>
                      <BsFillPersonFill size={34} />
                      Step 1: Personal Information
                    </button>
                  </div>
                  <div
                    className="content-parent"
                    ref={personalRef}
                    style={
                      isPersonalOpen
                        ? {
                            height: personalRef.current.scrollHeight + 'px',
                          }
                        : {
                            height: '0px',
                          }
                    }
                  >
                    <div className="content">
                      <form ref={personalInfoForm}>
                        <div className="row">
                          <div className="column prefix-text">
                            <label htmlFor="prefix" className="form-label">
                              Prefix
                            </label>
                            <input
                              tabIndex={1}
                              id="prefix"
                              defaultValue=""
                              className="form-select"
                              type="select"
                              name="prefix"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label htmlFor="ssn">SSN</label>
                            <input
                              tabIndex={10}
                              id="ssn"
                              defaultValue=""
                              name="social_security_number"
                              className="form-control"
                              type="text"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label htmlFor="first_name" className="form-label">
                              First Name
                            </label>
                            <input
                              tabIndex={2}
                              name="first_name"
                              id="first_name"
                              className="form-control"
                              defaultValue=""
                              required
                              type="text"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label htmlFor="date_of_birth" className="form-label">
                              Date of Birth
                            </label>
                            <input
                              tabIndex={11}
                              name="date_of_birth"
                              id="date_of_birth"
                              className="form-control"
                              defaultValue=""
                              required
                              type="date"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label htmlFor="middle_name" className="form-label">
                              Middle Name
                            </label>
                            <input
                              tabIndex={3}
                              defaultValue=""
                              id="middle_name"
                              name="middle_name"
                              className="form-control"
                              type="text"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label htmlFor="phone-number" className="form-label">
                              Phone Number
                            </label>
                            <input
                              tabIndex={12}
                              name="phone"
                              className="form-control"
                              id="phone-number"
                              defaultValue=""
                              required
                              type="tel"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label htmlFor="last_name" className="form-label">
                              Last Name
                            </label>
                            <input
                              tabIndex={4}
                              name="last_name"
                              className="form-control"
                              required
                              defaultValue=""
                              type="text"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label htmlFor="best_time_to_call" className="form-label">
                              Best time to call
                            </label>
                            <input
                              tabIndex={13}
                              name="best_time_to_call"
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label">Suffix</label>
                            <input
                              tabIndex={5}
                              name="suffix"
                              className="form-select suffix"
                              defaultValue=""
                              type="select"
                              onChange={handleInputChange}
                            />
                          </div>
                          {/*//! phone type not included in poc data sample*/}
                          <div className="column">
                            <label className="form-label">Phone Type</label>
                            <input
                              tabIndex={14}
                              name="phone_type"
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label">Marital Status</label>
                            <input
                              tabIndex={6}
                              name="marital_status"
                              className="form-select"
                              defaultValue=""
                              type="select"
                              onChange={handleInputChange}
                            />
                          </div>
                          {/* //! not included in poc data sample*/}
                          <div className="column check">
                            <input
                              tabIndex={15}
                              className="form-check-input"
                              type="checkbox"
                              id="checkbox"
                              onChange={handleInputChange}
                            />
                            <label htmlFor="checkbox">
                              Would you like to receive text messages? <br />
                              This could cause additional charges.
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="column">
                            <label className="form-label">Co-Applicant</label>
                            <input
                              tabIndex={7}
                              name="coapplicant"
                              className="form-select"
                              defaultValue=""
                              type="select"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label">Email Address</label>
                            <input
                              tabIndex={16}
                              name="email"
                              className="form-control"
                              type="email"
                              defaultValue=""
                              required
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label">Country of Citizenship</label>
                            <input
                              tabIndex={8}
                              className="form-select"
                              required
                              type="select"
                              defaultValue=""
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label">Preferred Language</label>
                            <select
                              tabIndex={17}
                              className="form-select"
                              onChange={handleInputChange}
                            >
                              <option disabled hidden selected value="">
                                Choose Preferred Language
                              </option>
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label">Country of Residence</label>
                            <input
                              name="country_of_residence"
                              tabIndex={9}
                              className="form-select"
                              defaultValue=""
                              required
                              type="select"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="end-button">
                          <button tabIndex={19} className="save-button">
                            Save
                          </button>
                          <button tabIndex={20} onClick={openFirstCollapsible}>
                            Next Step
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/*Property Section*/}
                <div className="collapsible">
                  <div className="headerOption">
                    <button className="toggle" onClick={() => setIsPropertyOpen(!isPropertyOpen)}>
                      <BsFillHouseDoorFill size={34} />
                      Step 2: Property Information
                    </button>
                  </div>
                  <div
                    className="content-parent"
                    ref={propertyRef}
                    style={
                      isPropertyOpen
                        ? {
                            height: propertyRef.current.scrollHeight + 'px',
                          }
                        : {
                            height: '0px',
                          }
                    }
                  >
                    <div className="content">
                      <form>
                        <div className="row">
                          <div className="column">
                            <label htmlFor="property_location" className="form-label">
                              Property Location
                            </label>
                            <input
                              name="property_location"
                              id="property_location"
                              defaultValue=""
                              className="form-select"
                              type="select"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label">Estimated Property Value</label>
                            <input
                              name="property_value"
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label">Address Line 1</label>
                            <input
                              name="street"
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label">Time at this Address</label>
                            <input
                              name="time_at_address"
                              className="form-select"
                              defaultValue=""
                              type="select"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label">Address Line 2</label>
                            <input
                              name="street_2"
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label">Line of Credit Amount</label>
                            <input
                              name="line_of_credit"
                              className="form-control"
                              defaultValue=""
                              type="tel"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label">Property City</label>
                            <input
                              name="property_city"
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label">
                              Will loan proceeds be used primarly for business porpuses
                            </label>
                            <input
                              name="loan_used_for_business"
                              className="form-select"
                              defaultValue=""
                              type="select"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label">State</label>
                            <input
                              name="property_state"
                              className="form-select state"
                              defaultValue=""
                              type="select"
                              onChange={handleInputChange}
                            />

                            <label className="form-label">Zip Code</label>
                            <input
                              name="property_zip_code"
                              className="form-control zip-code"
                              defaultValue=""
                              type="text"
                              onChange={handleInputChange}
                            />

                            <label className="form-label">Property County</label>
                            <input
                              name="property_country"
                              className="form-control"
                              type="text"
                              defaultValue=""
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label">How do you plan to use the funds?</label>
                            <textarea
                              name="plans_for_the_funds"
                              className="form-control"
                              defaultValue=""
                              cols="50"
                              rows="6"
                              onChange={handleInputChange}
                            ></textarea>
                          </div>
                        </div>

                        <div className="end-button">
                          <button onClick={closeFirstCollapsible}>Back</button>
                          <button className="save-button">Save</button>
                          <button onClick={openSecondCollapsible}>Next Step</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/*Income Section */}
                <div className="collapsible">
                  <div className="headerOption">
                    <button className="toggle" onClick={() => setIsIncomeOpen(!isIncomeOpen)}>
                      <FaCoins size={34} />
                      Step 3: Income and Assets
                    </button>
                  </div>
                  <div
                    className="content-parent"
                    ref={incomeRef}
                    style={
                      isIncomeOpen
                        ? {
                            height: incomeRef.current.scrollHeight + 'px',
                          }
                        : {
                            height: '0px',
                          }
                    }
                  >
                    <div className="content">
                      <form onSubmit={sendData} className="income">
                        <div className="row">
                          <label htmlFor="employment-status">Employment Status</label>
                          <input
                            name="employment_status"
                            className="form-select"
                            defaultValue=""
                            type="select"
                            id="employment-status"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="row">
                          <label htmlFor="anual_income">Annual Income</label>
                          <input
                            name="anual_income"
                            className="form-control"
                            required
                            defaultValue=""
                            type="text"
                            id="anual_income"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="row">
                          <label htmlFor="source-income">Source of Income</label>
                          <input
                            name="source_of_income"
                            className="form-select"
                            defaultValue=""
                            type="select"
                            id="source-income"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="row">
                          <label htmlFor="additional-income">
                            Do you have additional income from other source?
                          </label>
                          <input
                            name="additional_income"
                            className="form-select"
                            defaultValue=""
                            type="select"
                            id="additional-income"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="income-button">
                          <button onClick={closeSecondCollapsible}>Back</button>
                          <button className="save-button">Save & Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ApplicationForm
