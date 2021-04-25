import React, {useEffect, useState} from 'react'
import MatchDetails from './MatchDetails'

function MatchesFrame(){

    let [tournaments, setTournaments] = useState([])

    useEffect(()=>{
        
        getTournaments()
    },[])

    const rankedAPI = process.env.REACT_APP_API_URL

    async function getMatches() {
        const response = await fetch(`${rankedAPI}/match/user/all`,{
            headers:{
                'ranked-token': localStorage.getItem('ranked-token')
            }
        })
        return await response.json()
    }

    async function getTournamentInfo(tournament_id) {
        const response = await fetch(`${rankedAPI}/tournament/${tournament_id}/details`)
        return await response.json()
    }

    async function getTournaments() {
        const tournaments = await getMatches()
        let tournamentArray = []
        
        for (let i = 0; i < tournaments.length; i++){
            
            const tournamentData = await getTournamentInfo(tournaments[i][0])
            
            const tournament = {
                name: tournamentData.name,
                game: tournamentData.game,
                id: tournamentData.id,
                matches: tournaments[i][1]
            }
            
            tournamentArray.push(tournament)
        }
        setTournaments(tournamentArray)
    }

    return(
        <div className='content'>
            <h1>Match History</h1>
            <div className="match-card">
                <span>Date</span>
                <span>Opponent (rating)</span>
                <span>Score</span>
                <span>New Rating</span>
            </div>
            {tournaments.map(tournament =>{
                return(
                    <>
                        <div className="heading">
                            <h3>{tournament.name}</h3>
                            <h6>{tournament.game}</h6>
                        </div>
                        
                        {tournament.matches.map(match =>{
                            
                            return <MatchDetails match={match}/>
                        })}
                    </>
                )
            })}
        </div>
    )
}

export default MatchesFrame