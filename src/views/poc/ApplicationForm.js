import { React, useState, useRef } from 'react'
import swal from 'sweetalert'
import { v4 as uuidv4 } from 'uuid'
import { BsFillPersonFill } from 'react-icons/bs'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { FaCoins } from 'react-icons/fa'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import './collapsible.css'
import { CRow, CCol, CCard, CCardBody } from '@coreui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Step4 from './Step4'

const ApplicationForm = () => {
  //*USE STATE HOOKS
  const [save, setSave] = useState(false) //? To identify what button was pressed save or next
  const [isPersonalOpen, setIsPersonalOpen] = useState(false) //? Open or close personalInformation form
  const [isPropertyOpen, setIsPropertyOpen] = useState(false) //? Open or close propertyInformation form
  const [isIncomeOpen, setIsIncomeOpen] = useState(false) //? Open or close income form
  const [isVerificationOpen, setIsVerificationOpen] = useState(false) //? Open or close income form

  //*USE REF HOOKS
  const personalRef = useRef() //? To select the personalInformation form
  const propertyRef = useRef() //? To select the propertyInformation form
  const incomeRef = useRef() //? To select the income form
  const personalInfoForm = useRef()
  const verificationRef = useRef() //? to select the income verification

  let statusPersonal = false

  //*BACK BUTTON FUNCTIONS
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

  //*FORMIK settings
  //?PERSONAL INFORMATION FORMIK
  const personalInformation = useFormik({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      phone: '',
      email: '',
      phone_type: '',
      suffix: '',
      best_time_to_call: '',
      secondary_phone_number: '',
      country_of_citizenship: '',
      country_of_residence: '',
      social_security_number: '',
      date_of_birth: '',
      marital_status: '',
      preferred_language: '',
      coapplicant: '',
      topics: uuidv4(),
      //vendor: ''
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      if (save === false) {
        console.log('next')
        setIsPropertyOpen(true)
        setIsPersonalOpen(false)
        statusPersonal = true
        //setSave(false)
      } else {
        //setSave(true)
        setIsPropertyOpen(true)
        setIsPersonalOpen(false)
        alert('saved')
        console.log('save')
      }
      return statusPersonal
    },
  })

  //? PROPERTY INFORMATION FORMIK
  const propertyInformation = useFormik({
    initialValues: {
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
      time_at_address: '',
    },
    validationSchema: Yup.object({
      line_of_credit: Yup.string().required('This field is required'),
      street: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      if (save === false) {
        console.log('next')
        setIsIncomeOpen(true)
        setIsPropertyOpen(false)
      } else {
        setIsIncomeOpen(true)
        setIsPropertyOpen(false)
        alert('saved')
        console.log('save')

        return console.log()
      }
    },
  })

  //?INCOME FORMIK
  const incomeInformation = useFormik({
    initialValues: {
      employment_status: '',
      anual_income: '',
      source_of_income: '',
      additional_income: '',
    },
    //validate,
    validationSchema: Yup.object({
      anual_income: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      sendData()
    },
  })

  // *FUNCTION TO SEND DATA TO AWS/KALEIDO
  const sendData = (e) => {
    //e.preventDefault()

    //?header options for post request
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    var fullName =
      personalInformation.values.first_name.trim() +
      ' ' +
      personalInformation.values.middle_name.trim() +
      ' ' +
      personalInformation.values.last_name.trim()

    //? DATA COMPOSED BY personalInformation, porperty information and income formiks
    var raw = JSON.stringify({
      name: personalInformation.values.first_name,
      phone: personalInformation.values.phone,
      email: personalInformation.values.email,
      street: propertyInformation.values.street,
      street_2: propertyInformation.values.street_2,
      property_city: propertyInformation.values.property_city,
      property_country: propertyInformation.values.property_country,
      property_state: propertyInformation.values.property_state,
      property_zip_code: propertyInformation.values.property_zip_code,
      tell_us_about_your_loan: '',
      property_location: propertyInformation.values.property_location,
      property_use: propertyInformation.values.property_use,
      property_value: propertyInformation.values.property_value,
      line_of_credit: propertyInformation.values.line_of_credit,
      plans_for_the_funds: propertyInformation.values.plans_for_the_funds,
      loan_used_for_business: propertyInformation.values.loan_used_for_business,
      suffix: personalInformation.values.suffix,
      time_at_address: propertyInformation.values.time_at_address,
      best_time_to_call: personalInformation.values.best_time_to_call,
      secondary_phone_number: personalInformation.values.secondary_phone_number,
      country_of_citizenship: personalInformation.values.country_of_citizenship,
      country_of_residence: personalInformation.values.country_of_citizenship,
      social_security_number: personalInformation.values.social_security_number,
      date_of_birth: personalInformation.values.date_of_birth,
      marital_status: personalInformation.values.marital_status,
      preferred_language: personalInformation.values.preferred_language,
      employment_status: incomeInformation.values.employment_status,
      anual_income: incomeInformation.values.anual_income,
      source_of_income: incomeInformation.values.source_of_income,
      additional_income: incomeInformation.values.additional_income,
      coapplicant: personalInformation.values.coapplicant,
      vendor: 'receive_borrower',
      topics: personalInformation.values.topics,
    })

    //?HEADER OPTIONS
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      //mode: 'no-cors',
      body: raw,
      redirect: 'follow',
    }
    console.log(raw)

    //?SEND FORM TO AWS
    ;(async function () {
      try {
        const response = await fetch(
          'https://mr9w0zhxw7.execute-api.us-east-1.amazonaws.com/prod',
          requestOptions,
        )
        if (response.ok) {
          // swal({
          //   title: 'Success',
          //   text: `Your applicattion form has been saved and sumitted succesfully`,
          //   icon: 'success',
          // })
          swal({
            title: 'Loan ID',
            text: `${personalInformation.values.topics}`,
            icon: 'success',
          })
          //? Close income collapsible
          setIsIncomeOpen(false)
          //? Reset form after submit
          personalInformation.handleReset()
          propertyInformation.handleReset()
          incomeInformation.handleReset()
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
    })()
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <div className="container">
                <div className="property-select">
                  <label className="form-label required" htmlFor="property-state">
                    Property state?
                  </label>
                  <input
                    className="form-select"
                    type="select"
                    name=""
                    id="property-state"
                    //onChange={handleInputChange}
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
                              //onChange={handleInputChange}
                            />
                          </div>
                          <div className="column">
                            <label htmlFor="ssn" className="required">
                              SSN
                            </label>
                            <input
                              tabIndex={10}
                              id="ssn"
                              defaultValue=""
                              name="social_security_number"
                              className="form-control"
                              type="text"
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.social_security_number}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label htmlFor="first_name" className="form-label required">
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
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.first_name}
                            />
                            {
                              /* Show name error */
                              personalInformation.errors.first_name && (
                                <div>{personalInformation.errors.first_name}</div>
                              )
                            }
                          </div>
                          <div className="column">
                            <label htmlFor="date_of_birth" className="form-label required">
                              Date of Birth
                            </label>
                            <input
                              tabIndex={11}
                              name="date_of_birth"
                              id="date_of_birth"
                              className="form-control"
                              defaultValue=""
                              type="date"
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.date_of_birth}
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
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.middle_name}
                            />
                          </div>
                          <div className="column">
                            <label htmlFor="phone-number" className="form-label required">
                              Phone Number
                            </label>
                            <input
                              tabIndex={12}
                              name="phone"
                              className="form-control"
                              id="phone-number"
                              defaultValue=""
                              type="tel"
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.phone}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label htmlFor="last_name" className="form-label required">
                              Last Name
                            </label>
                            <input
                              tabIndex={4}
                              name="last_name"
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.last_name}
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
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.best_time_to_call}
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
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.suffix}
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
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.phone_type}
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
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.marital_status}
                            />
                          </div>
                          {/* //! not included in poc data sample*/}
                          <div className="column check">
                            <input
                              tabIndex={15}
                              className="form-check-input"
                              type="checkbox"
                              id="checkbox"
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
                            <select
                              tabIndex={7}
                              name="coapplicant"
                              className="form-select"
                              defaultValue=""
                              type="select"
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.coapplicant}
                            >
                              <option value="" selected hidden>
                                Choose an option
                              </option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                          <div className="column">
                            <label className="form-label">Email Address</label>
                            <input
                              tabIndex={16}
                              name="email"
                              className="form-control"
                              type="email"
                              defaultValue=""
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.email}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label">Country of Citizenship</label>
                            <input
                              tabIndex={8}
                              className="form-select"
                              type="select"
                              defaultValue=""
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.country_of_citizenship}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label">Preferred Language</label>
                            <select
                              tabIndex={17}
                              className="form-select"
                              //onChange={handleInputChange}
                            >
                              <option disabled hidden selected value="">
                                Choose Preferred Language
                              </option>
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="fr">Chinese</option>
                              <option value="fr">Vietnamese</option>
                              <option value="fr">Tagalog</option>
                              <option value="fr">Korean</option>
                              <option value="fr">Creole</option>
                              <option value="fr">Arabic</option>
                              <option value="fr">Russian</option>
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
                              type="select"
                              onChange={personalInformation.handleChange}
                              value={personalInformation.values.country_of_residence}
                            />
                          </div>
                        </div>
                        <div className="end-button">
                          <button
                            tabIndex={19}
                            className="save-button"
                            type="button"
                            onClick={() => {
                              //e.preventDefault()
                              setSave(true)
                              personalInformation.handleSubmit()
                            }}
                          >
                            Save
                          </button>
                          <button
                            tabIndex={20}
                            type="button"
                            onClick={() => {
                              //e.preventDefault()
                              setSave(false)
                              personalInformation.handleSubmit()
                            }}
                          >
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
                    <button className="toggle">
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
                            <label htmlFor="property_location" className="form-label required">
                              Property Location
                            </label>
                            <input
                              tabIndex={21}
                              name="property_location"
                              id="property_location"
                              defaultValue=""
                              className="form-select"
                              type="select"
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.property_location}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label">Estimated Property Value</label>
                            <input
                              tabIndex={28}
                              name="property_value"
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.property_value}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label required">Address Line 1</label>
                            <input
                              tabIndex={22}
                              name="street"
                              required
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.street}
                            />
                            {
                              /* Show address error */
                              propertyInformation.errors.street && (
                                <div>{propertyInformation.errors.street}</div>
                              )
                            }
                          </div>
                          <div className="column">
                            <label className="form-label">Time at this Address</label>
                            <input
                              tabIndex={29}
                              name="time_at_address"
                              className="form-select"
                              defaultValue=""
                              type="select"
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.time_at_address}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label">Address Line 2</label>
                            <input
                              tabIndex={23}
                              name="street_2"
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.street_2}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label required">Line of Credit Amount</label>
                            <input
                              tabIndex={30}
                              name="line_of_credit"
                              required
                              className="form-control"
                              defaultValue=""
                              type="tel"
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.line_of_credit}
                            />
                            {
                              /* Show credit amount error */
                              propertyInformation.errors.line_of_credit && (
                                <div>{propertyInformation.errors.line_of_credit}</div>
                              )
                            }
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label required">Property City</label>
                            <input
                              tabIndex={24}
                              name="property_city"
                              className="form-control"
                              defaultValue=""
                              type="text"
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.property_city}
                            />
                          </div>
                          <div className="column">
                            <label className="form-label">
                              Will loan proceeds be used primarly for business purposes
                            </label>
                            <input
                              tabIndex={31}
                              name="loan_used_for_business"
                              className="form-select"
                              defaultValue=""
                              type="select"
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.loan_used_for_business}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column">
                            <label className="form-label required">State</label>
                            <input
                              tabIndex={25}
                              name="property_state"
                              className="form-select state"
                              defaultValue=""
                              type="select"
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.property_state}
                            />
                          </div>

                          <div className="column">
                            <label className="form-label">Property Use</label>
                            <input
                              tabIndex={32}
                              name="property_use"
                              className="form-control"
                              type="text"
                              defaultValue=""
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.property_use}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="column">
                            <label className="form-label required">Zip Code</label>
                            <input
                              tabIndex={26}
                              name="property_zip_code"
                              className="form-control zip-code"
                              defaultValue=""
                              type="text"
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.property_zip_code}
                            />

                            <label className="form-label">How do you plan to use the funds?</label>
                            <textarea
                              name="plans_for_the_funds"
                              className="form-control"
                              defaultValue=""
                              cols="50"
                              rows="3"
                              tabIndex={27}
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.plans_for_the_funds}
                            ></textarea>
                          </div>

                          <div className="column">
                            <label className="form-label required">Property County</label>
                            <input
                              tabIndex={33}
                              name="property_country"
                              className="form-control"
                              type="text"
                              defaultValue=""
                              onChange={propertyInformation.handleChange}
                              value={propertyInformation.values.property_country}
                            />
                          </div>
                        </div>

                        <div className="end-button">
                          <button tabIndex={34} type="button" onClick={closeFirstCollapsible}>
                            Back
                          </button>
                          <button
                            type="button"
                            tabIndex={35}
                            className="save-button"
                            onClick={() => {
                              setSave(true)
                              propertyInformation.handleSubmit()
                            }}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            tabIndex={36}
                            onClick={() => {
                              setSave(false)
                              propertyInformation.handleSubmit()
                            }}
                          >
                            Next Step
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/*Income Section */}
                <div className="collapsible">
                  <div className="headerOption">
                    <button className="toggle">
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
                          <label htmlFor="employment-status" className="required">
                            Employment Status
                          </label>
                          <input
                            name="employment_status"
                            className="form-select"
                            defaultValue=""
                            type="select"
                            id="employment_status"
                            onChange={incomeInformation.handleChange}
                            value={incomeInformation.values.employment_status}
                          />
                        </div>
                        <div className="row">
                          <label htmlFor="anual_income" className="required">
                            Annual Income
                          </label>
                          <input
                            name="anual_income"
                            className="form-control"
                            required
                            defaultValue=""
                            type="text"
                            id="anual_income"
                            onChange={incomeInformation.handleChange}
                            value={incomeInformation.values.anual_income}
                          />
                          {
                            /* Show name error */
                            incomeInformation.errors.anual_income && (
                              <div>{incomeInformation.errors.anual_income}</div>
                            )
                          }
                        </div>
                        <div className="row">
                          <label htmlFor="source-income" className="required">
                            Source of Income
                          </label>
                          <input
                            name="source_of_income"
                            className="form-select"
                            defaultValue=""
                            type="select"
                            id="source-income"
                            onChange={incomeInformation.handleChange}
                            value={incomeInformation.values.source_of_income}
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
                            onChange={incomeInformation.handleChange}
                            value={incomeInformation.values.additional_income}
                          />
                        </div>

                        <div className="income-button">
                          <button type="button" onClick={closeSecondCollapsible}>
                            Back
                          </button>
                          <button
                            type="button"
                            className="save-button"
                            onClick={() => {
                              incomeInformation.handleSubmit()
                              // .then((status) => propertyInformation.handleSubmit())
                              // .then(() => incomeInformation.handleSubmit())
                              //setIsIncomeOpen(false)
                              //sendData()
                            }}
                          >
                            Save & Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="collapsible">
                  <div className="headerOption">
                    <button
                      className="toggle"
                      onClick={() => setIsVerificationOpen(!isVerificationOpen)}
                    >
                      <FaMoneyCheckAlt size={34} /> Step 4: Income and Assets Verification
                    </button>
                  </div>
                  <div
                    className="content-parent"
                    ref={verificationRef}
                    style={
                      isVerificationOpen
                        ? {
                            height: verificationRef.current.scrollHeight + 'px',
                          }
                        : {
                            height: '0px',
                          }
                    }
                  >
                    <div className="content">
                      <Step4 />
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
