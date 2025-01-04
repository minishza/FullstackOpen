import {useState} from "react";

export const Country = ({country}) => {
    const [show, setShow] = useState(false)
    const [languages, setLanguages] = useState([])
    const capital = country.capital[0]
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {capital}</p>
            <p>Area {country.area}</p>
            <h5>Languages: </h5>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language.length + 1}>{language}</li>
                ))}
            </ul>
            <img height={"100px"}  src={country.flags.svg} alt={country.name.common} />
        </div>
    )
}