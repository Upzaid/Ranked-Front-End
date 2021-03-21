import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import NewTournament from './NewTournamentForm'

function TournamentDisplay (props){
    const rankedAPI = process.env.REACT_APP_API_URL

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
        }
    }

    return(
        <Link to={`${props.tournament.id}/details`}>
            <div className='tournament-container'>
                <h2>{props.tournament.tournament_name}</h2>
                <h3>{props.tournament.game_name}</h3>
                <p>{props.tournament.detials}</p>
                <p>{props.tournament.status} | {props.tournament.structure}</p>
                <ul>
                    <li className='inversed-button' onClick={()=> deleteTournament(props.tournament.id)}>Delete</li>
                    <li className='inversed-button'>Edit</li>
                </ul>
            </div>
        </Link>
    )
}

export default TournamentDisplay