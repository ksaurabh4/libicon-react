import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import history from '../history'


class Login extends Component {
    renderInput = (formProps) => {
        //this formProps attached with reduxForm
        // console.log(formProps);
        // const example = this.props.example ? (
        //   <span className="example">{`ex. ${this.props.example}`}</span>
        // ) : (
        //   ''
        // );
        return (
          <React.Fragment>
            <input
              id={formProps.name}
              type={formProps.type}
              className={formProps.className}
              placeholder={formProps.placeholder}
              {...formProps.input}
            />
            {/* <label htmlFor={formProps.name}>{formProps.placeholder}</label> */}
            {/* {example} */}
            {this.renderErrorMessage(formProps.meta)}
          </React.Fragment>
        );
        //attached all the input properties with redux form field
      };

    onFormSubmit = async (formValues) => {
        await this.props.signIn(formValues);
        
      };

      renderErrorMessage = (meta) => {
        if (meta.touched) {
          return <div className="help-block">{meta.error}</div>;
        } else {
          return null;
        }
      };


    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
      <div className="hold-transition login-page">
  <div className="login-box">
    <div className="login-logo">
      <a href="../../index2.html"><b>LIBICON</b></a>
    </div>
    {/* /.login-logo */}
    <div className="card">
      <div className="card-body login-card-body">
        <p className="login-box-msg">Sign in to start your session</p>
        <form action="../../index3.html" method="post" onSubmit={handleSubmit(this.onFormSubmit)}>
          <div className="input-group mb-3">
            <Field name="empCode" type="text" className="form-control" placeholder="Employee ID" component={this.renderInput} />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <Field name="pswd" type="password" className="form-control" placeholder="Password" component={this.renderInput}/>
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="icheck-primary">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">
                  Remember Me
                </label>
              </div>
            </div>
            {/* /.col */}
            <div className="col-4">
              <button type="submit" className="btn btn-primary btn-block" disabled={pristine||submitting}>Sign In</button>
            </div>
            {/* /.col */}
          </div>
        </form>
        
        {/* /.social-auth-links */}
      </div>
      {/* /.login-card-body */}
    </div>
  </div>
</div>
        )
    }
}


const validate = (formValues) => {
    const errors = {};
    // var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (!formValues.empCode) {
      errors.empCode = 'You must enter your Employee Code';
    } else if (formValues.empCode.length < 5) {
      errors.empCode = 'Employee Id must be atleast 7 long';
    }
    if (!formValues.pswd) {
      errors.pswd = 'You must enter the password';
    } else if (formValues.pswd.length < 6) {
      errors.pswd = 'Password must be atleast 6 long';
    }
    return errors;
  };

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
    };

    export default connect(mapStateToProps, { signIn })(
  reduxForm({
    form: 'loginForm',
    
  })(Login)
);