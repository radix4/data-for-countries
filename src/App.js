import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountries = props => {
  let countriesByName = props.countries.filter(props.filterByName)

  if (countriesByName.length === 1) {
    let country = countriesByName[0]
    let flag = country.flag
    console.log(flag)

    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>

        <h4>Languages</h4>
        <ul>
          {country.languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img
          style={{ height: '100px' }}
          src={flag}
          alt='This is the flag of the country.'></img>
      </div>
    )
  }

  if (countriesByName.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else {
    console.log(countriesByName)
    return (
      <div>
        {countriesByName.map(country => (
          <div key={country.name}>{country.name}</div>
        ))}
      </div>
    )
  }
}

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
      <DisplayCountries countries={countries} filterByName={filterByName} />
    </div>
  )
}

export default App
