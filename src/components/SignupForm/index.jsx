import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import './SignupForm.css'
class SignupForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  handleChange = (e) => {
    this.props.updateMessage('');

    //Using computed property name syntax
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userService.signup(this.state);

      // Try to login.
      this.props.handleSignupOrLogin();

      // Successful sign-in 'redirects' to dashboard.
      this.props.history.push('/dashboard');
    } catch (error) {
      this.props.updateMessage(error.message);
    }
  }
  
  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConfirm);
  }

  render() {
    return (
      <div className="wrapper">
        <form className="text-center border border-light p-5"
        onSubmit={this.handleSubmit}>
          <p className="h4 mb-4"> Sign up</p>
          <input className="form-control mb-4"
            type="text"
            placeholder="Name"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />

          <input className="form-control mb-4"
            type="email"
            placeholder="E-mail"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />

          <input className="form-control mb-4"
            type="password"
            placeholder="Password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />

          <input className="form-control mb-4"
            type="password"
            placeholder="Confirm Password"
            value={this.state.passwordConfirm}
            name="passwordConfirm"
            onChange={this.handleChange}
          />

          <button className="btn btn-info btn-block mb-4" disabled={this.isFormInvalid()}>Sign Up</button>
          <Link to='/'>Cancel</Link>
        </form>
      </div>
    );
  }
}

export default SignupForm