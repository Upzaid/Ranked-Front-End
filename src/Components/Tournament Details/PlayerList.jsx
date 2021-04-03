import React from 'react';
import {Link} from 'react-router-dom'

function PlayerList(props){
    // TODO Add drop/delete functionality, Probablemente tengo que separar componentes

    return(
        <div className="content-container">
            {props.players.map(player=>{
                return(
                  <div key={player.username} className="player-card-container">
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