import React, {useState, useEffect} from 'react';

function Register(){

    const token = process.env.REACT_APP_COUNTRY_TOKEN

    useEffect(()=>{
        getCountries()
    },[])

    let [countries, setCountries] = useState([])
    let [states, setStates] = useState([])
    let [cities, setCities] = useState([])
    
    const getCountries = async ()=>{
        const  apiCountries = await fetch('https://www.universal-tutorial.com/api/countries', 
        {headers:{
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }})

        const countries = await apiCountries.json();
        
        setCountries(countries)
    }

    async function getStates () {
        const selection = document.getElementById('country')
        
        const apiStates = await fetch(`https://www.universal-tutorial.com/api/states/${selection.value}`, 
        {headers:{
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }})

        const states = await apiStates.json()
        setStates(states)
        
    }

    async function getCities () {
        const selection = document.getElementById('state')
        
        
        const apiCities = await fetch(`https://www.universal-tutorial.com/api/cities/${selection.value}`, 
        {headers:{
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }})

        const cities = await apiCities.json()
        setCities(cities);
        
    }

    return (
        <div>
            <h1>Registration</h1>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" name="first_name" id=""/>
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" name="last_name" id=""/>
            <label htmlFor="email">E-Mail:</label>
            <input type="email" name="email" id=""/>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id=""/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id=""/>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" name="confirm-password" id=""/>
            <label htmlFor="country">Country:</label>
            <select name="country" id="country" onChange={() => getStates()}>
                {countries.map(country =>{
                    return(
                        <option value={country.country_name}>{country.country_name}</option>
                    )  
                })}
            </select>
            <label htmlFor="state">State:</label>
            <select name="state" id="state" onChange={()=> getCities()}>
                {states.map(state =>{
                    return(
                        <option value={state.state_name}>{state.state_name}</option>
                    )
                })}
            </select>
            <label htmlFor="city">City:</label>
            <select name="city" id="city">
                {cities.map(city =>{
                    return(
                        <option value={city.city_name}>{city.city_name}</option>
                    )
                })}
            </select>
            <button type='submit'>Submit</button>
        </div>
    );
};

export default Register;