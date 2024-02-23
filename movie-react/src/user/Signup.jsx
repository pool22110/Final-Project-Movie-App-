import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./signup.css"

import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

// import "../node_modules/bootstrap/dist/css/bootstrap.css";


const Signup = () => {
  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    username:"",
  };
  let navigate = useNavigate();
  const onSubmit = (values) => {
    console.log(values);
    let userData = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
      username: values.username,
    };
    axios
      .post('http://127.0.0.1:8000/api/signup/', values)
      .then(
        (response) => {
          console.log(response);
          setRequestResponse({
            textMessage: response.data.message,
            alertClass: "alert alert-success",
          });


          navigate('/login')
        },
        (error) => {
          console.log(error);
          setRequestResponse({
            textMessage: error.response.data.message,
            alertClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => console.log(error));
  };
  

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("email must be a valid one"),
    username: Yup.string().required("username is required"),
    mobile: Yup.string().required("mobile is required"),
    password: Yup.string()
      .required("password is required")
      .min(6, "password must be atleast 6 char"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="signupcontainer">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="wrapper">
            <div className={requestResponse.alertClass} role="alert">
              {requestResponse.textMessage}
            </div>
            <h2>Signup</h2>
            <hr />
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <span className="p-float-label">
                <InputText 
                  type="text"
                  name="name"
                  id="name"
                  
                  className={
                    formik.touched.name && formik.errors.name
                      ? "form-control is-invalid p-invalid"
                      : "form-control"
                  }
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="name">name</label>
                </span>
                {formik.errors.name && formik.touched.name ? (
                  <small className="text-danger">
                    {formik.errors.name}
                  </small>
                ) : null}
              </div>

              <div className="form-group">
                <span className="p-float-label">
                <InputText 
                  type="text"
                  name="username"
                  id="username"
                  
                  className={
                    formik.touched.username && formik.errors.username
                      ? "form-control is-invalid p-invalid"
                      : "form-control"
                  }
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="name">username</label>
                </span>
                {formik.errors.username && formik.touched.username ? (
                  <small className="text-danger">
                    {formik.errors.username}
                  </small>
                ) : null}
              </div>


              <div className="form-group">
                <span className="p-float-label">
                
                <InputText
                  type="text"
                  name="email"
                  id="email"
                  className={
                    formik.touched.email && formik.errors.email
                      ? "form-control is-invalid p-invalid"
                      : "form-control"
                  }
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="email">Email</label>
                </span>
                {formik.errors.email && formik.touched.email ? (
                  <small className="text-danger">{formik.errors.email}</small>
                ) : null}
              </div>


              <div className="form-group">
                <span className="p-float-label">
                {/* <label htmlFor="mobile">Mobile</label> */}
                <InputText
                  type="text"
                  name="mobile"
                  id="mobile"
                  className={
                    formik.touched.mobile && formik.errors.mobile
                      ? "form-control is-invalid p-invalid"
                      : "form-control"
                  }
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="number-input">Mobile</label>
                </span>
                {formik.errors.mobile && formik.touched.mobile ? (
                  <small className="text-danger">{formik.errors.mobile}</small>
                ) : null}
              </div>


              <div className="form-group">
                {/* <label htmlFor="password">Password</label> */}
                <span className="p-float-label">
                <InputText
                  type="password"
                  name="password"
                  id="password"
                  className={
                    formik.touched.password && formik.errors.password
                      ? "form-control is-invalid p-invalid"
                      : "form-control"
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="password">Password</label>
                </span>
                {formik.errors.password && formik.touched.password ? (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                ) : null}
              </div>

              <Button
                type="submit"
                label="Submit"
                // value="Register"
                className="btn btn-primary btn-block"
                disabled={!formik.isValid}
              />
            </form>
            <br />
            <p className="text-center">
              Already Register.?<a href="/login"> Click Here</a>
            </p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Signup;
