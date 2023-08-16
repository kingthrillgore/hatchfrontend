import './App.css'
import React from 'react'

const { useEffect, useState } = React
const axios = require('axios')

/* const createReservation = ({stateChanger, ...props}) => {

  const [name, setName] = useState('')
  const [size, setSize] = useState(0)

  const createNewReservation = () => {
    const obj = {
      name: reservation_name,
      size: reservation_size
    }
  
    axios.post('http://127.0.0.1/reserve', obj)
    .then(function (res) {
      // TODO we need to re-fire the render
    }).catch(function (err) {
      console.log("err",err)
    }).then(function () {
      // Always Runs
    })
  }
} */

const ReservationsWrapper = () => {
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

const NewReservation = ({stateChanger, ...props}) => {
  const [name, setName] = useState('')
  const [size, setSize] = useState(0)

  const createNewReservation = () => {
    const obj = {
      name: name,
      size: size
    }
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

      <button onClick={() => createNewReservation()}>Save</button>
    </div>
  )
}

const ReservationList = () => {
  return (
    <tr>
      <td>Parties of NUM</td>
      <td>999</td>
    </tr>
  )
}

function App() {
  return (
    <div className="App">
      <ReservationsWrapper />
    </div>
  );
}

export default App;
