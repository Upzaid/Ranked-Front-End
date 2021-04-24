import React, {useEffect, useState} from 'react';
import MatchCard from './MatchCard'

function MatchHistory(params){
    
    const rankedAPI = process.env.REACT_APP_API_URL

    let [matches, setMatches] = useState([])

    useEffect(()=>{
        getMatches()
        
    },[])

    async function getMatches() {
        const response = await fetch(`${rankedAPI}/match/all/${params.tournament_id}`,{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'ranked-token': localStorage.getItem('ranked-token')
            }
        })
        setMatches(await response.json());
        // console.log(await response.json());
    }
    
    return(
        <div className="content-container">
            <h1>Match History</h1>
            <div className="heading match-card ">
                <span>
                    Date
                </span>
                <span>
                    Player 1 (rating)
                </span>
                <span>
                    Score
                </span>
                <span>
                    Player 2 (rating)
                </span>
            </div>
                {matches.map((match=>{
                    return(
                       <MatchCard match={match}/>
                    )
                }))}
            
        </div>
    )
}

export default MatchHistory