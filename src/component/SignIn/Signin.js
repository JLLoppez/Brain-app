import React from 'react';
// import Form from '../../utilities/forms';



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

  // handleValidation() {
  //   let fields = this.state.fields;
  //   let errors = {};
  //   let formIsValid = true;

  //   //Email
  //   if (!fields["email"]) {
  //     formIsValid = false;
  //     errors["email"] = "Cannot be empty";
  //   }

  //   if (typeof fields["email"] !== "undefined") {
  //     let lastAtPos = fields["email"].lastIndexOf("@");
  //     let lastDotPos = fields["email"].lastIndexOf(".");

  //     if (
  //       !(
  //         lastAtPos < lastDotPos &&
  //         lastAtPos > 0 &&
  //         fields["email"].indexOf("@@") === -1 &&
  //         lastDotPos > 2 &&
  //         fields["email"].length - lastDotPos > 2
  //       )
  //     ) {
  //       formIsValid = false;
  //       errors["email"] = "Email is not valid";
  //     }
  //   }

  //   //Password
  //   if (!fields["password"]) {
  //     formIsValid = false;
  //     errors["password"] = "Cannot be empty";
  //   }

  //   if (typeof fields["password"] !== "undefined") {
  //     if (!fields["password"]
  //       .match(/^[a-zA-Z]+$/)
  //       ) {
  //       formIsValid = false;
  //       errors["password"] = "Only letters";
  //     }
  //   }

  //   this.setState({ errors: errors });
  //   return formIsValid;
  // }

  // contactSubmit(e) {
  //   e.preventDefault();

  //   if (this.handleValidation()) {
  //     alert("Form submitted");
  //   } else {
  //       alert("Form has errors.");
  //     }
  // }

  // handleChange(field, e) {
  //   let fields = this.state.fields;
  //   fields[field] = e.target.value;
  //   this.setState({ fields });
  // }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
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
                  type="password"
                  name="password"
                  id="password"
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