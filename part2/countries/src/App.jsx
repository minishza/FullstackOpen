import {useEffect, useState} from 'react'
import axios from "axios";
import {Country} from "./Country.jsx";

function App() {
    const[countries, setCountries] = useState([])
    const[query, setQuery] = useState("")
    const[shown, setShown] = useState(false)

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(r => {
                setCountries(r.data);
                console.log(countries);
            })
    }, [])

    function handleSearch(e) {
        setQuery(e.target.value)
        console.log("Country searched with: ", e.target.value)
    }

    function displayCountries() {
        const filtered = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
        console.log(filtered)

        if (filtered.length > 10) {
            return "Too many matches, specify another filter"
        }else if(filtered.length !== 1) {
            return filtered.map((country) => {
                return <div>
                    <p>{country.name.common}</p> <button onClick={() => setShown(true)}>show</button>
                </div>
            })
        } else {
            return filtered.map((country) => <Country country={country} key={country.area} />)
        }
    }


    return (
      <>
          find countries <input value={query} onChange={e => handleSearch(e)}/>
          <div>{displayCountries()}</div>
      </>
    )
}

export default App
