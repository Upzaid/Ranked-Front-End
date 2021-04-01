import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import OrganizerMenu from './OrganizerMenu'

function TournamentDetails (){
    
    let [user, setUser] =useState()
    let [tournament, setTournament] = useState()
    let [organizer, setOrganizer] = useState()
    let {tournament_id} = useParams()

    useEffect(()=>{
        getTounramentInfo()
        getUser()
        getOrganizer()
    },[])

    // API Call to get tournament data
    async function getTounramentInfo(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament/${tournament_id}/details`)
        setTournament([await response.json()])
    }

    // Get log in status to render acordingly
    let getUser = async () =>{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/status`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setUser(await response.json())
    }

    // Check if the user is organizer
    async function getOrganizer(){
        setOrganizer(true)
    }

    if(!tournament){
        return (
            <h1>Tournament does not exist</h1>
        )
    }
    return(
        <div className="content-container">
            {tournament.map((tournament)=>{
                return(
                <div className="tournament-frame">
                    {organizer ? 
                    <OrganizerMenu/>
                    :null}
                    <div className="banner">
                        BANNER
                    </div>
                    <div className="tournament-info">
                        <div>
                            <h1>{tournament.name}</h1>
                            <h2>{tournament.game}</h2>
                            <h2>{tournament.state}, {tournament.country}</h2>
                        </div>
                        {user ? <div className="button">JOIN REQUEST</div> :null}
                    </div>
                    <pre className="tournament-details">
                        {tournament.details}
                    </pre>
                 </div>
                )
            })}
        </div>
    )
}

export default TournamentDetails