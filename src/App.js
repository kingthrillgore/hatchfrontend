import './App.css'
import React from 'react'
import axios from 'axios'

const { useEffect, useState } = React

const ReservationsWrapper = ({ data }) => {
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
            {
              data.map(record => (
                <Reservation
                  names={record.name}
                  size={record.size}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
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

const Reservation = ({names, size}) => {
  return (
    <tr>
      <td>
        <div>{size}</div>
      </td>
      <td>
        <div>{names}</div>
      </td>
    </tr>
  )
}

const Wrapper = () => {
  const [data, setData] = useState([])

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
