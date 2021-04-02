import React from 'react';
import {Link} from 'react-router-dom'

function RequestCard(props){
    
    return(
        <div >
            <Link to={`/${props.request.username}/profile`}>
                <h2>{props.request.username}</h2>
            </Link>
            <h3>{props.request.state}, {props.request.country}</h3>
        </div>
    )
}

export default RequestCard