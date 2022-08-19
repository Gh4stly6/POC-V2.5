import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <a href="https://www.zventus.com/" target="_blank" rel="noopener noreferrer">
          Zventus
        </a>
        <span className="ms-1">&copy; 2022 Blockchain Lab - POC v2.5</span>
      </div>
      {/*<div className="ms-auto">
        <span className="me-1">Copyright 2022, Zventus</span>
        <a href="" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
  </a>
  </div>*/}
    </CFooter>
  )
}

export default React.memo(AppFooter)
