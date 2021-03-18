import React, {useEffect, useState} from 'react';

function TournamentFrame (){
    let [tournaments, setTournaments] =useState([])

    useEffect(()=>{
        getTournaments()
    })
    
    async function getTournaments() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament/all`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setTournaments(await response.json())
    }

    return(
        <div>
            <div>CREATE A NEW TOURNAMENT</div>
            {tournaments.map(tournament =>{
                return(
                    <div key={tournament.tournament_uuid} style={{border: '1px solid black'}}>
                        <h2>{tournament.tournament_name}</h2>
                        <h3>{tournament.game_name}</h3>
                        <p>{tournament.details}</p>
                        <p>{tournament.structure} {tournament.status}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default TournamentFrame