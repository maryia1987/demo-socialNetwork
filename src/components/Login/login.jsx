import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validator';
import { Input } from '../common/FormsControls/formsControls';
import s from './login.module.css';
import {login} from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';

const LoginForm = ({handleSubmit, error}) => {
    return (        
            <form onSubmit={handleSubmit} className={s.commonForm}>
                <div className={s.loginForm}>
                   <Field placeholder={'Email'} name={'email'} component={Input} validate={[required]} className={s.loginPH}/>
                </div>
                <div className={s.loginForm}>
                   <Field placeholder={'Password'} name={'password'} component={Input} validate={[required]} type={'password'} className={s.loginPH}/>
                </div>
                <div className={s.loginCB}>
                   <Field type={'checkbox'} name={'rememberMe'} component={Input} className={s.loginCBF}/><span className={s.loginCBTxt}>Remember me</span>
                </div>
                { error && <div className={s.formSummaryError}>
                  {error}
                </div> }
                <div className={s.loginForm}>
                   <button className={s.loginBtn}>Login</button>
                </div>
            </form>       
    );
}

const LoginReduxForm = reduxForm ({
  form: 'login'
}) (LoginForm)

const Login = (props) => {

  const onSubmit = (formData) => {
       props.login(formData.email, formData.password, formData.rememberMe);
  }

  if (props.isAuth) {
     return <Navigate replace to='/profile'/>
  }

  return (
      <div className={s.login}>
          <h1>Login</h1>
          <LoginReduxForm onSubmit={onSubmit} />
      </div>
  );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default  connect(mapStateToProps, {login}) (Login);