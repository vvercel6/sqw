"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function page() {
  const [Openin2time, setOpenin2time] = useState([]);

  const getwinnerin5minA = async () => {
    historyRef.current.scrollTop = historyRef.current.scrollHeight;
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }


    let reqOptions = {
      url: `https://gamingbackend-production-00d6.up.railway.app/api/registration/addwinner/${JSON.parse(localStorage.getItem("userData"))["profile"]["_id"]}`,
      method: "GEt",
      headers: headersList,
    }

    let response = await axios.request(reqOptions);

    setOpenin2time(response.data.ds);

  }
  useEffect(() => {
    getwinnerin5minA()
  }, [])

  return (
    <div><div id="wrapper" style={{ height: "100vh" }}>
      <div className="topbar">
        <div className="" role="navigation">
          <div className="container">
            <div className="col-md-6  col-md-offset-3 d-name  text-center">
              <img
                src="/honestn.png"
                alt="HONEST N ONLINE MARKETING"
                style={{ width: 500, marginTop: 10 }}
              />
            </div>
            <div className="col-md-3">
              <ul className="nav navbar-nav navbar-right">
                <li className="text-center m-r-5">
                  <h3
                    className="font-bold m-b-0"
                    style={{
                      background: "#fffd32",
                      borderRadius: 30,
                      padding: "0px 20px",
                      fontSize: 30
                    }}
                  >
                    ID:{Openin2time.email}
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper-page">
        <div className="row">
          <div className="col-md-6 ">
            <Link
              href="/login"
              className="btn pre-btn btn-default waves-effect waves-light m-t-5"
            >
              <img src="images/icon/dice.png" style={{ width: 40 }} />
              <br />
              Program
            </Link>
          </div>
          <div className="col-md-6 ">
            <Link
              href="/transection"
              className="btn pre-btn btn-success waves-effect waves-light m-t-5"
            >
              <img src="images/icon/transection.png" style={{ width: 40 }} />
              <br />
              Transection
            </Link>
          </div>
          <div className="col-md-6 ">
            <Link
              href="/purchsed"
              className="btn pre-btn btn-purple waves-effect waves-light m-t-5"
            >
              <img src="images/icon/purchase.png" style={{ width: 40 }} />
              <br />
              Purchased
            </Link>
          </div>
          <div className="col-md-6 ">
            <a
              href="pl.php"
              className="btn pre-btn btn-pink waves-effect waves-light m-t-5"
            >
              <img src="images/icon/account.png" style={{ width: 40 }} />
              <br />
              Account
            </a>
          </div>
          <div className="col-md-6 ">
            <a
              href="recharge.php"
              className="btn pre-btn btn-pink waves-effect waves-light m-t-5"
              style={{
                background: "darkgoldenrod !important",
                border: "1px solid darkgoldenrod !important"
              }}
            >
              <img src="images/icon/recharge.png" style={{ width: 40 }} />
              <br />
              Recharge
            </a>
          </div>
          <div className="col-md-6 ">
            <a
              href="reset-password.php"
              className="btn pre-btn btn-inverse waves-effect waves-light m-t-5"
            >
              <img src="images/icon/password.png" style={{ width: 40 }} />
              <br />
              Change Password
            </a>
          </div>
          <div className="col-md-12 ">
            <a
              href="logout.php"
              className="btn pre-btn btn-danger waves-effect waves-light m-t-5"
            >
              <img src="images/icon/logout.png" style={{ width: 40 }} />
              <br />
              Log Out
            </a>
          </div>
        </div>
      </div>
      {/* jQuery  */}
    </div>
    </div>
  )
}

export default page
