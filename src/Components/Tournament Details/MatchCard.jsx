import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

function MatchCard(porps) {
    
    return(
     
        <div className="match-card">
            <span>
                {`${(new Date(porps.match.timestamp).toLocaleDateString())} ${(new Date(porps.match.timestamp).toLocaleTimeString())}`}
            </span>
            <span>
                <Link to ={`/${porps.match.p1}/profile`}>{porps.match.p1} </Link>
                <span>
                    ({porps.match.p1_rating})
                </span>
            </span>
            <span>
                {porps.match.p1_wins} - {porps.match.p2_wins}
            </span>
            <span >
                <span>
                    ({porps.match.p2_rating})
                </span>
                 <Link to={`/${porps.match.p2}/profile`}>{porps.match.p2}</Link>
            </span>
        </div>
    )
}

export default MatchCard