import React, {useEffect, useState} from 'react';
import TournamentCard from './TournamentCard'
import NewTournamentForm from './NewTournamentForm'

function TournamentFrame(){

    const rankedAPI = process.env.REACT_APP_API_URL

    useEffect(()=>{
        getOrganizerTournaments()
    },[])

    let [tournamentForm, setTournamentForm] =useState([])
    let [organizerTournaments, setOrganizingTournaments] = useState([])
    let [playingTournaments, setPlayingTournaments] = useState([])

    // Close new tournament form
    function closeForm(){
        getOrganizerTournaments()
        setTournamentForm([])
    }

    // Find tournaments where the user is an organizer
    async function getOrganizerTournaments() {
        const response = await fetch(`${rankedAPI}/tournament/all`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setOrganizingTournaments(await response.json())
    }
    // Find tournaments where the user is a player
    
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
                
            </div>
            AS ORGANIZER
            <div className='tournament-card-container'>
                <div className="tournament-card" onClick={()=> setTournamentForm([<NewTournamentForm/>])}>
                    <h2>CREATE A NEW TOURNAMENT</h2>
                </div>
                {organizerTournaments.map((tournament)=>{
                    return(
                        <div className="tournament-card">
                            <TournamentCard tournament={tournament} />
                            <div className="button delete" onClick={()=> deleteTournament(tournament.id)}>DELETE</div>
                        </div>
                    )
                })}
            </div>
            {tournamentForm.map((form)=>{
                return(
                    <div className="form-container">
                        <div className="delete" onClick={()=> closeForm()}>Close</div>
                        <NewTournamentForm />
                    </div>
                )
            })}
        </div>
    )
}

export default TournamentFrame