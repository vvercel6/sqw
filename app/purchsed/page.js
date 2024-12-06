"use client";
import React, { useState, useEffect } from 'react';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedBats, setSelectedBats] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  
  const [visibleRange, setVisibleRange] = useState([1, 5]); // For displaying 5 pages at a time
  
  useEffect(() => {
    // Fetch data from the API
    fetch(`https://gamingbackend-production-00d6.up.railway.app/api/totalBetAmounts/transection/${JSON.parse(localStorage.getItem("userData"))["profile"]["_id"]}`)
      .then(response => response.json())
      .then(data =>  {
   const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');})
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const roundToNearestFive = (date) => {
    let minutes = date.getMinutes();
    let remainder = minutes % 5;
    if (remainder < 3) {
      minutes = minutes - remainder;
    } else {
      minutes = minutes + (5 - remainder);
    }

    if (minutes === 60) {
      date.setHours(date.getHours() + 1);
      minutes = 0;
    }

    date.setMinutes(minutes);
    date.setSeconds(0, 0);

    return date;
  };

  const adjustTime = (date) => {
    date = roundToNearestFive(date);

    let minutes = date.getMinutes();

    if (minutes >= 55) {
      date.setMinutes(0);
      date.setHours(date.getHours() + 1);
    }

    return date;
  };

  const adjustAndAddFiveMinutes = (date) => {
    date = roundToNearestFive(date);

    let minutes = date.getMinutes();

    if (minutes >= 55) {
      date.setMinutes(0);
      date.setHours(date.getHours() + 1);
    } else {
      date.setMinutes(minutes + 5);
    }

    return date;
  };

  const handleViewClick = (bats) => {
    setSelectedBats(bats);
    setShowModal(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Update visible range of page numbers
    if (pageNumber > visibleRange[1]) {
      setVisibleRange([visibleRange[0] + 5, Math.min(visibleRange[1] + 5, totalPages)]);
    } else if (pageNumber < visibleRange[0]) {
      setVisibleRange([Math.max(visibleRange[0] - 5, 1), visibleRange[1] - 5]);
    }
  };

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleNextRange = () => {
    if (visibleRange[1] < totalPages) {
      setVisibleRange([visibleRange[0] + 5, Math.min(visibleRange[1] + 5, totalPages)]);
    }
  };

  const handlePrevRange = () => {
    if (visibleRange[0] > 1) {
      setVisibleRange([Math.max(visibleRange[0] - 5, 1), visibleRange[1] - 5]);
    }
  };

  return (
    <>
      <div style={{
        display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: 20
      }}>
        <button onClick={handleSort} style={{ color: "#000" }}>
          Sort by Created At ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
        <button style={{ color: "#000" }}>
          <a href='/deshbord'>EXIT</a>
        </button>
      </div>

      <table className="table card" style={{ width: "90%", margin: "auto", background: "#fff" }}>
        <thead>
          <tr role="row">
            <th>#</th>
            <th>Barcode Number</th>
            <th>Note</th>
            <th>Receipt Date & Time</th>
            <th>Draw Date & Draw Time</th>
            <th>Receipt Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item._id}</td>
              <td>{item.Note}</td>
              <td>{adjustTime(new Date(item.createdAt)).toLocaleString()}</td>
              <td>{adjustAndAddFiveMinutes(new Date(item.createdAt)).toLocaleString()}</td>
              <td>{item.type !== "dec" ? <button className='btn btn-md btn-primary' style={{ fontSize: 14 }}>+{item.amount}</button> : <button className='btn btn-md btn-danger' style={{ fontSize: 12 }}>-{item.amount}</button>}</td>
              <td>{ item.type !== "dec" ? <button className='btn btn-md btn-primary' style={{ fontSize: 14 }}>{item.balance + item.amount}</button> : <button className='btn btn-md btn-danger' style={{ fontSize: 12 }}>{item.balance - item.amount}</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <ul className="pagination-list">
          <li>
            <button className="page-link" onClick={handlePrevRange} disabled={visibleRange[0] === 1}>
              Prev
            </button>
          </li>

          {Array.from({ length: visibleRange[1] - visibleRange[0] + 1 }, (_, index) => visibleRange[0] + index).map(pageNumber => (
            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          ))}

          <li>
            <button className="page-link" onClick={handleNextRange} disabled={visibleRange[1] === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <h1 style={{ color: "#fff", padding: "14px" }} className='text-center'><b>Purchsed Table</b></h1>
      <TableComponent />
    </>
  );
}

export default App;
