import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

function MatchDetails(props){
    return(
        <div className="match-card">
            <span>
               {`${(new Date(props.match.timestamp)).toLocaleDateString()} ${(new Date(props.match.timestamp)).toLocaleTimeString()} `}
            </span>
            <span>
                <Link to={`/${props.match.opponent}/profile`}>{props.match.opponent}</Link> ({props.match.opponent_rating})  
            </span>
            <span>
                {` ${props.match.opponent_wins} - ${props.match.user_wins} `}
            </span>
            <span>
                {props.match.user_rating}
            </span>
        </div>
    )
}

export default MatchDetails