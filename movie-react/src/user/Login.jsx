import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useFormik } from "formik";
import * as Yup from 'yup';
import "./login.css"
import { Link , useNavigate} from "react-router-dom";

// import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';


const Login = () => {
    const navigate = useNavigate()

    const [requestedResponse, setRequestedResponse] = useState({
        textMessage: "",
        alertClass: "",
    });

    const initialValues = {
        username: '', 
        password: '',
    };

    const onSubmit = (values) => {
        axios.post('http://127.0.0.1:8000/api/signin/', values)
        .then((response) => {
            setRequestedResponse({
                textMessage : 'login succesfull , thank you',
                alertClass: 'alert alert success'
            })

            localStorage.setItem('Access' , response.data.Access)
            localStorage.setItem('Refresh' , JSON.stringify(response.data.Refresh))
            localStorage.setItem('username',response.data.username)
            // localStorage.setItem('username',response.data.id)  
            
            // localStorage.setItem('user',JSON.stringify(response.data.username))

           navigate('/home')

        }, (error) => {

            setRequestedResponse({
                textMessage : 'Invalid Credes.!!',
                alertClass: 'alert alert-danger',
            })

        }) 
        .catch(error => console.log(error))
    };

    const validationSchema = Yup.object({

      username: Yup.string().required("username is required"),
      password: Yup.string()
          .required('Password must be valid')
          .min(6, 'Password must be at least 6 Characters'),

    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
      });



    return (
    <div className="loginContainer">
      <div className="loginform">
        <div className="md-3 form-control-group"></div>
        <div className="md-3 form-control-group">
          <div className="wrapper formDiv" >
            <div className={requestedResponse.alertClass} role="alert">
              {requestedResponse.textMessage}
            </div>

            <h2 className='welcomeText'>Sign In</h2>

            <hr />
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group card">
                <span className='p-float-label'>
                <InputText
                  type="text"
                  name="username"
                  id="username"
                  // placeholder="Email"
                  className={
                    formik.touched.username && formik.errors.username
                      ? "form-control is-invalid p-invalid"
                      : "form-control"
                  }
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="username">Username</label>
                </span>
                {formik.errors.username && formik.touched.username ? (
                  <small className="text-danger">{formik.errors.username}</small>
                ) : null}
              </div>

              <div className="form-group card">
                <span className='p-float-lable'>
                <Password
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={
                    formik.touched.password && formik.errors.password
                      ? "form-control is-invalid p-invalid"
                      : "form-control"
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* <label htmlFor='password'>Password</label> */}
                </span>
                {formik.errors.password && formik.touched.password ? (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                ) : null}
                
              </div>

              <Button
                type="submit"
                label='Submit'
                value="Login"
                className="btn btn-primary btn-block"
                disabled={!formik.isValid}
              />
            </form>
            <br />
            <p className="text-center">
              Don't have an account? <a href="/signup">Sign up Here</a>
            </p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default Login;
