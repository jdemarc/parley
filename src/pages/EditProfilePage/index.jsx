import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const EditProfilePage = (props) => {

    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="card" style={{width: '30rem'}}>
          <h1 className="card-header text-center" id="title">Manage Profile</h1>
          <div className="card-body text-center">

            <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>

            
            <form
            onSubmit>
              <input className="form-control mb-4"
                type="email"
                placeholder="E-mail"
                value=''
                name="email"
                onChange
              />

              <input className="form-control mb-4"
                type="password"
                placeholder="Password"
                value=''
                name="password"
                onChange=''
              />

              <button className="btn btn-info btn-block mb-4">Update</button>
              <Link to='/dashboard'>Return</Link>
            </form>
          </div>
        </div>
      </div>
    );
}

export default EditProfilePage