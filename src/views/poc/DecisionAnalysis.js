import './decision.css'
import { React, useState, useEffect } from 'react'
import { CProgressBar } from '@coreui/react'
import swal from 'sweetalert'
import { CProgress, CAlert, CButton, CAlertHeading } from '@coreui/react'
import { BsCheck2Circle, BsXCircleFill } from 'react-icons/bs'
import { Result } from 'antd'
import 'antd/dist/antd.variable.min.css'

const DecisionAnalysis = () => {
  //*UseState Hook to handle toogle funcinality
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
  const [isLoading, setIsLoading] = useState(false)

  // var borrower_info;
  var decision = ''
  var t = []
  //var header;

  const URL = 'https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io'

  //Check all the message we have
  useEffect(() => {
    //cleanup use effect
    let isCancelled = false
    //Get all the messages
    async function get_topics() {
      setIsLoading(true)
      const message = await fetch(
        `${URL}/api/v1/namespaces/default/messages?limit=100`,
        requestOptions,
      )
      const data = await message.json()
      var topics = []

      //store topics values
      for (let i = 0; i < data.length; i++) {
        topics.push(data[i].header.topics[0])
      }
      //create a new object with filtered topic because previous response returned repeated topics
      let result = topics.filter((item, index) => {
        return topics.indexOf(item) == index
      })
      //console.log(result)
      //query topics and only show those that have less than 10 messages
      const check = []
      const l = []

      for (let i = 0; i < result.length; i++) {
        const loan = await fetch(
          `${URL}/api/v1/namespaces/default/messages?topics=${result[i]}&limit=100`,
          requestOptions,
        )
        check.push(await loan.json())
      }
      for (let i = 0; i < check.length; i++) {
        if (check[i].length < 10) {
          l.push(check[i])
        }
      }

      for (let i = 0; i < l.length; i++) {
        for (let j = 0; j < l[i].length; j++) {
          if (!t.includes(`${l[i][j].header.topics[0]}`)) {
            t.push(l[i][j].header.topics[0])
          }
        }
      }

      if (!isCancelled) {
        setLoanList(t)
        setIsLoading(false)
      }
    }

    /*async function get_loanID{
          const 
      }*/

    get_topics()
    return () => {
      isCancelled = true
    }
  }, [])

  //*get the uuid typed by de user and saving it in UUID hook

  function handle_uuid(e) {
    setUuid(e.target.value)
  }
  let url = `https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/messages?topics=${uuid}&limit=25`
  let requestOptions = {
    method: 'GET',
    headers: {
      Authorization:
        'Basic dTBqbW1mam12NTphNGV3WjZuNVh1bHBSVElmMXNKX2FWa1pYQjZ3RGtLaFVhSVFUMEVNbVJF',
      'Content-Type': 'application/json',
    },
  }

  async function get_messages(e) {
    e.preventDefault()
    setIsLoading(true)
    //This is the base endpoint to get the total number of messages associated with a
    //uuid (which maps exactly to a uuid)

    for (let attempt = 0; attempt <= 5; attempt++) {
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
          break
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
        const forLoop = async (_) => {
          console.log(message)
          for (let i = message.length - 1; i >= 0; i--) {
            let r = await fetch(
              `https://u0p3relmmh-u0rmzykamc-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/messages/${message[i].header.id}/data`,
              requestOptions,
            )
            let a = await r.json()
            if ('body' in a[0].value) {
              if ('employment_verified' in a[0].value.body) {
                await setEmployment(a[0].value.body.employment_verified)
                console.log(employment)
              } else {
                if ('title_run_done' in a[0].value.body) {
                  await seTitle_run(a[0].value.body.title_run_done)
                  console.log(title_run)
                } else {
                  if ('appraisal_done' in a[0].value.body) {
                    await setAppraisal(a[0].value.body.appraisal_done)
                    console.log(appraisal)
                  } else {
                    if ('credit_check_ran' in a[0].value.body) {
                      await setCredit(a[0].value.body.credit_check_ran)
                      console.log(credit)
                    }
                  }
                }
              }
            }
          }
        }

        forLoop()
        setSelect(message)

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
          console.log(data[0].value)
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
            setFinalDecision(false)
            console.log('Loan successfully processed')
          } else {
            setReload(false)
            setSpinner(true)
            setTimeout(() => {
              setSpinner(false)
              setReload(true)
            }, 5000)
          }
        }
        break
      } catch (error) {
        console.log('Error', error)
      }
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
      console.log(data[0].value)

      if ('borrower_info' in data[0].value) {
        if ('full_data' in data[0].value.borrower_info) {
          setMsg(data[0].value.borrower_info.full_data)
        } else {
          setMsg(data[0].value.borrower_info)
        }
      }
      /*else {
                
            }*/
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
    var persisted_data = JSON.stringify({
      vendor: 'store_result_in_blockchain',
      decision: decision,
      uuid: uuid,
    })

    var Options = {
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
  }

  return (
    <div>
      {/*<NavBar />
      
      <Header title="Decision Analysis" />*/}
      <body>
        <div className="container">
          <form action="">
            <div className="loan-info">
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
                <button type="submit" onClick={get_messages} className="btn btn-primary btn-apply">
                  Apply
                </button>
              )}
            </div>
          </form>
          {isToggled && (
            <div>
              <div className="verification">
                <div className="credit-check">
                  <h6>Credit Check</h6>
                  {credit === true ? (
                    <BsCheck2Circle color="green" size={35} />
                  ) : (
                    <BsXCircleFill color="red" size={35} />
                  )}
                </div>
                <div className="appraisal">
                  <h6>Appraisal</h6>
                  {appraisal === true ? (
                    <BsCheck2Circle color="green" size={35} />
                  ) : (
                    <BsXCircleFill color="red" size={35} />
                  )}
                </div>
                <div className="title-run">
                  <h6>Title Run</h6>
                  {title_run === true ? (
                    <BsCheck2Circle color="green" size={35} />
                  ) : (
                    <BsXCircleFill color="red" size={35} />
                  )}
                </div>

                <div className="employment">
                  <h6>Employment Verification</h6>
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
            <div className="final-decision">
              <div className="alert alert-info" role="alert">
                Message IDs will keep changing the loan automatically progresses
              </div>
              <select type="select" className="form-select" name="" id="" onChange={handleSelect}>
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
                    {Object.entries(msg).map((value) => (
                      <tr key={value}>
                        <th key={value[0]} className="headcol">
                          {value[0]}
                        </th>
                        <td key={value[1]} className="cell">
                          {value[1]}
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>

              {finalDecision && (
                <button
                  id="final-decision"
                  onClick={persist_decision}
                  className="btn btn-primary btn-final"
                >
                  Make final decision
                </button>
              )}

              <CProgressBar now={progress} label={`${progress}%`} />

              <div>
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
                    <button onClick={get_messages} className="btn btn-primary">
                      Check again for this same loan ID
                    </button>
                  )}
                </div>

                <div>
                  {showYes && <Result status="success" title="Approved Loan" />}
                  {showNo && <Result status="error" title="Declined Loan" />}
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
