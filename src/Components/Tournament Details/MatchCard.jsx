import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

function MatchCard(params) {
    
    return(
     
        <div className="match-card">
            <span>
                {`${(new Date(params.match.timestamp).toLocaleDateString())} ${(new Date(params.match.timestamp).toLocaleTimeString())}`}
            </span>
            <span>
                <Link to ={`/${params.match.p1}/profile`}>{params.match.p1} </Link>
                <span>
                    ({params.match.p1_rating})
                </span>
            </span>
            <span>
                {params.match.p1_wins} - {params.match.p2_wins}
            </span>
            <span >
                <span>
                    ({params.match.p2_rating})
                </span>
                 <Link to={`/${params.match.p2}/profile`}>{params.match.p2}</Link>
            </span>
        </div>
    )
}

export default MatchCard