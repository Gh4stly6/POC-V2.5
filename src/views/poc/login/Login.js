import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { CNavLink, CWidgetStatsF, CButton } from '@coreui/react'
import './login.css'

//The image was extracted from https://storyset.com/illustration/house-searching/amico.
const Login = () => {
  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4">Welcome!</h3>
                    <p className="text-muted mb-4">Please enter your data here to login</p>
                    <form>
                      <div className="mb-3">
                        <input
                          id="inputEmail"
                          type="Email"
                          placeholder="Email"
                          required
                          autoFocus=""
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          id="inputPassword"
                          type="password"
                          placeholder="Password"
                          required=""
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        />
                      </div>
                      <div className="form-check">
                        <input id="customCheck1" type="checkbox" className="form-check-input" />
                        <label htmlFor="customCheck1" className="form-check-label">
                          Remember password
                        </label>
                      </div>
                      <div className="d-grid gap-2 mt-2">
                        <NavLink to="/general/dashboard" className="letter" component={NavLink}>
                          <CButton
                            type="submit"
                            color="primary"
                            className="btn btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                            variant="ghost"
                          >
                            Sign in
                          </CButton>
                        </NavLink>
                      </div>

                      <div className="text-center d-flex justify-content-between mt-4">
                        <p>
                          <a href="#" className="font-italic text-muted">
                            <u>Forgot your password?</u>
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
