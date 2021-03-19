import React, {useEffect, useState} from 'react';
import NewTournament from './NewTournamentForm'

function TournamentFrame (){
    let [tournaments, setTournaments] = useState([])
   
    useEffect(()=>{
        getTournaments()
    },[])
    
    async function getTournaments() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament/all`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setTournaments(await response.json())
    }

    return(
        <div>
            <div>
                <NewTournament />
            </div>
            {tournaments.map(tournament =>{
                return(
                    <div key={tournament.tournament_uuid} style={{border: '1px solid black'}}>
                        <h2>{tournament.tournament_name}</h2>
                        <h3>{tournament.game_name}</h3>
                        <p>{tournament.details}</p>
                        <p>{tournament.structure} {tournament.status}</p>
                        <div style={{display:'flex', justifyContent: 'space-around'}}>
                            <button>DELETE</button>
                            <button>EDIT</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TournamentFrame