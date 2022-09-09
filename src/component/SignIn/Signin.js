import React from 'react';
// import {useState} from 'react';
import {Form} from "../../utility/Forms";

//   const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);
//   const [validate, setValidate] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
// }


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    }
  }


  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  validateLogin = (event) => {
    let isValid = true;
    let validator = Form.validator({
      email:{
        value:this.state.signInEmail,
        isRequired: true,
        isEmail: true,
      },
      password:{
        value:this.state.signInPassword,
        isRequired: true,
        minLength: 8
      }
    });
    if (validator !== null) {
      this.state.setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  authetication = (e) => {
    e.preventDefault();

    this.state.validate = this.state.validateLogin();

    if (this.state.validate) {
      this.state.setValidate({});
      this.state.signInEmail("");
      this.state.signInPassword("");
      alert("Successfully Login");
    }

  };

  togglePassword = (e) => {
    if (this.state.showPassword) {
      this.state.setShowPassword(false);
    } else {
      this.state.setShowPassword(true);
    }
  };




  onSubmitSignIn = () => {
    fetch('https://brainap-lop.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
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
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">LOGIN</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type={this.state.showPassword ? "text" : "password"}
                  className={`form-control ${
                        this.state.validate.validate && this.state.validate.validate.password
                          ? "is-invalid "
                          : ""
                      }`}
                  name="password"
                  id="password"
                  value={this.state.signInPassword}
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="LOGIN"
              />
            </div>
            <hr/>
            <div className="lh-copy mt3">No Account?
              <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">SIGN UP</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}
export default Signin;