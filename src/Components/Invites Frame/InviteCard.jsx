import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

function InviteCard(props){
    useEffect(()=>{
        getTounramentInfo(props.tournament_id)
    },[])

    let [tournament, setTournament] = useState()

    async function getTounramentInfo(id){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament/${id}/details`)
        setTournament(await response.json())
    }

    if(!tournament){
        return(
          null
        )
    }
    return(
            <div>
                <Link to={`${props.tournament_id}/details`}>
                    <h2>{tournament.name}</h2>
                </Link>
                <h3>{tournament.game}</h3>
                <h3>{tournament.state}, {tournament.country}</h3>
            </div>
    )
}

export default InviteCard