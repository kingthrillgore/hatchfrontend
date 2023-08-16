import './App.css'
import React from 'react'
import axios from 'axios'

const { useEffect, useState } = React

const ReservationsWrapper = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState([])
  const [changeState, setChangeState] = useState('')
  const [updateState, setUpdateState] = useState(false)

  /* useEffect(() => {
    console.log("data", data)
    axios.get('http://127.0.0.1/reserve')
    .then(function (res) {
      setIsLoaded(true)
      //setData(res)
    })
    .catch(function (err) {
      setError(err)
    })
    .then(function() {
      // always runs
    })
  }, [])

  useEffect(() => {
    console.log("data", data)
    setIsLoaded(false)

    axios.get('http://127.0.0.1/reserve')
    .then(function (res) {
      setIsLoaded(true)
      //setData(res)
    })
    .catch(function (err) {
      setError(err)
    })
    .then(function() {
      // Always runs
    })
  }, [changeState]) */

  //console.log("Data", data);

  /* data.forEach(
    (element) => console.log(element)
  ) */

  //const JoinedRecord = arr

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
      <div className="reservations-container col-span-6  sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
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
      </div>
    )
  }
}

const NewReservation = props => {
  const [name, setName] = useState('')
  const [size, setSize] = useState(0)

  const createNewReservation = () => {
    const obj = {
      name: name,
      size: parseInt(size)
    }

    axios.post('http://127.0.0.1/reserve', obj)
    .then(function (res) {
      axios.get('http://127.0.0.1./reserve')
      .then(function (res) {
        props.setData(res.data)
      })
    })
    .catch(function (err) {
      console.log(err)
    })
    .then(function() {
      setName('')
      setSize(0)
    })
  }

  return (
    <div className='create-container col-span-6 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6'>
      <div className='form-element'>
        <label for="name">Name</label>
        <input type='text' placeholder='Party Name' name="name" value={name} onChange={event => setName(event.target.value)} />
      </div>

      <div className='form-element'>
        <label for="size">Party Size</label>
        <input type='number' placeholder='0' name="size" value={size} onChange={event => setSize(event.target.value)} />
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

const Wrapper = () => {
  const [data, setData] = useState(null)

  /* const updateState = (values) => {
    setData(values)
  } */

  return (
    <div className="grid grid-cols-12 gap-1">
      <ReservationsWrapper data={data} />
      <NewReservation setData={setData} data={data} />
    </div>
  )
}

function App() {
  return (
    <div className="App container md-auto px-4">
      <Wrapper />
    </div>
  )
}

export default App;
