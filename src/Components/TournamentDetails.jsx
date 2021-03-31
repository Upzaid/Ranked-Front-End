import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

function TournamentDetails (){
    
    let [user, setUser] =useState()
    let [tournament, setTournament] = useState()
    let [organizer, setOrganizer] = useState(false)
    let {tournament_id} = useParams()

    useEffect(()=>{
        getTounramentInfo()
        getUser()
    },[])

    // API Call to get tournament data
    async function getTounramentInfo(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament/${tournament_id}/details`)
        setTournament(await response.json())
    }

    // Get log in status to render acordingly
    let getUser = async () =>{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/status`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setUser(await response.json())
    }
        
    if(user && tournament){
        return(
            <div>
                <h1>{tournament.name}</h1>
                <h2>{tournament.game}</h2>
                <h3>{tournament.structure}</h3>
                <p>{tournament.details}</p>
                <ul>
                    <li className='button'>Sign Up</li>
                </ul>
            </div>
        )
    }else if (tournament){
        return(
            <div>
                <h1>{tournament.name}</h1>
                <h2>{tournament.game}</h2>
                <h3>{tournament.structure}</h3>
                <p>{tournament.details}</p>
            </div>
        )
    }
    return(
        <div>
            <h1>Tournament does not exist</h1>
        </div>
    )
}

export default TournamentDetails