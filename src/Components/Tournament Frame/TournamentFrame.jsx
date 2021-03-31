import React, {useEffect, useState} from 'react';
import TournamentCard from './TournamentCard'
import NewTournamentForm from './NewTournamentForm'

function TournamentFrame(){

    const rankedAPI = process.env.REACT_APP_API_URL

    let [tournamentForm, setTournamentForm] =useState([])
    let [organizerTournaments, setOrganizerTournaments] = useState([])
    let [playerTournaments, setPlayerTournaments] = useState([])
    
    useEffect(()=>{
        getOrganizerTournaments()
        getPlayerTournaments()
    },[])
    
    // Close new tournament form
    function closeForm(){
        getOrganizerTournaments()
        getPlayerTournaments()
        setTournamentForm([])
    }

    // Find tournaments where the user is an organizer
    async function getOrganizerTournaments() {
        const response = await fetch(`${rankedAPI}/tournament/all/organizer`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setOrganizerTournaments(await response.json())
    }

    // Find tournaments where the user is a player
    async function getPlayerTournaments() {
        const response = await fetch(`${rankedAPI}/tournament/all/player`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setPlayerTournaments(await response.json())
    }

    // Drop out of tournament

    async function dropOut (id){
        let confirmation = window.confirm('Do you want to drop out of this tournament?')
        if (confirmation){
            await fetch(`${rankedAPI}/user/drop`,{
                method:'DELETE',
                body: JSON.stringify({tournament_id:id}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ranked-token': localStorage.getItem('ranked-token')
                }
            })
            getPlayerTournaments()
        }
    }

    // Delete tournament
    async function deleteTournament (id){
        let confirmation = window.confirm('Do you want to delete this tournament?')
        if(confirmation){
            await fetch(`${rankedAPI}/tournament/delete`,{
                method:'DELETE',
                body: JSON.stringify({tournament_id:id}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ranked-token': localStorage.getItem('ranked-token')
                }
            })
            getOrganizerTournaments()
        }
    }

    return(
        <div className="content">
            <h1>Tournaments</h1>
            AS PLAYER
            <div className='tournament-card-container' >
                {playerTournaments.map((tournament)=>{
                    return(
                        <div key={tournament.id} className="tournament-card">
                            <TournamentCard tournament={tournament}/>
                            <div className="delete" onClick={()=> dropOut(tournament.id)}>DROP OUT</div>
                        </div>
                    )
                })}
            </div>
            AS ORGANIZER
            <div className='tournament-card-container'>
                <div className="tournament-card" onClick={()=> setTournamentForm([<NewTournamentForm/>])}>
                    <h2>CREATE A NEW TOURNAMENT</h2>
                </div>
                {organizerTournaments.map((tournament)=>{
                    return(
                        <div key={tournament.id} className="tournament-card">
                            <TournamentCard tournament={tournament} />
                            <div className="delete" onClick={()=> deleteTournament(tournament.id)}>DELETE</div>
                        </div>
                    )
                })}
            </div>
            {tournamentForm.map((form)=>{
                return(
                    <div key='1' className="form-container">
                        <div className="delete" onClick={()=> closeForm()}>Close</div>
                        <NewTournamentForm />
                    </div>
                )
            })}
        </div>
    )
}

export default TournamentFrame