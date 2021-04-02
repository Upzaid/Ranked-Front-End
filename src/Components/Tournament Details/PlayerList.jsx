import React from 'react';
import {Link} from 'react-router-dom'

function PlayerList(props){

    return(
        <div className="content-container">
            {props.players.map(player=>{
                return(
                  <div className="player-card-container">
                      <Link to={`/${player.username}/profile`}>
                          <div className="player-card">{player.username}</div>
                      </Link>
                      <div className="delete">DROP / DQ</div>
                  </div>
                )
            })}
        </div>
    )
}

export default PlayerList