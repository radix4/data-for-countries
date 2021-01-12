import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  // TODO: Use useEffect hook to fetch data
  // Restful PI: https://restcountries.eu/rest/v2/all
  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('Promise fulfilled!')
      setCountries(response.data)
    })
  }, [])

  const onChangeSearch = event => {
    setNewSearch(event.target.value)
    //console.log(event.target.value)
  }

  // toLowerCase() makes search query case insensitive
  function filterByName(country) {
    return country.name.toLowerCase().indexOf(newSearch) !== -1
  }

  return (
    <div>
      find countries
      <input value={newSearch} onChange={onChangeSearch}></input>
      <div>
        {countries.map(country => (
          <div key={country.name}>{country.name}</div>
        ))}
      </div>
    </div>
  )
}

export default App
