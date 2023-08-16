import logo from './logo.svg'
import './App.css'
import React from 'react'

const { useEffect, useState } = React
const axios = require('axios')

const createReservation = () => {
  const obj = {
    name: reservation_name,
    size: reservation_size
  }

  axios.post('http://127.0.0.1/reserve', obj)
  .then(function (res) {

  }).catch(function (err) {
    console.log("err",err)
  }).then(function () {
    // Always Runs
  })
}

const ReservationWrapper = () => {
  const [data, setData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState([])
  const [changeState, setChangeState] = useState('')
  const [updateState, setUpdateState] = useState(false)

  useEffect(() => {
    axios.get('http://127.0.0.1/reserve')
    .then(function (res) {
      setIsLoaded(true)
      setData(res)
    })
    .catch(function (err) {
      setError(err)
    })
    .then(function() {
      // always runs
    })
  }, [])

  useEffect(() => {
    setIsLoaded(false)

    axios.get('http://127.0.0.1/greeting/all')
    .then(function (res) {
      setIsLoaded(true)
      setData(res)
    })
    .catch(function (err) {
      setError(err)
    })
    .then(function() {
      // Always runs
    })
  }, [changeState])

  if (error.length > 0) {
    return (
      <div>
        <h2>Guru Meditation: {error.message}</h2>
      </div>
    )
  } else if (!isLoaded) {
    return (
      <div>
        <h2>Please Wait...</h2>
      </div>
    )
  } else {
    return (
      <div className="reservations-container">
        <h2>Reservations</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Reservation Seats</th>
                <th>Amount reserved</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        <div>
          <div className="new-reservation-container">

          </div>
        </div>
      </div>
    )
  }
}

const NewReservation = () => {

  const createNewReservation = () => {

    const obj = {}

    axios.post('http://127.0.0.1/reserve', obj)
    .then(function (res) {
      // TODO have it fire a GET to update ReservationWrapper
    })
    .catch(function (err) {
      console.log(err)
    })
    .then(function() {
      // Always runs
    })
  }

  return (
    <div className='create-container'>
      <div className='form-element'>
        <label for="name">Name</label>
        <input type='text' placeholder='Party Name' name="name" />
      </div>

      <div className='form-element'>
        <label for="size">Party Size</label>
        <input type='number' placeholder='0' name="size" />
      </div>

      <button onClick={() => createNewReservation()}>Save Reservation</button>
    </div>
  )

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
