import './decision.css'
import { React, useState, useEffect } from 'react'
import { CProgressBar } from '@coreui/react'
import swal from 'sweetalert'
import { CProgress } from '@coreui/react'
import { BsCheck2Circle, BsXCircleFill } from 'react-icons/bs'
import { Result } from 'antd'
import { Collapse } from 'antd'
import 'antd/dist/antd.variable.min.css'
import Moment from 'react-moment'
import 'moment-timezone'

const { Panel } = Collapse
const DecisionAnalysis = () => {
  //*UseState Hook to handle toogle funcinality
  const creditReportId = '69cdce01-af4c-4fcc-a4b9-cc97b70ba1b5'
  const avm_file = '728ca248-2918-464e-8b5f-d0f91c2855a9'
  const title_file = 'a1a32b40-c4c9-4d0c-af18-dfdebf19d6ec'
  const paystub_file = 'effdbd43-6fa8-4608-9e0b-0bc945b60155'
  const [isToggled, setIsToggled] = useState(false)
  const [uuid, setUuid] = useState()
  const [loanList, setLoanList] = useState([])
  const [select, setSelect] = useState([])
  const [progress, setProgress] = useState(0)
  const [msg, setMsg] = useState([])
  const [finalDecision, setFinalDecision] = useState(false)
  const [spinner, setSpinner] = useState(true)
  const [reload, setReload] = useState(false)
  const [showYes, setShowYes] = useState(false)
  const [showNo, setShowNo] = useState(false)
  const [apply, setApply] = useState('true')
  const [title_run, seTitle_run] = useState(false)
  const [credit, setCredit] = useState(false)
  const [employment, setEmployment] = useState(false)
  const [appraisal, setAppraisal] = useState(false)
  const [showDecision, setShowDecision] = useState(false)
  const [CreditScore, setCreditScore] = useState()
  const [employmentStatus, setEmploymentStatus] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [file, setFile] = useState('')
  const [dataids, setDataIds] = useState([])
  const [requestDate, setRequestDate] = useState({
    credit: '',
    appraisal: '',
    title_run: '',
    employment: '',
  })
  const [deliveryDate, setDeliveryDate] = useState({
    credit_response: '',
    appraisal_response: '',
    title_run_response: '',
    employment_response: '',
  })

  const [borrowerFiles, setBorrowerFiles] = useState(false)

  // var borrower_info;
  let loanIds = []
  var decision = ''
  var t = []
  //var header;

  const URL = 'https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io'
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization:
        'Basic dTBqbW1mam12NTphNGV3WjZuNVh1bHBSVElmMXNKX2FWa1pYQjZ3RGtLaFVhSVFUMEVNbVJF',
      'Content-Type': 'application/json',
    },
  }

  //Check all the message we have
  useEffect(() => {
    //Get all the messages
    async function get_topics() {
      setIsLoading(true)
      const dynamo = await fetch(
        `https://rrjkbunuf0.execute-api.us-east-1.amazonaws.com/prod/loan_data

        `,
        requestOptions,
      )

      const dynamoInfo = await dynamo.json()
      dynamoInfo.map((id) => {
        if (!('decision' in id)) {
          //console.log(id['loan_data'])
          loanIds.push(id['loan_data'])
        }
      })

      setLoanList(loanIds)
      setIsLoading(false)
    }

    get_topics()
  }, [])

  //CLEAR LOAN IDS

  // async function clearLoans(loanIDs) {
  //   for (let i = 0; i < loanIDs.length; i++) {
  //     let persisted_data = JSON.stringify({
  //       vendor: 'store_result_in_blockchain',
  //       decision: 'No',
  //       uuid: loanIDs[i],
  //     })

  //     let Options = {
  //       headers: { 'Content-Type': 'application/json' },
  //       method: 'POST',
  //       body: persisted_data,
  //       redirect: 'follow',
  //     }
  //     const sendDecision = await fetch(
  //       'https://mr9w0zhxw7.execute-api.us-east-1.amazonaws.com/prod',
  //       Options,
  //     )
  //   }
  // }

  //*DOWNLOAD PDF
  async function downloadFile(idFile) {
    const request = await fetch(
      `${URL}/api/v1/namespaces/default/data/${idFile}/blob`,
      requestOptions,
    )
    console.log(idFile)
    const blob = await request.blob()
    let file = new Blob([blob], { type: 'application/pdf' })
    let pdf = window.URL.createObjectURL(file)
    window.open(pdf, '_blank')
    let a = document.createElement('a')
    a.href = window.URL.createObjectURL(file)
    a.target = '_blank'
    a.onclick = `window.open('mypdf.pdf', '_blank')`
    a.click()
  }

  //*get the uuid typed by de user and saving it in UUID hook

  function handle_uuid(e) {
    setUuid(e.target.value)
  }
  let url = `https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/messages?topics=${uuid}&limit=25`

  async function get_messages(e) {
    e.preventDefault()
    setIsLoading(true)
    //This is the base endpoint to get the total number of messages associated with a
    //uuid (which maps exactly to a uuid)

    try {
      const response = await fetch(url, requestOptions)
      //We get back a list with multiple messsages in the form of JSONs
      const message = await response.json()
      //The progress bar knows that the total number of messages is 7, so it will display
      //the progress based on how many messages are already inside the list

      //If there are 0 messages when entering a loan ID, display an informational error back
      if (message.length === 0) {
        swal({
          text: 'Unable to find loan ID',
          icon: 'warning',
        })
      }

      setApply(false)

      setIsToggled(true)
      //console.log(message)
      setProgress((message.length / 10) * 100)
      //setMsg(message);

      //Since we are getting back a list of messages, I took the decision of letting
      //the end user select one of them to be displayed on the UI
      //if we received the appreisal, employment, credit score or title run verification e dn't display that message
      //in the table, we'll see the status.
      let fileIdsFound = false
      const forLoop = async (_) => {
        console.log(message)
        for (let i = message.length - 1; i >= 0; i--) {
          let r = await fetch(
            `https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/messages/${message[i].header.id}/data`,
            requestOptions,
          )
          let a = await r.json()

          while (fileIdsFound === false) {
            if ('borrower_info' in a[0].value) {
              console.log('founded')
              var objectFile = Object.keys(a[0].value.borrower_info.data_ids).length
              if (objectFile > 0) {
                setDataIds(a[0].value.borrower_info.data_ids)
                console.log(a[0].value.borrower_info.data_ids)
                setBorrowerFiles(true)
              } else {
                setBorrowerFiles(false)
              }
              fileIdsFound = true
            }
          }
        }
      }

      forLoop()
      setSelect(message)

      // check responses from external vendors to download files
      const checkResponses = async (_) => {
        let tags = [
          'credit_run',
          'appraisal_run',
          'title_run',
          'verify_employment',
          'credit_check_response',
          'appraisal_run_response',
          'title_run_response',
          'verify_employment_response',
        ]

        for (let i = 0; i < tags.length; i++) {
          let request = await fetch(
            `https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/messages?tag=${tags[i]}&topics=${uuid}&limit=25`,
            requestOptions,
          )
          const response = await request.json()
          console.log(response)

          //call checkTask function
          checkTask(response, i)
          console.log(requestDate)
        }

        //function to check request and delivery time
        function checkTask(response, i) {
          setTimeout(function () {
            if (typeof response[0].header?.created !== 'undefined') {
              if (i === 0) {
                //SET REQUEST DATES
                //credit_run
                setRequestDate((requestDate) => ({
                  ...requestDate,
                  credit: response[0].header?.created,
                }))
              } else {
                if (i === 1) {
                  //appraisal_run
                  setRequestDate((requestDate) => ({
                    ...requestDate,
                    appraisal: response[0].header?.created,
                  }))
                } else {
                  if (i === 2) {
                    setRequestDate((requestDate) => ({
                      ...requestDate,
                      title_run: response[0].header?.created,
                    }))
                  } else {
                    if (i === 3) {
                      setRequestDate((requestDate) => ({
                        ...requestDate,
                        employment: response[0].header?.created,
                      }))
                    } else {
                      //DELIVERY DATES
                      if (i === 4) {
                        if (typeof response !== 'undefined') {
                          setDeliveryDate((deliveryDate) => ({
                            ...deliveryDate,
                            credit_response: response[0].confirmed,
                          }))

                          setCredit(true)
                          console.log(response[0].header?.created)
                        }
                      } else {
                        if (i === 5) {
                          setDeliveryDate((deliveryDate) => ({
                            ...deliveryDate,
                            appraisal_response: response[0].header?.created,
                          }))
                          if (typeof response !== 'undefined') {
                            setAppraisal(true)
                          }
                        } else {
                          if (i === 6) {
                            setDeliveryDate((deliveryDate) => ({
                              ...deliveryDate,
                              title_run_response: response[0].header?.created,
                            }))
                            if (typeof response !== 'undefined') {
                              seTitle_run(true)
                            }
                          } else {
                            if (i === 7) {
                              setDeliveryDate((deliveryDate) => ({
                                ...deliveryDate,
                                employment_response: response[0].header?.created,
                              }))
                              setEmployment(true)
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }, 1000)
        }

        console.log(requestDate)
      }
      await checkResponses()

      //

      //Based on the message selected from the dropdown, display the data inside it
      /*const selectedMessage = (e.target.value);
    
                const resp = await fetch(`https://u0wwlhc3wf-u0q3j8sefo-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/messages/${selectedMessage}/data`, requestOptions);
                await setData(response.json());
                console.log(data);*/
      // Only display the make final decision button, if all the data has been received
      //(meaning we have 6 messsages on the list)
      //console.log(message.length);

      if (message.length === 9) {
        const idd = message[8]
        const selectedMessage = idd.header.id
        setSpinner(false)
        setReload(false)
        let flag = false
        let data
        const whileFlag = async (_) => {
          while (flag === false) {
            for (let j = 0; j < message.length; j++) {
              let h = await fetch(
                `https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/messages/${message[j].header.id}/data`,
                requestOptions,
              )
              data = await h.json()

              if ('borrower_info' in data[0].value) {
                if (
                  'credit_score' in data[0].value.borrower_info &&
                  'employment_verification' in data[0].value.borrower_info
                ) {
                  flag = true
                  console.log('loop finished')
                  break
                }
              }
            }
          }
        }
        await whileFlag()
        setCreditScore(data[0].value.borrower_info.credit_score)
        setEmploymentStatus(data[0].value.borrower_info.employment_verification)

        //const vendor = data[0].value.vendor;
        console.log(data[0].value.borrower_info)
        // borrower_info =  data[0].value.borrower_info;
        //creditScore = data[0].value.borrower_info.credit_score;
        //setCreditScore(data[0].value.borrower_info.credit_score);
        //employment_verification =  borrower_info.employment_verification;
        //                    console.log(data[0].value.borrower_info.credit_score);
        //console.log(CreditScore);
        setFinalDecision(true)
      } else {
        if (message.length >= 10) {
          setSpinner(false)
          setReload(false)
          //setFinalDecision(false)
          console.log('Loan successfully processed')
        } else {
          setReload(false)
          setSpinner(true)
          setTimeout(() => {
            setSpinner(false)
            setReload(true)
          }, 3000)
        }
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  //Fill out select with messages

  async function handleSelect(e) {
    const selectedMessage = await e.target.value
    console.log(selectedMessage)
    if (selectedMessage.length !== 0) {
      const resp = await fetch(
        `https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/messages/${selectedMessage}/data`,
        requestOptions,
      )
      const data = await resp.json()
      setMsg(data[0].value)
      console.log(data[0])
    }
  }

  //decision analysis function

  /* //*  This funtion calls AWS API Gateway to register the decision.
        //*Since the decision is made inside the UI, we need to persist such decision in Kaleido
        //*Args:
        //*data (dict): Data containing the response sent from Kaleido
        //*uuid (str): loan ID */

  async function persist_decision(e) {
    console.log('persist decision')
    console.log(`persist decision ${CreditScore}`)
    console.log(`persist decision ${employmentStatus}`)

    if (CreditScore < 600) {
      decision = 'No'
      console.log(`credit score: ${decision}`)
      setShowDecision(false)
    } else {
      if (employmentStatus === false) {
        decision = 'No'
        console.log(`employment_verification ${decision}`)
        setShowDecision(false)
      } else {
        decision = 'Yes'
        console.log(`else ${decision}`)
        setShowDecision(true)
      }
    }
    let persisted_data = JSON.stringify({
      vendor: 'store_result_in_blockchain',
      decision: decision,
      uuid: uuid,
    })

    let Options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: persisted_data,
      redirect: 'follow',
    }

    const sendDecision = await fetch(
      'https://mr9w0zhxw7.execute-api.us-east-1.amazonaws.com/prod',
      Options,
    )
    if (sendDecision.ok) {
      swal({
        text: 'Successfully written to the blockchain',
        icon: 'success',
      })
    } else {
      swal({
        text: 'Failed to write decision to the blockchain',
        icon: 'error',
      })
    }

    get_messages(e)
    console.log(decision)
    if (decision == 'Yes') {
      setShowYes(true)
    } else {
      setShowNo(true)
    }
    setFinalDecision(false)
  }

  return (
    <div>
      {/*<NavBar />
      
      <Header title="Decision Analysis" />*/}
      <body>
        <div className="container">
          <form action="">
            <div className="loan-info">
              {/* <button onClick={clearLoans(loanList)}>Clear loan ID</button> */}
              <div>
                <label className="form-label" htmlFor="loan_id">
                  Please, select a loan ID
                </label>
                <select
                  disabled={isLoading}
                  className="form-select"
                  type="select"
                  name="loan_id"
                  id="loan_id"
                  onChange={handle_uuid}
                >
                  <option selected disabled hidden>
                    Select a loan ID
                  </option>
                  {loanList.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              {apply === 'true' && (
                <button
                  type="submit"
                  onClick={get_messages}
                  className="btn btn-primary btn-apply"
                  disabled={isLoading}
                >
                  Apply
                </button>
              )}
            </div>
          </form>
          {isToggled && (
            <div>
              <div className="verification">
                <div className="credit-check">
                  <h6 className="step-text">Credit Check</h6>
                  {credit === true ? (
                    <BsCheck2Circle color="green" size={35} />
                  ) : (
                    <BsXCircleFill color="red" size={35} />
                  )}
                </div>
                <div className="appraisal">
                  <h6 className="step-text">Appraisal</h6>
                  {appraisal === true ? (
                    <BsCheck2Circle color="green" size={35} />
                  ) : (
                    <BsXCircleFill color="red" size={35} />
                  )}
                </div>
                <div className="title-run">
                  <h6 className="step-text">Title Run</h6>
                  {title_run === true ? (
                    <BsCheck2Circle color="green" size={35} />
                  ) : (
                    <BsXCircleFill color="red" size={35} />
                  )}
                </div>

                <div className="employment">
                  <h6 className="step-text">VOI/E/A</h6>
                  {employment === true ? (
                    <BsCheck2Circle color="green" size={35} />
                  ) : (
                    <BsXCircleFill color="red" size={35} />
                  )}
                </div>
              </div>
            </div>
          )}
          {isToggled && (
            <div className="loading">
              {spinner && (
                <div>
                  <label htmlFor="">Processing Loan</label>
                  <br />
                  <CProgress className="mb-3">
                    <CProgressBar value={progress}>{progress}%</CProgressBar>
                  </CProgress>
                  <br />
                  <label htmlFor="">
                    Calling mutiple external vendors. Message has already been written to the
                    Blockchain
                  </label>
                </div>
              )}

              {reload && (
                <div className="loading">
                  <button onClick={get_messages} className="btn btn-primary">
                    Check again for this same loan ID
                  </button>
                </div>
              )}
            </div>
          )}

          {finalDecision && (
            <button
              id="final-decision"
              onClick={persist_decision}
              className="btn btn-primary btn-final"
            >
              Make final decision
            </button>
          )}

          {isToggled && (
            <div className="final-decision">
              <div>
                {showYes && <Result status="success" title="Approved Loan" />}
                {showNo && <Result status="error" title="Declined Loan" />}
              </div>

              <div>
                {/*FILES TABLE */}
                <h5>Underwriting Files</h5>
                <table className="main-table files">
                  <tr>
                    <th className="headcol">Request Date/Time</th>
                    <th className="headcol">Delivery Date/Time</th>
                    <th className="headcol">Type</th>
                    <th className="headcol">Vendor</th>
                    <th className="headcol">Link</th>
                  </tr>
                  <tbody>
                    <tr>
                      {requestDate.credit === '' ? (
                        <td className="cell">--</td>
                      ) : (
                        <td className="cell">
                          <Moment format="MM-DD-YYYY HH:mm:ss">{requestDate.credit}</Moment>
                        </td>
                      )}

                      {deliveryDate.credit_response == '' ? (
                        <td className="cell">--</td>
                      ) : (
                        <td className="cell">
                          <Moment format="MM-DD-YYYY HH:mm:ss">
                            {deliveryDate.credit_response}
                          </Moment>
                        </td>
                      )}

                      <td className="cell">Credit Report</td>
                      <td className="cell">Experian</td>
                      {typeof deliveryDate.credit_response !== 'undefined' &&
                        Object.keys(deliveryDate.credit_response).length > 0 && (
                          <td className="cell">
                            <a
                              className="download-link"
                              onClick={() => {
                                downloadFile(creditReportId)
                              }}
                            >
                              Experian Credit Report
                            </a>
                          </td>
                        )}
                    </tr>
                    <tr>
                      {requestDate.appraisal === '' ? (
                        <td className="cell">--</td>
                      ) : (
                        <td className="cell">
                          <Moment format="MM-DD-YYYY HH:mm:ss">{requestDate.appraisal}</Moment>
                        </td>
                      )}

                      {deliveryDate.appraisal_response === '' ? (
                        <td className="cell">--</td>
                      ) : (
                        <td className="cell">
                          <Moment format="MM-DD-YYYY HH:mm:ss">
                            {deliveryDate.appraisal_response}
                          </Moment>
                        </td>
                      )}

                      <td className="cell">AVM</td>
                      <td className="cell">UCS</td>
                      {typeof deliveryDate.appraisal_response !== 'undefined' &&
                        Object.keys(deliveryDate.appraisal_response).length > 0 && (
                          <td className="cell">
                            <a
                              className="download-link"
                              onClick={() => {
                                downloadFile(avm_file)
                              }}
                            >
                              Appraisal AVM
                            </a>
                          </td>
                        )}
                    </tr>
                    <tr>
                      {requestDate.title_run === '' ? (
                        <td className="cell">--</td>
                      ) : (
                        <td className="cell">
                          <Moment format="MM-DD-YYYY HH:mm:ss">{requestDate.title_run}</Moment>
                        </td>
                      )}

                      {deliveryDate.title_run_response === '' ? (
                        <td className="cell">--</td>
                      ) : (
                        <td className="cell">
                          <Moment format="MM-DD-YYYY HH:mm:ss">
                            {deliveryDate.title_run_response}
                          </Moment>
                        </td>
                      )}

                      <td className="cell">Title</td>
                      <td className="cell">Voxtur</td>
                      {typeof deliveryDate.title_run_response !== 'undefined' &&
                        Object.keys(deliveryDate.title_run_response).length > 0 && (
                          <td className="cell">
                            <a
                              className="download-link"
                              onClick={() => {
                                downloadFile(title_file)
                              }}
                            >
                              Voxtur
                            </a>
                          </td>
                        )}
                    </tr>
                    {borrowerFiles ? (
                      dataids.map((id) => (
                        <tr key={id.data_uuid}>
                          {requestDate.employment === '' ? (
                            <td className="cell">--</td>
                          ) : (
                            <td className="cell">
                              <Moment format="MM-DD-YYYY HH:mm:ss">{requestDate.employment}</Moment>
                            </td>
                          )}

                          {deliveryDate.employment_response === '' ? (
                            <td className="cell">--</td>
                          ) : (
                            <td className="cell">
                              <Moment format="MM-DD-YYYY HH:mm:ss">
                                {deliveryDate.employment_response}
                              </Moment>
                            </td>
                          )}
                          <td className="cell">{id.metadata.type}</td>
                          <td className="cell">Borrower</td>
                          {typeof deliveryDate.employment_response !== 'undefined' &&
                            Object.keys(deliveryDate.employment_response).length > 0 && (
                              <td className="cell">
                                <a
                                  className="download-link"
                                  key={id?.data_uuid}
                                  onClick={(e) => {
                                    downloadFile(id?.data_uuid)
                                  }}
                                >
                                  {id?.metadata?.filename}
                                </a>
                              </td>
                            )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        {requestDate.employment === '' ? (
                          <td className="cell">--</td>
                        ) : (
                          <td className="cell">
                            <Moment format="MM-DD-YYYY HH:mm:ss">{requestDate.employment}</Moment>
                          </td>
                        )}

                        {deliveryDate.employment_response === '' ? (
                          <td className="cell ">--</td>
                        ) : (
                          <td className="cell">
                            <Moment format="MM-DD-YYYY HH:mm:ss">
                              {deliveryDate.employment_response}
                            </Moment>
                          </td>
                        )}
                        <td className="cell">Paystub</td>
                        <td className="cell">Plaid</td>
                        {typeof deliveryDate.employment_response !== 'undefined' &&
                          Object.keys(deliveryDate.employment_response).length > 0 && (
                            <td className="cell">
                              <a
                                className="download-link"
                                onClick={() => {
                                  downloadFile(paystub_file)
                                }}
                              >
                                Plaid Paystub
                              </a>
                            </td>
                          )}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="alert alert-info" role="alert">
                Message IDs will keep changing the loan automatically progresses
              </div>
              <select
                type="select"
                className="form-select"
                name=""
                id=""
                onChange={(e) => {
                  handleSelect(e)
                  console.log(msg)
                }}
              >
                <option value="" disabled hidden selected>
                  Select a message
                </option>
                {select.map((item) => (
                  <option key={item.header.id} value={item.header.id}>
                    {item.header.id}
                  </option>
                ))}
              </select>
              <div className="table-scroll">
                <div className="table-wrap">
                  <table className="main-table">
                    {'borrower_info' in msg &&
                      ('decision' in msg['borrower_info'] ? (
                        <tbody>
                          <tr>
                            <th colSpan="2" className="headcol" style={{ textAlign: 'center' }}>
                              Final Decision
                            </th>
                          </tr>

                          <tr>
                            <th className="headcol">Decision</th>
                            <td className="cell">{msg.borrower_info.decision}</td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <th colSpan="2" className="headcol" style={{ textAlign: 'center' }}>
                              Personal Information
                            </th>
                          </tr>
                          <tr>
                            <th className="headcol">Name</th>
                            <td className="cell">{msg.borrower_info.name}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Email</th>
                            <td className="cell">{msg.borrower_info.email}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Phone</th>
                            <td className="cell">{msg.borrower_info.phone}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Secondary Phone Number</th>
                            <td className="cell">{msg.borrower_info.secondary_phone_number}</td>
                          </tr>

                          <tr>
                            <th className="headcol">Marital Status</th>
                            <td className="cell">{msg.borrower_info.marital_status}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Co-applicant</th>
                            <td className="cell">{msg.borrower_info.coapplicant}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Country of Citizenship</th>
                            <td className="cell">{msg.borrower_info.country_of_citizenship}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Country of Residence</th>
                            <td className="cell">{msg.borrower_info.country_of_residence}</td>
                          </tr>
                          <tr>
                            <th className="headcol">SSN</th>
                            <td className="cell">{msg.borrower_info.social_security_number}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Date of Birth</th>
                            <td className="cell">{msg.borrower_info.date_of_birth}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Best Time to Call</th>
                            <td className="cell">{msg.borrower_info.best_time_to_call}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Preferred Language</th>
                            <td className="cell">{msg.borrower_info.preferred_language}</td>
                          </tr>
                          <tr>
                            <th colSpan="2" className="headcol" style={{ textAlign: 'center' }}>
                              Property Information
                            </th>
                          </tr>

                          <tr>
                            <th className="headcol">Address Line 1</th>
                            <td className="cell">{msg.borrower_info.street}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Address Line 2</th>
                            <td className="cell">{msg.borrower_info.street_2}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Property City</th>
                            <td className="cell">{msg.borrower_info.property_city}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Property County</th>
                            <td className="cell">{msg.borrower_info.property_country}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Property State</th>
                            <td className="cell">{msg.borrower_info.property_state}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Property Zip Code</th>
                            <td className="cell">{msg.borrower_info.property_zip_code}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Property Location</th>
                            <td className="cell">{msg.borrower_info.property_location}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Property Use</th>
                            <td className="cell">{msg.borrower_info.property_use}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Estimated Property Value</th>
                            <td className="cell">{msg.borrower_info.property_value}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Line of Credit Amount</th>
                            <td className="cell">{msg.borrower_info.line_of_credit}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Plans for the Funds</th>
                            <td className="cell">{msg.borrower_info.plans_for_the_funds}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Loan used for Business</th>
                            <td className="cell">{msg.borrower_info.loan_used_for_business}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Time at this Address</th>
                            <td className="cell">{msg.borrower_info.time_at_address}</td>
                          </tr>
                          <tr>
                            <th className="headcol" colSpan="2" style={{ textAlign: 'center' }}>
                              Income and Assets Information
                            </th>
                          </tr>
                          <tr>
                            <th className="headcol">Employment Status</th>
                            <td className="cell">{msg.borrower_info.employment_status}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Annual Income</th>
                            <td className="cell">{msg.borrower_info.anual_income}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Date of Birth</th>
                            <td className="cell">{msg.borrower_info.source_of_income}</td>
                          </tr>
                          <tr>
                            <th className="headcol">Additional Income</th>
                            <td className="cell">{msg.borrower_info.additional_income}</td>
                          </tr>
                          <tr>
                            <th className="headcol" colSpan="2" style={{ textAlign: 'center' }}>
                              Underwriting Steps State
                            </th>
                          </tr>

                          {'employment_verification' in msg['borrower_info'] && (
                            <tr>
                              <th className="headcol">
                                <b>Employment Verification</b>
                              </th>
                              {msg.borrower_info.employment_verification ? (
                                <td className="cell">Received</td>
                              ) : (
                                <td className="cell">Pending</td>
                              )}
                            </tr>
                          )}
                          {'title_run' in msg['borrower_info'] && (
                            <tr>
                              <th className="headcol">
                                <b>Title Run</b>
                              </th>
                              {msg.borrower_info.title_run ? (
                                <td className="cell">Received</td>
                              ) : (
                                <td className="cell">Pending</td>
                              )}
                            </tr>
                          )}
                          {'credit_score' in msg['borrower_info'] && (
                            <tr>
                              <th className="headcol">
                                <b>Credit Score</b>
                              </th>
                              <td className="cell">{msg.borrower_info.credit_score}</td>
                            </tr>
                          )}
                          {'appraisal_amount' in msg['borrower_info'] && (
                            <tr>
                              <th className="headcol">
                                <b>Appraisal Ammount</b>
                              </th>
                              {msg.borrower_info.appraisal_amount ? (
                                <td className="cell">Received</td>
                              ) : (
                                <td className="cell">Pending</td>
                              )}
                            </tr>
                          )}
                        </tbody>
                      ))}
                    {'body' in msg &&
                      ('employment_verification' in msg['body'] ? (
                        <tbody>
                          <tr>
                            <th className="headcol">
                              <b>Employment Verification</b>
                            </th>
                            {msg.body.employment_verification ? (
                              <td className="cell">Received</td>
                            ) : (
                              <td className="cell">Pending</td>
                            )}
                          </tr>
                        </tbody>
                      ) : 'title_run' in msg['body'] ? (
                        <tbody>
                          <tr>
                            <th className="headcol">
                              <b>Title Run</b>
                            </th>
                            {msg.body.title_run ? (
                              <td className="cell">Received</td>
                            ) : (
                              <td className="cell">Pending</td>
                            )}
                          </tr>
                        </tbody>
                      ) : 'appraisal_amount' in msg['body'] ? (
                        <tbody>
                          <tr>
                            <th className="headcol">
                              <b>Appraisal Ammount</b>
                            </th>
                            {msg.body.appraisal_amount ? (
                              <td className="cell">Received</td>
                            ) : (
                              <td className="cell">Pending</td>
                            )}
                          </tr>
                        </tbody>
                      ) : (
                        'credit_score' in msg['body'] && (
                          <tbody>
                            <tr>
                              <th className="headcol">
                                <b>Credit Score</b>
                              </th>
                              {msg.body.credit_score ? (
                                <td className="cell">Received</td>
                              ) : (
                                <td className="cell">Pending</td>
                              )}
                            </tr>
                          </tbody>
                        )
                      ))}
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </body>
    </div>
  )
}

export default DecisionAnalysis
