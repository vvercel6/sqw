"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper-bundle.min.css'; // Import Swiper styles
import '../../node_modules/swiper/swiper.min.css'; // Import Swiper core styles
import axios from "axios";
import { EffectFade } from 'swiper/modules';
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { useZxing } from "react-zxing";
import Barcode from "react-barcode";
export default function Home() {
  const printRef = useRef();
  const printRef1 = useRef();
  const router = useRouter(); const inputRef = useRef(null);
  const [result, setResult] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTime1, setCurrentTime1] = useState(new Date());
  const [arrayData, setArrayData] = useState([]);
  const [winnerin5minRecord, setWinnerin5minRecord] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [ticketNum, setTicketNum] = useState(null);
  const handleCancel = (ticketNumber) => {
    setTicketNum(ticketNumber);
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };
  const [nextRoundedTime, setNextRoundedTime] = useState(null);
  const [Openin2time, setOpenin2time] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 0, seconds: 0 });
  const historyRef = useRef(null);
  const [inputs, setInputs] = useState({
    txt1: null,
    txt2: null,
    txt3: null,
    txt4: null,
    txt5: null,
    txt6: null,
    txt7: null,
    txt8: null,
    txt9: null,
    txt10: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winerslip, setWinerslip] = useState({});
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [slip, setSlip] = useState(null);
  const [error, setError] = useState('');
  const [newValue, setNewValue] = useState(null); // State for the new input value
  // Handle input change
  const handleInputChange = (e) => {
    setNewValue(e.target.value);
  };
  function roundToNearestHundred(value) {
    return Math.round(value / 100) * 100;
  }
  useEffect(() => {
    gridRef.current[0][0].current.focus()
  }, []);
  // Create a 2D array representing the grid of inputs
  const gridRef = useRef([
    [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],
    [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)],
  ]);
  useEffect(() => {
    setInputs({
      txt1: newValue,
      txt2: newValue,
      txt3: newValue,
      txt4: newValue,
      txt5: newValue,
      txt6: newValue,
      txt7: newValue,
      txt8: newValue,
      txt9: newValue,
      txt10: newValue,
    });
    setTimeout(() => {
      const arrayData = convertToArray({
        txt1: newValue,
        txt2: newValue,
        txt3: newValue,
        txt4: newValue,
        txt5: newValue,
        txt6: newValue,
        txt7: newValue,
        txt8: newValue,
        txt9: newValue,
        txt10: newValue,
      });
      console.log("arrayData", arrayData);
      getwinnerin5minA()
      setArrayData(arrayData);
    })
  }, [newValue]); // Adjust the dependencies as needed
  const inputRef2 = useRef(null);

  useEffect(() => {
    if (isModalOpen2 && inputRef2.current) {
      inputRef2.current.focus();
    }
  }, [isModalOpen2]);
  const handleUpdateValues = () => {
    setInputs({
      txt1: newValue,
      txt2: newValue,
      txt3: newValue,
      txt4: newValue,
      txt5: newValue,
      txt6: newValue,
      txt7: newValue,
      txt8: newValue,
      txt9: newValue,
      txt10: newValue,
    });
    setIsModalOpen2(!isModalOpen2)
    setTimeout(() => {
      const arrayData = convertToArray({
        txt1: newValue,
        txt2: newValue,
        txt3: newValue,
        txt4: newValue,
        txt5: newValue,
        txt6: newValue,
        txt7: newValue,
        txt8: newValue,
        txt9: newValue,
        txt10: newValue,
      });
      console.log("arrayData", arrayData);
      setArrayData(arrayData);
      gridRef.current[0][0].current.focus();
    }, 100);
  };
  const formatTime = (date) => {
    return moment(new Date(date)).format('hh:mm');
  };
  const goToSlide = (index) => {
    swiperRef.current?.swiper.slideTo(index);
  };
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML; // Get the content you want to print
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.width = '0px';
    printFrame.style.height = '0px';
    printFrame.style.border = 'none';

    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow.document;
    doc.open();
    doc.write(`
        <html>
        <head>
            <title>Print Preview</title>
            <style>
                /* Add any stylesheets or inline styles here */
                body { font-family: Arial, sans-serif; margin: 20px; }
            </style>
        </head>
        <body>
            ${printContents}
        </body>
        </html>
    `);
    doc.close();

    // Allow some time for the content to render before printing
    printFrame.contentWindow.focus();
    setTimeout(() => {
      printFrame.contentWindow.print();
      // Remove the iframe after printing
      document.body.removeChild(printFrame);
    }, 500);
    getwinnerin5minA()
    const updatedInputs = { ...inputs }; // Create a copy of the current inputs state
    gridRef.current.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell.current) {
          const key = `txt${rowIndex * row.length + cellIndex + 1}`;
          updatedInputs[key] = null; // Set the corresponding state value to null
          cell.current.value = null; // Set the input value to null
        }
      });
    });
    setInputs(updatedInputs); // Update the state once after the loop
  };
  const handlePrint2 = () => {
    const printContents = printRef1.current.innerHTML; // Get the content you want to print
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.width = '0px';
    printFrame.style.height = '0px';
    printFrame.style.border = 'none';

    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow.document;
    doc.open();
    doc.write(`
        <html>
        <head>
            <title>Print Preview</title>
            <style>
                /* Add any stylesheets or inline styles here */
                body { font-family: Arial, sans-serif; margin: 20px; }
            </style>
        </head>
        <body>
            ${printContents}
        </body>
        </html>
    `);
    doc.close();

    // Allow some time for the content to render before printing
    printFrame.contentWindow.focus();
    setTimeout(() => {
      printFrame.contentWindow.print();
      // Remove the iframe after printing
      document.body.removeChild(printFrame);
    }, 500);
    getwinnerin5minA()
    const updatedInputs = { ...inputs }; // Create a copy of the current inputs state
    gridRef.current.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell.current) {
          const key = `txt${rowIndex * row.length + cellIndex + 1}`;
          updatedInputs[key] = null; // Set the corresponding state value to null
          cell.current.value = null; // Set the input value to null
        }
      });
    });
    setInputs(updatedInputs); // Update the state once after the loop
  };
  const btnclickh4 = async () => {
    await axios.post('https://gamingbackend-production-00d6.up.railway.app/api/totalBetAmounts/lastidremove', { userID: JSON.parse(localStorage.getItem("userData"))["profile"]["_id"] }).then((res) => {

      handleCancel(res.data.data.num)
    }).catch((err) => {
      handleCancel(0)
    });
  }
  useEffect(() => {
    let data = '';
    let debounceTimer;

    const handleKeyPress = async (e) => {
let isFullscreenRequested = false;

      switch (e.key) {
        case 'F2':
          setIsModalOpen2(!isModalOpen2);
          break;
        case 'E':
        case 'e':
          router.push('/deshbord');
          break;
        case 'F4':
          setIsModalOpen1(!isModalOpen1);
          break;
        case 'F8':
          inputRef.current.focus();
          break;

        case 'Enter':
          if (isModalOpen2) {
            handleUpdateValues();
          } else {
            codewiner(data.replace(/\D/g, ''))
            setTimeout(() => {
              gridRef.current[0][0].current.focus();
              data = '';
            }, 300);
          }
          break;

        case 'F6':
          e.preventDefault();

    if (!isFullscreenRequested) {
      isFullscreenRequested = true;

      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari & Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }

      handleSubmit();

      // Reset the flag after a short delay to allow for the fullscreen request to complete
      setTimeout(() => {
        isFullscreenRequested = false;
      }, 1000); // Adjust the timeout duration as needed
    }
          break;
        default:
          data += e.key;
          getwinnerin5minA()
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearTimeout(debounceTimer); // Clear debounce timer on cleanup
    };
  }, [isModalOpen2, inputs]);  // Add dependencies like `inputs` or `isModalOpen2` as needed
  ;
  const codewiner = async (data) => {
    try {
      if (data.length > 5) {
        const response = await axios.get(`https://gamingbackend-production-00d6.up.railway.app/api/registration/betdata/${data}`);
        if (response?.data?.winningamount > 0) {
          let dat123 = []; // Initialize an array to hold the filtered data
          console.log(response.data.data);

          response.data.data.forEach((item) => {
            let dat1 = response.data.TotalBet.filter(item1 => Number(item1.value) > 0 && item1.key === item.key);
            if (dat1.length > 0) {
              dat123.push(...dat1); // Add the filtered items to the dat array
            }
          });

          setWinerslip({
            data: response.data.data,
            winningamount: response.data.winningamount,
            TotalBet: dat123, // Use the dat array here
          });

          setTimeout(() => {
            handlePrint2();
          }, 1000);
          const updatedInputs = { ...inputs }; // Create a copy of the current inputs state
          gridRef.current.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
              if (cell.current) {
                const key = `txt${rowIndex * row.length + cellIndex + 1}`;
                updatedInputs[key] = null; // Set the corresponding state value to null
                cell.current.value = null; // Set the input value to null
              }
            });
          });
          setInputs(updatedInputs); // Update the state once after the loop


        }
      }
    } catch (error) {
      console.log(error);
      const updatedInputs = { ...inputs }; // Create a copy of the current inputs state
      gridRef.current.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (cell.current) {
            const key = `txt${rowIndex * row.length + cellIndex + 1}`;
            updatedInputs[key] = null; // Set the corresponding state value to null
            cell.current.value = null; // Set the input value to null
          }
        });
      });
      setInputs(updatedInputs); // Update the state once after the loop
      alert(`Scanning receipt is incorrect. Please refresh and try again.. and Please check your ID (${data}) number.`);
    }
  }
  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      getwinnerin5minA();
      const nextTime = getNextRoundedTime(now);
      if (timeRemaining.minutes === 4) {
        if (timeRemaining.seconds > 50) {
          
          gridRef.current[0][0].current.focus()
          historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
      }
      setNextRoundedTime(nextTime);
      setTimeRemaining(getTimeRemaining(now, nextTime));
    }, 1000);
    return () => {
      clearInterval(timerId)
    };
  }, [currentTime]);
  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      setCurrentTime1(now);
      const nextTime = getNextRoundedTime(now);
      setNextRoundedTime(nextTime);
      setTimeRemaining(getTimeRemaining(now, nextTime));
    }, 3000);
    let d = currentSlide + 1
    setCurrentSlide(d < 10 ? d : 0);
    goToSlide(currentSlide)
    return () => {
      clearInterval(timerId)
    };
  }, [currentTime1]);
  useEffect(
    () => {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    },
    [winnerin5minRecord],
  )

  const getNextRoundedTime = (date) => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.ceil((minutes + 1) / 5) * 5;
    const nextTime = new Date(date);
    nextTime.setMinutes(roundedMinutes);
    nextTime.setSeconds(0);
    nextTime.setMilliseconds(0);
    return nextTime;
  };

  const getTimeRemaining = (current, next) => {
    const diff = next - current;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { minutes, seconds };
  };
  const getwinnerin5minA = async () => {

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

    historyRef.current.scrollTop = historyRef.current.scrollHeight;
    setWinnerin5minRecord(response.data.data);
    setOpenin2time(response.data.ds);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    if (e.key === 'F2') {
      setIsModalOpen2(!isModalOpen2);
    }
    console.log("e.key1", e.key);
    console.log("e.key1", e.key);
    if (e.key === 'Enter') {
      console.log("e.key1", value.replace(/\D/g, ''));
      codewiner(value.replace(/\D/g, ''))
    }
  };
  const swiperRef = useRef(null);
  const handleSubmit = async (e) => {
    setError('');
    try {
      console.log("arrayData", arrayData);
      const allAmountsZero = arrayData.every(item => item.value === 0);
      if (allAmountsZero) {
        // Show error message if all amounts are 0
        alert("Error: All amounts are zero. Action cannot be performed.");
      } else {
        if (allAmountsZero.length == 0) {
          alert("Error: All amounts are zero. Action cannot be performed.");
        }
        else {
          let data = await axios.post('https://gamingbackend-production-00d6.up.railway.app/api/totalBetAmounts', { bets: arrayData, userID: JSON.parse(localStorage.getItem("userData"))["profile"]["_id"] });

          setSlip(data['data'])
          const updatedInputs = { ...inputs }; // Create a copy of the current inputs state
          gridRef.current.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
              if (cell.current) {
                const key = `txt${rowIndex * row.length + cellIndex + 1}`;
                updatedInputs[key] = null; // Set the corresponding state value to null
                cell.current.value = null; // Set the input value to null
              }
            });
          });
          setInputs(updatedInputs); // Update the state once after the loop
          setArrayData([])
          getwinnerin5minA()
          setTimeout(() => {
            gridRef.current[0][0].current.focus();
            handlePrint()
          }, 800)
        }
      }
    } catch (error) {
      setError('Failed to submit bet amounts');
    }
  };
  const convertToArray = (inputs) => {
    const result = Object.entries(inputs).map(([key, value]) => ({
      key: key.replace('txt', ''), // Remove 'txt' prefix
      value: Number(value),
    }));
    return result;
  };

  const handleShowArray = (e) => {
    handleChange(e)
    const arrayData = convertToArray(inputs);
    setArrayData(arrayData); // For debugging
  };
  const name = winerslip?.data?.key == 1 ? "Shree" :
    winerslip?.data?.key == 2 ? "Vasikarn" :
      winerslip?.data?.key == 3 ? "Sudarshan" :
        winerslip?.data?.key == 4 ? "Vastu" :
          winerslip?.data?.key == 5 ? "Planet" :
            winerslip?.data?.key == 6 ? "Love" :
              winerslip?.data?.key == 7 ? "Tara" :
                winerslip?.data?.key == 8 ? "Grah" :
                  winerslip?.data?.key == 9 ? "Matsya" :
                    "Meditation";

  const handleKeyDown = (event, row, col) => {

    switch (event.key) {
      case 'ArrowRight':
        if (col <= 4) {  // Allow movement within the row, except for 5 -> 6
          if (!(col === 4)) {  // Block movement from 5 to 6
            gridRef.current[row][col + 1].current.focus();
            setTimeout(() => {
              gridRef.current[row][col + 1].current.setSelectionRange(1000, 10000);
            }, 0);
          }
        }
        break;

      case 'ArrowLeft':
        if (col >= 0) {  // Allow movement within the row, except for 6 -> 5
          gridRef.current[row][col - 1].current.focus();
          setTimeout(() => {
            gridRef.current[row][col - 1].current.setSelectionRange(1000, 10000);
          }, 0);
        }
        break;

      case 'ArrowDown':
        if (row === 0) {
          // Allow movement from the first row to the second row
          gridRef.current[1][col].current.focus();
          setTimeout(() => {
            gridRef.current[1][col].current.setSelectionRange(1000, 10000);
          }, 0);
        }
        break;

      case 'ArrowUp':
        if (row === 1) {
          // Allow movement from the second row to the first row
          gridRef.current[0][col].current.focus();
          setTimeout(() => {
            gridRef.current[0][col].current.setSelectionRange(1000, 10000);
          }, 0);
        }
        break;
    }


  };
  return (
    <div
      className=""
      style={{
        display: "flex", justifyContent: 'center', flexDirection: "column", height: "100vh", overflow: 'hidden'
      }}
    >
      <div className="heder" style={{ height: "10vh" }}>
        <div className="">
          <div
            className=""
            style={{ padding: "14px" }}
            role="navigation"
          >
            <div className="container" style={{ padding: 0 }}>
              <div className="col-md-8 d-name" style={{ padding: 0 }}>
                <h3 className="heding" style={{
                  color: "#15ff15",
                  fontSize: 28,
                  fontWeight: 900, margin: 0
                }}><b>HONEST.9 ONLINE MARKETING</b></h3>
                <span className="headerTime" style={{}}>
                  <div className="col-md-12 p-l-0">
                    <div className="col-md-5 p-l-0">
                      <div className="col-md-6 p-l-0">
                        <h3 className="text-white font-bold m-t-0 sub-heding">
                          <b>    {nextRoundedTime && nextRoundedTime.toLocaleTimeString()}</b>
                        </h3>
                      </div>
                      <div className="col-md-6 text-right">
                        <h3 className="text-white font-bold  m-t-0 sub-heding">
                          <b>
                            {timeRemaining && `${timeRemaining.minutes.toString().padStart(2, '0')} : ${timeRemaining.seconds.toString().padStart(2, '0')}`}
                          </b>
                        </h3>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <h3 className="text-white font-bold m-t-0 sub-heding ">
                        <b>   {formattedDate} {currentTime.toLocaleTimeString()}</b>
                      </h3>

                    </div>
                  </div>
                </span>
              </div>
              <div className="col-md-4" style={{ padding: 0 }}>
                <ul className="nav navbar-nav navbar-right">
                  <li className="text-center mx-2 p-2" style={{
                    margin: "6px"
                  }}>
                    <div
                      className="font-bold m-b-0"
                      style={{
                        background: '#15ff15',
                        borderRadius: '4px',
                        fontSize: '16px',
                        padding: '8px 16px',
                        color: "#000",
                        textAlign: "center"
                      }}
                    >
                      ID  :
                      <span className="balance " style={{ marginLeft: "6px" }}>
                        {Openin2time.email}
                      </span>
                    </div>
                  </li>
                  <li className="text-center " style={{
                    margin: "6px"
                  }}>
                    <div
                      className="font-bold m-b-0"
                      style={{
                        background: '#15ff15',
                        borderRadius: '4px',
                        fontSize: '16px',
                        padding: '8px 16px',
                        color: "#000",
                        textAlign: "center"
                      }}
                    >
                      BALANCE  : ₹
                      <span className="balance " style={{ marginLeft: "6px" }}>
                        {Openin2time.balance}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main" style={{ height: "82vh" }}>
        <div className="content m-t-0 p-t-0">
          <div className="container">
            {isAlertOpen && (
              <div className="custom-alert">
                <div className="alert-message" style={{
                  color: "#000"
                }} >
                  {ticketNum != 0 ? `Ticket No. ${ticketNum} Is Canceled.` : "You Have Not Any Ticket To Cenncel."}</div>
                <button onClick={closeAlert} className="btn btn-danger">OK</button>
              </div>
            )}
            <div >
              <div className="row" style={{
                listStyle: 'none', display: "flex"
              }} >
                <div className="col-md-3" >
                  <div
                    className="swiper-container text-center swiper-container-cube swiper-container-3d swiper-container-initialized swiper-container-horizontal"
                  >

                    <Swiper
                      ref={swiperRef}
                      spaceBetween={1}
                      centeredSlides={true}
                      className="mySwiper"
                      effect={'cards'}
                      grabCursor={true}
                      modules={[EffectFade]}
                    >
                      <SwiperSlide>
                        <img
                          alt="Shree"
                          className="img-fluid"
                          src="yantra/Shree.jpeg"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          alt="Vasikarn"
                          src="yantra/Vasikarn.jpeg"
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          alt="Sudarshan"
                          src="yantra/Sudarshan.jpeg"
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          className="img-fluid"
                          alt="Vastu"
                          src="yantra/Vastu.jpeg"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          className="img-fluid"
                          alt="Planet"
                          src="yantra/Planet.jpeg"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          className="img-fluid"
                          alt="Love"
                          src="yantra/Love.jpeg"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          alt="Tara"
                          src="yantra/Tara.jpeg"
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          alt="Grah"
                          className="img-fluid"
                          src="yantra/Grah.jpeg"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          alt="Matsya"
                          src="yantra/Matsya.jpeg"
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          alt="Meditation"
                          src="yantra/Meditation.jpeg"
                          className="img-fluid"
                        />
                      </SwiperSlide>
                    </Swiper>
                    <h3 className="text-light" style={{ color: "#fff", margin: 2, textAlign: 'left' }}><b>F2 : Jackpot</b></h3>
                    <h3 className="text-light" style={{ color: "#fff", margin: 2, textAlign: 'left' }}><b>F8 : scan Ticket</b></h3>
                  </div>
                </div>
                <div className="col-md-9">
                  <ul className="row p-l-0 m-b-4" style={{
                    height: `calc(26vh)`, listStyle: 'none', display: "flex",
                    marginBottom: "10px",
                  }}>
                    {gridRef.current.slice(0, 1).map((row, rowIndex) =>
                      row.slice(0, 5).map((inputRefw, colIndex) => {

                        const name1 = colIndex + 1 == 1 ? "Shree" :
                          colIndex + 1 == 2 ? "Vasikarn" :
                            colIndex + 1 == 3 ? "Sudarshan" :
                              colIndex + 1 == 4 ? "Vastu" :
                                colIndex + 1 == 5 ? "Planet" :
                                  colIndex + 1 == 6 ? "Love" :
                                    colIndex + 1 == 7 ? "Tara" :
                                      colIndex + 1 == 8 ? "Grah" :
                                        colIndex + 1 == 9 ? "Matsya" :
                                          "Meditation";

                        return (
                          <li key={`${rowIndex}-${colIndex}`} className="align-items-center"
                            style={{
                              display: 'flex',
                              justifyContent: 'start',
                              flexDirection: "column",
                              alignItems: "center",
                              width: "20%",
                            }}>
                            <img
                              alt="Shree"
                              className="m-b-5"
                              src={`yantra/${name1}.jpeg`}
                              style={{ height: "24vh", width: "90%", objectFit: "fill" }}
                            />
                            <div style={{ height: "1vh" }}>
                              <input
                                autoFocus
                                className="form-control yantratext"
                                id={`txt${colIndex + 1}`}
                                style={{ marginTop: "2px" }}
                                maxLength="50"
                                name={`txt${colIndex + 1}`}
                                ref={inputRefw}
                                value={inputs[`txt${colIndex + 1}`]}
                                type="text"
                                onChange={handleChange}
                                onKeyDown={(event) => handleKeyDown(event, rowIndex, colIndex)}
                                onKeyUp={handleShowArray}

                                autoComplete="off"
                              />
                            </div>
                          </li>
                        )
                      })
                    )}
                  </ul>
                  <ul className="row p-l-0 m-b-4" style={{
                    height: `calc(26vh)`, listStyle: 'none', display: "flex",
                    marginTop: "17px",
                  }}>
                    {gridRef.current.slice(1, 2).map((row, rowIndex) =>
                      row.slice(0, 5).map((inputRefw, colIndex) => {
                        const name1 = colIndex + 6 == 1 ? "Shree" :
                          colIndex + 6 == 2 ? "Vasikarn" :
                            colIndex + 6 == 3 ? "Sudarshan" :
                              colIndex + 6 == 4 ? "Vastu" :
                                colIndex + 6 == 5 ? "Planet" :
                                  colIndex + 6 == 6 ? "Love" :
                                    colIndex + 6 == 7 ? "Tara" :
                                      colIndex + 6 == 8 ? "Grah" :
                                        colIndex + 6 == 9 ? "Matsya" :
                                          "Meditation";

                        return (
                          <li key={`${rowIndex}-${colIndex}`} className="align-items-center"
                            style={{
                              display: 'flex',
                              justifyContent: 'start',
                              flexDirection: "column",
                              alignItems: "center",
                              width: "20%",
                            }}>
                            <img
                              alt="Shree"
                              className="m-b-5"
                              src={`yantra/${name1}.jpeg`}
                              style={{ height: "24vh", width: "90%", objectFit: "fill" }}
                            />
                            <div style={{ height: "0.5vh" }}>
                              <input
                                className="form-control yantratext"
                                id={`txt${colIndex + 6}`}
                                style={{ marginTop: "2px" }}
                                maxLength="50"
                                name={`txt${colIndex + 6}`}
                                ref={inputRefw}
                                value={inputs[`txt${colIndex + 6}`]}
                                type="text"
                                onChange={handleChange}
                                onKeyDown={(event) => handleKeyDown(event, 1, colIndex)}
                                onKeyUp={handleShowArray}
                                autoComplete="off"
                              />
                            </div>
                          </li>
                        )
                      })
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="row"
              id="history"
              ref={historyRef}
              style={{
                background: '#fff',
                marginTop: "10px",
                height: '28vh',
                overflowY: 'scroll',
              }}
            >

              {winnerin5minRecord && winnerin5minRecord?.map((el, i) => {
                return (<>
                  <div
                    className="col-lg-2 p-0" style={{ border: "1px solid #000" }}
                  >
                    <div className="b-1 p-4" style={{
                      display: "flex", alignItems: 'center'
                    }}>

                      <div className="col-lg-6 col-xs-6 text-center p-t-10 p-b-10">
                        <h5
                          className="m-l-0 m-r-0 m-t-0 font-bold"
                          style={{
                            color: 'red',
                            textTransform: 'uppercase',
                            fontSize: el?.name1?.length > 2 ? '10px' : 'inherit',
                          }}
                        >
                          {
                            el.name && (
                              el.name1 && el.name?.split(".")[0] === el.name1?.split(".")[0]
                                ? el.name?.split(".")[0]
                                : el.name1
                                  ? `${el.name?.split(".")[0]} & ${el.name1?.split(".")[0]}`
                                  : el.name?.split(".")[0]
                            )
                          }
                        </h5>
                        <h5 className="m-l-0 m-r-0 m-t-0 font-bold" style={{

                          fontSize: el?.name1?.length > 2 ? '10px' : 'inherit'
                        }}>
                          {new Date(el?.createdAt).toDateString()}
                        </h5>
                        <h5 className="m-0 font-bold" style={{

                          fontSize: el?.name1?.length > 2 ? '10px' : 'inherit'
                        }}>
                          {formatTime(el?.createdAt)}
                        </h5>
                      </div>

                      <div className="col-lg-6 col-xs-6 p-0">
                        {
                          el.name &&
                            el.name?.split(".")[0] === el.name1?.split(".")[0] ? <img
                            alt={el.name?.split(".")[0]} // Use the name without the file extension as the alt text
                            className="thumb-img"
                            src={"yantra/jp.png"}
                          /> : <img
                            alt={el.name?.split(".")[0]} // Use the name without the file extension as the alt text
                            className="thumb-img"
                            src={!el?.dobalD ? `yantra/${el.name}` : "yantra/2d.png"}
                          />
                        }
                      </div>
                    </div>
                  </div>
                </>)
              })}
            </div>
            <div style={{ display: "none" }}>
              <div id="customers" ref={printRef} style={{ width: "350px", margin: "auto" }}>
                <h4 className="text-center" style={{ textAlign: 'center', margin: 2 }}><b>HONEST.9 ONLINE MARKETING</b></h4>
                <h6 className="text-center" style={{ textAlign: 'center', margin: 0 }}>RECEIPT No: <b>{slip?.num}</b> ID: 04567</h6>
                <h6 className="text-center" style={{ textAlign: 'center', margin: 2 }}>
                  PURCHASE DATE: <b >{new Date(slip?.createdAt)?.toLocaleDateString()}</b> {new Date(slip?.createdAt)?.toLocaleTimeString()}
                </h6>
                <h6 className="text-center" style={{ textAlign: 'center', margin: 2 }}>
                  DRAW DATE: <b >{new Date(slip?.createdAt)?.toLocaleDateString()}</b>
                  {new Date(new Date(slip?.createdAt).setMinutes(new Date(slip?.createdAt).getMinutes() + 5))?.toLocaleTimeString()}
                </h6>
                <table className="w-100" style={{ width: "100%", marginTop: 4, borderTop: "1px solid #000", borderBottom: "1px solid #000" }}>
                  <thead>
                    <tr>
                      <th style={{ borderRight: "1px solid #000", textAlign: "center" }}>Name</th>
                      <th style={{ borderRight: "1px solid #000", textAlign: "center" }}>Value</th>
                      <th style={{ borderRight: "1px solid #000", textAlign: "center" }}>*</th>
                      <th style={{ borderRight: "1px solid #000", textAlign: "center" }}>Multiplier</th>
                      <th style={{ borderRight: "1px solid #000", textAlign: "center" }}>=</th>
                      <th style={{ borderRight: "1px solid #000", textAlign: "center" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slip?.Bat?.map((el) => {

                      const name = el?.key == 1 ? "Shree" :
                        el?.key == 2 ? "Vasikarn" :
                          el?.key == 3 ? "Sudarshan" :
                            el?.key == 4 ? "Vastu" :
                              el?.key == 5 ? "Planet" :
                                el?.key == 6 ? "Love" :
                                  el?.key == 7 ? "Tara" :
                                    el?.key == 8 ? "Grah" :
                                      el?.key == 9 ? "Matsya" :
                                        "Meditation";

                      if (el?.value > 0) {
                        return (
                          <tr key={el?.key}>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center' }}>{name}</td>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center' }}>{el?.value}</td>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center' }}>*</td>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center' }}>11</td>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center' }}>=</td>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center' }}>{Number(el?.value) * 11}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}

                    <tr>
                      <td
                        style={{
                          borderTop: "1px solid #000",
                          textAlign: "center",
                          padding: "8px",
                          fontWeight: "bold",
                        }}
                        colSpan="3"
                      >
                        Total
                      </td>
                      <td
                        style={{
                          borderTop: "1px solid #000",
                          textAlign: "center",
                          padding: "8px",
                          fontWeight: "bold",
                        }}
                        colSpan="2"
                      >
                        {slip?.Bat?.reduce((acc, el) => acc + (el?.value > 0 ? el?.value * 11 : 0), 0) / 11}
                      </td>
                      <td
                        style={{
                          borderTop: "1px solid #000",
                          textAlign: "center",
                          padding: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        {slip?.Bat?.reduce((acc, el) => acc + (el?.value > 0 ? el?.value * 11 : 0), 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-3" style={{
                  width: "100%",
                  display: "flex", justifyContent: "center", alignItems: 'center'
                }}>
                  {slip && slip._id && (
                    <Barcode value={slip?.num} /> // Generate barcode using slip._id
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: "none" }} >
              <div id="customersq1" ref={printRef1} style={{ width: "300px", margin: "auto" }} >
                <h3 className="text-center" style={{ textAlign: 'center' }}><b>HONEST.9 ONLINE MARKETING</b></h3>

                <h4 className="text-center" style={{ textAlign: 'center' }}>
                  RECEIPT No: <b>{Array.isArray(winerslip?.data) ? winerslip?.data[0]?._id : winerslip?.data?._id}</b> <br /> ID: 04567
                </h4>

                <table className="w-100" style={{ width: "100%", marginBottom: 10, borderTop: "1px solid #000", borderBottom: "1px solid #000" }}>
                  {
                    Array.isArray(winerslip?.data) ? (
                      winerslip.TotalBet.map((el, index) => {
                        const name1 = el.key == 1 ? "Shree" :
                          el.key == 2 ? "Vasikarn" :
                            el.key == 3 ? "Sudarshan" :
                              el.key == 4 ? "Vastu" :
                                el.key == 5 ? "Planet" :
                                  el.key == 6 ? "Love" :
                                    el.key == 7 ? "Tara" :
                                      el.key == 8 ? "Grah" :
                                        el.key == 9 ? "Matsya" :
                                          "Meditation";
                        return (
                          <tr key={index}>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>{name1}</td>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>{Number(winerslip?.winningamount / 11)}</td>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>*</td>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>11</td>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>=</td>
                            <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>{Number(winerslip?.winningamount / 11) * 11}</td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>{name}</td>
                        <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>{Number(winerslip?.winningamount / 11)}</td>
                        <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>*</td>
                        <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>11</td>
                        <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>=</td>
                        <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>{Number(winerslip?.winningamount / 11) * 11}</td>
                      </tr>
                    )
                  }
                  <tr>
                    <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>Total</td>
                    <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>{Number(winerslip?.winningamount)}</td>
                    <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>*</td>
                    <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>9</td>
                    <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>=</td>
                    <td style={{ borderRight: "1px solid #000", textAlign: 'center', padding: 8 }}>{roundToNearestHundred(Number(winerslip?.winningamount) * 9)}</td>
                  </tr>
                </table>
              </div>
            </div>
            {isModalOpen1 &&
              (
                <>
                  <div className="modal-overlay">
                    <div className="modal-content1">
                      <h3 className="text-center p-b-3"><b>want  to cancel Last  Receipt</b></h3>
                      <div className="d-flex" style={{ justifyContent: "center" }}>
                        <button onClick={() => {
                          btnclickh4()
                          setIsModalOpen1(!isModalOpen1)
                        }} style={{ width: "50%", margin: 'auto' }} className="btn btn-primary m-2">
                          ok
                        </button>
                        <button onClick={() => {
                          setIsModalOpen1(!isModalOpen1)
                        }} style={{ width: "50%", margin: 'auto' }} className="btn btn-danger m-2">
                          close
                        </button>
                      </div>
                    </div>
                  </div>
                </>

              )}
            {isModalOpen2 &&
              (
                <>
                  <div className="modal-overlay">
                    <div className="modal-content1">
                      <div
                        id=""
                        style={{
                          padding: "50px 0px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          gap: 21
                        }}
                      >
                        <h3 className="text-center" style={{ textAlign: 'center' }}><b>HONEST.9 ONLINE MARKETING</b></h3>
                        <div className="d-flex" style={{ justifyContent: "center", border: "1px solid #000" }}>
                          <input
                            type="number"
                            value={newValue}
                            onChange={handleInputChange}
                            onKeyDown={handleShowArray}
                            placeholder="Enter value"
                            style={{ width: "100%", margin: "auto" }}
                            className="form-control m-2"
                            ref={inputRef2}
                          />
                        </div>

                        {/* Button to update the values */}
                        <div className="d-flex" style={{ justifyContent: "center", display: 'flex', alignItems: 'center', width: "100%", margin: "0px 20px" }}>
                          <button onClick={() => {
                            handleUpdateValues()
                          }} className="btn btn-success m-2">
                            Update Values
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>

              )}
          </div>
        </div>
      </div>
      <div className="footer" style={{ height: "8vh", display: 'flex', justifyContent: 'space-around', alignItems: 'end', width: "100%", padding: "0px 14px" }}>
        <div className="row m-t-10" style={{ width: "100%", marginBottom: "6px" }}>
          <div className=" p-0" style={{ display: "flex", justifyContent: "space-between", alignContent: 'center' }}>
            <div style={{
              width: "14%",
              width: "14%",
              display: "flex", justifyContent: 'center', alignItems: "center",
              fontSize: "14px"
            }}
              className="btn btn-lg btn-default waves-effect waves-light col p-0"
              id="cancelticket"
              onClick={() => {
                setIsModalOpen1(!isModalOpen1)
              }}
            >
              <a className="text-white" style={{
                width: "14%",
                display: "flex", justifyContent: 'center', alignItems: "center",
                fontSize: "14px"
              }}>
                <b>
                  Cancel [F4]
                </b>
              </a>
            </div>
            <div style={{
              width: "14%",
              display: "flex", justifyContent: 'center', alignItems: "center",
              fontSize: "14px"
            }}
              className="btn btn-lg btn-inverse waves-effect waves-light col  p-0"
              id="clear"
            >
              <a href="/login" className="text-white" style={{
                width: "14%",
                display: "flex", justifyContent: 'center', alignItems: "center",
                fontSize: "14px"
              }}>
                <b>
                  Clear [F5]
                </b>
              </a>
            </div>
            <a style={{
              width: "14%",
              display: "flex", justifyContent: 'center', alignItems: "center",
              fontSize: "14px"
            }} className="btn btn-lg btn-danger waves-effect waves-light col exit_btn p-0" href="/">
              <b>
                Exit [E]
              </b>
            </a>
            <div style={{
              width: "14%",
              fontSize: "14px",
              padding: "6px",
              display: "flex", justifyContent: 'center', alignItems: "center",
            }}
              className="btn btn-lg btn-success waves-effect waves-light col saveData p-0"
              id="btnprint"
              onClick={() => {
                setTimeout(() => {
                  handleSubmit()

                }, 50);
              }}
            >
              <a className="text-white" style={{
                display: "flex", justifyContent: 'center', alignItems: "center",
                fontSize: "14px"
              }}>
                <b>
                  Print [F6]
                </b>
              </a>
            </div>
            <div style={{
              width: "14%",
              display: "flex", justifyContent: 'center', alignItems: "center",
              fontSize: "14px"
            }}
              className="btn btn-lg btn-purple waves-effect waves-light col p-0"
              id="re_print"
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
            >
              <a
                className="text-white"
                id="re_print" style={{
                  display: "flex", justifyContent: 'center', alignItems: "center",
                  padding: "6px",
                  fontSize: "14px"
                }}
              >
                <b>
                  Re-Print [F3]
                </b>
              </a>
            </div>
            <div className="btn btn-lg btn-white waves-effect waves-light col p-0" style={{
              width: "14%",
              display: "flex", justifyContent: 'center', alignItems: "center",
              fontSize: "14px"
            }}>
              <h4 className="m-0" style={{
                padding: "6px",
                fontSize: "14px"
              }}>
                <span className="sum sum1">
                  {Number(inputs.txt1) + Number(inputs.txt2) + Number(inputs.txt3) + Number(inputs.txt4) + Number(inputs.txt5) + Number(inputs.txt6) + Number(inputs.txt7) + Number(inputs.txt8) + Number(inputs.txt9) + Number(inputs.txt10)}
                </span>
                {' '}|
                <span className="totalcoupon totalcoupon1">
                  {Number(inputs.txt1 * 11) + Number(inputs.txt2 * 11) + Number(inputs.txt3 * 11) + Number(inputs.txt4 * 11) + Number(inputs.txt5 * 11) + Number(inputs.txt6 * 11) + Number(inputs.txt7 * 11) + Number(inputs.txt8 * 11) + Number(inputs.txt9 * 11) + Number(inputs.txt10 * 11)} </span>
              </h4>
            </div>
            <div className="btn btn-lg btn-white waves-effect waves-light p-0 " style={{
              width: "14%",
              padding: "6px",
              fontSize: "14px"
            }}>
              <input
                type="text"
                className="form-control"
                maxLength={13}
                ref={inputRef}
                style={{
                  border: "2px solid #000 !important",
                  height: "100% !important",
                  borderRadius: 20
                }}
                // onChange={async (el) => {
                //   const val = el.target.value;
                //   try {
                //     codewiner(val)
                //   } catch (error) {
                //     console.error("Error fetching data:", error);
                //   }
                // }}
                onPaste={async (el) => {
                  const val = el.target.value;
                  try {
                    console.log("=====>>>", val);
                  } catch (error) {
                    console.error("Error fetching data:", error);
                  }
                }}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
