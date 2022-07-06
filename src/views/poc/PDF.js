import React from 'react'
//import { pdf } from './DecisionAnalysis'
import { Document, Page } from 'react-pdf'

const PDF = () => {
  //console.log(pdf.lenght)
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      {/* <object data={pdf} type="application/pdf" width="100%" height="100%"></object> */}
      {/* <Document file={}>
        <Page height="600" />
      </Document> */}
    </div>
  )
}

export default PDF
