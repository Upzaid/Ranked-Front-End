import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'


function TournamentCard (props){

    return(
        <Link to={`/${props.tournament.id}/details`}>
            <div >
                <h2>{props.tournament.tournament_name}</h2>
                <h3>{props.tournament.game_name}</h3>
                <p>{props.tournament.detials}</p>
                <p>{props.tournament.status} | {props.tournament.structure}</p>
            </div>
        </Link>
    )
}

export default TournamentCard