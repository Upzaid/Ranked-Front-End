import React, {useEffect, useState} from 'react'
import Geonames from 'geonames.js'

function NewTournament (){
    
    const rankedAPI = process.env.REACT_APP_API_URL

    const geonames = Geonames({
        username: process.env.REACT_APP_GEONAMES,
        lan: 'en',
        encoding: 'JSON'
    })

    useEffect(()=>{
        getGames()
        getCountries()
    },[])

    let [countries, setCountries] = useState([])
    let [states, setStates] = useState([])
    let [regions, setRegions] = useState([])
    let [games, setGames] = useState([])
    let [submitErrors, setSubmitErrors] =useState([])
   
    // API Call for game list

    const getGames = async () =>{
        const response = await fetch(`${rankedAPI}/games/all`)
        setGames(await response.json());
    }

    // API Call for countries
    const getCountries = async () =>{
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

    // API Call for cities
    async function getRegions () {
        const selection = document.getElementById('state')
        if(selection.value){
            const data = await geonames.children({geonameId:selection.value})
            setRegions(data.geonames);
        }
    }

    async function submit() {
        // Get fields to create tournament object
        const tournament ={
            name: document.getElementById('name').value,
            game: document.getElementById('game').value,
            country: document.getElementById('country').options[document.getElementsByName('country')[0].selectedIndex].text,
            state: document.getElementById('state').options[document.getElementsByName('state')[0].selectedIndex].text,
            region: document.getElementById('region').value,
            online: document.getElementById('online').value,
            structure: document.getElementById('structure').value
        }

        // Send request to the API
        const response = await fetch(`${rankedAPI}/tournament/create`,{
            method:'POST',
            body: JSON.stringify(tournament),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'ranked-token': localStorage.getItem('ranked-token')
            }
        })
        
        // Display errors if there are any
        if (response.status >= 400){
            setSubmitErrors(await response.json());
            return
        }

        // Clear fields
        document.getElementById('name').value =''
        document.getElementById('game').value = ''
        document.getElementById('country').options[document.getElementsByName('country')[0].selectedIndex].text = ''
        document.getElementById('state').options[document.getElementsByName('state')[0].selectedIndex].text = ''
        document.getElementById('region').value = ''
        document.getElementById('online').value = ''
        document.getElementById('structure').value = ''
    }

    return(
        <form className="form" onSubmit={e => e.preventDefault()}>
           
            <h2>Create a New Tournament</h2>
            <label htmlFor="name">Tournament Name:</label>
            <input type="text" name="name" id="name" required/>
            <label htmlFor="game">Game (or sport):</label>
            <select type="text" name="game" id="game" required>
                <option value=""></option>
                {games.map(game =>{
                    return(
                        <option key={game.game_uuid} value={game.game_uuid}>{game.game_name}</option>
                    )
                })}
            </select>
            <label htmlFor="country">Country:</label>
            <select name="country" id="country" onChange={()=>getStates()}>
                <option value=""></option>
                {countries.map(country =>{
                    return(
                        <option key={country.countryName} value={country.geonameId} name={country.countryName}>{country.countryName}</option>
                    )
                })}
            </select>
            <label htmlFor="state">State:</label>
            <select name="state" id="state" onChange={()=>getRegions()}>
                <option value=""></option>
                {states.map(state =>{
                    return(
                        <option value={state.geonameId} key={state.admincCode1} id={state.adminName1}>{state.adminName1}</option>
                    )
                })}
            </select>
            <label htmlFor="state">Region:</label>
            <select name="region" id="region" >
                <option value=""></option>
                {regions.map(region =>{
                    return(
                        <option value={region.name} key={region.geonameId}>{region.toponymName}</option>
                    )
                })}
            </select>
            <label htmlFor="">Online:</label>
            <select name="online" id="online">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <label htmlFor="structure">Structure:</label>
            <select name="structure" id="structure">
                <option value="structure">League</option>
            </select>
            <button className='button' type="submit" onClick={() => submit()}>Submit</button>
            <p className='error'>{submitErrors}</p>

        </form>
    )
}

export default NewTournament