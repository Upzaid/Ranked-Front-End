import React, {useEffect, useState} from 'react';

function ReportMatch(props){
    return(
        <div className="content-container">
            <h1>Report Match</h1>
            
            <form onSubmit={e =>{e.preventDefault()}} classname="">
                <label htmlFor="">Player 1: </label>
                <select name="" id="player1">
                    <option value=""></option>
                    {props.players.map(player =>{
                        return(
                            <option value="">{player.username}</option>
                        )
                    })}
                </select>
                <label htmlFor="">Player 2: </label>
                <select name="" id="player2">
                    <option value=""></option>
                    {props.players.map(player =>{
                        return(
                            <option value="">{player.username}</option>
                        )
                    })}
                </select>
                <br/>
                <label htmlFor="p1wins">Player 1 wins:</label>
                <input type="number" name="p1wins" id=""/>
                <label htmlFor="p2wins">Player 2 wins:</label>
                <input type="number" name="p2wins" id=""/>
                <br/>
                <button className="button">SEND RESULT</button>
            </form>
        </div>
    )
}

export default ReportMatch