"use client";
import React, { useState, useEffect } from 'react';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch data from the API
    fetch(`https://gamingbackend-production-b51f.up.railway.app/api/totalBetAmounts/transection/${JSON.parse(localStorage.getItem("userData"))["profile"]["_id"]}`)
      .then(response => response.json())
      .then(data => {
        // Sort by 'createdAt' ascending order on load
        const sortedData = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setData(sortedData);
      })
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

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

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
            <th>Receipt Date &amp; Time</th>
            <th>Draw Date &amp; Draw Time</th>
            <th>Receipt Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item._id}</td>
              <td>{adjustTime(new Date(item?.createdAt))?.toLocaleString()}</td>
              <td>{adjustAndAddFiveMinutes(new Date(item?.createdAt)).toLocaleString()}</td>
              <td>{item?.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination" style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: '5px' }}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
            style={{ marginRight: '5px' }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <h1 style={{ color: "#fff", padding: "14px" }} className='text-center'><b>Transaction Table</b></h1>
      <TableComponent />
    </>
  );
}

export default App;
