import React from 'react';
import img from '../SignIn/IMG.png';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://brain-app-api.onrender.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    return (
      <div className="limiter   center">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img href='' alt='img' src={img} />
          </div>

          <form className="login100-form validate-form pa4 black-80">
            <span className="login100-form-title">
              Register
            </span>

            <div className="wrap-input100 validate-input" data-validate = "Valid name is required">
            <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  placeholder='Name'
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                placeholder='Email'
                name="email-address"
                id="email-address"
                onChange={this.onEmailChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input" data-validate = "Password is required">
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type={this.state.showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                value={this.state.signInPassword}
                onChange={this.onPasswordChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>
            
            <div className="">
            <input
             onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="SIGN UP"
              />
            </div>
            {/* <div className="text-center p-t-136">
              <p onClick={() => onRouteChange ('signin')} className="f6 link dim black db pointer">Create Account</p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default Register;