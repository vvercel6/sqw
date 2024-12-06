"use client"; // Add this line at the top to make it a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import

function Login() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Collect form data
    const email = e.target.txtusername.value;
    const password = e.target.txtpassword.value;

    try {
      // Prepare the API call
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
      };

      let bodyContent = JSON.stringify({
        email: email,
        password: password
      });

      let response = await fetch("https://gamingbackend-production-00d6.up.railway.app/api/registration/login", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });

      let data = await response.json();

      if (response.ok) {
        // Store response data in localStorage
        localStorage.setItem('userData', JSON.stringify(data));

        // Redirect to the login page
        router.push('/deshbord'); // Replace '/login' with the actual path if needed
      } else {
        // Handle errors
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="images/favicon.png" type="image/png" />
        <title>Login :: HONEST N ONLINE MARKETING</title>
        <meta name="robots" content="noindex" />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .audio-recorder {\n      background-color: #ebebeb;\n      box-shadow: 0 2px 5px #bebebe;\n      border-radius: 20px;\n      box-sizing: border-box;\n      color: #000;\n      width: 40px;\n      display: flex;\n      align-items: center;\n      transition: all 0.2s ease-in;\n      -webkit-tap-highlight-color: transparent;\n    }\n\n    .audio-recorder-mic {\n      box-sizing: content-box;\n      cursor: pointer;\n      height: 16px;\n      color: #000;\n      padding: 12px;\n    }\n\n    .audio-recorder .audio-recorder-mic {\n      border-radius: 20px;\n    }\n\n    .audio-recorder.recording .audio-recorder-mic {\n      border-radius: 0;\n    }\n\n    .audio-recorder-timer,\n    .audio-recorder-status {\n      color: #000;\n      margin-left: 10px;\n      font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;\n      font-size: 14px;\n      font-weight: 400;\n      line-height: 1;\n    }\n\n    .audio-recorder-status {\n      margin-left: 15px;\n      display: flex;\n      align-items: baseline;\n      flex-grow: 1;\n      animation-name: fading-ar-status;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    .audio-recorder-status-dot {\n      background-color: #d00;\n      border-radius: 50%;\n      height: 10px;\n      width: 9px;\n      margin-right: 5px;\n    }\n\n    .audio-recorder-options {\n      box-sizing: content-box;\n      height: 16px;\n      cursor: pointer;\n      padding: 12px 6px 12px 12px;\n    }\n\n    .audio-recorder-options~.audio-recorder-options {\n      padding: 12px 12px 12px 6px;\n      border-radius: 0 5px 5px 0;\n    }\n\n    .recording {\n      border-radius: 12px;\n      width: 300px;\n      transition: all 0.2s ease-out;\n    }\n\n    .display-none {\n      display: none;\n    }\n\n    .audio-recorder-visualizer {\n      margin-left: 15px;\n      flex-grow: 1;\n      align-self: center;\n      display: flex;\n      align-items: center;\n    }\n\n    @keyframes fading-ar-status {\n      0% {\n        opacity: 1;\n      }\n\n      50% {\n        opacity: 0;\n      }\n\n      to {\n        opacity: 1;\n      }\n    }\n  "
          }}
        />
        <form method="post" onSubmit={handleSubmit} encType="multipart/form-data" style={{ height: "100vh", display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
          <div className="topbar">
            <div
              className="navbar navbar-default"
              role="navigation"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="container">
                <div className="col-md-12 d-name text-center">
                  <img
                    src="https://aaa-client.in/images/honestn.png"
                    alt="HONEST N ONLINE MARKETING"
                    style={{ width: "40%", padding: "20px 0" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-page" style={{ margin: "25px auto" }}>
            <div className="card-box">
              <div className="panel-heading">
                <h3 className="text-center font-bold">Login to your Account</h3>
              </div>
              <div className="panel-body">
                <div className="form-horizontal">
                  {error && <p className="text-danger text-center">{error}</p>}
                  <div className="form-group">
                    <div className="col-xs-12">
                      <div className="col-md-12 input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user" />
                        </span>
                        <input
                          type="text"
                          id="txtusername"
                          name="txtusername"
                          className="form-control"
                          placeholder="Username"
                          required=""
                          autoFocus=""
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-12">
                      <div className="col-md-12 input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-key" />
                        </span>
                        <input
                          type="password"
                          id="txtpassword"
                          name="txtpassword"
                          className="form-control"
                          placeholder="Password"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group text-center m-t-40">
                    <div className="col-xs-12">
                      <button
                        type="submit"
                        id="btnsubmit"
                        name="btnsubmit"
                        className="btn btn-warning btn-block text-uppercase waves-effect waves-light"
                      >
                        <i className="glyphicon glyphicon-log-in" />
                        &nbsp;&nbsp;Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 text-center">
                <p className="txtwhite">
                  Copyright ©<span id="copyright">2024</span>
                  <b>HONEST N ONLINE MARKETING</b>
                </p>
              </div>
            </div>
          </div>
        </form>
      </>
    </div>
  );
}

export default Login;
