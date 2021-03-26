import React, {useState, useEffect} from 'react';
import Geonames from 'geonames.js'

function Register(){

    const rankedAPI = process.env.REACT_APP_API_URL

    const geonames = Geonames({
        username: process.env.REACT_APP_GEONAMES,
        lan: 'en',
        encoding: 'JSON'
    })

    useEffect(()=>{
        getCountries()
    },[])

    let [countries, setCountries] = useState([])
    let [states, setStates] = useState([])
    let [regions, setRegions] = useState([])
    let [submitErrors, setSubmitErrors] =useState([])
    
    // API Call for countries
    const getCountries = async ()=>{
        const data = await geonames.countryInfo({})
        setCountries(data.geonames);
    }

    // API Call for states
    async function getStates () {
        const selection = document.getElementById('country')
        if (selection.value){
            const data = await geonames.children({geonameId:selection.value})
            setStates(data.geonames);
        }
    }

    // API Call for Regions
    async function getRegions () {
        const selection = document.getElementById('state')
        if (selection.value){
            const data = await geonames.children({geonameId:selection.value})
            setRegions(data.geonames);
        }
    }

    async function submit () {

        // Get fields from the form to send the request
        const user = {
            first_name: document.getElementsByName('first_name')[0].value,
            last_name:  document.getElementsByName('last_name')[0].value,
            username:   document.getElementsByName('username')[0].value,
            password:   document.getElementsByName('password')[0].value,
            email:      document.getElementsByName('email')[0].value,
            country:    document.getElementsByName('country')[0].options[document.getElementsByName('country')[0].selectedIndex].text,
            state:      document.getElementsByName('state')[0].options[document.getElementsByName('state')[0].selectedIndex].text,
            region:     document.getElementsByName('region')[0].value
        }
        
        // Send request to the API
        const response = await fetch(`${rankedAPI}/register`,{
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        // Add errors to State
        if (response.status >= 400) {
            const data = await response.json()
            setSubmitErrors([data])
            return
        }
        
        // Redirect to login page
        window.location.replace(`${process.env.REACT_APP_URL}/login`)
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <h1>Register</h1>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" name="first_name"  required/>
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" name="last_name"  required/>
            <label htmlFor="email">E-Mail:</label>
            <input type="email" name="email"  required/>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username"  required/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password"  required/>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" name="confirm-password"  required/>
            <label htmlFor="country">Country:</label>
            <select name="country" id="country" onChange={() => getStates()} required>
                        <option value=''></option>
                {countries.map(country =>{
                    return(
                        <option key={country.countryName} value={country.geonameId} name={country.countryName}>{country.countryName}</option>
                    )  
                })}
            </select>
            <label htmlFor="state">State:</label>
            <select name="state" id="state" onChange={()=> getRegions()} required>
                        <option value=''></option>
                {states.map(state =>{
                    return(
                        <option value={state.geonameId} key={state.admincCode1} id={state.adminName1}>{state.adminName1}</option>
                    )
                })}
            </select>
            <label htmlFor="region">Region:</label>
            <select name="region" id="region">
                    <option value=''></option>
                {regions.map(region =>{
                    return(
                        <option value={region.name} key={region.geonameId}>{region.toponymName}</option>
                    )
                })}
            </select>
            <button type='submit' className='button' onClick={()=> submit()}>Submit</button>
            {submitErrors.map(err =>{
                return (
                    <p className='error'>{err}</p>
                )
            } )}
        </form>
    );
};

export default Register;