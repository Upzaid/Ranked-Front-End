import React, {useEffect, useState} from 'react';
import NewTournament from './NewTournamentForm'

function TournamentDisplay (props){
    
    async function deleteTournament (id){
        let confirmation = window.confirm('Do you want to delete this tournament?')
        if(confirmation){
            console.log(`Tournament ${id} deleted`);
        }
    }

    return(
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
    )
}

export default TournamentDisplay