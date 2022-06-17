import React from 'react'

const Plaid = () => {
  var requestOptions = {
    method: 'GET',
    //headers: myHeaders,
    //mode: 'no-cors',
    // body: raw,
    redirect: 'follow',
  }
  async function plaid() {
    const response = await fetch(
      'https://z769vqtn1b.execute-api.us-east-2.amazonaws.com/dev/create_link_token',
      requestOptions,
    )
    var message = await response.json()
    console.log(message)
  }

  return (
    <div>
      <button onClick={plaid}>Connect to plaid</button>
    </div>
  )
}

export default Plaid
