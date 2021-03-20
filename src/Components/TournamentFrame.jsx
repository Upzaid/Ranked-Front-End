import React, {useEffect, useState} from 'react';
import NewTournament from './NewTournamentForm'
import TournamentDisplay from './TournamentDisplay'

function TournamentFrame (){
    let [tournaments, setTournaments] = useState([])
    let [createTournament, setCreateTournament] =useState(false)
   
    useEffect(()=>{
        getTournaments()
    },[createTournament])
    
    async function getTournaments() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament/all`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setTournaments(await response.json())
    }


    if (createTournament){
        return(
            <div>
                <NewTournament />
                <div className='grid-container'>
                    <div className='tournament-container' onClick={()=>{ setCreateTournament(false)}}>
                        <h1>CLOSE NEW TOURNAMENT FORM</h1>
                    </div>
                    {tournaments.map(tournament =>{
                        return(
                        <TournamentDisplay tournament={tournament} />
                        )
                    })}
                </div>
            </div>
        )
    }

    return(
        <div>
            <div className='grid-container'>
                <div className='tournament-container' onClick={()=>{ setCreateTournament(true)}}>
                    <h1>CREATE NEW TOURNAMENT</h1>
                </div>
                {tournaments.map(tournament =>{
                    return(
                    <TournamentDisplay tournament={tournament} />
                    )
                })}
            </div>
        </div>
    )
}

export default TournamentFrame